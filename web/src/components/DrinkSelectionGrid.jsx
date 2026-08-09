import React from "react";
import { ArrowUpRight, Check, Clock, Droplets, GlassWater, Sparkles } from "lucide-react";
import { useBartender } from "../context/BartenderContext";

export const DrinkSelectionGrid = () => {
  const { drinks, selectedDrink, setSelectedDrink } = useBartender();

  return (
    <section id="drink-selection-section" className="py-2">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white">
              <Sparkles size={10} className="text-[#ffd400]" /> 01 / Menu
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Curated recipes
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-black md:text-3xl">
            Pick your <span className="text-[#e6392f]">drink.</span>
          </h2>
          <p className="mt-1.5 max-w-xl text-xs leading-5 text-neutral-500">
            Browse the full recipe library and see every ingredient before you send a drink to the robotic dispenser.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="rounded-full border border-black/10 bg-white px-3.5 py-2 font-mono text-[9px] font-bold text-neutral-500 shadow-sm">
            {drinks.length} RECIPES
          </div>
          <div className="rounded-full bg-[#ffd400] px-3.5 py-2 text-[9px] font-black uppercase tracking-wider text-black">
            Live menu
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {drinks.map((drink) => {
          const selected = selectedDrink?.id === drink.id;
          const totalMl = drink.volumesMl.reduce((a, b) => a + b, 0);
          const ingredients = drink.ingredientsDetailed || [];

          return (
            <article
              key={drink.id}
              onClick={() => setSelectedDrink(drink)}
              className={`group relative cursor-pointer overflow-hidden rounded-[24px] border bg-white p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)] ${
                selected ? "border-black ring-2 ring-[#ffd400]/70" : "border-black/10"
              }`}
            >
              <div className="relative h-52 overflow-hidden rounded-[19px] bg-[#f1efe8]">
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black px-2.5 py-1 text-[8px] font-black uppercase tracking-wider text-white">
                  <span className="text-[#ffd400]">#{String(drink.numBadge).padStart(2, "0")}</span>
                  {drink.category}
                </div>

                {selected && (
                  <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#ffd400] text-black shadow-md">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}

                {drink.popular && (
                  <span className="absolute bottom-3 left-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[8px] font-black uppercase tracking-wider text-black backdrop-blur">
                    Popular
                  </span>
                )}

                <img
                  src={drink.image}
                  alt={drink.name}
                  className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="px-2.5 pb-2 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black tracking-tight text-black">{drink.name}</h3>
                    <p className="mt-1 text-[10px] leading-4 text-neutral-500">
                      {drink.ingredientsSummary}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={17}
                    className="mt-0.5 shrink-0 text-neutral-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ingredients.map((item) => (
                    <span
                      key={`${drink.id}-${item.name}`}
                      className="rounded-full border border-black/8 bg-[#f7f6f2] px-2.5 py-1 text-[8px] font-bold text-neutral-600"
                    >
                      {item.name} · {item.amount}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/8 pt-3">
                  <div className="flex items-center gap-3 text-[9px] font-bold text-neutral-500">
                    <span className="inline-flex items-center gap-1">
                      <Droplets size={11} /> {totalMl} ml
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} /> {drink.prepTime}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-black text-black">
                    LKR {drink.priceLkr.toFixed(0)}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDrink(drink);
                  }}
                  className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[9px] font-black uppercase tracking-wider transition-all ${
                    selected
                      ? "bg-black text-[#ffd400]"
                      : "bg-[#ffd400] text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {selected ? <Check size={12} strokeWidth={3} /> : <GlassWater size={12} />}
                  {selected ? "Selected" : "Select drink"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
