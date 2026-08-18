/*
 * ===============================================================================
 * BEVERA-360: ESP32 7-RELAY HARDWARE RANDOM FIRING TEST SKETCH
 * ===============================================================================
 * 
 * Purpose:
 * Standalone test script to continuously and randomly fire all 7 relay channels
 * (Pumps 1-5, Relay 6 Mixer Motor, and Relay 7 Transfer Pump) to physically test
 * relay module optocoupler LEDs, magnetic coil click sounds, 12V DC power wiring,
 * and JD-VCC coil power.
 * 
 * Exact GPIO Pin Assignments Tested:
 * -------------------------------------------------------------------------------
 * Relay 1 (Tank Pump 1)      -->  GPIO 23
 * Relay 2 (Tank Pump 2)      -->  GPIO 25
 * Relay 3 (Tank Pump 3)      -->  GPIO 19
 * Relay 4 (Tank Pump 4)      -->  GPIO 18
 * Relay 5 (Tank Pump 5)      -->  GPIO 5
 * Relay 6 (Mixer Motor)      -->  GPIO 21
 * Relay 7 (Transfer Pump)    -->  GPIO 22
 * 
 * Target Board: ESP32 Dev Module
 * Serial Monitor Speed: 115200 Baud
 * ===============================================================================
 */

#include <Arduino.h>

// Set your Relay module logic type:
// Most standard Relay boards are ACTIVE LOW (true = turns ON with 0V / LOW)
// If your relays turn ON when pin is HIGH, set RELAY_ACTIVE_LOW to false.
bool RELAY_ACTIVE_LOW = true;

// Exact Bevera-360 7-Channel Relay Pin Mapping
struct RelayConfig {
    uint8_t pin;
    const char* name;
    bool currentState;
};

RelayConfig RELAYS[] = {
    {23, "Relay 1: Tank Pump 1     (GPIO 23)", false},
    {25, "Relay 2: Tank Pump 2     (GPIO 25)", false},
    {19, "Relay 3: Tank Pump 3     (GPIO 19)", false},
    {18, "Relay 4: Tank Pump 4     (GPIO 18)", false},
    {16, "Relay 5: Tank Pump 5     (GPIO 16)", false},
    {32, "Relay 6: Mixer Motor     (GPIO 32)", false},
    {33, "Relay 7: Transfer Pump   (GPIO 33)", false}
};

const uint8_t TOTAL_RELAYS = sizeof(RELAYS) / sizeof(RELAYS[0]);

// Helper function to set relay hardware state
void setRelayState(uint8_t index, bool turnOn) {
    if (index >= TOTAL_RELAYS) return;

    RELAYS[index].currentState = turnOn;
    uint8_t pinLevel = RELAY_ACTIVE_LOW ? (turnOn ? LOW : HIGH) : (turnOn ? HIGH : LOW);
    digitalWrite(RELAYS[index].pin, pinLevel);

    Serial.print("  [RELAY ");
    Serial.print(index + 1);
    Serial.print(" / GPIO ");
    Serial.print(RELAYS[index].pin);
    Serial.print("] -> ");
    if (turnOn) {
        Serial.println("⚡ ON  (CLOSED / CLICKED)");
    } else {
        Serial.println("💤 OFF (OPEN)");
    }
}

void turnAllOff() {
    for (uint8_t i = 0; i < TOTAL_RELAYS; i++) {
        setRelayState(i, false);
    }
}

