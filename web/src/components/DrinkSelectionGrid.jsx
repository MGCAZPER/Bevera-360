import React from "react";
import { useBartender } from "../context/BartenderContext";
import {
    Clock,
    Check,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";

export const DrinkSelectionGrid = () => {
    const {
        drinks,
        selectedDrink,
        setSelectedDrink,
    } = useBartender();

    return (
        <section className="relative">

            {/* =====================================================
          SECTION HEADER
      ===================================================== */}

            <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    {/* Icon */}

                    <div
                        className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-cyan-400/20
              bg-cyan-400/[0.06]
              text-cyan-400
              shadow-[0_0_15px_rgba(0,240,255,.08)]
            "
                    >
                        <Sparkles size={15} />
                    </div>


                    <div>

                        <div className="flex items-center gap-2">

                            <h2
                                className="
                  font-[Outfit]
                  text-sm
                  font-extrabold
                  uppercase
                  tracking-[0.08em]
                  text-white
                "
                            >
                                Select Your Drink
                            </h2>

                            <span
                                className="
                  rounded-full
                  border
                  border-cyan-400/15
                  bg-cyan-400/[0.05]
                  px-2
                  py-0.5
                  font-mono
                  text-[8px]
                  font-bold
                  text-cyan-400
                "
                            >
                {drinks.length} AVAILABLE
              </span>

                        </div>

                        <p className="mt-0.5 text-[9px] text-slate-500">
                            Choose your beverage and customize it to your preference
                        </p>

                    </div>

                </div>


                {/* Selected indicator */}

                <div
                    className="
            hidden
            items-center
            gap-2
            rounded-xl
            border
            border-white/[0.07]
            bg-white/[0.025]
            px-3
            py-2
            sm:flex
          "
                >

          <span className="text-[9px] text-slate-500">
            Selected
          </span>

                    <span className="max-w-[100px] truncate text-[9px] font-bold text-cyan-400">
            {selectedDrink?.name || "None"}
          </span>

                </div>

            </div>


            {/* =====================================================
          DRINK GRID
      ===================================================== */}

            <div
                className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
        "
            >

                {drinks.map((drink) => {

                    const isSelected =
                        selectedDrink?.id === drink.id;

                    return (

                        <article
                            key={drink.id}
                            onClick={() => setSelectedDrink(drink)}
                            className={`
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                p-2.5
                backdrop-blur-xl
                transition-all
                duration-300
                ${
                                isSelected
                                    ? `
                      border-cyan-400/50
                      bg-gradient-to-b
                      from-cyan-400/[0.09]
                      via-blue-500/[0.05]
                      to-white/[0.02]
                      shadow-[0_0_30px_rgba(0,210,255,.16)]
                      -translate-y-1
                    `
                                    : `
                      border-white/[0.075]
                      bg-white/[0.025]
                      hover:-translate-y-1
                      hover:border-cyan-400/25
                      hover:bg-white/[0.045]
                      hover:shadow-[0_15px_35px_rgba(0,0,0,.35)]
                    `
                            }
              `}
                        >

                            {/* Selected glow */}

                            {isSelected && (
                                <div
                                    className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-20
                    bg-cyan-400/10
                    blur-2xl
                  "
                                />
                            )}


                            {/* =================================================
                  TOP IMAGE
              ================================================= */}

                            <div
                                className="
                  relative
                  h-[145px]
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-gradient-to-b
                  from-[#07101e]
                  to-[#030811]
                "
                            >

                                {/* Background glow */}

                                <div
                                    className={`
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-24
                    w-24
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    blur-2xl
                    transition-all
                    duration-300
                    ${
                                        isSelected
                                            ? "bg-cyan-400/20"
                                            : "bg-blue-500/10 group-hover:bg-cyan-400/15"
                                    }
                  `}
                                />


                                {/* Drink number */}

                                <div
                                    className={`
                    absolute
                    left-2
                    top-2
                    z-20
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-lg
                    border
                    font-mono
                    text-[9px]
                    font-black
                    transition-all
                    ${
                                        isSelected
                                            ? `
                          border-cyan-300/50
                          bg-cyan-400
                          text-[#031018]
                          shadow-[0_0_15px_rgba(0,240,255,.5)]
                        `
                                            : `
                          border-purple-400/25
                          bg-gradient-to-br
                          from-indigo-500
                          to-purple-600
                          text-white
                        `
                                    }
                  `}
                                >
                                    {drink.numBadge}
                                </div>


                                {/* Selected check */}

                                {isSelected && (
                                    <div
                                        className="
                      absolute
                      right-2
                      top-2
                      z-20
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-green-400
                      text-[#031018]
                      shadow-[0_0_15px_rgba(0,255,136,.55)]
                    "
                                    >
                                        <Check size={13} strokeWidth={3} />
                                    </div>
                                )}


                                {/* Image */}

                                <img
                                    src={drink.image}
                                    alt={drink.name}
                                    className="
                    relative
                    z-10
                    h-full
                    w-full
                    object-contain
                    p-2
                    drop-shadow-[0_10px_18px_rgba(0,0,0,.65)]
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                                />


                                {/* Bottom image fade */}

                                <div
                                    className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    z-20
                    h-12
                    bg-gradient-to-t
                    from-[#050b14]
                    to-transparent
                  "
                                />

                            </div>


                            {/* =================================================
                  DRINK INFO
              ================================================= */}

                            <div className="px-1 pt-3">

                                <div className="flex items-start justify-between gap-2">

                                    <h3
                                        className={`
                      truncate
                      font-[Outfit]
                      text-[13px]
                      font-extrabold
                      transition-colors
                      ${
                                            isSelected
                                                ? "text-cyan-300"
                                                : "text-white group-hover:text-cyan-300"
                                        }
                    `}
                                    >
                                        {drink.name}
                                    </h3>

                                    <ArrowUpRight
                                        size={13}
                                        className="
                      shrink-0
                      text-slate-700
                      transition-all
                      duration-200
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-cyan-400
                    "
                                    />

                                </div>


                                <p
                                    className="
                    mt-1
                    line-clamp-2
                    min-h-[28px]
                    text-[9px]
                    font-medium
                    leading-4
                    text-slate-500
                  "
                                >
                                    {drink.ingredientsSummary}
                                </p>

                            </div>


                            {/* =================================================
                  PRICE / TIME
              ================================================= */}

                            <div
                                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/[0.06]
                  px-1
                  pt-2.5
                "
                            >

                                {/* Price */}

                                <div>

                                    <p className="text-[7px] uppercase tracking-wider text-slate-600">
                                        Price
                                    </p>

                                    <p
                                        className={`
                      mt-0.5
                      font-mono
                      text-[11px]
                      font-bold
                      ${
                                            isSelected
                                                ? "text-cyan-300"
                                                : "text-white"
                                        }
                    `}
                                    >
                                        LKR {drink.priceLkr.toFixed(2)}
                                    </p>

                                </div>


                                {/* Time */}

                                <div
                                    className="
                    flex
                    items-center
                    gap-1
                    rounded-lg
                    bg-white/[0.035]
                    px-2
                    py-1.5
                  "
                                >

                                    <Clock
                                        size={10}
                                        className="text-cyan-400"
                                    />

                                    <span className="text-[8px] font-medium text-slate-400">
                    {drink.prepTime}
                  </span>

                                </div>

                            </div>


                            {/* =================================================
                  SELECT BUTTON
              ================================================= */}

                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setSelectedDrink(drink);
                                }}
                                className={`
                  mt-2.5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-1.5
                  rounded-xl
                  py-2
                  text-[9px]
                  font-black
                  uppercase
                  tracking-wider
                  transition-all
                  duration-200
                  ${
                                    isSelected
                                        ? `
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-500
                        text-[#031018]
                        shadow-[0_0_18px_rgba(0,210,255,.35)]
                      `
                                        : `
                        border
                        border-cyan-400/15
                        bg-cyan-400/[0.04]
                        text-cyan-300
                        hover:border-cyan-400/35
                        hover:bg-cyan-400/[0.10]
                        hover:shadow-[0_0_15px_rgba(0,210,255,.15)]
                      `
                                }
                `}
                            >

                                {isSelected && (
                                    <Check size={12} strokeWidth={3} />
                                )}

                                {isSelected
                                    ? "Selected"
                                    : "Select Drink"}

                            </button>

                        </article>

                    );
                })}

            </div>

        </section>
    );
};