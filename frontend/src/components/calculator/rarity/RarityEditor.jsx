// src/components/calculator/rarity/RarityEditor.jsx
import React from 'react';
import { raritiesData } from '../../../data/rarities';
import RarityStatRow from './RarityStatRow';
import CustomSelect from '../../common/CustomSelect';

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
  
  // Подготовка опций для CustomSelect
  const emptyOption = { id: '', name: 'Без диковинки' };
  
  // Создаем группы для разных редкостей
  const mythicOptions = availableRarities
    .filter(r => r.rarity === 'mythic')
    .map(r => ({ id: r.id, name: `${r.name} (Мифический)` }));
    
  const legendaryOptions = availableRarities
    .filter(r => r.rarity === 'legendary')
    .map(r => ({ id: r.id, name: `${r.name} (Легендарный)` }));
    
  const epicOptions = availableRarities
    .filter(r => r.rarity === 'epic')
    .map(r => ({ id: r.id, name: `${r.name} (Эпический)` }));
  
  // Объединяем все опции
  const options = [
    emptyOption,
    ...mythicOptions,
    ...legendaryOptions,
    ...epicOptions
  ];

  // Обработчик выбора диковинки
  const handleRaritySelect = (rarityId) => {
    if (!rarityId) {
      // Если выбрано пустое значение, сбрасываем диковинку
      onRarityChange(null);
      return;
    }

    // Находим выбранную диковинку в данных
    const selectedRarity = raritiesData.find(r => r.id === rarityId);
    if (selectedRarity) {
      // Важно: не добавляем кастомные статы к объекту диковинки,
      // они хранятся отдельно и применяются только при расчете
      onRarityChange(selectedRarity);
    }
  };

  return (
    <div className="rarity-edit-panel">
      <h4 className="rarity-edit-title">
        Настройка диковинки {type === 'yin' ? 'Инь' : 'Ян'}
      </h4>

      <div className="form-group">
        <label className="block mb-2">Выберите диковинку:</label>
        <CustomSelect
          options={options}
          value={rarity?.id || ''}
          onChange={handleRaritySelect}
          placeholder="Выберите диковинку"
        />
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