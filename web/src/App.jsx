import React, { useState } from 'react';
import { BartenderProvider } from './context/BartenderContext';
import { Navbar } from './components/Navbar';
import { RoboHero } from './components/RoboHero';
import { RoboDashboard } from './components/RoboDashboard';
import { SystemCalibration } from './components/SystemCalibration';
import { ManualDiagnostics } from './components/ManualDiagnostics';
import { DispenseStatusModal } from './components/DispenseStatusModal';
import { ShieldCheck, Cpu, Zap, Sparkles, Bot } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14] text-slate-100 font-sans selection:bg-[#65c466] selection:text-slate-950">
      
      {/* Navbar Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {activeTab === 'home' || activeTab === 'menu' ? (
          <>
            {/* Top Hero Row */}
            <RoboHero 
              onOrderNowClick={() => {
                const el = document.getElementById('dashboard-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onHowItWorksClick={() => setActiveTab('howitworks')}
            />

            {/* Bottom Dashboard Grid */}
            <div id="dashboard-section">
              <RoboDashboard />
            </div>
          </>
        ) : activeTab === 'calibration' ? (
          <SystemCalibration />
        ) : activeTab === 'diagnostics' ? (
          <ManualDiagnostics />
        ) : activeTab === 'howitworks' ? (
          <div className="theme-card p-8 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-white uppercase flex items-center gap-2">
              <Bot className="text-[#65c466]" /> How Robo Bartender Works
            </h2>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                1. <strong>Select Your Drink</strong>: Choose from our menu of 5 signature drinks or craft a custom blend in the Mixology Lab.
              </p>
              <p>
                2. <strong>ESP32 Microcontroller Activation</strong>: The web app dispatches your drink recipe via Wi-Fi to the ESP32 main controller board.
              </p>
              <p>
                3. <strong>IR Cup Interlock Verification</strong>: The IR Proximity Sensor verifies that a glass is placed directly under the dispenser nozzle before activating pumps.
              </p>
              <p>
                4. <strong>Precision 5-Relay Liquid Dispensing</strong>: 12V DC diaphragm pumps pour liquids according to milliliter flow rate calibrations saved in EEPROM.
              </p>
              <p>
                5. <strong>Magnetic Stirring & Dispense</strong>: The 12V DC stirrer motor blends the ingredients into perfection.
              </p>
            </div>
          </div>
        ) : (
          <div className="theme-card p-12 text-center text-slate-400">
            <h3 className="text-xl font-bold text-white mb-2">Order History</h3>
            <p className="text-xs">No past orders saved on this session.</p>
          </div>
        )}
      </main>

      {/* Interactive Dispense Modal */}
      <DispenseStatusModal />

      {/* Footer Matching User Image */}
      <footer className="border-t border-slate-800/80 bg-[#070a10] py-4 px-4 text-xs text-slate-400 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-[#65c466]" />
            <span className="font-extrabold text-white">ROBO <span className="text-[#65c466]">BARTENDER</span></span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#65c466]" /> 100% Hygienic</span>
            <span className="flex items-center gap-1.5"><Cpu size={14} className="text-[#65c466]" /> AI Powered</span>
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-[#65c466]" /> Fast Service</span>
            <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-[#65c466]" /> Fresh & Tasty</span>
          </div>

          <p className="text-[10px] text-slate-500 font-mono">
            &copy; 2024 Robo Bartender. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <BartenderProvider>
      <AppContent />
    </BartenderProvider>
  );
}
