// components/common/EnemyCard.jsx
import { Link } from "react-router-dom";

const EnemyCard = ({ enemy }) => {
  const { id, name, type, difficulty, thumbnail, description } = enemy;

  const getDifficultyStars = () => {
    const stars = [];
    for (let i = 0; i < difficulty; i++) {
      stars.push(
        <span key={i} className="difficulty-star">
          ★
        </span>,
      );
    }
    for (let i = difficulty; i < 5; i++) {
      stars.push(
        <span key={i} className="difficulty-star difficulty-star-empty">
          ☆
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className="item-card">
      <div className="item-image-container">
        {thumbnail ? (
          <img src={thumbnail} alt={name} className="item-image" />
        ) : (
          <div className="item-image-placeholder">
            <span>{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="item-content">
        <h3 className="item-title">{name}</h3>
        <p className="item-subtitle">{type}</p>
        <div className="difficulty-rating">
          <span className="difficulty-label">Сложность: </span>
          <div className="difficulty-stars">{getDifficultyStars()}</div>
        </div>
        <p className="item-description">{description.substring(0, 100)}...</p>
      </div>
      <div className="item-footer">
        <Link to={`/enemies/${id}`} className="btn btn-secondary">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default EnemyCard;
