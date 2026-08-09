import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { HeroSection } from './HeroSection';
import { DrinkSelectionGrid } from './DrinkSelectionGrid';
import { CustomizationPanel } from './CustomizationPanel';
import { OrderSummaryCard } from './OrderSummaryCard';
import { MachineStatusPanel } from './MachineStatusPanel';
import { PreparationScreen } from './PreparationScreen';
import { CompletionScreen } from './CompletionScreen';
import { AdminDashboard } from './AdminDashboard';
import {
  Home, GlassWater, ShoppingBag, Activity, User, Search, Wifi, ShieldCheck, Settings, Info, HelpCircle, LogOut, CheckCircle2
} from 'lucide-react';

export const FigmaBoard = () => {
  const { drinks, tanks, recentOrders, setActiveScreen } = useBartender();

  return (
    <div className="space-y-10 pb-20 animate-fade-in bg-[#03050c] p-4 lg:p-6 rounded-3xl border border-cyan-500/20 shadow-2xl">
      
      {/* Top Figma Canvas Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">
            BEVERA-360 • HIGH FIDELITY UI/UX SPECIFICATION
          </span>
          <h1 className="text-2xl font-black text-white uppercase tracking-wider">
            Smart Robotic Bartender Presentation Canvas
          </h1>
        </div>

        <button
          onClick={() => setActiveScreen('main')}
          className="btn-neon-cyan text-xs font-black px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        >
          Launch Interactive Mode
        </button>
      </div>

      {/* SECTION 01: HOME / ORDER SCREEN */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-[#00f0ff] uppercase tracking-wider font-mono">
            01. HOME / ORDER SCREEN
          </span>
        </div>

        <div className="glass-panel p-4 border border-cyan-500/20 bg-[#050914] space-y-4">
          <HeroSection onStartOrdering={() => {}} />

          <DrinkSelectionGrid />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-7">
              <CustomizationPanel />
            </div>
            <div className="lg:col-span-5">
              <OrderSummaryCard />
            </div>
          </div>

          <MachineStatusPanel />
        </div>
      </div>

      {/* SECTION 02 & SECTION 03 GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SECTION 02: PREPARATION PROCESS SCREEN */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-sm font-black text-[#00f0ff] uppercase tracking-wider font-mono block">
            02. PREPARATION PROCESS SCREEN
          </span>
          <div className="glass-panel p-2 border border-cyan-500/20 bg-[#050914]">
            <PreparationScreen />
          </div>
        </div>

        {/* SECTION 03: DRINK READY SCREEN */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-sm font-black text-[#00ff88] uppercase tracking-wider font-mono block">
            03. DRINK READY SCREEN
          </span>
          <div className="glass-panel p-2 border border-[#00ff88]/30 bg-[#050914]">
            <CompletionScreen />
          </div>
        </div>

      </div>

      {/* SECTION 04: ADMIN DASHBOARD */}
      <div className="space-y-3">
        <span className="text-sm font-black text-[#00f0ff] uppercase tracking-wider font-mono block">
          04. ADMIN DASHBOARD
        </span>
        <div className="glass-panel p-4 border border-cyan-500/20 bg-[#050914]">
          <AdminDashboard />
        </div>
      </div>

      {/* SECTION 05: MOBILE APP VIEW */}
      <div className="space-y-4">
        <span className="text-sm font-black text-[#00f0ff] uppercase tracking-wider font-mono block">
          05. MOBILE APP VIEW
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Mobile Screen 1: Home */}
          <div className="glass-panel p-3 border border-slate-800 bg-[#050811] rounded-[30px] space-y-3 flex flex-col justify-between h-[480px] shadow-xl">
            <div className="space-y-3 text-center">
              <div className="w-16 h-3 bg-slate-900 mx-auto rounded-full" />
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold px-1">
                <span>ROBOTIC BARTENDER</span>
                <span className="text-[#00ff88]">ONLINE</span>
              </div>
              <div className="space-y-1 pt-2">
                <h4 className="text-sm font-black text-white">Welcome!</h4>
                <p className="text-[10px] text-slate-400">Ready to serve you.</p>
              </div>
              <div className="h-32 rounded-xl bg-slate-950 p-2 flex items-center justify-center">
                <img src="/images/robo_machine.png" alt="Machine" className="h-full object-contain" />
              </div>
              <button className="w-full btn-neon-cyan py-2 text-[10px] font-black rounded-lg">
                Order Now
              </button>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="flex items-center justify-around border-t border-slate-800 pt-2 text-slate-400 text-[9px]">
              <div className="flex flex-col items-center text-[#00f0ff]"><Home size={12} /><span>Home</span></div>
              <div className="flex flex-col items-center"><GlassWater size={12} /><span>Drinks</span></div>
              <div className="flex flex-col items-center"><ShoppingBag size={12} /><span>Orders</span></div>
              <div className="flex flex-col items-center"><Activity size={12} /><span>Status</span></div>
              <div className="flex flex-col items-center"><User size={12} /><span>Profile</span></div>
            </div>
          </div>

          {/* Mobile Screen 2: Our Drinks */}
          <div className="glass-panel p-3 border border-slate-800 bg-[#050811] rounded-[30px] space-y-3 flex flex-col justify-between h-[480px] shadow-xl">
            <div className="space-y-2">
              <div className="w-16 h-3 bg-slate-900 mx-auto rounded-full" />
              <h4 className="text-xs font-black text-white uppercase">Our Drinks</h4>
              <div className="relative">
                <Search size={10} className="absolute left-2 top-2 text-slate-500" />
                <input placeholder="Search..." className="w-full bg-slate-900 text-[9px] pl-6 pr-2 py-1 rounded-md text-white border border-slate-800 outline-none" />
              </div>

              <div className="space-y-1.5 pt-1">
                {drinks.map((d) => (
                  <div key={d.id} className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                    <img src={d.image} alt={d.name} className="w-7 h-7 object-contain" />
                    <div className="flex-1 text-left">
                      <span className="text-[10px] font-black text-white block truncate">{d.name}</span>
                      <span className="text-[8px] text-cyan-400 font-mono font-bold">LKR {d.priceLkr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-around border-t border-slate-800 pt-2 text-slate-400 text-[9px]">
              <div className="flex flex-col items-center"><Home size={12} /><span>Home</span></div>
              <div className="flex flex-col items-center text-[#00f0ff]"><GlassWater size={12} /><span>Drinks</span></div>
              <div className="flex flex-col items-center"><ShoppingBag size={12} /><span>Orders</span></div>
              <div className="flex flex-col items-center"><Activity size={12} /><span>Status</span></div>
              <div className="flex flex-col items-center"><User size={12} /><span>Profile</span></div>
            </div>
          </div>

          {/* Mobile Screen 3: My Orders */}
          <div className="glass-panel p-3 border border-slate-800 bg-[#050811] rounded-[30px] space-y-3 flex flex-col justify-between h-[480px] shadow-xl">
            <div className="space-y-2">
              <div className="w-16 h-3 bg-slate-900 mx-auto rounded-full" />
              <h4 className="text-xs font-black text-white uppercase">My Orders</h4>

              <div className="flex border-b border-slate-800 text-[9px] font-bold">
                <span className="text-[#00f0ff] border-b-2 border-[#00f0ff] pb-1 px-2">Active</span>
                <span className="text-slate-500 pb-1 px-2">History</span>
              </div>

              <div className="space-y-2 pt-1">
                <div className="bg-slate-950 p-2 rounded-lg border border-cyan-500/30 text-[9px] space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-white">#1025 Ocean Blue</span>
                    <span className="text-[#00f0ff]">Preparing</span>
                  </div>
                  <span className="text-slate-400 text-[8px] block">Est. 2-3 min</span>
                </div>

                {recentOrders.slice(0, 3).map((o) => (
                  <div key={o.id} className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[9px] space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-white">{o.id} {o.drink}</span>
                      <span className="text-[#00ff88]">Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-around border-t border-slate-800 pt-2 text-slate-400 text-[9px]">
              <div className="flex flex-col items-center"><Home size={12} /><span>Home</span></div>
              <div className="flex flex-col items-center"><GlassWater size={12} /><span>Drinks</span></div>
              <div className="flex flex-col items-center text-[#00f0ff]"><ShoppingBag size={12} /><span>Orders</span></div>
              <div className="flex flex-col items-center"><Activity size={12} /><span>Status</span></div>
              <div className="flex flex-col items-center"><User size={12} /><span>Profile</span></div>
            </div>
          </div>

          {/* Mobile Screen 4: Machine Status */}
          <div className="glass-panel p-3 border border-slate-800 bg-[#050811] rounded-[30px] space-y-3 flex flex-col justify-between h-[480px] shadow-xl">
            <div className="space-y-2">
              <div className="w-16 h-3 bg-slate-900 mx-auto rounded-full" />
              <h4 className="text-xs font-black text-white uppercase">Machine Status</h4>

              <div className="space-y-1 text-[9px]">
                <div className="flex justify-between bg-slate-950 p-1.5 rounded-md border border-slate-800">
                  <span className="text-slate-400">ESP32 Connected</span>
                  <span className="text-[#00ff88] font-bold">ONLINE</span>
                </div>
                <div className="flex justify-between bg-slate-950 p-1.5 rounded-md border border-slate-800">
                  <span className="text-slate-400">Cup Detected</span>
                  <span className="text-[#00ff88] font-bold">YES</span>
                </div>
                {[1, 2, 3, 4, 5].map((p) => (
                  <div key={p} className="flex justify-between bg-slate-950 p-1.5 rounded-md border border-slate-800">
                    <span className="text-slate-400">Pump {p}</span>
                    <span className="text-slate-500 font-bold">OFF</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-around border-t border-slate-800 pt-2 text-slate-400 text-[9px]">
              <div className="flex flex-col items-center"><Home size={12} /><span>Home</span></div>
              <div className="flex flex-col items-center"><GlassWater size={12} /><span>Drinks</span></div>
              <div className="flex flex-col items-center"><ShoppingBag size={12} /><span>Orders</span></div>
              <div className="flex flex-col items-center text-[#00f0ff]"><Activity size={12} /><span>Status</span></div>
              <div className="flex flex-col items-center"><User size={12} /><span>Profile</span></div>
            </div>
          </div>

          {/* Mobile Screen 5: Profile */}
          <div className="glass-panel p-3 border border-slate-800 bg-[#050811] rounded-[30px] space-y-3 flex flex-col justify-between h-[480px] shadow-xl">
            <div className="space-y-3 text-center">
              <div className="w-16 h-3 bg-slate-900 mx-auto rounded-full" />
              <div className="w-12 h-12 rounded-full bg-cyan-500 mx-auto flex items-center justify-center text-slate-950 font-black text-sm">
                <User size={24} />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">Admin</h4>
                <p className="text-[9px] text-slate-400 font-mono">admin@bartender.com</p>
              </div>

              <div className="space-y-1 text-left text-[9px] pt-2">
                <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300">
                  <Settings size={12} className="text-cyan-400" /> Settings
                </div>
                <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300">
                  <Info size={12} className="text-cyan-400" /> Machine Info
                </div>
                <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300">
                  <HelpCircle size={12} className="text-cyan-400" /> Help & Support
                </div>
                <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 text-rose-400">
                  <LogOut size={12} /> Logout
                </div>
              </div>
            </div>

            <div className="flex items-center justify-around border-t border-slate-800 pt-2 text-slate-400 text-[9px]">
              <div className="flex flex-col items-center"><Home size={12} /><span>Home</span></div>
              <div className="flex flex-col items-center"><GlassWater size={12} /><span>Drinks</span></div>
              <div className="flex flex-col items-center"><ShoppingBag size={12} /><span>Orders</span></div>
              <div className="flex flex-col items-center"><Activity size={12} /><span>Status</span></div>
              <div className="flex flex-col items-center text-[#00f0ff]"><User size={12} /><span>Profile</span></div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
