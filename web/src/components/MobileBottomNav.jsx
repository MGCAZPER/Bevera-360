import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Home, GlassWater, Layers, Activity, LayoutDashboard } from 'lucide-react';

export const MobileBottomNav = () => {
  const { mobileTab, setMobileTab, setActiveScreen } = useBartender();

  const navItems = [
    { id: 'home',    label: 'Home',   icon: Home,            action: () => { setMobileTab('home');    setActiveScreen('main');  } },
    { id: 'drinks',  label: 'Menu',   icon: GlassWater,      action: () => { setMobileTab('drinks');  setActiveScreen('customer_menu'); } },
    { id: 'queue',   label: 'Queue',  icon: Layers,          action: () => { setMobileTab('queue');   setActiveScreen('queue'); } },
    { id: 'robo',    label: 'Robo Hub',icon: LayoutDashboard, action: () => { setMobileTab('robo');    setActiveScreen('robo_dashboard'); } },
    { id: 'status',  label: 'Admin',  icon: Activity,        action: () => { setMobileTab('status');  setActiveScreen('admin'); } },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#f4f1e8]/95 backdrop-blur-xl border-t border-black/10 px-4 py-2 flex items-center justify-around shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = mobileTab === item.id;
        return (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              isActive
                ? 'text-[#111] scale-105'
                : 'text-[#77756e] hover:text-[#111]'
            }`}
          >
            <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-[#f5c400]' : 'bg-transparent'}`}>
              <Icon size={18} />
            </div>
            <span className="text-[8px] font-black uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

