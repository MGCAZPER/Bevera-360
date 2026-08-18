/*
 * Bevera-360 Smart Robotic Bartender
 * Hardware Controller (Relays, LCD, IR Sensor, EEPROM)
 */

#ifndef HARDWARE_H
#define HARDWARE_H

#include <EEPROM.h>
#include "Config.h"

#define EEPROM_SIZE 128
#define EEPROM_MAGIC 0xBEBE3601 // Magic identifier to verify EEPROM initialization with load cell

class HardwareController {
private:
    float flowRates[NUM_PUMPS]; // ml/sec for each pump
    bool pumpStates[NUM_PUMPS];  // Track active state of 5 relay pumps (Relays 1-5)
    bool stirrerState;           // Track stirrer motor relay state (Relay 6 - GPIO 21)
    bool transferPumpState;      // Track Mixer-to-Cup transfer pump state (Relay 7 - GPIO 22)

    uint8_t relayActiveState;
    uint8_t relayInactiveState;

    // Load Cell (HX711) State
    float scaleCalibrationFactor;
    float scaleTareOffset;
    float cupTareOffset;
    int32_t lastRawAdc;

    uint8_t getRelayActiveLevel(uint8_t relayIndex) {
        bool activeLow = (relayIndex < 7) ? RELAY_ACTIVE_LOW_ARRAY[relayIndex] : RELAY_ACTIVE_LOW;
        return activeLow ? LOW : HIGH;
    }

    uint8_t getRelayInactiveLevel(uint8_t relayIndex) {
        bool activeLow = (relayIndex < 7) ? RELAY_ACTIVE_LOW_ARRAY[relayIndex] : RELAY_ACTIVE_LOW;
        return activeLow ? HIGH : LOW;
    }

public:
    HardwareController() {
        relayActiveState = RELAY_ACTIVE_LOW ? LOW : HIGH;
        relayInactiveState = RELAY_ACTIVE_LOW ? HIGH : LOW;
        stirrerState = false;
        transferPumpState = false;
        
        for (int i = 0; i < NUM_PUMPS; i++) {
            flowRates[i] = DEFAULT_FLOW_RATE_ML_PER_SEC;
            pumpStates[i] = false;
        }

        scaleCalibrationFactor = DEFAULT_SCALE_CALIBRATION_FACTOR;
        scaleTareOffset = 0.0f;
        cupTareOffset = 0.0f;
        lastRawAdc = 0;
    }

    void init() {
        // Initialize GPIO pins for Relays 1-5 (Pre-latch INACTIVE state before setting OUTPUT mode)
        for (int i = 0; i < NUM_PUMPS; i++) {
            uint8_t inactiveVal = getRelayInactiveLevel(i);
            digitalWrite(PUMP_PINS[i], inactiveVal);
            pinMode(PUMP_PINS[i], OUTPUT);
            digitalWrite(PUMP_PINS[i], inactiveVal);
            pumpStates[i] = false;
        }

        // Initialize Relay 6 (Mixer / Stirrer Motor - GPIO 32)
        uint8_t inactiveMixer = getRelayInactiveLevel(5);
        digitalWrite(PIN_RELAY_STIRRER, inactiveMixer);
        pinMode(PIN_RELAY_STIRRER, OUTPUT);
        digitalWrite(PIN_RELAY_STIRRER, inactiveMixer);
        stirrerState = false;

        // Initialize Relay 7 (Mixer-to-Cup Transfer Pump - GPIO 33)
        uint8_t inactiveTransfer = getRelayInactiveLevel(6);
        digitalWrite(PIN_RELAY_TRANSFER_PUMP, inactiveTransfer);
        pinMode(PIN_RELAY_TRANSFER_PUMP, OUTPUT);
        digitalWrite(PIN_RELAY_TRANSFER_PUMP, inactiveTransfer);
        transferPumpState = false;

        // Force all relays OFF by default
        stopAll();

        pinMode(PIN_IR_CUP_SENSOR, INPUT_PULLUP);

        // Initialize HX711 Load Cell GPIOs
        pinMode(PIN_HX711_DOUT, INPUT);
        pinMode(PIN_HX711_SCK, OUTPUT);
        digitalWrite(PIN_HX711_SCK, LOW);

        // Initialize EEPROM & load calibration
        EEPROM.begin(EEPROM_SIZE);
        loadCalibration();

        // Perform initial tare of empty platform
        delay(300);
        tare();
    }

    // ==========================================
    // Relay & Pump Control (Relays 1-7)
    // ==========================================
    void setPumpState(uint8_t pumpIndex, bool turnOn) {
        if (pumpIndex < NUM_PUMPS) {
            pumpStates[pumpIndex] = turnOn;
            uint8_t pinLevel = turnOn ? getRelayActiveLevel(pumpIndex) : getRelayInactiveLevel(pumpIndex);
            digitalWrite(PUMP_PINS[pumpIndex], pinLevel);
        }
    }

    bool getPumpState(uint8_t pumpIndex) {
        if (pumpIndex < NUM_PUMPS) {
            return pumpStates[pumpIndex];
        }
        return false;
    }

