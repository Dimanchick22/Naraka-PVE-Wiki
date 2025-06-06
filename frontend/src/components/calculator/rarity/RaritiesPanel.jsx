// src/components/calculator/rarity/RaritiesPanel.jsx
import React, { useState } from 'react';
import { RarityType, raritiesData } from '../../../data/rarities';
import RaritySlot from './RaritySlot';
import RarityEditor from './RarityEditor';

const RaritiesPanel = ({ 
  yinRarity, 
  yangRarity, 
  onRarityChange, 
  character,
  yinRarityStats,
  onYinRarityStatsChange,
  yangRarityStats,
  onYangRarityStatsChange
}) => {
  // Состояние для отслеживания выбранной диковинки
  const [selectedType, setSelectedType] = useState(null); // 'yin' или 'yang'
  
  // Если персонаж не выбран, показываем сообщение
  if (!character) {
    return (
      <div className="rarities-panel">
        <h3 className="section-title">Диковинки</h3>
        <div className="p-4 text-center text-gray-400">
          Выберите персонажа, чтобы настроить диковинки
        </div>
      </div>
    );
  }

  // Обработчик выбора диковинки для просмотра/редактирования
  const handleSelectRarityType = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  // Обработчик изменения диковинки
  const handleRarityChange = (rarity) => {
    // Выбираем тип диковинки на основе текущего состояния
    const type = selectedType;
    
    if (!type) return; // Если тип не определен, выходим
    
    // Обновляем состояние в родительском компоненте
    onRarityChange(rarity, type);
    
    // Если выбрана пустая диковинка (null), сбрасываем также статы
    if (!rarity) {
      // Сбрасываем статы для соответствующего типа
      const defaultStats = [
        { type: '', value: 0 },
        { type: '', value: 0 },
        { type: '', value: 0 },
        { type: '', value: 0 }
      ];
      
      if (type === RarityType.YIN) {
        // Сбрасываем статы для Инь
        defaultStats.forEach((_, index) => {
          onYinRarityStatsChange(index, '', 0);
        });
      } else if (type === RarityType.YANG) {
        // Сбрасываем статы для Ян
        defaultStats.forEach((_, index) => {
          onYangRarityStatsChange(index, '', 0);
        });
      }
    }
  };
  
  // Обработчик изменения типа стата
  const handleStatTypeChange = (statIndex, statType) => {
    if (selectedType === RarityType.YIN) {
      onYinRarityStatsChange(statIndex, statType, undefined);
    } else if (selectedType === RarityType.YANG) {
      onYangRarityStatsChange(statIndex, statType, undefined);
    }
  };
  
  // Обработчик изменения значения стата
  const handleStatValueChange = (statIndex, value) => {
    if (selectedType === RarityType.YIN) {
      onYinRarityStatsChange(statIndex, undefined, value);
    } else if (selectedType === RarityType.YANG) {
      onYangRarityStatsChange(statIndex, undefined, value);
    }
  };

  return (
    <div className="rarities-panel">
      <h3 className="section-title">Диковинки</h3>
      <p className="section-subtitle">
        У персонажа может быть активно до двух диковинок: одна типа Инь и одна типа Ян.
        Нажмите на диковинку, чтобы настроить её.
      </p>

      {/* Сетка для диковинок */}
      <div className="rarities-grid">
        {/* Диковинка типа Инь */}
        <RaritySlot
          type={RarityType.YIN}
          rarity={yinRarity}
          isSelected={selectedType === RarityType.YIN}
          onClick={() => handleSelectRarityType(RarityType.YIN)}
        />

        {/* Диковинка типа Ян */}
        <RaritySlot
          type={RarityType.YANG}
          rarity={yangRarity}
          isSelected={selectedType === RarityType.YANG}
          onClick={() => handleSelectRarityType(RarityType.YANG)}
        />
      </div>

      {/* Панель настройки диковинки */}
      {selectedType && (
        <RarityEditor
          type={selectedType}
          rarity={selectedType === RarityType.YIN ? yinRarity : yangRarity}
          stats={selectedType === RarityType.YIN ? yinRarityStats : yangRarityStats}
          character={character}
          onRarityChange={handleRarityChange}
          onStatTypeChange={handleStatTypeChange}
          onStatValueChange={handleStatValueChange}
          onClose={() => setSelectedType(null)}
        />
      )}
      
      <div className="p-4 text-sm text-gray-400 border-t border-yellow-900 border-opacity-20 mt-4">
        <p>
          <strong>Примечание:</strong> Все версии диковинки "Чаша увядшей славы" доступны для всех персонажей.
          Остальные диковинки доступны только персонажам, для которых они предназначены.
        </p>
      </div>
    </div>
  );
};

export default RaritiesPanel;