import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Layers, RefreshCw, Trash2, Clock, Droplets, CheckCircle, AlertCircle, Play } from 'lucide-react';

export const BartenderQueue = () => {
  const { orderQueue, activeOrder, cancelOrder, tanks, refillTanks, machineState } = useBartender();

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Layers className="text-cyan-400" /> Bartender Order Queue & Inventory
          </h2>
          <p className="text-slate-400 text-sm">Monitor live drink requests and track supply tank levels</p>
        </div>

        <button
          onClick={refillTanks}
          className="btn btn-secondary flex items-center gap-2"
        >
          <RefreshCw size={16} />
          <span>Refill All Tanks (1000ml)</span>
        </button>
      </div>

      {/* Tank Liquid Level Indicators Grid */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Droplets className="text-cyan-400" size={18} /> Tank Inventory Levels (Pumps 1 - 5)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {tanks.map((tank) => {
            const pct = Math.min(100, Math.round((tank.currentMl / tank.capacityMl) * 100));
            const isLow = pct < 20;

            return (
              <div
                key={tank.id}
                className={`bg-slate-900/80 p-4 rounded-2xl border transition-all ${
                  isLow ? 'border-rose-500/60 bg-rose-950/20' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-300">Tank {tank.id}</span>
                  <span className={`font-extrabold ${isLow ? 'text-rose-400' : 'text-cyan-400'}`}>
                    {pct}%
                  </span>
                </div>

                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden mb-3 border border-slate-800">
                  <div
                    style={{ width: `${pct}%`, backgroundColor: tank.color }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-white truncate">{tank.name}</h4>
                  <p className="text-[11px] text-slate-400">{tank.currentMl} / {tank.capacityMl} ml</p>
                </div>

                {isLow && (
                  <div className="mt-2 text-[10px] font-bold text-rose-400 flex items-center gap-1">
                    <AlertCircle size={10} /> LOW SUPPLY
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Orders Board */}
      <div className="glass-panel p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Incoming Orders List ({orderQueue.length})
          </h3>
        </div>

        {orderQueue.length === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-2">
            <Layers size={36} className="mx-auto text-slate-600" />
            <p className="font-bold text-slate-400">No Orders in Queue</p>
            <p className="text-xs">Customers can select drinks from the main menu to place orders.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orderQueue.map((order) => {
              const isCurrentlyActive = activeOrder && activeOrder.id === order.id;

              return (
                <div
                  key={order.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    isCurrentlyActive
                      ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                        {order.id}
                      </span>
                      <h4 className="font-bold text-white text-base">{order.drinkName}</h4>
                      
                      <span className={`badge ${
                        order.status === 'COMPLETED' ? 'badge-success' :
                        isCurrentlyActive ? 'badge-purple pulse-active' : 'badge-amber'
                      }`}>
                        {isCurrentlyActive ? 'DISPENSING NOW' : order.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock size={12} /> {order.timestamp}</span>
                      <span>Customer: <strong>{order.customerName}</strong></span>
                      <span>Total: <strong>{order.volumesMl.reduce((a,b)=>a+b,0)} ml</strong></span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {order.status !== 'COMPLETED' && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                        title="Cancel Order"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
