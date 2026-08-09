import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const BartenderContext = createContext();

export const DEFAULT_PRESET_DRINKS = [
  {
    id: 'drink_ocean_blue',
    numBadge: 1,
    name: 'Ocean Blue',
    priceLkr: 350,
    prepTime: '2-3 min',
    category: 'Signature Cocktail',
    ingredientsSummary: 'Blue Curaçao, Lemon, Soda, Mint',
    image: '/images/ocean_blue.png',
    ingredientsDetailed: [
      { name: 'Blue Curaçao', amount: '60ml' },
      { name: 'Lemon Juice', amount: '30ml' },
      { name: 'Soda Water', amount: '20ml' },
      { name: 'Mint Leaves', amount: '5ml' }
    ],
    volumesMl: [60, 30, 20, 5, 0],
    stirrerSec: 4,
    popular: true
  },
  {
    id: 'drink_mint_mojito',
    numBadge: 2,
    name: 'Mint Mojito',
    priceLkr: 320,
    prepTime: '2-3 min',
    category: 'Refreshing Cooler',
    ingredientsSummary: 'Mint, Lime, Soda, Sugar, White Rum',
    image: '/images/mint_mojito.png',
    ingredientsDetailed: [
      { name: 'Mint Syrup', amount: '30ml' },
      { name: 'Lime Juice', amount: '30ml' },
      { name: 'Soda Water', amount: '50ml' },
      { name: 'Sugar Syrup', amount: '15ml' }
    ],
    volumesMl: [30, 30, 50, 15, 0],
    stirrerSec: 3,
    popular: true
  },
  {
    id: 'drink_berry_crush',
    numBadge: 3,
    name: 'Berry Crush',
    priceLkr: 360,
    prepTime: '2-3 min',
    category: 'Berry Fusion',
    ingredientsSummary: 'Strawberry, Cranberry, Lime, Soda',
    image: '/images/berry_crush.png',
    ingredientsDetailed: [
      { name: 'Strawberry Extract', amount: '40ml' },
      { name: 'Cranberry Juice', amount: '50ml' },
      { name: 'Lime Juice', amount: '20ml' },
      { name: 'Soda Water', amount: '40ml' }
    ],
    volumesMl: [40, 50, 20, 40, 0],
    stirrerSec: 4,
    popular: true
  },
  {
    id: 'drink_sunset_delight',
    numBadge: 4,
    name: 'Sunset Delight',
    priceLkr: 340,
    prepTime: '2-3 min',
    category: 'Layered Punch',
    ingredientsSummary: 'Orange, Pineapple, Grenadine',
    image: '/images/sunset_delight.png',
    ingredientsDetailed: [
      { name: 'Orange Juice', amount: '60ml' },
      { name: 'Pineapple Juice', amount: '50ml' },
      { name: 'Grenadine Syrup', amount: '30ml' },
      { name: 'Soda Water', amount: '20ml' }
    ],
    volumesMl: [60, 50, 30, 20, 0],
    stirrerSec: 5,
    popular: true
  },
  {
    id: 'drink_chocolate_bliss',
    numBadge: 5,
    name: 'Chocolate Bliss',
    priceLkr: 380,
    prepTime: '2-3 min',
    category: 'Dessert Blend',
    ingredientsSummary: 'Chocolate, Milk, Hazelnut, Cream',
    image: '/images/chocolate_bliss.png',
    ingredientsDetailed: [
      { name: 'Chocolate Milk', amount: '70ml' },
      { name: 'Hazelnut Syrup', amount: '20ml' },
      { name: 'Sweet Cream', amount: '30ml' },
      { name: 'Espresso Shot', amount: '30ml' }
    ],
    volumesMl: [70, 20, 30, 30, 0],
    stirrerSec: 5,
    popular: true
  }
,
  {
    id: 'drink_rum_coke',
    numBadge: 6,
    name: 'Rum & Coke',
    priceLkr: 420,
    prepTime: '1-2 min',
    category: 'Classic Cocktail',
    ingredientsSummary: '50ml Rum, 150ml Cola, Ice',
    image: '/images/rum_coke.svg',
    ingredientsDetailed: [
      { name: 'Rum', amount: '50ml' },
      { name: 'Cola', amount: '150ml' },
      { name: 'Ice', amount: 'As needed' }
    ],
    volumesMl: [50, 150, 0, 0, 0],
    stirrerSec: 3,
    popular: false
  },
  {
    id: 'drink_gin_tonic',
    numBadge: 7,
    name: 'Gin & Tonic',
    priceLkr: 440,
    prepTime: '1-2 min',
    category: 'Classic Cocktail',
    ingredientsSummary: '50ml Gin, 150ml Tonic, Ice',
    image: '/images/gin_tonic.svg',
    ingredientsDetailed: [
      { name: 'Gin', amount: '50ml' },
      { name: 'Tonic Water', amount: '150ml' },
      { name: 'Ice', amount: 'As needed' }
    ],
    volumesMl: [50, 150, 0, 0, 0],
    stirrerSec: 3,
    popular: false
  },
  {
    id: 'drink_screwdriver',
    numBadge: 8,
    name: 'Screwdriver',
    priceLkr: 430,
    prepTime: '1-2 min',
    category: 'Classic Cocktail',
    ingredientsSummary: '50ml Vodka, 150ml Orange Juice, Ice',
    image: '/images/screwdriver.svg',
    ingredientsDetailed: [
      { name: 'Vodka', amount: '50ml' },
      { name: 'Orange Juice', amount: '150ml' },
      { name: 'Ice', amount: 'As needed' }
    ],
    volumesMl: [50, 150, 0, 0, 0],
    stirrerSec: 3,
    popular: false
  },
  {
    id: 'drink_whiskey_ginger',
    numBadge: 9,
    name: 'Whiskey Ginger',
    priceLkr: 450,
    prepTime: '1-2 min',
    category: 'Classic Cocktail',
    ingredientsSummary: '50ml Whiskey, 150ml Ginger Ale, Ice',
    image: '/images/whiskey_ginger.svg',
    ingredientsDetailed: [
      { name: 'Whiskey', amount: '50ml' },
      { name: 'Ginger Ale', amount: '150ml' },
      { name: 'Ice', amount: 'As needed' }
    ],
    volumesMl: [50, 150, 0, 0, 0],
    stirrerSec: 3,
    popular: false
  }
];

