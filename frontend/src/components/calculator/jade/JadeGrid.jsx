// src/components/calculator/jade/JadeGrid.jsx
import { useState } from 'react';
import JadeItem from './JadeItem';
import JadeEditor from './JadeEditor';

const JadeGrid = ({ jades = [], onJadeChange }) => {
  // Состояние для отслеживания выбранного индекса нефрита
  const [activeJadeIndex, setActiveJadeIndex] = useState(null);
  
  // Состояние для пользовательских статов нефритов
  const [customJadeStats, setCustomJadeStats] = useState(
    Array(6).fill(null).map(() => [
      { type: '', value: 0 },
      { type: '', value: 0 },
      { type: '', value: 0 },
      { type: '', value: 0 }
    ])
  );
  
  // Функция для обработки клика по слоту нефрита
  const handleJadeClick = (index) => {
    setActiveJadeIndex(activeJadeIndex === index ? null : index);
  };
  
  // Функция для обработки выбора типа нефрита
  const handleJadeSelect = (jadeId, index) => {
    // Здесь логика выбора нефрита
    // ...
  };
  
  // Обработчик изменения типа стата нефрита
  const handleStatTypeChange = (statIndex, type) => {
    // Здесь логика изменения типа стата
    // ...
  };
  
  // Обработчик изменения значения стата нефрита
  const handleStatValueChange = (statIndex, value) => {
    // Здесь логика изменения значения стата
    // ...
  };
  
  // Обновление нефрита с пользовательскими статами
  const updateJadeWithCustomStats = (jadeIndex) => {
    // Здесь логика обновления нефрита
    // ...
  };
  
  return (
    <div className="jade-grid-container">
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
          onJadeSelect={(jadeId) => handleJadeSelect(jadeId, activeJadeIndex)}
          onStatTypeChange={handleStatTypeChange}
          onStatValueChange={handleStatValueChange}
          onClose={() => setActiveJadeIndex(null)}
        />
      )}
    </div>
  );
};

export default JadeGrid;