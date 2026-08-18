/*
 * Bevera-360 Smart Robotic Bartender
 * ESP32 Web Server & REST / WebSocket API Handler
 */

#ifndef BEVERA_WEBSERVER_H
#define BEVERA_WEBSERVER_H

#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include "Config.h"
#include "Hardware.h"

// Forward declaration of system state variables in main .ino
extern SystemState currentState;
extern String currentDrinkName;
extern float targetVolumesMl[NUM_PUMPS];
extern uint32_t stirrerDurationMs;
extern uint8_t currentPumpIndex;
extern uint32_t stateStartTime;
extern uint32_t pumpDurationMs;

class BartenderWebServer {
private:
    WebServer server;
    HardwareController* hw;

    void handleCORS() {
        server.sendHeader("Access-Control-Allow-Origin", "*");
        server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
    }

public:
    BartenderWebServer(HardwareController* hardwarePtr) : server(80), hw(hardwarePtr) {}

    void init() {
        // Setup Wi-Fi
        if (WIFI_AP_MODE) {
            WiFi.softAP(WIFI_SSID, WIFI_PASSWORD);
            Serial.print("Access Point started! SSID: ");
            Serial.println(WIFI_SSID);
            Serial.print("IP Address: ");
            Serial.println(WiFi.softAPIP());
        } else {
            WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
            Serial.print("Connecting to Wi-Fi");
            while (WiFi.status() != WL_CONNECTED) {
                delay(500);
                Serial.print(".");
            }
            Serial.println("\nConnected! IP Address: ");
            Serial.println(WiFi.localIP());
        }

        // Define API Routes
        server.on("/api/status", HTTP_GET, std::bind(&BartenderWebServer::handleGetStatus, this));
        server.on("/api/order", HTTP_POST, std::bind(&BartenderWebServer::handlePostOrder, this));
        server.on("/api/calibrate", HTTP_POST, std::bind(&BartenderWebServer::handlePostCalibrate, this));
        server.on("/api/manual", HTTP_POST, std::bind(&BartenderWebServer::handlePostManual, this));
        server.on("/api/stop", HTTP_POST, std::bind(&BartenderWebServer::handlePostStop, this));
        server.on("/api/tare", HTTP_POST, std::bind(&BartenderWebServer::handlePostTare, this));
        server.on("/api/calibrate_scale", HTTP_POST, std::bind(&BartenderWebServer::handlePostCalibrateScale, this));

        // Options pre-flight for CORS
        server.onNotFound([this]() {
            if (server.method() == HTTP_OPTIONS) {
                handleCORS();
                server.send(204);
            } else {
                server.send(404, "text/plain", "Not Found");
            }
        });

        server.begin();
        Serial.println("HTTP Server started on port 80");
    }

    void handleClient() {
        server.handleClient();
    }

private:
    void handleGetStatus() {
        handleCORS();
        StaticJsonDocument<1200> doc;

        doc["state"] = getStateString(currentState);
        doc["cup_present"] = hw->isCupPresent();
        doc["current_drink"] = currentDrinkName;
        doc["stirrer"] = hw->getStirrerState() ? "ON" : "OFF";
        doc["transfer_pump"] = hw->getTransferPumpState() ? "ON" : "OFF";
        doc["gross_weight_g"] = hw->getGrossWeightGrams();
        doc["net_weight_g"] = hw->getNetWeightGrams();
        doc["scale_factor"] = hw->getCalibrationFactor();

        JsonArray pumpStatesArr = doc.createNestedArray("pump_states");
        JsonArray pumpsArr = doc.createNestedArray("pumps");
        for (int i = 0; i < NUM_PUMPS; i++) {
            bool isOn = hw->getPumpState(i);
            pumpStatesArr.add(isOn);

            JsonObject pObj = pumpsArr.createNestedObject();
            pObj["id"] = i + 1;
            pObj["on"] = isOn;
            pObj["status"] = isOn ? "ON" : "OFF";
            pObj["name"] = "PUMP " + String(i + 1) + " (TANK " + String(i + 1) + ")";
        }

        // Add Relay 6 (Stirrer) & Relay 7 (Transfer Pump) to pumps array
        JsonObject stirrerObj = pumpsArr.createNestedObject();
        stirrerObj["id"] = 6;
        stirrerObj["on"] = hw->getStirrerState();
        stirrerObj["status"] = hw->getStirrerState() ? "ON" : "OFF";
        stirrerObj["name"] = "RELAY 6 (MIXER MOTOR)";

        JsonObject transferObj = pumpsArr.createNestedObject();
        transferObj["id"] = 7;
        transferObj["on"] = hw->getTransferPumpState();
        transferObj["status"] = hw->getTransferPumpState() ? "ON" : "OFF";
        transferObj["name"] = "RELAY 7 (MIXER TO CUP PUMP)";

        JsonObject rates = doc.createNestedObject("flow_rates_ml_sec");
        for (int i = 0; i < NUM_PUMPS; i++) {
            rates["pump_" + String(i + 1)] = hw->getFlowRate(i);
        }

        String json;
        serializeJson(doc, json);
        server.send(200, "application/json", json);
    }