export const DEFAULT_TANKS = [
  { id: 1, name: 'T1', label: 'Tank 1: Green Nectar', pct: 80, currentMl: 800, capacityMl: 1000, color: '#00ff88' },
  { id: 2, name: 'T2', label: 'Tank 2: Cyan Curaçao', pct: 65, currentMl: 650, capacityMl: 1000, color: '#00f0ff' },
  { id: 3, name: 'T3', label: 'Tank 3: Red Grenadine', pct: 90, currentMl: 900, capacityMl: 1000, color: '#ff2a5f' },
  { id: 4, name: 'T4', label: 'Tank 4: Orange Juice', pct: 50, currentMl: 500, capacityMl: 1000, color: '#ffaa00' },
  { id: 5, name: 'T5', label: 'Tank 5: Purple Berry', pct: 75, currentMl: 750, capacityMl: 1000, color: '#a855f7' }
];

export const INITIAL_RECENT_ORDERS = [
  { id: '#1024', drink: 'Ocean Blue', time: '10:30 AM', status: 'Completed' },
  { id: '#1023', drink: 'Mint Mojito', time: '10:15 AM', status: 'Completed' },
  { id: '#1022', drink: 'Berry Crush', time: '10:02 AM', status: 'Completed' },
  { id: '#1021', drink: 'Sunset Delight', time: '09:45 AM', status: 'Completed' },
  { id: '#1020', drink: 'Chocolate Bliss', time: '09:30 AM', status: 'Completed' }
];

