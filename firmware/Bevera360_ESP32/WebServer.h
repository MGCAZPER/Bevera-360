/*
 * Bevera-360 Smart Robotic Bartender
 * ESP32 Web Server & REST / WebSocket API Handler
 */

#ifndef WEBSERVER_H
#define WEBSERVER_H

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
        StaticJsonDocument<512> doc;

        doc["state"] = getStateString(currentState);
        doc["cup_present"] = hw->isCupPresent();
        doc["current_drink"] = currentDrinkName;

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

        // Transition system to start processing order
        currentState = STATE_WAITING_FOR_CUP;

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
            }
        } else if (target == "stirrer") {
            hw->setStirrerState(state);
        }

        server.send(200, "application/json", "{\"status\":\"Manual control executed\"}");
    }

    void handlePostStop() {
        handleCORS();
        hw->stopAll();
        currentState = STATE_IDLE;
        currentDrinkName = "";
        hw->showLCDReady();
        server.send(200, "application/json", "{\"status\":\"Emergency stop executed\"}");
    }

    String getStateString(SystemState state) {
        switch (state) {
            case STATE_IDLE: return "IDLE";
            case STATE_WAITING_FOR_CUP: return "WAITING_FOR_CUP";
            case STATE_POURING: return "POURING";
            case STATE_MIXING: return "MIXING";
            case STATE_COMPLETED: return "COMPLETED";
            case STATE_PAUSED_NO_CUP: return "PAUSED_NO_CUP";
            case STATE_ERROR: return "ERROR";
            default: return "UNKNOWN";
        }
    }
};

#endif // WEBSERVER_H
