// components/common/HeroCard.jsx
import { Link } from "react-router-dom";

const HeroCard = ({ hero }) => {
  const { id, name, role, thumbnail, description } = hero;

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
        <p className="item-subtitle">{role}</p>
        <p className="item-description">{description.substring(0, 100)}...</p>
      </div>
      <div className="item-footer">
        <Link to={`/characters/${id}`} className="btn btn-secondary">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default HeroCard;
