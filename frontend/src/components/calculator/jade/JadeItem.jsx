// src/components/calculator/jade/JadeItem.jsx
import React from 'react';
import { getJadeRarityColor } from '../../../data/jades';

const JadeItem = ({ index, jade, isActive, onClick }) => {
  // Получение цвета нефрита в зависимости от редкости
  const getJadeColor = (jade) => {
    if (!jade) return '#555555';
    return getJadeRarityColor(jade.rarity);
  };
  
  return (
    <div 
      className={`jade-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
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
};

export default JadeItem;