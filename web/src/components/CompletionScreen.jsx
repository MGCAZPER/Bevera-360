import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Check, RotateCcw, GlassWater, Sparkles } from 'lucide-react';

export const CompletionScreen = () => {
  const { selectedDrink, handleResetOrder } = useBartender();

  return (
    <div className="glass-panel max-w-3xl mx-auto p-8 text-center border border-[#00ff88]/30 shadow-[0_0_40px_rgba(0,255,136,0.15)] bg-gradient-to-b from-[#061510] to-[#040810] space-y-6 animate-fade-in my-4 relative overflow-hidden">
      
      {/* Decorative Confetti Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <div className="absolute top-16 right-16 w-3 h-1.5 rounded-full bg-pink-500 transform rotate-45" />
        <div className="absolute bottom-12 left-20 w-2 h-2 rounded-full bg-yellow-400" />
        <div className="absolute bottom-20 right-24 w-2 h-2 rounded-full bg-emerald-400" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ff88]/15 border border-[#00ff88]/30 text-[#00ff88] text-[10px] font-black uppercase tracking-widest">
        <Sparkles size={12} /> 03. DRINK READY SCREEN
      </div>

      {/* Large Glowing Green Checkmark Icon */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#00ff88]/20 animate-pulse" />
        <div className="w-20 h-20 rounded-full border-4 border-[#00ff88] bg-slate-950 flex items-center justify-center text-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.8)]">
          <Check size={44} className="stroke-[3]" />
        </div>
      </div>

      <div className="space-y-1.5">
        <h2 className="text-3xl font-black text-[#00ff88] uppercase tracking-wider">
          DRINK READY!
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          Please collect your beverage from dispenser nozzle tray 1.
        </p>
      </div>

      {/* Drink Summary Pill */}
      <div className="bg-[#08121a] p-3 rounded-2xl border border-[#00ff88]/20 max-w-sm mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 p-1 flex items-center justify-center">
            <img src={selectedDrink.image} alt={selectedDrink.name} className="h-full object-contain" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-white">{selectedDrink.name}</h4>
            <p className="text-[10px] text-[#00ff88] font-mono">Mixed to Perfection</p>
          </div>
        </div>
        <GlassWater size={20} className="text-[#00ff88]" />
      </div>

      {/* Order Another Drink Button */}
      <div className="pt-2">
        <button
          onClick={handleResetOrder}
          className="btn-neon-cyan py-3 px-6 text-xs font-black rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2 mx-auto"
        >
          <span>Order Another Drink</span>
          <RotateCcw size={14} />
        </button>
      </div>

    </div>
  );
};
