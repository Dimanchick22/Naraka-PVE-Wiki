// pages/Rarities.jsx
import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import { Link } from "react-router-dom";
import CloudinaryImage from "../components/common/CloudinaryImage";

// Данные о диковинках
const raritiesData = [
  // Колокольчик девятихвостой души - три варианта редкости
  {
    id: "nine-tailed-chime-mythic",
    name: "Колокольчик девятихвостой души",
    type: "yang", // Ян
    rarity: "mythic",
    description: "Во время действия [Зачарования: Приключение], когда горизонтальные и вертикальные завершающие удары, заряженная атака, боевое мастерство Раскола эгиды и [Удар хвостом: Приключение] поражают врага, можно призвать дух лисы и нанести дополнительный удар. Урон от удара духа лисы увеличен на 200%.",
    for_character: "Тесса",
    effects: [
      "Увеличивает урон духа лисы на 200%",
      "Активируется от различных типов атак"
    ],
    cloudinaryId: "nine-tailed-chime-mythic_j8pxhp.png",
  },
  {
    id: "nine-tailed-chime-legendary",
    name: "Колокольчик девятихвостой души",
    type: "yang", // Ян
    rarity: "legendary",
    description: "Во время действия [Зачарования: Приключение], когда горизонтальные и вертикальные завершающие удары, заряженная атака, боевое мастерство Раскола эгиды и [Удар хвостом: Приключение] поражают врага, можно призвать дух лисы и нанести дополнительный удар. Урон от удара духа лисы увеличен на 100%.",
    for_character: "Тесса",
    effects: [
      "Увеличивает урон духа лисы на 100%",
      "Активируется от различных типов атак"
    ],
    cloudinaryId: "nine-tailed-chime-mythic_j8pxhp.png",
  },
  {
    id: "nine-tailed-chime-epic",
    name: "Колокольчик девятихвостой души",
    type: "yang", // Ян
    rarity: "epic",
    description: "Во время действия [Зачарования: Приключение], когда горизонтальные и вертикальные завершающие удары, заряженная атака, боевое мастерство Раскола эгиды и [Удар хвостом: Приключение] поражают врага, можно призвать дух лисы и нанести дополнительный удар.",
    for_character: "Тесса",
    effects: [
      "Позволяет призвать дух лисы для дополнительного удара",
      "Активируется от различных типов атак"
    ],
    cloudinaryId: "nine-tailed-chime-mythic_j8pxhp.png",
  },
  
  // Чаша увядшей славы - три варианта редкости
  {
    id: "withered-glory-mythic",
    name: "Чаша увядшей славы",
    type: "yin", // Инь
    rarity: "mythic",
    description: "Увеличивает урон цветочного взрыва на 50%.",
    for_character: "Цзыпин",
    effects: [
      "Увеличивает урон цветочного взрыва на 50%",
      "Также увеличивает радиус взрыва на 30%"
    ],
    cloudinaryId: "withered-glory-mythic_zds2gn.png",
  },
  {
    id: "withered-glory-legendary",
    name: "Чаша увядшей славы",
    type: "yin", // Инь
    rarity: "legendary",
    description: "Увеличивает урон цветочного взрыва на 30%.",
    for_character: "Цзыпин",
    effects: [
      "Увеличивает урон цветочного взрыва на 30%",
      "Также увеличивает радиус взрыва на 15%"
    ],
    cloudinaryId: "withered-glory-mythic_zds2gn.png",
  },
  {
    id: "withered-glory-epic",
    name: "Чаша увядшей славы",
    type: "yin", // Инь
    rarity: "epic",
    description: "Увеличивает урон цветочного взрыва на 10%.",
    for_character: "Цзыпин",
    effects: [
      "Увеличивает урон цветочного взрыва на 10%",
      "Не увеличивает радиус взрыва"
    ],
    cloudinaryId: "withered-glory-mythic_zds2gn.png",
  }
];

