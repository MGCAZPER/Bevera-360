import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { Wifi, ShieldCheck, Activity, Droplet } from 'lucide-react';

export const MachineStatusPanel = () => {
  const {
    esp32Connected,
    cupDetected,
    wifiSignal,
    systemStatus,
    pumpsState,
    stirrerMotor,
    dispensingStatus,
    tanks
  } = useBartender();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      
      {/* 1. Machine Status Card (3 Cols) */}
      <div className="md:col-span-3 glass-panel p-4 border border-cyan-500/20 bg-[#080d1a] space-y-3">
        <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5 border-b border-cyan-500/15 pb-2">
          <Activity size={13} className="text-cyan-400" /> MACHINE STATUS
        </h3>

        <div className="space-y-2 text-xs font-semibold">
          <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
              <Wifi size={12} className="text-cyan-400" /> ESP32 Connected
            </span>
            <span className="text-[10px] font-black text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-full border border-[#00ff88]/30">
              {esp32Connected ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-[#00ff88]" /> Cup Detected
            </span>
            <span className="text-[10px] font-black text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-full border border-[#00ff88]/30">
              {cupDetected ? 'YES' : 'NO'}
            </span>
          </div>

          <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
              <Wifi size={12} className="text-cyan-400" /> Wi-Fi Signal
            </span>
            <span className="text-[10px] font-black text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-full border border-[#00ff88]/30">
              {wifiSignal}
            </span>
          </div>

          <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
              <Activity size={12} className="text-cyan-400" /> System Status
            </span>
            <span className="text-[10px] font-black text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-full border border-[#00ff88]/30">
              {systemStatus}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Pump Status Card (5 Cols) */}
      <div className="md:col-span-5 glass-panel p-4 border border-cyan-500/20 bg-[#080d1a] space-y-3">
        <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest border-b border-cyan-500/15 pb-2">
          PUMP STATUS
        </h3>

        <div className="space-y-3">
          {/* Row of 5 Pumps */}
          <div className="grid grid-cols-5 gap-1.5">
            {pumpsState.map((pump) => {
              const isOn = pump.status === 'ON';
              return (
                <div
                  key={pump.id}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isOn
                      ? 'bg-cyan-500/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.4)] animate-pulse'
                      : 'bg-slate-950/80 border-slate-800 text-slate-500'
                  }`}
                >
                  <Droplet size={12} className="mx-auto mb-1" />
                  <span className="text-[9px] font-black block">{pump.name}</span>
                  <span className={`text-[8px] font-bold ${isOn ? 'text-[#00ff88]' : 'text-slate-500'}`}>
                    {pump.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400 text-[10px] font-bold">STIRRER MOTOR</span>
              <span className={`text-[10px] font-black ${stirrerMotor === 'ON' ? 'text-purple-400' : 'text-slate-500'}`}>
                {stirrerMotor}
              </span>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 flex justify-between">
              <span className="text-slate-400 text-[10px] font-bold">DISPENSING</span>
              <span className={`text-[10px] font-black ${dispensingStatus === 'DISPENSING' ? 'text-[#00ff88]' : 'text-slate-500'}`}>
                {dispensingStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tank Levels Card (4 Cols) */}
      <div className="md:col-span-4 glass-panel p-4 border border-cyan-500/20 bg-[#080d1a] space-y-3">
        <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest border-b border-cyan-500/15 pb-2">
          TANK LEVELS
        </h3>

        {/* 5 Vertical Tube Gauges T1..T5 */}
        <div className="grid grid-cols-5 gap-2 h-32 bg-slate-950 p-2 rounded-xl border border-slate-800 items-end">
          {tanks.map((tank) => (
            <div key={tank.id} className="flex flex-col items-center justify-end h-full">
              <span className="text-[9px] font-black text-slate-300 mb-1">{tank.name}</span>
              
              <div className="w-full flex-1 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden relative shadow-inner flex flex-col justify-end">
                <div
                  style={{
                    height: `${tank.pct}%`,
                    backgroundColor: tank.color,
                    boxShadow: `0 0 10px ${tank.color}`
                  }}
                  className="w-full transition-all duration-500"
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono font-black text-[9px] text-white drop-shadow">
                  {tank.pct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
