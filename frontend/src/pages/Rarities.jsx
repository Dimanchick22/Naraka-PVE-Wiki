// src/pages/Rarities.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import CloudinaryImage from "../components/common/CloudinaryImage";
import { getRarityColor, getRarityName, getRarityTypeName } from "../data/rarities";

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

      <div className="filters-container">
        <div className="search-filter">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Поиск диковинок..." 
            initialValue={searchTerm}
          />
        </div>

        <div className="filter-group">
          {/* Фильтр по редкости */}
          <div className="filter-section">
            <span className="filter-label">Редкость:</span>
            <div className="filter-options">
              {["all", "mythic", "legendary", "epic"].map((rarity) => (
                <button
                  key={rarity}
                  className={`filter-btn ${selectedRarity === rarity ? "active" : ""}`}
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
            <span className="filter-label">Тип:</span>
            <div className="filter-options">
              {["all", "yin", "yang"].map((type) => (
                <button
                  key={type}
                  className={`filter-btn ${selectedType === type ? "active" : ""}`}
                  onClick={() => handleTypeChange(type)}
                  style={{
                    backgroundColor: selectedType === type 
                      ? (type === "all" ? "var(--naraka-primary)" : 
                         type === "yin" ? "#1e4e8a" : "#8a1e1e")
                      : undefined
                  }}
                >
                  {type === "all"
                    ? "Все"
                    : getRarityTypeName(type)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredRarities.length === 0 ? (
        <div className="empty-result">
          <p>По запросу "{searchTerm}" ничего не найдено.</p>
        </div>
      ) : (
        <div className="rarities-grid">
          {filteredRarities.map((rarity) => (
            <div 
              key={rarity.id}
              className="rarity-card"
              style={{
                borderColor: `${getRarityColor(rarity.rarity)}50`
              }}
            >
              {/* Заголовок карточки */}
              <div 
                className="rarity-header"
                style={{
                  backgroundColor: getRarityColor(rarity.rarity)
                }}
              >
                <div className="rarity-icon">
                  {rarity.cloudinaryId ? (
                    <CloudinaryImage 
                      publicId={rarity.cloudinaryId} 
                      alt={rarity.name}
                      width={100}
                      height={100}
                      fit="fill"
                    />
                  ) : (
                    <div className="rarity-icon-placeholder text-2xl font-bold">
                      {rarity.type === "yin" ? "阴" : "阳"}
                    </div>
                  )}
                </div>

                <div className="rarity-header-info">
                  <h3 className="text-xl font-bold text-white m-0">
                    {rarity.name}
                  </h3>
                  
                  <div className="mt-1 text-sm">
                    <span className="font-bold">
                      {getRarityTypeName(rarity.type)}|{getRarityName(rarity.rarity)}
                    </span>
                  </div>
                  
                  {rarity.for_character && (
                    <div className="mt-1 text-sm">
                      Только для {rarity.for_character}
                    </div>
                  )}
                </div>
              </div>

              {/* Основное содержимое карточки */}
              <div className="rarity-content p-4 bg-opacity-50 flex-1">
                <p className="mb-4">{rarity.description}</p>
                
                <div className="rarity-effects">
                  <h4 className="text-base mb-2 text-gray-300">
                    Эффекты:
                  </h4>
                  <ul className="pl-6 text-sm m-0 text-gray-300">
                    {rarity.effects.map((effect, index) => (
                      <li key={index} className="mb-1">
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Футер карточки */}
              <div className="p-3 flex justify-end"
                style={{
                  backgroundImage: `linear-gradient(to left, rgba(${rarity.rarity === "mythic" ? "153, 0, 0" : rarity.rarity === "legendary" ? "255, 128, 0" : "163, 53, 238"}, 0.25), rgba(26, 26, 26, 0.8))`,
                  borderTop: "1px solid #2a2a2a"
                }}
              >
                <Link 
                  to={`/rarities/${rarity.id}`} 
                  className="btn btn-secondary btn-small"
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