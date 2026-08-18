import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';

const BartenderContext = createContext();

export const DEFAULT_PRESET_DRINKS = [
  {
    id: 'drink_rum_coke', numBadge: 1, name: 'Rum & Coke', priceLkr: 650, prepTime: '2-3 min', category: 'Classic Highball',
    ingredientsSummary: '50ml Rum (T1), 150ml Coke (T2), Ice', image: '/images/rum_coke.png',
    ingredientsDetailed: [{ name: 'Rum', amount: '50ml' }, { name: 'Coke', amount: '150ml' }, { name: 'Ice', amount: '1 cup' }],
    volumesMl: [50, 150, 0, 0, 0], stirrerSec: 3, popular: true
  },
  {
    id: 'drink_gin_tonic', numBadge: 2, name: 'Gin & Tonic', priceLkr: 700, prepTime: '2-3 min', category: 'Classic Cooler',
    ingredientsSummary: '50ml Gin (T1), 20ml Lime (T3), 130ml Tonic (T4), Ice', image: '/images/gin_tonic.png',
    ingredientsDetailed: [{ name: 'Gin', amount: '50ml' }, { name: 'Lime Juice', amount: '20ml' }, { name: 'Tonic Water', amount: '130ml' }],
    volumesMl: [50, 0, 20, 130, 0], stirrerSec: 3, popular: true
  },
  {
    id: 'drink_screwdriver', numBadge: 3, name: 'Screwdriver', priceLkr: 650, prepTime: '2-3 min', category: 'Citrus Classic',
    ingredientsSummary: '50ml Vodka (T1), 150ml Orange Juice (T3), Ice', image: '/images/screwdriver.png',
    ingredientsDetailed: [{ name: 'Vodka', amount: '50ml' }, { name: 'Orange Juice', amount: '150ml' }],
    volumesMl: [50, 0, 150, 0, 0], stirrerSec: 3, popular: true
  },
  {
    id: 'drink_whiskey_ginger', numBadge: 4, name: 'Whiskey Ginger', priceLkr: 750, prepTime: '2-3 min', category: 'Whiskey Highball',
    ingredientsSummary: '40ml Whiskey (T1), 60ml Ginger Ale (T4), 100ml Flavour (T5), Ice', image: '/images/whiskey_ginger.png',
    ingredientsDetailed: [{ name: 'Whiskey', amount: '40ml' }, { name: 'Ginger Ale', amount: '60ml' }, { name: 'Flavour Syrup', amount: '100ml' }],
    volumesMl: [40, 0, 0, 60, 100], stirrerSec: 4, popular: true
  },
  {
    id: 'drink_cyber_punch', numBadge: 5, name: 'Bevera Cyber Punch (5-Tank)', priceLkr: 850, prepTime: '3 min', category: 'Signature Cocktail',
    ingredientsSummary: '30ml Spirit (T1), 40ml Cola (T2), 30ml Citrus (T3), 20ml Tonic (T4), 20ml Syrup (T5)', image: '/images/ocean_blue.png',
    ingredientsDetailed: [{ name: 'Spirit', amount: '30ml' }, { name: 'Cola', amount: '40ml' }, { name: 'Citrus', amount: '30ml' }, { name: 'Tonic', amount: '20ml' }, { name: 'Syrup', amount: '20ml' }],
    volumesMl: [30, 40, 30, 20, 20], stirrerSec: 5, popular: true
  },
  {
    id: 'drink_tropical_fizz', numBadge: 6, name: 'Tropical Citrus Fizz', priceLkr: 550, prepTime: '2 min', category: 'Mocktail',
    ingredientsSummary: '50ml Soda (T2), 50ml Citrus (T3), 50ml Ginger (T4), 50ml Syrup (T5)', image: '/images/tropical.png',
    ingredientsDetailed: [{ name: 'Cola Soda', amount: '50ml' }, { name: 'Citrus Juice', amount: '50ml' }, { name: 'Ginger Ale', amount: '50ml' }, { name: 'Flavour Syrup', amount: '50ml' }],
    volumesMl: [0, 50, 50, 50, 50], stirrerSec: 3, popular: false
  }
];

