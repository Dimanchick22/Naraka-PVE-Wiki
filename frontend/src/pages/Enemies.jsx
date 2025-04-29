// pages/Enemies.jsx
import { useState } from "react";
import EnemyCard from "../components/common/EnemyCard";
import SearchBar from "../components/ui/SearchBar";
import { enemiesData } from "../data/enemies";

const Enemies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);
  const [filteredEnemies, setFilteredEnemies] = useState(enemiesData);

  const enemyTypes = ["all", "regular", "elite", "boss"];

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterEnemies(term, selectedType, selectedDifficulty);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    filterEnemies(searchTerm, type, selectedDifficulty);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    filterEnemies(searchTerm, selectedType, difficulty);
  };

  const filterEnemies = (term, type, difficulty) => {
    const filtered = enemiesData.filter((enemy) => {
      const matchesTerm =
        enemy.name.toLowerCase().includes(term.toLowerCase()) ||
        enemy.description.toLowerCase().includes(term.toLowerCase());

      const matchesType = type === "all" || enemy.type.toLowerCase() === type;
      const matchesDifficulty =
        difficulty === 0 || enemy.difficulty === difficulty;

      return matchesTerm && matchesType && matchesDifficulty;
    });

    setFilteredEnemies(filtered);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Враги</h1>

      <div
        className="filters-container"
        style={{ maxWidth: "800px", margin: "0 auto 2rem auto" }}
      >
        <div className="search-filter">
          <SearchBar onSearch={handleSearch} placeholder="Поиск врагов..." />
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
              {enemyTypes.map((type) => (
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
                    : type === "regular"
                      ? "Обычные"
                      : type === "elite"
                        ? "Элитные"
                        : "Боссы"}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section" style={{ marginLeft: "1rem" }}>
            <span
              className="filter-label"
              style={{ marginRight: "0.5rem", fontSize: "0.875rem" }}
            >
              Сложность:
            </span>
            <div
              className="filter-options"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
            >
              {[0, 1, 2, 3, 4, 5].map((difficulty) => (
                <button
                  key={difficulty}
                  className={`filter-btn ${selectedDifficulty === difficulty ? "active" : ""}`}
                  style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    border: "none",
                    backgroundColor:
                      selectedDifficulty === difficulty
                        ? "var(--naraka-primary)"
                        : "rgba(255, 255, 255, 0.1)",
                    color:
                      selectedDifficulty === difficulty
                        ? "white"
                        : "var(--naraka-light)",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDifficultyChange(difficulty)}
                >
                  {difficulty === 0 ? "Все" : "★".repeat(difficulty)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredEnemies.length === 0 ? (
        <div className="text-center" style={{ padding: "2rem" }}>
          <p>По заданным параметрам ничего не найдено.</p>
        </div>
      ) : (
        <div className="items-grid">
          {filteredEnemies.map((enemy) => (
            <EnemyCard key={enemy.id} enemy={enemy} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Enemies;
