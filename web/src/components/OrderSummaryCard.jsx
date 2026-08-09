import React from "react";

import {
  ShoppingBag,
  Clock,
  Check,
  ArrowUpRight,
} from "lucide-react";

import { useBartender } from "../context/BartenderContext";

export const OrderSummaryCard = () => {
  const {
    selectedDrink,
    calculateTotalPrice,
    handlePlaceOrder,
    machineState,
  } = useBartender();

  const totalPriceLkr =
      calculateTotalPrice(
          selectedDrink.priceLkr
      );

  const preparing =
      machineState === "PREPARING";

  return (
      <section className="black-card p-5">

        {/* HEADER */}

        <div className="mb-5 border-b border-white/10 pb-4">

          <div className="flex items-center justify-between">

          <span className="badge-yellow">
            03 / ORDER
          </span>

            <span className="flex items-center gap-1.5 font-mono text-[7px] text-white/50">
            <span className="status-online" />
            SYSTEM READY
          </span>

          </div>

          <h3 className="mt-4 heading-md text-white">
            ORDER
            <span className="text-[#f5c400]">
            {" "}SUMMARY
          </span>
          </h3>

        </div>


        {/* SELECTED DRINK */}

        <div className="rounded-2xl bg-white/[0.06] p-3">

          <div className="flex items-center gap-3">

            <div
                className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#f4f1e8]
            "
            >

              <img
                  src={selectedDrink.image}
                  alt={selectedDrink.name}
                  className="h-full w-full object-contain p-1"
              />

            </div>


            <div className="min-w-0 flex-1">

              <p className="font-mono text-[7px] uppercase text-white/40">
                Selected Beverage
              </p>

              <h4 className="mt-1 truncate font-[Space_Grotesk] text-sm font-bold text-white">
                {selectedDrink.name}
              </h4>

              <p className="mt-1 font-mono text-[9px] font-bold text-[#f5c400]">
                LKR {selectedDrink.priceLkr.toFixed(2)}
              </p>

            </div>

          </div>

        </div>


        {/* INGREDIENTS */}

        <div className="mt-5">

          <div className="mb-3 flex justify-between">

          <span className="text-[9px] font-bold text-white">
            INGREDIENTS
          </span>

            <span className="font-mono text-[7px] text-white/30">
            RECIPE
          </span>

          </div>


          <div className="space-y-1">

            {selectedDrink.ingredientsDetailed.map(
                (ing, idx) => (

                    <div
                        key={idx}
                        className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/[0.06]
                  py-2
                "
                    >

                <span className="flex items-center gap-2 text-[9px] text-white/60">

                  <span className="font-mono text-[7px] text-[#f5c400]">
                    0{idx + 1}
                  </span>

                  {ing.name}

                </span>

                      <span className="font-mono text-[8px] font-bold text-white">
                  {ing.amount}
                </span>

                    </div>

                )
            )}

          </div>

        </div>


        {/* TIME */}

        <div
            className="
          mt-4
          flex
          items-center
          justify-between
          rounded-xl
          bg-white/[0.05]
          p-3
        "
        >

          <div className="flex items-center gap-2">

            <Clock
                size={13}
                className="text-[#f5c400]"
            />

            <span className="text-[9px] text-white/60">
            Preparation Time
          </span>

          </div>

          <span className="font-mono text-[9px] font-bold text-white">
          {selectedDrink.prepTime}
        </span>

        </div>


        {/* TOTAL */}

        <div className="mt-5 border-t border-white/10 pt-5">

          <div className="flex items-end justify-between">

            <div>

              <p className="font-mono text-[7px] uppercase text-white/40">
                Total
              </p>

              <p className="mt-1 text-[8px] text-white/30">
                Final order value
              </p>

            </div>

            <p className="font-[Space_Grotesk] text-2xl font-bold text-[#f5c400]">
              LKR {totalPriceLkr.toFixed(2)}
            </p>

          </div>


          <button
              disabled={preparing}
              onClick={() =>
                  handlePlaceOrder(selectedDrink)
              }
              className={`
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            py-3.5
            text-[10px]
            font-black
            transition-all
            ${
                  preparing
                      ? `
                  bg-white/10
                  text-white/30
                `
                      : `
                  bg-[#f5c400]
                  text-black
                  hover:bg-white
                `
              }
          `}
          >

            {preparing ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  PREPARING...
                </>
            ) : (
                <>
                  <ShoppingBag size={14} />

                  PLACE ORDER

                  <ArrowUpRight size={13} />
                </>
            )}

          </button>

        </div>


        {/* FOOTER */}

        <div className="mt-4 flex items-center justify-center gap-2">

          <Check
              size={10}
              className="text-[#f5c400]"
          />

          <span className="font-mono text-[7px] text-white/30">
          ESP32 CONTROLLED • PRECISION DISPENSE
        </span>

        </div>

      </section>
  );
};