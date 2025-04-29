// pages/PveModes.jsx
import { pveModesData } from "../data/pveModes";

const PveModes = () => {
  // Функция для определения иконки в зависимости от режима
  const getModeIcon = (mode) => {
    if (mode.id === "regular") {
      return "М"; // М от "Маршрут" или "Миссия"
    } else if (mode.id === "advanced") {
      return "П"; // П от "Продвинутый"
    } else {
      return "И"; // И от "Испытание"
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">PVE Режимы</h1>

      <div
        className="page-intro"
        style={{
          maxWidth: "800px",
          margin: "0 auto 2rem auto",
          textAlign: "center",
          color: "var(--naraka-light)",
          opacity: "0.9",
        }}
      >
        <p>
          Naraka Bladepoint предлагает разнообразные PVE режимы, от простых для
          начинающих до экстремально сложных испытаний для опытных игроков.
          Выбирайте режим в соответствии с вашим уровнем подготовки и целями.
        </p>
      </div>

      <div className="pve-modes-list">
        {pveModesData.map((mode) => (
          <div
            key={mode.id}
            className="pve-mode-card"
            style={{
              margin: "2rem 0",
              border: "1px solid var(--naraka-secondary)",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "rgba(26, 26, 26, 0.8)",
            }}
          >
            <div
              className="pve-mode-header"
              style={{
                padding: "1.5rem",
                borderBottom: "1px solid var(--naraka-secondary)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                className="pve-mode-icon"
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "rgba(139, 0, 0, 0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "var(--naraka-secondary)",
                }}
              >
                {getModeIcon(mode)}
              </div>

              <div className="pve-mode-title">
                <h2 style={{ marginBottom: "0.25rem" }}>{mode.name}</h2>
                <div
                  className="pve-mode-difficulty"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--naraka-light)",
                      opacity: "0.8",
                    }}
                  >
                    Сложность:
                  </span>
                  <span
                    style={{
                      color:
                        mode.difficulty === "Нормальный"
                          ? "#4ade80"
                          : mode.difficulty === "Сложный"
                            ? "#fb923c"
                            : "#ef4444",
                      fontWeight: "bold",
                    }}
                  >
                    {mode.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="pve-mode-content" style={{ padding: "1.5rem" }}>
              <p
                className="pve-mode-description"
                style={{
                  marginBottom: "1.5rem",
                  color: "var(--naraka-light)",
                  lineHeight: "1.6",
                }}
              >
                {mode.description}
              </p>

              <div
                className="pve-mode-details"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div className="pve-mode-section">
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      marginBottom: "0.75rem",
                      color: "var(--naraka-secondary)",
                    }}
                  >
                    Награды
                  </h3>
                  <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
                    {mode.rewards.map((reward, i) => (
                      <li key={i} style={{ marginBottom: "0.5rem" }}>
                        {reward}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pve-mode-section">
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      marginBottom: "0.75rem",
                      color: "var(--naraka-secondary)",
                    }}
                  >
                    Этапы
                  </h3>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <span style={{ fontWeight: "bold" }}>
                      Рекомендуемый уровень:
                    </span>{" "}
                    {mode.recommended_level}
                  </div>
                  <div className="pve-stages">
                    {mode.stages.map((stage, i) => (
                      <div
                        key={i}
                        className="pve-stage-item"
                        style={{
                          marginBottom: "0.75rem",
                          padding: "0.5rem",
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                          borderRadius: "4px",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "bold",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {stage.name}
                        </div>
                        <div style={{ fontSize: "0.875rem", opacity: "0.8" }}>
                          {stage.description.substring(0, 80)}...
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="pve-mode-tips"
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  backgroundColor: "rgba(75, 0, 130, 0.1)",
                  borderRadius: "4px",
                  border: "1px solid rgba(75, 0, 130, 0.3)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    marginBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  Советы для прохождения
                </h3>
                <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
                  {mode.tips.slice(0, 3).map((tip, i) => (
                    <li key={i} style={{ marginBottom: "0.5rem" }}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="pve-mode-footer"
              style={{
                padding: "1rem 1.5rem",
                borderTop: "1px solid rgba(212, 175, 55, 0.3)",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button className="btn btn-secondary">Подробнее</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PveModes;
