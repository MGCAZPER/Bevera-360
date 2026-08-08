import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { GlassWater, Zap, ShieldCheck, Cpu, Play, CheckCircle2, Circle } from 'lucide-react';

export const RoboHero = ({ onOrderNowClick, onHowItWorksClick }) => {
  const { 
    currentDrinkName, 
    currentOrderId, 
    currentOrderTime, 
    currentTimelineStep, 
    machineState,
    dispenseProgress,
    cupPresent 
  } = useBartender();

  const timelineSteps = [
    { label: 'Order Received', icon: CheckCircle2 },
    { label: 'Preparing', icon: GlassWater },
    { label: 'Mixing', icon: GlassWater },
    { label: 'Dispensing', icon: GlassWater },
    { label: 'Ready', icon: GlassWater }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* 1. Left Hero Banner Card (5 Cols) */}
      <div className="lg:col-span-4 theme-card p-8 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-[#151c2a] to-[#0f1420]">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white uppercase leading-none">
              THE FUTURE OF <br />
              <span className="text-gradient-green text-4xl lg:text-5xl font-black">MIXOLOGY</span>
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed pt-2">
              Our robotic bartender crafts your favorite drinks with precision and perfection.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button onClick={onOrderNowClick} className="btn-green">
              <GlassWater size={16} />
              <span>ORDER NOW</span>
            </button>
            <button onClick={onHowItWorksClick} className="btn-dark text-xs flex items-center gap-2">
              <Play size={14} className="text-[#65c466]" />
              <span>HOW IT WORKS</span>
            </button>
          </div>

          {/* Features Row */}
          <div className="grid grid-cols-3 gap-2 pt-6 border-t border-slate-800/80">
            <div className="space-y-1">
              <Cpu size={18} className="text-[#65c466]" />
              <h4 className="text-[11px] font-bold text-white">Smart</h4>
              <p className="text-[10px] text-slate-400">AI Powered Precision</p>
            </div>

            <div className="space-y-1">
              <ShieldCheck size={18} className="text-[#65c466]" />
              <h4 className="text-[11px] font-bold text-white">Hygienic</h4>
              <p className="text-[10px] text-slate-400">Touchless & Safe</p>
            </div>

            <div className="space-y-1">
              <Zap size={18} className="text-[#65c466]" />
              <h4 className="text-[11px] font-bold text-white">Fast</h4>
              <p className="text-[10px] text-slate-400">Made in Seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Center 3D Machine Render Card (4 Cols) */}
      <div className="lg:col-span-4 theme-card p-6 flex flex-col items-center justify-center relative overflow-hidden bg-[#0d121c] border border-slate-800">
        <div className="relative w-full h-72 flex items-center justify-center">
          <img
            src="/images/robo_machine.png"
            alt="Robo Bartender Machine"
            className="h-full object-contain filter drop-shadow-[0_10px_25px_rgba(101,196,102,0.2)]"
          />
          {/* Subtle Ambient LED Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#65c466]/10 to-transparent pointer-events-none rounded-2xl" />
        </div>
      </div>

      {/* 3. Right Machine Status Live Card (4 Cols) */}
      <div className="lg:col-span-4 theme-card p-6 flex flex-col justify-between bg-[#151c2a] border border-slate-800 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-[#65c466]" />
            <h3 className="text-xs font-black tracking-wider text-white uppercase">MACHINE STATUS</h3>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#65c466]">
            <span className="w-2 h-2 rounded-full bg-[#65c466] animate-ping" /> LIVE
          </span>
        </div>

        {/* Center Radial Progress & Status */}
        <div className="flex flex-col items-center justify-center py-4 space-y-3">
          
          {/* Radial Circle */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#65c466] transition-all duration-500"
                strokeDasharray={`${dispenseProgress || 40}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-slate-900 border border-[#65c466]/40 flex items-center justify-center text-[#65c466] shadow-lg shadow-[#65c466]/20">
                <GlassWater size={24} className={machineState !== 'IDLE' ? 'animate-bounce' : ''} />
              </div>
            </div>
          </div>

          <div className="text-center space-y-0.5">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wide">
              {machineState === 'IDLE' ? 'MACHINE READY' : 'PREPARING YOUR DRINK'}
            </h4>
            <p className="text-[11px] text-slate-400">
              {machineState === 'IDLE' ? 'Select a drink from menu to begin' : 'Please wait while we mix your drink'}
            </p>
          </div>
        </div>

        {/* Stepper Timeline Horizontal Bar */}
        <div className="py-2 border-t border-b border-slate-800/80">
          <div className="flex items-center justify-between relative px-2">
            {timelineSteps.map((step, idx) => {
              const isCompleted = idx < currentTimelineStep;
              const isActive = idx === currentTimelineStep;

              return (
                <div key={idx} className="flex flex-col items-center space-y-1 relative z-10">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] transition-all ${
                      isCompleted || isActive
                        ? 'bg-[#65c466] text-slate-950 font-black shadow-md shadow-[#65c466]/30'
                        : 'bg-slate-900 text-slate-600 border border-slate-800'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={14} /> : <GlassWater size={12} />}
                  </div>
                  <span className={`text-[9px] font-bold ${isActive ? 'text-[#65c466]' : 'text-slate-500'}`}>
                    {step.label.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Details Table Box */}
        <div className="mt-3 bg-[#0d121c] p-3 rounded-xl border border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">ORDER ID</span>
            <span className="font-mono font-bold text-white text-[11px]">{currentOrderId}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">DRINK</span>
            <span className="font-bold text-[#65c466] text-[11px] truncate block">{currentDrinkName}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">TIME</span>
            <span className="font-mono text-slate-300 text-[11px]">{currentOrderTime}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">STATUS</span>
            <span className="font-extrabold text-[#65c466] text-[11px]">
              {machineState === 'IDLE' ? 'Ready' : machineState}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
