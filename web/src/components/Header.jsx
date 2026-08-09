import React from "react";
import {
  Bot,
  Wifi,
  User,
  ChevronDown,
  Presentation,
  Sliders,
  Cpu,
  Activity,
  Settings2,
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

  const isHome =
      activeScreen === "main" ||
      activeScreen === "preparation" ||
      activeScreen === "completion";

  const navButton = (active = false) =>
      `
      relative
      flex
      items-center
      gap-1.5
      rounded-xl
      px-3
      py-2
      text-[11px]
      font-semibold
      whitespace-nowrap
      transition-all
      duration-200
      ${
          active
              ? "bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.06)]"
              : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
      }
    `;

  return (
      <header
          className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-white/[0.07]
        bg-[#030711]/85
        backdrop-blur-2xl
      "
      >
        {/* Top cyan line */}
        <div
            className="
          absolute
          left-0
          right-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-400/60
          to-transparent
        "
        />

        <div
            className="
          mx-auto
          flex
          min-h-[70px]
          max-w-[1720px]
          items-center
          gap-4
          px-4
          lg:px-6
          xl:px-8
        "
        >
          {/* =================================================
            BRAND
        ================================================= */}

          <button
              onClick={() => setActiveScreen("main")}
              className="
            group
            flex
            min-w-fit
            items-center
            gap-3
            outline-none
          "
          >
            {/* Robot Icon */}
            <div
                className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-400/25
              bg-gradient-to-br
              from-cyan-400/15
              to-blue-500/5
              text-cyan-400
              shadow-[0_0_25px_rgba(0,240,255,.12)]
              transition-all
              duration-300
              group-hover:border-cyan-400/50
              group-hover:shadow-[0_0_30px_rgba(0,240,255,.25)]
            "
            >
              <Bot
                  size={21}
                  strokeWidth={1.8}
                  className="
                transition-transform
                duration-300
                group-hover:scale-110
              "
              />

              {/* Online indicator */}
              <span
                  className="
                absolute
                -right-0.5
                -top-0.5
                h-2.5
                w-2.5
                rounded-full
                border-2
                border-[#030711]
                bg-green-400
                shadow-[0_0_10px_rgba(0,255,136,.8)]
              "
              />
            </div>

            {/* Brand text */}
            <div className="hidden sm:block text-left">
              <div
                  className="
                font-[Outfit]
                text-[13px]
                font-extrabold
                uppercase
                leading-none
                tracking-[0.08em]
                text-white
              "
              >
                Robotic
              </div>

              <div
                  className="
                mt-0.5
                font-[Outfit]
                text-[13px]
                font-extrabold
                uppercase
                leading-none
                tracking-[0.08em]
                text-cyan-400
              "
              >
                Bartender
              </div>
            </div>
          </button>


          {/* =================================================
            MAIN NAVIGATION
        ================================================= */}

          <nav
              className="
            mx-auto
            hidden
            items-center
            rounded-2xl
            border
            border-white/[0.07]
            bg-white/[0.025]
            p-1
            lg:flex
          "
          >
            {/* Home */}

            <button
                onClick={() => setActiveScreen("main")}
                className={navButton(isHome)}
            >
              Home
            </button>


            {/* Drinks */}

            <button
                onClick={() => setActiveScreen("main")}
                className={navButton(activeScreen === "main")}
            >
              Drinks
            </button>


            {/* Orders */}

            <button
                onClick={() => setActiveScreen("main")}
                className={navButton(false)}
            >
              Orders
            </button>


            {/* Status */}

            <button
                onClick={() => setActiveScreen("admin")}
                className={navButton(activeScreen === "admin")}
            >
              Status
            </button>


            {/* Calibration */}

            <button
                onClick={() => setActiveScreen("calibration")}
                className={navButton(activeScreen === "calibration")}
            >
              <Sliders
                  size={13}
                  className={
                    activeScreen === "calibration"
                        ? "text-cyan-400"
                        : "text-slate-500"
                  }
              />

              Calibration
            </button>


            {/* Diagnostics */}

            <button
                onClick={() => setActiveScreen("diagnostics")}
                className={navButton(activeScreen === "diagnostics")}
            >
              <Cpu
                  size={13}
                  className={
                    activeScreen === "diagnostics"
                        ? "text-cyan-400"
                        : "text-slate-500"
                  }
              />

              Hardware
            </button>


            {/* Figma */}

            <button
                onClick={() => setActiveScreen("figma_board")}
                className={navButton(activeScreen === "figma_board")}
            >
              <Presentation
                  size={13}
                  className={
                    activeScreen === "figma_board"
                        ? "text-purple-400"
                        : "text-slate-500"
                  }
              />

              Canvas
            </button>
          </nav>


          {/* =================================================
            RIGHT SIDE CONTROLS
        ================================================= */}

          <div
              className="
            ml-auto
            flex
            items-center
            gap-2
          "
          >
            {/* ESP32 Mode */}

            <button
                onClick={() =>
                    setHardwareMode(
                        hardwareMode === "LIVE_ESP32"
                            ? "SIMULATION_DEMO"
                            : "LIVE_ESP32"
                    )
                }
                title="Toggle ESP32 hardware / simulation mode"
                className="
              hidden
              items-center
              gap-2
              rounded-xl
              border
              px-3
              py-2
              text-[9px]
              font-black
              uppercase
              tracking-wider
              transition-all
              duration-200
              md:flex
            "
                style={{
                  borderColor:
                      hardwareMode === "LIVE_ESP32"
                          ? "rgba(0,240,255,.25)"
                          : "rgba(245,158,11,.25)",

                  background:
                      hardwareMode === "LIVE_ESP32"
                          ? "rgba(0,240,255,.05)"
                          : "rgba(245,158,11,.05)",

                  color:
                      hardwareMode === "LIVE_ESP32"
                          ? "#67e8f9"
                          : "#fbbf24",
                }}
            >
              <Activity size={12} />

              {hardwareMode === "LIVE_ESP32"
                  ? "ESP32 LIVE"
                  : "DEMO MODE"}
            </button>


            {/* Machine Status */}

            <div
                className="
              hidden
              items-center
              gap-2
              rounded-xl
              border
              border-green-400/15
              bg-green-400/[0.045]
              px-3
              py-2
              sm:flex
            "
            >
            <span className="relative flex h-2 w-2">

              <span
                  className={`
                  absolute
                  inline-flex
                  h-full
                  w-full
                  rounded-full
                  opacity-60
                  ${
                      esp32Connected
                          ? "animate-ping bg-green-400"
                          : "bg-amber-400"
                  }
                `}
              />

              <span
                  className={`
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  ${
                      esp32Connected
                          ? "bg-green-400"
                          : "bg-amber-400"
                  }
                `}
              />

            </span>

              <span
                  className={`
                text-[9px]
                font-black
                uppercase
                tracking-[0.12em]
                ${
                      esp32Connected
                          ? "text-green-400"
                          : "text-amber-400"
                  }
              `}
              >
              {esp32Connected ? "ONLINE" : "CONNECTING"}
            </span>
            </div>


            {/* WiFi */}

            <div
                className="
              hidden
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.03]
              text-green-400
              transition-all
              hover:border-green-400/25
              hover:bg-green-400/[0.06]
              sm:flex
            "
            >
              <Wifi size={16} />
            </div>


            {/* Settings */}

            <button
                className="
              hidden
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.03]
              text-slate-400
              transition-all
              hover:border-cyan-400/25
              hover:bg-cyan-400/[0.06]
              hover:text-cyan-400
              md:flex
            "
            >
              <Settings2 size={15} />
            </button>


            {/* Admin */}

            <button
                className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.035]
              px-2
              py-1.5
              transition-all
              hover:border-cyan-400/20
              hover:bg-white/[0.055]
            "
            >

              <div
                  className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-gradient-to-br
                from-slate-500
                to-slate-800
                text-white
                shadow-inner
              "
              >
                <User size={14} />
              </div>

              <div className="hidden text-left sm:block">

                <p
                    className="
                  text-[10px]
                  font-bold
                  leading-none
                  text-white
                "
                >
                  Admin
                </p>

                <p
                    className="
                  mt-1
                  text-[8px]
                  leading-none
                  text-slate-500
                "
                >
                  System Manager
                </p>

              </div>

              <ChevronDown
                  size={12}
                  className="hidden text-slate-500 sm:block"
              />

            </button>

          </div>

        </div>


        {/* =================================================
          MOBILE NAVIGATION
      ================================================= */}

        <div
            className="
          flex
          overflow-x-auto
          border-t
          border-white/[0.05]
          bg-black/10
          px-3
          py-2
          lg:hidden
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
        >

          <div className="mx-auto flex gap-1">

            <button
                onClick={() => setActiveScreen("main")}
                className={navButton(isHome)}
            >
              Home
            </button>

            <button
                onClick={() => setActiveScreen("main")}
                className={navButton(false)}
            >
              Drinks
            </button>

            <button
                onClick={() => setActiveScreen("admin")}
                className={navButton(activeScreen === "admin")}
            >
              Status
            </button>

            <button
                onClick={() => setActiveScreen("calibration")}
                className={navButton(activeScreen === "calibration")}
            >
              <Sliders size={12} />
              Calibration
            </button>

            <button
                onClick={() => setActiveScreen("diagnostics")}
                className={navButton(activeScreen === "diagnostics")}
            >
              <Cpu size={12} />
              Hardware
            </button>

          </div>

        </div>

      </header>
  );
};