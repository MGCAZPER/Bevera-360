import React, { useRef } from "react";
import { BartenderProvider, useBartender } from "./context/BartenderContext";

import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { DrinkSelectionGrid } from "./components/DrinkSelectionGrid";
import { CustomizationPanel } from "./components/CustomizationPanel";
import { OrderSummaryCard } from "./components/OrderSummaryCard";
import { MachineStatusPanel } from "./components/MachineStatusPanel";

import { PreparationScreen } from "./components/PreparationScreen";
import { CompletionScreen } from "./components/CompletionScreen";

import { AdminDashboard } from "./components/AdminDashboard";
import { SystemCalibration } from "./components/SystemCalibration";
import { ManualDiagnostics } from "./components/ManualDiagnostics";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { FigmaBoard } from "./components/FigmaBoard";

import {
  ArrowUpRight,
  Bot,
  Cpu,
  Gauge,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

function AppContent() {
  const { activeScreen, drinks } = useBartender();
  const menuRef = useRef(null);

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const renderScreen = () => {
    if (activeScreen === "figma_board") {
      return <FigmaBoard />;
    }

    if (activeScreen === "admin") {
      return <AdminDashboard />;
    }

    if (activeScreen === "calibration") {
      return <SystemCalibration />;
    }

    if (activeScreen === "diagnostics") {
      return <ManualDiagnostics />;
    }

    if (activeScreen === "preparation") {
      return <PreparationScreen />;
    }

    if (activeScreen === "completion") {
      return <CompletionScreen />;
    }

    return (
        <>
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[32px] border border-black/10 bg-[#f7f6f2] shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            {/* Decorative background */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ffd400]/30 blur-3xl" />

            <div className="absolute bottom-0 right-1/3 h-56 w-56 rounded-full bg-[#ff3b30]/10 blur-3xl" />

            <div className="absolute left-0 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-black/5 blur-3xl" />

            <div className="relative z-10">
              <HeroSection onStartOrdering={scrollToMenu} />
            </div>
          </section>

          {/* TRUST / SYSTEM STRIP */}
          <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="group rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <Bot size={19} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                System
              </p>

              <p className="mt-1 text-sm font-black text-black">
                Robotic Control
              </p>
            </div>

            <div className="group rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffd400] text-black">
                <Gauge size={19} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Accuracy
              </p>

              <p className="mt-1 text-sm font-black text-black">
                ML Precision
              </p>
            </div>

            <div className="group rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3b30] text-white">
                <Zap size={19} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Response
              </p>

              <p className="mt-1 text-sm font-black text-black">
                Fast Dispensing
              </p>
            </div>

            <div className="group rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <ShieldCheck size={19} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Safety
              </p>

              <p className="mt-1 text-sm font-black text-black">
                Smart Interlock
              </p>
            </div>
          </section>

          {/* DRINK SELECTION */}
          <section
              ref={menuRef}
              id="drink-selection-section"
              className="scroll-mt-24"
          >
            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#ff3b30]" />

                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
                  Beverage Library
                </span>
                </div>

                <h2 className="text-3xl font-black tracking-tight text-black md:text-4xl">
                  Choose your{" "}
                  <span className="relative inline-block">
                  drink.
                  <span className="absolute -bottom-1 left-0 h-2 w-full -rotate-1 rounded-full bg-[#ffd400]" />
                </span>
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 shadow-sm">
                  {String(drinks.length).padStart(2, "0")} Available
                </div>

                <button
                    onClick={scrollToMenu}
                    className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-[#ff3b30]"
                >
                  Explore
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>

            <DrinkSelectionGrid />
          </section>

          {/* CUSTOMIZATION + ORDER */}
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="h-full rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_15px_50px_rgba(0,0,0,0.06)] md:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400">
                      Personalization
                    </p>

                    <h3 className="mt-1 text-xl font-black text-black">
                      Make it yours
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffd400] text-black">
                    <Sparkles size={18} />
                  </div>
                </div>

                <CustomizationPanel />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-full overflow-hidden rounded-[28px] border border-black bg-black p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-6">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#ffd400]/20 blur-3xl" />

                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#ff3b30]/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
                        Checkout
                      </p>

                      <h3 className="mt-1 text-xl font-black">
                        Your order
                      </h3>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffd400] text-black">
                      <Zap size={18} />
                    </div>
                  </div>

                  <OrderSummaryCard />
                </div>
              </div>
            </div>
          </section>

          {/* MACHINE STATUS */}
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400">
                  Hardware Monitor
                </p>

                <h2 className="mt-1 text-2xl font-black text-black">
                  Machine status
                </h2>
              </div>

              <div className="hidden items-center gap-2 rounded-full bg-black px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white md:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#ffd400]" />
                ESP32 System
              </div>
            </div>

            <div className="rounded-[28px] border border-black/10 bg-white p-4 shadow-sm md:p-6">
              <MachineStatusPanel />
            </div>
          </section>
        </>
    );
  };

  return (
      <div className="min-h-screen bg-[#efeee9] text-black">
        {/* Background decoration */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[5%] top-[15%] h-40 w-40 rounded-full bg-[#ffd400]/10 blur-3xl" />

          <div className="absolute right-[5%] top-[35%] h-60 w-60 rounded-full bg-[#ff3b30]/5 blur-3xl" />
        </div>

        {/* HEADER */}
        <Header />

        {/* MAIN */}
        <main className="mx-auto w-full max-w-[1500px] px-4 pb-28 pt-5 md:px-6 lg:px-8">
          {renderScreen()}
        </main>

        {/* MOBILE NAV */}
        <MobileBottomNav />

        {/* FOOTER */}
        <footer className="border-t border-black/10 bg-black px-5 py-10 text-white md:px-8">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffd400] text-black">
                    <Bot size={21} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black tracking-tight">
                      BEVERA<span className="text-[#ffd400]">360</span>
                    </h3>

                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                      Smart Robotic Bartender
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <Cpu size={15} className="mb-2 text-[#ffd400]" />

                  <p className="text-[9px] uppercase tracking-widest text-neutral-500">
                    Controller
                  </p>

                  <p className="text-xs font-bold">ESP32</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <Gauge size={15} className="mb-2 text-[#ffd400]" />

                  <p className="text-[9px] uppercase tracking-widest text-neutral-500">
                    Accuracy
                  </p>

                  <p className="text-xs font-bold">±1ml</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <Zap size={15} className="mb-2 text-[#ff3b30]" />

                  <p className="text-[9px] uppercase tracking-widest text-neutral-500">
                    Dispense
                  </p>

                  <p className="text-xs font-bold">Fast</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <ShieldCheck size={15} className="mb-2 text-[#ffd400]" />

                  <p className="text-[9px] uppercase tracking-widest text-neutral-500">
                    Safety
                  </p>

                  <p className="text-xs font-bold">Active</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] text-neutral-500 md:flex-row">
              <p>
                © 2026 Bevera360. Smart Beverage Dispensing System.
              </p>

              <p className="font-mono">
                ROBOTICS • ESP32 • AUTOMATION • PRECISION
              </p>
            </div>
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