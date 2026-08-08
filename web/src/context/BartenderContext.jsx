import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const BartenderContext = createContext();

export const DEFAULT_PRESET_DRINKS = [
  {
    id: 'drink_ocean_blue',
    name: 'Ocean Blue',
    priceLkr: 450,
    category: 'Signature Cocktail',
    description: 'A perfect blend of blue curaçao, lemonade and mint. Refreshing and cool!',
    image: '/images/ocean_blue.png',
    icon: '🌊',
    ingredients: [
      { name: 'Blue Curaçao', ml: 30, color: '#00f0ff', pumpIdx: 1 },
      { name: 'Lemonade', ml: 60, color: '#ffea00', pumpIdx: 2 },
      { name: 'Mint Syrup', ml: 20, color: '#00ff88', pumpIdx: 4 },
      { name: 'Soda Water', ml: 40, color: '#ffffff', pumpIdx: 3 }
    ],
    volumesMl: [30, 60, 40, 20, 0], // Pump 1-5 mapping
    stirrerSec: 4,
    popular: true
  },
  {
    id: 'drink_sunset_bliss',
    name: 'Sunset Bliss',
    priceLkr: 450,
    category: 'Layered Punch',
    description: 'Vibrant orange juice and grenade syrup layered over sparkling soda.',
    image: '/images/sunset_bliss.png',
    icon: '🌅',
    ingredients: [
      { name: 'Sunset Syrup', ml: 30, color: '#ff9900', pumpIdx: 0 },
      { name: 'Orange Juice', ml: 60, color: '#ff5500', pumpIdx: 2 },
      { name: 'Lemonade', ml: 40, color: '#ffea00', pumpIdx: 1 },
      { name: 'Soda Water', ml: 20, color: '#ffffff', pumpIdx: 3 }
    ],
    volumesMl: [30, 40, 60, 20, 0],
    stirrerSec: 3,
    popular: true
  },
  {
    id: 'drink_minty_fresh',
    name: 'Minty Fresh',
    priceLkr: 450,
    category: 'Refreshing Cooler',
    description: 'Zesty fresh lime and crushed mint blended with fizzy soda.',
    image: '/images/minty_fresh.png',
    icon: '🍃',
    ingredients: [
      { name: 'Mint Syrup', ml: 40, color: '#00ff88', pumpIdx: 4 },
      { name: 'Lime Juice', ml: 30, color: '#a3e635', pumpIdx: 4 },
      { name: 'Soda Water', ml: 60, color: '#ffffff', pumpIdx: 3 },
      { name: 'Sugar Syrup', ml: 20, color: '#fef08a', pumpIdx: 1 }
    ],
    volumesMl: [0, 20, 0, 60, 70],
    stirrerSec: 4,
    popular: true
  },
  {
    id: 'drink_tropical_punch',
    name: 'Tropical Punch',
    priceLkr: 450,
    category: 'Exotic Fruit Blend',
    description: 'Sweet pineapple juice mixed with coconut water and citrus burst.',
    image: '/images/tropical_punch.png',
    icon: '🍍',
    ingredients: [
      { name: 'Pineapple Juice', ml: 50, color: '#facc15', pumpIdx: 2 },
      { name: 'Orange Juice', ml: 40, color: '#ff5500', pumpIdx: 2 },
      { name: 'Coconut Water', ml: 30, color: '#f8fafc', pumpIdx: 0 },
      { name: 'Grenadine', ml: 30, color: '#ff007a', pumpIdx: 3 }
    ],
    volumesMl: [30, 0, 90, 30, 0],
    stirrerSec: 5,
    popular: false
  },
  {
    id: 'drink_berry_delight',
    name: 'Berry Delight',
    priceLkr: 450,
    category: 'Berry Fusion',
    description: 'Rich dark berry syrup and wild cranberry over crushed ice.',
    image: '/images/berry_delight.png',
    icon: '🫐',
    ingredients: [
      { name: 'Berry Syrup', ml: 40, color: '#ff007a', pumpIdx: 3 },
      { name: 'Cranberry Juice', ml: 50, color: '#e11d48', pumpIdx: 3 },
      { name: 'Lime Juice', ml: 30, color: '#a3e635', pumpIdx: 4 },
      { name: 'Soda Water', ml: 30, color: '#ffffff', pumpIdx: 2 }
    ],
    volumesMl: [0, 0, 30, 90, 30],
    stirrerSec: 4,
    popular: false
  }
];

