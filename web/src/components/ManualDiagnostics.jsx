import React, { useState } from 'react';
import { useBartender } from '../context/BartenderContext';
import { Cpu, Power, Monitor, ShieldCheck, ShieldAlert, RotateCw, Droplet, CheckCircle2 } from 'lucide-react';

export const ManualDiagnostics = () => {
  const { tanks, triggerManualTest, cupDetected, setCupDetected, emergencyStop } = useBartender();
  
  const [relayStates, setRelayStates] = useState({
    pump_1: false,
    pump_2: false,
    pump_3: false,
    pump_4: false,
    pump_5: false,
    stirrer: false
  });

  const [lcdLine1, setLcdLine1] = useState('BEVERA-360 BOT');
  const [lcdLine2, setLcdLine2] = useState(' STATUS: READY ');

  const toggleRelay = (target) => {
    const newState = !relayStates[target];
    setRelayStates(prev => ({ ...prev, [target]: newState }));
    triggerManualTest(target, newState);
  };

  const turnOffAll = () => {
    setRelayStates({
      pump_1: false,
      pump_2: false,
      pump_3: false,
      pump_4: false,
      pump_5: false,
      stirrer: false
    });
    emergencyStop();
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="badge-black">HARDWARE BENCH</span>
          <h2 className="text-2xl font-black text-[#111] tracking-tight flex items-center gap-2 mt-1">
            <Cpu className="text-[#f5c400]" size={22} /> Hardware Diagnostic Test Bench
          </h2>
          <p className="text-[#77756e] text-xs">Direct manual pin control for Relays, Stirrer Motor, IR Sensor, and LCD Module</p>
        </div>

        <button
          onClick={turnOffAll}
          className="btn-modern-red flex items-center gap-2"
        >
          <Power size={16} />
          <span>EMERGENCY SHUTOFF</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 5-Channel Relay Module Direct Controls */}
        <div className="modern-card p-6 bg-white space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <h3 className="text-base font-bold text-[#111] flex items-center gap-2">
              <Power className="text-[#f5c400]" size={18} /> 5-Channel Relay Switches
            </h3>
            <span className="badge-black">Active LOW</span>
          </div>

          <div className="space-y-3">
            {tanks.map((tank, idx) => {
              const key = `pump_${idx + 1}`;
              const isOn = relayStates[key];

              return (
                <div
                  key={tank.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    isOn ? 'bg-[#f5c400]/20 border-[#f5c400] shadow-sm' : 'bg-[#f4f1e8] border-black/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isOn ? 'bg-black text-[#f5c400] animate-bounce' : 'bg-white text-[#77756e] border border-black/10'
                      }`}
                    >
                      <Droplet size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111] text-sm">Relay {idx + 1}: Pump {idx + 1}</h4>
                      <p className="text-xs text-[#77756e]">{tank.name}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleRelay(key)}
                    className={`btn px-4 py-1.5 text-xs ${
                      isOn ? 'bg-black text-[#f5c400] font-black rounded-full' : 'btn-modern-black text-xs'
                    }`}
                  >
                    {isOn ? 'ON (ACTIVE)' : 'OFF'}
                  </button>
                </div>
              );
            })}

            {/* Stirrer Relay */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                relayStates.stirrer ? 'bg-[#8b5cf6]/20 border-[#8b5cf6] shadow-sm' : 'bg-[#f4f1e8] border-black/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    relayStates.stirrer ? 'bg-[#8b5cf6] text-white animate-spin' : 'bg-white text-[#77756e] border border-black/10'
                  }`}
                >
                  <RotateCw size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[#111] text-sm">Relay 6: Stirrer Motor</h4>
                  <p className="text-xs text-[#77756e]">12V DC Magnetic Stirrer</p>
                </div>
              </div>

              <button
                onClick={() => toggleRelay('stirrer')}
                className={`btn px-4 py-1.5 text-xs ${
                  relayStates.stirrer ? 'bg-black text-white font-black rounded-full' : 'btn-modern-black text-xs'
                }`}
              >
                {relayStates.stirrer ? 'ON (ACTIVE)' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* IR Sensor & LCD simulator column */}
        <div className="space-y-6">
          
          {/* IR Cup Sensor Diagnostics */}
          <div className="modern-card p-6 bg-white space-y-4">
            <h3 className="text-base font-bold text-[#111] flex items-center gap-2 border-b border-black/10 pb-3">
              <ShieldCheck className="text-[#f5c400]" size={18} /> IR Cup Sensor Interlock (GPIO 4)
            </h3>

            <div className="bg-[#f4f1e8] p-4 rounded-2xl border border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {cupDetected ? (
                  <ShieldCheck size={28} className="text-[#159447]" />
                ) : (
                  <ShieldAlert size={28} className="text-[#e6392f] animate-bounce" />
                )}
                <div>
                  <h4 className="font-bold text-[#111] text-sm">
                    {cupDetected ? 'CUP PRESENT (LOW)' : 'NO CUP DETECTED (HIGH)'}
                  </h4>
                  <p className="text-xs text-[#77756e]">GPIO 4 Interlock Digital Input</p>
                </div>
              </div>

              <button
                onClick={() => setCupDetected(!cupDetected)}
                className="btn-modern-yellow text-xs"
              >
                Toggle State
              </button>
            </div>
          </div>

          {/* Authentic 16x2 LCD Display Simulator */}
          <div className="modern-card p-6 bg-white space-y-4">
            <h3 className="text-base font-bold text-[#111] flex items-center gap-2 border-b border-black/10 pb-3">
              <Monitor className="text-[#f5c400]" size={18} /> 16x2 I2C LCD Character Screen
            </h3>

            <div className="lcd-screen p-4 rounded-2xl space-y-1 font-mono text-center shadow-inner">
              <div className="text-base font-bold">{lcdLine1.padEnd(16, ' ')}</div>
              <div className="text-base font-bold">{lcdLine2.padEnd(16, ' ')}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-[#77756e] uppercase mb-1">Line 1 Text</label>
                <input
                  type="text"
                  maxLength={16}
                  value={lcdLine1}
                  onChange={(e) => setLcdLine1(e.target.value)}
                  className="w-full bg-[#f4f1e8] border border-black/10 rounded-xl px-3 py-1.5 text-xs text-[#111] font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#77756e] uppercase mb-1">Line 2 Text</label>
                <input
                  type="text"
                  maxLength={16}
                  value={lcdLine2}
                  onChange={(e) => setLcdLine2(e.target.value)}
                  className="w-full bg-[#f4f1e8] border border-black/10 rounded-xl px-3 py-1.5 text-xs text-[#111] font-mono font-bold"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
