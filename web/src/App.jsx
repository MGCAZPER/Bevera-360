import React, { useRef } from 'react';
import { BartenderProvider, useBartender } from './context/BartenderContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DrinkSelectionGrid } from './components/DrinkSelectionGrid';
import { CustomizationPanel } from './components/CustomizationPanel';
import { OrderSummaryCard } from './components/OrderSummaryCard';
import { MachineStatusPanel } from './components/MachineStatusPanel';
import { PreparationScreen } from './components/PreparationScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { SystemCalibration } from './components/SystemCalibration';
import { ManualDiagnostics } from './components/ManualDiagnostics';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FigmaBoard } from './components/FigmaBoard';
import { ShieldCheck, Cpu, Zap, Sparkles, Bot } from 'lucide-react';

function AppContent() {
  const { activeScreen } = useBartender();
  const menuRef = useRef(null);

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#04060d] text-slate-100 font-sans selection:bg-[#00f0ff] selection:text-slate-950">
      
      {/* Header Bar */}
      <Header />

      {/* Main Container Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {activeScreen === 'figma_board' ? (
          <FigmaBoard />
        ) : activeScreen === 'admin' ? (
          <AdminDashboard />
        ) : activeScreen === 'calibration' ? (
          <SystemCalibration />
        ) : activeScreen === 'diagnostics' ? (
          <ManualDiagnostics />
        ) : activeScreen === 'preparation' ? (
          <PreparationScreen />
        ) : activeScreen === 'completion' ? (
          <CompletionScreen />
        ) : (
          <>
            {/* 01. HOME / ORDER SCREEN */}
            <HeroSection onStartOrdering={scrollToMenu} />

            <div ref={menuRef} id="drink-selection-section">
              <DrinkSelectionGrid />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              <div className="lg:col-span-7">
                <CustomizationPanel />
              </div>
              <div className="lg:col-span-5">
                <OrderSummaryCard />
              </div>
            </div>

            <MachineStatusPanel />
          </>
        )}
      </main>

      {/* Mobile Sticky Bottom Nav Bar */}
      <MobileBottomNav />

      {/* Futuristic SaaS Footer */}
      <footer className="border-t border-cyan-500/15 bg-[#04060d] py-6 px-4 text-xs text-slate-400 mt-12 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot size={18} className="text-[#00f0ff]" />
            <span className="font-black text-white">ROBOTIC <span className="text-gradient-cyan">BARTENDER</span></span>
            <span className="text-[10px] text-slate-500 font-mono">v2.0 ESP32 PRO</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#00ff88]" /> 100% Hygienic Dispense</span>
            <span className="flex items-center gap-1.5"><Cpu size={14} className="text-[#00f0ff]" /> ESP32 Realtime Telemetry</span>
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-[#00f0ff]" /> Milliliter Accurate Flow</span>
            <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-purple-400" /> Magnetic Stirring</span>
          </div>

          <p className="text-[10px] text-slate-500 font-mono">
            &copy; 2026 Smart Robotic Bartender Systems. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <BartenderProvider>
      <AppContent />
    </BartenderProvider>
  );
}
