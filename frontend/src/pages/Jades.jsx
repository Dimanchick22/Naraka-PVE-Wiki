// src/pages/Jades.jsx
import React, { useState } from "react";
import JadeCard from "../components/common/JadeCard";
import SearchBar from "../components/ui/SearchBar";
import { jadesData } from "../data/jades";

const Jades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [filteredJades, setFilteredJades] = useState(jadesData);

  const jadeTypes = ["all", "attack", "ice_explosion", "boss_attack", "monster_attack", "fusion", "mixed"];
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
        (jade.description && jade.description.toLowerCase().includes(term.toLowerCase()));

      const matchesType = type === "all" || jade.type === type;
      const matchesRarity =
        rarity === "all" || jade.rarity.toLowerCase() === rarity;

      return matchesTerm && matchesType && matchesRarity;
    });

    setFilteredJades(filtered);
  };

  // Вспомогательная функция для получения понятного названия типа
  const getTypeName = (type) => {
    switch(type) {
      case "attack": return "Атака";
      case "ice_explosion": return "Лед. взрыв";
      case "boss_attack": return "Атака по боссам";
      case "monster_attack": return "Атака по монстрам";
      case "fusion": return "Слияние";
      case "mixed": return "Смешанный";
      case "all": return "Все";
      default: return type;
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Нефриты</h1>

      <div className="filters-container">
        <div className="search-filter">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Поиск нефритов..."
            initialValue={searchTerm}
          />
        </div>

        <div className="filter-group">
          <div className="filter-section">
            <span className="filter-label">Тип:</span>
            <div className="filter-options">
              {jadeTypes.map((type) => (
                <button
                  key={type}
                  className={`filter-btn ${selectedType === type ? "active" : ""}`}
                  onClick={() => handleTypeChange(type)}
                >
                  {getTypeName(type)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <span className="filter-label">Редкость:</span>
            <div className="filter-options">
              {jadeRarities.map((rarity) => (
                <button
                  key={rarity}
                  className={`filter-btn ${selectedRarity === rarity ? "active" : ""}`}
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
        <div className="empty-result">
          <p>По заданным параметрам ничего не найдено.</p>
        </div>
      ) : (
        <div className="items-grid jade-listing">
          {filteredJades.map((jade) => (
            <JadeCard key={jade.id} jade={jade} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jades;