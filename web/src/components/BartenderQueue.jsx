import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Layers, RefreshCw, Droplets, AlertCircle } from 'lucide-react';

export const BartenderQueue = () => {
  const { tanks, setTanks, recentOrders, machineState } = useBartender();

  const refillAllTanks = () => {
    setTanks(prev => prev.map(t => ({ ...t, pct: 100, currentMl: t.capacityMl })));
  };

  return (
    <div className="space-y-6 pb-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="badge-black">INVENTORY & QUEUE</span>
          <h2 className="text-2xl font-black text-[#111] tracking-tight flex items-center gap-2 mt-1">
            <Layers className="text-[#f5c400]" size={22} /> Order Queue & Tank Inventory
          </h2>
          <p className="text-[#77756e] text-xs">Live drink orders and supply tank levels</p>
        </div>
        <button
          onClick={refillAllTanks}
          className="btn-modern-yellow flex items-center gap-2 text-xs"
        >
          <RefreshCw size={14} />
          <span>Refill All Tanks (1000ml)</span>
        </button>
      </div>

      {/* Tank Inventory Levels */}
      <div className="modern-card p-5 bg-white space-y-4">
        <h3 className="text-base font-bold text-[#111] flex items-center gap-2 border-b border-black/10 pb-2">
          <Droplets className="text-[#f5c400]" size={16} /> Tank Inventory (Pumps 1–5)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {tanks.map((tank) => {
            const pct = Math.min(100, Math.round((tank.currentMl / tank.capacityMl) * 100));
            const isLow = pct < 20;

            return (
              <div
                key={tank.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isLow ? 'border-[#e6392f]/50 bg-[#e6392f]/5' : 'bg-[#f4f1e8] border-black/8'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#111]">Tank {tank.id}</span>
                  <span className={`font-black ${isLow ? 'text-[#e6392f]' : 'text-[#111]'}`}>
                    {pct}%
                  </span>
                </div>

                <div className="h-2.5 w-full bg-white rounded-full overflow-hidden mb-2 border border-black/10">
                  <div
                    style={{ width: `${pct}%`, backgroundColor: tank.color }}
                    className="h-full rounded-full transition-all duration-500 opacity-80"
                  />
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-[#111] truncate">{tank.name}</h4>
                  <p className="text-[10px] text-[#77756e] font-mono">{tank.currentMl} / {tank.capacityMl} ml</p>
                </div>

                {isLow && (
                  <div className="mt-1.5 text-[9px] font-bold text-[#e6392f] flex items-center gap-1">
                    <AlertCircle size={9} /> LOW SUPPLY
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="modern-card p-5 bg-white space-y-4">
        <div className="flex items-center justify-between border-b border-black/10 pb-2">
          <h3 className="text-base font-bold text-[#111] flex items-center gap-2">
            Recent Orders ({recentOrders.length})
          </h3>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
            machineState === 'PREPARING'
              ? 'bg-[#f5c400] text-black border-[#f5c400]'
              : 'bg-[#f4f1e8] text-[#77756e] border-black/10'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${machineState === 'PREPARING' ? 'bg-black animate-ping' : 'bg-[#77756e]'}`} />
            {machineState === 'PREPARING' ? 'Dispensing Now' : 'Idle'}
          </div>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-10 text-center text-[#77756e] space-y-2">
            <Layers size={32} className="mx-auto text-[#77756e]" />
            <p className="font-bold text-[#111] text-sm">No Orders Yet</p>
            <p className="text-xs">Orders will appear here after customers place them.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((order, idx) => (
              <div
                key={order.id + idx}
                className="p-3 rounded-xl border border-black/8 bg-[#f4f1e8] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono font-bold text-[#111] bg-white px-2 py-0.5 rounded border border-black/10">
                    {order.id}
                  </span>
                  <div>
                    <h4 className="font-bold text-[#111] text-xs">{order.drink}</h4>
                    <p className="text-[9px] text-[#77756e] font-mono">{order.time}</p>
                  </div>
                </div>
                <span className="badge-black">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
