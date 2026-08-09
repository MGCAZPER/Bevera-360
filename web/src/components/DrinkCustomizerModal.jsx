import React, { useState } from 'react';
import { useBartender } from '../context/BartenderContext';
import { X, Play, Sliders, Droplets, RotateCw, Save, Sparkles, CheckCircle2 } from 'lucide-react';

export const DrinkCustomizerModal = ({ onClose, inline = false }) => {
  const { tanks, placeOrder } = useBartender();
  
  const [customName, setCustomName] = useState('Cyber Punch Special');
  const [volumes, setVolumes] = useState([30, 40, 30, 20, 15]); // ml for pumps 1-5
  const [stirrerSec, setStirrerSec] = useState(4);
  const [orderSent, setOrderSent] = useState(false);

  const totalVolume = volumes.reduce((a, b) => a + b, 0);

  const handleVolumeChange = (index, value) => {
    const newVols = [...volumes];
    newVols[index] = parseInt(value) || 0;
    setVolumes(newVols);
  };

  const handleDispense = () => {
    const customRecipe = {
      name: customName || 'Custom Mix',
      category: 'Custom Mixology',
      description: 'Custom blended mixology creation formulated in Lab.',
      icon: '🧪',
      volumesMl: volumes,
      stirrerSec,
      popular: false
    };

    placeOrder(customRecipe);
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      if (onClose) onClose();
    }, 2000);
  };

  const content = (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-black tracking-widest text-[#65c466] uppercase flex items-center gap-1.5">
            <Sparkles size={13} /> PRECISION RECIPE FORMULATOR
          </span>
          <h3 className="text-2xl font-black text-white">Custom Mixology Lab</h3>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Custom Name */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Recipe Name
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Neon Cyber Elixir"
              className="w-full bg-[#090d16] border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-bold text-sm outline-none focus:border-[#65c466] focus:ring-1 focus:ring-[#65c466] transition-all"
            />
          </div>

          {/* Liquid Pump Sliders */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                5-Channel Pump Liquid Channels (0 - 100 mL)
              </label>
              <span className="text-xs font-mono font-extrabold text-[#65c466] bg-[#65c466]/10 px-2.5 py-1 rounded-full border border-[#65c466]/30">
                Total: {totalVolume} mL
              </span>
            </div>

            <div className="space-y-2.5">
              {tanks.map((tank, idx) => (
                <div key={tank.id} className="bg-[#090d16]/90 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: tank.color }} />
                      <span className="font-extrabold text-white">Pump {idx + 1}:</span>
                      <span className="text-slate-400 font-medium">{tank.name}</span>
                    </div>
                    <span className="font-mono font-extrabold text-[#65c466] text-sm">{volumes[idx]} mL</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={volumes[idx]}
                    onChange={(e) => handleVolumeChange(idx, e.target.value)}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#65c466]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Stirrer Motor */}
          <div className="bg-[#090d16]/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCw className="text-purple-400 animate-spin" size={20} />
              <div>
                <h4 className="text-sm font-bold text-white">Magnetic Stirrer Duration</h4>
                <p className="text-xs text-slate-400">12V DC Motor spin time for homogenization</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="10"
                value={stirrerSec}
                onChange={(e) => setStirrerSec(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-center text-white font-mono font-bold text-sm outline-none focus:border-[#65c466]"
              />
              <span className="text-xs text-slate-400 font-bold">sec</span>
            </div>
          </div>

        </div>

        {/* Right Preview Card (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 flex flex-col justify-between bg-[#0b0f19] border border-slate-800/90 shadow-xl">
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
              Visual Ratio Preview
            </h4>

            {/* Stacked Ratio Graphic Bar */}
            <div className="h-6 w-full rounded-full overflow-hidden bg-slate-900 flex border border-slate-800 p-0.5">
              {tanks.map((tank, idx) => {
                const pct = totalVolume > 0 ? (volumes[idx] / totalVolume) * 100 : 0;
                if (pct <= 0) return null;
                return (
                  <div
                    key={idx}
                    style={{ width: `${pct}%`, backgroundColor: tank.color }}
                    className="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full"
                    title={`Pump ${idx + 1}: ${volumes[idx]}ml (${pct.toFixed(0)}%)`}
                  />
                );
              })}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Recipe Name:</span>
                <span className="font-bold text-white">{customName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Calculated Pour Time:</span>
                <span className="font-mono text-[#65c466] font-bold">
                  {(totalVolume / 15.0).toFixed(1)} sec
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Price:</span>
                <span className="font-mono text-[#65c466] font-bold">LKR 450</span>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-2">
            {orderSent ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-3 text-center text-emerald-300 text-xs font-extrabold flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Recipe Dispatched to ESP32!
              </div>
            ) : (
              <button
                onClick={handleDispense}
                disabled={totalVolume === 0}
                className="w-full btn-green text-sm py-3"
              >
                <Play size={16} />
                <span>DISPENSE CUSTOM RECIPE</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );

  if (inline) {
    return <div className="glass-panel p-6 max-w-5xl mx-auto">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
      <div className="glass-panel w-full max-w-3xl overflow-hidden border border-slate-700/80 shadow-2xl p-6 relative">
        {content}
      </div>
    </div>
  );
};
