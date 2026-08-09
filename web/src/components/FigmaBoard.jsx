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

export const FigmaBoard = () => {
  const { setActiveScreen } = useBartender();

  return (
    <div className="space-y-10 pb-20 animate-fade-in bg-[#f4f1e8] p-4 lg:p-6 rounded-3xl border border-black/10 shadow-sm">
      
      {/* Top Figma Canvas Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-4">
        <div>
          <span className="badge-black">
            BEVERA-360 • HIGH FIDELITY UI/UX SPECIFICATION
          </span>
          <h1 className="text-xl font-black text-[#111] uppercase tracking-wider mt-2">
            Smart Robotic Bartender Presentation Canvas
          </h1>
        </div>

        <button
          onClick={() => setActiveScreen('main')}
          className="btn-modern-yellow text-xs font-black px-5 py-2.5 rounded-full shadow-md"
        >
          Launch Interactive Mode
        </button>
      </div>

      {/* SECTION 01: HOME / ORDER SCREEN */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#111] uppercase tracking-wider font-mono">
            01. HOME / ORDER SCREEN
          </span>
        </div>

        <div className="modern-card p-4 bg-white space-y-4">
          <HeroSection onStartOrdering={() => {}} />

          <DrinkSelectionGrid />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-7">
              <CustomizationPanel />
            </div>
            <div className="lg:col-span-5">
              <OrderSummaryCard />
            </div>
          </div>

          <MachineStatusPanel />
        </div>
      </div>

      {/* SECTION 02: PREPARATION PROCESS SCREEN */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#111] uppercase tracking-wider font-mono">
            02. PREPARATION PROCESS SCREEN
          </span>
        </div>

        <div className="modern-card p-4 bg-white">
          <PreparationScreen />
        </div>
      </div>

      {/* SECTION 03: DRINK READY SCREEN */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#111] uppercase tracking-wider font-mono">
            03. DRINK READY SCREEN
          </span>
        </div>

        <div className="modern-card p-4 bg-white">
          <CompletionScreen />
        </div>
      </div>

      {/* SECTION 04: SYSTEM ADMIN DASHBOARD */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#111] uppercase tracking-wider font-mono">
            04. SYSTEM ADMIN DASHBOARD
          </span>
        </div>

        <div className="modern-card p-4 bg-white">
          <AdminDashboard />
        </div>
      </div>

    </div>
  );
};
