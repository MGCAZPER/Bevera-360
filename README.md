# 🍹 Bevera-360: Smart Robotic Bartender System

**Bevera-360** is a full-stack automated mixology platform powered by an **ESP32 microcontroller**, a **5-Channel Relay Module**, 5× 12V DC liquid pumps, a 12V stirrer motor, an **IR Cup Proximity Sensor**, a **16×2 I2C LCD screen**, and an interactive **Web Application**.

---

## 🌟 Key Features

- **🍹 Interactive Web Application**:
  - **Customer Menu**: 5 signature preset drinks + visual ingredient ratio breakdowns.
  - **Custom Mixology Lab**: Customize liquid volume (0–100 ml per pump) and stirrer motor duration.
  - **Bartender Queue**: Real-time incoming order dashboard & tank level monitoring (Tanks 1–5).
  - **Precision Flow Rate Calibration**: Calibrate each pump's output (`ml/sec`) with a 10-second test pour. Saves values persistently to ESP32 EEPROM.
  - **Hardware Diagnostic Bench**: Individual relay toggles, IR cup sensor simulation, and 16x2 LCD message sender.

- **🧠 ESP32 Controller Firmware**:
  - **Non-Blocking State Machine**: Handles multi-liquid dispensing and stirring using high-precision `millis()` timers.
  - **IR Sensor Interlock**: Automatically pauses pumps mid-pour if a cup is missing or removed.
  - **EEPROM Storage**: Saves pump calibration constants persistently.
  - **REST API Endpoints**: Allows control over Wi-Fi (`/api/order`, `/api/status`, `/api/calibrate`, `/api/manual`, `/api/stop`).

- **🔌 Electrical Safety & Dual Power Supply**:
  - **12V DC High Power Line** for pumps and stirrer motor.
  - **12V → 5V Buck Converter** for logic circuitry (ESP32, LCD, IR Sensor).

---

## 📁 Repository Structure

```
Bevera-360/
├── web/                           # React + Vite + Tailwind Web Application
│   ├── src/
│   │   ├── components/            # Navbar, Menu, Queue, Calibration, Diagnostics, Modal
│   │   ├── context/               # BartenderContext & Hardware API Handler
│   │   ├── App.jsx
│   │   └── index.css              # Glassmorphic Dark Design Tokens
│   ├── package.json
│   └── index.html
├── firmware/
│   └── Bevera360_ESP32/
│       ├── Bevera360_ESP32.ino    # ESP32 Main Loop & State Machine
│       ├── Config.h               # Pin Allocations & Network Configuration
│       ├── Hardware.h             # Relay, LCD, IR Sensor & EEPROM Drivers
│       └── WebServer.h            # HTTP REST API Server
├── docs/
│   ├── WIRING_DIAGRAM.md          # Comprehensive Wiring & Pinout Guide
│   └── SETUP_GUIDE.md             # Assembly, Flashing & Calibration Guide
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Launch Web Application Locally
```bash
cd web
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Flash ESP32 Firmware
1. Open `firmware/Bevera360_ESP32/Bevera360_ESP32.ino` in **Arduino IDE**.
2. Install `LiquidCrystal_I2C` and `ArduinoJson` libraries.
3. Upload to your **ESP32** board.
4. Connect to Wi-Fi Access Point: `Bevera360_Bartender` (Password: `bevera123`).

---

## 📜 Documentation Links

- [🔌 Electrical Wiring Diagram & Pin Mapping](docs/WIRING_DIAGRAM.md)
- [🍹 Setup, Assembly & Calibration Guide](docs/SETUP_GUIDE.md)
