// components/common/HeroCard.jsx (новая версия)
import React from 'react';
import ItemCard from './ItemCard';

const HeroCard = ({ hero }) => {
  const { id, name, role, thumbnail, description } = hero;

  return (
    <ItemCard
      id={id}
      title={name}
      subtitle={role}
      description={description}
      thumbnail={thumbnail}
      detailsUrl={`/characters/${id}`}
      className="character-card"
    />
  );
};

export default HeroCard;