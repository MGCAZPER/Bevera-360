import React, { useState } from 'react';
import { useBartender } from '../context/BartenderContext';
import { X, Play, RotateCw, Sparkles, CheckCircle2 } from 'lucide-react';

export const DrinkCustomizerModal = ({ onClose, inline = false }) => {
  const { tanks, handlePlaceOrder } = useBartender();

  const [customName, setCustomName] = useState('Cyber Punch Special');
  const [volumes, setVolumes] = useState([30, 40, 30, 20, 15]);
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
      id: `custom_${Date.now()}`,
      name: customName || 'Custom Mix',
      priceLkr: 450,
      prepTime: `${Math.ceil(totalVolume / 15)} sec`,
      category: 'Custom Mixology',
      ingredientsSummary: 'Custom blend',
      image: '/images/ocean_blue.png',
      ingredientsDetailed: tanks.map((t, i) => ({ name: t.label || `Pump ${i + 1}`, amount: `${volumes[i]}ml` })),
      volumesMl: volumes,
      stirrerSec,
      popular: false
    };

    handlePlaceOrder(customRecipe);
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      if (onClose) onClose();
    }, 2000);
  };

  const content = (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 pb-4">
        <div>
          <span className="badge-yellow inline-flex items-center gap-1.5">
            <Sparkles size={10} /> RECIPE FORMULATOR
          </span>
          <h3 className="text-xl font-black text-[#111] mt-1">Custom Mixology Lab</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#77756e] hover:text-[#111] hover:bg-black/5 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">

          {/* Recipe Name */}
          <div>
            <label className="block text-[10px] font-bold text-[#77756e] uppercase tracking-widest mb-1.5">
              Recipe Name
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Neon Elixir"
              className="w-full bg-[#f4f1e8] border border-black/10 rounded-xl px-4 py-2.5 text-[#111] font-bold text-sm outline-none focus:border-[#f5c400] transition-all"
            />
          </div>

          {/* Pump Volume Sliders */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-[#77756e] uppercase tracking-widest">
                5-Channel Pump Volumes (0–100 mL)
              </label>
              <span className="text-xs font-mono font-black text-[#111] bg-[#f5c400] px-2.5 py-0.5 rounded-full border border-black/10">
                Total: {totalVolume} mL
              </span>
            </div>

            <div className="space-y-2">
              {tanks.map((tank, idx) => (
                <div key={tank.id} className="bg-[#f4f1e8] p-3 rounded-xl border border-black/8 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tank.color }} />
                      <span className="font-bold text-[#111]">Pump {idx + 1}</span>
                      <span className="text-[#77756e]">{tank.name}</span>
                    </div>
                    <span className="font-mono font-black text-[#111]">{volumes[idx]} mL</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={volumes[idx]}
                    onChange={(e) => handleVolumeChange(idx, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Stirrer */}
          <div className="bg-[#f4f1e8] p-3.5 rounded-xl border border-black/8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCw className="text-[#8b5cf6] animate-spin" size={18} />
              <div>
                <h4 className="text-sm font-bold text-[#111]">Stirrer Duration</h4>
                <p className="text-[10px] text-[#77756e]">12V DC motor mixing time</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="10"
                value={stirrerSec}
                onChange={(e) => setStirrerSec(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-14 bg-white border border-black/10 rounded-lg px-2 py-1.5 text-center text-[#111] font-mono font-bold text-sm outline-none focus:border-[#f5c400]"
              />
              <span className="text-xs text-[#77756e]">sec</span>
            </div>
          </div>
        </div>

        {/* Right Preview (5 Cols) */}
        <div className="lg:col-span-5 bg-[#f4f1e8] rounded-2xl border border-black/10 p-4 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#77756e] border-b border-black/10 pb-2">
              Volume Ratio Preview
            </h4>

            {/* Stacked Ratio Bar */}
            <div className="h-5 w-full rounded-full overflow-hidden bg-white flex border border-black/10 p-0.5">
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

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#77756e]">
                <span>Recipe Name:</span>
                <span className="font-bold text-[#111] truncate max-w-[130px]">{customName}</span>
              </div>
              <div className="flex justify-between text-[#77756e]">
                <span>Calculated Pour Time:</span>
                <span className="font-mono text-[#111] font-bold">{(totalVolume / 15.0).toFixed(1)} sec</span>
              </div>
              <div className="flex justify-between text-[#77756e]">
                <span>Stirrer Spin:</span>
                <span className="font-mono text-[#8b5cf6] font-bold">{stirrerSec} sec</span>
              </div>
              <div className="flex justify-between text-[#77756e]">
                <span>Estimated Price:</span>
                <span className="font-mono text-[#111] font-bold">LKR 450</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            {orderSent ? (
              <div className="bg-[#159447]/10 border border-[#159447]/30 rounded-xl p-3 text-center text-[#159447] text-xs font-black flex items-center justify-center gap-2">
                <CheckCircle2 size={14} /> Recipe Dispatched to ESP32!
              </div>
            ) : (
              <button
                onClick={handleDispense}
                disabled={totalVolume === 0}
                className="btn-modern-yellow w-full py-2.5 text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Play size={14} />
                <span>DISPENSE CUSTOM RECIPE</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );

  if (inline) {
    return <div className="modern-card p-5 max-w-5xl mx-auto bg-white">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="modern-card w-full max-w-3xl bg-white p-5 relative shadow-2xl">
        {content}
      </div>
    </div>
  );
};
