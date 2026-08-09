# Bartender – Smart ESP32 Beverage Control UI

Luxury black/gold bartender UI with the original control features restored.

## Included
- 4 signature drinks with matching images
- Ingredient + exact liquid volume display
- 5-channel pump mapping and flow-rate parameters
- ESP32 LIVE / Simulation Demo modes
- ESP32 `/api/status` polling
- IR cup detection / active-low GPIO 4 interlock
- Automatic pump shutdown when the cup is removed
- Pump activation during recipe dispensing (mapped to non-zero recipe channels)
- Stirrer + preparation state machine
- Custom Mixology Lab with 5 pump volume controls
- Pump calibration bench
- Manual diagnostics
- Admin dashboard / tank inventory / order queue
- Emergency stop
- Preparation and completion screens
- Responsive luxury black/gold design matching the supplied bartender reference

## Run

```bash
npm install
npm run dev
```

## ESP32 API expected by the UI

`GET /api/status`

Supported status fields include:
- `cup_present` (boolean), or `ir_gpio4` / `gpio4` (0 = cup, 1 = empty)
- `state`: `IDLE`, `WAITING_FOR_CUP`, `POURING`, `MIXING`, `PAUSED_NO_CUP`, `COMPLETED`
- `flow_rates_ml_sec.pump_1 ... pump_5`
- optional `temperature`, `water_level`, `wifi_signal`

`POST /api/order`

```json
{
  "drink_name": "Rum & Coke",
  "volumes_ml": [50,150,0,0,0],
  "stirrer_sec": 3,
  "cup_size": "Medium",
  "ice_level": 60,
  "sweetness": 80
}
```

`POST /api/stop`

`POST /api/calibrate` with `{ "pump_index": 1, "flow_rate_ml_sec": 15 }`

`POST /api/manual` with `{ "target": "pump_1", "state": true }`
