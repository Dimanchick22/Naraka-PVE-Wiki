// src/components/calculator/RaritiesPanel.jsx
import { useState } from 'react';
import { raritiesData, RarityType, getRarityColor, getRarityName, getRarityTypeName } from '../../data/rarities';
import CloudinaryImage from '../common/CloudinaryImage';

/**
 * Компонент панели выбора диковинок
 * @param {Object} props - Свойства компонента
 * @param {Object} props.yinRarity - Выбранная диковинка типа Инь
 * @param {Object} props.yangRarity - Выбранная диковинка типа Ян
 * @param {Function} props.onRarityChange - Функция обработки изменения диковинки
 * @param {Object} props.character - Выбранный персонаж
 * @returns {JSX.Element} - React компонент
 */
const RaritiesPanel = ({ yinRarity, yangRarity, onRarityChange, character }) => {
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

  // Обработчик изменения диковинки
  const handleRarityChange = (rarity, type) => {
    onRarityChange(rarity, type);
  };

  return (
    <div className="rarities-panel">
      <h3 className="section-title">Диковинки</h3>
      <p className="section-subtitle">
        У персонажа может быть активно до двух диковинок: одна типа Инь и одна типа Ян
      </p>

      {/* Две колонки для диковинок Инь и Ян */}
      <div className="rarities-columns">
        {/* Колонка для диковинок Инь */}
        <div className="rarity-column yin-column">
          <h4 className="rarity-column-title">Диковинки Инь</h4>
          
          {/* Выбранная диковинка Инь */}
          <div className="selected-rarity yin-rarity">
            {yinRarity ? (
              <div className="rarity-card" style={{ borderColor: getRarityColor(yinRarity.rarity) }}>
                <div className="rarity-header" style={{ backgroundColor: getRarityColor(yinRarity.rarity) }}>
                  {yinRarity.cloudinaryId ? (
                    <div className="rarity-icon">
                      <CloudinaryImage 
                        publicId={yinRarity.cloudinaryId} 
                        alt={yinRarity.name}
                        transformations={{
                          width: 50,
                          height: 50,
                          crop: "fill"
                        }}
                      />
                    </div>
                  ) : (
                    <div className="rarity-icon">阴</div>
                  )}
                  <h4 className="rarity-name">{yinRarity.name}</h4>
                </div>
                <div className="rarity-details">
                  <p>{yinRarity.description}</p>
                  <div className="rarity-effects">
                    <h5 style={{ fontSize: '0.875rem', margin: '0.5rem 0', color: 'var(--naraka-secondary)' }}>Эффекты:</h5>
                    <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                      {yinRarity.effects.map((effect, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                          {effect.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className="btn btn-secondary remove-rarity"
                    onClick={() => handleRarityChange(null, RarityType.YIN)}
                  >
                    Убрать
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-rarity-selected">
                Выберите диковинку Инь из списка ниже
              </div>
            )}
          </div>

          {/* Список доступных диковинок Инь */}
          <div className="available-rarities">
            <h5>Доступные диковинки:</h5>
            <div className="rarities-list">
              {yinRarities.map(rarity => (
                <div 
                  key={rarity.id}
                  className={`available-rarity-item ${yinRarity?.id === rarity.id ? 'selected' : ''}`}
                  onClick={() => handleRarityChange(rarity, RarityType.YIN)}
                >
                  <span className="rarity-level" style={{ 
                    backgroundColor: getRarityColor(rarity.rarity) 
                  }}>
                    {getRarityName(rarity.rarity)}
                  </span>
                  <span className="rarity-name">{rarity.name}</span>
                </div>
              ))}
              {yinRarities.length === 0 && (
                <div className="no-rarities-available">
                  Для данного персонажа нет доступных диковинок типа Инь
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Колонка для диковинок Ян */}
        <div className="rarity-column yang-column">
          <h4 className="rarity-column-title">Диковинки Ян</h4>
          
          {/* Выбранная диковинка Ян */}
          <div className="selected-rarity yang-rarity">
            {yangRarity ? (
              <div className="rarity-card" style={{ borderColor: getRarityColor(yangRarity.rarity) }}>
                <div className="rarity-header" style={{ backgroundColor: getRarityColor(yangRarity.rarity) }}>
                  {yangRarity.cloudinaryId ? (
                    <div className="rarity-icon">
                      <CloudinaryImage 
                        publicId={yangRarity.cloudinaryId} 
                        alt={yangRarity.name}
                        transformations={{
                          width: 50,
                          height: 50,
                          crop: "fill"
                        }}
                      />
                    </div>
                  ) : (
                    <div className="rarity-icon">阳</div>
                  )}
                  <h4 className="rarity-name">{yangRarity.name}</h4>
                </div>
                <div className="rarity-details">
                  <p>{yangRarity.description}</p>
                  <div className="rarity-effects">
                    <h5 style={{ fontSize: '0.875rem', margin: '0.5rem 0', color: 'var(--naraka-secondary)' }}>Эффекты:</h5>
                    <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                      {yangRarity.effects.map((effect, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                          {effect.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className="btn btn-secondary remove-rarity"
                    onClick={() => handleRarityChange(null, RarityType.YANG)}
                  >
                    Убрать
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-rarity-selected">
                Выберите диковинку Ян из списка ниже
              </div>
            )}
          </div>

          {/* Список доступных диковинок Ян */}
          <div className="available-rarities">
            <h5>Доступные диковинки:</h5>
            <div className="rarities-list">
              {yangRarities.map(rarity => (
                <div 
                  key={rarity.id}
                  className={`available-rarity-item ${yangRarity?.id === rarity.id ? 'selected' : ''}`}
                  onClick={() => handleRarityChange(rarity, RarityType.YANG)}
                >
                  <span className="rarity-level" style={{ 
                    backgroundColor: getRarityColor(rarity.rarity) 
                  }}>
                    {getRarityName(rarity.rarity)}
                  </span>
                  <span className="rarity-name">{rarity.name}</span>
                </div>
              ))}
              {yangRarities.length === 0 && (
                <div className="no-rarities-available">
                  Для данного персонажа нет доступных диковинок типа Ян
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
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