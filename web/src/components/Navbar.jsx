import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Bot, ShoppingBag, User, Sliders, Cpu, Activity, Wifi, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { 
    cart, 
    hardwareMode, 
    setHardwareMode, 
    isConnected, 
    cupPresent, 
    setCupPresent 
  } = useBartender();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'customizer', label: 'Mixology Lab', icon: Sparkles },
    { id: 'history', label: 'Order History' },
    { id: 'howitworks', label: 'How It Works' },
    { id: 'calibration', label: 'Calibration', icon: Sliders },
    { id: 'diagnostics', label: 'Hardware Bench', icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/85 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#65c466]/20 to-[#65c466]/5 border border-[#65c466]/40 flex items-center justify-center text-[#65c466] shadow-lg shadow-[#65c466]/15">
            <Bot size={22} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-wider text-white uppercase">
                ROBO <span className="text-[#65c466]">BARTENDER</span>
              </h1>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#65c466]/15 text-[#65c466] border border-[#65c466]/30 uppercase tracking-widest">
                v2.0 PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-semibold tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65c466]" />
              Smart Precision Mixology Platform
            </p>
          </div>
        </div>

        {/* Center Navigation Bar */}
        <nav className="flex flex-wrap items-center justify-center gap-1 bg-[#0e131f]/90 p-1.5 rounded-2xl border border-slate-800/90 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                  isActive
                    ? 'text-[#65c466] bg-[#172033] shadow-md border border-[#65c466]/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                }`}
              >
                {Icon && <Icon size={14} className={isActive ? 'text-[#65c466]' : 'text-slate-400'} />}
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 inset-x-3 h-0.5 rounded-full bg-[#65c466] shadow-[0_0_8px_#65c466]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Hardware Status & Cart */}
        <div className="flex items-center gap-2.5">
          
          {/* Mode Switcher Pill */}
          <button
            onClick={() => setHardwareMode(hardwareMode === 'SIMULATION_DEMO' ? 'LIVE_ESP32' : 'SIMULATION_DEMO')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
              hardwareMode === 'LIVE_ESP32'
                ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-500/20'
                : 'bg-amber-950/70 border-amber-500/50 text-amber-300'
            }`}
            title="Toggle between Simulation and ESP32 Hardware mode"
          >
            <Wifi size={12} className={hardwareMode === 'LIVE_ESP32' ? 'animate-pulse text-cyan-400' : ''} />
            <span>{hardwareMode === 'LIVE_ESP32' ? 'ESP32 LIVE' : 'DEMO MODE'}</span>
          </button>

          {/* Quick IR Cup Toggle */}
          <button
            onClick={() => setCupPresent(!cupPresent)}
            title="Toggle IR Cup Proximity Sensor Interlock"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-extrabold border transition-all ${
              cupPresent 
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400' 
                : 'bg-rose-950/80 border-rose-500/60 text-rose-300 animate-pulse'
            }`}
          >
            {cupPresent ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
            <span>Cup: {cupPresent ? 'DETECTED ✓' : 'NO CUP ✗'}</span>
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={() => setActiveTab('home')}
            className="relative p-2.5 rounded-xl bg-[#131a29] border border-slate-800 text-slate-300 hover:text-white hover:border-[#65c466]/50 transition-all shadow-md"
            title="View Cart"
          >
            <ShoppingBag size={18} />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#65c466] to-[#4cd964] text-slate-950 text-[10px] font-black flex items-center justify-center shadow-lg shadow-[#65c466]/40">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#131a29] border border-slate-800 text-slate-200 hover:border-slate-700 text-xs font-bold transition-all shadow-md">
            <User size={15} className="text-[#65c466]" />
            <span className="hidden sm:inline">Guest ▾</span>
          </button>

        </div>

      </div>
    </header>
  );
};
