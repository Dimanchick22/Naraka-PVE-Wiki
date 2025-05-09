// src/components/calculator/rarity/RaritiesPanel.jsx
import { useState } from 'react';
import { RarityType } from '../../../data/rarities';
import RaritySlot from './RaritySlot';
import RarityEditor from './RarityEditor';

const RaritiesPanel = ({ yinRarity, yangRarity, onRarityChange, character }) => {
  // Состояние для отслеживания выбранной диковинки
  const [selectedType, setSelectedType] = useState(null); // 'yin' или 'yang'
  
  // Состояние для пользовательских статов диковинок
  const [yinRarityStats, setYinRarityStats] = useState([
    { type: '', value: 0 },
    { type: '', value: 0 },
    { type: '', value: 0 },
    { type: '', value: 0 }
  ]);
  
  const [yangRarityStats, setYangRarityStats] = useState([
    { type: '', value: 0 },
    { type: '', value: 0 },
    { type: '', value: 0 },
    { type: '', value: 0 }
  ]);
  
  // Если персонаж не выбран, показываем сообщение
  if (!character) {
    return (
      <div className="rarities-panel">
        <h3 className="section-title">Диковинки</h3>
        <div className="no-character-message">
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
  const handleRarityChange = (rarityId, type) => {
    // Логика изменения диковинки
    // ...
  };
  
  // Обработчик изменения типа стата
  const handleStatTypeChange = (statIndex, statType) => {
    // Логика изменения типа стата
    // ...
  };
  
  // Обработчик изменения значения стата
  const handleStatValueChange = (statIndex, value) => {
    // Логика изменения значения стата
    // ...
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
          onRarityChange={(rarityId) => handleRarityChange(rarityId, selectedType)}
          onStatTypeChange={handleStatTypeChange}
          onStatValueChange={handleStatValueChange}
          onClose={() => setSelectedType(null)}
        />
      )}
      
      <div className="stat-help" style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--naraka-light)', opacity: '0.7', borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '1rem' }}>
        <p>
          <strong>Примечание:</strong> Все версии диковинки "Чаша увядшей славы" доступны для всех персонажей.
          Остальные диковинки доступны только персонажам, для которых они предназначены.
        </p>
      </div>
    </div>
  );
};

export default RaritiesPanel;