export const BartenderProvider = ({ children }) => {
  const [drinks] = useState(DEFAULT_PRESET_DRINKS);
  const [tanks, setTanks] = useState(DEFAULT_TANKS);
  const [flowRates, setFlowRates] = useState([15.0, 15.0, 15.0, 15.0, 15.0]);
  
  // Selected Drink & Customizations
  const [selectedDrink, setSelectedDrink] = useState(DEFAULT_PRESET_DRINKS[0]);
  const [iceLevelVal, setIceLevelVal] = useState(60);
  const [sweetnessVal, setSweetnessVal] = useState(80);
  const [cupSize, setCupSize] = useState('Medium');
  const [selectedExtras, setSelectedExtras] = useState([]);
  
  // Hardware & Connectivity Mode
  const [esp32Ip, setEsp32Ip] = useState('192.168.4.1');
  const [hardwareMode, setHardwareMode] = useState('LIVE_ESP32');
  const [esp32Connected, setEsp32Connected] = useState(true);
  
  // IR Cup Proximity Sensor Interlock State
  const [cupDetected, setCupDetected] = useState(true); // true = IR detects cup (LOW output), false = no cup (HIGH output)
  const [wifiSignal, setWifiSignal] = useState('Strong');
  const [systemStatus, setSystemStatus] = useState('Ready');

  // Navigation View State ('main', 'preparation', 'completion', 'admin', 'calibration', 'figma_board')
  const [activeScreen, setActiveScreen] = useState('main');
  const [mobileTab, setMobileTab] = useState('home');

  const [pumpsState, setPumpsState] = useState([
    { id: 1, name: 'PUMP 1', status: 'OFF' },
    { id: 2, name: 'PUMP 2', status: 'OFF' },
    { id: 3, name: 'PUMP 3', status: 'OFF' },
    { id: 4, name: 'PUMP 4', status: 'OFF' },
    { id: 5, name: 'PUMP 5', status: 'OFF' }
  ]);
  const [stirrerMotor, setStirrerMotor] = useState('OFF');
  const [dispensingStatus, setDispensingStatus] = useState('IDLE');

  // Machine State Machine: IDLE, WAITING_FOR_CUP, PREPARING, PAUSED_NO_CUP, COMPLETED
  const [machineState, setMachineState] = useState('IDLE');
  const [prepProgress, setPrepProgress] = useState(0);
  const [prepStep, setPrepStep] = useState(0); // 0: Order Received, 1: Cup Detected, 2: Measuring, 3: Mixing, 4: Dispensing, 5: Ready
  const [timeRemaining, setTimeRemaining] = useState('00:45');

  // Stats
  const [totalOrdersToday, setTotalOrdersToday] = useState(24);
  const [drinksSoldToday, setDrinksSoldToday] = useState(48);
  const [machineTemp, setMachineTemp] = useState(32);
  const [waterLevel, setWaterLevel] = useState(65);
  const [totalRevenueLkr, setTotalRevenueLkr] = useState(12840);
  const [recentOrders, setRecentOrders] = useState(INITIAL_RECENT_ORDERS);

  const [pumpRuntimes] = useState([
    { id: 1, name: 'Pump 1', time: '2h 15m' },
    { id: 2, name: 'Pump 2', time: '1h 45m' },
    { id: 3, name: 'Pump 3', time: '2h 30m' },
    { id: 4, name: 'Pump 4', time: '1h 20m' },
    { id: 5, name: 'Pump 5', time: '1h 50m' }
  ]);

  // Toggle Extras
  const toggleExtra = (extraItem) => {
    setSelectedExtras(prev => {
      const exists = prev.some(e => e.name === extraItem.name);
      return exists ? prev.filter(e => e.name !== extraItem.name) : [...prev, extraItem];
    });
  };

  const calculateTotalPrice = (basePrice = selectedDrink.priceLkr) => {
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.priceLkr, 0);
    return basePrice + extrasTotal;
  };

  // Real-Time ESP32 Polling Effect
  useEffect(() => {
    if (hardwareMode !== 'LIVE_ESP32') return;

    const fetchESP32Status = async () => {
      try {
        const res = await fetch(`http://${esp32Ip}/api/status`, { signal: AbortSignal.timeout(2000) });
        if (res.ok) {
          const data = await res.json();
          setEsp32Connected(true);
          
          // Real IR Cup Sensor state from ESP32 GPIO 4
          if (data.cup_present !== undefined) {
            setCupDetected(Boolean(data.cup_present));
          }

          if (data.state) {
            if (data.state === 'IDLE') {
              if (machineState !== 'PREPARING' && machineState !== 'WAITING_FOR_CUP') {
                setMachineState('IDLE');
                setPumpsState(prev => prev.map(p => ({ ...p, status: 'OFF' })));
                setStirrerMotor('OFF');
                setDispensingStatus('IDLE');
              }
            } else if (data.state === 'WAITING_FOR_CUP') {
              setMachineState('WAITING_FOR_CUP');
              setPumpsState(prev => prev.map(p => ({ ...p, status: 'OFF' })));
            } else if (data.state === 'POURING' || data.state === 'MIXING') {
              setMachineState('PREPARING');
              if (data.state === 'MIXING') {
                setStirrerMotor('ON');
              } else if (data.state === 'POURING') {
                setDispensingStatus('DISPENSING');
              }
            } else if (data.state === 'PAUSED_NO_CUP') {
              setMachineState('PAUSED_NO_CUP');
              setPumpsState(prev => prev.map(p => ({ ...p, status: 'OFF' })));
              setStirrerMotor('OFF');
            } else if (data.state === 'COMPLETED') {
              setMachineState('COMPLETED');
            }
          }

          if (data.flow_rates_ml_sec) {
            const rates = [
              data.flow_rates_ml_sec.pump_1 || 15.0,
              data.flow_rates_ml_sec.pump_2 || 15.0,
              data.flow_rates_ml_sec.pump_3 || 15.0,
              data.flow_rates_ml_sec.pump_4 || 15.0,
              data.flow_rates_ml_sec.pump_5 || 15.0
            ];
            setFlowRates(rates);
          }
        }
      } catch (err) {
        setEsp32Connected(false);
      }
    };

    fetchESP32Status();
    const interval = setInterval(fetchESP32Status, 1500);
    return () => clearInterval(interval);
  }, [esp32Ip, hardwareMode, machineState]);

  // IR Cup Interlock & Non-Blocking State Machine Simulation
  useEffect(() => {
    // Safety Cutoff Check: If cup is removed mid-pour or mid-mix
    if (!cupDetected && machineState === 'PREPARING') {
      setMachineState('PAUSED_NO_CUP');
      setPumpsState(prev => prev.map(p => ({ ...p, status: 'OFF' })));
      setStirrerMotor('OFF');
      setDispensingStatus('PAUSED');
    }

    // Auto Resume when cup is replaced under IR sensor
    if (cupDetected && (machineState === 'PAUSED_NO_CUP' || machineState === 'WAITING_FOR_CUP')) {
      setMachineState('PREPARING');
      setPrepStep(1); // Cup Detected ✓
    }
  }, [cupDetected, machineState]);

  // Dispensing Simulation Timer Loop (runs only when cupDetected === true and machineState === 'PREPARING')
  useEffect(() => {
    if (machineState !== 'PREPARING' || !cupDetected) return;

    const timer = setInterval(() => {
      setPrepProgress(prev => {
        const nextPct = prev + 4;
        
        // Update Step & Actuator Status
        if (nextPct <= 15) {
          setPrepStep(0); // Order Received
        } else if (nextPct > 15 && nextPct <= 35) {
          setPrepStep(1); // Cup Detected ✓
        } else if (nextPct > 35 && nextPct <= 65) {
          setPrepStep(2); // Measuring Ingredients
          setPumpsState(pumps => pumps.map((p, idx) => idx === 0 ? { ...p, status: 'ON' } : p));
          setDispensingStatus('DISPENSING');
        } else if (nextPct > 65 && nextPct <= 85) {
          setPrepStep(3); // Mixing
          setPumpsState(pumps => pumps.map(p => ({ ...p, status: 'OFF' })));
          setStirrerMotor('ON');
          setDispensingStatus('MIXING');
        } else if (nextPct > 85 && nextPct < 100) {
          setPrepStep(4); // Dispensing Final
          setStirrerMotor('OFF');
          setDispensingStatus('DISPENSING');
        } else if (nextPct >= 100) {
          clearInterval(timer);
          setPumpsState(pumps => pumps.map(p => ({ ...p, status: 'OFF' })));
          setStirrerMotor('OFF');
          setDispensingStatus('IDLE');
          setPrepStep(5); // Drink Ready
          setMachineState('COMPLETED');
          setActiveScreen('completion');

          try {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          } catch (e) {}

          setTotalOrdersToday(prev => prev + 1);
          setDrinksSoldToday(prev => prev + 1);
          const finalPrice = calculateTotalPrice(selectedDrink.priceLkr);
          setTotalRevenueLkr(prev => prev + finalPrice);

          const newOrder = {
            id: `#${Math.floor(1025 + Math.random() * 100)}`,
            drink: selectedDrink.name,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Completed'
          };
          setRecentOrders(prev => [newOrder, ...prev.slice(0, 4)]);
          return 100;
        }

        return nextPct;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [machineState, cupDetected, selectedDrink]);

  // Place Order Action
  const handlePlaceOrder = async (drink = selectedDrink) => {
    setSelectedDrink(drink);
    setActiveScreen('preparation');
    setPrepProgress(0);
    setTimeRemaining('00:45');

    // Send HTTP POST to ESP32 API Endpoint if Live Mode
    if (hardwareMode === 'LIVE_ESP32') {
      try {
        await fetch(`http://${esp32Ip}/api/order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            drink_name: drink.name,
            volumes_ml: drink.volumesMl,
            stirrer_sec: drink.stirrerSec || 3
          })
        });
      } catch (err) {
        console.warn('ESP32 HTTP order request failed:', err);
      }
    }

    // Check IR Cup Proximity Interlock First!
    if (!cupDetected) {
      setMachineState('WAITING_FOR_CUP');
      setPrepStep(0); // Waiting for cup insertion
    } else {
      setMachineState('PREPARING');
      setPrepStep(1); // Cup Detected ✓
    }
  };

  const handleResetOrder = () => {
    setMachineState('IDLE');
    setPrepProgress(0);
    setPrepStep(0);
    setActiveScreen('main');
  };

  const emergencyStop = async () => {
    setMachineState('IDLE');
    setPumpsState(prev => prev.map(p => ({ ...p, status: 'OFF' })));
    setStirrerMotor('OFF');
    setDispensingStatus('IDLE');
    setPrepProgress(0);
    setPrepStep(0);
    setActiveScreen('main');

    if (hardwareMode === 'LIVE_ESP32') {
      try {
        await fetch(`http://${esp32Ip}/api/stop`, { method: 'POST' });
      } catch (err) {}
    }
  };

  const updatePumpCalibration = async (pumpIndex, flowRateMlSec) => {
    const updatedRates = [...flowRates];
    updatedRates[pumpIndex] = parseFloat(flowRateMlSec);
    setFlowRates(updatedRates);

    if (hardwareMode === 'LIVE_ESP32') {
      try {
        await fetch(`http://${esp32Ip}/api/calibrate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pump_index: pumpIndex + 1,
            flow_rate_ml_sec: parseFloat(flowRateMlSec)
          })
        });
      } catch (err) {}
    }
  };

  const triggerManualTest = async (target, state) => {
    if (hardwareMode === 'LIVE_ESP32') {
      try {
        await fetch(`http://${esp32Ip}/api/manual`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, state })
        });
      } catch (err) {}
    }
  };

  return (
    <BartenderContext.Provider value={{
      drinks,
      tanks,
      setTanks,
      flowRates,
      updatePumpCalibration,
      triggerManualTest,
      selectedDrink,
      setSelectedDrink,
      iceLevelVal,
      setIceLevelVal,
      sweetnessVal,
      setSweetnessVal,
      cupSize,
      setCupSize,
      selectedExtras,
      toggleExtra,
      calculateTotalPrice,
      esp32Ip,
      setEsp32Ip,
      hardwareMode,
      setHardwareMode,
      esp32Connected,
      setEsp32Connected,
      cupDetected,
      setCupDetected,
      wifiSignal,
      systemStatus,
      pumpsState,
      stirrerMotor,
      dispensingStatus,
      machineState,
      prepProgress,
      prepStep,
      timeRemaining,
      activeScreen,
      setActiveScreen,
      mobileTab,
      setMobileTab,
      totalOrdersToday,
      drinksSoldToday,
      machineTemp,
      waterLevel,
      totalRevenueLkr,
      recentOrders,
      pumpRuntimes,
      handlePlaceOrder,
      handleResetOrder,
      emergencyStop
    }}>
      {children}
    </BartenderContext.Provider>
  );
};

export const useBartender = () => useContext(BartenderContext);
