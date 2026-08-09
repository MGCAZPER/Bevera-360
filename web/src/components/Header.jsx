import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Bot, Wifi, Bell, User, ChevronDown, Presentation, Sliders, Cpu } from 'lucide-react';

export const Header = () => {
  const { activeScreen, setActiveScreen, esp32Connected, hardwareMode, setHardwareMode } = useBartender();

  return (
    <header className="sticky top-0 z-50 bg-[#050914]/90 backdrop-blur-2xl border-b border-cyan-500/15 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveScreen('main')}>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <Bot size={22} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-wider text-white uppercase flex items-center gap-2">
              ROBOTIC <span className="text-gradient-cyan">BARTENDER</span>
            </h1>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="flex flex-wrap items-center justify-center gap-1 bg-[#091122]/90 p-1 rounded-2xl border border-cyan-500/20">
          <button
            onClick={() => setActiveScreen('main')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeScreen === 'main' || activeScreen === 'preparation' || activeScreen === 'completion'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-[#00f0ff] border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveScreen('main')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
          >
            Drinks
          </button>
          <button
            onClick={() => setActiveScreen('main')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
          >
            Orders
          </button>
          <button
            onClick={() => setActiveScreen('admin')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeScreen === 'admin'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-[#00f0ff] border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Status
          </button>
          <button
            onClick={() => setActiveScreen('calibration')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              activeScreen === 'calibration'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders size={13} className="text-cyan-400" />
            <span>Calibration</span>
          </button>
          <button
            onClick={() => setActiveScreen('diagnostics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              activeScreen === 'diagnostics'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu size={13} className="text-cyan-400" />
            <span>Hardware Bench</span>
          </button>
          <button
            onClick={() => setActiveScreen('figma_board')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              activeScreen === 'figma_board'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Presentation size={13} className="text-purple-400" />
            <span>Figma Canvas</span>
          </button>
        </nav>

        {/* Right Status Pill & Admin Profile */}
        <div className="flex items-center gap-3">
          
          {/* Mode Switcher Pill */}
          <button
            onClick={() => setHardwareMode(hardwareMode === 'LIVE_ESP32' ? 'SIMULATION_DEMO' : 'LIVE_ESP32')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${
              hardwareMode === 'LIVE_ESP32'
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'bg-amber-950 border-amber-500 text-amber-300'
            }`}
            title="Click to toggle ESP32 Hardware or Simulation Mode"
          >
            {hardwareMode === 'LIVE_ESP32' ? 'ESP32 LIVE' : 'DEMO MODE'}
          </button>

          {/* Machine Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 shadow-[0_0_10px_rgba(0,255,136,0.2)]">
            <span className={`w-2 h-2 rounded-full ${esp32Connected ? 'bg-[#00ff88] animate-ping' : 'bg-amber-400'}`} />
            <span className="text-[10px] font-black text-[#00ff88] tracking-wider uppercase">
              {esp32Connected ? 'ONLINE' : 'CONNECTING'}
            </span>
          </div>

          {/* Wi-Fi Icon */}
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[#00ff88]">
            <Wifi size={16} />
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-[10px]">
              <User size={14} />
            </div>
            <span>Admin</span>
            <ChevronDown size={12} className="text-slate-400" />
          </div>

        </div>

      </div>
    </header>
  );
};
