import React, { useState } from 'react';
import { useBartender } from '../context/BartenderContext';
import { Sparkles, Flame, Plus, Play, Search, Filter, Droplets, Zap, ShieldCheck, Activity } from 'lucide-react';
import { DrinkCustomizerModal } from './DrinkCustomizerModal';

export const CustomerMenu = ({ onSelectOrder }) => {
  const { drinks, tanks, placeOrder, machineState, cupPresent } = useBartender();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'POPULAR', 'COCKTAIL', 'MOCKTAIL', 'ENERGY'];

  // Filter Drinks
  const filteredDrinks = drinks.filter((drink) => {
    const matchesSearch = drink.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drink.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'POPULAR') return drink.popular;
    if (selectedCategory === 'COCKTAIL') return drink.category.toLowerCase().includes('cocktail');
    if (selectedCategory === 'MOCKTAIL') return drink.category.toLowerCase().includes('fizz') || drink.category.toLowerCase().includes('cooler');
    if (selectedCategory === 'ENERGY') return drink.category.toLowerCase().includes('energy');
    return true;
  });

  const handleOrderClick = (drink) => {
    placeOrder(drink);
    if (onSelectOrder) onSelectOrder(drink);
  };

  // Calculate System Stats
  const avgTankLevel = Math.round(
    tanks.reduce((acc, t) => acc + (t.currentMl / t.capacityMl) * 100, 0) / tanks.length
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800/80 p-8 lg:p-10 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} /> ESP32 Robotic Mixology Hub
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Automated Beverage Dispenser
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience milliliter-accurate liquid pouring powered by 5 independent 12V DC pumps, active IR cup safety sensor, and dynamic magnetic stirring.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 backdrop-blur border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <Droplets size={14} className="text-cyan-400" /> Tank Avg
              </div>
              <p className="text-xl font-extrabold text-white">{avgTankLevel}%</p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <ShieldCheck size={14} className={cupPresent ? 'text-emerald-400' : 'text-rose-400'} /> Cup Interlock
              </div>
              <p className={`text-sm font-extrabold ${cupPresent ? 'text-emerald-400' : 'text-rose-400'}`}>
                {cupPresent ? 'READY ✓' : 'NO CUP ✗'}
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-900/80 backdrop-blur border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <Activity size={14} className="text-purple-400" /> Machine
              </div>
              <p className="text-sm font-extrabold text-cyan-400 truncate">{machineState}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Search & Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar & Custom Mix CTA */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="btn btn-primary py-2 text-xs whitespace-nowrap"
          >
            <Plus size={14} />
            <span>Mixology Lab</span>
          </button>
        </div>

      </div>

      {/* Drink Cards Grid */}
      <div>
        {filteredDrinks.length === 0 ? (
          <div className="glass-panel p-12 text-center space-y-3">
            <Filter size={36} className="mx-auto text-slate-600" />
            <h4 className="text-lg font-bold text-white">No Drinks Found</h4>
            <p className="text-xs text-slate-400">Try adjusting your category filter or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrinks.map((drink) => {
              const totalVolumeMl = drink.volumesMl.reduce((a, b) => a + b, 0);

              return (
                <div
                  key={drink.id}
                  className="glass-panel glass-panel-hover p-6 flex flex-col justify-between relative group"
                >
                  {/* Popular Badge */}
                  {drink.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md shadow-amber-500/20 flex items-center gap-1">
                      <Flame size={10} /> Popular
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Header Info */}
                    <div className="flex items-start gap-4">
                      <div className="text-4xl p-3 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {drink.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider">
                          {drink.category}
                        </span>
                        <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {drink.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1"><Droplets size={12} /> {totalVolumeMl} ml</span>
                          <span>•</span>
                          <span>Stir {drink.stirrerSec}s</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {drink.description}
                    </p>

                    {/* Liquid Composition Bar */}
                    <div className="space-y-2 pt-3 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-400">Pump Composition:</span>
                        <span className="font-bold text-cyan-400">{totalVolumeMl} ml</span>
                      </div>

                      <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                        {drink.volumesMl.map((vol, idx) => {
                          if (vol === 0) return null;
                          const pct = (vol / totalVolumeMl) * 100;
                          const tank = tanks[idx];
                          return (
                            <div
                              key={idx}
                              style={{ width: `${pct}%`, backgroundColor: tank ? tank.color : '#00f0ff' }}
                              title={`Pump ${idx + 1} (${tank?.name || 'Tank'}): ${vol} ml`}
                              className="h-full first:rounded-l-full last:rounded-r-full hover:brightness-125 transition-all"
                            />
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400 pt-1">
                        {drink.volumesMl.map((vol, idx) => {
                          if (vol === 0) return null;
                          return (
                            <span key={idx} className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tanks[idx]?.color || '#00f0ff' }} />
                              P{idx + 1}: <strong className="text-slate-200">{vol}ml</strong>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Order Action Button */}
                  <div className="pt-6">
                    <button
                      onClick={() => handleOrderClick(drink)}
                      disabled={machineState !== 'IDLE' && machineState !== 'COMPLETED'}
                      className={`w-full btn ${
                        machineState !== 'IDLE' && machineState !== 'COMPLETED'
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          : 'btn-primary'
                      }`}
                    >
                      <Play size={15} />
                      <span>Dispense Drink</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom Drink Creator Modal */}
      {isCustomizerOpen && (
        <DrinkCustomizerModal onClose={() => setIsCustomizerOpen(false)} />
      )}
    </div>
  );
};
