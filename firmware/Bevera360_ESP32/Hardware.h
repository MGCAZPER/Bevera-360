/*
 * Bevera-360 Smart Robotic Bartender
 * Hardware Controller (Relays, LCD, IR Sensor, EEPROM)
 */

#ifndef HARDWARE_H
#define HARDWARE_H

#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <EEPROM.h>
#include "Config.h"

#define EEPROM_SIZE 64
#define EEPROM_MAGIC 0xBEBE3600 // Magic identifier to verify EEPROM initialization

class HardwareController {
private:
    LiquidCrystal_I2C lcd;
    float flowRates[NUM_PUMPS]; // ml/sec for each pump

    uint8_t relayActiveState;
    uint8_t relayInactiveState;

public:
    HardwareController() : lcd(LCD_I2C_ADDR, LCD_COLS, LCD_ROWS) {
        relayActiveState = RELAY_ACTIVE_LOW ? LOW : HIGH;
        relayInactiveState = RELAY_ACTIVE_LOW ? HIGH : LOW;
        
        for (int i = 0; i < NUM_PUMPS; i++) {
            flowRates[i] = DEFAULT_FLOW_RATE_ML_PER_SEC;
        }
    }

    void init() {
        // Initialize GPIO pins
        for (int i = 0; i < NUM_PUMPS; i++) {
            pinMode(PUMP_PINS[i], OUTPUT);
            digitalWrite(PUMP_PINS[i], relayInactiveState);
        }

        pinMode(PIN_RELAY_STIRRER, OUTPUT);
        digitalWrite(PIN_RELAY_STIRRER, relayInactiveState);

        pinMode(PIN_IR_CUP_SENSOR, INPUT_PULLUP);

        // Initialize I2C LCD
        Wire.begin(PIN_I2C_SDA, PIN_I2C_SCL);
        lcd.init();
        lcd.backlight();
        showLCDMessage("BEVERA-360", "INITIALIZING...");

        // Initialize EEPROM & load calibration
        EEPROM.begin(EEPROM_SIZE);
        loadCalibration();

        delay(1000);
        showLCDReady();
    }

    // ==========================================
    // Relay & Pump Control
    // ==========================================
    void setPumpState(uint8_t pumpIndex, bool turnOn) {
        if (pumpIndex < NUM_PUMPS) {
            digitalWrite(PUMP_PINS[pumpIndex], turnOn ? relayActiveState : relayInactiveState);
        }
    }

    void stopAllPumps() {
        for (int i = 0; i < NUM_PUMPS; i++) {
            digitalWrite(PUMP_PINS[i], relayInactiveState);
        }
    }

    void setStirrerState(bool turnOn) {
        digitalWrite(PIN_RELAY_STIRRER, turnOn ? relayActiveState : relayInactiveState);
    }

    void stopAll() {
        stopAllPumps();
        setStirrerState(false);
    }

    // ==========================================
    // Sensor & Cup Detection
    // ==========================================
    bool isCupPresent() {
        int sensorVal = digitalRead(PIN_IR_CUP_SENSOR);
        return (sensorVal == CUP_PRESENT_LOGIC);
    }

    // ==========================================
    // LCD Display Management
    // ==========================================
    void showLCDMessage(const String& line1, const String& line2) {
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print(line1.substring(0, 16));
        lcd.setCursor(0, 1);
        lcd.print(line2.substring(0, 16));
    }

    void showLCDReady() {
        showLCDMessage("BEVERA-360 BOT", "  STATUS: READY  ");
    }

    void showLCDPreparing(const String& drinkName, int progressPct) {
        String l1 = drinkName.length() > 0 ? drinkName : "PREPARING...";
        String l2 = "POURING " + String(progressPct) + "%";
        showLCDMessage(l1, l2);
    }

    void showLCDMixing() {
        showLCDMessage("MIXING DRINK...", "STIRRER ACTIVE");
    }

    void showLCDDrinkReady() {
        showLCDMessage(" DRINK READY! ", " TAKE YOUR CUP ");
    }

    void showLCDNoCupError() {
        showLCDMessage("!! NO CUP !!", "PLACE CUP BELOW");
    }

    // ==========================================
    // Calibration & EEPROM Storage
    // ==========================================
    float getFlowRate(uint8_t pumpIndex) {
        if (pumpIndex < NUM_PUMPS) {
            return flowRates[pumpIndex];
        }
        return DEFAULT_FLOW_RATE_ML_PER_SEC;
    }

    void setFlowRate(uint8_t pumpIndex, float rateMlPerSec) {
        if (pumpIndex < NUM_PUMPS && rateMlPerSec > 0.1f) {
            flowRates[pumpIndex] = rateMlPerSec;
            saveCalibration();
        }
    }

    // Calculate required pour duration in milliseconds for a target ml
    uint32_t calculatePourDurationMs(uint8_t pumpIndex, float targetMl) {
        if (targetMl <= 0) return 0;
        float rate = getFlowRate(pumpIndex);
        if (rate <= 0.01f) rate = DEFAULT_FLOW_RATE_ML_PER_SEC;
        return (uint32_t)((targetMl / rate) * 1000.0f);
    }

    void saveCalibration() {
        uint32_t magic = EEPROM_MAGIC;
        EEPROM.put(0, magic);
        int addr = sizeof(magic);
        for (int i = 0; i < NUM_PUMPS; i++) {
            EEPROM.put(addr, flowRates[i]);
            addr += sizeof(float);
        }
        EEPROM.commit();
    }

    void loadCalibration() {
        uint32_t magic = 0;
        EEPROM.get(0, magic);
        if (magic == EEPROM_MAGIC) {
            int addr = sizeof(magic);
            for (int i = 0; i < NUM_PUMPS; i++) {
                EEPROM.get(addr, flowRates[i]);
                addr += sizeof(float);
            }
        } else {
            // First boot, write defaults
            saveCalibration();
        }
    }
};

#endif // HARDWARE_H