    void stopAllPumps() {
        for (int i = 0; i < NUM_PUMPS; i++) {
            pumpStates[i] = false;
            digitalWrite(PUMP_PINS[i], getRelayInactiveLevel(i));
        }
    }

    void setStirrerState(bool turnOn) {
        stirrerState = turnOn;
        uint8_t pinLevel = turnOn ? getRelayActiveLevel(5) : getRelayInactiveLevel(5);
        digitalWrite(PIN_RELAY_STIRRER, pinLevel);
    }

    bool getStirrerState() {
        return stirrerState;
    }

    void setTransferPumpState(bool turnOn) {
        transferPumpState = turnOn;
        uint8_t pinLevel = turnOn ? getRelayActiveLevel(6) : getRelayInactiveLevel(6);
        digitalWrite(PIN_RELAY_TRANSFER_PUMP, pinLevel);
    }

    bool getTransferPumpState() {
        return transferPumpState;
    }

    void stopAll() {
        stopAllPumps();
        setStirrerState(false);
        setTransferPumpState(false);
    }

    // ==========================================
    // HX711 Load Cell Driver & Weight Operations
    // ==========================================
    bool isHX711Ready() {
        return digitalRead(PIN_HX711_DOUT) == LOW;
    }

    int32_t readHX711Raw() {
        // Wait up to 50ms for DOUT to go LOW
        uint32_t start = millis();
        while (digitalRead(PIN_HX711_DOUT) == HIGH) {
            if (millis() - start > 50) {
                return lastRawAdc; // Return last cached value on timeout
            }
            delayMicroseconds(10);
        }

        uint32_t rawData = 0;
        noInterrupts();
        for (int i = 0; i < 24; i++) {
            digitalWrite(PIN_HX711_SCK, HIGH);
            delayMicroseconds(1);
            rawData = (rawData << 1) | digitalRead(PIN_HX711_DOUT);
            digitalWrite(PIN_HX711_SCK, LOW);
            delayMicroseconds(1);
        }

        // 25th pulse for Channel A, Gain 128
        digitalWrite(PIN_HX711_SCK, HIGH);
        delayMicroseconds(1);
        digitalWrite(PIN_HX711_SCK, LOW);
        delayMicroseconds(1);
        interrupts();

        // Sign extend 24-bit 2's complement value
        if (rawData & 0x800000) {
            rawData |= 0xFF000000;
        }

        lastRawAdc = (int32_t)rawData;
        return lastRawAdc;
    }

    int32_t readHX711Average(uint8_t samples = 5) {
        if (samples < 1) samples = 1;
        int64_t sum = 0;
        for (uint8_t i = 0; i < samples; i++) {
            sum += readHX711Raw();
            delayMicroseconds(100);
        }
        return (int32_t)(sum / samples);
    }

    // Zero out empty scale
    void tare() {
        scaleTareOffset = (float)readHX711Average(10);
    }

    // Zero out scale with cup on platform
    void tareCup() {
        float grossVal = (float)readHX711Average(8);
        cupTareOffset = grossVal - scaleTareOffset;
    }

    float getGrossWeightGrams() {
        if (abs(scaleCalibrationFactor) < 0.001f) return 0.0f;
        float currentRaw = (float)readHX711Average(3);
        float grams = (currentRaw - scaleTareOffset) / scaleCalibrationFactor;
        return grams < 0.0f ? 0.0f : grams;
    }

    float getNetWeightGrams() {
        if (abs(scaleCalibrationFactor) < 0.001f) return 0.0f;
        float currentRaw = (float)readHX711Average(3);
        float netGrams = (currentRaw - (scaleTareOffset + cupTareOffset)) / scaleCalibrationFactor;
        return netGrams < 0.0f ? 0.0f : netGrams;
        return netGrams;
    }

    void calibrateScale(float knownWeightGrams) {
        if (knownWeightGrams <= 0.1f) return;
        float currentRaw = (float)readHX711Average(10);
        float rawDiff = currentRaw - scaleTareOffset;
        scaleCalibrationFactor = rawDiff / knownWeightGrams;
        saveCalibration();
    }

    void setCalibrationFactor(float factor) {
        if (abs(factor) > 0.01f) {
            scaleCalibrationFactor = factor;
            saveCalibration();
        }
    }

    float getCalibrationFactor() {
        return scaleCalibrationFactor;
    }

    float getTareOffset() {
        return scaleTareOffset;
    }

    // ==========================================
    // Sensor & Cup Detection
    // ==========================================
    bool isCupPresent() {
        bool irDetected = (digitalRead(PIN_IR_CUP_SENSOR) == CUP_PRESENT_LOGIC);
        bool weightDetected = (getGrossWeightGrams() >= CUP_MIN_WEIGHT_GRAMS);
        // Returns true if either IR sensor or Load cell detects cup
        return irDetected || weightDetected;
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
        EEPROM.put(addr, scaleCalibrationFactor);
        addr += sizeof(float);
        EEPROM.put(addr, scaleTareOffset);
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
            EEPROM.get(addr, scaleCalibrationFactor);
            addr += sizeof(float);
            EEPROM.get(addr, scaleTareOffset);
        } else {
            // First boot, write defaults
            saveCalibration();
        }
    }
};

#endif // HARDWARE_H
