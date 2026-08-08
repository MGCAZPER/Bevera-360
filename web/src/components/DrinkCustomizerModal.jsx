import React, { useState } from 'react';
import { useBartender } from '../context/BartenderContext';
import { X, Play, Sliders, Droplets, RotateCw, Save } from 'lucide-react';

export const DrinkCustomizerModal = ({ onClose }) => {
  const { tanks, placeOrder, addNewDrink } = useBartender();
  
  const [customName, setCustomName] = useState('My Custom Mix');
  const [volumes, setVolumes] = useState([30, 30, 20, 20, 20]); // ml for pumps 1-5
  const [stirrerSec, setStirrerSec] = useState(3);
  const [saveToMenu, setSaveToMenu] = useState(false);

  const totalVolume = volumes.reduce((a, b) => a + b, 0);

  const handleVolumeChange = (index, value) => {
    const newVols = [...volumes];
    newVols[index] = parseInt(value) || 0;
    setVolumes(newVols);
  };

  const handleDispense = () => {
    const customRecipe = {
      name: customName || 'Custom Drink',
      category: 'Custom Blend',
      description: 'Personalized mixology recipe engineered in custom lab.',
      icon: '🧪',
      volumesMl: volumes,
      stirrerSec,
      popular: false
    };

    if (saveToMenu) {
      addNewDrink(customRecipe);
    }

    placeOrder(customRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-2xl overflow-hidden border border-slate-700/80 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Sliders className="text-cyan-400" size={20} />
            <h3 className="text-xl font-bold text-white">Custom Mixology Lab</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Custom Name */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Drink Name
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Electric Cyber Punch"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
            />
          </div>

          {/* Liquid Pump Sliders */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Liquid Ratio (Pumps 1 - 5)
              </label>
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                <Droplets size={14} /> Total Volume: {totalVolume} ml
              </span>
            </div>

            <div className="space-y-3">
              {tanks.map((tank, idx) => (
                <div key={tank.id} className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tank.color }} />
                      <span className="font-bold text-white">Pump {idx + 1}:</span>
                      <span className="text-slate-400 text-xs">{tank.name}</span>
                    </div>
                    <span className="font-extrabold text-cyan-400">{volumes[idx]} ml</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={volumes[idx]}
                    onChange={(e) => handleVolumeChange(idx, e.target.value)}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Stirrer Duration */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCw className="text-purple-400" size={20} />
              <div>
                <h4 className="text-sm font-bold text-white">Stirrer Motor Time</h4>
                <p className="text-xs text-slate-400">Duration 12V gear motor mixes liquids</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="10"
                value={stirrerSec}
                onChange={(e) => setStirrerSec(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-center text-white font-bold outline-none"
              />
              <span className="text-xs text-slate-400">sec</span>
            </div>
          </div>

          {/* Option to Save Recipe */}
          <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-300">
            <input
              type="checkbox"
              checked={saveToMenu}
              onChange={(e) => setSaveToMenu(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900"
            />
            <span className="flex items-center gap-1.5">
              <Save size={14} className="text-cyan-400" /> Save recipe to main menu catalog
            </span>
          </label>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-900/60">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleDispense} className="btn btn-primary" disabled={totalVolume === 0}>
            <Play size={16} />
            <span>Mix & Dispense</span>
          </button>
        </div>

      </div>
    </div>
  );
};
