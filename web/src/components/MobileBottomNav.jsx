import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Home, GlassWater, ShoppingBag, Activity, User } from 'lucide-react';

export const MobileBottomNav = () => {
  const { mobileTab, setMobileTab, setActiveScreen } = useBartender();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, action: () => { setMobileTab('home'); setActiveScreen('main'); } },
    { id: 'drinks', label: 'Drinks', icon: GlassWater, action: () => { setMobileTab('drinks'); setActiveScreen('main'); } },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, action: () => { setMobileTab('orders'); setActiveScreen('main'); } },
    { id: 'status', label: 'Status', icon: Activity, action: () => { setMobileTab('status'); setActiveScreen('admin'); } },
    { id: 'profile', label: 'Profile', icon: User, action: () => { setMobileTab('profile'); setActiveScreen('main'); } },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#050811]/90 backdrop-blur-xl border-t border-cyan-500/20 px-4 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = mobileTab === item.id;

        return (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              isActive
                ? 'text-[#00f0ff] scale-105 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
