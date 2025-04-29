// pages/JadeDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jadesData } from "../data/jades";
import { charactersData } from "../data/characters";

const JadeDetail = () => {
  const { jadeId } = useParams();
  const [jade, setJade] = useState(null);
  const [recommendedCharacters, setRecommendedCharacters] = useState([]);

  useEffect(() => {
    // Находим нефрит по ID из URL
    const foundJade = jadesData.find((j) => j.id === jadeId);
    setJade(foundJade);

    // Если нефрит найден и у него есть рекомендуемые персонажи, находим их в данных
    if (foundJade && foundJade.recommended_for) {
      const characters = foundJade.recommended_for
        .map((charId) => charactersData.find((char) => char.id === charId))
        .filter(Boolean); // Убираем undefined значения

      setRecommendedCharacters(characters);
    }
  }, [jadeId]);

  if (!jade) {
    return (
      <div className="page-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Нефрит не найден</h2>
          <p>К сожалению, нефрит с ID "{jadeId}" не найден.</p>
          <Link
            to="/jades"
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Вернуться к списку нефритов
          </Link>
        </div>
      </div>
    );
  }

  // Функция для определения класса редкости
  const getRarityClass = () => {
    switch (jade.rarity.toLowerCase()) {
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
    <div className="page-container">
      <div className="detail-header">
        <div className="detail-image-container" style={{ textAlign: "center" }}>
          {jade.thumbnail ? (
            <img
              src={jade.thumbnail}
              alt={jade.name}
              className="detail-image"
            />
          ) : (
            <div
              className="detail-image-placeholder"
              style={{
                width: "300px",
                height: "300px",
                background: "rgba(75, 0, 130, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                fontSize: "72px",
                fontWeight: "bold",
                color: getRarityClass(),
                border: `3px solid ${getRarityClass()}`,
              }}
            >
              {jade.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="detail-info">
          <h1 className="detail-title" style={{ color: getRarityClass() }}>
            {jade.name}
          </h1>
          <p className="detail-subtitle">
            {jade.type.charAt(0).toUpperCase() + jade.type.slice(1)} •
            {jade.rarity.charAt(0).toUpperCase() + jade.rarity.slice(1)}
          </p>

          <div
            className="jade-effect"
            style={{
              padding: "1rem",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: `1px solid ${getRarityClass()}`,
              fontWeight: "bold",
            }}
          >
            <p>{jade.effect}</p>
          </div>

          <div className="jade-stats">
            <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>
              Характеристики
            </h3>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {Object.entries(jade.stats).map(([key, value]) => (
                <li key={key} style={{ marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>
                    {key.replace(/_/g, " ").toUpperCase()}:{" "}
                  </span>
                  {typeof value === "number" && value < 0 ? value : `+${value}`}
                  {typeof value === "string" ? value : "%"}
                </li>
              ))}
            </ul>
          </div>

          <div className="jade-description" style={{ marginTop: "1rem" }}>
            <p>{jade.description}</p>
          </div>
        </div>
      </div>

      {recommendedCharacters.length > 0 && (
        <div className="detail-section">
          <h2 className="detail-section-title">Рекомендуемые персонажи</h2>
          <div
            className="recommended-characters"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {recommendedCharacters.map((character) => (
              <div
                key={character.id}
                className="character-item"
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  border: "1px solid var(--naraka-secondary)",
                }}
              >
                <Link
                  to={`/characters/${character.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(75, 0, 130, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "1rem",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "var(--naraka-secondary)",
                      }}
                    >
                      {character.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ margin: "0 0 0.25rem 0" }}>
                        {character.name}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.875rem",
                          color: "var(--naraka-light)",
                          opacity: "0.8",
                        }}
                      >
                        {character.role}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link to="/jades" className="btn btn-primary">
          Вернуться к списку нефритов
        </Link>
      </div>
    </div>
  );
};

export default JadeDetail;
