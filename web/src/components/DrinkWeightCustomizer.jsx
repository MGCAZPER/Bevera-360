import React, { useState, useMemo } from 'react';
import { useBartender } from '../context/BartenderContext';
import { Scale, Play, Sparkles, RotateCcw, CheckCircle2, Droplet, SlidersHorizontal, Info, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const DrinkWeightCustomizer = ({ inline = false, onClose }) => {
  const { drinks, tanks, flowRates, handlePlaceOrder, grossWeightGrams, netWeightGrams, scaleFactor, tareScale } = useBartender();

  // State
  const [selectedDrinkId, setSelectedDrinkId] = useState(drinks[0]?.id || 'drink_rum_coke');
  const [drinkName, setDrinkName] = useState(drinks[0]?.name || 'Custom Weight Drink');
  
  // 5 Tank weights in Grams (1 ml = 1 g approx)
  const [tankWeights, setTankWeights] = useState([50, 150, 0, 0, 0]);
  const [stirrerSec, setStirrerSec] = useState(3);
  const [cupTareGrams, setCupTareGrams] = useState(120);
  const [weightMode, setWeightMode] = useState('CUSTOM'); // 'STANDARD', 'LIGHT', 'STRONG', 'CUSTOM'
  const [orderDispatched, setOrderDispatched] = useState(false);

  // When selected drink changes, populate weights
  const handleSelectDrink = (drinkId) => {
    setSelectedDrinkId(drinkId);
    const found = drinks.find(d => d.id === drinkId);
    if (found) {
      setDrinkName(found.name);
      setTankWeights([...found.volumesMl]);
      setStirrerSec(found.stirrerSec || 3);
      setWeightMode('STANDARD');
    }
  };

  // Apply Quick Weight Presets
  const applyPreset = (mode) => {
    setWeightMode(mode);
    const baseDrink = drinks.find(d => d.id === selectedDrinkId) || drinks[0];
    const baseVols = baseDrink.volumesMl;

    if (mode === 'STANDARD') {
      setTankWeights([...baseVols]);
    } else if (mode === 'LIGHT') {
      setTankWeights(baseVols.map(v => Math.round(v * 0.75)));
    } else if (mode === 'STRONG') {
      setTankWeights(baseVols.map((v, i) => i === 0 ? Math.round(v * 1.5) : v));
    }
  };

  // Update weight for a specific tank index
  const handleWeightChange = (index, newWeight) => {
    const val = Math.max(0, Math.min(300, parseInt(newWeight) || 0));
    setTankWeights(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
    setWeightMode('CUSTOM');
  };

  // Totals & Calculations
  const totalNetLiquidGrams = useMemo(() => tankWeights.reduce((a, b) => a + b, 0), [tankWeights]);
  const targetGrossWeightGrams = useMemo(() => totalNetLiquidGrams + cupTareGrams, [totalNetLiquidGrams, cupTareGrams]);

  // Per-pump duration calculations
  const pumpDetails = useMemo(() => {
    return tankWeights.map((weightGrams, idx) => {
      const tankInfo = tanks[idx] || { name: `Tank ${idx + 1}`, label: `Tank ${idx + 1}`, color: '#dca43a' };
      const rate = flowRates[idx] || 15.0;
      const seconds = weightGrams > 0 ? (weightGrams / rate).toFixed(1) : '0.0';
      const pct = totalNetLiquidGrams > 0 ? ((weightGrams / totalNetLiquidGrams) * 100).toFixed(0) : 0;
      return {
        tankId: idx + 1,
        name: tankInfo.name,
        label: tankInfo.label,
        color: tankInfo.color,
        weightGrams,
        flowRateMlSec: rate,
        pourDurationSec: seconds,
        pctOfTotal: pct
      };
    });
  }, [tankWeights, tanks, flowRates, totalNetLiquidGrams]);

  // Estimated total pour duration across 5 tanks
  const totalPourTimeSec = useMemo(() => {
    return pumpDetails.reduce((sum, p) => sum + parseFloat(p.pourDurationSec), 0).toFixed(1);
  }, [pumpDetails]);

  // Handle Dispatch to Machine
  const handleDispenseExactWeight = () => {
    const customRecipe = {
      id: `weight_custom_${Date.now()}`,
      name: `${drinkName} (Exact Weight)`,
      priceLkr: 750,
      prepTime: `${Math.ceil(parseFloat(totalPourTimeSec) + stirrerSec + 5)} sec`,
      category: 'Weight Precision Mix',
      ingredientsSummary: `Custom ${totalNetLiquidGrams}g exact load-cell blend`,
      image: '/images/ocean_blue.png',
      ingredientsDetailed: pumpDetails.filter(p => p.weightGrams > 0).map(p => ({
        name: p.name,
        amount: `${p.weightGrams}g (${p.weightGrams}ml)`
      })),
      volumesMl: tankWeights,
      stirrerSec,
      popular: false
    };

    handlePlaceOrder(customRecipe);
    setOrderDispatched(true);
    setTimeout(() => {
      setOrderDispatched(false);
      if (onClose) onClose();
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge-yellow inline-flex items-center gap-1.5">
              <Scale size={11} /> PRECISION LOAD CELL STUDIO
            </span>
            <span className="badge-black">HX711 VERIFIED</span>
          </div>
          <h2 className="text-2xl font-black text-[#111] tracking-tight flex items-center gap-2 mt-1.5">
            <Scale className="text-[#dca43a]" size={24} /> Drink Weight Customization Studio
          </h2>
          <p className="text-[#77756e] text-xs">
            Fine-tune target liquid weights (g/mL) per ingredient. The HX711 scale measures net poured weight live during dispense.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="btn-modern-black text-xs self-start"
          >
            Close Studio
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Control Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Drink Selector & Quick Presets Card */}
          <div className="modern-card p-5 bg-white space-y-4">
            <h3 className="text-sm font-bold text-[#111] flex items-center gap-2 border-b border-black/10 pb-2.5">
              <SlidersHorizontal size={16} className="text-[#f5c400]" /> Select Base Recipe & Weight Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#77756e] uppercase tracking-wider mb-1.5">
                  Select Preset Cocktail / Mocktail
                </label>
                <select
                  value={selectedDrinkId}
                  onChange={(e) => handleSelectDrink(e.target.value)}
                  className="w-full bg-[#f4f1e8] border border-black/10 rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#111] outline-none focus:border-[#f5c400]"
                >
                  {drinks.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#77756e] uppercase tracking-wider mb-1.5">
                  Custom Recipe Title
                </label>
                <input
                  type="text"
                  value={drinkName}
                  onChange={(e) => setDrinkName(e.target.value)}
                  className="w-full bg-[#f4f1e8] border border-black/10 rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#111] outline-none focus:border-[#f5c400]"
                  placeholder="e.g. Precision Rum & Cola"
                />
              </div>
            </div>

            {/* Quick Weight Ratio Presets */}
            <div>
              <label className="block text-[10px] font-bold text-[#77756e] uppercase tracking-wider mb-2">
                Quick Weight Presets
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'STANDARD', label: 'Standard (100%)', desc: 'Default Recipe' },
                  { id: 'LIGHT', label: 'Light (75%)', desc: 'Low Volume' },
                  { id: 'STRONG', label: 'Strong (+50% T1)', desc: 'Extra Spirit' },
                  { id: 'CUSTOM', label: 'Custom Grams', desc: 'Manual Tuning' }
                ].map(p => {
                  const isActive = weightMode === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'bg-black text-[#f5c400] border-black shadow-md'
                          : 'bg-[#f4f1e8] text-[#111] border-black/10 hover:border-black/30'
                      }`}
                    >
                      <div className="text-[11px] font-bold">{p.label}</div>
                      <div className={`text-[8px] ${isActive ? 'text-[#f5c400]/70' : 'text-[#77756e]'}`}>{p.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 5-Tank Weight Customizer Sliders & Numeric Inputs */}
          <div className="modern-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
              <h3 className="text-sm font-bold text-[#111] flex items-center gap-2">
                <Droplet size={16} className="text-[#dca43a]" /> 5-Tank Target Ingredient Weights (Grams / mL)
              </h3>
              <span className="font-mono text-xs font-black text-[#111] bg-[#f5c400] px-3 py-1 rounded-full border border-black/10">
                Total Net: {totalNetLiquidGrams} g
              </span>
            </div>

            <div className="space-y-3">
              {pumpDetails.map((pump, idx) => (
                <div
                  key={pump.tankId}
                  className="bg-[#f4f1e8] p-3.5 rounded-2xl border border-black/8 space-y-2 transition-all hover:border-black/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: pump.color }} />
                      <div>
                        <span className="font-black text-sm text-[#111]">Tank {pump.tankId}: {pump.name}</span>
                        <span className="text-[10px] text-[#77756e] block">{pump.label}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="300"
                        step="5"
                        value={pump.weightGrams}
                        onChange={(e) => handleWeightChange(idx, e.target.value)}
                        className="w-20 bg-white border border-black/15 rounded-xl px-2.5 py-1.5 text-center font-mono font-black text-sm text-[#111] outline-none focus:border-[#dca43a]"
                      />
                      <span className="text-xs font-bold text-[#77756e]">grams</span>
                    </div>
                  </div>

                  {/* Weight Slider */}
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="250"
                      step="5"
                      value={pump.weightGrams}
                      onChange={(e) => handleWeightChange(idx, e.target.value)}
                      className="w-full"
                    />
                    <span className="font-mono text-[10px] text-[#77756e] w-12 text-right">
                      {pump.pctOfTotal}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-[#77756e] pt-0.5">
                    <span>Flow Rate: <strong className="text-[#111]">{pump.flowRateMlSec.toFixed(1)} ml/s</strong></span>
                    <span>Estimated Dosing Time: <strong className="text-[#111] font-mono">{pump.pourDurationSec}s</strong></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mixer Duration Control */}
            <div className="bg-[#f4f1e8] p-3.5 rounded-2xl border border-black/8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/20 rounded-xl text-[#8b5cf6]">
                  <RotateCcw size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111]">Relay 6 Mixer Motor Duration</h4>
                  <p className="text-[10px] text-[#77756e]">Time for 12V stirrer motor in mixing chamber</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={stirrerSec}
                  onChange={(e) => setStirrerSec(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-16 bg-white border border-black/15 rounded-xl px-2 py-1.5 text-center font-mono font-bold text-sm text-[#111] outline-none focus:border-[#8b5cf6]"
                />
                <span className="text-xs text-[#77756e] font-bold">sec</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Summary & Real-time Scale Feedback Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Target Weight Output Breakdown Card */}
          <div className="modern-card p-5 bg-white space-y-4 shadow-sm border border-black/10">
            <h3 className="text-sm font-bold text-[#111] flex items-center gap-2 border-b border-black/10 pb-2.5">
              <Scale size={16} className="text-[#dca43a]" /> Target Output Weight Breakdown
            </h3>

            {/* Stacked Ratio Graphic Bar */}
            <div>
              <span className="text-[10px] font-bold text-[#77756e] uppercase tracking-wider block mb-1.5">
                Ingredient Weight Ratios
              </span>
              <div className="h-6 w-full rounded-full overflow-hidden bg-[#f4f1e8] flex border border-black/10 p-0.5 shadow-inner">
                {pumpDetails.map((pump, idx) => {
                  if (pump.weightGrams <= 0) return null;
                  return (
                    <div
                      key={idx}
                      style={{ width: `${pump.pctOfTotal}%`, backgroundColor: pump.color }}
                      className="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full"
                      title={`${pump.name}: ${pump.weightGrams}g (${pump.pctOfTotal}%)`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Target Weights Summary Table */}
            <div className="bg-[#f4f1e8] p-4 rounded-2xl border border-black/8 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#77756e] font-medium">Net Liquid Target Weight:</span>
                <span className="font-mono font-black text-sm text-[#111]">{totalNetLiquidGrams} g</span>
              </div>

              <div className="flex justify-between items-center text-xs border-t border-black/8 pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#77756e] font-medium">Cup Tare Weight:</span>
                  <input
                    type="number"
                    min="20"
                    max="300"
                    value={cupTareGrams}
                    onChange={(e) => setCupTareGrams(parseInt(e.target.value) || 0)}
                    className="w-14 bg-white border border-black/15 rounded-md px-1.5 py-0.5 text-center font-mono text-xs font-bold text-[#111]"
                  />
                  <span className="text-[10px] text-[#77756e]">g</span>
                </div>
                <span className="font-mono font-bold text-xs text-[#77756e]">{cupTareGrams} g</span>
              </div>

              <div className="flex justify-between items-center text-sm border-t border-black/10 pt-2.5">
                <span className="font-extrabold text-[#111]">Gross Target Scale Weight:</span>
                <span className="font-mono font-black text-base text-[#dca43a]">{targetGrossWeightGrams} g</span>
              </div>

              <div className="flex justify-between items-center text-xs border-t border-black/8 pt-2">
                <span className="text-[#77756e]">Estimated Dosing Time:</span>
                <span className="font-mono font-bold text-[#111]">{totalPourTimeSec} sec</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              {orderDispatched ? (
                <div className="bg-[#159447]/15 border border-[#159447]/30 rounded-2xl p-4 text-center text-[#159447] text-xs font-black flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> Recipe Dispatched with Target Weight ({totalNetLiquidGrams}g)!
                </div>
              ) : (
                <button
                  onClick={handleDispenseExactWeight}
                  disabled={totalNetLiquidGrams === 0}
                  className="w-full btn-modern-yellow py-3 text-xs font-black flex items-center justify-center gap-2 shadow-lg disabled:opacity-40"
                >
                  <Play size={16} />
                  <span>DISPENSE WITH EXACT WEIGHTS ({totalNetLiquidGrams} g)</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Real-time Load Cell Sensor Card */}
          <div className="modern-card p-5 bg-white space-y-3">
            <div className="flex items-center justify-between border-b border-black/10 pb-2">
              <h3 className="text-xs font-bold text-[#111] flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#159447]" /> Live Load Cell Sensor Output
              </h3>
              <button
                onClick={tareScale}
                className="text-[10px] font-bold text-[#77756e] hover:text-[#111] bg-[#f4f1e8] px-2.5 py-1 rounded-lg border border-black/10"
              >
                Tare Scale
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f4f1e8] p-3 rounded-xl border border-black/8 text-center">
                <span className="text-[9px] font-bold text-[#77756e] uppercase block">Live Gross Weight</span>
                <span className="font-mono text-lg font-black text-[#111]">{grossWeightGrams.toFixed(1)} g</span>
              </div>

              <div className="bg-[#f4f1e8] p-3 rounded-xl border border-black/8 text-center">
                <span className="text-[9px] font-bold text-[#77756e] uppercase block">Live Net Poured</span>
                <span className="font-mono text-lg font-black text-[#dca43a]">{netWeightGrams.toFixed(1)} g</span>
              </div>
            </div>

            <div className="text-[10px] text-[#77756e] bg-[#f4f1e8] p-2.5 rounded-xl border border-black/8 flex items-center justify-between">
              <span>Relay 7 Auto-Cutoff Target:</span>
              <strong className="text-[#111] font-mono">{totalNetLiquidGrams} g Net Weight</strong>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