export const DEFAULT_TANKS = [
  { id: 1, name: 'T1: Spirit', label: 'Tank 1: Spirit (Rum/Gin/Vodka)', pct: 85, currentMl: 850, capacityMl: 1000, color: '#dca43a' },
  { id: 2, name: 'T2: Cola', label: 'Tank 2: Cola / Soda Mixer', pct: 70, currentMl: 700, capacityMl: 1000, color: '#b87b20' },
  { id: 3, name: 'T3: Citrus', label: 'Tank 3: Orange / Lime Citrus', pct: 90, currentMl: 900, capacityMl: 1000, color: '#e6b84d' },
  { id: 4, name: 'T4: Tonic', label: 'Tank 4: Tonic Water / Ginger', pct: 60, currentMl: 600, capacityMl: 1000, color: '#8c6426' },
  { id: 5, name: 'T5: Flavour', label: 'Tank 5: Syrup / Energy', pct: 80, currentMl: 800, capacityMl: 1000, color: '#c99435' }
];

export const INITIAL_RECENT_ORDERS = [
  { id: '#1024', drink: 'Rum & Coke', time: '10:30 AM', status: 'Completed' },
  { id: '#1023', drink: 'Gin & Tonic', time: '10:15 AM', status: 'Completed' },
  { id: '#1022', drink: 'Screwdriver', time: '10:02 AM', status: 'Completed' },
  { id: '#1021', drink: 'Whiskey Ginger', time: '09:45 AM', status: 'Completed' }
];

const normalizeCupDetected = (data) => {
  if (typeof data.cup_present === 'boolean') return data.cup_present;
  if (typeof data.cupDetected === 'boolean') return data.cupDetected;
  if (typeof data.ir_cup_detected === 'boolean') return data.ir_cup_detected;
  if (typeof data.ir_detected === 'boolean') return data.ir_detected;
  if (typeof data.ir_gpio4 === 'number') return data.ir_gpio4 === 0; // active-low IR sensor
  if (typeof data.gpio4 === 'number') return data.gpio4 === 0;
  if (typeof data.cup_sensor === 'number') return data.cup_sensor === 0;
  return undefined;
};

