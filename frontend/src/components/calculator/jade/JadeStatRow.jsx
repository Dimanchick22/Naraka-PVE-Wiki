// src/components/calculator/jade/JadeStatRow.jsx
import React from 'react';
import { ModifierTarget } from '../../../data/jades';

// Опции для выбора типа стата
const statTypeOptions = [
  { value: '', label: 'Пусто' },
  { value: ModifierTarget.ATTACK, label: 'Атака' },
  { value: ModifierTarget.ICE_EXPLOSION, label: 'Лед. взрыв' },
  { value: ModifierTarget.BOSS_ATTACK, label: 'Атака по боссам' },
  { value: ModifierTarget.MONSTER_ATTACK, label: 'Атака по монстрам' },
  { value: ModifierTarget.FUSION, label: 'Слияние' }
];

const JadeStatRow = ({ stat, statIndex, onTypeChange, onValueChange }) => {
  return (
    <div 
      className="jade-stat-row" 
      data-type={stat.type || 'empty'}
    >
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <select
            className="form-control"
            value={stat.type}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            {statTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="input-with-suffix">
          <input
            type="number"
            className="form-control"
            value={stat.value}
            onChange={(e) => onValueChange(Number(e.target.value))}
            min="0"
            max="100"
            step="5"
            disabled={stat.type === ''}
          />
          {stat.type !== '' && <span className="input-suffix">%</span>}
        </div>
      </div>
    </div>
  );
};

export default JadeStatRow;