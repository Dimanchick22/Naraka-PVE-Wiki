// pages/EnemyDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { enemiesData } from "../data/enemies";

const EnemyDetail = () => {
  const { enemyId } = useParams();
  const [enemy, setEnemy] = useState(null);

  useEffect(() => {
    // Находим врага по ID из URL
    const foundEnemy = enemiesData.find((e) => e.id === enemyId);
    setEnemy(foundEnemy);
  }, [enemyId]);

  if (!enemy) {
    return (
      <div className="page-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Враг не найден</h2>
          <p>К сожалению, враг с ID "{enemyId}" не найден.</p>
          <Link
            to="/enemies"
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Вернуться к списку врагов
          </Link>
        </div>
      </div>
    );
  }

  // Функция для отображения сложности в виде звезд
  const getDifficultyStars = () => {
    const stars = [];
    for (let i = 0; i < enemy.difficulty; i++) {
      stars.push(
        <span key={i} style={{ color: "var(--naraka-secondary)" }}>
          ★
        </span>,
      );
    }
    for (let i = enemy.difficulty; i < 5; i++) {
      stars.push(
        <span key={i} style={{ opacity: 0.3 }}>
          ☆
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className="page-container">
      <div className="detail-header">
        <div className="detail-image-container" style={{ textAlign: "center" }}>
          {enemy.thumbnail ? (
            <img
              src={enemy.thumbnail}
              alt={enemy.name}
              className="detail-image"
            />
          ) : (
            <div
              className="detail-image-placeholder"
              style={{
                width: "300px",
                height: "300px",
                background: "rgba(139, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                fontSize: "72px",
                fontWeight: "bold",
                color: "var(--naraka-primary)",
              }}
            >
              {enemy.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{enemy.name}</h1>
          <p className="detail-subtitle">
            {enemy.type.charAt(0).toUpperCase() + enemy.type.slice(1)}
            <span style={{ marginLeft: "1rem", fontSize: "1.25rem" }}>
              {getDifficultyStars()}
            </span>
          </p>

          <div className="enemy-stats">
            <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>
              Характеристики
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1rem",
              }}
            >
              {Object.entries(enemy.stats).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    textAlign: "center",
                    padding: "0.5rem",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: "4px",
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
                    {key.replace(/_/g, " ").toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontSize: "1.25rem",
                      color: "var(--naraka-secondary)",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="enemy-description" style={{ marginTop: "1.5rem" }}>
            <p>{enemy.description}</p>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2 className="detail-section-title">Способности</h2>
        <div className="abilities-list">
          {enemy.abilities.map((ability, index) => (
            <div
              key={index}
              className="ability-item"
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "rgba(139, 0, 0, 0.1)",
                borderRadius: "8px",
                border: "1px solid rgba(139, 0, 0, 0.3)",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
                {ability.name}
              </h3>
              <p style={{ margin: 0 }}>{ability.description}</p>
            </div>
          ))}
        </div>
      </div>

      {enemy.type === "boss" && enemy.phases && (
        <div className="detail-section">
          <h2 className="detail-section-title">Фазы боя</h2>
          <div className="phases-list">
            {enemy.phases.map((phase, index) => (
              <div
                key={index}
                className="phase-item"
                style={{
                  padding: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: "rgba(75, 0, 130, 0.1)",
                  borderRadius: "8px",
                  border: "1px solid rgba(75, 0, 130, 0.3)",
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
                  {phase.name}
                </h3>
                <p style={{ margin: 0 }}>{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="detail-section">
        <h2 className="detail-section-title">Слабые места и локации</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>
              Слабые места
            </h3>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {enemy.weaknesses.map((weakness, index) => (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  {weakness.charAt(0).toUpperCase() + weakness.slice(1)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>
              Локации
            </h3>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {enemy.locations.map((location, index) => (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link to="/enemies" className="btn btn-primary">
          Вернуться к списку врагов
        </Link>
      </div>
    </div>
  );
};

export default EnemyDetail;
