// components/common/EnemyCard.jsx
import React from 'react';
import ItemCard from './ItemCard';

const EnemyCard = ({ enemy }) => {
  const { id, name, type, difficulty, thumbnail, description } = enemy;

  // Создаем звезды для отображения сложности
  const getDifficultyStars = () => {
    const stars = [];
    for (let i = 0; i < difficulty; i++) {
      stars.push(
        <span key={i} className="difficulty-star">★</span>
      );
    }
    for (let i = difficulty; i < 5; i++) {
      stars.push(
        <span key={i} className="difficulty-star difficulty-star-empty">☆</span>
      );
    }
    return stars;
  };

  // Формируем подзаголовок с типом и сложностью
  const subtitle = (
    <div className="flex flex-col">
      <span>{type}</span>
      <div className="difficulty-rating mt-1">
        <span className="difficulty-label">Сложность: </span>
        <div className="difficulty-stars">{getDifficultyStars()}</div>
      </div>
    </div>
  );

  return (
    <ItemCard
      id={id}
      title={name}
      subtitle={subtitle}
      description={description}
      thumbnail={thumbnail}
      detailsUrl={`/enemies/${id}`}
      className="enemy-card"
    />
  );
};

export default EnemyCard;