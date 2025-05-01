// pages/Rarities.jsx
import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import { Link } from "react-router-dom";

// Временные данные для демонстрации
const raritiesData = [
  {
    id: "nine-tailed-soul-bell",
    name: "Колокольчик девятихвостой души",
    type: "enhancement",
    rarity: "legendary",
    description: "Бла бла",
    location: "Печка",
    effects: ["Пока не придумал", ")"]
  }
];

const Rarities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRarities, setFilteredRarities] = useState(raritiesData);

  // Обработчик поиска
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = raritiesData.filter(
      (rarity) =>
        rarity.name.toLowerCase().includes(term.toLowerCase()) ||
        rarity.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredRarities(filtered);
  };

  // Получение цвета в зависимости от редкости
  const getRarityColor = (rarity) => {
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
    <div className="page-container">
      <h1 className="page-title">Диковинки</h1>

      <div className="section-description">
        <p>
          Диковинки - это редкие предметы и материалы, которые можно найти в различных режимах PVE. 
          Они используются для крафта и улучшения снаряжения, изучения новых навыков и многого другого.
        </p>
      </div>

      <div className="search-container" style={{ maxWidth: "400px", margin: "0 auto 2rem auto" }}>
        <SearchBar onSearch={handleSearch} placeholder="Поиск диковинок..." />
      </div>

      {filteredRarities.length === 0 ? (
        <div className="text-center" style={{ padding: "2rem" }}>
          <p>По запросу "{searchTerm}" ничего не найдено.</p>
        </div>
      ) : (
        <div className="rarities-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {filteredRarities.map((rarity) => (
            <div 
              key={rarity.id}
              className="rarity-card"
              style={{
                backgroundColor: "rgba(26, 26, 26, 0.8)",
                borderRadius: "8px",
                overflow: "hidden",
                border: `1px solid ${getRarityColor(rarity.rarity)}`,
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <div 
                className="rarity-header"
                style={{
                  padding: "1rem",
                  borderBottom: `1px solid ${getRarityColor(rarity.rarity)}`,
                  background: `linear-gradient(to right, rgba(26, 26, 26, 0.8), ${getRarityColor(rarity.rarity)}40)`,
                }}
              >
                <h3 style={{ margin: 0, color: getRarityColor(rarity.rarity) }}>{rarity.name}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                  <span style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                    {rarity.type.charAt(0).toUpperCase() + rarity.type.slice(1)}
                  </span>
                  <span style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                    {rarity.rarity.charAt(0).toUpperCase() + rarity.rarity.slice(1)}
                  </span>
                </div>
              </div>

              <div className="rarity-content" style={{ padding: "1rem" }}>
                <p style={{ margin: "0 0 1rem 0" }}>{rarity.description}</p>
                
                <div className="rarity-location" style={{ marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Где найти:</h4>
                  <p style={{ fontSize: "0.875rem", opacity: 0.9 }}>{rarity.location}</p>
                </div>

                <div className="rarity-effects">
                  <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Эффекты:</h4>
                  <ul style={{ paddingLeft: "1.5rem", fontSize: "0.875rem" }}>
                    {rarity.effects.map((effect, index) => (
                      <li key={index} style={{ marginBottom: "0.25rem" }}>{effect}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div 
                className="rarity-footer"
                style={{
                  padding: "0.75rem 1rem",
                  borderTop: `1px solid ${getRarityColor(rarity.rarity)}40`,
                  textAlign: "right",
                }}
              >
                <Link to={`/rarities/${rarity.id}`} className="btn btn-secondary">
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rarities;