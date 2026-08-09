import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Check, RotateCcw } from 'lucide-react';

export const CompletionScreen = () => {
  const { handleResetOrder } = useBartender();

  return (
    <div className="glass-panel max-w-2xl mx-auto p-10 text-center border border-[#00ff88]/30 shadow-[0_0_40px_rgba(0,255,136,0.15)] bg-gradient-to-b from-[#061510] to-[#040810] space-y-6 animate-fade-in my-8 relative overflow-hidden">
      
      {/* Decorative Confetti Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <div className="absolute top-16 right-16 w-3 h-1.5 rounded-full bg-pink-500 transform rotate-45" />
        <div className="absolute bottom-12 left-20 w-2 h-2 rounded-full bg-yellow-400" />
        <div className="absolute bottom-20 right-24 w-2 h-2 rounded-full bg-emerald-400" />
      </div>

      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
        03. DRINK READY SCREEN
      </span>

      {/* Large Glowing Green Checkmark Icon */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#00ff88]/20 animate-pulse" />
        <div className="w-24 h-24 rounded-full border-4 border-[#00ff88] bg-slate-950 flex items-center justify-center text-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.8)]">
          <Check size={52} className="stroke-[3]" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-black text-[#00ff88] uppercase tracking-wider">
          DRINK READY!
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          Please collect your beverage.
        </p>
      </div>

      {/* Order Another Drink Button */}
      <div className="pt-4">
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
