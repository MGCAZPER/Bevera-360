import React, { useState } from 'react';
import { useBartender } from '../context/BartenderContext';
import {
  LayoutDashboard, ShoppingBag, GlassWater, BarChart2, Activity, Wrench, Settings,
  TrendingUp, DollarSign, Thermometer, Droplet, OctagonX, Bot, FlaskConical, Layers
} from 'lucide-react';
import { DrinkCustomizerModal } from './DrinkCustomizerModal';
import { BartenderQueue } from './BartenderQueue';

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

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCustomizerModal, setShowCustomizerModal] = useState(false);

  const sidebarNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'queue',     label: 'Orders',    icon: ShoppingBag },
    { id: 'custom',    label: 'Custom Mix',icon: FlaskConical },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'status',    label: 'Machine',    icon: Activity },
    { id: 'maintain',  label: 'Maintenance',icon: Wrench },
    { id: 'settings',  label: 'Settings',   icon: Settings }
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-8 relative">

      {/* Custom Mixology Modal */}
      {showCustomizerModal && (
        <DrinkCustomizerModal onClose={() => setShowCustomizerModal(false)} />
      )}

      <div className="flex items-center gap-2">
        <span className="badge-black">04 / SYSTEM ADMIN</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* ========== Left Sidebar (2 Cols) ========== */}
        <div className="lg:col-span-2 modern-card p-4 space-y-4 bg-white border border-black/10">
          <div className="flex items-center gap-2 border-b border-black/10 pb-3">
            <div className="w-7 h-7 rounded-lg bg-black text-[#f5c400] flex items-center justify-center">
              <Bot size={16} />
            </div>
            <span className="text-[10px] font-black text-[#111] uppercase tracking-wider">BEVERA 360</span>
          </div>

          <nav className="space-y-1">
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-black text-[#f5c400] shadow-sm'
                      : 'text-[#77756e] hover:text-[#111] hover:bg-black/5'
                  }`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Custom Mix Button */}
          <div className="pt-2 border-t border-black/10">
            <button
              onClick={() => setShowCustomizerModal(true)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-[#f5c400] text-black border border-[#f5c400] hover:bg-black hover:text-[#f5c400] transition-all"
            >
              <FlaskConical size={14} />
              <span>Open Mix Lab</span>
            </button>
          </div>
        </div>

        {/* ========== Right Dashboard Area (10 Cols) ========== */}
        <div className="lg:col-span-10 space-y-4">

          {/* ---------- Dashboard Tab ---------- */}
          {activeTab === 'dashboard' && (
            <>
              {/* Top Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="modern-card p-3 bg-white space-y-1">
                  <span className="text-[9px] font-bold text-[#77756e] uppercase">TOTAL ORDERS</span>
                  <p className="text-xl font-black text-[#111] font-mono">{totalOrdersToday}</p>
                  <span className="text-[9px] font-bold text-[#159447]">+12% today</span>
                </div>
                <div className="modern-card p-3 bg-white space-y-1">
                  <span className="text-[9px] font-bold text-[#77756e] uppercase">DRINKS SOLD</span>
                  <p className="text-xl font-black text-[#111] font-mono">{drinksSoldToday}</p>
                  <span className="text-[9px] font-bold text-[#159447]">+18% today</span>
                </div>
                <div className="modern-card p-3 bg-white space-y-1">
                  <span className="text-[9px] font-bold text-[#77756e] uppercase">MACHINE TEMP.</span>
                  <p className="text-xl font-black text-[#111] font-mono">{machineTemp}°C</p>
                  <span className="text-[9px] font-bold text-[#159447]">Normal</span>
                </div>
                <div className="modern-card p-3 bg-white space-y-1">
                  <span className="text-[9px] font-bold text-[#77756e] uppercase">WATER LEVEL</span>
                  <p className="text-xl font-black text-[#111] font-mono">{waterLevel}%</p>
                  <span className="text-[9px] font-bold text-[#159447]">Good</span>
                </div>
                <div className="modern-card p-3 bg-white space-y-1">
                  <span className="text-[9px] font-bold text-[#77756e] uppercase">TOTAL REVENUE</span>
                  <p className="text-sm font-black text-[#111] font-mono">LKR {totalRevenueLkr.toLocaleString()}</p>
                  <span className="text-[9px] font-bold text-[#159447]">+15% vs target</span>
                </div>
              </div>

              {/* Lower Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

                {/* Tank Levels */}
                <div className="md:col-span-3 modern-card p-3 bg-white space-y-2">
                  <span className="text-[9px] font-black text-[#77756e] uppercase">TANK LEVELS</span>
                  <div className="grid grid-cols-5 gap-1.5 h-28 bg-[#f4f1e8] p-2 rounded-xl border border-black/8 items-end">
                    {tanks.map((t) => (
                      <div key={t.id} className="flex flex-col items-center justify-end h-full">
                        <span className="text-[8px] font-bold text-[#77756e] mb-1">{t.name}</span>
                        <div className="w-full flex-1 bg-white border border-black/10 rounded-md overflow-hidden relative shadow-inner flex flex-col justify-end">
                          <div style={{ height: `${t.pct}%`, backgroundColor: t.color }} className="w-full opacity-80" />
                          <span className="absolute inset-0 flex items-center justify-center font-mono font-black text-[8px] text-[#111] drop-shadow">
                            {t.pct}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pump Runtime */}
                <div className="md:col-span-3 modern-card p-3 bg-white space-y-2">
                  <span className="text-[9px] font-black text-[#77756e] uppercase">PUMP RUNTIME (TODAY)</span>
                  <div className="space-y-1.5 text-[10px] font-mono">
                    {pumpRuntimes.map((p) => (
                      <div key={p.id} className="flex justify-between items-center bg-[#f4f1e8] p-1.5 rounded-lg border border-black/8">
                        <span className="text-[#111] font-bold">{p.name}</span>
                        <span className="text-[#f5c400] font-black">{p.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="md:col-span-3 modern-card p-3 bg-white space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-[#77756e] uppercase">RECENT ORDERS</span>
                    <button
                      onClick={() => setActiveTab('queue')}
                      className="text-[9px] font-bold text-[#111] underline hover:text-[#f5c400]"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-1 text-[10px] font-mono">
                    {recentOrders.slice(0, 5).map((ord, i) => (
                      <div key={ord.id + i} className="flex justify-between items-center bg-[#f4f1e8] p-1.5 rounded-lg border border-black/8 text-[#111]">
                        <span className="font-bold text-[#f5c400]">{ord.id}</span>
                        <span className="font-sans font-bold">{ord.drink}</span>
                        <span className="text-[#159447] text-[9px] font-bold">Done</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Stop & Maintenance */}
                <div className="md:col-span-3 space-y-3">
                  <div className="red-card p-3 text-center space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-wider block text-white/80">
                      EMERGENCY STOP
                    </span>
                    <button
                      onClick={emergencyStop}
                      className="w-14 h-14 rounded-full bg-black text-[#e6392f] font-black text-xs mx-auto flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                    >
                      STOP
                    </button>
                    <span className="text-[8px] text-white/70 font-bold block">Press in case of emergency</span>
                  </div>

                  <div className="modern-card p-3 bg-white space-y-1">
                    <span className="text-[9px] font-black text-[#77756e] uppercase block">MAINTENANCE</span>
                    <div className="flex items-center gap-2 text-xs">
                      <Wrench size={14} className="text-[#159447]" />
                      <div>
                        <span className="text-[10px] font-bold text-[#111] block">All Systems Good</span>
                        <span className="text-[8px] text-[#77756e] block font-mono">Last Check: 2h ago</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}

          {/* ---------- Orders Queue Tab ---------- */}
          {activeTab === 'queue' && <BartenderQueue />}

          {/* ---------- Custom Mix Tab ---------- */}
          {activeTab === 'custom' && (
            <DrinkCustomizerModal inline={true} />
          )}

          {/* ---------- Other placeholder tabs ---------- */}
          {['analytics', 'status', 'maintain', 'settings'].includes(activeTab) && (
            <div className="modern-card p-10 text-center text-[#77756e] bg-white">
              <div className="text-4xl mb-3">⚙️</div>
              <p className="font-bold text-[#111] text-sm capitalize">{activeTab} module active</p>
              <p className="text-xs mt-1">Switch to <strong>Dashboard</strong> or <strong>Orders</strong> tab to view live system controls.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
