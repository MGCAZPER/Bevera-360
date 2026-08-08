import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { ShieldAlert, AlertTriangle, CheckCircle2, RotateCw, OctagonX, Droplet } from 'lucide-react';

export const DispenseStatusModal = () => {
  const { 
    machineState, 
    cupPresent, 
    activePump, 
    dispenseProgress, 
    currentDispensingDrink, 
    activeOrder,
    emergencyStop 
  } = useBartender();

  if (machineState === 'IDLE') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-fade-in">
      <div className="glass-panel w-full max-w-lg overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 p-6 space-y-6 relative">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
              Robotic Dispense Sequence
            </span>
            <h3 className="text-2xl font-black text-white">
              {currentDispensingDrink || 'Dispensing Beverage'}
            </h3>
          </div>
          <button
            onClick={emergencyStop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-400 hover:bg-rose-900 text-xs font-bold transition-all"
          >
            <OctagonX size={14} /> E-STOP
          </button>
        </div>

        {/* Cup Detection Safety Warning */}
        {!cupPresent && (
          <div className="bg-rose-950/80 border-2 border-rose-500/80 rounded-2xl p-4 flex items-center gap-3 text-rose-200 animate-pulse">
            <AlertTriangle className="text-rose-400 flex-shrink-0" size={28} />
            <div>
              <h4 className="font-extrabold text-sm text-rose-300 uppercase tracking-wide">
                SAFETY ALERT: NO CUP DETECTED
              </h4>
              <p className="text-xs text-rose-200">
                Pumps paused. Please place a cup directly under the dispenser nozzle to continue.
              </p>
            </div>
          </div>
        )}

        {/* Interactive Cup & Liquid Animation */}
        <div className="flex flex-col items-center justify-center py-6 bg-slate-900/80 rounded-3xl border border-slate-800 relative overflow-hidden">
          
          {/* Animated Stirrer Motor in Mixing Phase */}
          {machineState === 'MIXING' && (
            <div className="absolute top-4 flex flex-col items-center animate-spin text-purple-400">
              <RotateCw size={24} />
            </div>
          )}

          {/* Cup Graphic Container */}
          <div className="relative w-36 h-48 border-4 border-t-0 border-slate-600 rounded-b-3xl overflow-hidden bg-slate-950/60 shadow-inner flex flex-col justify-end">
            
            {/* Liquid Fill Level */}
            <div
              style={{ height: `${dispenseProgress}%` }}
              className="w-full liquid-gradient-anim transition-all duration-300 relative flex items-center justify-center"
            >
              {/* Surface Wave Bubble */}
              <div className="absolute top-0 inset-x-0 h-2 bg-white/40 blur-[1px] animate-pulse" />
            </div>

            {/* Empty state label if progress is zero */}
            {dispenseProgress === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                Cup Ready
              </div>
            )}
          </div>

          {/* Status Label */}
          <div className="mt-4 text-center space-y-1">
            <p className="text-2xl font-black text-cyan-400">
              {dispenseProgress}%
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {machineState === 'WAITING_FOR_CUP' && 'Waiting for Cup Insertion...'}
              {machineState === 'POURING' && `Pouring Pump ${activePump || 'Active'}...`}
              {machineState === 'MIXING' && 'Stirrer Motor Blending Liquids...'}
              {machineState === 'COMPLETED' && 'Drink Ready! Take Your Cup.'}
              {machineState === 'PAUSED_NO_CUP' && 'Paused - Cup Removed'}
            </p>
          </div>
        </div>

        {/* 5-Pump Status Light Array */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Pump Relay Activity Status
          </span>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((pNum) => {
              const isActive = activePump === pNum;
              return (
                <div
                  key={pNum}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/30 scale-105'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    <Droplet size={14} className={isActive ? 'text-cyan-400 animate-bounce' : 'text-slate-600'} />
                  </div>
                  <span className="text-[10px] font-extrabold block">PUMP {pNum}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Message */}
        {machineState === 'COMPLETED' && (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 text-center text-emerald-300 space-y-1">
            <CheckCircle2 size={24} className="mx-auto text-emerald-400" />
            <h4 className="font-extrabold text-sm">Drink Dispensed Successfully!</h4>
            <p className="text-xs text-emerald-400/80">Enjoy your drink. System will reset shortly.</p>
          </div>
        )}

      </div>
    </div>
  );
};
