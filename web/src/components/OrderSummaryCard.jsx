import React from "react";
import { useBartender } from "../context/BartenderContext";
import {
  ShoppingBag,
  Clock,
  Check,
  Receipt,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const OrderSummaryCard = () => {
  const {
    selectedDrink,
    calculateTotalPrice,
    handlePlaceOrder,
    machineState,
  } = useBartender();

  const totalPriceLkr = calculateTotalPrice(
      selectedDrink.priceLkr
  );

  const isPreparing = machineState === "PREPARING";

  return (
      <section
          className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-gradient-to-br
        from-[#0b1424]/95
        via-[#07101d]/95
        to-[#050a13]/95
        p-4
        shadow-[0_20px_50px_rgba(0,0,0,.4)]
        backdrop-blur-2xl
      "
      >

        {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

        <div
            className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-cyan-400/[0.07]
          blur-[65px]
        "
        />

        <div
            className="
          pointer-events-none
          absolute
          -bottom-20
          left-1/2
          h-40
          w-40
          -translate-x-1/2
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
            "
            >
              <Receipt size={16} />
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
                Order Summary
              </h3>

              <p className="mt-0.5 text-[9px] text-slate-500">
                Review your beverage before dispensing
              </p>

            </div>

          </div>


          {/* Order status */}

          <div
              className="
            flex
            items-center
            gap-1.5
            rounded-full
            border
            border-green-400/15
            bg-green-400/[0.05]
            px-2.5
            py-1.5
          "
          >

          <span
              className="
              h-1.5
              w-1.5
              rounded-full
              bg-green-400
              shadow-[0_0_8px_rgba(0,255,136,.8)]
            "
          />

            <span
                className="
              text-[8px]
              font-bold
              uppercase
              tracking-wider
              text-green-400
            "
            >
            Ready
          </span>

          </div>

        </div>


        {/* =====================================================
          SELECTED DRINK
      ===================================================== */}

        <div
            className="
          relative
          z-10
          overflow-hidden
          rounded-xl
          border
          border-cyan-400/10
          bg-gradient-to-r
          from-cyan-400/[0.05]
          to-blue-500/[0.03]
          p-3
        "
        >

          <div className="flex items-center gap-3">

            {/* Drink image */}

            <div
                className="
              relative
              flex
              h-[68px]
              w-[68px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-white/[0.07]
              bg-[#030811]
            "
            >

              <div
                  className="
                absolute
                h-10
                w-10
                rounded-full
                bg-cyan-400/10
                blur-xl
              "
              />

              <img
                  src={selectedDrink.image}
                  alt={selectedDrink.name}
                  className="
                relative
                z-10
                h-full
                w-full
                object-contain
                p-1
                drop-shadow-[0_5px_12px_rgba(0,240,255,.25)]
              "
              />

            </div>


            {/* Drink information */}

            <div className="min-w-0 flex-1">

              <div className="flex items-start justify-between gap-2">

                <div className="min-w-0">

                  <p
                      className="
                    mb-1
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-cyan-500
                  "
                  >
                    Selected Beverage
                  </p>

                  <h4
                      className="
                    truncate
                    font-[Outfit]
                    text-base
                    font-extrabold
                    text-white
                  "
                  >
                    {selectedDrink.name}
                  </h4>

                </div>

                <div
                    className="
                  shrink-0
                  rounded-lg
                  border
                  border-cyan-400/10
                  bg-cyan-400/[0.04]
                  px-2
                  py-1.5
                  font-mono
                  text-[10px]
                  font-bold
                  text-cyan-300
                "
                >
                  LKR {selectedDrink.priceLkr.toFixed(2)}
                </div>

              </div>

              <div className="mt-2 flex items-center gap-3">

              <span
                  className="
                  flex
                  items-center
                  gap-1
                  text-[8px]
                  text-slate-500
                "
              >
                <Clock
                    size={10}
                    className="text-cyan-400"
                />

                {selectedDrink.prepTime}
              </span>

                <span className="text-slate-700">
                •
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
                <Sparkles
                    size={9}
                    className="text-purple-400"
                />

                Premium
              </span>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
          INGREDIENTS
      ===================================================== */}

        <div className="relative z-10 mt-4">

          <div className="mb-2 flex items-center justify-between">

          <span
              className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            Ingredients
          </span>

            <span className="font-mono text-[8px] text-slate-600">
            {selectedDrink.ingredientsDetailed.length} ITEMS
          </span>

          </div>


          <div
              className="
            overflow-hidden
            rounded-xl
            border
            border-white/[0.06]
            bg-[#030811]/70
          "
          >

            {selectedDrink.ingredientsDetailed.map(
                (ing, idx) => (

                    <div
                        key={idx}
                        className={`
                  flex
                  items-center
                  justify-between
                  px-3
                  py-2
                  ${
                            idx !==
                            selectedDrink.ingredientsDetailed.length - 1
                                ? "border-b border-white/[0.04]"
                                : ""
                        }
                `}
                    >

                      <div className="flex items-center gap-2">

                  <span
                      className="
                      flex
                      h-4
                      w-4
                      items-center
                      justify-center
                      rounded-md
                      bg-cyan-400/[0.06]
                      text-[7px]
                      text-cyan-500
                    "
                  >
                    {idx + 1}
                  </span>

                        <span
                            className="
                      text-[9px]
                      font-medium
                      text-slate-400
                    "
                        >
                    {ing.name}
                  </span>

                      </div>

                      <span
                          className="
                    font-mono
                    text-[9px]
                    font-bold
                    text-cyan-400
                  "
                      >
                  {ing.amount}
                </span>

                    </div>

                )
            )}

          </div>

        </div>


        {/* =====================================================
          PREPARATION TIME
      ===================================================== */}

        <div
            className="
          relative
          z-10
          mt-3
          flex
          items-center
          justify-between
          rounded-xl
          border
          border-white/[0.05]
          bg-white/[0.02]
          px-3
          py-2.5
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
              bg-blue-400/[0.07]
              text-blue-300
            "
            >
              <Clock size={13} />
            </div>

            <div>

              <p className="text-[9px] font-bold text-slate-300">
                Preparation Time
              </p>

              <p className="text-[7px] text-slate-600">
                Estimated dispensing time
              </p>

            </div>

          </div>

          <span
              className="
            font-mono
            text-[10px]
            font-bold
            text-cyan-400
          "
          >
          {selectedDrink.prepTime}
        </span>

        </div>


        {/* =====================================================
          TOTAL
      ===================================================== */}

        <div
            className="
          relative
          z-10
          mt-4
          rounded-xl
          border
          border-cyan-400/10
          bg-gradient-to-r
          from-cyan-400/[0.04]
          to-blue-500/[0.04]
          p-3
        "
        >

          <div className="flex items-end justify-between">

            <div>

              <p
                  className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-slate-500
              "
              >
                Total Amount
              </p>

              <p className="mt-1 text-[8px] text-slate-600">
                Including selected extras
              </p>

            </div>

            <div className="text-right">

            <span
                className="
                font-mono
                text-xl
                font-black
                tracking-tight
                text-white
              "
            >
              LKR {totalPriceLkr.toFixed(2)}
            </span>

            </div>

          </div>

        </div>


        {/* =====================================================
          PLACE ORDER BUTTON
      ===================================================== */}

        <button
            onClick={() =>
                handlePlaceOrder(selectedDrink)
            }
            disabled={isPreparing}
            className={`
          group
          relative
          z-10
          mt-3
          flex
          w-full
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-xl
          py-3
          text-[10px]
          font-black
          uppercase
          tracking-[0.08em]
          transition-all
          duration-300
          ${
                isPreparing
                    ? `
                cursor-not-allowed
                border
                border-slate-700
                bg-slate-800
                text-slate-500
              `
                    : `
                border
                border-cyan-300/40
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                text-[#031018]
                shadow-[0_0_25px_rgba(0,210,255,.3)]
                hover:-translate-y-0.5
                hover:shadow-[0_0_35px_rgba(0,210,255,.55)]
              `
            }
        `}
        >

          {!isPreparing && (
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
          )}

          {isPreparing ? (
              <>
            <span
                className="
                h-3
                w-3
                animate-spin
                rounded-full
                border-2
                border-slate-500
                border-t-transparent
              "
            />

                Processing Order...
              </>
          ) : (
              <>
                <ShoppingBag
                    size={14}
                    className="relative"
                />

                <span className="relative">
              Place Order
            </span>

                <ArrowRight
                    size={13}
                    className="
                relative
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
                />
              </>
          )}

        </button>


        {/* Bottom security info */}

        <div
            className="
          relative
          z-10
          mt-3
          flex
          items-center
          justify-center
          gap-2
        "
        >

          <Check
              size={10}
              className="text-green-400"
          />

          <span className="text-[7px] text-slate-600">
          Precision dispensing • Safe cup detection • ESP32 controlled
        </span>

        </div>

      </section>
  );
};