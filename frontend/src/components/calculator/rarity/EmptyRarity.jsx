// src/components/calculator/rarity/EmptyRarity.jsx
import React from 'react';

const EmptyRarity = ({ type }) => {
  return (
    <div className="empty-rarity">
      <div className="empty-rarity-icon">{type === 'yin' ? '阴' : '阳'}</div>
      <div className="empty-rarity-text">
        Нажмите для выбора диковинки {type === 'yin' ? 'Инь' : 'Ян'}
      </div>
    </div>
  );
};

export default EmptyRarity;