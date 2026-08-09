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

  const statusBadge = (value, trueLabel = 'YES', falseLabel = 'NO') => (
    <span className={`font-mono text-[9px] font-black px-2 py-0.5 rounded-full ${
      value
        ? 'bg-[#159447]/10 text-[#159447] border border-[#159447]/25'
        : 'bg-[#e6392f]/10 text-[#e6392f] border border-[#e6392f]/25'
    }`}>
      {value ? trueLabel : falseLabel}
    </span>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

      {/* 1. Machine Status Card */}
      <div className="md:col-span-3 modern-card p-4 space-y-3">
        <h3 className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border-b border-black/8 pb-2 text-[#77756e]">
          <Activity size={12} className="text-[#f5c400]" /> MACHINE STATUS
        </h3>
        <div className="space-y-2">
          {[
            { icon: <Wifi size={11} />, label: 'ESP32 Connected', value: esp32Connected, t: 'ONLINE', f: 'OFFLINE' },
            { icon: <ShieldCheck size={11} />, label: 'Cup Detected', value: cupDetected, t: 'YES', f: 'NO' },
            { icon: <Wifi size={11} />, label: 'Wi-Fi Signal', value: true, t: wifiSignal, f: wifiSignal },
            { icon: <Activity size={11} />, label: 'System Status', value: systemStatus === 'READY', t: systemStatus, f: systemStatus },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-[#f4f1e8] p-2 rounded-xl border border-black/8">
              <span className="text-[#77756e] text-[10px] flex items-center gap-1.5 font-medium">
                <span className="text-[#f5c400]">{item.icon}</span>
                {item.label}
              </span>
              {statusBadge(item.value, item.t, item.f)}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Pump Status Card */}
      <div className="md:col-span-5 modern-card p-4 space-y-3">
        <h3 className="text-[9px] font-black text-[#77756e] uppercase tracking-widest border-b border-black/8 pb-2">
          PUMP STATUS
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-1.5">
            {pumpsState.map((pump) => {
              const isOn = pump.status === 'ON';
              return (
                <div
                  key={pump.id}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isOn
                      ? 'bg-[#f5c400]/20 border-[#f5c400] text-[#111] shadow-[0_4px_15px_rgba(245,196,0,0.25)] animate-pulse'
                      : 'bg-[#f4f1e8] border-black/10 text-[#77756e]'
                  }`}
                >
                  <Droplet size={11} className="mx-auto mb-1" />
                  <span className="text-[8px] font-black block">{pump.name}</span>
                  <span className={`text-[7px] font-bold ${isOn ? 'text-[#159447]' : 'text-[#77756e]'}`}>
                    {pump.status}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#f4f1e8] p-2 rounded-xl border border-black/8 flex justify-between">
              <span className="text-[#77756e] text-[9px] font-bold">STIRRER</span>
              <span className={`text-[9px] font-black ${stirrerMotor === 'ON' ? 'text-[#8b5cf6]' : 'text-[#77756e]'}`}>
                {stirrerMotor}
              </span>
            </div>
            <div className="bg-[#f4f1e8] p-2 rounded-xl border border-black/8 flex justify-between">
              <span className="text-[#77756e] text-[9px] font-bold">DISPENSE</span>
              <span className={`text-[9px] font-black ${dispensingStatus === 'DISPENSING' ? 'text-[#159447]' : 'text-[#77756e]'}`}>
                {dispensingStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tank Levels Card */}
      <div className="md:col-span-4 modern-card p-4 space-y-3">
        <h3 className="text-[9px] font-black text-[#77756e] uppercase tracking-widest border-b border-black/8 pb-2">
          TANK LEVELS
        </h3>
        <div className="grid grid-cols-5 gap-2 h-32 bg-[#f4f1e8] p-2 rounded-xl border border-black/8 items-end">
          {tanks.map((tank) => (
            <div key={tank.id} className="flex flex-col items-center justify-end h-full">
              <span className="text-[8px] font-bold text-[#77756e] mb-1">{tank.name}</span>
              <div className="w-full flex-1 bg-white border border-black/10 rounded-lg overflow-hidden relative shadow-inner flex flex-col justify-end">
                <div
                  style={{ height: `${tank.pct}%`, backgroundColor: tank.color }}
                  className="w-full transition-all duration-500 opacity-80"
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono font-black text-[8px] text-[#111] drop-shadow">
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
