# 🔌 Bevera-360 Wiring Diagram & Electrical Specification

This document details the complete electrical wiring, power distribution, pin allocation, and relay connections for the **Bevera-360 Smart Robotic Bartender**.

---

## ⚡ 1. Power Distribution Overview

The machine uses **two voltage domains**:
1. **12V DC High Power Domain**: Supplies power to 5× 12V DC Liquid Pumps and 1× 12V DC Gear Stirrer Motor.
2. **5V / 3.3V Logic Domain**: Powers ESP32, 16×2 I2C LCD display, and IR Cup Proximity Sensor.

> [!CAUTION]
> **Power Isolation Rule**: Never power the 12V DC pumps directly from the ESP32 or 5V rail! Always pass 12V power through the Relay Module contacts and use a **12V → 5V DC-DC Buck Converter** to step down the main power supply for the electronic logic.

```
                         230V AC Grid Power
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │  12V 10A DC PSU       │
                     └───────────┬───────────┘
                                 │
         ┌───────────────────────┴───────────────────────┐
         │ (12V Main Bus)                                │ (12V Main Bus)
         ▼                                               ▼
┌─────────────────┐                             ┌───────────────────┐
│ 5-Channel Relay │                             │ 12V → 5V Buck     │
│ (COM Terminals) │                             │ Step-Down Module  │
└────────┬────────┘                             └─────────┬─────────┘
         │ NO Terminals                                   │ (5V Logic Bus)
         ├─────────────────────────────────┐              ▼
         ▼                                 ▼       ┌───────────────┐
   12V DC Pumps (1-5)                12V Stirrer   │  ESP32 Board  │
     (Negative ground shared)          Motor       └───────┬───────┘
                                                           │
                                             ┌─────────────┼─────────────┐
                                             ▼             ▼             ▼
                                         16x2 LCD      IR Sensor     Relay Inputs
                                         (I2C 5V)       (OUT 5V)      (IN1-IN6)
```

---

## 📌 2. ESP32 Pin Assignment Table

| Target Hardware Component | Target Pin | ESP32 GPIO Pin | Wire Color Code (Rec.) | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Relay 1** | IN 1 | **GPIO 23** | Yellow | Controls Pump 1 (Tank 1) |
| **Relay 2** | IN 2 | **GPIO 25** | Green | Controls Pump 2 (Tank 2) |
| **Relay 3** | IN 3 | **GPIO 19** | Blue | Controls Pump 3 (Tank 3) |
| **Relay 4** | IN 4 | **GPIO 18** | Purple | Controls Pump 4 (Tank 4) |
| **Relay 5** | IN 5 | **GPIO 5** | White | Controls Pump 5 (Tank 5) |
| **Relay 6 / Stirrer** | IN 6 | **GPIO 17** | Gray | Controls 12V Stirrer Motor |
| **IR Cup Sensor** | OUT / DO | **GPIO 4** | Orange | Digital Cup Proximity Detection |
| **16x2 LCD** | SDA | **GPIO 21** | Brown | I2C Data Line |
| **16x2 LCD** | SCL | **GPIO 22** | Black/Stripe | I2C Clock Line |
| **Power Input** | VIN / 5V | **Buck 5V OUT** | Red | Regulated 5V Power Supply |
| **Ground** | GND | **Common GND** | Black | Ground Reference (Shared) |

---

## 🔀 3. Relay Module Wiring (Active LOW Logic)

Most standard relay modules operate with **Active LOW** control logic (Relay turns ON when input is pulled to `0V / LOW`).

- **Relay VCC**: Connect to **5V** (Buck Converter OUT).
- **Relay GND**: Connect to **Common GND**.
- **Relay IN1 – IN6**: Connect to corresponding ESP32 GPIO pins listed above.

### High-Voltage DC Switching Connections:
- **Relay COM (Common)**: Connect to **+12V DC PSU Positive Terminal**.
- **Relay NO (Normally Open)**: Connect to **Positive terminal (+)** of each Pump / Stirrer Motor.
- **Pump/Motor Negative (-)**: Connect directly to **12V PSU Negative (-) / GND**.

---

## 👁️ 4. IR Cup Detection Sensor Setup

- **VCC**: Connect to **5V**.
- **GND**: Connect to **GND**.
- **OUT / DO**: Connect to **ESP32 GPIO 4**.

> [!TIP]
> Use the potentiometer on the IR sensor module to calibrate detection distance (typically 3cm – 8cm from nozzle base). The indicator LED on the sensor module will light up when a cup is placed underneath.

---

## 🖥️ 5. 16x2 I2C LCD Module Setup

- **VCC**: Connect to **5V**.
- **GND**: Connect to **GND**.
- **SDA**: Connect to **ESP32 GPIO 21**.
- **SCL**: Connect to **ESP32 GPIO 22**.

> [!NOTE]
> Adjust the blue contrast potentiometer on the back of the I2C backpack if text appears blank or overly bright.
