import React from 'react';
import { useBartender } from '../context/BartenderContext';
import { AlertTriangle, CheckCircle2, RotateCw, OctagonX, Droplet, ShieldCheck } from 'lucide-react';

export const DispenseStatusModal = () => {
  const {
    machineState,
    cupDetected,
    setCupDetected,
    pumpsState,
    prepProgress,
    selectedDrink,
    stirrerMotor,
    emergencyStop
  } = useBartender();

  const shouldShow = ['WAITING_FOR_CUP', 'PREPARING', 'PAUSED_NO_CUP'].includes(machineState);
  if (!shouldShow) return null;

  const activePumpIdx = pumpsState.findIndex(p => p.status === 'ON');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="modern-card w-full max-w-md bg-white p-5 space-y-4 relative shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <div>
            <span className="badge-black">DISPENSE IN PROGRESS</span>
            <h3 className="text-base font-black text-[#111] mt-1">
              {selectedDrink?.name || 'Dispensing Beverage'}
            </h3>
          </div>
          <button
            onClick={emergencyStop}
            className="btn-modern-red text-xs px-3 py-1.5 flex items-center gap-1.5"
          >
            <OctagonX size={13} /> E-STOP
          </button>
        </div>

        {/* Cup Detection Safety Warning */}
        {!cupDetected && (
          <div className="bg-[#e6392f]/10 border-2 border-[#e6392f]/40 rounded-xl p-3 flex items-center justify-between gap-3 text-[#111] animate-pulse">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="text-[#e6392f] flex-shrink-0" size={20} />
              <div>
                <h4 className="font-black text-xs text-[#e6392f] uppercase tracking-wide">
                  NO CUP DETECTED
                </h4>
                <p className="text-[10px] text-[#77756e]">
                  Pumps paused. Place cup under dispenser nozzle.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCupDetected(true)}
              className="btn-modern-black text-[9px] px-2.5 py-1 whitespace-nowrap"
            >
              Insert Cup
            </button>
          </div>
        )}

        {cupDetected && (
          <div className="bg-[#159447]/10 border border-[#159447]/20 rounded-xl p-2 flex items-center gap-2 text-[#159447] text-xs font-bold">
            <ShieldCheck size={14} /> Cup detected — IR interlock clear
          </div>
        )}

        {/* Cup + Liquid Fill Animation */}
        <div className="flex flex-col items-center py-3 bg-[#f4f1e8] rounded-2xl border border-black/10">

          {stirrerMotor === 'ON' && (
            <div className="mb-1 text-[#8b5cf6]">
              <RotateCw size={18} className="animate-spin" />
            </div>
          )}

          {/* Cup Graphic */}
          <div className="relative w-28 h-36 border-4 border-t-0 border-[#111] rounded-b-2xl overflow-hidden bg-white shadow-inner flex flex-col justify-end">
            <div
              style={{
                height: `${prepProgress}%`,
                background: 'linear-gradient(180deg, #f5c400 0%, #ffe477 100%)',
              }}
              className="w-full transition-all duration-300 relative"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-white/40 blur-[1px] animate-pulse" />
            </div>

            {prepProgress === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-[#77756e] uppercase tracking-wider">
                Cup Ready
              </div>
            )}
          </div>

          <div className="mt-3 text-center space-y-0.5">
            <p className="text-2xl font-black text-[#111] font-mono">{prepProgress}%</p>
            <p className="text-[9px] font-bold text-[#77756e] uppercase tracking-wider">
              {machineState === 'WAITING_FOR_CUP' && 'Waiting for cup insertion...'}
              {machineState === 'PREPARING' && stirrerMotor === 'ON' && 'Stirrer blending liquids...'}
              {machineState === 'PREPARING' && stirrerMotor !== 'ON' && `Pouring ${activePumpIdx >= 0 ? `Pump ${activePumpIdx + 1}` : ''}...`}
              {machineState === 'PAUSED_NO_CUP' && 'Paused — cup removed'}
            </p>
          </div>
        </div>

        {/* 5-Pump Status Lights */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold text-[#77756e] uppercase tracking-widest block">
            Pump Relay Activity
          </span>
          <div className="grid grid-cols-5 gap-1.5">
            {pumpsState.map((p) => {
              const isOn = p.status === 'ON';
              return (
                <div
                  key={p.id}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isOn
                      ? 'bg-[#f5c400]/30 border-[#111] text-[#111] animate-pulse'
                      : 'bg-[#f4f1e8] border-black/10 text-[#77756e]'
                  }`}
                >
                  <Droplet size={11} className="mx-auto mb-0.5" />
                  <span className="text-[8px] font-black block">P{p.id}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
