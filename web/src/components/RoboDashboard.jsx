import React, { useState } from 'react';
import { useBartender } from '../context/BartenderContext';
import { Heart, ShoppingBag, Trash2, CheckCircle2, Clock, ChevronRight, Plus, Minus, GlassWater, ArrowLeft } from 'lucide-react';

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
    { title: 'Order Received', desc: '', time: currentOrderTime, done: currentTimelineStep >= 0 },
    { title: 'Preparing', desc: 'We are getting your ingredients ready', time: '02:16 PM', done: currentTimelineStep >= 1 },
    { title: 'Mixing', desc: 'Mixing your drink to perfection', time: '', done: currentTimelineStep >= 2 },
    { title: 'Dispensing', desc: 'Pouring your drink', time: '', done: currentTimelineStep >= 3 },
    { title: 'Ready', desc: 'Your drink is ready to enjoy!', time: '', done: currentTimelineStep >= 4 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 pt-2">
      
      {/* 1. OUR DRINKS Panel (4 Cols) */}
      <div className="xl:col-span-4 theme-card p-5 space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <GlassWater className="text-[#65c466]" size={18} />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">OUR DRINKS</h3>
            </div>
            <span className="text-xs text-slate-400 font-semibold">{drinks.length} Delicious Creations</span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {drinks.map((drink) => (
              <div
                key={drink.id}
                onClick={() => setSelectedDrinkDetail(drink)}
                className={`theme-card p-3 flex flex-col justify-between relative group cursor-pointer transition-all ${
                  selectedDrinkDetail.id === drink.id
                    ? 'border-[#65c466] bg-[#1a2436]'
                    : 'bg-[#101520] hover:border-slate-700'
                }`}
              >
                {/* Heart Favorite */}
                <button
                  onClick={(e) => toggleFavorite(drink.id, e)}
                  className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-500 transition-colors z-10"
                >
                  <Heart size={14} className={favorites[drink.id] ? 'fill-rose-500 text-rose-500' : ''} />
                </button>

                {/* Photo */}
                <div className="w-full h-24 rounded-xl overflow-hidden mb-2 bg-slate-900 flex items-center justify-center p-1">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info & Button */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-white group-hover:text-[#65c466] transition-colors truncate">
                    {drink.name}
                  </h4>
                  <p className="text-[11px] font-extrabold text-[#65c466]">LKR {drink.priceLkr}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(drink, 1);
                    }}
                    className="w-full btn-green-outline py-1 text-[10px]"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Selected Drink Detail Inspector Card (3 Cols) */}
      <div className="xl:col-span-3 theme-card p-5 space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedDrinkDetail(drinks[0])}
              className="text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1"
            >
              <ArrowLeft size={12} /> BACK
            </button>
          </div>

          {/* Large Image & Title */}
          <div className="space-y-3">
            <div className="w-full h-44 rounded-2xl bg-[#0d121c] border border-slate-800 p-2 flex items-center justify-center overflow-hidden">
              <img
                src={selectedDrinkDetail.image}
                alt={selectedDrinkDetail.name}
                className="h-full object-contain filter drop-shadow-lg"
              />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">{selectedDrinkDetail.name}</h3>
              <p className="text-base font-extrabold text-[#65c466]">LKR {selectedDrinkDetail.priceLkr}</p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {selectedDrinkDetail.description}
            </p>
          </div>

          {/* Ingredients list with colored dots */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300">Ingredients</h4>
            <div className="space-y-1.5 text-xs">
              {selectedDrinkDetail.ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ing.color }} />
                    <span className="text-slate-300 font-medium">{ing.name}</span>
                  </div>
                  <span className="font-mono text-slate-400">{ing.ml}ml</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Quantity & Add Button */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">Quantity</span>
            <div className="flex items-center gap-2 bg-[#0d121c] border border-slate-800 rounded-lg p-1">
              <button
                onClick={() => setInspectQty(Math.max(1, inspectQty - 1))}
                className="p-1 text-slate-400 hover:text-white"
              >
                <Minus size={12} />
              </button>
              <span className="font-bold text-xs text-white px-2">{inspectQty}</span>
              <button
                onClick={() => setInspectQty(inspectQty + 1)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          <button
            onClick={() => addToCart(selectedDrinkDetail, inspectQty)}
            className="w-full btn-green text-xs"
          >
            <ShoppingBag size={14} />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>

      {/* 3. YOUR CART Card (3 Cols) */}
      <div className="xl:col-span-3 theme-card p-5 space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-[#65c466]" size={18} />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">YOUR CART</h3>
            </div>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-slate-500 hover:text-rose-400 transition-colors">
                <Trash2 size={16} />
              </button>
            )}
          </div>

          {/* Cart items list */}
          {cart.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <ShoppingBag size={32} className="mx-auto text-slate-600" />
              <p className="text-xs font-bold text-slate-400">Cart is Empty</p>
              <p className="text-[11px]">Add drinks from menu to order.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="bg-[#0d121c] p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded-lg bg-slate-900 p-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-white truncate max-w-[100px]">{item.name}</h5>
                      <p className="text-[11px] font-bold text-[#65c466]">LKR {item.priceLkr}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#151c2a] border border-slate-800 rounded-lg p-1">
                    <button onClick={() => updateCartQuantity(item.id, -1)} className="text-slate-400 hover:text-white p-0.5">
                      <Minus size={10} />
                    </button>
                    <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
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
              <span>Delivery / Service Fee</span>
              <span className="font-mono text-slate-200">LKR {feeLkr}</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm pt-1 border-t border-slate-800/80">
              <span className="text-white">Total</span>
              <span className="text-[#65c466] font-mono">LKR {totalLkr}</span>
            </div>
          </div>

          <button
            onClick={checkoutCart}
            disabled={cart.length === 0}
            className="w-full btn-green text-xs flex items-center justify-center gap-2"
          >
            <span>PLACE ORDER</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 4. TRACK YOUR ORDER Card (2 Cols) */}
      <div className="xl:col-span-2 theme-card p-5 space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">TRACK YOUR ORDER</h3>
          </div>

          {/* Timeline steps */}
          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {trackSteps.map((step, idx) => (
              <div key={idx} className="relative space-y-0.5">
                {/* Node icon */}
                <div
                  className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] transition-all ${
                    step.done ? 'bg-[#65c466] text-slate-950 shadow-md shadow-[#65c466]/40' : 'bg-slate-900 border border-slate-700 text-slate-600'
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

        <button className="w-full btn-dark text-[11px] text-slate-300 py-2">
          VIEW ORDER HISTORY
        </button>
      </div>

    </div>
  );
};
