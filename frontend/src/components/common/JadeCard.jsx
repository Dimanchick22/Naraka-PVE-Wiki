// components/common/JadeCard.jsx
import React from 'react';
import ItemCard from './ItemCard';
import { getJadeRarityColor } from '../../data/jades';

const JadeCard = ({ jade }) => {
  const { id, name, type, rarity, thumbnail, effect } = jade;

  // Определение цвета в зависимости от редкости
  const rarityColor = getJadeRarityColor(rarity);

  // Формируем подзаголовок с типом и редкостью
  const subtitle = `${type} • ${rarity}`;

  return (
    <ItemCard
      id={id}
      title={name}
      subtitle={subtitle}
      description={effect}
      thumbnail={thumbnail}
      detailsUrl={`/jades/${id}`}
      className={`jade-card jade-${rarity.toLowerCase()}`}
      contentClassName="jade-content"
      style={{ borderColor: rarityColor }}
    />
  );
};

export default JadeCard;