import React from "react";
import {
  Snowflake,
  Droplet,
  Plus,
  Check,
  GlassWater,
} from "lucide-react";

import { useBartender } from "../context/BartenderContext";

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
      <section className="modern-card p-5">

        <div className="mb-5 border-b border-black/10 pb-4">

        <span className="badge-yellow">
          02 / CONFIGURE
        </span>

          <h3 className="mt-3 heading-md">
            CUSTOMIZE
            <span className="text-[#e6392f]">
            {" "}YOUR DRINK
          </span>
          </h3>

          <p className="mt-2 text-[10px] text-slate-500">
            Configure preparation parameters before
            sending the recipe to the robot.
          </p>

        </div>


        {/* ICE */}

        <div className="mb-5">

          <div className="mb-2 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Snowflake size={15} />

              <span className="text-[10px] font-bold">
              Ice Level
            </span>

            </div>

            <span className="font-mono text-[9px] font-bold">
            {iceLevelVal}%
          </span>

          </div>

          <input
              type="range"
              min="0"
              max="100"
              value={iceLevelVal}
              onChange={(e) =>
                  setIceLevelVal(
                      parseInt(e.target.value)
                  )
              }
          />

        </div>


        {/* SWEETNESS */}

        <div className="mb-6">

          <div className="mb-2 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Droplet size={15} />

              <span className="text-[10px] font-bold">
              Sweetness
            </span>

            </div>

            <span className="font-mono text-[9px] font-bold">
            {sweetnessVal}%
          </span>

          </div>

          <input
              type="range"
              min="0"
              max="100"
              value={sweetnessVal}
              onChange={(e) =>
                  setSweetnessVal(
                      parseInt(e.target.value)
                  )
              }
          />

        </div>


        {/* CUP */}

        <div className="mb-6">

          <div className="mb-3 flex items-center gap-2">

            <GlassWater size={14} />

            <span className="text-[10px] font-bold">
            Cup Size
          </span>

          </div>


          <div className="grid grid-cols-3 gap-2">

            {[
              {
                size: "Small",
                ml: "250 ML",
                height: "h-4",
              },
              {
                size: "Medium",
                ml: "350 ML",
                height: "h-6",
              },
              {
                size: "Large",
                ml: "500 ML",
                height: "h-8",
              },
            ].map((item) => {

              const selected =
                  cupSize === item.size;

              return (
                  <button
                      key={item.size}
                      onClick={() =>
                          setCupSize(item.size)
                      }
                      className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  py-3
                  transition-all
                  ${
                          selected
                              ? `
                        border-black
                        bg-black
                        text-[#f5c400]
                      `
                              : `
                        border-black/10
                        bg-white/40
                        hover:border-black/30
                      `
                      }
                `}
                  >

                    <div
                        className={`
                    w-4
                    rounded-t
                    border
                    ${
                            selected
                                ? "border-[#f5c400]"
                                : "border-black"
                        }
                    ${item.height}
                  `}
                    />

                    <span className="mt-2 text-[9px] font-bold">
                  {item.size}
                </span>

                    <span className="mt-0.5 font-mono text-[7px] opacity-50">
                  {item.ml}
                </span>

                  </button>
              );
            })}

          </div>

        </div>


        {/* EXTRAS */}

        <div>

          <div className="mb-3 flex items-center justify-between">

          <span className="text-[10px] font-bold">
            Extra Ingredients
          </span>

            <span className="font-mono text-[7px] text-slate-500">
            OPTIONAL
          </span>

          </div>


          <div className="space-y-2">

            {extraOptions.map((opt) => {

              const selected =
                  selectedExtras.some(
                      (e) => e.name === opt.name
                  );

              return (
                  <button
                      key={opt.name}
                      onClick={() =>
                          toggleExtra(opt)
                      }
                      className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-3
                  text-left
                  transition-all
                  ${
                          selected
                              ? `
                        border-black
                        bg-[#f5c400]
                      `
                              : `
                        border-black/10
                        bg-white/40
                        hover:border-black/30
                      `
                      }
                `}
                  >

                    <div>

                      <p className="text-[9px] font-bold">
                        {opt.name}
                      </p>

                      <p className="mt-0.5 font-mono text-[8px] opacity-50">
                        + LKR {opt.priceLkr}
                      </p>

                    </div>

                    <div
                        className={`
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    ${
                            selected
                                ? "bg-black text-[#f5c400]"
                                : "bg-black/5 text-black"
                        }
                  `}
                    >
                      {selected ? (
                          <Check size={12} />
                      ) : (
                          <Plus size={12} />
                      )}
                    </div>

                  </button>
              );
            })}

          </div>

        </div>

      </section>
  );
};