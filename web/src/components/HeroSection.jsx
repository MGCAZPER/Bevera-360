import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HeroSection = ({ onStartOrdering }) => {
  return (
    <div className="glass-panel p-8 lg:p-10 border border-cyan-500/20 bg-gradient-to-r from-[#070b16] via-[#091024] to-[#050813] shadow-2xl relative overflow-hidden">
      
      {/* Subtle Glow backdrop */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Heading & Subtitle & Button */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tight">
              Smart <br />
              <span className="text-gradient-cyan font-black">Robotic</span> <br />
              Bartender
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg font-medium leading-relaxed">
              Order premium beverages with a single tap.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onStartOrdering}
              className="btn-neon-cyan px-7 py-3.5 rounded-2xl text-sm font-black flex items-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] group transition-all"
            >
              <span>Start Ordering</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Robotic Bartender Machine Image */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center p-2">
            <img
              src="/images/robo_machine.png"
              alt="Robotic Bartender Machine"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,240,255,0.35)] transform hover:scale-105 transition-transform duration-500 relative z-10"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
