// src/components/calculator/jade/JadeGrid.jsx
import React, { useState } from 'react';
import JadeItem from './JadeItem';
import JadeEditor from './JadeEditor';
import { jadesData } from '../../../data/jades';

const JadeGrid = ({ 
  jades = [], 
  onJadeChange, 
  customJadeStats,
  onJadeStatsChange
}) => {
  // Состояние для отслеживания выбранного индекса нефрита
  const [activeJadeIndex, setActiveJadeIndex] = useState(null);
  
  // Функция для обработки клика по слоту нефрита
  const handleJadeClick = (index) => {
    setActiveJadeIndex(activeJadeIndex === index ? null : index);
  };
  
  // Функция для обработки выбора типа нефрита
  const handleJadeSelect = (jadeId) => {
    if (!jadeId) {
      // Если выбрано пустое значение, удаляем нефрит
      // и сбрасываем его кастомные статы
      const updatedJades = [...jades];
      updatedJades[activeJadeIndex] = null;
      onJadeChange(updatedJades);
      
      // Сбрасываем кастомные статы для этого нефрита
      const updatedStats = [...customJadeStats];
      updatedStats[activeJadeIndex] = [
        { type: '', value: 0 },
        { type: '', value: 0 },
        { type: '', value: 0 },
        { type: '', value: 0 }
      ];
      onJadeStatsChange(activeJadeIndex, 0, '', 0); // Вызываем с пустыми значениями для сброса
      return;
    }

    // Находим выбранный нефрит в данных
    const selectedJade = jadesData.find(jade => jade.id === jadeId);
    if (selectedJade) {
      const updatedJades = [...jades];
      // Важно: НЕ добавляем customStats в объект нефрита здесь
      // Они хранятся отдельно в массиве customJadeStats
      updatedJades[activeJadeIndex] = selectedJade;
      onJadeChange(updatedJades);
    }
  };

  // Обработчик изменения типа стата нефрита
  const handleStatTypeChange = (statIndex, type) => {
    if (activeJadeIndex === null) return;
    onJadeStatsChange(activeJadeIndex, statIndex, type, undefined);
  };

  // Обработчик изменения значения стата нефрита
  const handleStatValueChange = (statIndex, value) => {
    if (activeJadeIndex === null) return;
    onJadeStatsChange(activeJadeIndex, statIndex, undefined, value);
  };
  
  return (
    <div className="jades-grid-container">
      <h3 className="section-title">Выбор нефритов</h3>
      <p className="section-subtitle">
        Выберите до 6 нефритов для расчета. Нажмите на нефрит, чтобы настроить его статы.
      </p>
      
      {/* Сетка с нефритами */}
      <div className="jades-grid">
        {Array(6).fill(null).map((_, index) => (
          <JadeItem
            key={index}
            index={index}
            jade={jades[index]}
            isActive={activeJadeIndex === index}
            onClick={() => handleJadeClick(index)}
          />
        ))}
      </div>
      
      {/* Панель настройки выбранного нефрита */}
      {activeJadeIndex !== null && (
        <JadeEditor
          jadeIndex={activeJadeIndex}
          jade={jades[activeJadeIndex]}
          customStats={customJadeStats[activeJadeIndex]}
          onJadeSelect={(jadeId) => handleJadeSelect(jadeId)}
          onStatTypeChange={handleStatTypeChange}
          onStatValueChange={handleStatValueChange}
          onClose={() => setActiveJadeIndex(null)}
        />
      )}
    </div>
  );
};

export default JadeGrid;