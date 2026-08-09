import React from 'react';
import { useBartender } from '../context/BartenderContext';
import {
  LayoutDashboard, ShoppingBag, GlassWater, BarChart2, Activity, Wrench, Settings,
  TrendingUp, DollarSign, Thermometer, Droplet, OctagonX, Bot
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    totalOrdersToday,
    drinksSoldToday,
    machineTemp,
    waterLevel,
    totalRevenueLkr,
    tanks,
    pumpRuntimes,
    recentOrders,
    emergencyStop
  } = useBartender();

  const sidebarNav = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Orders', icon: ShoppingBag, active: false },
    { label: 'Drinks', icon: GlassWater, active: false },
    { label: 'Analytics', icon: BarChart2, active: false },
    { label: 'Machine Status', icon: Activity, active: false },
    { label: 'Maintenance', icon: Wrench, active: false },
    { label: 'Settings', icon: Settings, active: false }
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-8">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
        04. ADMIN DASHBOARD
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Sidebar Menu (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-4 border border-cyan-500/20 bg-[#070b16] space-y-4">
          <div className="flex items-center gap-2 border-b border-cyan-500/15 pb-3">
            <Bot size={18} className="text-[#00f0ff]" />
            <span className="text-xs font-black text-white uppercase tracking-wider">ROBOTIC BARTENDER</span>
          </div>

          <nav className="space-y-1">
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    item.active
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Dashboard Area (10 Cols) */}
        <div className="lg:col-span-10 space-y-4">
          
          {/* Top 5 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            
            <div className="glass-panel p-3 border border-cyan-500/20 bg-[#080d1a] space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase">TOTAL ORDERS TODAY</span>
              <p className="text-xl font-black text-white font-mono">{totalOrdersToday}</p>
              <span className="text-[9px] font-bold text-[#00ff88]">+12% vs yesterday</span>
            </div>

            <div className="glass-panel p-3 border border-cyan-500/20 bg-[#080d1a] space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase">DRINKS SOLD</span>
              <p className="text-xl font-black text-white font-mono">{drinksSoldToday}</p>
              <span className="text-[9px] font-bold text-[#00ff88]">+18% vs yesterday</span>
            </div>

            <div className="glass-panel p-3 border border-cyan-500/20 bg-[#080d1a] space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase">MACHINE TEMP.</span>
              <p className="text-xl font-black text-white font-mono">{machineTemp}°C</p>
              <span className="text-[9px] font-bold text-[#00ff88]">Normal</span>
            </div>

            <div className="glass-panel p-3 border border-cyan-500/20 bg-[#080d1a] space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase">WATER LEVEL</span>
              <p className="text-xl font-black text-white font-mono">{waterLevel}%</p>
              <span className="text-[9px] font-bold text-[#00ff88]">Good</span>
            </div>

            <div className="glass-panel p-3 border border-cyan-500/20 bg-[#080d1a] space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase">TOTAL REVENUE</span>
              <p className="text-sm font-black text-white font-mono">LKR {totalRevenueLkr.toLocaleString()}</p>
              <span className="text-[9px] font-bold text-[#00ff88]">+15% vs yesterday</span>
            </div>

          </div>

          {/* Lower Grid: Tanks, Pump Runtime, Recent Orders, Emergency Stop, Maintenance */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Tank Levels (3 Cols) */}
            <div className="md:col-span-3 glass-panel p-3 border border-cyan-500/20 bg-[#080d1a] space-y-2">
              <span className="text-[10px] font-black text-slate-300 uppercase">TANK LEVELS</span>
              <div className="grid grid-cols-5 gap-1.5 h-28 bg-slate-950 p-2 rounded-xl border border-slate-800 items-end">
                {tanks.map((t) => (
                  <div key={t.id} className="flex flex-col items-center justify-end h-full">
                    <span className="text-[8px] font-bold text-slate-400 mb-1">{t.name}</span>
                    <div className="w-full flex-1 bg-slate-900 border border-slate-800 rounded-md overflow-hidden relative shadow-inner flex flex-col justify-end">
                      <div style={{ height: `${t.pct}%`, backgroundColor: t.color }} className="w-full" />
                      <span className="absolute inset-0 flex items-center justify-center font-mono font-black text-[8px] text-white drop-shadow">
                        {t.pct}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pump Runtime Today (3 Cols) */}
            <div className="md:col-span-3 glass-panel p-3 border border-cyan-500/20 bg-[#080d1a] space-y-2">
              <span className="text-[10px] font-black text-slate-300 uppercase">PUMP RUNTIME (Today)</span>
              <div className="space-y-1.5 text-[10px] font-mono">
                {pumpRuntimes.map((p) => (
                  <div key={p.id} className="flex justify-between items-center bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
                    <span className="text-slate-300 font-bold">{p.name}</span>
                    <span className="text-[#00f0ff] font-bold">{p.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders (3 Cols) */}
            <div className="md:col-span-3 glass-panel p-3 border border-cyan-500/20 bg-[#080d1a] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-300 uppercase">RECENT ORDERS</span>
                <span className="text-[9px] font-bold text-[#00f0ff] cursor-pointer">View All</span>
              </div>
              <div className="space-y-1 text-[10px] font-mono">
                {recentOrders.map((ord) => (
                  <div key={ord.id} className="flex justify-between items-center bg-slate-950/80 p-1.5 rounded-lg border border-slate-800 text-slate-300">
                    <span className="text-[#00f0ff] font-bold">{ord.id}</span>
                    <span className="font-sans font-bold">{ord.drink}</span>
                    <span className="text-[#00ff88] text-[9px]">Completed</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Stop & Maintenance (3 Cols) */}
            <div className="md:col-span-3 space-y-3">
              
              {/* Emergency Stop Button */}
              <div className="glass-panel p-3 border border-rose-500/30 bg-[#16060a] text-center space-y-2">
                <span className="text-[9px] font-black text-rose-400 uppercase tracking-wider block">
                  EMERGENCY STOP
                </span>
                
                <button
                  onClick={emergencyStop}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-red-700 text-white font-black text-xs mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(255,42,95,0.7)] hover:scale-105 active:scale-95 transition-transform"
                >
                  STOP
                </button>
                <span className="text-[8px] text-rose-300 font-bold block">Press in case of emergency</span>
              </div>

              {/* Maintenance Card */}
              <div className="glass-panel p-3 border border-cyan-500/20 bg-[#080d1a] space-y-1">
                <span className="text-[9px] font-black text-slate-300 uppercase block">MAINTENANCE</span>
                <div className="flex items-center gap-2 text-xs">
                  <Wrench size={14} className="text-[#00ff88]" />
                  <div>
                    <span className="text-[10px] font-bold text-white block">All Systems Good</span>
                    <span className="text-[8px] text-slate-400 block font-mono">Last Check: 2h ago</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
