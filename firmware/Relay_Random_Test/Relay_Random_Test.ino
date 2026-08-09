/*
 * ===============================================================================
 * BEVERA-360 / ESP32 RELAY HARDWARE TEST SKETCH
 * ===============================================================================
 * 
 * Purpose:
 * This standalone test script continuously and randomly toggles all relay channels
 * (Pumps 1-5 and Stirrer Motor Relay) to physically test your 5-Channel / 8-Channel
 * Relay Module LEDs, switching solenoids, clicking sounds, and power wiring.
 * 
 * Target Board: ESP32 Dev Module
 * Serial Monitor Speed: 115200 Baud
 * ===============================================================================
 */

#include <Arduino.h>

// Set your Relay module logic type:
// Most standard Relay boards are ACTIVE LOW (true = turns ON with 0V / LOW)
// If your relays click when pin is HIGH, set RELAY_ACTIVE_LOW to false.
const bool RELAY_ACTIVE_LOW = true;

// Define relay output pins matching Bevera-360 Hardware mapping
const uint8_t RELAY_PINS[] = {
    23, // Relay 1 -> Pump 1 (Tank 1)
    25, // Relay 2 -> Pump 2 (Tank 2)
    19, // Relay 3 -> Pump 3 (Tank 3)
    18, // Relay 4 -> Pump 4 (Tank 4)
    5,  // Relay 5 -> Pump 5 (Tank 5)
    17, // Relay 6 -> Stirrer Motor (Primary GPIO 17)
    14  // Relay 6 Alt -> Stirrer Motor (Alternate GPIO 14)
};

const char* RELAY_NAMES[] = {
    "Relay 1 (Pump 1 / GPIO 23)",
    "Relay 2 (Pump 2 / GPIO 25)",
    "Relay 3 (Pump 3 / GPIO 19)",
    "Relay 4 (Pump 4 / GPIO 18)",
    "Relay 5 (Pump 5 / GPIO 5)",
    "Relay 6 (Stirrer / GPIO 17)",
    "Relay 6 Alt (Stirrer / GPIO 14)"
};

const uint8_t TOTAL_RELAYS = sizeof(RELAY_PINS) / sizeof(RELAY_PINS[0]);

// Helper helper functions to turn relay ON / OFF
void setRelayState(uint8_t index, bool stateOn) {
    uint8_t pin = RELAY_PINS[index];
    uint8_t pinLevel;

    if (RELAY_ACTIVE_LOW) {
        pinLevel = stateOn ? LOW : HIGH;
    } else {
        pinLevel = stateOn ? HIGH : LOW;
    }

    digitalWrite(pin, pinLevel);

    Serial.print("  [RELAY ");
    Serial.print(index + 1);
    Serial.print("] Pin ");
    Serial.print(pin);
    Serial.print(" -> ");
    Serial.println(stateOn ? "⚡ ON  (CLOSED)" : "💤 OFF (OPEN)");
}

void turnAllOff() {
    for (uint8_t i = 0; i < TOTAL_RELAYS; i++) {
        setRelayState(i, false);
    }
}

void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println("\n==================================================");
    Serial.println("  🍹 BEVERA-360: ESP32 RELAY TEST BENCH SKETCH  ");
    Serial.println("==================================================");
    Serial.print("Active Low Logic: ");
    Serial.println(RELAY_ACTIVE_LOW ? "TRUE (0V = ON)" : "FALSE (3.3V = ON)");
    Serial.print("Total Relays Configured: ");
    Serial.println(TOTAL_RELAYS);
    Serial.println("--------------------------------------------------\n");

    // Initialize all GPIO pins as OUTPUT and set them to OFF state
    for (uint8_t i = 0; i < TOTAL_RELAYS; i++) {
        pinMode(RELAY_PINS[i], OUTPUT);
    }
    turnAllOff();
    delay(1000);

    // ==========================================
    // STAGE 1: SEQUENTIAL RELAY TEST (1 BY 1)
    // ==========================================
    Serial.println("\n--- STAGE 1: Testing Each Relay Sequentially ---");
    for (uint8_t i = 0; i < TOTAL_RELAYS; i++) {
        Serial.print("Testing ");
        Serial.println(RELAY_NAMES[i]);
        
        setRelayState(i, true);  // Turn ON
        delay(1200);             // Hold ON for 1.2s
        
        setRelayState(i, false); // Turn OFF
        delay(400);
    }

    // ==========================================
    // STAGE 2: ALL RELAYS BURST TEST
    // ==========================================
    Serial.println("\n--- STAGE 2: All Relays Burst (ON 2s -> OFF 2s) ---");
    Serial.println("Turning ALL Relays ON simultaneously...");
    for (uint8_t i = 0; i < TOTAL_RELAYS; i++) setRelayState(i, true);
    delay(2000);

    Serial.println("Turning ALL Relays OFF...");
    turnAllOff();
    delay(2000);

    Serial.println("\n==================================================");
    Serial.println("  STARTING INFINITE RANDOM RELAY TOGGLE LOOP  ");
    Serial.println("==================================================");
    randomSeed(analogRead(34) + millis());
}

void loop() {
    // Pick a random relay channel (0 to TOTAL_RELAYS - 1)
    uint8_t randomIndex = random(0, TOTAL_RELAYS);

    // Pick a random ON/OFF state (true = ON, false = OFF)
    bool randomState = (random(0, 2) == 1);

    // Apply state
    Serial.print("[RANDOM TEST] ");
    Serial.print(RELAY_NAMES[randomIndex]);
    Serial.print(" => ");
    setRelayState(randomIndex, randomState);

    // Random delay between 400ms and 1800ms
    uint32_t randomDelay = random(400, 1800);
    delay(randomDelay);
}
