// pages/CharacterDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { charactersData } from "../data/characters";
import { jadesData } from "../data/jades";

const CharacterDetail = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [recommendedJades, setRecommendedJades] = useState([]);

  useEffect(() => {
    // Находим персонажа по ID из URL
    const foundCharacter = charactersData.find(
      (char) => char.id === characterId,
    );
    setCharacter(foundCharacter);

    // Если персонаж найден и у него есть рекомендуемые нефриты, находим их в данных
    if (foundCharacter && foundCharacter.recommended_jades) {
      const jades = foundCharacter.recommended_jades
        .map((jadeId) => jadesData.find((jade) => jade.id === jadeId))
        .filter(Boolean); // Убираем undefined значения

      setRecommendedJades(jades);
    }
  }, [characterId]);

  if (!character) {
    return (
      <div className="page-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Персонаж не найден</h2>
          <p>К сожалению, персонаж с ID "{characterId}" не найден.</p>
          <Link
            to="/characters"
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Вернуться к списку персонажей
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="detail-header">
        <div className="detail-image-container" style={{ textAlign: "center" }}>
          {character.thumbnail ? (
            <img
              src={character.thumbnail}
              alt={character.name}
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
                color: "var(--naraka-secondary)",
              }}
            >
              {character.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{character.name}</h1>
          <p className="detail-subtitle">{character.role}</p>

          <div className="detail-stats">
            {Object.entries(character.stats).map(([key, value]) => (
              <div key={key} className="stat-item">
                <span className="stat-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <div
                  className="stat-bar"
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "4px",
                    margin: "4px 0 8px 0",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${value}%`,
                      height: "100%",
                      backgroundColor: "var(--naraka-secondary)",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
                <span className="stat-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="character-description" style={{ marginTop: "1rem" }}>
            <p>{character.description}</p>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2 className="detail-section-title">Способности</h2>
        <div className="skills-list">
          {character.skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item"
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                border: "1px solid rgba(212, 175, 55, 0.3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <h3 style={{ margin: 0 }}>{skill.name}</h3>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--naraka-light)",
                    opacity: "0.8",
                  }}
                >
                  Перезарядка: {skill.cooldown}
                </span>
              </div>
              <p style={{ margin: 0 }}>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      {recommendedJades.length > 0 && (
        <div className="detail-section">
          <h2 className="detail-section-title">Рекомендуемые нефриты</h2>
          <div
            className="recommended-jades"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {recommendedJades.map((jade) => (
              <div
                key={jade.id}
                className="jade-item"
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  border: `1px solid ${
                    jade.rarity === "legendary"
                      ? "#ff8000"
                      : jade.rarity === "epic"
                        ? "#a335ee"
                        : jade.rarity === "rare"
                          ? "#0070dd"
                          : jade.rarity === "uncommon"
                            ? "#2dc50e"
                            : "#7e7e7e"
                  }`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor:
                        jade.rarity === "legendary"
                          ? "#ff8000"
                          : jade.rarity === "epic"
                            ? "#a335ee"
                            : jade.rarity === "rare"
                              ? "#0070dd"
                              : jade.rarity === "uncommon"
                                ? "#2dc50e"
                                : "#7e7e7e",
                      marginRight: "0.5rem",
                    }}
                  ></div>
                  <h3 style={{ margin: 0, fontSize: "1.125rem" }}>
                    {jade.name}
                  </h3>
                </div>
                <p
                  style={{
                    margin: "0 0 0.5rem 0",
                    fontSize: "0.875rem",
                    color: "var(--naraka-light)",
                    opacity: "0.8",
                  }}
                >
                  {jade.type.charAt(0).toUpperCase() + jade.type.slice(1)} •{" "}
                  {jade.rarity.charAt(0).toUpperCase() + jade.rarity.slice(1)}
                </p>
                <p style={{ margin: 0 }}>{jade.effect}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link to="/characters" className="btn btn-primary">
          Вернуться к списку персонажей
        </Link>
      </div>
    </div>
  );
};

export default CharacterDetail;
