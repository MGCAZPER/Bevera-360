import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { CheckCircle2, Circle, OctagonX, ShieldAlert, ShieldCheck, Clock, Droplet, RotateCw, Sparkles, Cpu } from 'lucide-react';

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
    { label: 'Order Received', desc: 'Recipe queued by ESP32 board', stepIdx: 0 },
    { label: 'Cup Detected', desc: cupDetected ? 'IR sensor verified ✓' : 'Waiting for cup insertion...', stepIdx: 1 },
    { label: 'Measuring Ingredients', desc: 'Precision 5-relay pumps active', stepIdx: 2 },
    { label: 'Mixing', desc: '12V DC magnetic stirrer spinning', stepIdx: 3 },
    { label: 'Dispensing', desc: 'Final beverage pour in glass', stepIdx: 4 },
    { label: 'Drink Ready', desc: 'Order complete & ready to serve', stepIdx: 5 }
  ];

  return (
    <div className="glass-panel max-w-[1720px] w-full mx-auto p-5 border border-cyan-500/25 bg-[#060a14] space-y-4 shadow-2xl animate-fade-in my-2">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/15 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-[#00f0ff] uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
              02. PREPARATION PROCESS SCREEN
            </span>
            <span className="text-[10px] font-mono text-slate-400">#RB-LIVE-SEQ</span>
          </div>
          <h2 className="text-xl font-black text-white uppercase flex items-center gap-2 mt-1">
            <Sparkles size={18} className="text-[#00f0ff] animate-spin" />
            <span>ORDER STATUS: {selectedDrink.name}</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* IR Cup Sensor Toggle Quick Pill */}
          <button
            onClick={() => setCupDetected(!cupDetected)}
            className={`px-3 py-1 rounded-full text-xs font-black border transition-all ${
              cupDetected
                ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30 shadow-[0_0_10px_rgba(0,255,136,0.2)]'
                : 'bg-amber-950 text-amber-300 border-amber-500 animate-bounce'
            }`}
          >
            {cupDetected ? 'Cup Detected ✓' : 'No Cup (Paused) ✗'}
          </button>

          <button
            onClick={emergencyStop}
            className="btn-danger-neon text-xs px-4 py-1.5 flex items-center gap-1.5 font-black"
          >
            <OctagonX size={14} /> E-STOP
          </button>
        </div>
      </div>

      {/* Safety Alert Banner if Cup Missing */}
      {isPaused && (
        <div className="bg-amber-950/80 border-2 border-amber-500/80 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-200 animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert size={26} className="text-amber-400 flex-shrink-0" />
            <div>
              <h4 className="font-black text-xs text-amber-300 uppercase tracking-wide">
                IR SAFETY INTERLOCK: NO CUP DETECTED ON DISPENSER TRAY
              </h4>
              <p className="text-[11px] text-amber-200">
                Pumps and stirrer motor paused. Place a glass directly under dispenser nozzle 1 to resume pouring.
              </p>
            </div>
          </div>

          <button
            onClick={() => setCupDetected(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow-lg hover:bg-amber-300 whitespace-nowrap"
          >
            Insert Cup (Trigger IR Sensor)
          </button>
        </div>
      )}

      {/* 3-Column Layout fitting 1920x1080 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Column: 3D Machine & Actuator Status (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-4 border border-cyan-500/20 bg-[#080e1d] flex flex-col justify-between space-y-3">
          
          <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              HARDWARE ACTUATORS & NOZZLE TRAY
            </span>
            <div className="w-full h-44 rounded-2xl bg-slate-950 p-2 flex items-center justify-center relative overflow-hidden border border-slate-800">
              <img
                src="/images/robo_machine.png"
                alt="Robotic Dispenser Machine"
                className={`h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,240,255,0.4)] transition-all ${
                  isPaused ? 'grayscale brightness-75' : ''
                }`}
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/90 text-[9px] font-mono text-[#00f0ff] border border-cyan-500/30">
                GPIO 4 IR: {cupDetected ? 'LOW (CUP)' : 'HIGH (EMPTY)'}
              </div>
            </div>
          </div>

          {/* Actuators Relay Grid */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              5-Pump Relays & Motor Status:
            </span>
            <div className="grid grid-cols-5 gap-1 font-mono">
              {pumpsState.map((p) => {
                const isOn = p.status === 'ON';
                return (
                  <div
                    key={p.id}
                    className={`p-1.5 rounded-lg border text-center transition-all ${
                      isOn
                        ? 'bg-cyan-500/25 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.5)] animate-pulse'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <Droplet size={10} className="mx-auto mb-0.5" />
                    <span className="text-[8px] font-black block">P{p.id}</span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">STIRRER MOTOR:</span>
                <span className={`font-black ${stirrerMotor === 'ON' ? 'text-purple-400 animate-spin' : 'text-slate-500'}`}>
                  {stirrerMotor}
                </span>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">DISPENSING:</span>
                <span className={`font-black ${dispensingStatus === 'DISPENSING' ? 'text-[#00ff88]' : 'text-slate-500'}`}>
                  {dispensingStatus}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Center Column: Dual-Ring Circular Meter & Liquid Ratio (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-4 border border-cyan-500/20 bg-[#080e1d] flex flex-col justify-between items-center text-center space-y-4">
          
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
            PREPARATION PROGRESS TELEMETRY
          </span>

          {/* Large Dual-Ring Progress Ring */}
          <div className="relative w-44 h-44 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="7"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={isPaused ? '#f59e0b' : '#00f0ff'}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="263.89"
                strokeDashoffset={263.89 - (263.89 * prepProgress) / 100}
                fill="none"
                className="transition-all duration-300"
                style={{ filter: `drop-shadow(0 0 12px ${isPaused ? '#f59e0b' : '#00f0ff'})` }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-black font-mono tracking-tight ${isPaused ? 'text-amber-400' : 'text-white'}`}>
                {prepProgress}%
              </span>
              <span className={`text-[9px] font-black uppercase tracking-widest mt-1 ${isPaused ? 'text-amber-300' : 'text-[#00f0ff]'}`}>
                {isPaused ? 'PAUSED (NO CUP)' : 'PREPARING'}
              </span>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="space-y-0.5 bg-slate-950/80 px-6 py-2 rounded-2xl border border-slate-800 w-full">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
              Estimated Time Remaining
            </span>
            <span className="text-2xl font-black font-mono text-[#00f0ff]">
              {timeRemaining}
            </span>
          </div>

          {/* Ingredients Composition Ratio Bar */}
          <div className="w-full space-y-1.5 text-left text-xs pt-1 border-t border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">
              Liquid Volume Composition:
            </span>
            <div className="space-y-1 font-mono text-[10px]">
              {selectedDrink.ingredientsDetailed.map((ing, idx) => (
                <div key={idx} className="flex justify-between text-slate-300">
                  <span>• {ing.name}</span>
                  <span className="text-cyan-400 font-bold">{ing.amount}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: 6-Step Timeline Checklist (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-4 border border-cyan-500/20 bg-[#080e1d] flex flex-col justify-between space-y-3">
          
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
            6-STEP PREPARATION TIMELINE
          </span>

          <div className="space-y-2.5 relative pl-2 my-auto">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-800 pointer-events-none" />

            {steps.map((st) => {
              const isPassed = st.stepIdx < prepStep || (st.stepIdx === 1 && cupDetected);
              const isCurrent = st.stepIdx === prepStep && cupDetected;

              return (
                <div key={st.label} className="flex items-center gap-3 relative z-10">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isPassed
                      ? 'bg-[#00ff88] text-slate-950 shadow-[0_0_10px_rgba(0,255,136,0.5)]'
                      : isCurrent
                      ? 'bg-[#00f0ff] text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.7)] animate-bounce'
                      : 'bg-slate-950 text-slate-600 border border-slate-800'
                  }`}>
                    {isPassed ? <CheckCircle2 size={12} /> : <Circle size={8} />}
                  </div>

                  <div>
                    <h4 className={`text-xs font-black uppercase ${
                      isCurrent ? 'text-[#00f0ff]' : isPassed ? 'text-white' : 'text-slate-500'
                    }`}>
                      {st.label}
                    </h4>
                    <span className="text-[9px] text-slate-400 font-mono block">
                      {st.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Status: <strong className="text-white">{isPaused ? 'Paused' : 'Active'}</strong></span>
            <span>Mode: <strong className="text-[#00f0ff]">ESP32 PRO</strong></span>
          </div>

        </div>

      </div>

    </div>
  );
};
