import React from 'react';
import { ArrowUpRight, Check, Clock, GlassWater } from 'lucide-react';
import { useBartender } from '../context/BartenderContext';

export const DrinkSelectionGrid = () => {
  const { drinks, selectedDrink, setSelectedDrink } = useBartender();
  return <div className="cocktail-grid">
    {drinks.map(drink => {
      const selected = selectedDrink?.id === drink.id;
      return <article key={drink.id} className={`cocktail-card ${selected ? 'selected' : ''}`} onClick={() => setSelectedDrink(drink)}>
        <div className="cocktail-image">
          <img src={drink.image} alt={drink.name} />
          <span className="drink-number">0{drink.numBadge}</span><span className="drink-tag">{drink.category}</span>
          {selected && <span className="selected-badge"><Check size={14} /></span>}
        </div>
        <div className="cocktail-body">
          <div className="cocktail-title"><h3>{drink.name}</h3><ArrowUpRight size={17} /></div>
          <p>{drink.ingredientsSummary}</p>
          <div className="ingredient-row"><GlassWater size={13} /> <span>{drink.ingredientsDetailed.map(i => `${i.name} ${i.amount}`).join(' · ')}</span></div>
          <div className="cocktail-meta"><span>LKR {drink.priceLkr.toFixed(0)}</span><small><Clock size={10} /> {drink.prepTime}</small></div>
          <button onClick={e => { e.stopPropagation(); setSelectedDrink(drink); }} className={`select-drink ${selected ? 'selected-btn' : ''}`}>{selected && <Check size={12} />}{selected ? 'SELECTED' : 'SELECT DRINK'}</button>
        </div>
      </article>;
    })}
  </div>;
};
