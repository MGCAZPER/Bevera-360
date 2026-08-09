import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { HeroSection } from './HeroSection';
import { DrinkSelectionGrid } from './DrinkSelectionGrid';
import { CustomizationPanel } from './CustomizationPanel';
import { OrderSummaryCard } from './OrderSummaryCard';
import { MachineStatusPanel } from './MachineStatusPanel';
import { PreparationScreen } from './PreparationScreen';
import { CompletionScreen } from './CompletionScreen';
import { AdminDashboard } from './AdminDashboard';
import { MobileBottomNav } from './MobileBottomNav';
import { Sparkles, Layers, Monitor, Smartphone, CheckCircle2 } from 'lucide-react';

export const PresentationBoard = () => {
  const { setActiveScreen } = useBartender();

  return (
    <div className="space-y-12 pb-24 animate-fade-in">
      
      {/* Board Title Header */}
      <div className="text-center space-y-3 glass-panel p-8 border-purple-500/30 bg-gradient-to-r from-[#0c0d24] via-[#081226] to-[#0d0924]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <Sparkles size={16} /> FIGMA PRESENTATION BOARD • 4K HIGH FIDELITY UI MOCKUP
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Smart Robotic Bartender <span className="text-gradient-cyan">UI/UX Concept</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Apple Vision Pro inspired glassmorphism aesthetic, Tesla dashboard telemetry, neon blue & cyan gradient palette, displaying all application screens side-by-side.
        </p>

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => setActiveScreen('main')}
            className="btn-neon-cyan text-xs font-black py-2 px-4 rounded-xl"
          >
            Switch to Interactive App Mode
          </button>
        </div>
      </div>

      {/* Screen 1: Desktop Main Hero & Dashboard */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[#00f0ff] font-mono font-bold text-xs">
            01
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase">Desktop Hero & Operational Overview</h3>
            <p className="text-xs text-slate-400">Primary landing view with robotic machine illustration and live telemetry</p>
          </div>
        </div>

        <div className="glass-panel p-4 border-cyan-500/30 bg-[#050914] shadow-2xl space-y-6">
          <HeroSection onStartOrdering={() => {}} />
          <MachineStatusPanel />
        </div>
      </div>

      {/* Screen 2: Drink Selection, Customization & Order Summary */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[#00f0ff] font-mono font-bold text-xs">
            02
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase">Drink Selection & Customization Suite</h3>
            <p className="text-xs text-slate-400">5 Premium drink cards, sliders for ice & sweetness, cup size selector and summary card</p>
          </div>
        </div>

        <div className="glass-panel p-6 border-cyan-500/30 bg-[#050914] shadow-2xl space-y-6">
          <DrinkSelectionGrid />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <CustomizationPanel />
            </div>
            <div className="lg:col-span-5">
              <OrderSummaryCard />
            </div>
          </div>
        </div>
      </div>

      {/* Screen 3 & Screen 4: Live Preparation Timeline & Completion Success */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Screen 3: Preparation Screen */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[#00f0ff] font-mono font-bold text-xs">
              03
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase">Preparation Timeline View</h3>
              <p className="text-xs text-slate-400">Animated circular progress & 6 step timeline</p>
            </div>
          </div>

          <div className="glass-panel p-2 border-cyan-500/30 bg-[#050914] shadow-2xl">
            <PreparationScreen />
          </div>
        </div>

        {/* Screen 4: Completion Screen */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[#00f0ff] font-mono font-bold text-xs">
              04
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase">Completion Success View</h3>
              <p className="text-xs text-slate-400">Glowing checkmark success message screen</p>
            </div>
          </div>

          <div className="glass-panel p-2 border-cyan-500/30 bg-[#050914] shadow-2xl">
            <CompletionScreen />
          </div>
        </div>

      </div>

      {/* Screen 5: Admin Suite Dashboard */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[#00f0ff] font-mono font-bold text-xs">
            05
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase">Admin Suite Telemetry Dashboard</h3>
            <p className="text-xs text-slate-400">Dark futuristic SaaS dashboard with tank gauges, pump runtimes, and emergency controls</p>
          </div>
        </div>

        <div className="glass-panel p-6 border-cyan-500/30 bg-[#050914] shadow-2xl">
          <AdminDashboard />
        </div>
      </div>

      {/* Screen 6: Mobile Interface Showcase */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[#00f0ff] font-mono font-bold text-xs">
            06
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase">Mobile Interface & Bottom Navigation</h3>
            <p className="text-xs text-slate-400">Responsive mobile viewport layout with sticky bottom glass navigation bar</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-sm rounded-[40px] border-4 border-slate-800 bg-[#050811] overflow-hidden shadow-2xl relative p-4 space-y-4">
            <div className="w-32 h-5 bg-slate-900 mx-auto rounded-full mb-2" />
            <HeroSection onStartOrdering={() => {}} />
            <DrinkSelectionGrid />
            <MobileBottomNav />
          </div>
        </div>
      </div>

    </div>
  );
};
