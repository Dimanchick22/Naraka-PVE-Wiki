// src/components/calculator/rarity/RarityEditor.jsx
import React from 'react';
import { raritiesData } from '../../../data/rarities';
import RarityStatRow from './RarityStatRow';

const RarityEditor = ({
  type,
  rarity,
  stats,
  character,
  onRarityChange,
  onStatTypeChange,
  onStatValueChange,
  onClose
}) => {
  // Получаем доступные диковинки для персонажа
  const getAvailableRarities = (rarityType) => {
    return raritiesData.filter(r => 
      r.type === rarityType && 
      (
        !r.for_character || 
        r.for_character === character.name ||
        r.name === "Чаша увядшей славы" // Чаша увядшей славы доступна для всех
      )
    );
  };

  // Доступные диковинки для выбранного типа
  const availableRarities = getAvailableRarities(type);

  return (
    <div className="rarity-edit-panel">
      <h4 className="rarity-edit-title">
        Настройка диковинки {type === 'yin' ? 'Инь' : 'Ян'}
      </h4>

      <div className="form-group">
        <label className="block mb-2">Выберите диковинку:</label>
        <select
          className="form-control"
          value={rarity?.id || ''}
          onChange={(e) => onRarityChange(e.target.value)}
        >
          <option value="">Без диковинки</option>
          <optgroup label="Мифические">
            {availableRarities.filter(r => r.rarity === 'mythic').map(r => (
              <option key={r.id} value={r.id}>
                {r.name} (Мифический)
              </option>
            ))}
          </optgroup>
          <optgroup label="Легендарные">
            {availableRarities.filter(r => r.rarity === 'legendary').map(r => (
              <option key={r.id} value={r.id}>
                {r.name} (Легендарный)
              </option>
            ))}
          </optgroup>
          <optgroup label="Эпические">
            {availableRarities.filter(r => r.rarity === 'epic').map(r => (
              <option key={r.id} value={r.id}>
                {r.name} (Эпический)
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Настройка статов диковинки */}
      {rarity && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h5 className="m-0">Статы диковинки</h5>
          </div>
          
          <div className="rarity-stats-list">
            {stats.map((stat, statIndex) => (
              <RarityStatRow
                key={statIndex}
                stat={stat}
                statIndex={statIndex}
                onTypeChange={(type) => onStatTypeChange(statIndex, type)}
                onValueChange={(value) => onStatValueChange(statIndex, value)}
              />
            ))}
          </div>
          
          {/* Описание диковинки */}
          <div className="p-3 bg-black bg-opacity-20 rounded-md mt-4 text-sm">
            <p>{rarity.description}</p>
          </div>
          
          {/* Информация о персонаже, для которого предназначена диковинка */}
          {rarity.for_character && (
            <div className="mt-3 p-3 bg-purple-900 bg-opacity-10 rounded-md text-sm border-l-3 border-purple-900 border-opacity-50">
              <p className="m-0">
                <strong>Предназначена для:</strong> {rarity.for_character}
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-end mt-4 pt-2 border-t border-opacity-30 border-yellow-600">
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

export default RarityEditor;