import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Clock, Check } from 'lucide-react';

export const DrinkSelectionGrid = () => {
  const { drinks, selectedDrink, setSelectedDrink } = useBartender();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" /> SELECT YOUR DRINK
        </h2>
      </div>

      {/* Grid of 5 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {drinks.map((drink) => {
          const isSelected = selectedDrink.id === drink.id;

          return (
            <div
              key={drink.id}
              onClick={() => setSelectedDrink(drink)}
              className={`glass-panel p-3 flex flex-col justify-between cursor-pointer relative group transition-all duration-300 ${
                isSelected
                  ? 'border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.35)] bg-gradient-to-b from-[#0f1d38] to-[#0a1224] scale-[1.02]'
                  : 'hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] bg-[#090e1c]/80'
              }`}
            >
              <div className="space-y-2">
                {/* Image Container with Number Badge #1..#5 */}
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-950 p-2 flex items-center justify-center">
                  {/* Purple/Blue Badge Top Left */}
                  <div className="absolute top-2 left-2 w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-md z-10">
                    {drink.numBadge}
                  </div>

                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="h-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,240,255,0.25)] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Drink Name & Ingredients Summary */}
                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-[#00f0ff] transition-colors truncate">
                    {drink.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 leading-tight line-clamp-2 mt-0.5 font-medium">
                    {drink.ingredientsSummary}
                  </p>
                </div>
              </div>

              {/* Card Footer: Price LKR, Time & Select Button */}
              <div className="pt-3 border-t border-cyan-500/15 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-white text-xs">LKR {drink.priceLkr.toFixed(2)}</span>
                  <span className="flex items-center gap-1 text-slate-400 text-[10px]">
                    <Clock size={11} className="text-[#00f0ff]" /> {drink.prepTime}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDrink(drink);
                  }}
                  className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-[#00f0ff] text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                      : 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white hover:from-cyan-500 hover:to-blue-600 border border-cyan-500/30'
                  }`}
                >
                  {isSelected ? <Check size={13} /> : null}
                  <span>{isSelected ? 'Selected' : 'Select'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
