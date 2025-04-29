// pages/Guides.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { guidesData } from "../data/guides";

const Guides = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Все гайды" },
    { id: "beginner", name: "Для новичков" },
    { id: "advanced", name: "Продвинутые" },
    { id: "tips", name: "Советы и хитрости" },
  ];

  const filteredGuides =
    activeCategory === "all"
      ? guidesData
      : guidesData.filter((guide) => guide.category === activeCategory);

  return (
    <div className="page-container">
      <h1 className="page-title">Гайды</h1>

      <div
        className="guides-categories"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          margin: "1rem 0 2rem 0",
          flexWrap: "wrap",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "none",
              background:
                activeCategory === category.id
                  ? "var(--naraka-primary)"
                  : "rgba(255, 255, 255, 0.1)",
              color:
                activeCategory === category.id
                  ? "white"
                  : "var(--naraka-light)",
              cursor: "pointer",
            }}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div
        className="guides-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="guide-card"
              style={{
                border: "1px solid var(--naraka-secondary)",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "rgba(26, 26, 26, 0.8)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <div
                className="guide-image"
                style={{
                  height: "160px",
                  backgroundColor: "rgba(75, 0, 130, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "var(--naraka-secondary)",
                }}
              >
                {guide.thumbnail ? (
                  <img
                    src={guide.thumbnail}
                    alt={guide.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  guide.title.charAt(0)
                )}
              </div>

              <div className="guide-content" style={{ padding: "1rem" }}>
                <span
                  className="guide-category"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "var(--naraka-secondary)",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  {guide.category === "beginner"
                    ? "Для новичков"
                    : guide.category === "advanced"
                      ? "Продвинутый"
                      : guide.category === "tips"
                        ? "Советы"
                        : "Гайд"}
                </span>

                <h3
                  className="guide-title"
                  style={{
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {guide.title}
                </h3>

                <p
                  className="guide-summary"
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--naraka-light)",
                    opacity: "0.8",
                    marginBottom: "1rem",
                    lineHeight: "1.4",
                  }}
                >
                  {guide.summary}
                </p>

                <div
                  className="guide-footer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    fontSize: "0.75rem",
                    color: "var(--naraka-light)",
                    opacity: "0.7",
                  }}
                >
                  <span>{guide.author}</span>
                  <span>{guide.date}</span>
                </div>
              </div>

              <div
                className="guide-action"
                style={{
                  borderTop: "1px solid rgba(212, 175, 55, 0.3)",
                  padding: "0.75rem 1rem",
                  textAlign: "right",
                }}
              >
                <Link to={`/guides/${guide.id}`} className="btn btn-secondary">
                  Читать
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div
            className="no-guides"
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "2rem",
              color: "var(--naraka-light)",
              opacity: "0.7",
            }}
          >
            <p>Гайды в этой категории пока не доступны.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guides;
