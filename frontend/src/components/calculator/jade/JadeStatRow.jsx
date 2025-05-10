// src/components/calculator/jade/JadeStatRow.jsx
import React from 'react';
import { ModifierTarget } from '../../../data/jades';
import CustomSelect from '../../common/CustomSelect';

const JadeStatRow = ({ stat, statIndex, onTypeChange, onValueChange }) => {
  // Опции для выбора типа стата
  const statTypeOptions = [
    { id: '', name: 'Пусто' },
    { id: ModifierTarget.ATTACK, name: 'Атака' },
    { id: ModifierTarget.ICE_EXPLOSION, name: 'Лед. взрыв' },
    { id: ModifierTarget.BOSS_ATTACK, name: 'Атака по боссам' },
    { id: ModifierTarget.MONSTER_ATTACK, name: 'Атака по монстрам' },
    { id: ModifierTarget.FUSION, name: 'Слияние' }
  ];

  return (
    <div 
      className="jade-stat-row" 
      data-type={stat.type || 'empty'}
    >
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <CustomSelect
            options={statTypeOptions}
            value={stat.type}
            onChange={onTypeChange}
            placeholder="Выберите тип стата"
          />
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