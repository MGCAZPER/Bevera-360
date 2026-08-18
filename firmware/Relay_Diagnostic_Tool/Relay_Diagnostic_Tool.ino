/*
 * ===============================================================================
 * BEVERA-360: ESP32 RELAY HARDWARE DIAGNOSTIC & TROUBLESHOOTING TOOL
 * ===============================================================================
 * 
 * If your relays are NOT physically clicking or turning on/off, upload this tool!
 * 
 * Hardware Checklist & Common ESP32 Relay Issues:
 * -------------------------------------------------------------------------------
 * 1. COMMON GROUND (CRITICAL):
 *    The Relay Module GND pin MUST be connected directly to the ESP32 GND pin!
 *    Without common GND, the GPIO signals have no return path.
 * 
 * 2. 3.3V vs 5V OPTOCOUPLER ISSUE:
 *    ESP32 GPIO pins output 3.3V logic. Many 5V relay modules require 5V on VCC.
 *    If VCC is connected to 5V, when ESP32 outputs HIGH (3.3V), the 1.7V difference
 *    is STILL ENOUGH to trigger the optocoupler, so the relay stays ON forever!
 *    -> FIX: Connect Relay VCC header pin to ESP32 3.3V pin!
 *    -> Or if board has JD-VCC jumper: Remove jumper, wire JD-VCC to 5V, VCC to 3.3V.
 * 
 * 3. COIL POWER:
 *    The relay module needs 5V (or 12V) on JD-VCC to power the mechanical coil.
 * 
 * Open Serial Monitor at 115200 Baud for Interactive Diagnostics!
 * ===============================================================================
 */

#include <Arduino.h>

struct RelayPinInfo {
    uint8_t pin;
    const char* name;
};

// We test both default pins and alternate clean ESP32 pins
RelayPinInfo PINS_TO_TEST[] = {
    {23, "Relay 1 (GPIO 23)"},
    {25, "Relay 2 (GPIO 25)"},
    {19, "Relay 3 (GPIO 19)"},
    {18, "Relay 4 (GPIO 18)"},
    {16, "Relay 5 (GPIO 16)"},
    {32, "Relay 6 Mixer (GPIO 32)"},
    {33, "Relay 7 Transfer (GPIO 33)"}
};

const uint8_t TOTAL_PINS = sizeof(PINS_TO_TEST) / sizeof(PINS_TO_TEST[0]);

void setup() {
    Serial.begin(115200);
    delay(1500);

    Serial.println("\n=======================================================");
    Serial.println(" 🔧 BEVERA-360: ESP32 RELAY HARDWARE DIAGNOSTIC TOOL ");
    Serial.println("=======================================================");
    Serial.println("Starting 3-State Pulse Test (LOW -> HIGH -> INPUT/FLOAT)\n");

    // Initialize all test pins as OUTPUT
    for (uint8_t i = 0; i < TOTAL_PINS; i++) {
        pinMode(PINS_TO_TEST[i].pin, OUTPUT);
        digitalWrite(PINS_TO_TEST[i].pin, HIGH); // Default HIGH (Inactive for Active LOW)
    }

    // ==========================================
    // STEP-BY-STEP PIN TEST
    // ==========================================
    for (uint8_t i = 0; i < TOTAL_PINS; i++) {
        uint8_t p = PINS_TO_TEST[i].pin;
        Serial.println("-------------------------------------------------------");
        Serial.print("TESTING: ");
        Serial.println(PINS_TO_TEST[i].name);

        // State 1: Pull to 0V / LOW (Active LOW ON)
        Serial.print("  State 1: GPIO "); Serial.print(p); Serial.println(" -> LOW  (0V)     [Should Click ON if Active LOW]");
        pinMode(p, OUTPUT);
        digitalWrite(p, LOW);
        delay(2000);

        // State 2: Pull to 3.3V / HIGH (Active LOW OFF)
        Serial.print("  State 2: GPIO "); Serial.print(p); Serial.println(" -> HIGH (3.3V)   [Should Click OFF]");
        digitalWrite(p, HIGH);
        delay(2000);

        // State 3: Floating / INPUT Mode (High Impedance)
        Serial.print("  State 3: GPIO "); Serial.print(p); Serial.println(" -> INPUT (Float) [Relay should turn OFF completely]");
        pinMode(p, INPUT);
        delay(1500);
    }

    Serial.println("\n=======================================================");
    Serial.println(" DIAGNOSTIC PULSE TEST COMPLETE! ");
    Serial.println("=======================================================");
    Serial.println("\nINTERACTIVE COMMAND MODE:");
    Serial.println(" Type '1' to toggle Relay 1 (GPIO 23)");
    Serial.println(" Type '2' to toggle Relay 2 (GPIO 25)");
    Serial.println(" Type '3' to toggle Relay 3 (GPIO 19)");
    Serial.println(" Type '4' to toggle Relay 4 (GPIO 18)");
    Serial.println(" Type '5' to toggle Relay 5 (GPIO 16)");
    Serial.println(" Type '6' to toggle Relay 6 (GPIO 32)");
    Serial.println(" Type '7' to toggle Relay 7 (GPIO 33)");
    Serial.println(" Type 'ALL_ON' to force all pins LOW (0V / ON)");
    Serial.println(" Type 'ALL_OFF' to force all pins HIGH (3.3V / OFF)");
    Serial.println("=======================================================\n");
}

