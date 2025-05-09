// src/components/calculator/RaritiesPanel.jsx
import { useState, useEffect } from 'react';
import { raritiesData, RarityType, getRarityColor, getRarityName, getRarityTypeName } from '../../data/rarities';
import { ModifierTarget } from '../../data/jades';
import CloudinaryImage from '../common/CloudinaryImage';

/**
 * Обновленный компонент панели выбора диковинок с возможностью настройки статов
 * @param {Object} props - Свойства компонента
 * @param {Object} props.yinRarity - Выбранная диковинка типа Инь
 * @param {Object} props.yangRarity - Выбранная диковинка типа Ян
 * @param {Function} props.onRarityChange - Функция обработки изменения диковинки
 * @param {Object} props.character - Выбранный персонаж
 * @returns {JSX.Element} - React компонент
 */
const RaritiesPanel = ({ yinRarity, yangRarity, onRarityChange, character }) => {
  // Состояние для отслеживания выбранной диковинки
  const [selectedType, setSelectedType] = useState(null); // 'yin' или 'yang'
  
  // Состояние для пользовательских статов диковинок (максимум 4 стата на диковинку)
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

  // Получаем доступные диковинки для персонажа
  // Здесь мы включаем как диковинки для конкретного персонажа, так и универсальные
  const getAvailableRarities = (type) => {
    return raritiesData.filter(rarity => 
      rarity.type === type && 
      (
        !rarity.for_character || 
        rarity.for_character === character.name ||
        rarity.name === "Чаша увядшей славы" // Чаша увядшей славы доступна для всех
      )
    );
  };

  // Доступные диковинки по типам
  const yinRarities = getAvailableRarities(RarityType.YIN);
  const yangRarities = getAvailableRarities(RarityType.YANG);

  // Обработчик выбора диковинки для просмотра/редактирования
  const handleSelectRarityType = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  // Обработчик изменения диковинки
  const handleRarityChange = (rarityId, type) => {
    // Если пустая опция, устанавливаем null
    if (rarityId === '') {
      onRarityChange(null, type);
      return;
    }
    
    // Находим выбранную диковинку
    const selectedRarity = raritiesData.find(r => r.id === rarityId);
    
    if (selectedRarity) {
      // Создаем копию с пользовательскими статами
      const rarityWithCustomStats = {
        ...selectedRarity,
        custom: true,
        // Добавим пользовательские статы
        customStats: type === RarityType.YIN ? yinRarityStats : yangRarityStats
      };
      
      onRarityChange(rarityWithCustomStats, type);
    }
  };
  
  // Обработчик изменения типа стата
  const handleStatTypeChange = (statIndex, statType) => {
    if (!selectedType) return;
    
    if (selectedType === RarityType.YIN) {
      const updatedStats = [...yinRarityStats];
      updatedStats[statIndex].type = statType;
      setYinRarityStats(updatedStats);
      
      // Обновляем диковинку, если она выбрана
      if (yinRarity) {
        const updatedRarity = {
          ...yinRarity,
          customStats: updatedStats
        };
        onRarityChange(updatedRarity, RarityType.YIN);
      }
    } else {
      const updatedStats = [...yangRarityStats];
      updatedStats[statIndex].type = statType;
      setYangRarityStats(updatedStats);
      
      // Обновляем диковинку, если она выбрана
      if (yangRarity) {
        const updatedRarity = {
          ...yangRarity,
          customStats: updatedStats
        };
        onRarityChange(updatedRarity, RarityType.YANG);
      }
    }
  };
  
  // Обработчик изменения значения стата
  const handleStatValueChange = (statIndex, value) => {
    if (!selectedType) return;
    
    if (selectedType === RarityType.YIN) {
      const updatedStats = [...yinRarityStats];
      updatedStats[statIndex].value = Number(value);
      setYinRarityStats(updatedStats);
      
      // Обновляем диковинку, если она выбрана
      if (yinRarity) {
        const updatedRarity = {
          ...yinRarity,
          customStats: updatedStats
        };
        onRarityChange(updatedRarity, RarityType.YIN);
      }
    } else {
      const updatedStats = [...yangRarityStats];
      updatedStats[statIndex].value = Number(value);
      setYangRarityStats(updatedStats);
      
      // Обновляем диковинку, если она выбрана
      if (yangRarity) {
        const updatedRarity = {
          ...yangRarity,
          customStats: updatedStats
        };
        onRarityChange(updatedRarity, RarityType.YANG);
      }
    }
  };
  
  // Опции для выбора типа стата (такие же, как для нефритов)
  const statTypeOptions = [
    { value: '', label: 'Пусто' },
    { value: ModifierTarget.ATTACK, label: 'Атака' },
    { value: ModifierTarget.ICE_EXPLOSION, label: 'Лед. взрыв' },
    { value: ModifierTarget.BOSS_ATTACK, label: 'Атака по боссам' },
    { value: ModifierTarget.MONSTER_ATTACK, label: 'Атака по монстрам' },
    { value: ModifierTarget.FUSION, label: 'Слияние' }
  ];
  
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

  // Получить активные статы для отображения
  const getActiveStats = (rarity) => {
    if (!rarity || !rarity.customStats) return [];
    
    return rarity.customStats.filter(stat => stat.type !== '');
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
        <div 
          className={`rarity-slot yin-slot ${selectedType === RarityType.YIN ? 'active' : ''}`}
          onClick={() => handleSelectRarityType(RarityType.YIN)}
        >
          <div className="rarity-slot-header" style={{ backgroundColor: '#1e4e8a' }}>
            <h4>Инь</h4>
          </div>
          {yinRarity ? (
            <div className="rarity-content">
              <div className="rarity-icon">
                {yinRarity.cloudinaryId ? (
                  <CloudinaryImage 
                    publicId={yinRarity.cloudinaryId} 
                    alt={yinRarity.name}
                    transformations={{ width: 60, height: 60, crop: "fill" }}
                  />
                ) : (
                  <div className="rarity-icon-placeholder">阴</div>
                )}
              </div>
              <div className="rarity-info">
                <h5 className="rarity-name">{yinRarity.name}</h5>
                <div className="rarity-level" style={{ color: getRarityColor(yinRarity.rarity) }}>
                  {getRarityName(yinRarity.rarity)}
                </div>
                
                {/* Отображение активных статов */}
                <div className="rarity-stats">
                  {getActiveStats(yinRarity).map((stat, index) => (
                    <div key={index} className="rarity-stat">
                      {getStatDisplayName(stat.type)}: {stat.value}%
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-rarity">
              <div className="empty-rarity-icon">阴</div>
              <div className="empty-rarity-text">Нажмите для выбора диковинки Инь</div>
            </div>
          )}
        </div>

        {/* Диковинка типа Ян */}
        <div 
          className={`rarity-slot yang-slot ${selectedType === RarityType.YANG ? 'active' : ''}`}
          onClick={() => handleSelectRarityType(RarityType.YANG)}
        >
          <div className="rarity-slot-header" style={{ backgroundColor: '#8a1e1e' }}>
            <h4>Ян</h4>
          </div>
          {yangRarity ? (
            <div className="rarity-content">
              <div className="rarity-icon">
                {yangRarity.cloudinaryId ? (
                  <CloudinaryImage 
                    publicId={yangRarity.cloudinaryId} 
                    alt={yangRarity.name}
                    transformations={{ width: 60, height: 60, crop: "fill" }}
                  />
                ) : (
                  <div className="rarity-icon-placeholder">阳</div>
                )}
              </div>
              <div className="rarity-info">
                <h5 className="rarity-name">{yangRarity.name}</h5>
                <div className="rarity-level" style={{ color: getRarityColor(yangRarity.rarity) }}>
                  {getRarityName(yangRarity.rarity)}
                </div>
                
                {/* Отображение активных статов */}
                <div className="rarity-stats">
                  {getActiveStats(yangRarity).map((stat, index) => (
                    <div key={index} className="rarity-stat">
                      {getStatDisplayName(stat.type)}: {stat.value}%
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-rarity">
              <div className="empty-rarity-icon">阳</div>
              <div className="empty-rarity-text">Нажмите для выбора диковинки Ян</div>
            </div>
          )}
        </div>
      </div>

      {/* Панель настройки диковинки */}
      {selectedType && (
        <div className="rarity-edit-panel">
          <h4 className="rarity-edit-title">
            Настройка диковинки {selectedType === RarityType.YIN ? 'Инь' : 'Ян'}
          </h4>

          <div className="rarity-selection" style={{ marginBottom: '1rem' }}>
            <label style={{ marginBottom: '0.5rem', display: 'block' }}>
              Выберите диковинку:
            </label>
            <select
              className="rarity-select"
              value={selectedType === RarityType.YIN ? (yinRarity?.id || '') : (yangRarity?.id || '')}
              onChange={(e) => {
                handleRarityChange(e.target.value, selectedType);
              }}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: 'rgba(26, 26, 26, 0.8)',
                color: 'var(--naraka-light)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '4px'
              }}
            >
              <option value="">Без диковинки</option>
              {selectedType === RarityType.YIN ? (
                <>
                  <optgroup label="Мифические">
                    {yinRarities.filter(r => r.rarity === 'mythic').map(rarity => (
                      <option key={rarity.id} value={rarity.id}>
                        {rarity.name} ({getRarityName(rarity.rarity)})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Легендарные">
                    {yinRarities.filter(r => r.rarity === 'legendary').map(rarity => (
                      <option key={rarity.id} value={rarity.id}>
                        {rarity.name} ({getRarityName(rarity.rarity)})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Эпические">
                    {yinRarities.filter(r => r.rarity === 'epic').map(rarity => (
                      <option key={rarity.id} value={rarity.id}>
                        {rarity.name} ({getRarityName(rarity.rarity)})
                      </option>
                    ))}
                  </optgroup>
                </>
              ) : (
                <>
                  <optgroup label="Мифические">
                    {yangRarities.filter(r => r.rarity === 'mythic').map(rarity => (
                      <option key={rarity.id} value={rarity.id}>
                        {rarity.name} ({getRarityName(rarity.rarity)})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Легендарные">
                    {yangRarities.filter(r => r.rarity === 'legendary').map(rarity => (
                      <option key={rarity.id} value={rarity.id}>
                        {rarity.name} ({getRarityName(rarity.rarity)})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Эпические">
                    {yangRarities.filter(r => r.rarity === 'epic').map(rarity => (
                      <option key={rarity.id} value={rarity.id}>
                        {rarity.name} ({getRarityName(rarity.rarity)})
                      </option>
                    ))}
                  </optgroup>
                </>
              )}
            </select>
          </div>

          {/* Настройка статов диковинки - максимум 4 стата, аналогично нефритам */}
          {((selectedType === RarityType.YIN && yinRarity) || 
             (selectedType === RarityType.YANG && yangRarity)) && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '0.75rem' 
              }}>
                <h5 style={{ margin: 0 }}>Статы диковинки</h5>
              </div>
              
              <div className="rarity-stats-list">
                {(selectedType === RarityType.YIN ? yinRarityStats : yangRarityStats).map((stat, statIndex) => (
                  <div 
                    key={statIndex} 
                    className="rarity-stat-row" 
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
              
              {/* Описание диковинки */}
              <div className="rarity-description" style={{ 
                marginTop: '1rem', 
                padding: '0.75rem', 
                backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                borderRadius: '4px', 
                fontSize: '0.875rem' 
              }}>
                <p>{(selectedType === RarityType.YIN ? yinRarity : yangRarity).description}</p>
              </div>
              
              {/* Информация о персонаже, для которого предназначена диковинка */}
              {(selectedType === RarityType.YIN ? yinRarity : yangRarity).for_character && (
                <div className="rarity-character-info" style={{ 
                  marginTop: '0.75rem', 
                  padding: '0.75rem', 
                  backgroundColor: 'rgba(75, 0, 130, 0.1)', 
                  borderRadius: '4px', 
                  fontSize: '0.875rem',
                  borderLeft: '3px solid rgba(75, 0, 130, 0.5)'
                }}>
                  <p style={{ margin: 0 }}>
                    <strong>Предназначена для:</strong> {(selectedType === RarityType.YIN ? yinRarity : yangRarity).for_character}
                  </p>
                </div>
              )}
            </div>
          )}
          
          <div className="rarity-edit-actions" style={{ marginTop: '1rem', textAlign: 'right' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => setSelectedType(null)}
              style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
            >
              Закрыть
            </button>
          </div>
        </div>
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