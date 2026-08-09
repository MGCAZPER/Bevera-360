import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Check, RotateCcw, GlassWater, Sparkles } from 'lucide-react';

export const CompletionScreen = () => {
  const { selectedDrink, handleResetOrder } = useBartender();

  return (
    <div className="modern-card max-w-3xl mx-auto p-8 text-center space-y-6 my-4 relative overflow-hidden border-2 border-[#159447]/20">

      {/* Decorative dots */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-[#f5c400] animate-ping" />
        <div className="absolute top-16 right-16 w-3 h-1.5 rounded-full bg-[#e6392f] transform rotate-45" />
        <div className="absolute bottom-12 left-20 w-2 h-2 rounded-full bg-[#159447]" />
        <div className="absolute bottom-20 right-24 w-2 h-2 rounded-full bg-[#f5c400]" />
      </div>

      <span className="badge-black inline-flex items-center gap-1.5">
        <Sparkles size={10} /> 03. DRINK READY
      </span>

      {/* Big checkmark */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#159447]/15 animate-pulse" />
        <div className="w-20 h-20 rounded-full border-4 border-[#159447] bg-white flex items-center justify-center text-[#159447] shadow-[0_8px_30px_rgba(21,148,71,0.25)]">
          <Check size={44} className="stroke-[3]" />
        </div>
      </div>

      <div className="space-y-1.5">
        <h2 className="text-3xl font-black text-[#111] uppercase tracking-tight">
          DRINK <span className="text-[#159447]">READY!</span>
        </h2>
        <p className="text-[#77756e] text-sm font-medium">
          Please collect your beverage from dispenser nozzle tray 1.
        </p>
      </div>

      {/* Drink summary */}
      <div className="bg-[#f4f1e8] p-3 rounded-2xl border border-black/10 max-w-sm mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-black/8">
            <img src={selectedDrink.image} alt={selectedDrink.name} className="h-full object-contain" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-[#111]">{selectedDrink.name}</h4>
            <p className="text-[9px] text-[#159447] font-mono">Mixed to Perfection</p>
          </div>
        </div>
        <GlassWater size={20} className="text-[#f5c400]" />
      </div>

      {/* Order another */}
      <div className="pt-2">
        <button
          onClick={handleResetOrder}
          className="btn-modern-black flex items-center justify-center gap-2 mx-auto"
        >
          <span>Order Another Drink</span>
          <RotateCcw size={14} />
        </button>
      </div>

    </div>
  );
};
