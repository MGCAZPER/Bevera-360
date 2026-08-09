import React from "react";
import {
  ArrowRight,
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";

export const HeroSection = ({ onStartOrdering }) => {
  return (
      <section className="relative min-h-[390px] overflow-hidden">

        {/* =====================================================
          BACKGROUND LIGHT EFFECTS
      ===================================================== */}

        <div
            className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-72
          w-72
          rounded-full
          bg-cyan-500/10
          blur-[110px]
        "
        />

        <div
            className="
          pointer-events-none
          absolute
          right-20
          top-0
          h-96
          w-96
          rounded-full
          bg-blue-600/10
          blur-[130px]
        "
        />

        <div
            className="
          pointer-events-none
          absolute
          bottom-[-150px]
          left-1/2
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-cyan-400/10
          blur-[120px]
        "
        />

        {/* Decorative grid */}

        <div
            className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(0,240,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,.5)_1px,transparent_1px)]
          [background-size:42px_42px]
        "
        />

        {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

        <div
            className="
          relative
          z-10
          grid
          min-h-[390px]
          grid-cols-1
          items-center
          lg:grid-cols-12
        "
        >

          {/* ===================================================
            LEFT CONTENT
        =================================================== */}

          <div
              className="
            relative
            z-20
            flex
            flex-col
            justify-center
            px-6
            py-10
            sm:px-8
            lg:col-span-6
            lg:px-10
            lg:py-8
            xl:col-span-5
          "
          >

            {/* Status badge */}

            <div
                className="
              mb-5
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-green-400/20
              bg-green-400/[0.05]
              px-3
              py-1.5
              backdrop-blur-xl
            "
            >
            <span
                className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-green-400
                shadow-[0_0_10px_rgba(0,255,136,.9)]
              "
            />

              <span
                  className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-green-400
              "
              >
              Smart Beverage System
            </span>

              <span className="text-slate-700">•</span>

              <span className="font-mono text-[8px] text-slate-500">
              ESP32 PRO
            </span>
            </div>


            {/* Main heading */}

            <h1
                className="
              max-w-[620px]
              font-[Outfit]
              text-4xl
              font-black
              uppercase
              leading-[0.94]
              tracking-[-0.04em]
              text-white
              sm:text-5xl
              lg:text-[52px]
              xl:text-[60px]
            "
            >
              Smart

              <span
                  className="
                block
                bg-gradient-to-r
                from-cyan-300
                via-cyan-400
                to-blue-500
                bg-clip-text
                text-transparent
                drop-shadow-[0_0_20px_rgba(0,210,255,.18)]
              "
              >
              Robotic
            </span>

              <span className="block">
              Bartender
            </span>
            </h1>


            {/* Description */}

            <p
                className="
              mt-5
              max-w-[520px]
              text-xs
              font-medium
              leading-6
              text-slate-400
              sm:text-sm
            "
            >
              Order premium beverages with a single tap.
              Precision liquid dispensing, intelligent cup
              detection and automated mixing for a flawless
              drink every time.
            </p>


            {/* CTA */}

            <div className="mt-6 flex flex-wrap items-center gap-3">

              <button
                  onClick={onStartOrdering}
                  className="
                group
                relative
                flex
                items-center
                gap-3
                overflow-hidden
                rounded-xl
                border
                border-cyan-300/50
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                px-5
                py-3
                text-xs
                font-black
                text-[#031018]
                shadow-[0_0_25px_rgba(0,210,255,.35)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_0_40px_rgba(0,210,255,.6)]
                active:translate-y-0
              "
              >

              <span
                  className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/30
                  to-transparent
                  transition-transform
                  duration-700
                  group-hover:translate-x-full
                "
              />

                <span className="relative">
                Start Ordering
              </span>

                <ArrowRight
                    size={16}
                    className="
                  relative
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                />

              </button>


              {/* Secondary button */}

              <button
                  onClick={onStartOrdering}
                  className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.035]
                px-4
                py-3
                text-xs
                font-semibold
                text-slate-300
                backdrop-blur-xl
                transition-all
                duration-200
                hover:border-cyan-400/25
                hover:bg-cyan-400/[0.05]
                hover:text-white
              "
              >
                <Sparkles
                    size={14}
                    className="text-cyan-400"
                />

                Explore Drinks
              </button>

            </div>


            {/* =================================================
              FEATURE MINI CARDS
          ================================================= */}

            <div
                className="
              mt-7
              grid
              max-w-[560px]
              grid-cols-3
              gap-2
            "
            >

              {/* Feature 1 */}

              <div
                  className="
                rounded-xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-3
                backdrop-blur-xl
                transition-all
                hover:border-cyan-400/20
                hover:bg-cyan-400/[0.035]
              "
              >
                <Cpu
                    size={15}
                    className="mb-2 text-cyan-400"
                />

                <p
                    className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-white
                "
                >
                  ESP32 Control
                </p>

                <p className="mt-1 text-[8px] text-slate-500">
                  Real-time telemetry
                </p>
              </div>


              {/* Feature 2 */}

              <div
                  className="
                rounded-xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-3
                backdrop-blur-xl
                transition-all
                hover:border-green-400/20
                hover:bg-green-400/[0.035]
              "
              >
                <ShieldCheck
                    size={15}
                    className="mb-2 text-green-400"
                />

                <p
                    className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-white
                "
                >
                  Cup Safety
                </p>

                <p className="mt-1 text-[8px] text-slate-500">
                  IR detection active
                </p>
              </div>


              {/* Feature 3 */}

              <div
                  className="
                rounded-xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-3
                backdrop-blur-xl
                transition-all
                hover:border-blue-400/20
                hover:bg-blue-400/[0.035]
              "
              >
                <Zap
                    size={15}
                    className="mb-2 text-blue-400"
                />

                <p
                    className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-white
                "
                >
                  Precision Flow
                </p>

                <p className="mt-1 text-[8px] text-slate-500">
                  Accurate dispensing
                </p>
              </div>

            </div>

          </div>


          {/* ===================================================
            ROBOT MACHINE
        =================================================== */}

          <div
              className="
            relative
            flex
            min-h-[390px]
            items-center
            justify-center
            lg:col-span-6
            lg:min-h-[390px]
            xl:col-span-7
          "
          >

            {/* Machine spotlight */}

            <div
                className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[310px]
              w-[310px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-cyan-400/10
              blur-[70px]
            "
            />


            {/* Floor glow */}

            <div
                className="
              pointer-events-none
              absolute
              bottom-10
              left-1/2
              h-8
              w-[280px]
              -translate-x-1/2
              rounded-[50%]
              bg-cyan-400/20
              blur-[25px]
            "
            />


            {/* Decorative circles */}

            <div
                className="
              pointer-events-none
              absolute
              h-[310px]
              w-[310px]
              rounded-full
              border
              border-cyan-400/[0.07]
            "
            />

            <div
                className="
              pointer-events-none
              absolute
              h-[250px]
              w-[250px]
              rounded-full
              border
              border-cyan-400/[0.05]
            "
            />


            {/* Robot image */}

            <div
                className="
              relative
              z-10
              flex
              h-full
              w-full
              items-center
              justify-center
            "
            >

              <img
                  src="/images/robo_machine.png"
                  alt="Smart Robotic Bartender Machine"
                  className="
                relative
                z-20
                h-[340px]
                w-[340px]
                max-w-[90%]
                object-contain
                drop-shadow-[0_20px_35px_rgba(0,0,0,.8)]
                drop-shadow-[0_0_30px_rgba(0,210,255,.25)]
                transition-transform
                duration-700
                hover:scale-[1.04]
              "
              />

            </div>


            {/* =================================================
              FLOATING STATUS CARD - TOP RIGHT
          ================================================= */}

            <div
                className="
              absolute
              right-4
              top-12
              z-30
              hidden
              w-[145px]
              rounded-2xl
              border
              border-white/[0.09]
              bg-[#08111e]/80
              p-3
              shadow-[0_15px_40px_rgba(0,0,0,.5)]
              backdrop-blur-xl
              sm:block
              lg:right-5
              xl:right-10
            "
            >

              <div className="flex items-center gap-2">

                <div
                    className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-green-400/10
                  text-green-400
                "
                >
                  <Cpu size={13} />
                </div>

                <div>

                  <p className="text-[8px] text-slate-500">
                    MACHINE STATUS
                  </p>

                  <p className="text-[10px] font-bold text-green-400">
                    ONLINE
                  </p>

                </div>

              </div>

              <div className="mt-3 h-px bg-white/[0.06]" />

              <div className="mt-2 flex items-center justify-between">

              <span className="text-[8px] text-slate-500">
                Temperature
              </span>

                <span className="font-mono text-[9px] text-white">
                32°C
              </span>

              </div>

            </div>


            {/* =================================================
              FLOATING CARD - BOTTOM
          ================================================= */}

            <div
                className="
              absolute
              bottom-8
              left-4
              z-30
              hidden
              rounded-2xl
              border
              border-cyan-400/10
              bg-[#08111e]/80
              px-3
              py-2.5
              shadow-[0_15px_40px_rgba(0,0,0,.5)]
              backdrop-blur-xl
              sm:block
              lg:left-3
              xl:left-10
            "
            >

              <div className="flex items-center gap-2">

              <span
                  className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_10px_#00f0ff]
                "
              />

                <span className="text-[9px] font-semibold text-slate-300">
                5 Channel Dispensing
              </span>

              </div>

            </div>

          </div>

        </div>


        {/* Bottom divider */}

        <div
            className="
          absolute
          bottom-0
          left-6
          right-6
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-400/15
          to-transparent
        "
        />

      </section>
  );
};