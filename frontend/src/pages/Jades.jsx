// pages/Jades.jsx
import { useState } from "react";
import JadeCard from "../components/common/JadeCard";
import SearchBar from "../components/ui/SearchBar";
import { jadesData } from "../data/jades";

const Jades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [filteredJades, setFilteredJades] = useState(jadesData);

  const jadeTypes = ["all", "attack", "defense", "recovery", "universal"];
  const jadeRarities = [
    "all",
    "common",
    "uncommon",
    "rare",
    "epic",
    "legendary",
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterJades(term, selectedType, selectedRarity);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    filterJades(searchTerm, type, selectedRarity);
  };

  const handleRarityChange = (rarity) => {
    setSelectedRarity(rarity);
    filterJades(searchTerm, selectedType, rarity);
  };

  const filterJades = (term, type, rarity) => {
    const filtered = jadesData.filter((jade) => {
      const matchesTerm =
        jade.name.toLowerCase().includes(term.toLowerCase()) ||
        jade.effect.toLowerCase().includes(term.toLowerCase());

      const matchesType = type === "all" || jade.type.toLowerCase() === type;
      const matchesRarity =
        rarity === "all" || jade.rarity.toLowerCase() === rarity;

      return matchesTerm && matchesType && matchesRarity;
    });

    setFilteredJades(filtered);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Нефриты</h1>

      <div
        className="filters-container"
        style={{ maxWidth: "800px", margin: "0 auto 2rem auto" }}
      >
        <div className="search-filter">
          <SearchBar onSearch={handleSearch} placeholder="Поиск нефритов..." />
        </div>

        <div
          className="filter-group"
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          <div className="filter-section">
            <span
              className="filter-label"
              style={{ marginRight: "0.5rem", fontSize: "0.875rem" }}
            >
              Тип:
            </span>
            <div
              className="filter-options"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
            >
              {jadeTypes.map((type) => (
                <button
                  key={type}
                  className={`filter-btn ${selectedType === type ? "active" : ""}`}
                  style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    border: "none",
                    backgroundColor:
                      selectedType === type
                        ? "var(--naraka-primary)"
                        : "rgba(255, 255, 255, 0.1)",
                    color:
                      selectedType === type ? "white" : "var(--naraka-light)",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTypeChange(type)}
                >
                  {type === "all"
                    ? "Все"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section" style={{ marginLeft: "1rem" }}>
            <span
              className="filter-label"
              style={{ marginRight: "0.5rem", fontSize: "0.875rem" }}
            >
              Редкость:
            </span>
            <div
              className="filter-options"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
            >
              {jadeRarities.map((rarity) => (
                <button
                  key={rarity}
                  className={`filter-btn ${selectedRarity === rarity ? "active" : ""}`}
                  style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    border: "none",
                    backgroundColor:
                      selectedRarity === rarity
                        ? "var(--naraka-primary)"
                        : "rgba(255, 255, 255, 0.1)",
                    color:
                      selectedRarity === rarity
                        ? "white"
                        : "var(--naraka-light)",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRarityChange(rarity)}
                >
                  {rarity === "all"
                    ? "Все"
                    : rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredJades.length === 0 ? (
        <div className="text-center" style={{ padding: "2rem" }}>
          <p>По заданным параметрам ничего не найдено.</p>
        </div>
      ) : (
        <div className="items-grid">
          {filteredJades.map((jade) => (
            <JadeCard key={jade.id} jade={jade} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jades;
