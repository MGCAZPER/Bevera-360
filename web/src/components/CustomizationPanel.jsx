import React from "react";
import { useBartender } from "../context/BartenderContext";
import {
  Snowflake,
  Droplet,
  Plus,
  Check,
  SlidersHorizontal,
  GlassWater,
  Sparkles,
} from "lucide-react";

export const CustomizationPanel = () => {
  const {
    iceLevelVal,
    setIceLevelVal,
    sweetnessVal,
    setSweetnessVal,
    cupSize,
    setCupSize,
    selectedExtras,
    toggleExtra,
  } = useBartender();

  const extraOptions = [
    {
      name: "Extra Mint",
      priceLkr: 20,
    },
    {
      name: "Extra Shot",
      priceLkr: 30,
    },
    {
      name: "Extra Flavor",
      priceLkr: 20,
    },
  ];

  return (
      <section
          className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-gradient-to-br
        from-[#0b1424]/90
        via-[#07101d]/90
        to-[#050b14]/95
        p-4
        shadow-[0_20px_50px_rgba(0,0,0,.35)]
        backdrop-blur-2xl
      "
      >
        {/* Background glow */}

        <div
            className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-cyan-400/[0.06]
          blur-[70px]
        "
        />

        <div
            className="
          pointer-events-none
          absolute
          -bottom-24
          -left-20
          h-44
          w-44
          rounded-full
          bg-blue-500/[0.05]
          blur-[70px]
        "
        />

        {/* =====================================================
          HEADER
      ===================================================== */}

        <div
            className="
          relative
          z-10
          mb-4
          flex
          items-center
          justify-between
          border-b
          border-white/[0.06]
          pb-3
        "
        >
          <div className="flex items-center gap-3">

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
              text-cyan-400
              shadow-[0_0_15px_rgba(0,240,255,.08)]
            "
            >
              <SlidersHorizontal size={16} />
            </div>

            <div>
              <h3
                  className="
                font-[Outfit]
                text-sm
                font-extrabold
                uppercase
                tracking-[0.08em]
                text-white
              "
              >
                Customize Your Drink
              </h3>

              <p className="mt-0.5 text-[9px] text-slate-500">
                Adjust your beverage exactly how you like it
              </p>
            </div>

          </div>

          <div
              className="
            hidden
            items-center
            gap-1.5
            rounded-full
            border
            border-cyan-400/10
            bg-cyan-400/[0.04]
            px-2.5
            py-1.5
            sm:flex
          "
          >
            <Sparkles size={10} className="text-cyan-400" />

            <span
                className="
              text-[8px]
              font-bold
              uppercase
              tracking-wider
              text-cyan-400
            "
            >
            Personalize
          </span>
          </div>
        </div>

        <div className="relative z-10 space-y-4">

          {/* ===================================================
            ICE LEVEL
        =================================================== */}

          <div
              className="
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.02]
            p-3
            transition-all
            hover:border-cyan-400/15
            hover:bg-white/[0.035]
          "
          >
            <div className="mb-2 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div
                    className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-400/[0.08]
                  text-blue-300
                "
                >
                  <Snowflake size={14} />
                </div>

                <div>
                  <p className="text-[10px] font-bold text-white">
                    Ice Level
                  </p>

                  <p className="text-[8px] text-slate-600">
                    Control the amount of ice
                  </p>
                </div>

              </div>

              <span
                  className="
                rounded-lg
                border
                border-cyan-400/10
                bg-cyan-400/[0.04]
                px-2
                py-1
                font-mono
                text-[9px]
                font-bold
                text-cyan-400
              "
              >
              {iceLevelVal}%
            </span>

            </div>

            <div
                className="
              flex
              items-center
              gap-3
              rounded-lg
              border
              border-white/[0.05]
              bg-[#030811]/70
              px-3
              py-2.5
            "
            >
              <Snowflake
                  size={12}
                  className="shrink-0 text-slate-600"
              />

              <input
                  type="range"
                  min="0"
                  max="100"
                  value={iceLevelVal}
                  onChange={(e) =>
                      setIceLevelVal(parseInt(e.target.value))
                  }
                  className="
                h-1.5
                w-full
                cursor-pointer
                appearance-none
                rounded-full
                bg-slate-800
                accent-cyan-400
              "
                  style={{
                    background: `linear-gradient(
                  to right,
                  #00f0ff ${iceLevelVal}%,
                  rgba(255,255,255,.08) ${iceLevelVal}%
                )`,
                  }}
              />

              <Snowflake
                  size={16}
                  className="shrink-0 text-cyan-400"
              />
            </div>
          </div>

          {/* ===================================================
            SWEETNESS
        =================================================== */}

          <div
              className="
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.02]
            p-3
            transition-all
            hover:border-cyan-400/15
            hover:bg-white/[0.035]
          "
          >
            <div className="mb-2 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div
                    className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-cyan-400/[0.08]
                  text-cyan-300
                "
                >
                  <Droplet size={14} />
                </div>

                <div>
                  <p className="text-[10px] font-bold text-white">
                    Sweetness
                  </p>

                  <p className="text-[8px] text-slate-600">
                    Choose your sweetness level
                  </p>
                </div>

              </div>

              <span
                  className="
                rounded-lg
                border
                border-cyan-400/10
                bg-cyan-400/[0.04]
                px-2
                py-1
                font-mono
                text-[9px]
                font-bold
                text-cyan-400
              "
              >
              {sweetnessVal}%
            </span>

            </div>

            <div
                className="
              flex
              items-center
              gap-3
              rounded-lg
              border
              border-white/[0.05]
              bg-[#030811]/70
              px-3
              py-2.5
            "
            >
              <Droplet
                  size={12}
                  className="shrink-0 text-slate-600"
              />

              <input
                  type="range"
                  min="0"
                  max="100"
                  value={sweetnessVal}
                  onChange={(e) =>
                      setSweetnessVal(parseInt(e.target.value))
                  }
                  className="
                h-1.5
                w-full
                cursor-pointer
                appearance-none
                rounded-full
                bg-slate-800
                accent-cyan-400
              "
                  style={{
                    background: `linear-gradient(
                  to right,
                  #00f0ff ${sweetnessVal}%,
                  rgba(255,255,255,.08) ${sweetnessVal}%
                )`,
                  }}
              />

              <Droplet
                  size={16}
                  className="shrink-0 text-cyan-400"
              />
            </div>
          </div>

          {/* ===================================================
            CUP SIZE
        =================================================== */}

          <div>

            <div className="mb-2 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <GlassWater
                    size={13}
                    className="text-cyan-400"
                />

                <span
                    className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-300
                "
                >
                Cup Size
              </span>

              </div>

              <span className="text-[8px] text-slate-600">
              {cupSize}
            </span>

            </div>

            <div className="grid grid-cols-3 gap-2">

              {[
                {
                  size: "Small",
                  iconScale: "h-4",
                  volume: "250 ML",
                },
                {
                  size: "Medium",
                  iconScale: "h-6",
                  volume: "350 ML",
                },
                {
                  size: "Large",
                  iconScale: "h-8",
                  volume: "500 ML",
                },
              ].map((item) => {

                const isSelected =
                    cupSize === item.size;

                return (
                    <button
                        key={item.size}
                        onClick={() =>
                            setCupSize(item.size)
                        }
                        className={`
                    group
                    relative
                    flex
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    border
                    py-3
                    transition-all
                    duration-200
                    ${
                            isSelected
                                ? `
                          border-cyan-400/45
                          bg-cyan-400/[0.09]
                          text-cyan-300
                          shadow-[0_0_18px_rgba(0,240,255,.12)]
                        `
                                : `
                          border-white/[0.06]
                          bg-white/[0.02]
                          text-slate-500
                          hover:border-cyan-400/20
                          hover:bg-white/[0.04]
                          hover:text-slate-300
                        `
                        }
                  `}
                    >

                      {isSelected && (
                          <div
                              className="
                        absolute
                        right-1.5
                        top-1.5
                        flex
                        h-4
                        w-4
                        items-center
                        justify-center
                        rounded-full
                        bg-cyan-400
                        text-[#031018]
                      "
                          >
                            <Check size={9} strokeWidth={3} />
                          </div>
                      )}

                      <div
                          className={`
                      mb-1
                      w-4
                      rounded-t-md
                      rounded-b-sm
                      border
                      transition-all
                      ${
                              isSelected
                                  ? "border-cyan-300 bg-cyan-400/10"
                                  : "border-slate-600 bg-transparent"
                          }
                      ${item.iconScale}
                    `}
                      />

                      <span
                          className="
                      text-[10px]
                      font-extrabold
                    "
                      >
                    {item.size}
                  </span>

                      <span
                          className={`
                      mt-0.5
                      font-mono
                      text-[7px]
                      ${
                              isSelected
                                  ? "text-cyan-500"
                                  : "text-slate-700"
                          }
                    `}
                      >
                    {item.volume}
                  </span>

                    </button>
                );
              })}

            </div>
          </div>

          {/* ===================================================
            EXTRA INGREDIENTS
        =================================================== */}

          <div>

            <div className="mb-2 flex items-center gap-2">

              <Sparkles
                  size={13}
                  className="text-purple-400"
              />

              <span
                  className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-slate-300
              "
              >
              Extra Ingredients
            </span>

            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">

              {extraOptions.map((opt) => {

                const isChecked =
                    selectedExtras.some(
                        (e) => e.name === opt.name
                    );

                return (
                    <button
                        key={opt.name}
                        onClick={() => toggleExtra(opt)}
                        className={`
                    group
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    p-2.5
                    text-left
                    transition-all
                    duration-200
                    ${
                            isChecked
                                ? `
                          border-cyan-400/35
                          bg-cyan-400/[0.07]
                          shadow-[0_0_15px_rgba(0,240,255,.08)]
                        `
                                : `
                          border-white/[0.06]
                          bg-white/[0.02]
                          hover:border-cyan-400/20
                          hover:bg-white/[0.035]
                        `
                        }
                  `}
                    >

                      <div>

                    <span
                        className={`
                        block
                        text-[9px]
                        font-bold
                        ${
                            isChecked
                                ? "text-cyan-300"
                                : "text-slate-300"
                        }
                      `}
                    >
                      {opt.name}
                    </span>

                        <span
                            className="
                        mt-0.5
                        block
                        font-mono
                        text-[8px]
                        text-slate-600
                      "
                        >
                      + LKR {opt.priceLkr}
                    </span>

                      </div>

                      <div
                          className={`
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition-all
                      ${
                              isChecked
                                  ? `
                            bg-cyan-400
                            text-[#031018]
                            shadow-[0_0_12px_rgba(0,240,255,.35)]
                          `
                                  : `
                            border
                            border-white/[0.08]
                            bg-white/[0.03]
                            text-slate-600
                            group-hover:border-cyan-400/20
                            group-hover:text-cyan-400
                          `
                          }
                    `}
                      >
                        {isChecked ? (
                            <Check
                                size={12}
                                strokeWidth={3}
                            />
                        ) : (
                            <Plus size={12} />
                        )}
                      </div>

                    </button>
                );
              })}

            </div>
          </div>

        </div>
      </section>
  );
};