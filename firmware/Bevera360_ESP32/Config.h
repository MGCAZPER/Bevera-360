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
// Set to true if ACTIVE LOW (ON with 0V), false if ACTIVE HIGH (ON with HIGH)
#define RELAY_ACTIVE_LOW  true

// Per-channel Active LOW logic setting for Relays 1-7
// Relays 1-4 & 7: Active HIGH (false -> OFF with LOW) | Relays 5 & 6: Active LOW (true -> OFF with HIGH)
const bool RELAY_ACTIVE_LOW_ARRAY[7] = {
    false, // Relay 1 (GPIO 23 - Pump 1): Active HIGH
    false, // Relay 2 (GPIO 25 - Pump 2): Active HIGH
    false, // Relay 3 (GPIO 19 - Pump 3): Active HIGH
    false, // Relay 4 (GPIO 18 - Pump 4): Active HIGH
    true,  // Relay 5 (GPIO 16 - Pump 5): Active LOW
    true,  // Relay 6 (GPIO 32 - Mixer): Active LOW
    false  // Relay 7 (GPIO 33 - Transfer): Active HIGH
};

// Pin Allocations for ESP32
#define NUM_PUMPS         5

#define PIN_RELAY_PUMP1   23   // Relay 1 -> Pump 1 (Tank 1 to Mixer)
#define PIN_RELAY_PUMP2   25   // Relay 2 -> Pump 2 (Tank 2 to Mixer)
#define PIN_RELAY_PUMP3   19   // Relay 3 -> Pump 3 (Tank 3 to Mixer)
#define PIN_RELAY_PUMP4   18   // Relay 4 -> Pump 4 (Tank 4 to Mixer)
#define PIN_RELAY_PUMP5   16   // Relay 5 -> Pump 5 (Tank 5 to Mixer - GPIO 16 safe pin)

#define PIN_RELAY_STIRRER 32   // Relay 6 -> 12V Mixer / Stirrer Motor (GPIO 32)
#define PIN_RELAY_TRANSFER_PUMP 33 // Relay 7 -> Mixer-to-Cup Deliver Pump (GPIO 33)

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
// HX711 Load Cell Weight Sensor Configuration
// ==========================================
#define PIN_HX711_DOUT    26   // HX711 Serial Data Out Pin (GPIO 26)
#define PIN_HX711_SCK     27   // HX711 Serial Clock Pin (GPIO 27)
#define DEFAULT_SCALE_CALIBRATION_FACTOR 420.0f // ADC counts per gram
#define CUP_MIN_WEIGHT_GRAMS             10.0f  // Minimum weight (g) to confirm cup on scale

// ==========================================
// Flow Rate Calibration Defaults (ml/sec)
// ==========================================
// Default flow rate per pump in milliliters per second.
// Default assumes ~15 ml/sec for standard 12V diaphragm pumps.
// Can be customized via Web API / EEPROM
#define DEFAULT_FLOW_RATE_ML_PER_SEC 15.0f
#define DEFAULT_TRANSFER_FLOW_RATE_ML_PER_SEC 20.0f

// ==========================================
// System State Enum
// ==========================================
enum SystemState {
    STATE_IDLE,
    STATE_DOSING_MIXER,     // Relays 1-5: Tank Pumps to Mixer Chamber
    STATE_MIXING,           // Relay 6: Mixer / Stirrer Motor active
    STATE_WAITING_FOR_CUP,  // Waiting for cup placement under Relay 7 nozzle
    STATE_POURING_TO_CUP,   // Relay 7: Mixer-to-Cup Transfer Pump with Load Cell feedback
    STATE_COMPLETED,
    STATE_PAUSED_NO_CUP,
    STATE_ERROR
};

#endif // CONFIG_H
