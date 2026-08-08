import React, { useState } from 'react';
import { useBartender } from '../context/BartenderContext';
import { Sliders, Play, Save, CheckCircle2, Wifi, Info, RotateCcw } from 'lucide-react';

export const SystemCalibration = () => {
  const { 
    tanks, 
    flowRates, 
    updatePumpCalibration, 
    esp32Ip, 
    setEsp32Ip, 
    hardwareMode, 
    setHardwareMode,
    triggerManualTest 
  } = useBartender();

  const [testActivePump, setTestActivePump] = useState(null);
  const [measuredVolumes, setMeasuredVolumes] = useState(['150', '150', '150', '150', '150']);
  const [savedSuccess, setSavedSuccess] = useState(null);

  const handleTestPour = (pumpIndex) => {
    setTestActivePump(pumpIndex);
    triggerManualTest(`pump_${pumpIndex + 1}`, true);

    setTimeout(() => {
      triggerManualTest(`pump_${pumpIndex + 1}`, false);
      setTestActivePump(null);
    }, 10000); // 10 second test pour
  };

  const handleSaveCalibration = (pumpIndex) => {
    const vol = parseFloat(measuredVolumes[pumpIndex]) || 150.0;
    const rateMlSec = (vol / 10.0).toFixed(2);
    updatePumpCalibration(pumpIndex, rateMlSec);

    setSavedSuccess(pumpIndex);
    setTimeout(() => setSavedSuccess(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Sliders className="text-cyan-400" /> Pump Flow Rate Calibration
        </h2>
        <p className="text-slate-400 text-sm">Calibrate liquid output flow rate (ml/sec) for precision dispensing</p>
      </div>

      {/* Network Configuration Card */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Wifi className="text-cyan-400" size={18} /> ESP32 Connection Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              ESP32 IP Address / Hostname
            </label>
            <input
              type="text"
              value={esp32Ip}
              onChange={(e) => setEsp32Ip(e.target.value)}
              placeholder="192.168.4.1"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono font-bold outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Hardware Connection Mode
            </label>
            <select
              value={hardwareMode}
              onChange={(e) => setHardwareMode(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-bold outline-none focus:border-cyan-500"
            >
              <option value="SIMULATION_DEMO">Simulation / Demo Mode (Offline Test)</option>
              <option value="LIVE_ESP32">Live ESP32 Connected Mode (Wi-Fi REST API)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5-Pump Calibration Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">5-Pump Flow Rate Calibration Bench</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tanks.map((tank, idx) => {
            const currentRate = flowRates[idx] || 15.0;
            const isTesting = testActivePump === idx;
            const isSaved = savedSuccess === idx;

            return (
              <div key={tank.id} className="glass-panel p-6 space-y-4 relative">
                
                {/* Pump Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: tank.color }} />
                    <h4 className="font-extrabold text-white text-lg">Pump {tank.id}</h4>
                  </div>
                  <span className="badge badge-cyan font-mono">{currentRate} ml/s</span>
                </div>

                <p className="text-xs text-slate-400">{tank.name}</p>

                {/* Step 1: Run Test Pour */}
                <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Step 1: Run 10-Second Test Pour
                  </span>

                  <button
                    onClick={() => handleTestPour(idx)}
                    disabled={isTesting}
                    className={`w-full btn ${
                      isTesting ? 'bg-amber-500 text-slate-950 font-black animate-pulse' : 'btn-secondary'
                    }`}
                  >
                    <Play size={14} />
                    <span>{isTesting ? 'POURING (10 Seconds)...' : 'Start 10s Test Pour'}</span>
                  </button>
                </div>

                {/* Step 2: Measure & Save */}
                <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Step 2: Enter Measured Volume (ml)
                  </span>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="1"
                      value={measuredVolumes[idx]}
                      onChange={(e) => {
                        const newVols = [...measuredVolumes];
                        newVols[idx] = e.target.value;
                        setMeasuredVolumes(newVols);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold text-center outline-none focus:border-cyan-500"
                    />
                    <span className="text-xs text-slate-400 font-bold">ml</span>
                  </div>

                  <div className="text-[11px] text-slate-400 flex justify-between">
                    <span>Calculated Rate:</span>
                    <strong className="text-cyan-400 font-mono">
                      {((parseFloat(measuredVolumes[idx]) || 0) / 10.0).toFixed(2)} ml/s
                    </strong>
                  </div>

                  <button
                    onClick={() => handleSaveCalibration(idx)}
                    className="w-full btn btn-primary py-2 text-xs"
                  >
                    {isSaved ? <CheckCircle2 size={14} /> : <Save size={14} />}
                    <span>{isSaved ? 'Saved to EEPROM!' : 'Save Calibration'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