void setup() {
    Serial.begin(115200);
    delay(1500);

    Serial.println("\n=======================================================");
    Serial.println("  🍹 BEVERA-360: ESP32 7-RELAY RANDOM FIRING TESTER  ");
    Serial.println("=======================================================");
    Serial.print("Active Low Logic: ");
    Serial.println(RELAY_ACTIVE_LOW ? "TRUE (0V = ON)" : "FALSE (3.3V = ON)");
    Serial.print("Total Relays Configured: ");
    Serial.println(TOTAL_RELAYS);
    Serial.println("-------------------------------------------------------\n");

    // Initialize all 7 GPIO pins as OUTPUT and force OFF (Pre-latch HIGH to avoid startup pulse)
    for (uint8_t i = 0; i < TOTAL_RELAYS; i++) {
        uint8_t inactiveLevel = RELAY_ACTIVE_LOW ? HIGH : LOW;
        digitalWrite(RELAYS[i].pin, inactiveLevel);
        pinMode(RELAYS[i].pin, OUTPUT);
        digitalWrite(RELAYS[i].pin, inactiveLevel);
    }
    turnAllOff();
    delay(1000);

    // ==========================================
    // STAGE 1: SEQUENTIAL SWEEP (1 BY 1)
    // ==========================================
    Serial.println("--- STAGE 1: Sequential 1-by-1 Relay Click Sweep ---");
    for (uint8_t i = 0; i < TOTAL_RELAYS; i++) {
        Serial.print("Testing ");
        Serial.println(RELAYS[i].name);
        
        setRelayState(i, true);   // Turn ON (Click)
        delay(1200);              // Hold for 1.2 sec
        
        setRelayState(i, false);  // Turn OFF
        delay(300);
    }

    // ==========================================
    // STAGE 2: ALL RELAYS SIMULTANEOUS BURST
    // ==========================================
    Serial.println("\n--- STAGE 2: All 7 Relays Burst Test (ON 2s -> OFF 2s) ---");
    Serial.println("Turning ALL 7 Relays ON simultaneously...");
    for (uint8_t i = 0; i < TOTAL_RELAYS; i++) setRelayState(i, true);
    delay(2000);

    Serial.println("Turning ALL 7 Relays OFF...");
    turnAllOff();
    delay(2000);

    Serial.println("\n=======================================================");
    Serial.println("  STARTING INFINITE RANDOM RELAY FIRING LOOP  ");
    Serial.println("  (Type 1-7 to toggle manually, ALL_ON, ALL_OFF) ");
    Serial.println("=======================================================\n");

    randomSeed(analogRead(34) + millis());
}

void loop() {
    // 1. Process Serial CLI inputs if user sends command
    if (Serial.available() > 0) {
        String cmd = Serial.readStringUntil('\n');
        cmd.trim();
        cmd.toUpperCase();

        if (cmd.length() == 1 && cmd[0] >= '1' && cmd[0] <= '7') {
            uint8_t idx = cmd[0] - '1';
            bool newState = !RELAYS[idx].currentState;
            Serial.print("[MANUAL CLI] ");
            setRelayState(idx, newState);
        } else if (cmd == "ALL_ON") {
            Serial.println("[MANUAL CLI] Forcing ALL 7 Relays ON...");
            for (uint8_t i = 0; i < TOTAL_RELAYS; i++) setRelayState(i, true);
        } else if (cmd == "ALL_OFF") {
            Serial.println("[MANUAL CLI] Forcing ALL 7 Relays OFF...");
            turnAllOff();
        } else if (cmd == "TOGGLE_LOGIC") {
            RELAY_ACTIVE_LOW = !RELAY_ACTIVE_LOW;
            Serial.print("[MANUAL CLI] Toggled RELAY_ACTIVE_LOW to: ");
            Serial.println(RELAY_ACTIVE_LOW ? "TRUE (0V = ON)" : "FALSE (3.3V = ON)");
            turnAllOff();
        }
    }

    // 2. Pick a random relay channel (0 to TOTAL_RELAYS - 1)
    uint8_t randomIndex = random(0, TOTAL_RELAYS);

    // 3. Pick a random target state (true = ON, false = OFF)
    bool randomState = (random(0, 2) == 1);

    // 4. Apply state to selected relay
    Serial.print("[RANDOM FIRE] ");
    setRelayState(randomIndex, randomState);

    // 5. Random delay between 300ms and 1500ms
    uint32_t randomDelay = random(300, 1500);
    delay(randomDelay);
}

