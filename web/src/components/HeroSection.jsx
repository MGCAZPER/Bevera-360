import React from "react";
import {
  ArrowUpRight,
  Cpu,
  Droplets,
  Gauge,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const HeroSection = ({
                              onStartOrdering,
                            }) => {
  return (
      <section
          className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-black/10
        bg-[#faf9f4]
      "
      >

        {/* GRID */}

        <div className="tech-grid absolute inset-0 opacity-50" />

        <div
            className="
          absolute
          -right-20
          -top-20
          h-80
          w-80
          rounded-full
          bg-[#f5c400]/20
          blur-[100px]
        "
        />


        <div
            className="
          relative
          z-10
          grid
          min-h-[540px]
          grid-cols-1
          gap-8
          p-6
          sm:p-10
          lg:grid-cols-12
          lg:p-14
        "
        >

          {/* LEFT */}

          <div
              className="
            flex
            flex-col
            justify-center
            lg:col-span-7
          "
          >

            <div className="mb-5 flex items-center gap-2">

            <span className="badge-yellow">
              <Zap size={10} />
              SMART DISPENSING PLATFORM
            </span>

              <span className="font-mono text-[8px] text-slate-500">
              V2.0
            </span>

            </div>


            <h1
                className="
              max-w-4xl
              font-[Space_Grotesk]
              text-[clamp(3rem,7vw,7rem)]
              font-bold
              leading-[0.86]
              tracking-[-0.075em]
              text-black
            "
            >
              YOUR DRINK.
              <br />

              <span
                  className="
                inline-block
                text-[#e6392f]
              "
              >
              PRECISION.
            </span>

              <br />

              AUTOMATED.
            </h1>


            <p
                className="
              mt-7
              max-w-xl
              text-sm
              leading-6
              text-slate-600
              sm:text-base
            "
            >
              Bevera 360 is an intelligent robotic beverage
              dispensing system designed for accurate,
              hygienic and automated drink preparation.
            </p>


            <div className="mt-8 flex flex-wrap gap-3">

              <button
                  onClick={onStartOrdering}
                  className="btn-modern-yellow"
              >
                Start Ordering

                <ArrowUpRight size={15} />
              </button>

              <button
                  className="btn-modern-black"
                  onClick={() =>
                      document
                          .getElementById("system-overview")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          })
                  }
              >
                Explore System
              </button>

            </div>


            {/* METRICS */}

            <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-black/10 pt-5">

              <div>
                <p className="font-mono text-[8px] text-slate-500">
                  CHANNELS
                </p>

                <p className="mt-1 font-[Space_Grotesk] text-xl font-bold">
                  05
                </p>
              </div>

              <div className="border-l border-black/10 pl-4">
                <p className="font-mono text-[8px] text-slate-500">
                  CONTROL
                </p>

                <p className="mt-1 font-[Space_Grotesk] text-xl font-bold">
                  ESP32
                </p>
              </div>

              <div className="border-l border-black/10 pl-4">
                <p className="font-mono text-[8px] text-slate-500">
                  ACCURACY
                </p>

                <p className="mt-1 font-[Space_Grotesk] text-xl font-bold">
                  ML
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT MACHINE */}

          <div
              className="
            flex
            items-center
            justify-center
            lg:col-span-5
          "
          >

            <div className="machine-frame relative w-full max-w-[470px] p-5">

              {/* Top labels */}

              <div
                  className="
                absolute
                left-5
                top-5
                z-20
                flex
                items-center
                gap-2
              "
              >
              <span className="badge-black">
                <Cpu size={9} />
                ROBOT UNIT
              </span>
              </div>


              <div
                  className="
                absolute
                right-5
                top-5
                z-20
              "
              >
              <span className="badge-red">
                LIVE
              </span>
              </div>


              <div
                  className="
                flex
                min-h-[390px]
                items-center
                justify-center
              "
              >

                <img
                    src="/images/robo_machine.png"
                    alt="Bevera 360 robotic bartender"
                    className="
                  animate-machine
                  relative
                  z-10
                  max-h-[390px]
                  w-full
                  object-contain
                  drop-shadow-[0_25px_35px_rgba(0,0,0,.18)]
                "
                />

              </div>


              {/* Bottom data */}

              <div
                  className="
                absolute
                bottom-5
                left-5
                right-5
                z-20
                grid
                grid-cols-3
                gap-2
              "
              >

                <div className="rounded-xl bg-black p-2.5 text-white">
                  <Droplets size={13} className="text-[#f5c400]" />

                  <p className="mt-2 font-mono text-[7px] text-white/50">
                    FLOW
                  </p>

                  <p className="font-mono text-[9px] font-bold">
                    ACTIVE
                  </p>
                </div>

                <div className="rounded-xl bg-[#f5c400] p-2.5 text-black">
                  <Gauge size={13} />

                  <p className="mt-2 font-mono text-[7px] opacity-50">
                    PRECISION
                  </p>

                  <p className="font-mono text-[9px] font-bold">
                    READY
                  </p>
                </div>

                <div className="rounded-xl bg-white p-2.5 text-black">
                  <ShieldCheck size={13} />

                  <p className="mt-2 font-mono text-[7px] text-slate-500">
                    SAFETY
                  </p>

                  <p className="font-mono text-[9px] font-bold">
                    SECURE
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
  );
};