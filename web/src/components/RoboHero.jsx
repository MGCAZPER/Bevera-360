import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { GlassWater, Zap, ShieldCheck, Cpu, Play, CheckCircle2, Activity, Wifi, Sparkles } from 'lucide-react';

export const RoboHero = ({ onOrderNowClick, onHowItWorksClick }) => {
  const { 
    currentDrinkName, 
    currentOrderId, 
    currentOrderTime, 
    currentTimelineStep, 
    machineState,
    dispenseProgress,
    cupPresent,
    hardwareMode,
    activePump
  } = useBartender();

  const timelineSteps = [
    { label: 'Received' },
    { label: 'Preparing' },
    { label: 'Mixing' },
    { label: 'Dispensing' },
    { label: 'Ready' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* 1. Left Hero Banner Card (5 Cols) */}
      <div className="lg:col-span-5 glass-panel p-8 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#131a29] via-[#0e131f] to-[#080b12] border border-slate-800/90 shadow-2xl">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#65c466]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="space-y-6 relative z-10">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#65c466]/10 border border-[#65c466]/30 text-[#65c466] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="animate-spin text-[#65c466]" />
            <span>AI Robotic Mixology System</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-white uppercase leading-none">
              THE FUTURE OF <br />
              <span className="text-gradient-green font-black">AUTOMATED MIXOLOGY</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
              Bevera-360 combines high-precision 5-channel liquid relay pumps, magnetic stirrer motor, and ESP32 smart interlocks for perfect cocktails every time.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button onClick={onOrderNowClick} className="btn-green text-sm px-6 py-3 shadow-lg shadow-[#65c466]/25">
              <GlassWater size={18} />
              <span>ORDER DRINK NOW</span>
            </button>
            <button onClick={onHowItWorksClick} className="btn-dark text-xs sm:text-sm px-5 py-3 flex items-center gap-2">
              <Play size={15} className="text-[#65c466]" />
              <span>HOW IT WORKS</span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/90">
            <div className="space-y-1 bg-[#090d16]/60 p-3 rounded-xl border border-slate-800/60">
              <Cpu size={20} className="text-[#65c466]" />
              <h4 className="text-xs font-bold text-white">ESP32 Core</h4>
              <p className="text-[10px] text-slate-400">Microcontroller Logic</p>
            </div>

            <div className="space-y-1 bg-[#090d16]/60 p-3 rounded-xl border border-slate-800/60">
              <ShieldCheck size={20} className="text-[#65c466]" />
              <h4 className="text-xs font-bold text-white">IR Cup Interlock</h4>
              <p className="text-[10px] text-slate-400">Automatic Pause</p>
            </div>

            <div className="space-y-1 bg-[#090d16]/60 p-3 rounded-xl border border-slate-800/60">
              <Zap size={20} className="text-[#65c466]" />
              <h4 className="text-xs font-bold text-white">5-Relay Flow</h4>
              <p className="text-[10px] text-slate-400">EEPROM Calibrated</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Center 3D Machine Render Card (3 Cols) */}
      <div className="lg:col-span-3 glass-panel p-6 flex flex-col items-center justify-between relative overflow-hidden bg-[#0a0e17] border border-slate-800 shadow-2xl group">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between border-b border-slate-800/80 pb-3">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            MODEL: BEVERA-360
          </span>
          <span className="w-2 h-2 rounded-full bg-[#65c466] shadow-[0_0_8px_#65c466]" />
        </div>

        {/* Machine Image Display */}
        <div className="relative w-full h-64 flex items-center justify-center my-2">
          <img
            src="/images/robo_machine.png"
            alt="Robo Bartender Machine"
            className="h-full object-contain filter drop-shadow-[0_12px_28px_rgba(101,196,102,0.25)] group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#65c466]/10 to-transparent pointer-events-none rounded-2xl" />
        </div>

        {/* Footer Metrics */}
        <div className="w-full grid grid-cols-2 gap-2 pt-2 text-[10px] border-t border-slate-800/80">
          <div className="bg-[#121927] p-2 rounded-lg border border-slate-800">
            <span className="text-slate-500 font-bold block">DISPENSE RATE</span>
            <span className="text-[#65c466] font-mono font-bold">15.0 mL / SEC</span>
          </div>
          <div className="bg-[#121927] p-2 rounded-lg border border-slate-800">
            <span className="text-slate-500 font-bold block">PUMP CHANNELS</span>
            <span className="text-slate-200 font-mono font-bold">5 RELAYS</span>
          </div>
        </div>

      </div>

      {/* 3. Right Machine Status Live Card (4 Cols) */}
      <div className="lg:col-span-4 glass-panel p-6 flex flex-col justify-between bg-[#131a29] border border-slate-800 relative shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-[#65c466]" />
            <h3 className="text-xs font-black tracking-wider text-white uppercase">TELEMETRY & STATUS</h3>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#65c466] bg-[#65c466]/10 px-2.5 py-1 rounded-full border border-[#65c466]/30">
            <span className="w-2 h-2 rounded-full bg-[#65c466] animate-ping" /> LIVE TELEMETRY
          </span>
        </div>

        {/* Center Radial Progress & Status */}
        <div className="flex flex-col items-center justify-center py-3 space-y-3">
          
          {/* Radial Circle */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#65c466] transition-all duration-500"
                strokeDasharray={`${dispenseProgress || (machineState === 'IDLE' ? 100 : 40)}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-black font-mono text-[#65c466]">
                {machineState === 'IDLE' ? '100%' : `${dispenseProgress}%`}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                {machineState === 'IDLE' ? 'READY' : (activePump ? `PUMP ${activePump}` : machineState)}
              </span>
            </div>
          </div>

          <div className="text-center space-y-0.5">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wide">
              {machineState === 'IDLE' ? 'SYSTEM READY' : 'PREPARING DRINK'}
            </h4>
            <p className="text-[11px] text-slate-400">
              {machineState === 'IDLE' ? 'Select a drink from the menu below' : `Currently mixing: ${currentDrinkName}`}
            </p>
          </div>
        </div>

        {/* Stepper Timeline Horizontal Bar */}
        <div className="py-2.5 border-t border-b border-slate-800/80">
          <div className="flex items-center justify-between relative px-2">
            {timelineSteps.map((step, idx) => {
              const isCompleted = idx < currentTimelineStep;
              const isActive = idx === currentTimelineStep;

              return (
                <div key={idx} className="flex flex-col items-center space-y-1 relative z-10">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      isCompleted || isActive
                        ? 'bg-[#65c466] text-slate-950 shadow-md shadow-[#65c466]/40'
                        : 'bg-slate-900 text-slate-600 border border-slate-800'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={13} /> : idx + 1}
                  </div>
                  <span className={`text-[9px] font-bold ${isActive ? 'text-[#65c466]' : 'text-slate-500'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Details Box */}
        <div className="mt-3 bg-[#090d16] p-3 rounded-xl border border-slate-800/90 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[9px] text-slate-500 uppercase font-bold block">ACTIVE ORDER</span>
            <span className="font-mono font-bold text-white text-[11px]">{currentOrderId}</span>
          </div>

          <div>
            <span className="text-[9px] text-slate-500 uppercase font-bold block">SELECTED DRINK</span>
            <span className="font-bold text-[#65c466] text-[11px] truncate block">{currentDrinkName}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
