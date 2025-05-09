// src/components/calculator/JadeGrid.jsx
import { useState } from 'react';
import { jadesData, getJadeRarityColor } from '../../data/jades';

/**
 * Компонент сетки нефритов для калькулятора урона
 * @param {Object} props - Свойства компонента
 * @param {Array} props.jades - Массив с выбранными нефритами
 * @param {Function} props.onJadeChange - Функция обработки изменения нефрита
 * @returns {JSX.Element} - React компонент
 */
const JadeGrid = ({ jades = [], onJadeChange }) => {
  const [activeJadeIndex, setActiveJadeIndex] = useState(null);
  
  // Функция для обработки клика по слоту нефрита
  const handleJadeClick = (index) => {
    setActiveJadeIndex(activeJadeIndex === index ? null : index);
  };
  
  // Функция для обработки выбора нефрита
  const handleJadeSelect = (jadeId, index) => {
    // Найти выбранный нефрит
    const selectedJade = jadeId === '' ? null : jadesData.find(jade => jade.id === jadeId);
    
    // Обновить массив нефритов
    const updatedJades = [...jades];
    updatedJades[index] = selectedJade;
    
    // Вызвать колбэк
    onJadeChange(updatedJades);
  };
  
  // Получение цвета нефрита в зависимости от редкости
  const getJadeColor = (jade) => {
    if (!jade) return '#555555';
    return getJadeRarityColor(jade.rarity);
  };

  // Вспомогательная функция для сокращения длинного названия
  const truncateText = (text, maxLength = 20) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="jade-grid-container">
      <h3 className="section-title">Выбор нефритов</h3>
      <p className="section-subtitle">
        Выберите нефриты, которые будут использоваться в расчете. Вы можете выбрать до 6 нефритов разного типа.
      </p>
      
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
                  <div className="jade-name">{truncateText(jade.name)}</div>
                  <div className="jade-type">Тип: {jade.type}</div>
                  <div className="jade-stats-list">
                    {jade.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="jade-stat-preview">
                        <span className="stat-type">{stat.name}</span>
                        <span className="stat-value">{stat.value}%</span>
                      </div>
                    ))}
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
      
      {activeJadeIndex !== null && (
        <div className="jade-edit-panel">
          <h4 className="jade-edit-title">Выбор нефрита для слота {activeJadeIndex + 1}</h4>
          
          <div className="jade-stats-edit">
            <div className="jade-stat-row">
              <div className="jade-stat-type">
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
            </div>
            
            {jades[activeJadeIndex] && (
              <div className="jade-description" style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--naraka-light)', opacity: 0.8 }}>
                <p>{jades[activeJadeIndex].description}</p>
              </div>
            )}
          </div>
          
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