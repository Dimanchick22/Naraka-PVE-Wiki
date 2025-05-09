// src/components/calculator/JadeGrid.jsx
import { useState, useEffect } from 'react';
import { jadesData, getJadeRarityColor, ModifierType, ModifierTarget } from '../../data/jades';

/**
 * Компонент сетки нефритов для калькулятора урона с возможностью настройки статов
 * @param {Object} props - Свойства компонента
 * @param {Array} props.jades - Массив с выбранными нефритами
 * @param {Function} props.onJadeChange - Функция обработки изменения нефрита
 * @returns {JSX.Element} - React компонент
 */
const JadeGrid = ({ jades = [], onJadeChange }) => {
  // Состояние для отслеживания выбранного индекса нефрита
  const [activeJadeIndex, setActiveJadeIndex] = useState(null);
  
  // Состояние для пользовательских статов нефритов (максимум 4 стата на нефрит)
  // Инициализируем каждый нефрит с 4 пустыми статами
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
    // Если выбрана пустая опция, устанавливаем null
    if (jadeId === '') {
      const updatedJades = [...jades];
      updatedJades[index] = null;
      onJadeChange(updatedJades);
      return;
    }
    
    // Находим выбранный нефрит по ID
    const selectedJade = jadesData.find(jade => jade.id === jadeId);
    
    if (selectedJade) {
      // Создаем копию нефрита для возможности изменения статов
      const jadeWithCustomStats = {
        ...selectedJade,
        // Статы будут добавлены через customJadeStats
        custom: true
      };
      
      // Обновляем список нефритов
      const updatedJades = [...jades];
      updatedJades[index] = jadeWithCustomStats;
      
      // Вызываем колбэк
      onJadeChange(updatedJades);
    }
  };
  
  // Обработчик изменения типа стата нефрита
  const handleStatTypeChange = (statIndex, type) => {
    if (activeJadeIndex === null) return;
    
    const updatedCustomStats = [...customJadeStats];
    updatedCustomStats[activeJadeIndex][statIndex].type = type;
    setCustomJadeStats(updatedCustomStats);
    
    // Обновляем нефрит, если он уже выбран
    if (jades[activeJadeIndex]) {
      updateJadeWithCustomStats(activeJadeIndex);
    }
  };
  
  // Обработчик изменения значения стата нефрита
  const handleStatValueChange = (statIndex, value) => {
    if (activeJadeIndex === null) return;
    
    const updatedCustomStats = [...customJadeStats];
    updatedCustomStats[activeJadeIndex][statIndex].value = Number(value);
    setCustomJadeStats(updatedCustomStats);
    
    // Обновляем нефрит, если он уже выбран
    if (jades[activeJadeIndex]) {
      updateJadeWithCustomStats(activeJadeIndex);
    }
  };
  
  // Обновление нефрита с пользовательскими статами
  const updateJadeWithCustomStats = (jadeIndex) => {
    if (!jades[jadeIndex]) return;
    
    const currentJade = jades[jadeIndex];
    const jadeStats = customJadeStats[jadeIndex];
    
    // Создаем обновленные статы на основе пользовательских значений
    // Учитываем только статы с непустым типом
    const updatedStats = jadeStats
      .filter(stat => stat.type !== '') // Фильтруем статы с непустым типом
      .map((stat, idx) => ({
        id: `custom_stat_${idx}`,
        name: getStatDisplayName(stat.type),
        type: ModifierType.PERCENTAGE,
        target: stat.type,
        value: stat.value
      }));
    
    // Обновляем нефрит
    const updatedJade = {
      ...currentJade,
      stats: updatedStats
    };
    
    // Обновляем список нефритов
    const updatedJades = [...jades];
    updatedJades[jadeIndex] = updatedJade;
    
    // Вызываем колбэк
    onJadeChange(updatedJades);
  };
  
  // Получение отображаемого имени типа стата
  const getStatDisplayName = (statType) => {
    switch (statType) {
      case ModifierTarget.ATTACK:
        return 'Атака';
      case ModifierTarget.ICE_EXPLOSION:
        return 'Лед. взрыв';
      case ModifierTarget.BOSS_ATTACK:
        return 'Атака по боссам';
      case ModifierTarget.MONSTER_ATTACK:
        return 'Атака по монстрам';
      case ModifierTarget.FUSION:
        return 'Слияние';
      case '':
        return 'Пусто';
      default:
        return statType;
    }
  };
  
  // Получение цвета нефрита в зависимости от редкости
  const getJadeColor = (jade) => {
    if (!jade) return '#555555';
    return getJadeRarityColor(jade.rarity);
  };
  
  // Опции для выбора типа стата
  const statTypeOptions = [
    { value: '', label: 'Пусто' },
    { value: ModifierTarget.ATTACK, label: 'Атака' },
    { value: ModifierTarget.ICE_EXPLOSION, label: 'Лед. взрыв' },
    { value: ModifierTarget.BOSS_ATTACK, label: 'Атака по боссам' },
    { value: ModifierTarget.MONSTER_ATTACK, label: 'Атака по монстрам' },
    { value: ModifierTarget.FUSION, label: 'Слияние' }
  ];

  return (
    <div className="jade-grid-container">
      <h3 className="section-title">Выбор нефритов</h3>
      <p className="section-subtitle">
        Выберите до 6 нефритов для расчета. Нажмите на нефрит, чтобы настроить его статы.
      </p>
      
      {/* Сетка с нефритами сверху */}
      <div className="jades-grid">
        {Array(6).fill(null).map((_, index) => {
          const jade = jades[index] || null;
          const isActive = activeJadeIndex === index;
          
          return (
            <div 
              key={index}
              className={`jade-item ${isActive ? 'active' : ''}`}
              onClick={() => handleJadeClick(index)}
              style={{ borderColor: getJadeColor(jade) }}
            >
              <div className="jade-header">
                <span className="jade-number">#{index + 1}</span>
                {jade && (
                  <span className="jade-rarity" style={{ color: getJadeColor(jade) }}>
                    {jade.rarity.toUpperCase()}
                  </span>
                )}
              </div>
              
              {jade ? (
                <div className="jade-stats-preview">
                  <div className="jade-name">{jade.name}</div>
                  <div className="jade-stats-list">
                    {jade.stats && jade.stats.length > 0 ? (
                      jade.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="jade-stat-preview">
                          <span className="stat-type">{stat.name}</span>
                          <span className="stat-value">{stat.value}%</span>
                        </div>
                      ))
                    ) : (
                      <div className="jade-no-stats">Нет активных статов</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="jade-empty-message">
                  Нажмите для выбора нефрита
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Панель настройки выбранного нефрита */}
      {activeJadeIndex !== null && (
        <div className="jade-edit-panel">
          <h4 className="jade-edit-title">Настройка нефрита #{activeJadeIndex + 1}</h4>
          
          <div className="jade-type-selection" style={{ marginBottom: '1rem' }}>
            <label style={{ marginBottom: '0.5rem', display: 'block' }}>Выберите тип нефрита:</label>
            <select 
              className="jade-select"
              value={jades[activeJadeIndex]?.id || ''}
              onChange={(e) => handleJadeSelect(e.target.value, activeJadeIndex)}
              style={{ width: '100%', padding: '0.5rem', backgroundColor: 'rgba(26, 26, 26, 0.8)', color: 'var(--naraka-light)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '4px' }}
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
          {jades[activeJadeIndex] && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '0.75rem' 
              }}>
                <h5 style={{ margin: 0 }}>Статы нефрита</h5>
              </div>
              
              <div className="jade-stats-list">
                {customJadeStats[activeJadeIndex].map((stat, statIndex) => (
                  <div 
                    key={statIndex} 
                    className="jade-stat-row" 
                    data-type={stat.type || 'empty'}
                    style={{ 
                      marginBottom: '0.75rem',
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ flex: 2 }}>
                      <select
                        value={stat.type}
                        onChange={(e) => handleStatTypeChange(statIndex, e.target.value)}
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
                    <div style={{ flex: 1, position: 'relative' }}>
                      <input
                        type="number"
                        value={stat.value}
                        onChange={(e) => handleStatValueChange(statIndex, e.target.value)}
                        min="0"
                        max="100"
                        step="5"
                        disabled={stat.type === ''}
                        style={{
                          width: '100%',
                          padding: '0.5rem 1.5rem 0.5rem 0.5rem',
                          backgroundColor: stat.type === '' ? 'rgba(26, 26, 26, 0.4)' : 'rgba(26, 26, 26, 0.8)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '4px',
                          color: 'var(--naraka-light)',
                          opacity: stat.type === '' ? 0.5 : 1
                        }}
                      />
                      {stat.type !== '' && (
                        <span style={{
                          position: 'absolute',
                          right: '0.5rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--naraka-light)',
                          opacity: '0.7',
                        }}>%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="jade-description" style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '4px', fontSize: '0.875rem' }}>
                <p>{jades[activeJadeIndex].description}</p>
              </div>
            </div>
          )}
          
          <div className="jade-edit-actions">
            <button 
              className="btn btn-secondary close-edit-button"
              onClick={() => setActiveJadeIndex(null)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadeGrid;