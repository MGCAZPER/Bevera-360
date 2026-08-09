import React from "react";
import {
    ArrowUpRight,
    Check,
    Clock,
} from "lucide-react";

import { useBartender } from "../context/BartenderContext";

export const DrinkSelectionGrid = () => {
    const {
        drinks,
        selectedDrink,
        setSelectedDrink,
    } = useBartender();

    return (
        <section
            id="drink-selection-section"
            className="py-4"
        >

            <div className="mb-6 flex items-end justify-between">

                <div>

                    <div className="mb-2 flex items-center gap-2">

            <span className="badge-black">
              01 / MENU
            </span>

                    </div>

                    <h2 className="heading-md">
                        SELECT YOUR
                        <span className="text-[#e6392f]">
              {" "}DRINK
            </span>
                    </h2>

                    <p className="mt-2 text-xs text-slate-500">
                        Choose a beverage to configure your
                        automated preparation.
                    </p>

                </div>

                <div
                    className="
            hidden
            rounded-full
            border
            border-black/10
            bg-white/50
            px-4
            py-2
            font-mono
            text-[8px]
            text-slate-500
            sm:block
          "
                >
                    {drinks.length} RECIPES AVAILABLE
                </div>

            </div>


            <div
                className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-5
        "
            >

                {drinks.map((drink) => {

                    const selected =
                        selectedDrink?.id === drink.id;

                    return (
                        <article
                            key={drink.id}
                            onClick={() =>
                                setSelectedDrink(drink)
                            }
                            className={`
                drink-card-modern
                group
                cursor-pointer
                p-2
                ${
                                selected
                                    ? "selected"
                                    : ""
                            }
              `}
                        >

                            {/* IMAGE */}

                            <div
                                className="
                  relative
                  flex
                  h-48
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[18px]
                  bg-[#ebe7dc]
                "
                            >

                                <div
                                    className="
                    absolute
                    left-3
                    top-3
                    z-10
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-black
                    font-mono
                    text-[9px]
                    font-bold
                    text-[#f5c400]
                  "
                                >
                                    {drink.numBadge}
                                </div>


                                {selected && (
                                    <div
                                        className="
                      absolute
                      right-3
                      top-3
                      z-10
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-[#f5c400]
                      text-black
                    "
                                    >
                                        <Check size={13} />
                                    </div>
                                )}


                                <img
                                    src={drink.image}
                                    alt={drink.name}
                                    className="
                    h-full
                    w-full
                    object-contain
                    p-4
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                                />

                            </div>


                            {/* CONTENT */}

                            <div className="p-2.5">

                                <div className="flex items-start justify-between gap-2">

                                    <h3
                                        className="
                      font-[Space_Grotesk]
                      text-sm
                      font-bold
                      text-black
                    "
                                    >
                                        {drink.name}
                                    </h3>

                                    <ArrowUpRight
                                        size={14}
                                        className="
                      shrink-0
                      text-slate-400
                      transition-all
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-black
                    "
                                    />

                                </div>

                                <p
                                    className="
                    mt-1
                    line-clamp-2
                    min-h-[32px]
                    text-[9px]
                    leading-4
                    text-slate-500
                  "
                                >
                                    {drink.ingredientsSummary}
                                </p>


                                <div
                                    className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    border-t
                    border-black/10
                    pt-3
                  "
                                >

                  <span
                      className="
                      font-mono
                      text-[11px]
                      font-bold
                    "
                  >
                    LKR {drink.priceLkr.toFixed(2)}
                  </span>

                                    <span
                                        className="
                      flex
                      items-center
                      gap-1
                      text-[8px]
                      text-slate-500
                    "
                                    >
                    <Clock size={10} />

                                        {drink.prepTime}
                  </span>

                                </div>


                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setSelectedDrink(drink);
                                    }}
                                    className={`
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-1.5
                    rounded-full
                    py-2.5
                    text-[9px]
                    font-bold
                    transition-all
                    ${
                                        selected
                                            ? `
                          bg-black
                          text-[#f5c400]
                        `
                                            : `
                          bg-[#f5c400]
                          text-black
                          hover:bg-black
                          hover:text-white
                        `
                                    }
                  `}
                                >

                                    {selected && (
                                        <Check size={12} />
                                    )}

                                    {selected
                                        ? "SELECTED"
                                        : "SELECT DRINK"}

                                </button>

                            </div>

                        </article>
                    );
                })}

            </div>
        </section>
    );
};