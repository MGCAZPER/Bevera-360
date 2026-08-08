# 🍹 Bevera-360 Setup, Calibration & Flashing Guide

Welcome to the **Bevera-360 Smart Robotic Bartender** setup guide. Follow these instructions to assemble, flash, calibrate, and operate the bartender machine.

---

## 🛠️ 1. Required Libraries & ESP32 Flashing

### Requirements:
- **Arduino IDE 2.0+** or **VS Code + PlatformIO**
- **ESP32 Board Package** (`esp32` by Espressif Systems v2.0+)

### Required Arduino Libraries:
Install the following libraries via Arduino IDE Library Manager:
1. `LiquidCrystal_I2C` by Frank de Brabander
2. `ArduinoJson` by Benoit Blanchon (v6.x or v7.x)

### Flashing Steps:
1. Open `firmware/Bevera360_ESP32/Bevera360_ESP32.ino` in Arduino IDE.
2. Select Board: **ESP32 Dev Module** (or your specific ESP32 variant).
3. Select the COM port connected to your ESP32.
4. Verify and Upload the sketch.
5. Open Serial Monitor at **115200 baud** to confirm system initialization and check IP address (`192.168.4.1` in Access Point mode).

---

## 🧪 2. Pump Calibration Procedure

Because different liquid viscosities (syrups vs. water vs. juices) and pump tube lengths affect flow rate, each pump must be calibrated to ensure exact `ml` pour accuracy.

### Calibration Steps:
1. Fill Tank 1 with water.
2. Open the **Bevera-360 Web Application** and navigate to **System Management -> Pump Calibration**.
3. Place a graduated measuring cylinder (or scale) under the nozzle.
4. Click **Test Pour 10 Seconds** for Pump 1.
5. Read the exact volume of water dispensed (e.g. `140 ml`).
6. Calculate flow rate:
   $$\text{Flow Rate (ml/sec)} = \frac{\text{Dispensed Volume (ml)}}{10\text{ seconds}} = \frac{140}{10} = 14.0\text{ ml/sec}$$
7. Enter `14.0` in the calibration box for Pump 1 and click **Save Calibration**.
8. The ESP32 will automatically save this value to **EEPROM** persistently across reboots.
9. Repeat for Pumps 2 through 5.

---

## 🚰 3. Food-Grade Tubing & Mechanical Assembly

1. **Food-Grade Material**: Ensure all tubes connected between Tanks 1-5, Pumps, Mixing Chamber, and Nozzle are **Food-Grade Silicone (FDA approved)**.
2. **Priming the Lines**: Before serving drinks to customers, run a 5-second test pour for each line to prime the tubes and eliminate air bubbles.
3. **Cleaning / Sanitization Cycle**: At the end of every shift:
   - Fill Tanks 1-5 with warm water and food-safe disinfectant.
   - Run the **Clean System** cycle in the Web App to flush all 5 lines and the mixing chamber.

---

## 🌐 4. Web Application Launch

1. Connect your computer/tablet/mobile device to the ESP32 Wi-Fi network:
   - **SSID**: `Bevera360_Bartender`
   - **Password**: `bevera123`
2. Open your web browser and navigate to `http://192.168.4.1` (or run the web app locally on your device in Live Mode).
3. Select your drink, verify cup placement, and enjoy automated mixology!
