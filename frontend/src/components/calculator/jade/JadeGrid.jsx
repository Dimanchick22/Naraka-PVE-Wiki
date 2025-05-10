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
      const updatedJades = [...jades];
      updatedJades[activeJadeIndex] = null;
      onJadeChange(updatedJades);
      return;
    }

    // Находим выбранный нефрит в данных
    const selectedJade = jadesData.find(jade => jade.id === jadeId);
    if (selectedJade) {
      const updatedJades = [...jades];
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