export const BartenderProvider = ({ children }) => {
  const normalizedDrinks = DEFAULT_PRESET_DRINKS.map(d => ({
    ...d,
    description: `${d.name} prepared with measured ${d.ingredientsSummary.toLowerCase()}.`,
    ingredients: d.ingredientsDetailed.map((ing, i) => ({ name: ing.name, ml: Number(d.volumesMl[i] || 0), color: ['#dca43a','#b87b20','#e6b84d','#8c6426','#c99435'][i] }))
  }));
  const [drinks] = useState(normalizedDrinks);
  const [tanks, setTanks] = useState(DEFAULT_TANKS);
  const [flowRates, setFlowRates] = useState([15, 15, 15, 15, 15]);
  const [selectedDrink, setSelectedDrink] = useState(normalizedDrinks[0]);
  const [selectedDrinkDetail, setSelectedDrinkDetail] = useState(normalizedDrinks[0]);
  const [cart, setCart] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentOrderTime, setCurrentOrderTime] = useState('');
  const [iceLevelVal, setIceLevelVal] = useState(60);
  const [sweetnessVal, setSweetnessVal] = useState(80);
  const [cupSize, setCupSize] = useState('Medium');
  const [selectedExtras, setSelectedExtras] = useState([]);

  const [esp32Ip, setEsp32Ip] = useState('192.168.4.1');
  const [hardwareMode, setHardwareMode] = useState('LIVE_ESP32');
  const [esp32Connected, setEsp32Connected] = useState(false);
  const [lastEspSync, setLastEspSync] = useState(null);
  const [sensorRaw, setSensorRaw] = useState('UNKNOWN');
  const [cupDetected, setCupDetected] = useState(true);
  const [wifiSignal, setWifiSignal] = useState('Unknown');
  const [systemStatus, setSystemStatus] = useState('Ready');

  const [activeScreen, setActiveScreen] = useState('main');
  const [mobileTab, setMobileTab] = useState('home');
  const [pumpsState, setPumpsState] = useState([
    { id: 1, name: 'PUMP 1 (TANK 1)', status: 'OFF' }, { id: 2, name: 'PUMP 2 (TANK 2)', status: 'OFF' },
    { id: 3, name: 'PUMP 3 (TANK 3)', status: 'OFF' }, { id: 4, name: 'PUMP 4 (TANK 4)', status: 'OFF' },
    { id: 5, name: 'PUMP 5 (TANK 5)', status: 'OFF' }, { id: 6, name: 'RELAY 6 (MIXER)', status: 'OFF' },
    { id: 7, name: 'RELAY 7 (TRANSFER)', status: 'OFF' }
  ]);
  const [activePumpIdx, setActivePumpIdx] = useState(-1);
  const [stirrerMotor, setStirrerMotor] = useState('OFF');
  const [transferPump, setTransferPump] = useState('OFF');
  const [dispensingStatus, setDispensingStatus] = useState('IDLE');
  const [machineState, setMachineState] = useState('IDLE');
  const [prepProgress, setPrepProgress] = useState(0);
  const [prepStep, setPrepStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('00:45');
  const [currentLiquidMl, setCurrentLiquidMl] = useState(0);
  const [totalLiquidMl, setTotalLiquidMl] = useState(0);

  const [totalOrdersToday, setTotalOrdersToday] = useState(24);
  const [drinksSoldToday, setDrinksSoldToday] = useState(48);
  const [machineTemp, setMachineTemp] = useState(32);
  const [waterLevel, setWaterLevel] = useState(65);
  const [totalRevenueLkr, setTotalRevenueLkr] = useState(12840);
  const [recentOrders, setRecentOrders] = useState(INITIAL_RECENT_ORDERS);
  const [pumpRuntimes] = useState([
    { id: 1, name: 'Pump 1', time: '2h 15m' }, { id: 2, name: 'Pump 2', time: '1h 45m' },
    { id: 3, name: 'Pump 3', time: '2h 30m' }, { id: 4, name: 'Pump 4', time: '1h 20m' },
    { id: 5, name: 'Pump 5', time: '1h 50m' }
  ]);

  const liquidParameters = useMemo(() => selectedDrink.volumesMl.map((volume, idx) => ({
    pump: idx + 1,
    ingredient: selectedDrink.ingredientsDetailed[idx]?.name || `Liquid ${idx + 1}`,
    targetMl: Number(volume || 0),
    flowMlSec: Number(flowRates[idx] || 15),
    seconds: Number(volume || 0) > 0 ? Number(volume) / Number(flowRates[idx] || 15) : 0
  })).filter(x => x.targetMl > 0), [selectedDrink, flowRates]);

  const toggleExtra = (extraItem) => setSelectedExtras(prev => prev.some(e => e.name === extraItem.name) ? prev.filter(e => e.name !== extraItem.name) : [...prev, extraItem]);
  const calculateTotalPrice = (basePrice = selectedDrink.priceLkr) => basePrice + selectedExtras.reduce((sum, e) => sum + e.priceLkr, 0);

  const [grossWeightGrams, setGrossWeightGrams] = useState(0);
  const [netWeightGrams, setNetWeightGrams] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(420);

  const applyEspStatus = (data) => {
    setEsp32Connected(true);
    setLastEspSync(new Date());
    const cup = normalizeCupDetected(data);
    if (cup !== undefined) {
      setCupDetected(cup);
      setSensorRaw(cup ? 'LOW / CUP' : 'HIGH / EMPTY');
    }
    if (data.gross_weight_g !== undefined) setGrossWeightGrams(Number(data.gross_weight_g));
    if (data.net_weight_g !== undefined) setNetWeightGrams(Number(data.net_weight_g));
    if (data.scale_factor !== undefined) setScaleFactor(Number(data.scale_factor));
    if (data.wifi_signal || data.wifi || data.rssi !== undefined) setWifiSignal(data.wifi_signal || data.wifi || `${data.rssi} dBm`);
    if (data.temperature !== undefined) setMachineTemp(Number(data.temperature));
    if (data.water_level !== undefined) setWaterLevel(Number(data.water_level));
    if (data.state) {
      const state = String(data.state).toUpperCase();
      if (state === 'WAITING_FOR_CUP') setMachineState('WAITING_FOR_CUP');
      else if (state === 'DOSING_MIXER' || state === 'MIXING' || state === 'POURING_TO_CUP' || state === 'POURING') setMachineState('PREPARING');
      else if (state === 'PAUSED_NO_CUP') setMachineState('PAUSED_NO_CUP');
      else if (state === 'COMPLETED') setMachineState('COMPLETED');
      else if (state === 'IDLE' && machineState !== 'PREPARING') setMachineState('IDLE');
      
      if (state === 'MIXING') { setStirrerMotor('ON'); setDispensingStatus('MIXING'); setTransferPump('OFF'); }
      else if (state === 'DOSING_MIXER') { setStirrerMotor('OFF'); setDispensingStatus('DOSING_MIXER'); setTransferPump('OFF'); }
      else if (state === 'POURING_TO_CUP') { setStirrerMotor('OFF'); setDispensingStatus('PUMPING_TO_CUP'); setTransferPump('ON'); }
      
      if (state === 'WAITING_FOR_CUP' || state === 'PAUSED_NO_CUP') { setPumpsState(p => p.map(x => ({ ...x, status: 'OFF' }))); setActivePumpIdx(-1); setStirrerMotor('OFF'); setTransferPump('OFF'); }
    }
    if (data.pumps) {
      setPumpsState(prev => prev.map((p, i) => ({ ...p, status: data.pumps[i]?.on || data.pumps[i]?.status === 'ON' ? 'ON' : 'OFF' })));
      const on = data.pumps.findIndex(p => p?.on || p?.status === 'ON');
      setActivePumpIdx(on);
    }
    if (data.pump_states) {
      setPumpsState(prev => prev.map((p, i) => ({ ...p, status: i < data.pump_states.length && data.pump_states[i] ? 'ON' : 'OFF' })));
      setActivePumpIdx(data.pump_states.findIndex(Boolean));
    }
    if (data.flow_rates_ml_sec) {
      setFlowRates(prev => prev.map((r, i) => Number(data.flow_rates_ml_sec[`pump_${i + 1}`] ?? r)));
    }
  };

  const pollEsp32 = async () => {
    if (hardwareMode !== 'LIVE_ESP32') return;
    try {
      const res = await fetch(`http://${esp32Ip}/api/status`, { signal: AbortSignal.timeout(2200) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      applyEspStatus(await res.json());
    } catch (err) {
      setEsp32Connected(false);
      setSensorRaw('NO SIGNAL');
      setWifiSignal('Offline');
    }
  };

  useEffect(() => {
    if (hardwareMode !== 'LIVE_ESP32') {
      setEsp32Connected(true);
      setWifiSignal('Demo');
      return;
    }
    pollEsp32();
    const interval = setInterval(pollEsp32, 1500);
    return () => clearInterval(interval);
  }, [hardwareMode, esp32Ip]);

  useEffect(() => {
    if (hardwareMode === 'SIMULATION_DEMO') setSensorRaw(cupDetected ? 'LOW / CUP' : 'HIGH / EMPTY');
  }, [hardwareMode, cupDetected]);

  useEffect(() => {
    if (!cupDetected && machineState === 'PREPARING' && prepStep === 4) {
      setMachineState('PAUSED_NO_CUP'); setPumpsState(p => p.map(x => ({ ...x, status: 'OFF' }))); setActivePumpIdx(-1);
      setStirrerMotor('OFF'); setTransferPump('OFF'); setDispensingStatus('PAUSED');
    }
    if (cupDetected && (machineState === 'PAUSED_NO_CUP' || machineState === 'WAITING_FOR_CUP')) {
      setMachineState('PREPARING'); setPrepStep(1);
    }
  }, [cupDetected, prepStep]);

  useEffect(() => {
    if (machineState !== 'PREPARING') return;
    const timer = setInterval(() => {
      setPrepProgress(prev => {
        const next = Math.min(100, prev + 2);
        if (next <= 10) {
          setPrepStep(0); setPumpsState(p => p.map(x => ({ ...x, status: 'OFF' }))); setActivePumpIdx(-1); setStirrerMotor('OFF'); setTransferPump('OFF');
        } else if (next <= 45) {
          // Stage 1: Dosing Tanks (Relays 1-5) into Mixer
          setPrepStep(1); setDispensingStatus('DOSING MIXER'); setStirrerMotor('OFF'); setTransferPump('OFF');
          const active = liquidParameters.length ? Math.min(liquidParameters.length - 1, Math.floor(((next - 10) / 35) * liquidParameters.length)) : -1;
          const target = liquidParameters[active];
          setActivePumpIdx(target ? target.pump - 1 : -1);
          setPumpsState(p => p.map((x, i) => ({ ...x, status: i === (target ? target.pump - 1 : -1) ? 'ON' : 'OFF' })));
          const completed = liquidParameters.slice(0, Math.max(0, active)).reduce((s, x) => s + x.targetMl, 0);
          const localPct = liquidParameters[active] ? ((next - 10) / 35) * liquidParameters.length - active : 0;
          setCurrentLiquidMl(Math.min(totalLiquidMl, completed + (target ? target.targetMl * Math.max(0, Math.min(1, localPct)) : 0)));
        } else if (next <= 65) {
          // Stage 2: Relay 6 Mixer Motor
          setPrepStep(2); setPumpsState(p => p.map((x, i) => ({ ...x, status: i === 5 ? 'ON' : 'OFF' }))); setActivePumpIdx(5); setCurrentLiquidMl(totalLiquidMl);
          setStirrerMotor('ON'); setTransferPump('OFF'); setDispensingStatus('MIXING IN CHAMBER');
        } else if (next <= 75) {
          // Stage 3 Part A: Cup Check
          setPrepStep(3); setPumpsState(p => p.map(x => ({ ...x, status: 'OFF' }))); setActivePumpIdx(-1); setStirrerMotor('OFF'); setTransferPump('OFF'); setDispensingStatus('WAITING FOR CUP');
        } else if (next < 100) {
          // Stage 3 Part B: Relay 7 Mixer to Cup Transfer Pump (Load Cell weight verified)
          if (!cupDetected) {
            setMachineState('PAUSED_NO_CUP');
            return prev;
          }
          setPrepStep(4); setPumpsState(p => p.map((x, i) => ({ ...x, status: i === 6 ? 'ON' : 'OFF' }))); setActivePumpIdx(6); setStirrerMotor('OFF'); setTransferPump('ON'); setDispensingStatus('PUMPING TO CUP');
          const pouredGrams = ((next - 75) / 25) * totalLiquidMl;
          setNetWeightGrams(Math.min(totalLiquidMl, pouredGrams));
          setGrossWeightGrams(Math.min(totalLiquidMl, pouredGrams) + 120);
        } else {
          clearInterval(timer); setCurrentLiquidMl(totalLiquidMl); setNetWeightGrams(totalLiquidMl); setPumpsState(p => p.map(x => ({ ...x, status: 'OFF' }))); setActivePumpIdx(-1);
          setStirrerMotor('OFF'); setTransferPump('OFF'); setDispensingStatus('IDLE'); setPrepStep(5); setMachineState('COMPLETED'); setActiveScreen('completion');
          try { confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } }); } catch {}
          setTotalOrdersToday(x => x + 1); setDrinksSoldToday(x => x + 1); setTotalRevenueLkr(x => x + calculateTotalPrice(selectedDrink.priceLkr));
          setRecentOrders(prev => [{ id: `#${Math.floor(1025 + Math.random() * 100)}`, drink: selectedDrink.name, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'Completed' }, ...prev.slice(0, 4)]);
          return 100;
        }
        setTimeRemaining(`${Math.max(0, Math.ceil((100 - next) * 0.45)).toString().padStart(2, '0')} sec`);
        return next;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [machineState, cupDetected, selectedDrink, liquidParameters, totalLiquidMl]);

  const addToCart = (drink, quantity = 1) => setCart(prev => {
    const exists = prev.find(item => item.id === drink.id);
    if (exists) return prev.map(item => item.id === drink.id ? { ...item, quantity: item.quantity + quantity } : item);
    return [...prev, { ...drink, quantity }];
  });
  const removeFromCart = (drinkId) => setCart(prev => prev.filter(item => item.id !== drinkId));
  const updateCartQuantity = (drinkId, quantity) => setCart(prev => prev.map(item => item.id === drinkId ? { ...item, quantity: Math.max(1, quantity) } : item));
  const clearCart = () => setCart([]);

  const handlePlaceOrder = async (drink = selectedDrink) => {
    setSelectedDrink(drink); setSelectedDrinkDetail(drink); setCurrentOrderId(`#${Math.floor(1025 + Math.random() * 100)}`); setCurrentOrderTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); setActiveScreen('preparation'); setPrepProgress(0); setTimeRemaining('00:45'); setCurrentLiquidMl(0);
    setTotalLiquidMl(drink.volumesMl.reduce((s, x) => s + Number(x || 0), 0));
    if (hardwareMode === 'LIVE_ESP32') {
      try {
        const res = await fetch(`http://${esp32Ip}/api/order`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ drink_name: drink.name, volumes_ml: drink.volumesMl, stirrer_sec: drink.stirrerSec || 3, cup_size: cupSize, ice_level: iceLevelVal, sweetness: sweetnessVal }) });
        if (!res.ok) console.warn('ESP32 order rejected:', res.status);
      } catch (err) { console.warn('ESP32 HTTP order request failed:', err); }
    }
    if (!cupDetected) { setMachineState('WAITING_FOR_CUP'); setPrepStep(0); }
    else { setMachineState('PREPARING'); setPrepStep(1); }
  };

  const checkoutCart = async () => {
    if (!cart.length) return;
    const item = cart[0];
    await handlePlaceOrder(item);
    setCart(prev => prev.slice(1));
  };

  const handleResetOrder = () => { setMachineState('IDLE'); setPrepProgress(0); setPrepStep(0); setActivePumpIdx(-1); setCurrentLiquidMl(0); setTotalLiquidMl(0); setPumpsState(p => p.map(x => ({ ...x, status: 'OFF' }))); setActiveScreen('main'); };

  const emergencyStop = async () => {
    setMachineState('IDLE'); setPumpsState(p => p.map(x => ({ ...x, status: 'OFF' }))); setActivePumpIdx(-1); setStirrerMotor('OFF'); setDispensingStatus('IDLE'); setPrepProgress(0); setPrepStep(0); setActiveScreen('main');
    if (hardwareMode === 'LIVE_ESP32') { try { await fetch(`http://${esp32Ip}/api/stop`, { method: 'POST' }); } catch {} }
  };

  const updatePumpCalibration = async (pumpIndex, flowRateMlSec) => {
    const updated = [...flowRates]; updated[pumpIndex] = Math.max(0.1, parseFloat(flowRateMlSec) || 15); setFlowRates(updated);
    if (hardwareMode === 'LIVE_ESP32') { try { await fetch(`http://${esp32Ip}/api/calibrate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pump_index: pumpIndex + 1, flow_rate_ml_sec: updated[pumpIndex] }) }); } catch {} }
  };

  const tareScale = async () => {
    if (hardwareMode === 'LIVE_ESP32') {
      try {
        const res = await fetch(`http://${esp32Ip}/api/tare`, { method: 'POST' });
        if (res.ok) { setGrossWeightGrams(0); setNetWeightGrams(0); }
      } catch (err) { console.warn('Tare scale failed:', err); }
    } else {
      setGrossWeightGrams(0); setNetWeightGrams(0);
    }
  };

  const calibrateScale = async (knownWeightGrams, newScaleFactor) => {
    if (hardwareMode === 'LIVE_ESP32') {
      try {
        const payload = knownWeightGrams ? { known_weight_g: Number(knownWeightGrams) } : { scale_factor: Number(newScaleFactor) };
        const res = await fetch(`http://${esp32Ip}/api/calibrate_scale`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.ok) {
          const data = await res.json();
          if (data.scale_factor) setScaleFactor(data.scale_factor);
        }
      } catch (err) { console.warn('Calibrate scale failed:', err); }
    } else if (newScaleFactor) {
      setScaleFactor(Number(newScaleFactor));
    }
  };

  const [isCustomizerModalOpen, setIsCustomizerModalOpen] = useState(false);

  const triggerManualTest = async (target, state) => {
    const isStateOn = Boolean(state);
    if (typeof target === 'string' && target.startsWith('pump_')) {
      const pNum = parseInt(target.substring(5), 10) - 1;
      if (pNum >= 0 && pNum < 5) {
        setPumpsState(prev => prev.map((p, i) => i === pNum ? { ...p, status: isStateOn ? 'ON' : 'OFF' } : p));
        setActivePumpIdx(isStateOn ? pNum : -1);
      } else if (pNum === 5) { // pump_6 -> Relay 6 Mixer Motor
        setPumpsState(prev => prev.map((p, i) => i === 5 ? { ...p, status: isStateOn ? 'ON' : 'OFF' } : p));
        setStirrerMotor(isStateOn ? 'ON' : 'OFF');
      } else if (pNum === 6) { // pump_7 -> Relay 7 Transfer Pump
        setPumpsState(prev => prev.map((p, i) => i === 6 ? { ...p, status: isStateOn ? 'ON' : 'OFF' } : p));
        setTransferPump(isStateOn ? 'ON' : 'OFF');
      }
    } else if (target === 'stirrer' || target === 'relay_6') {
      setPumpsState(prev => prev.map((p, i) => i === 5 ? { ...p, status: isStateOn ? 'ON' : 'OFF' } : p));
      setStirrerMotor(isStateOn ? 'ON' : 'OFF');
    } else if (target === 'transfer_pump' || target === 'relay_7') {
      setPumpsState(prev => prev.map((p, i) => i === 6 ? { ...p, status: isStateOn ? 'ON' : 'OFF' } : p));
      setTransferPump(isStateOn ? 'ON' : 'OFF');
    }

    if (hardwareMode === 'LIVE_ESP32') {
      try {
        await fetch(`http://${esp32Ip}/api/manual`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, state: isStateOn })
        });
      } catch (err) {
        console.warn('Manual trigger failed:', err);
      }
    }
  };

  const value = {
    drinks, tanks, setTanks, flowRates, updatePumpCalibration, triggerManualTest, selectedDrink, setSelectedDrink, selectedDrinkDetail, setSelectedDrinkDetail,
    currentDrinkName: selectedDrink?.name || 'Drink',
    cart, addToCart, removeFromCart, updateCartQuantity, clearCart, checkoutCart, currentOrderId, currentOrderTime, currentTimelineStep: prepStep, dispenseProgress: prepProgress, cupPresent: cupDetected, setCupPresent: setCupDetected, isConnected: esp32Connected, activePump: activePumpIdx,
    placeOrder: handlePlaceOrder,
    iceLevelVal, setIceLevelVal, sweetnessVal, setSweetnessVal, cupSize, setCupSize, selectedExtras, toggleExtra, calculateTotalPrice,
    isCustomizerModalOpen, setIsCustomizerModalOpen,
    esp32Ip, setEsp32Ip, hardwareMode, setHardwareMode, esp32Connected, setEsp32Connected, lastEspSync, sensorRaw, wifiSignal, systemStatus,
    cupDetected, setCupDetected, pumpsState, activePumpIdx, stirrerMotor, transferPump, dispensingStatus, machineState, prepProgress, prepStep, timeRemaining,
    currentLiquidMl, totalLiquidMl, liquidParameters, activeScreen, setActiveScreen, mobileTab, setMobileTab, totalOrdersToday, drinksSoldToday,
    machineTemp, waterLevel, totalRevenueLkr, recentOrders, pumpRuntimes, handlePlaceOrder, handleResetOrder, emergencyStop, pollEsp32,
    grossWeightGrams, netWeightGrams, scaleFactor, tareScale, calibrateScale
  };
  return <BartenderContext.Provider value={value}>{children}</BartenderContext.Provider>;
};

export const useBartender = () => useContext(BartenderContext);
