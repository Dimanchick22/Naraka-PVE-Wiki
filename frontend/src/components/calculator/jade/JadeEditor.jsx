// src/components/calculator/jade/JadeEditor.jsx
import React from 'react';
import { jadesData } from '../../../data/jades';
import JadeStatRow from './JadeStatRow';

const JadeEditor = ({
  jadeIndex,
  jade,
  customStats,
  onJadeSelect,
  onStatTypeChange,
  onStatValueChange,
  onClose
}) => {
  return (
    <div className="jade-edit-panel">
      <h4 className="jade-edit-title">Настройка нефрита #{jadeIndex + 1}</h4>
      
      <div className="form-group">
        <label className="mb-2 block">Выберите тип нефрита:</label>
        <select 
          className="form-control"
          value={jade?.id || ''}
          onChange={(e) => onJadeSelect(e.target.value)}
        >
          <option value="">Нет нефрита</option>
          <optgroup label="Атака">
            {jadesData.filter(jade => jade.type === 'attack').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
          <optgroup label="Ледяной взрыв">
            {jadesData.filter(jade => jade.type === 'ice_explosion').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
          <optgroup label="Атака по боссам">
            {jadesData.filter(jade => jade.type === 'boss_attack').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
          <optgroup label="Атака по монстрам">
            {jadesData.filter(jade => jade.type === 'monster_attack').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
          <optgroup label="Слияние">
            {jadesData.filter(jade => jade.type === 'fusion').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
          <optgroup label="Смешанные">
            {jadesData.filter(jade => jade.type === 'mixed').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      
      {/* Настройка статов нефрита - максимум 4 стата */}
      {jade && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h5 className="m-0">Статы нефрита</h5>
          </div>
          
          <div className="jade-stats-list">
            {customStats.map((stat, statIndex) => (
              <JadeStatRow
                key={statIndex}
                stat={stat}
                statIndex={statIndex}
                onTypeChange={(type) => onStatTypeChange(statIndex, type)}
                onValueChange={(value) => onStatValueChange(statIndex, value)}
              />
            ))}
          </div>
          
          <div className="p-3 bg-black bg-opacity-20 rounded-md mt-4 text-sm">
            <p>{jade.description}</p>
          </div>
        </div>
      )}
      
      <div className="jade-edit-actions">
        <button 
          className="btn btn-secondary btn-small"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default JadeEditor;