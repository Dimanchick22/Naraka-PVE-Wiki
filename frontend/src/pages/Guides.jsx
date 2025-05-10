// src/pages/Guides.jsx
import React, { useState } from "react";
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

      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-btn ${activeCategory === category.id ? "active" : ""}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="items-grid guides-listing">
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="guide-card item-card"
            >
              <div className="item-image-container">
                {guide.thumbnail ? (
                  <img
                    src={guide.thumbnail}
                    alt={guide.title}
                    className="item-image"
                  />
                ) : (
                  <div className="item-image-placeholder">
                    <span>{guide.title.charAt(0)}</span>
                  </div>
                )}
              </div>

              <div className="item-content">
                <span
                  className="text-xs font-bold text-secondary uppercase block mb-2"
                >
                  {guide.category === "beginner"
                    ? "Для новичков"
                    : guide.category === "advanced"
                      ? "Продвинутый"
                      : guide.category === "tips"
                        ? "Советы"
                        : "Гайд"}
                </span>

                <h3 className="item-title mb-2">
                  {guide.title}
                </h3>

                <p className="item-description">
                  {guide.summary}
                </p>

                <div className="flex justify-between items-center mt-2 text-xs text-light opacity-70">
                  <span>{guide.author}</span>
                  <span>{guide.date}</span>
                </div>
              </div>

              <div className="item-footer">
                <Link to={`/guides/${guide.id}`} className="btn btn-secondary btn-small">
                  Читать
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-result col-span-full">
            <p>Гайды в этой категории пока не доступны.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guides;