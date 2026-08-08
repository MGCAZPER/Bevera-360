import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Bot, ShoppingBag, User, Sliders, Cpu, Activity } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { cart, hardwareMode, setHardwareMode, isConnected, machineState, cupPresent, setCupPresent } = useBartender();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#0a0d14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#65c466]/15 border border-[#65c466]/40 flex items-center justify-center text-[#65c466] shadow-lg shadow-[#65c466]/10">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider text-white uppercase flex items-center gap-1.5">
              ROBO <span className="text-[#65c466]">BARTENDER</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-semibold tracking-wide">Smart. Automatic. Delicious.</p>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="flex items-center gap-1 bg-[#101520] p-1.5 rounded-2xl border border-slate-800/80">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'home'
                ? 'text-[#65c466] bg-slate-800/80 border-b-2 border-[#65c466]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'menu'
                ? 'text-[#65c466] bg-slate-800/80 border-b-2 border-[#65c466]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Menu
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'text-[#65c466] bg-slate-800/80 border-b-2 border-[#65c466]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Order History
          </button>

          <button
            onClick={() => setActiveTab('howitworks')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'howitworks'
                ? 'text-[#65c466] bg-slate-800/80 border-b-2 border-[#65c466]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            How It Works
          </button>

          <button
            onClick={() => setActiveTab('calibration')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'calibration'
                ? 'text-[#65c466] bg-slate-800/80 border-b-2 border-[#65c466]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders size={14} />
            <span>Calibration</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'diagnostics'
                ? 'text-[#65c466] bg-slate-800/80 border-b-2 border-[#65c466]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu size={14} />
            <span>Hardware Bench</span>
          </button>
        </nav>

        {/* Right Actions: Cart & User Account */}
        <div className="flex items-center gap-3">
          
          {/* Quick IR Cup Toggle */}
          <button
            onClick={() => setCupPresent(!cupPresent)}
            title="Toggle IR Cup Proximity Interlock"
            className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold border transition-all ${
              cupPresent ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400' : 'bg-rose-950/60 border-rose-500/40 text-rose-400 animate-pulse'
            }`}
          >
            Cup: {cupPresent ? 'DETECTED ✓' : 'NO CUP ✗'}
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setActiveTab('home')}
            className="relative p-2.5 rounded-xl bg-[#151c2a] border border-slate-800 text-slate-300 hover:text-white hover:border-[#65c466]/50 transition-all"
          >
            <ShoppingBag size={18} />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#65c466] text-slate-950 text-[10px] font-black flex items-center justify-center shadow-md">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Guest User Dropdown Button */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#151c2a] border border-slate-800 text-slate-200 hover:border-slate-700 text-xs font-bold transition-all">
            <User size={16} className="text-[#65c466]" />
            <span>Guest ▾</span>
          </button>

        </div>

      </div>
    </header>
  );
};
