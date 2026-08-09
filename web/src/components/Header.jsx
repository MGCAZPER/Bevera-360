import React from "react";
import {
  Bot,
  Wifi,
  Settings2,
  Activity,
  Cpu,
  Presentation,
  SlidersHorizontal,
} from "lucide-react";

import { useBartender } from "../context/BartenderContext";

export const Header = () => {
  const {
    activeScreen,
    setActiveScreen,
    esp32Connected,
    hardwareMode,
    setHardwareMode,
  } = useBartender();

  const navItem = (screen, label) => (
      <button
          onClick={() => setActiveScreen(screen)}
          className={`
        rounded-full
        px-3
        py-2
        text-[10px]
        font-bold
        transition-all
        ${
              activeScreen === screen
                  ? "bg-black text-white"
                  : "text-slate-600 hover:bg-black/5 hover:text-black"
          }
      `}
      >
        {label}
      </button>
  );

  return (
      <header
          className="
        sticky
        top-0
        z-50
        border-b
        border-black/10
        bg-[#f4f1e8]/90
        backdrop-blur-xl
      "
      >
        <div
            className="
          mx-auto
          flex
          min-h-[72px]
          max-w-[1720px]
          items-center
          justify-between
          gap-4
          px-4
          lg:px-8
        "
        >

          {/* BRAND */}

          <button
              onClick={() => setActiveScreen("main")}
              className="
            flex
            items-center
            gap-3
            text-left
          "
          >

            <div
                className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-black
              text-[#f5c400]
            "
            >
              <Bot size={21} />
            </div>

            <div className="hidden sm:block">

              <div
                  className="
                font-[Space_Grotesk]
                text-sm
                font-bold
                tracking-tight
              "
              >
                BEVERA<span className="text-[#e6392f]">.</span>360
              </div>

              <div
                  className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
              >
                Smart Beverage System
              </div>

            </div>

          </button>


          {/* NAVIGATION */}

          <nav
              className="
            hidden
            items-center
            gap-1
            rounded-full
            border
            border-black/10
            bg-white/50
            p-1
            lg:flex
          "
          >
            {navItem("main", "Overview")}

            {navItem("admin", "System")}

            {navItem("calibration", "Calibration")}

            {navItem("diagnostics", "Diagnostics")}

            {navItem("figma_board", "Canvas")}
          </nav>


          {/* RIGHT */}

          <div className="flex items-center gap-2">

            {/* Hardware */}

            <button
                onClick={() =>
                    setHardwareMode(
                        hardwareMode === "LIVE_ESP32"
                            ? "SIMULATION_DEMO"
                            : "LIVE_ESP32"
                    )
                }
                className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-black/10
              bg-white/60
              px-3
              py-2
              sm:flex
            "
            >

              <Cpu size={12} />

              <span className="font-mono text-[8px] font-bold">
              {hardwareMode === "LIVE_ESP32"
                  ? "ESP32 LIVE"
                  : "DEMO"}
            </span>

            </button>


            {/* Connection */}

            <div
                className="
              flex
              items-center
              gap-2
              rounded-full
              bg-black
              px-3
              py-2
              text-white
            "
            >

            <span
                className={
                  esp32Connected
                      ? "status-online"
                      : "status-warning"
                }
            />

              <span
                  className="
                hidden
                font-mono
                text-[8px]
                font-bold
                uppercase
                sm:block
              "
              >
              {esp32Connected
                  ? "Online"
                  : "Connecting"}
            </span>

            </div>

          </div>

        </div>
      </header>
  );
};