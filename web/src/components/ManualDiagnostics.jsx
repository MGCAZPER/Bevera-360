import React, { useState } from 'react';
import { useBartender } from '../context/BartenderContext';
import { Cpu, Power, Monitor, ShieldCheck, ShieldAlert, RotateCw, Droplet, CheckCircle2 } from 'lucide-react';

export const ManualDiagnostics = () => {
  const { tanks, triggerManualTest, cupPresent, setCupPresent, emergencyStop } = useBartender();
  
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
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Cpu className="text-cyan-400" /> Hardware Diagnostic Test Bench
          </h2>
          <p className="text-slate-400 text-sm">Direct manual pin control for Relays, Stirrer Motor, IR Sensor, and LCD Module</p>
        </div>

        <button
          onClick={turnOffAll}
          className="btn btn-danger flex items-center gap-2"
        >
          <Power size={16} />
          <span>EMERGENCY SHUTOFF</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 5-Channel Relay Module Direct Controls */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Power className="text-cyan-400" size={18} /> 5-Channel Relay Switches
            </h3>
            <span className="badge badge-purple">Active LOW</span>
          </div>

          <div className="space-y-3">
            {tanks.map((tank, idx) => {
              const key = `pump_${idx + 1}`;
              const isOn = relayStates[key];

              return (
                <div
                  key={tank.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    isOn ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/20' : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isOn ? 'bg-cyan-500 text-slate-950 animate-bounce' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Droplet size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Relay {idx + 1}: Pump {idx + 1}</h4>
                      <p className="text-xs text-slate-400">{tank.name}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleRelay(key)}
                    className={`btn px-4 py-1.5 text-xs ${
                      isOn ? 'bg-cyan-400 text-slate-950 font-black' : 'btn-secondary'
                    }`}
                  >
                    {isOn ? 'ON (ACTIVE)' : 'OFF'}
                  </button>
                </div>
              );
            })}

            {/* Stirrer Motor Relay */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                relayStates.stirrer ? 'bg-purple-950/40 border-purple-400 shadow-md shadow-purple-500/20' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    relayStates.stirrer ? 'bg-purple-500 text-white animate-spin' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <RotateCw size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Relay 6: Stirrer Motor</h4>
                  <p className="text-xs text-slate-400">12V DC Gear Motor Mixing Blade</p>
                </div>
              </div>

              <button
                onClick={() => toggleRelay('stirrer')}
                className={`btn px-4 py-1.5 text-xs ${
                  relayStates.stirrer ? 'bg-purple-500 text-white font-black' : 'btn-secondary'
                }`}
              >
                {relayStates.stirrer ? 'ON (SPINNING)' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Display & Sensor Diagnostics */}
        <div className="space-y-6">
          
          {/* IR Cup Proximity Sensor */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-cyan-400" size={18} /> IR Cup Sensor Diagnostics
            </h3>

            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {cupPresent ? (
                  <ShieldCheck size={28} className="text-emerald-400" />
                ) : (
                  <ShieldAlert size={28} className="text-rose-400 animate-bounce" />
                )}
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {cupPresent ? 'CUP PRESENT (LOW)' : 'NO CUP DETECTED (HIGH)'}
                  </h4>
                  <p className="text-xs text-slate-400">GPIO 4 Interlock Digital Input</p>
                </div>
              </div>

              <button
                onClick={() => setCupPresent(!cupPresent)}
                className="btn btn-secondary text-xs"
              >
                Toggle State
              </button>
            </div>
          </div>

          {/* Authentic 16x2 LCD Display Simulator */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Monitor className="text-cyan-400" size={18} /> 16x2 I2C LCD Character Screen
            </h3>

            {/* Glowing LCD Display Box */}
            <div className="lcd-screen rounded-2xl p-5 font-mono space-y-2 border-4 border-slate-900 shadow-2xl">
              <div className="bg-black/20 p-2.5 rounded tracking-widest text-center text-base font-bold select-none">
                {lcdLine1.padEnd(16, ' ').substring(0, 16)}
              </div>
              <div className="bg-black/20 p-2.5 rounded tracking-widest text-center text-base font-bold select-none">
                {lcdLine2.padEnd(16, ' ').substring(0, 16)}
              </div>
            </div>

            {/* Input fields to test LCD updates */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Row 1 Text (Max 16 Chars)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={lcdLine1}
                  onChange={(e) => setLcdLine1(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-sm outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Row 2 Text (Max 16 Chars)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={lcdLine2}
                  onChange={(e) => setLcdLine2(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-sm outline-none focus:border-cyan-500"
                />
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