    void handlePostOrder() {
        handleCORS();
        if (!server.hasArg("plain")) {
            server.send(400, "application/json", "{\"error\":\"Missing body\"}");
            return;
        }

        StaticJsonDocument<512> doc;
        DeserializationError err = deserializeJson(doc, server.arg("plain"));
        if (err) {
            server.send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
            return;
        }

        if (currentState != STATE_IDLE && currentState != STATE_COMPLETED) {
            server.send(409, "application/json", "{\"error\":\"Machine is currently busy\"}");
            return;
        }

        currentDrinkName = doc["drink_name"] | "Custom Drink";
        JsonArray volumes = doc["volumes_ml"];
        
        for (int i = 0; i < NUM_PUMPS; i++) {
            if (i < volumes.size()) {
                targetVolumesMl[i] = volumes[i].as<float>();
            } else {
                targetVolumesMl[i] = 0.0f;
            }
        }

        stirrerDurationMs = (doc["stirrer_sec"] | 3) * 1000;

        // Transition system to Stage 1: Dosing into Mixer Chamber via Relays 1-5
        currentPumpIndex = 0;
        while (currentPumpIndex < NUM_PUMPS && targetVolumesMl[currentPumpIndex] <= 0) {
            currentPumpIndex++;
        }

        if (currentPumpIndex < NUM_PUMPS) {
            pumpDurationMs = hw->calculatePourDurationMs(currentPumpIndex, targetVolumesMl[currentPumpIndex]);
            stateStartTime = millis();
            hw->setPumpState(currentPumpIndex, true);
            currentState = STATE_DOSING_MIXER;
        } else {
            // No tank pumps needed, go to mixing or waiting for cup
            if (stirrerDurationMs > 0) {
                stateStartTime = millis();
                hw->setStirrerState(true);
                currentState = STATE_MIXING;
            } else {
                currentState = STATE_WAITING_FOR_CUP;
            }
        }

        server.send(200, "application/json", "{\"status\":\"Order accepted\",\"drink\":\"" + currentDrinkName + "\"}");
    }

    void handlePostCalibrate() {
        handleCORS();
        if (!server.hasArg("plain")) {
            server.send(400, "application/json", "{\"error\":\"Missing body\"}");
            return;
        }

        StaticJsonDocument<256> doc;
        if (deserializeJson(doc, server.arg("plain"))) {
            server.send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
            return;
        }

        int pumpIdx = (doc["pump_index"] | 1) - 1; // 1-indexed in UI
        float rate = doc["flow_rate_ml_sec"] | 15.0f;

        if (pumpIdx >= 0 && pumpIdx < NUM_PUMPS) {
            hw->setFlowRate(pumpIdx, rate);
            server.send(200, "application/json", "{\"status\":\"Calibrated successfully\"}");
        } else {
            server.send(400, "application/json", "{\"error\":\"Invalid pump index\"}");
        }
    }

    void handlePostManual() {
        handleCORS();
        if (!server.hasArg("plain")) {
            server.send(400, "application/json", "{\"error\":\"Missing body\"}");
            return;
        }

        StaticJsonDocument<256> doc;
        if (deserializeJson(doc, server.arg("plain"))) {
            server.send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
            return;
        }

        String target = doc["target"] | "";
        bool state = doc["state"] | false;

        if (target.startsWith("pump_")) {
            int pNum = target.substring(5).toInt() - 1;
            if (pNum >= 0 && pNum < NUM_PUMPS) {
                hw->setPumpState(pNum, state);
            } else if (pNum == 5) { // pump_6 -> Relay 6 Mixer Motor
                hw->setStirrerState(state);
            } else if (pNum == 6) { // pump_7 -> Relay 7 Transfer Pump
                hw->setTransferPumpState(state);
            }
        } else if (target == "stirrer" || target == "relay_6" || target == "mixer") {
            hw->setStirrerState(state);
        } else if (target == "transfer_pump" || target == "relay_7" || target == "deliver") {
            hw->setTransferPumpState(state);
        }

        server.send(200, "application/json", "{\"status\":\"Manual control executed\"}");
    }

    void handlePostStop() {
        handleCORS();
        hw->stopAll();
        currentState = STATE_IDLE;
        currentDrinkName = "";
        server.send(200, "application/json", "{\"status\":\"Emergency stop executed\"}");
    }

    void handlePostTare() {
        handleCORS();
        hw->tare();
        server.send(200, "application/json", "{\"status\":\"Load cell tared successfully\",\"gross_weight_g\":0.0}");
    }

    void handlePostCalibrateScale() {
        handleCORS();
        if (!server.hasArg("plain")) {
            server.send(400, "application/json", "{\"error\":\"Missing body\"}");
            return;
        }

        StaticJsonDocument<256> doc;
        if (deserializeJson(doc, server.arg("plain"))) {
            server.send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
            return;
        }

        if (doc.containsKey("known_weight_g")) {
            float knownWeight = doc["known_weight_g"].as<float>();
            hw->calibrateScale(knownWeight);
            server.send(200, "application/json", "{\"status\":\"Scale calibrated via known weight\",\"scale_factor\":" + String(hw->getCalibrationFactor()) + "}");
        } else if (doc.containsKey("scale_factor")) {
            float factor = doc["scale_factor"].as<float>();
            hw->setCalibrationFactor(factor);
            server.send(200, "application/json", "{\"status\":\"Scale factor set directly\",\"scale_factor\":" + String(hw->getCalibrationFactor()) + "}");
        } else {
            server.send(400, "application/json", "{\"error\":\"Specify known_weight_g or scale_factor\"}");
        }
    }

    String getStateString(SystemState state) {
        switch (state) {
            case STATE_IDLE: return "IDLE";
            case STATE_DOSING_MIXER: return "DOSING_MIXER";
            case STATE_MIXING: return "MIXING";
            case STATE_WAITING_FOR_CUP: return "WAITING_FOR_CUP";
            case STATE_POURING_TO_CUP: return "POURING_TO_CUP";
            case STATE_COMPLETED: return "COMPLETED";
            case STATE_PAUSED_NO_CUP: return "PAUSED_NO_CUP";
            case STATE_ERROR: return "ERROR";
            default: return "UNKNOWN";
        }
    }
};

#endif // BEVERA_WEBSERVER_H