void loop() {
    if (Serial.available() > 0) {
        String cmd = Serial.readStringUntil('\n');
        cmd.trim();
        cmd.toUpperCase();

        if (cmd == "1") {
            digitalWrite(23, !digitalRead(23));
            Serial.print("Relay 1 (GPIO 23) Toggled to: "); Serial.println(digitalRead(23) == LOW ? "LOW (0V / ON)" : "HIGH (3.3V / OFF)");
        } else if (cmd == "2") {
            digitalWrite(25, !digitalRead(25));
            Serial.print("Relay 2 (GPIO 25) Toggled to: "); Serial.println(digitalRead(25) == LOW ? "LOW (0V / ON)" : "HIGH (3.3V / OFF)");
        } else if (cmd == "3") {
            digitalWrite(19, !digitalRead(19));
            Serial.print("Relay 3 (GPIO 19) Toggled to: "); Serial.println(digitalRead(19) == LOW ? "LOW (0V / ON)" : "HIGH (3.3V / OFF)");
        } else if (cmd == "4") {
            digitalWrite(18, !digitalRead(18));
            Serial.print("Relay 4 (GPIO 18) Toggled to: "); Serial.println(digitalRead(18) == LOW ? "LOW (0V / ON)" : "HIGH (3.3V / OFF)");
        } else if (cmd == "5") {
            digitalWrite(16, !digitalRead(16));
            Serial.print("Relay 5 (GPIO 16) Toggled to: "); Serial.println(digitalRead(16) == LOW ? "LOW (0V / ON)" : "HIGH (3.3V / OFF)");
        } else if (cmd == "6") {
            digitalWrite(32, !digitalRead(32));
            Serial.print("Relay 6 (GPIO 32) Toggled to: "); Serial.println(digitalRead(32) == LOW ? "LOW (0V / ON)" : "HIGH (3.3V / OFF)");
        } else if (cmd == "7") {
            digitalWrite(33, !digitalRead(33));
            Serial.print("Relay 7 (GPIO 33) Toggled to: "); Serial.println(digitalRead(33) == LOW ? "LOW (0V / ON)" : "HIGH (3.3V / OFF)");
        } else if (cmd == "ALL_ON") {
            for (uint8_t i = 0; i < TOTAL_PINS; i++) {
                pinMode(PINS_TO_TEST[i].pin, OUTPUT);
                digitalWrite(PINS_TO_TEST[i].pin, LOW);
            }
            Serial.println("ALL PINS FORCED LOW (0V)");
        } else if (cmd == "ALL_OFF") {
            for (uint8_t i = 0; i < TOTAL_PINS; i++) {
                pinMode(PINS_TO_TEST[i].pin, OUTPUT);
                digitalWrite(PINS_TO_TEST[i].pin, HIGH);
            }
            Serial.println("ALL PINS FORCED HIGH (3.3V)");
        }
    }
}
