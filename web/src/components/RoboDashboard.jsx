import React, { useState } from 'react';
import { useBartender } from '../context/BartenderContext';
import { Heart, ShoppingBag, Trash2, CheckCircle2, Clock, ChevronRight, Plus, Minus, GlassWater, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

export const RoboDashboard = () => {
  const { 
    drinks, 
    selectedDrinkDetail, 
    setSelectedDrinkDetail, 
    cart, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    checkoutCart,
    currentOrderId,
    currentOrderTime,
    currentTimelineStep,
    machineState 
  } = useBartender();

  const [inspectQty, setInspectQty] = useState(1);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (drinkId, e) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [drinkId]: !prev[drinkId] }));
  };

  // Subtotal calculations
  const subtotalLkr = cart.reduce((sum, item) => sum + (item.priceLkr * item.quantity), 0);
  const feeLkr = cart.length > 0 ? 100 : 0;
  const totalLkr = subtotalLkr + feeLkr;

  const trackSteps = [
    { title: 'Order Received', desc: 'Recipe registered in ESP32 queue', time: currentOrderTime, done: currentTimelineStep >= 0 },
    { title: 'Preparing', desc: 'Verifying IR cup interlock & liquid levels', time: '02:16 PM', done: currentTimelineStep >= 1 },
    { title: 'Mixing', desc: 'Stirrer motor blending ingredients', time: '', done: currentTimelineStep >= 2 },
    { title: 'Dispensing', desc: '5-Relay pumps active pouring liquids', time: '', done: currentTimelineStep >= 3 },
    { title: 'Ready', desc: 'Drink complete! Pick up your cup', time: '', done: currentTimelineStep >= 4 }
  ];

  const currentDetail = selectedDrinkDetail || drinks[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 pt-2">
      
      {/* 1. OUR DRINKS Catalog Panel (4 Cols) */}
      <div className="xl:col-span-4 glass-panel p-5 space-y-4 flex flex-col justify-between border border-slate-800/90 shadow-2xl">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <GlassWater className="text-[#65c466]" size={20} />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">PRESET MENU CATALOG</h3>
            </div>
            <span className="text-[11px] font-extrabold text-[#65c466] bg-[#65c466]/10 px-2.5 py-1 rounded-full border border-[#65c466]/30">
              {drinks.length} Signature Drinks
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {drinks.map((drink) => {
              const isSelected = currentDetail?.id === drink.id;
              return (
                <div
                  key={drink.id}
                  onClick={() => setSelectedDrinkDetail(drink)}
                  className={`p-3.5 rounded-2xl flex flex-col justify-between relative group cursor-pointer border transition-all duration-300 ${
                    isSelected
                      ? 'border-[#65c466] bg-[#162033] shadow-lg shadow-[#65c466]/15 scale-[1.02]'
                      : 'bg-[#0b0f19] border-slate-800/80 hover:border-slate-700 hover:bg-[#111726]'
                  }`}
                >
                  {/* Heart Favorite */}
                  <button
                    onClick={(e) => toggleFavorite(drink.id, e)}
                    className="absolute top-2.5 right-2.5 p-1 text-slate-500 hover:text-rose-500 transition-colors z-10"
                  >
                    <Heart size={14} className={favorites[drink.id] ? 'fill-rose-500 text-rose-500' : ''} />
                  </button>

                  {/* Photo */}
                  <div className="w-full h-24 rounded-xl overflow-hidden mb-2 bg-[#070a10] flex items-center justify-center p-1 relative">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="h-full object-contain group-hover:scale-110 transition-transform duration-500 filter drop-shadow-md"
                    />
                    {drink.popular && (
                      <span className="absolute bottom-1 left-1 text-[8px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded">
                        POPULAR
                      </span>
                    )}
                  </div>

                  {/* Info & Button */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-white group-hover:text-[#65c466] transition-colors truncate">
                      {drink.name}
                    </h4>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-mono font-extrabold text-[#65c466]">LKR {drink.priceLkr}</p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {drink.volumesMl.reduce((a, b) => a + b, 0)}ml
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(drink, 1);
                      }}
                      className="w-full btn-green-outline py-1 text-[10px] mt-1"
                    >
                      + ADD TO CART
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Selected Drink Detail Inspector Card (3 Cols) */}
      <div className="xl:col-span-3 glass-panel p-5 space-y-4 flex flex-col justify-between border border-slate-800/90 shadow-2xl">
        <div className="space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              DRINK SPECIFICATION
            </span>
            <span className="text-[10px] font-bold text-[#65c466] uppercase bg-[#65c466]/10 px-2 py-0.5 rounded">
              {currentDetail.category}
            </span>
          </div>

          {/* Image & Title */}
          <div className="space-y-3">
            <div className="w-full h-44 rounded-2xl bg-[#070a10] border border-slate-800 p-2 flex items-center justify-center overflow-hidden relative shadow-inner">
              <img
                src={currentDetail.image}
                alt={currentDetail.name}
                className="h-full object-contain filter drop-shadow-xl"
              />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">{currentDetail.name}</h3>
              <p className="text-base font-mono font-extrabold text-[#65c466]">LKR {currentDetail.priceLkr}</p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {currentDetail.description}
            </p>
          </div>

          {/* Liquid Ratio Breakdown Bars */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Ingredients Breakdown</span>
              <span className="text-[10px] font-mono text-slate-500">Stirrer: {currentDetail.stirrerSec}s</span>
            </h4>

            <div className="space-y-2 text-xs">
              {currentDetail.ingredients.map((ing, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ing.color }} />
                      <span className="text-slate-200 font-medium">{ing.name}</span>
                    </div>
                    <span className="font-mono text-slate-400">{ing.ml} mL</span>
                  </div>

                  {/* Ratio Fill Bar */}
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      style={{
                        width: `${Math.min(100, (ing.ml / 100) * 100)}%`,
                        backgroundColor: ing.color
                      }}
                      className="h-full rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Quantity & Add Button */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">Serving Quantity</span>
            <div className="flex items-center gap-2 bg-[#070a10] border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setInspectQty(Math.max(1, inspectQty - 1))}
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <Minus size={12} />
              </button>
              <span className="font-bold text-xs text-white px-2 font-mono">{inspectQty}</span>
              <button
                onClick={() => setInspectQty(inspectQty + 1)}
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          <button
            onClick={() => addToCart(currentDetail, inspectQty)}
            className="w-full btn-green text-xs"
          >
            <ShoppingBag size={15} />
            <span>ADD TO ORDER QUEUE</span>
          </button>
        </div>
      </div>

      {/* 3. YOUR CART Card (3 Cols) */}
      <div className="xl:col-span-3 glass-panel p-5 space-y-4 flex flex-col justify-between border border-slate-800/90 shadow-2xl">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-[#65c466]" size={20} />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">YOUR CART</h3>
            </div>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-slate-500 hover:text-rose-400 transition-colors" title="Clear Cart">
                <Trash2 size={16} />
              </button>
            )}
          </div>

          {/* Cart items list */}
          {cart.length === 0 ? (
            <div className="py-14 text-center text-slate-500 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                <ShoppingBag size={24} />
              </div>
              <p className="text-xs font-bold text-slate-300">Cart is Empty</p>
              <p className="text-[11px] text-slate-500">Select drinks from the menu catalog to order.</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="bg-[#070a10] p-2.5 rounded-xl border border-slate-800/90 flex items-center justify-between gap-2 shadow-inner">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-9 h-9 object-contain rounded-lg bg-slate-900 p-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-white truncate max-w-[95px]">{item.name}</h5>
                      <p className="text-[11px] font-mono font-extrabold text-[#65c466]">LKR {item.priceLkr}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-[#131a29] border border-slate-800 rounded-lg p-1">
                    <button onClick={() => updateCartQuantity(item.id, -1)} className="text-slate-400 hover:text-white p-0.5">
                      <Minus size={10} />
                    </button>
                    <span className="text-xs font-bold font-mono text-white px-1.5">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, 1)} className="text-slate-400 hover:text-white p-0.5">
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Checkout */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-mono text-slate-200">LKR {subtotalLkr}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Service / Hygiene Fee</span>
              <span className="font-mono text-slate-200">LKR {feeLkr}</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm pt-2 border-t border-slate-800/90">
              <span className="text-white">Total</span>
              <span className="text-[#65c466] font-mono">LKR {totalLkr}</span>
            </div>
          </div>

          <button
            onClick={checkoutCart}
            disabled={cart.length === 0}
            className="w-full btn-green text-xs flex items-center justify-center gap-2 py-3"
          >
            <span>DISPENSE ORDER NOW</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 4. TRACK YOUR ORDER Card (2 Cols) */}
      <div className="xl:col-span-2 glass-panel p-5 space-y-4 flex flex-col justify-between border border-slate-800/90 shadow-2xl">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">LIVE ORDER TRACKER</h3>
          </div>

          {/* Timeline steps */}
          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {trackSteps.map((step, idx) => (
              <div key={idx} className="relative space-y-0.5">
                {/* Node icon */}
                <div
                  className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-all ${
                    step.done 
                      ? 'bg-[#65c466] text-slate-950 shadow-md shadow-[#65c466]/40' 
                      : 'bg-slate-900 border border-slate-700 text-slate-600'
                  }`}
                >
                  {step.done ? '✓' : ''}
                </div>

                <div className="flex items-center justify-between">
                  <h5 className={`text-xs font-bold ${step.done ? 'text-[#65c466]' : 'text-slate-400'}`}>
                    {step.title}
                  </h5>
                  {step.time && <span className="text-[10px] text-slate-500 font-mono">{step.time}</span>}
                </div>
                {step.desc && <p className="text-[10px] text-slate-400 leading-tight">{step.desc}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 justify-center">
            <ShieldCheck size={14} className="text-[#65c466]" />
            <span>IR Interlock Safeguard</span>
          </div>
        </div>
      </div>

    </div>
  );
};
