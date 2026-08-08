/*
 * Bevera-360 Smart Robotic Bartender
 * ESP32 Hardware Configuration & Pin Mapping
 */

#ifndef CONFIG_H
#define CONFIG_H

#include <Arduino.h>

// ==========================================
// Wi-Fi Configuration
// ==========================================
#define WIFI_SSID       "Bevera360_Bartender"
#define WIFI_PASSWORD   "bevera123"
#define WIFI_AP_MODE    true    // Set to true to broadcast Access Point, false for Station mode

// ==========================================
// Relay Configuration
// ==========================================
// Set to true if your 5-channel relay module is ACTIVE LOW (turns ON with 0V / LOW)
#define RELAY_ACTIVE_LOW  true

// Pin Allocations for ESP32
#define NUM_PUMPS         5

#define PIN_RELAY_PUMP1   23   // Relay 1 -> Pump 1 (Tank 1)
#define PIN_RELAY_PUMP2   25   // Relay 2 -> Pump 2 (Tank 2)
#define PIN_RELAY_PUMP3   19   // Relay 3 -> Pump 3 (Tank 3)
#define PIN_RELAY_PUMP4   18   // Relay 4 -> Pump 4 (Tank 4)
#define PIN_RELAY_PUMP5   5    // Relay 5 -> Pump 5 (Tank 5)

#define PIN_RELAY_STIRRER 17   // Relay / Transistor -> 12V Stirrer Motor

// Array of pump pins for convenient iteration
const uint8_t PUMP_PINS[NUM_PUMPS] = {
    PIN_RELAY_PUMP1,
    PIN_RELAY_PUMP2,
    PIN_RELAY_PUMP3,
    PIN_RELAY_PUMP4,
    PIN_RELAY_PUMP5
};

// ==========================================
// Cup Sensor (IR Obstacle Avoidance / Proximity)
// ==========================================
#define PIN_IR_CUP_SENSOR 4    // Digital pin connected to IR Sensor OUT
#define CUP_PRESENT_LOGIC LOW  // LOW means obstacle/cup detected (Active LOW IR sensor)

// ==========================================
// 16x2 I2C LCD Display Configuration
// ==========================================
#define PIN_I2C_SDA       21
#define PIN_I2C_SCL       22
#define LCD_I2C_ADDR      0x27 // Default I2C address for PCF8574 (can be 0x3F)
#define LCD_COLS          16
#define LCD_ROWS          2

// ==========================================
// Flow Rate Calibration Defaults (ml/sec)
// ==========================================
// Default flow rate per pump in milliliters per second.
// Default assumes ~15 ml/sec for standard 12V diaphragm pumps.
// Can be customized via Web API / EEPROM
#define DEFAULT_FLOW_RATE_ML_PER_SEC 15.0f

// ==========================================
// System State Enum
// ==========================================
enum SystemState {
    STATE_IDLE,
    STATE_WAITING_FOR_CUP,
    STATE_POURING,
    STATE_MIXING,
    STATE_COMPLETED,
    STATE_PAUSED_NO_CUP,
    STATE_ERROR
};

#endif // CONFIG_H
