import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HeroSection = ({ onStartOrdering }) => {
  return (
    <div className="glass-panel p-6 lg:p-7 border border-cyan-500/20 bg-gradient-to-r from-[#070b16] via-[#091024] to-[#050813] shadow-2xl relative overflow-hidden">
      
      {/* Subtle Glow backdrop */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Column: Heading & Subtitle & Button */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight">
              Smart <span className="text-gradient-cyan font-black">Robotic</span> Bartender
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg font-medium leading-relaxed">
              Order premium beverages with a single tap. Precision 5-channel liquid dispensing, active IR cup safety interlock, and magnetic stirring for flawless cocktails.
            </p>
          </div>

          <div className="pt-1">
            <button
              onClick={onStartOrdering}
              className="btn-neon-cyan px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] group transition-all"
            >
              <span>Start Ordering</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Robotic Bartender Machine Image */}
        <div className="lg:col-span-4 relative flex items-center justify-center">
          <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center">
            <img
              src="/images/robo_machine.png"
              alt="Robotic Bartender Machine"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,240,255,0.35)] transform hover:scale-105 transition-transform duration-500 relative z-10"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
