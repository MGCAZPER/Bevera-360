/*
 * Bevera-360 Smart Robotic Bartender Main Firmware
 * Platform: ESP32
 * Features: 5 Relays (Pumps), 1 Relay/PWM (Stirrer Motor), IR Cup Sensor, 16x2 I2C LCD, Web API
 */

#include <Arduino.h>
#include "Config.h"
#include "Hardware.h"
#include "BeveraWebServer.h"

// Global System Variables
HardwareController hardware;
BartenderWebServer webServer(&hardware);

SystemState currentState = STATE_IDLE;
String currentDrinkName = "";
float targetVolumesMl[NUM_PUMPS] = {0, 0, 0, 0, 0};
uint32_t stirrerDurationMs = 3000;

// State Machine Variables
uint8_t currentPumpIndex = 0;
uint32_t stateStartTime = 0;
uint32_t pumpDurationMs = 0;
uint32_t lastCupCheckTime = 0;

// Load Cell Pour Tracking
float pumpStartWeightGrams = 0.0f;
float currentPumpTargetGrams = 0.0f;
float totalTargetGrams = 0.0f;

void setup() {
    Serial.begin(115200);
    Serial.println("\n=== Starting Bevera-360 Smart Bartender System ===");

    // Initialize Hardware (GPIOs, LCD, Load Cell, EEPROM Calibration)
    hardware.init();
    hardware.stopAll(); // Ensure all pumps and relays default to OFF state

    // Initialize Web Server
    webServer.init();

    Serial.println("System Ready! All relays OFF by default.");
}

void loop() {
    // 1. Maintain Web Server HTTP Requests
    webServer.handleClient();

    // 2. Continuous Safety Sensor Check (Every 100ms)
    uint32_t now = millis();
    if (now - lastCupCheckTime >= 100) {
        lastCupCheckTime = now;
        bool cupPresent = hardware.isCupPresent();

        // Safety Cut-off: If cup is removed while transfer pump (Relay 7) is pouring to cup
        if (!cupPresent && currentState == STATE_POURING_TO_CUP) {
            hardware.stopAll();
            currentState = STATE_PAUSED_NO_CUP;
            Serial.println("[SAFETY] Cup removed during transfer pour! Operation paused.");
        }
    }

    // 3. Main Non-Blocking State Machine
    switch (currentState) {
        case STATE_IDLE:
            // Waiting for Web API order
            break;

        case STATE_DOSING_MIXER:
            // Stage 1: Dosing ingredients from Tanks 1-5 into Mixer Chamber via Relays 1-5
            if (millis() - stateStartTime >= pumpDurationMs) {
                // Stop current tank pump
                hardware.setPumpState(currentPumpIndex, false);
                Serial.print("Tank Pump ");
                Serial.print(currentPumpIndex + 1);
                Serial.println(" dosing into mixer completed.");

                // Move to next tank pump with volume > 0
                currentPumpIndex++;
                while (currentPumpIndex < NUM_PUMPS && targetVolumesMl[currentPumpIndex] <= 0) {
                    currentPumpIndex++;
                }

                if (currentPumpIndex < NUM_PUMPS) {
                    pumpDurationMs = hardware.calculatePourDurationMs(currentPumpIndex, targetVolumesMl[currentPumpIndex]);
                    stateStartTime = millis();
                    hardware.setPumpState(currentPumpIndex, true);
                    Serial.print("Dosing Tank Pump ");
                    Serial.print(currentPumpIndex + 1);
                    Serial.print(" (");
                    Serial.print(targetVolumesMl[currentPumpIndex]);
                    Serial.println(" ml) into Mixer");
                } else {
                    // All tank pumps finished, transition to Stage 2: Mixing
                    if (stirrerDurationMs > 0) {
                        stateStartTime = millis();
                        hardware.setStirrerState(true); // Relay 6 ON
                        currentState = STATE_MIXING;
                        Serial.println("Stage 2: Starting Mixer Motor (Relay 6)...");
                    } else {
                        // Skip mixing, go directly to Stage 3: Waiting for Cup
                        currentState = STATE_WAITING_FOR_CUP;
                        Serial.println("Stage 3: Waiting for Cup on scale...");
                    }
                }
            }
            break;

        case STATE_MIXING:
            // Stage 2: Blending drink in Mixer Chamber via Relay 6
            if (millis() - stateStartTime >= stirrerDurationMs) {
                hardware.setStirrerState(false); // Relay 6 OFF
                Serial.println("Stage 2: Mixing completed! Waiting for Cup...");
                currentState = STATE_WAITING_FOR_CUP;
            }
            break;

        case STATE_WAITING_FOR_CUP:
            // Stage 3: Waiting for Cup under Relay 7 Transfer Pump
            if (now - lastCupCheckTime >= 2000) {
                Serial.println("[STATE_WAITING_FOR_CUP] Waiting for cup detection on scale/IR to trigger Relay 7 Transfer Pump...");
            }
            if (hardware.isCupPresent()) {
                Serial.println("Cup detected on scale! Taring cup weight and starting Relay 7 transfer pump...");
                
                // Tare scale with cup on platform
                hardware.tareCup();
                
                totalTargetGrams = 0.0f;
                for (int i = 0; i < NUM_PUMPS; i++) {
                    totalTargetGrams += targetVolumesMl[i];
                }

                // Safety timeout for Relay 7: estimated flow rate duration + 6s buffer
                pumpDurationMs = (uint32_t)((totalTargetGrams / DEFAULT_TRANSFER_FLOW_RATE_ML_PER_SEC) * 1000.0f) + 6000;
                stateStartTime = millis();

                // Turn ON Relay 7 (Mixer-to-Cup Transfer Pump)
                hardware.setTransferPumpState(true);
                currentState = STATE_POURING_TO_CUP;

                Serial.print("Relay 7 active. Transferring ");
                Serial.print(totalTargetGrams);
                Serial.println(" g mixed drink to Cup...");
            }
            break;

        case STATE_POURING_TO_CUP: {
            // Stage 3: Relay 7 Transfer Pump active with real-time Load Cell weight feedback
            float netWeight = hardware.getNetWeightGrams();

            bool weightReached = (netWeight >= totalTargetGrams);
            bool timeoutReached = (millis() - stateStartTime >= pumpDurationMs);

            if (weightReached || timeoutReached) {
                // Stop Relay 7 Transfer Pump
                hardware.setTransferPumpState(false);
                Serial.print("Relay 7 Transfer Pump stopped. ");
                if (weightReached) {
                    Serial.print("Target weight reached (");
                } else {
                    Serial.print("Transfer timeout reached (");
                }
                Serial.print(netWeight);
                Serial.println(" g in cup).");

                currentState = STATE_COMPLETED;
                stateStartTime = millis();
            }
            break;
        }

        case STATE_PAUSED_NO_CUP:
            if (hardware.isCupPresent()) {
                Serial.println("Cup replaced! Resuming Relay 7 transfer pour...");
                stateStartTime = millis(); // Reset safety timeout
                hardware.setTransferPumpState(true);
                currentState = STATE_POURING_TO_CUP;
            }
            break;

        case STATE_COMPLETED:
            hardware.stopAll();
            // Stay in completed state for 5 seconds or until cup is picked up
            if (millis() - stateStartTime >= 5000 || !hardware.isCupPresent()) {
                currentState = STATE_IDLE;
                currentDrinkName = "";
                Serial.println("Order complete. Reset to IDLE.");
            }
            break;

        case STATE_ERROR:
            hardware.stopAll();
            Serial.println("System error state!");
            break;
    }

    delay(10); // Small loop yield
}
