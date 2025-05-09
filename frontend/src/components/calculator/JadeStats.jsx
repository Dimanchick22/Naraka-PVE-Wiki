// src/components/calculator/JadeStats.jsx
import { useState } from 'react';
import { ModifierType, ModifierTarget } from '../../data/jades';

/**
 * Компонент для настройки дополнительных статов нефритов
 * @param {Object} props - Свойства компонента
 * @param {Array} props.jadeStats - Массив с кастомными статами нефритов
 * @param {Function} props.onJadeStatsChange - Функция обработки изменения статов
 * @returns {JSX.Element} - React компонент
 */
const JadeStats = ({ jadeStats = [], onJadeStatsChange }) => {
  // Инициализация пустых статов, если не переданы
  const stats = jadeStats.length > 0 ? jadeStats : [
    { type: 'attack', value: 0 },
    { type: 'ice_explosion', value: 0 },
    { type: 'boss_attack', value: 0 },
    { type: 'monster_attack', value: 0 }
  ];

  // Обработчик изменения типа стата
  const handleTypeChange = (type, index) => {
    const updatedStats = [...stats];
    updatedStats[index].type = type;
    onJadeStatsChange(updatedStats);
  };

  // Обработчик изменения значения стата
  const handleValueChange = (value, index) => {
    const updatedStats = [...stats];
    updatedStats[index].value = value;
    onJadeStatsChange(updatedStats);
  };

  // Опции для выбора типа стата
  const statTypeOptions = [
    { value: 'attack', label: 'Атака' },
    { value: 'ice_explosion', label: 'Лед. взрыв' },
    { value: 'boss_attack', label: 'Атака по боссам' },
    { value: 'monster_attack', label: 'Атака по монстрам' },
    { value: 'fusion', label: 'Слияние' }
  ];

  // Доступные процентные значения для быстрого выбора
  const percentValues = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70];

  return (
    <div className="jade-stats-container">
      <h3 className="section-title">Дополнительные статы</h3>
      <p className="section-subtitle">
        Укажите дополнительные статы, которые будут применяться к расчетам помимо выбранных нефритов.
      </p>

      <div className="jade-stats-list">
        {stats.map((stat, index) => (
          <div key={index} className="jade-stat-row" data-type={stat.type}>
            <div className="jade-stat-type">
              <select
                className="stat-type-select"
                value={stat.type}
                onChange={(e) => handleTypeChange(e.target.value, index)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(26, 26, 26, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  color: 'var(--naraka-light)',
                }}
              >
                {statTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="jade-stat-value">
              <div className="stat-value-input-container">
                <input
                  type="number"
                  className="stat-value-input"
                  value={stat.value}
                  onChange={(e) => handleValueChange(Number(e.target.value), index)}
                  min="0"
                  max="100"
                  step="5"
                />
                <span className="input-suffix">%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="stat-presets">
        <h4>Быстрый выбор значений</h4>
        <div className="preset-buttons">
          {percentValues.map((value) => (
            <button
              key={value}
              className="preset-button"
              onClick={() => {
                // Находим первый стат с нулевым значением или обновляем первый, если все заполнены
                const targetIndex = stats.findIndex(s => s.value === 0);
                if (targetIndex !== -1) {
                  handleValueChange(value, targetIndex);
                } else {
                  handleValueChange(value, 0);
                }
              }}
            >
              {value}%
            </button>
          ))}
        </div>
        <div className="preset-buttons" style={{ marginTop: '0.5rem' }}>
          <button
            className="preset-button preset-button-clear"
            onClick={() => {
              // Сбрасываем все значения на 0
              const resetStats = stats.map(stat => ({ ...stat, value: 0 }));
              onJadeStatsChange(resetStats);
            }}
            style={{
              backgroundColor: 'rgba(139, 0, 0, 0.3)',
              borderColor: 'rgba(139, 0, 0, 0.5)',
              width: '100%'
            }}
          >
            Сбросить все значения
          </button>
        </div>
      </div>

      <div className="stat-help" style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--naraka-light)', opacity: '0.7', borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '1rem' }}>
        <p>
          <strong>Подсказка:</strong> Дополнительные статы суммируются с 
          эффектами выбранных нефритов и диковинок. Это позволяет смоделировать различные
          комбинации статов для оптимизации урона.
        </p>
      </div>
    </div>
  );
};

export default JadeStats;