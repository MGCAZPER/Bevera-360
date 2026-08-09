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

void setup() {
    Serial.begin(115200);
    Serial.println("\n=== Starting Bevera-360 Smart Bartender System ===");

    // Initialize Hardware (GPIOs, LCD, EEPROM Calibration)
    hardware.init();

    // Initialize Web Server
    webServer.init();

    Serial.println("System Ready!");
}

void loop() {
    // 1. Maintain Web Server HTTP Requests
    webServer.handleClient();

    // 2. Continuous Safety Sensor Check (Every 100ms)
    uint32_t now = millis();
    if (now - lastCupCheckTime >= 100) {
        lastCupCheckTime = now;
        bool cupPresent = hardware.isCupPresent();

        // Safety Cut-off: If cup is removed mid-pour or mid-mix
        if (!cupPresent && (currentState == STATE_POURING || currentState == STATE_MIXING)) {
            hardware.stopAll();
            currentState = STATE_PAUSED_NO_CUP;
            hardware.showLCDNoCupError();
            Serial.println("[SAFETY] Cup removed! Operation paused.");
        }
    }

    // 3. Main Non-Blocking State Machine
    switch (currentState) {
        case STATE_IDLE:
            // Waiting for Web API order
            break;

        case STATE_WAITING_FOR_CUP:
            if (hardware.isCupPresent()) {
                Serial.println("Cup detected! Starting pour sequence...");
                currentPumpIndex = 0;
                
                // Find first active pump
                while (currentPumpIndex < NUM_PUMPS && targetVolumesMl[currentPumpIndex] <= 0) {
                    currentPumpIndex++;
                }

                if (currentPumpIndex < NUM_PUMPS) {
                    pumpDurationMs = hardware.calculatePourDurationMs(currentPumpIndex, targetVolumesMl[currentPumpIndex]);
                    stateStartTime = millis();
                    hardware.setPumpState(currentPumpIndex, true);
                    hardware.showLCDPreparing(currentDrinkName, 10);
                    currentState = STATE_POURING;
                    Serial.print("Pouring Pump ");
                    Serial.print(currentPumpIndex + 1);
                    Serial.print(" (");
                    Serial.print(targetVolumesMl[currentPumpIndex]);
                    Serial.print(" ml) for ");
                    Serial.print(pumpDurationMs);
                    Serial.println(" ms");
                } else {
                    // No pump volume specified, go directly to mixing or complete
                    if (stirrerDurationMs > 0) {
                        stateStartTime = millis();
                        hardware.setStirrerState(true);
                        hardware.showLCDMixing();
                        currentState = STATE_MIXING;
                    } else {
                        currentState = STATE_COMPLETED;
                    }
                }
            } else {
                // Flash prompt on LCD every second
                if ((millis() / 500) % 2 == 0) {
                    hardware.showLCDNoCupError();
                } else {
                    hardware.showLCDMessage("BEVERA-360", "WAITING FOR CUP");
                }
            }
            break;

        case STATE_POURING:
            if (millis() - stateStartTime >= pumpDurationMs) {
                // Stop current pump
                hardware.setPumpState(currentPumpIndex, false);
                Serial.print("Pump ");
                Serial.print(currentPumpIndex + 1);
                Serial.println(" pour finished.");

                // Move to next pump with volume > 0
                currentPumpIndex++;
                while (currentPumpIndex < NUM_PUMPS && targetVolumesMl[currentPumpIndex] <= 0) {
                    currentPumpIndex++;
                }

                if (currentPumpIndex < NUM_PUMPS) {
                    pumpDurationMs = hardware.calculatePourDurationMs(currentPumpIndex, targetVolumesMl[currentPumpIndex]);
                    stateStartTime = millis();
                    hardware.setPumpState(currentPumpIndex, true);
                    
                    int progressPct = (int)(((float)(currentPumpIndex + 1) / NUM_PUMPS) * 100);
                    hardware.showLCDPreparing(currentDrinkName, progressPct);
                    Serial.print("Pouring Pump ");
                    Serial.println(currentPumpIndex + 1);
                } else {
                    // All pumps finished, check stirrer motor
                    if (stirrerDurationMs > 0) {
                        stateStartTime = millis();
                        hardware.setStirrerState(true);
                        hardware.showLCDMixing();
                        currentState = STATE_MIXING;
                        Serial.println("Starting Stirrer Motor...");
                    } else {
                        currentState = STATE_COMPLETED;
                    }
                }
            }
            break;

        case STATE_MIXING:
            if (millis() - stateStartTime >= stirrerDurationMs) {
                hardware.setStirrerState(false);
                Serial.println("Stirring completed!");
                currentState = STATE_COMPLETED;
                stateStartTime = millis();
                hardware.showLCDDrinkReady();
            }
            break;

        case STATE_PAUSED_NO_CUP:
            if (hardware.isCupPresent()) {
                Serial.println("Cup replaced! Resuming operation...");
                if (currentPumpIndex < NUM_PUMPS) {
                    stateStartTime = millis(); // Reset timer for remaining duration
                    hardware.setPumpState(currentPumpIndex, true);
                    currentState = STATE_POURING;
                    hardware.showLCDPreparing(currentDrinkName, 50);
                } else {
                    currentState = STATE_MIXING;
                    hardware.setStirrerState(true);
                    hardware.showLCDMixing();
                }
            }
            break;

        case STATE_COMPLETED:
            hardware.stopAll();
            hardware.showLCDDrinkReady();
            // Stay in completed state for 5 seconds or until cup is picked up
            if (millis() - stateStartTime >= 5000 || !hardware.isCupPresent()) {
                currentState = STATE_IDLE;
                currentDrinkName = "";
                hardware.showLCDReady();
                Serial.println("Reset to IDLE.");
            }
            break;

        case STATE_ERROR:
            hardware.stopAll();
            hardware.showLCDMessage("SYSTEM ERROR!", "RESET MACHINE");
            break;
    }

    delay(10); // Small loop yield
}