const Rarities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRarities, setFilteredRarities] = useState(raritiesData);
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Обработчик поиска
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterRarities(term, selectedRarity, selectedType);
  };

  // Обработчик выбора редкости
  const handleRarityChange = (rarity) => {
    setSelectedRarity(rarity);
    filterRarities(searchTerm, rarity, selectedType);
  };

  // Обработчик выбора типа
  const handleTypeChange = (type) => {
    setSelectedType(type);
    filterRarities(searchTerm, selectedRarity, type);
  };

  // Фильтрация диковинок
  const filterRarities = (term, rarity, type) => {
    const filtered = raritiesData.filter((item) => {
      const matchesTerm = 
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        item.description.toLowerCase().includes(term.toLowerCase());
      
      const matchesRarity = rarity === "all" || item.rarity === rarity;
      const matchesType = type === "all" || item.type === type;
      
      return matchesTerm && matchesRarity && matchesType;
    });
    
    setFilteredRarities(filtered);
  };

  // Получение цвета в зависимости от редкости
  const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case "mythic":
        return "#990000"; // Приглушенный красный для мифического
      case "legendary":
        return "#cc6600"; // Приглушенный оранжевый для легендарного
      case "epic":
        return "#7a1fa5"; // Приглушенный фиолетовый для эпического
      case "rare":
        return "#004a8f"; // Приглушенный синий для редкого
      case "uncommon":
        return "#1f7a1f"; // Приглушенный зеленый для необычного
      default:
        return "#555555"; // Темно-серый для обычного
    }
  };

  // Получение названия редкости
  const getRarityName = (rarity) => {
    switch (rarity.toLowerCase()) {
      case "mythic":
        return "Мифический";
      case "legendary":
        return "Легендарный";
      case "epic":
        return "Эпический";
      case "rare":
        return "Редкий";
      case "uncommon":
        return "Необычный";
      default:
        return "Обычный";
    }
  };

  // Получение названия типа
  const getTypeName = (type) => {
    switch (type.toLowerCase()) {
      case "yin":
        return "Инь";
      case "yang":
        return "Ян";
      default:
        return type;
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Диковинки</h1>

      <div className="section-description">
        <p>
          Диковинки - это редкие предметы, которые можно найти в различных режимах PVE. 
          Они усиливают способности персонажей и могут значительно повлиять на игровой процесс.
          Диковинки бывают двух типов: Инь и Ян, каждый с уникальными свойствами.
        </p>
      </div>

      <div className="filters-container" style={{ maxWidth: "800px", margin: "0 auto 2rem auto" }}>
        <div className="search-filter" style={{ marginBottom: "1rem" }}>
          <SearchBar onSearch={handleSearch} placeholder="Поиск диковинок..." />
        </div>

        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "1rem", 
          justifyContent: "center" 
        }}>
          {/* Фильтр по редкости */}
          <div className="filter-section">
            <span style={{ marginRight: "0.5rem", alignSelf: "center" }}>Редкость:</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["all", "mythic", "legendary", "epic"].map((rarity) => (
                <button
                  key={rarity}
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    border: "none",
                    backgroundColor:
                      selectedRarity === rarity
                        ? (rarity === "all" ? "#8b0000" : getRarityColor(rarity))
                        : "rgba(50, 50, 50, 0.7)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRarityChange(rarity)}
                >
                  {rarity === "all"
                    ? "Все"
                    : getRarityName(rarity)}
                </button>
              ))}
            </div>
          </div>

          {/* Фильтр по типу */}
          <div className="filter-section">
            <span style={{ marginRight: "0.5rem", alignSelf: "center" }}>Тип:</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["all", "yin", "yang"].map((type) => (
                <button
                  key={type}
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    border: "none",
                    backgroundColor:
                      selectedType === type
                        ? (type === "all" ? "#8b0000" : 
                           type === "yin" ? "#1e4e8a" : "#8a1e1e")
                        : "rgba(50, 50, 50, 0.7)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTypeChange(type)}
                >
                  {type === "all"
                    ? "Все"
                    : getTypeName(type)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredRarities.length === 0 ? (
        <div className="text-center" style={{ padding: "2rem" }}>
          <p>По запросу "{searchTerm}" ничего не найдено.</p>
        </div>
      ) : (
        <div className="rarities-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "1.5rem" }}>
          {filteredRarities.map((rarity) => (
            <div 
              key={rarity.id}
              className="rarity-card"
              style={{
                backgroundColor: "rgba(20, 20, 20, 0.9)",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                border: `2px solid ${getRarityColor(rarity.rarity)}50`,
                boxShadow: `0 0 15px ${getRarityColor(rarity.rarity)}30`
              }}
            >
              {/* Заголовок карточки с фоном соответствующего цвета */}
              <div 
                className="rarity-header"
                style={{
                  backgroundColor: getRarityColor(rarity.rarity),
                  color: "white",
                  padding: "1rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem"
                }}
              >
                {/* Место для иконки */}
                <div
                  className="rarity-icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden" // Добавлено для обрезки изображений, выходящих за пределы контейнера
                  }}>
                    {rarity.cloudinaryId ? (
                    <CloudinaryImage 
                        publicId={`${rarity.cloudinaryId}`} 
                        alt={rarity.name}
                        style={{
                        maxWidth: "100%",
                        maxHeight: "100%"
                        }}
                        transformations={{
                        width: 100,
                        height: 100,
                        crop: "fill" // Use 'fill' to maintain aspect ratio
                        }}
                    />
                    ) : (
                    <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                        {rarity.type === "yin" ? "阴" : "阳"}
                    </div>
                    )}
                </div>

                {/* Информация о диковинке */}
                <div className="rarity-header-info" style={{ flex: 1 }}>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: "1.25rem", 
                    fontWeight: "bold",
                    color: "white",
                  }}>
                    {rarity.name}
                  </h3>
                  
                  <div style={{ 
                    marginTop: "0.25rem", 
                    fontSize: "0.875rem"
                  }}>
                    <span style={{ fontWeight: "bold" }}>
                      {getTypeName(rarity.type)}|{getRarityName(rarity.rarity)}
                    </span>
                  </div>
                  
                  {rarity.for_character && (
                    <div style={{ marginTop: "0.25rem", fontSize: "0.875rem" }}>
                      Только для {rarity.for_character}
                    </div>
                  )}
                </div>
              </div>

              {/* Основное содержимое карточки */}
              <div className="rarity-content" style={{ 
                padding: "1rem",
                flex: 1,
                backgroundColor: "#1a1a1a",
                color: "#e0e0e0"
              }}>
                <p style={{ margin: "0 0 1rem 0" }}>{rarity.description}</p>
                
                <div className="rarity-effects">
                  <h4 style={{ 
                    fontSize: "1rem", 
                    marginBottom: "0.5rem",
                    color: "#cccccc"
                  }}>
                    Эффекты:
                  </h4>
                  <ul style={{ 
                    paddingLeft: "1.5rem", 
                    fontSize: "0.875rem",
                    margin: 0,
                    color: "#cccccc"
                  }}>
                    {rarity.effects.map((effect, index) => (
                      <li key={index} style={{ 
                        marginBottom: "0.25rem" 
                      }}>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Футер карточки с кнопкой "Подробнее" */}
              <div style={{
                padding: "0.75rem",
                display: "flex",
                justifyContent: "flex-end",
                backgroundImage: `linear-gradient(to left, rgba(${rarity.rarity === "mythic" ? "153, 0, 0" : rarity.rarity === "legendary" ? "255, 128, 0" : "163, 53, 238"}, 0.25), rgba(26, 26, 26, 0.8))`,
                borderTop: "1px solid #2a2a2a"
              }}>
                <Link 
                  to={`/rarities/${rarity.id}`} 
                  style={{
                    backgroundColor: "#d4af37",
                    color: "#000000",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "0.875rem"
                  }}
                >
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