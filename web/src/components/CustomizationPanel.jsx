import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Snowflake, Droplet, Plus, Check } from 'lucide-react';

export const CustomizationPanel = () => {
  const {
    iceLevelVal,
    setIceLevelVal,
    sweetnessVal,
    setSweetnessVal,
    cupSize,
    setCupSize,
    selectedExtras,
    toggleExtra
  } = useBartender();

  const extraOptions = [
    { name: 'Extra Mint', priceLkr: 20 },
    { name: 'Extra Shot', priceLkr: 30 },
    { name: 'Extra Flavor', priceLkr: 20 }
  ];

  return (
    <div className="glass-panel p-5 border border-cyan-500/20 space-y-5 bg-[#080d1a]">
      
      {/* Header */}
      <div className="border-b border-cyan-500/15 pb-2">
        <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">
          CUSTOMIZE YOUR DRINK
        </h3>
      </div>

      <div className="space-y-4 text-xs">
        
        {/* 1. Ice Level Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-slate-300 font-bold text-[11px]">
            <span>Ice Level</span>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <Snowflake size={14} className="text-slate-500 flex-shrink-0" />
            <input
              type="range"
              min="0"
              max="100"
              value={iceLevelVal}
              onChange={(e) => setIceLevelVal(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
            />
            <Snowflake size={16} className="text-[#00f0ff] flex-shrink-0" />
          </div>
        </div>

        {/* 2. Sweetness Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-slate-300 font-bold text-[11px]">
            <span>Sweetness</span>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <Droplet size={14} className="text-slate-500 flex-shrink-0" />
            <input
              type="range"
              min="0"
              max="100"
              value={sweetnessVal}
              onChange={(e) => setSweetnessVal(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
            />
            <Droplet size={16} className="text-[#00f0ff] flex-shrink-0" />
          </div>
        </div>

        {/* 3. Cup Size Selector */}
        <div className="space-y-1.5">
          <span className="text-slate-300 font-bold text-[11px] block">Cup Size</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { size: 'Small', iconScale: 'h-4' },
              { size: 'Medium', iconScale: 'h-6' },
              { size: 'Large', iconScale: 'h-8' }
            ].map((item) => {
              const isSelected = cupSize === item.size;
              return (
                <button
                  key={item.size}
                  onClick={() => setCupSize(item.size)}
                  className={`py-2 px-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className={`w-3 ${item.iconScale} border border-current rounded-sm`} />
                  <span className="text-[11px] font-extrabold">{item.size}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Extra Ingredient */}
        <div className="space-y-2 pt-1">
          <span className="text-slate-300 font-bold text-[11px] block">Extra Ingredient</span>
          <div className="space-y-1.5">
            {extraOptions.map((opt) => {
              const isChecked = selectedExtras.some(e => e.name === opt.name);
              return (
                <button
                  key={opt.name}
                  onClick={() => toggleExtra(opt)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    isChecked
                      ? 'bg-cyan-500/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div>
                    <span className="block font-bold">{opt.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">LKR {opt.priceLkr}</span>
                  </div>

                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs ${
                    isChecked ? 'bg-[#00f0ff] text-slate-950 font-black' : 'bg-slate-900 border border-slate-700 text-slate-400'
                  }`}>
                    {isChecked ? <Check size={12} /> : <Plus size={12} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
