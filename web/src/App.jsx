import React, { useRef } from "react";

import {
  BartenderProvider,
  useBartender,
} from "./context/BartenderContext";

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
  ShieldCheck,
  Cpu,
  Zap,
  Sparkles,
  Bot,
} from "lucide-react";


function AppContent() {
  const { activeScreen } = useBartender();

  const menuRef = useRef(null);

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  return (
      <div className="min-h-screen w-full bg-[#030711] text-white overflow-x-hidden">

        {/* =====================================================
          BACKGROUND EFFECTS
      ===================================================== */}

        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

          {/* Cyan Glow */}
          <div
              className="
            absolute
            -top-48
            left-1/2
            h-[650px]
            w-[650px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/10
            blur-[140px]
          "
          />

          {/* Blue Glow */}
          <div
              className="
            absolute
            right-[-250px]
            top-[30%]
            h-[600px]
            w-[600px]
            rounded-full
            bg-blue-600/10
            blur-[150px]
          "
          />

          {/* Purple Glow */}
          <div
              className="
            absolute
            bottom-[-300px]
            left-[-200px]
            h-[550px]
            w-[550px]
            rounded-full
            bg-purple-600/10
            blur-[150px]
          "
          />

          {/* Grid */}
          <div
              className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
            [background-size:50px_50px]
          "
          />
        </div>


        {/* =====================================================
          HEADER
      ===================================================== */}

        <Header />


        {/* =====================================================
          MAIN APPLICATION
      ===================================================== */}

        <main
            className="
          mx-auto
          w-full
          max-w-[1720px]
          px-3
          sm:px-4
          lg:px-6
          xl:px-8
          py-4
          lg:py-5
          pb-24
          md:pb-6
        "
        >

          {/* =================================================
            FIGMA BOARD
        ================================================= */}

          {activeScreen === "figma_board" && (
              <div
                  className="
              animate-[fadeIn_.4s_ease]
              rounded-3xl
              border
              border-cyan-400/10
              bg-[#07101c]/60
              shadow-[0_25px_80px_rgba(0,0,0,.45)]
              backdrop-blur-xl
              overflow-hidden
            "
              >
                <FigmaBoard />
              </div>
          )}


          {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

          {activeScreen === "admin" && (
              <div className="animate-[fadeIn_.4s_ease]">
                <AdminDashboard />
              </div>
          )}


          {/* =================================================
            SYSTEM CALIBRATION
        ================================================= */}

          {activeScreen === "calibration" && (
              <div className="animate-[fadeIn_.4s_ease]">
                <SystemCalibration />
              </div>
          )}


          {/* =================================================
            MANUAL DIAGNOSTICS
        ================================================= */}

          {activeScreen === "diagnostics" && (
              <div className="animate-[fadeIn_.4s_ease]">
                <ManualDiagnostics />
              </div>
          )}


          {/* =================================================
            PREPARATION SCREEN
        ================================================= */}

          {activeScreen === "preparation" && (
              <div className="animate-[fadeIn_.4s_ease]">
                <PreparationScreen />
              </div>
          )}


          {/* =================================================
            COMPLETION SCREEN
        ================================================= */}

          {activeScreen === "completion" && (
              <div className="animate-[fadeIn_.4s_ease]">
                <CompletionScreen />
              </div>
          )}


          {/* =================================================
            HOME / ORDER SCREEN
        ================================================= */}

          {![
            "figma_board",
            "admin",
            "calibration",
            "diagnostics",
            "preparation",
            "completion",
          ].includes(activeScreen) && (

              <div className="space-y-5">


                {/* =============================================
                HERO
            ============================================= */}

                <section
                    className="
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-cyan-400/10
                bg-[#050b15]/75
                shadow-[0_25px_80px_rgba(0,0,0,.45)]
                backdrop-blur-2xl

                before:absolute
                before:inset-0
                before:pointer-events-none
                before:bg-[radial-gradient(circle_at_45%_50%,rgba(0,210,255,.09),transparent_40%)]
              "
                >
                  <HeroSection
                      onStartOrdering={scrollToMenu}
                  />
                </section>


                {/* =============================================
                DRINK SELECTION
            ============================================= */}

                <section
                    ref={menuRef}
                    id="drink-selection-section"
                    className="scroll-mt-24"
                >

                  <div
                      className="
                  mb-3
                  flex
                  items-end
                  justify-between
                  gap-4
                  px-1
                "
                  >

                    <div>

                      <div
                          className="
                      mb-1
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-cyan-400
                    "
                      >
                    <span
                        className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_10px_#00e5ff]
                      "
                    />

                        Beverage Selection
                      </div>

                      <h2
                          className="
                      font-[Outfit]
                      text-xl
                      font-extrabold
                      tracking-tight
                      text-white
                      sm:text-2xl
                    "
                      >
                        Select Your Drink
                      </h2>

                    </div>


                    <div
                        className="
                    hidden
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-3
                    py-1.5
                    text-[10px]
                    text-slate-400
                    sm:block
                  "
                    >
                      5 Premium Drinks
                    </div>

                  </div>


                  <div
                      className="
                  rounded-[24px]
                  border
                  border-white/[0.07]
                  bg-[#07101b]/60
                  p-2
                  shadow-[0_20px_60px_rgba(0,0,0,.35)]
                  backdrop-blur-xl
                "
                  >
                    <DrinkSelectionGrid />
                  </div>

                </section>


                {/* =============================================
                CUSTOMIZATION + ORDER SUMMARY
            ============================================= */}

                <section
                    className="
                grid
                grid-cols-1
                gap-4
                xl:grid-cols-12
              "
                >

                  {/* Customization */}

                  <div
                      className="
                  xl:col-span-7
                  min-w-0
                "
                  >

                    <div
                        className="
                    h-full
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-white/[0.07]
                    bg-[#07101b]/65
                    shadow-[0_20px_60px_rgba(0,0,0,.35)]
                    backdrop-blur-xl
                  "
                    >

                      <div
                          className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-white/[0.06]
                      px-5
                      py-4
                    "
                      >

                        <div>

                          <p
                              className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-cyan-400
                        "
                          >
                            Step 02
                          </p>

                          <h3
                              className="
                          mt-0.5
                          font-[Outfit]
                          text-lg
                          font-extrabold
                        "
                          >
                            Customize Your Drink
                          </h3>

                        </div>

                        <div
                            className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-cyan-400/15
                        bg-cyan-400/[0.06]
                        text-cyan-400
                      "
                        >
                          <Sparkles size={16} />
                        </div>

                      </div>

                      <CustomizationPanel />

                    </div>

                  </div>


                  {/* Order Summary */}

                  <div
                      className="
                  xl:col-span-5
                  min-w-0
                "
                  >

                    <div
                        className="
                    h-full
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-cyan-400/10
                    bg-[#07101b]/70
                    shadow-[0_20px_60px_rgba(0,0,0,.4)]
                    backdrop-blur-xl
                  "
                    >

                      <div
                          className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-white/[0.06]
                      px-5
                      py-4
                    "
                      >

                        <div>

                          <p
                              className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-blue-400
                        "
                          >
                            Step 03
                          </p>

                          <h3
                              className="
                          mt-0.5
                          font-[Outfit]
                          text-lg
                          font-extrabold
                        "
                          >
                            Order Summary
                          </h3>

                        </div>

                        <div
                            className="
                        rounded-lg
                        border
                        border-green-400/15
                        bg-green-400/[0.06]
                        px-2
                        py-1
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-green-400
                      "
                        >
                          Ready
                        </div>

                      </div>

                      <OrderSummaryCard />

                    </div>

                  </div>

                </section>


                {/* =============================================
                MACHINE STATUS
            ============================================= */}

                <section
                    className="
                overflow-hidden
                rounded-[24px]
                border
                border-white/[0.07]
                bg-[#07101b]/65
                shadow-[0_20px_60px_rgba(0,0,0,.4)]
                backdrop-blur-xl
              "
                >

                  <div
                      className="
                  flex
                  flex-col
                  gap-2
                  border-b
                  border-white/[0.06]
                  px-5
                  py-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
                  >

                    <div>

                      <p
                          className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-green-400
                    "
                      >
                        Live Telemetry
                      </p>

                      <h3
                          className="
                      mt-0.5
                      font-[Outfit]
                      text-lg
                      font-extrabold
                    "
                      >
                        Machine Status
                      </h3>

                    </div>


                    <div
                        className="
                    flex
                    items-center
                    gap-2
                    self-start
                    rounded-full
                    border
                    border-green-400/15
                    bg-green-400/[0.05]
                    px-3
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-green-400
                    sm:self-auto
                  "
                    >

                  <span
                      className="
                      h-1.5
                      w-1.5
                      animate-pulse
                      rounded-full
                      bg-green-400
                      shadow-[0_0_10px_#00ff88]
                    "
                  />

                      ESP32 Connected

                    </div>

                  </div>


                  <MachineStatusPanel />

                </section>

              </div>
          )}

        </main>


        {/* =====================================================
          MOBILE BOTTOM NAV
      ===================================================== */}

        <MobileBottomNav />


        {/* =====================================================
          FOOTER
      ===================================================== */}

        <footer
            className="
          mt-4
          mb-16
          border-t
          border-cyan-400/10
          bg-[#02050b]/80
          px-4
          py-5
          backdrop-blur-xl
          md:mb-0
        "
        >

          <div
              className="
            mx-auto
            flex
            max-w-[1720px]
            flex-col
            items-center
            justify-between
            gap-4
            lg:flex-row
          "
          >

            {/* Brand */}

            <div
                className="
              flex
              items-center
              gap-2.5
            "
            >

              <div
                  className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-400/20
                bg-cyan-400/[0.06]
              "
              >
                <Bot
                    size={18}
                    className="text-cyan-400"
                />
              </div>


              <div>

                <div
                    className="
                  text-[11px]
                  font-black
                  tracking-wide
                  text-white
                "
                >
                  ROBOTIC{" "}
                  <span className="text-cyan-400">
                  BARTENDER
                </span>
                </div>

                <div
                    className="
                  font-mono
                  text-[8px]
                  tracking-wider
                  text-slate-600
                "
                >
                  SMART BEVERAGE SYSTEM • V2.0
                </div>

              </div>

            </div>


            {/* Features */}

            <div
                className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-2
              text-[9px]
              text-slate-500
            "
            >

            <span className="flex items-center gap-1.5">
              <ShieldCheck
                  size={13}
                  className="text-green-400"
              />
              Hygienic Dispense
            </span>

              <span className="flex items-center gap-1.5">
              <Cpu
                  size={13}
                  className="text-cyan-400"
              />
              ESP32 Telemetry
            </span>

              <span className="flex items-center gap-1.5">
              <Zap
                  size={13}
                  className="text-blue-400"
              />
              Accurate Flow
            </span>

              <span className="flex items-center gap-1.5">
              <Sparkles
                  size={13}
                  className="text-purple-400"
              />
              Magnetic Stirring
            </span>

            </div>


            {/* Copyright */}

            <p
                className="
              font-mono
              text-[8px]
              text-slate-600
            "
            >
              © 2026 ROBOTIC BARTENDER SYSTEMS
            </p>

          </div>

        </footer>

      </div>
  );
}


/* =========================================================
   APP PROVIDER
========================================================= */

export default function App() {
  return (
      <BartenderProvider>
        <AppContent />
      </BartenderProvider>
  );
}