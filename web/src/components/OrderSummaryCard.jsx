import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { ShoppingBag, Clock } from 'lucide-react';

export const OrderSummaryCard = () => {
  const {
    selectedDrink,
    calculateTotalPrice,
    handlePlaceOrder,
    machineState
  } = useBartender();

  const totalPriceLkr = calculateTotalPrice(selectedDrink.priceLkr);

  return (
    <div className="glass-panel p-5 border border-cyan-500/20 bg-[#080d1a] shadow-2xl flex flex-col justify-between space-y-4">
      
      {/* Header */}
      <div className="border-b border-cyan-500/15 pb-2">
        <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">
          ORDER SUMMARY
        </h3>
      </div>

      {/* Drink Thumbnail & Info */}
      <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
        <div className="w-14 h-14 rounded-lg bg-slate-900 p-1 flex items-center justify-center flex-shrink-0">
          <img
            src={selectedDrink.image}
            alt={selectedDrink.name}
            className="h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,240,255,0.3)]"
          />
        </div>
        <div>
          <h4 className="text-sm font-black text-white">{selectedDrink.name}</h4>
          <p className="text-xs font-mono font-bold text-cyan-400">LKR {selectedDrink.priceLkr.toFixed(2)}</p>
        </div>
      </div>

      {/* Ingredients Breakdown Table */}
      <div className="space-y-2 text-xs">
        <span className="text-[11px] font-bold text-slate-300 block">Ingredients</span>
        
        <div className="space-y-1 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px]">
          {selectedDrink.ingredientsDetailed.map((ing, idx) => (
            <div key={idx} className="flex justify-between text-slate-300">
              <span>• {ing.name}</span>
              <span className="text-cyan-400 font-bold">{ing.amount}</span>
            </div>
          ))}
        </div>

        {/* Preparation Time */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-slate-300 text-xs">
          <span className="flex items-center gap-1.5 font-bold">
            <Clock size={13} className="text-cyan-400" /> Preparation Time
          </span>
          <span className="font-mono text-cyan-400 font-bold">{selectedDrink.prepTime}</span>
        </div>
      </div>

      {/* Total Price & Glowing Place Order Button */}
      <div className="pt-3 border-t border-cyan-500/20 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300">Total Price</span>
          <span className="text-base font-black text-white font-mono">
            LKR {totalPriceLkr.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => handlePlaceOrder(selectedDrink)}
          disabled={machineState === 'PREPARING'}
          className="w-full btn-neon-cyan py-3 text-xs font-black rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2"
        >
          <ShoppingBag size={14} />
          <span>Place Order</span>
        </button>
      </div>

    </div>
  );
};
