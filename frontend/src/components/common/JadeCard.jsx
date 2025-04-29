// components/common/JadeCard.jsx
import { Link } from "react-router-dom";

const JadeCard = ({ jade }) => {
  const { id, name, type, rarity, thumbnail, effect } = jade;

  const getRarityClass = () => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "jade-common";
      case "uncommon":
        return "jade-uncommon";
      case "rare":
        return "jade-rare";
      case "epic":
        return "jade-epic";
      case "legendary":
        return "jade-legendary";
      default:
        return "";
    }
  };

  // Определение цвета в зависимости от редкости
  const getRarityColor = () => {
    switch (rarity.toLowerCase()) {
      case "legendary":
        return "#ff8000";
      case "epic":
        return "#a335ee";
      case "rare":
        return "#0070dd";
      case "uncommon":
        return "#2dc50e";
      default:
        return "#7e7e7e";
    }
  };

  return (
    <div className={`item-card ${getRarityClass()}`}>
      <div className="item-image-container">
        {thumbnail ? (
          <img src={thumbnail} alt={name} className="item-image" />
        ) : (
          <div
            className="item-image-placeholder"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderBottom: `3px solid ${getRarityColor()}`,
              fontSize: "48px",
              fontWeight: "bold",
              color: getRarityColor(),
            }}
          >
            <span>{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="item-content">
        <h3 className="item-title" style={{ color: getRarityColor() }}>
          {name}
        </h3>
        <p className="item-subtitle">
          {type} • {rarity}
        </p>
        <p className="item-description">{effect.substring(0, 100)}...</p>
      </div>
      <div className="item-footer">
        <Link to={`/jades/${id}`} className="btn btn-secondary">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default JadeCard;
