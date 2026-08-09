import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { CheckCircle2, Circle, OctagonX, ShieldAlert, ShieldCheck } from 'lucide-react';

export const PreparationScreen = () => {
  const {
    selectedDrink,
    prepProgress,
    prepStep,
    timeRemaining,
    cupDetected,
    setCupDetected,
    machineState,
    emergencyStop
  } = useBartender();

  const isPaused = !cupDetected || machineState === 'WAITING_FOR_CUP' || machineState === 'PAUSED_NO_CUP';

  const steps = [
    { label: 'Order Received', desc: 'Recipe queued by ESP32', stepIdx: 0 },
    { label: 'Cup Detected', desc: cupDetected ? 'IR sensor verified ✓' : 'Waiting for cup...', stepIdx: 1 },
    { label: 'Measuring Ingredients', desc: 'Precision relay pumps dispensing', stepIdx: 2 },
    { label: 'Mixing', desc: '12V DC magnetic stirrer spinning', stepIdx: 3 },
    { label: 'Dispensing', desc: 'Final beverage pour in glass', stepIdx: 4 },
    { label: 'Drink Ready', desc: 'Order complete & ready to serve', stepIdx: 5 }
  ];

  return (
    <div className="glass-panel max-w-4xl mx-auto p-8 border border-cyan-500/20 bg-[#070b16] space-y-6 shadow-2xl animate-fade-in my-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/15 pb-4">
        <div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
            02. PREPARATION PROCESS SCREEN
          </span>
          <h2 className="text-2xl font-black text-white uppercase">
            {isPaused ? 'WAITING FOR CUP INSERTION' : 'PREPARING YOUR DRINK'}
          </h2>
        </div>

        <button
          onClick={emergencyStop}
          className="btn-danger-neon text-xs px-4 py-2 flex items-center gap-1.5 font-bold"
        >
          <OctagonX size={14} /> E-STOP
        </button>
      </div>

      {/* Safety Alert Banner if No Cup Detected */}
      {isPaused && (
        <div className="bg-amber-950/80 border-2 border-amber-500/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-amber-200 animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert size={32} className="text-amber-400 flex-shrink-0" />
            <div>
              <h4 className="font-extrabold text-sm text-amber-300 uppercase tracking-wide">
                IR SAFETY INTERLOCK: NO CUP DETECTED
              </h4>
              <p className="text-xs text-amber-200">
                Pumps and mixing motor paused. Place a glass directly under dispenser nozzle 1 to start/resume pouring.
              </p>
            </div>
          </div>

          <button
            onClick={() => setCupDetected(true)}
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow-lg hover:bg-amber-300 whitespace-nowrap"
          >
            Insert Cup (Trigger IR Sensor)
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Machine Dispense & Progress Ring (6 Cols) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-3xl border border-slate-800 space-y-4">
          
          <div className="w-full h-44 rounded-2xl bg-slate-900 p-2 flex items-center justify-center relative overflow-hidden">
            <img
              src="/images/robo_machine.png"
              alt="Machine Dispensing"
              className={`h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,240,255,0.4)] transition-all ${
                isPaused ? 'grayscale brightness-75' : ''
              }`}
            />
          </div>

          {/* Big Circular Progress Ring */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={isPaused ? '#f59e0b' : '#00f0ff'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="263.89"
                strokeDashoffset={263.89 - (263.89 * prepProgress) / 100}
                fill="none"
                className="transition-all duration-300"
                style={{ filter: `drop-shadow(0 0 10px ${isPaused ? '#f59e0b' : '#00f0ff'})` }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-3xl font-black font-mono tracking-tight ${isPaused ? 'text-amber-400' : 'text-white'}`}>
                {prepProgress}%
              </span>
              {isPaused && (
                <span className="text-[9px] font-bold text-amber-300 uppercase tracking-widest mt-1">
                  PAUSED
                </span>
              )}
            </div>
          </div>

          {/* Cup Status Indicator Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">IR Cup Interlock:</span>
            <button
              onClick={() => setCupDetected(!cupDetected)}
              className={`px-3 py-1 rounded-full text-xs font-extrabold border transition-all ${
                cupDetected
                  ? 'bg-[#00ff88]/15 border-[#00ff88]/40 text-[#00ff88]'
                  : 'bg-amber-950 border-amber-500 text-amber-300 animate-bounce'
              }`}
            >
              {cupDetected ? 'Cup Detected ✓' : 'No Cup (Paused) ✗'}
            </button>
          </div>

        </div>

        {/* Right Step Timeline List (6 Cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-3 relative pl-2">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-800 pointer-events-none" />

            {steps.map((st) => {
              const isPassed = st.stepIdx < prepStep || (st.stepIdx === 1 && cupDetected);
              const isCurrent = st.stepIdx === prepStep && cupDetected;

              return (
                <div key={st.label} className="flex items-center gap-3 relative z-10">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isPassed
                      ? 'bg-[#00ff88] text-slate-950 shadow-[0_0_10px_rgba(0,255,136,0.5)]'
                      : isCurrent
                      ? 'bg-[#00f0ff] text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.7)] animate-bounce'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}>
                    {isPassed ? <CheckCircle2 size={14} /> : <Circle size={10} />}
                  </div>

                  <div>
                    <h4 className={`text-xs font-black uppercase ${
                      isCurrent ? 'text-[#00f0ff]' : isPassed ? 'text-white' : 'text-slate-500'
                    }`}>
                      {st.label}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {st.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