export const DEFAULT_TANKS = [
  { id: 1, name: 'Tank 1: Coconut / Blue Curaçao', color: '#00f0ff', capacityMl: 1000, currentMl: 850 },
  { id: 2, name: 'Tank 2: Lemonade / Citrus', color: '#ffea00', capacityMl: 1000, currentMl: 720 },
  { id: 3, name: 'Tank 3: Orange / Pineapple', color: '#ff5500', capacityMl: 1000, currentMl: 900 },
  { id: 4, name: 'Tank 4: Grenadine / Soda', color: '#ff007a', capacityMl: 1000, currentMl: 640 },
  { id: 5, name: 'Tank 5: Mint / Lime Juice', color: '#00ff88', capacityMl: 1000, currentMl: 950 }
];

export const BartenderProvider = ({ children }) => {
  const [drinks, setDrinks] = useState(DEFAULT_PRESET_DRINKS);
  const [tanks, setTanks] = useState(DEFAULT_TANKS);
  const [flowRates, setFlowRates] = useState([15.0, 15.0, 15.0, 15.0, 15.0]); // ml/sec
  
  const [selectedDrinkDetail, setSelectedDrinkDetail] = useState(DEFAULT_PRESET_DRINKS[0]); // Default Ocean Blue
  const [cart, setCart] = useState([
    { ...DEFAULT_PRESET_DRINKS[0], quantity: 1 },
    { ...DEFAULT_PRESET_DRINKS[3], quantity: 1 }
  ]);

  const [esp32Ip, setEsp32Ip] = useState('192.168.4.1');
  const [hardwareMode, setHardwareMode] = useState('SIMULATION_DEMO');
  const [isConnected, setIsConnected] = useState(true);

  // Machine Telemetry & Timeline tracking
  const [machineState, setMachineState] = useState('IDLE'); // IDLE, WAITING_FOR_CUP, POURING, MIXING, COMPLETED, PAUSED_NO_CUP, ERROR
  const [cupPresent, setCupPresent] = useState(true);
  const [activePump, setActivePump] = useState(null);
  const [dispenseProgress, setDispenseProgress] = useState(0); // 0 - 100%
  const [currentDrinkName, setCurrentDrinkName] = useState('Ocean Blue');
  const [currentOrderId, setCurrentOrderId] = useState('#RB20240056');
  const [currentOrderTime, setCurrentOrderTime] = useState('02:15 PM');
  
  // Timeline Step Index (0: Received, 1: Preparing, 2: Mixing, 3: Dispensing, 4: Ready)
  const [currentTimelineStep, setCurrentTimelineStep] = useState(1);

  // Order Queue
  const [orderQueue, setOrderQueue] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  // Cart Functions
  const addToCart = (drink, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === drink.id);
      if (existing) {
        return prev.map(item => item.id === drink.id ? { ...item, quantity: item.quantity + qty } : item);
      } else {
        return [...prev, { ...drink, quantity: qty }];
      }
    });
  };

  const removeFromCart = (drinkId) => {
    setCart(prev => prev.filter(item => item.id !== drinkId));
  };

  const updateCartQuantity = (drinkId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === drinkId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Process Checkout
  const checkoutCart = () => {
    if (cart.length === 0) return;
    
    // Pick first item or mix total for dispensing
    const itemToPour = cart[0];
    placeOrder(itemToPour);
    clearCart();
  };

  // Place Order
  const placeOrder = async (drinkRecipe, customerName = 'Guest User') => {
    const orderNum = Math.floor(100000 + Math.random() * 900000);
    const newOrderId = `#RB${orderNum}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setCurrentOrderId(newOrderId);
    setCurrentDrinkName(drinkRecipe.name);
    setCurrentOrderTime(timeStr);

    const newOrder = {
      id: newOrderId,
      drinkName: drinkRecipe.name,
      volumesMl: [...drinkRecipe.volumesMl],
      stirrerSec: drinkRecipe.stirrerSec || 3,
      customerName,
      timestamp: timeStr,
      status: 'PREPARING'
    };

    setOrderQueue(prev => [...prev, newOrder]);
    startOrderProcessing(newOrder);

    // Send HTTP POST to ESP32 if Live Mode
    if (hardwareMode === 'LIVE_ESP32') {
      try {
        await fetch(`http://${esp32Ip}/api/order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            drink_name: drinkRecipe.name,
            volumes_ml: drinkRecipe.volumesMl,
            stirrer_sec: drinkRecipe.stirrerSec || 3
          })
        });
      } catch (err) {
        console.error('Failed to send order to ESP32:', err);
      }
    }
  };

  const startOrderProcessing = (order) => {
    setActiveOrder(order);
    setMachineState('WAITING_FOR_CUP');
    setCurrentTimelineStep(0); // Order Received
  };

  // Simulation Runner for Timeline & Hardware States
  useEffect(() => {
    if (hardwareMode !== 'SIMULATION_DEMO' || !activeOrder) return;

    if (machineState === 'WAITING_FOR_CUP') {
      if (!cupPresent) return;

      setMachineState('POURING');
      setCurrentTimelineStep(1); // Preparing

      let progress = 0;
      let stepCount = 0;
      const totalSteps = 40;

      const timer = setInterval(() => {
        stepCount++;
        progress = Math.min(100, Math.round((stepCount / totalSteps) * 100));
        setDispenseProgress(progress);

        if (progress > 25 && progress < 70) {
          setCurrentTimelineStep(2); // Mixing
          setActivePump(2);
        } else if (progress >= 70 && progress < 100) {
          setCurrentTimelineStep(3); // Dispensing
          setActivePump(3);
        }

        if (stepCount >= totalSteps) {
          clearInterval(timer);
          setActivePump(null);
          setMachineState('MIXING');

          setTimeout(() => {
            setMachineState('COMPLETED');
            setCurrentTimelineStep(4); // Ready!
            setDispenseProgress(100);

            // Confetti
            try {
              confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
            } catch (e) {}

            setTimeout(() => {
              setOrderQueue(prev => prev.map(o => o.id === activeOrder.id ? { ...o, status: 'COMPLETED' } : o));
              setActiveOrder(null);
              setMachineState('IDLE');
              setDispenseProgress(0);
            }, 5000);

          }, (activeOrder.stirrerSec || 3) * 1000);
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [machineState, activeOrder, cupPresent, hardwareMode]);

  const emergencyStop = async () => {
    setMachineState('IDLE');
    setActiveOrder(null);
    setActivePump(null);
    setDispenseProgress(0);
    setCurrentTimelineStep(0);

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
      flowRates,
      selectedDrinkDetail,
      setSelectedDrinkDetail,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      checkoutCart,
      esp32Ip,
      setEsp32Ip,
      hardwareMode,
      setHardwareMode,
      isConnected,
      machineState,
      cupPresent,
      setCupPresent,
      activePump,
      dispenseProgress,
      currentDrinkName,
      currentOrderId,
      currentOrderTime,
      currentTimelineStep,
      orderQueue,
      activeOrder,
      placeOrder,
      emergencyStop,
      updatePumpCalibration,
      triggerManualTest
    }}>
      {children}
    </BartenderContext.Provider>
  );
};

export const useBartender = () => useContext(BartenderContext);
