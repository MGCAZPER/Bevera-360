import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { CheckCircle2, Circle, OctagonX, ShieldAlert, Droplet, RotateCw } from 'lucide-react';

export const PreparationScreen = () => {
  const {
    selectedDrink,
    prepProgress,
    prepStep,
    timeRemaining,
    cupDetected,
    setCupDetected,
    machineState,
    pumpsState,
    stirrerMotor,
    dispensingStatus,
    emergencyStop
  } = useBartender();

  const isPaused = !cupDetected || machineState === 'WAITING_FOR_CUP' || machineState === 'PAUSED_NO_CUP';

  const steps = [
    { label: 'Order Received',        desc: 'Recipe queued by ESP32 board',         stepIdx: 0 },
    { label: 'Cup Detected',          desc: cupDetected ? 'IR sensor verified ✓' : 'Waiting for cup insertion...', stepIdx: 1 },
    { label: 'Measuring Ingredients', desc: 'Precision 5-relay pumps active',        stepIdx: 2 },
    { label: 'Mixing',                desc: '12V DC magnetic stirrer spinning',       stepIdx: 3 },
    { label: 'Dispensing',            desc: 'Final beverage pour in glass',           stepIdx: 4 },
    { label: 'Drink Ready',           desc: 'Order complete & ready to serve',        stepIdx: 5 },
  ];

  return (
    <div className="modern-card w-full p-5 space-y-4 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge-black">02 / PREPARATION</span>
            <span className="font-mono text-[8px] text-[#77756e]">#RB-LIVE-SEQ</span>
          </div>
          <h2 className="text-lg font-black text-[#111] uppercase tracking-tight mt-1">
            ORDER STATUS: <span className="text-[#e6392f]">{selectedDrink.name}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCupDetected(!cupDetected)}
            className={`px-3 py-1.5 rounded-full text-[9px] font-black border transition-all ${
              cupDetected
                ? 'bg-[#159447]/10 text-[#159447] border-[#159447]/25'
                : 'bg-[#e6392f]/10 text-[#e6392f] border-[#e6392f]/40 animate-bounce'
            }`}
          >
            {cupDetected ? 'Cup Detected ✓' : 'No Cup (Paused) ✗'}
          </button>
          <button
            onClick={emergencyStop}
            className="btn-modern-red text-[9px] px-3 py-1.5 flex items-center gap-1.5"
          >
            <OctagonX size={12} /> E-STOP
          </button>
        </div>
      </div>

      {/* Safety Alert */}
      {isPaused && (
        <div className="bg-[#e6392f]/8 border-2 border-[#e6392f]/30 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert size={22} className="text-[#e6392f] flex-shrink-0" />
            <div>
              <h4 className="font-black text-[10px] text-[#e6392f] uppercase tracking-wide">
                IR SAFETY INTERLOCK: NO CUP DETECTED
              </h4>
              <p className="text-[10px] text-[#77756e]">
                Pumps and stirrer motor paused. Place a glass under dispenser nozzle 1 to resume.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCupDetected(true)}
            className="btn-modern-black text-[9px] px-3 py-1.5 whitespace-nowrap"
          >
            Insert Cup
          </button>
        </div>
      )}

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

        {/* Left: Machine + Actuators */}
        <div className="lg:col-span-4 bg-[#f4f1e8] rounded-2xl border border-black/10 p-4 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <span className="text-[9px] font-black text-[#77756e] uppercase tracking-widest block">
              HARDWARE ACTUATORS & NOZZLE TRAY
            </span>
            <div className="w-full h-44 rounded-xl bg-white p-2 flex items-center justify-center relative overflow-hidden border border-black/8">
              <img
                src="/images/robo_machine.png"
                alt="Robotic Dispenser Machine"
                className={`h-full object-contain transition-all ${isPaused ? 'grayscale opacity-50' : 'drop-shadow-[0_8px_15px_rgba(0,0,0,0.15)]'}`}
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#111] text-[8px] font-mono text-[#f5c400]">
                GPIO 4: {cupDetected ? 'LOW (CUP)' : 'HIGH (EMPTY)'}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[9px] font-bold text-[#77756e] uppercase tracking-wider block">
              5-Pump Relays & Motor:
            </span>
            <div className="grid grid-cols-5 gap-1 font-mono">
              {pumpsState.map((p) => {
                const isOn = p.status === 'ON';
                return (
                  <div
                    key={p.id}
                    className={`p-1.5 rounded-lg border text-center transition-all ${
                      isOn
                        ? 'bg-[#f5c400]/25 border-[#f5c400] text-[#111] animate-pulse'
                        : 'bg-white border-black/10 text-[#77756e]'
                    }`}
                  >
                    <Droplet size={9} className="mx-auto mb-0.5" />
                    <span className="text-[7px] font-black block">P{p.id}</span>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono">
              <div className="bg-white p-2 rounded-xl border border-black/8 flex justify-between items-center">
                <span className="text-[#77756e] font-bold">STIRRER:</span>
                <span className={`font-black ${stirrerMotor === 'ON' ? 'text-[#8b5cf6]' : 'text-[#77756e]'}`}>
                  {stirrerMotor}
                </span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-black/8 flex justify-between items-center">
                <span className="text-[#77756e] font-bold">STATUS:</span>
                <span className={`font-black ${dispensingStatus === 'DISPENSING' ? 'text-[#159447]' : 'text-[#77756e]'}`}>
                  {dispensingStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Progress Ring */}
        <div className="lg:col-span-4 bg-[#f4f1e8] rounded-2xl border border-black/10 p-4 flex flex-col justify-between items-center text-center space-y-3">
          <span className="text-[9px] font-black text-[#77756e] uppercase tracking-widest block">
            PREPARATION PROGRESS
          </span>

          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="rgba(0,0,0,0.08)" strokeWidth="7" fill="none" />
              <circle
                cx="50" cy="50" r="42"
                stroke={isPaused ? '#e6392f' : '#f5c400'}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="263.89"
                strokeDashoffset={263.89 - (263.89 * prepProgress) / 100}
                fill="none"
                className="transition-all duration-300"
                style={{ filter: `drop-shadow(0 0 10px ${isPaused ? '#e6392f' : '#f5c400'})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-black font-mono ${isPaused ? 'text-[#e6392f]' : 'text-[#111]'}`}>
                {prepProgress}%
              </span>
              <span className={`text-[8px] font-black uppercase tracking-widest mt-1 ${isPaused ? 'text-[#e6392f]' : 'text-[#f5c400]'}`}>
                {isPaused ? 'PAUSED' : 'PREPARING'}
              </span>
            </div>
          </div>

          <div className="bg-white px-6 py-2 rounded-2xl border border-black/8 w-full space-y-0.5">
            <span className="text-[8px] font-bold text-[#77756e] uppercase tracking-widest block">Estimated Time</span>
            <span className="text-2xl font-black font-mono text-[#111]">{timeRemaining}</span>
          </div>

          <div className="w-full space-y-1.5 text-left border-t border-black/8 pt-3">
            <span className="text-[9px] font-bold text-[#77756e] uppercase block">Liquid Composition:</span>
            <div className="space-y-1 font-mono text-[9px]">
              {selectedDrink.ingredientsDetailed.map((ing, idx) => (
                <div key={idx} className="flex justify-between text-[#77756e]">
                  <span>• {ing.name}</span>
                  <span className="text-[#f5c400] font-bold">{ing.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: 6-Step Timeline */}
        <div className="lg:col-span-4 bg-[#f4f1e8] rounded-2xl border border-black/10 p-4 flex flex-col justify-between space-y-3">
          <span className="text-[9px] font-black text-[#77756e] uppercase tracking-widest block">
            6-STEP PREPARATION TIMELINE
          </span>

          <div className="space-y-2.5 relative pl-2 my-auto">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-black/10 pointer-events-none" />
            {steps.map((st) => {
              const isPassed = st.stepIdx < prepStep || (st.stepIdx === 1 && cupDetected);
              const isCurrent = st.stepIdx === prepStep && cupDetected;
              return (
                <div key={st.label} className="flex items-center gap-3 relative z-10">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shrink-0 ${
                    isPassed
                      ? 'bg-[#159447] text-white'
                      : isCurrent
                      ? 'bg-[#f5c400] text-[#111] animate-bounce'
                      : 'bg-white text-[#77756e] border border-black/10'
                  }`}>
                    {isPassed ? <CheckCircle2 size={12} /> : <Circle size={8} />}
                  </div>
                  <div>
                    <h4 className={`text-[9px] font-black uppercase ${
                      isCurrent ? 'text-[#f5c400]' : isPassed ? 'text-[#111]' : 'text-[#77756e]'
                    }`}>
                      {st.label}
                    </h4>
                    <span className="text-[8px] text-[#77756e] font-mono block">{st.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-black/8 text-[9px] font-mono text-[#77756e] flex items-center justify-between">
            <span>Status: <strong className="text-[#111]">{isPaused ? 'Paused' : 'Active'}</strong></span>
            <span>Mode: <strong className="text-[#f5c400]">ESP32 PRO</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
