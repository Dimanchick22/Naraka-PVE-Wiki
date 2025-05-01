import React, { useState, useEffect } from "react";
import CustomSelect from "../../../components/common/CustomSelect";

// Создаем пустой слот нефрита с 4 пустыми статами
const createEmptyJade = () => ({
  stats: [
    { type: "empty", value: "0" },
    { type: "empty", value: "0" },
    { type: "empty", value: "0" },
    { type: "empty", value: "0" },
  ],
});

// Получение цвета для нефрита в зависимости от типа стата
const getJadeColor = (jade) => {
  // Проверяем наличие статов
  if (!jade || !jade.stats) return 'rgba(212, 175, 55, 0.3)';
  
  // Находим первый непустой стат
  const firstStat = jade.stats.find(stat => stat.type !== "empty");
  
  // Если все статы пустые, возвращаем стандартный цвет
  if (!firstStat) return 'rgba(212, 175, 55, 0.3)';
  
  // Цвета для разных типов статов
  switch (firstStat.type) {
    case "attack":
      return 'rgba(139, 0, 0, 0.7)'; // Красный для атаки
    case "ice_explosion":
      return 'rgba(0, 112, 221, 0.7)'; // Синий для ледяного взрыва
    case "boss_attack":
      return 'rgba(163, 53, 238, 0.7)'; // Фиолетовый для атаки по боссам
    case "monster_attack":
      return 'rgba(45, 197, 14, 0.7)'; // Зеленый для атаки по монстрам
    case "fusion":
      return 'rgba(255, 128, 0, 0.7)'; // Оранжевый для слияния
    case "absorption":
      return 'rgba(255, 0, 128, 0.7)'; // Розовый для поглощения
    case "ignition":
      return 'rgba(255, 60, 0, 0.7)'; // Ярко-оранжевый для возгорания
    default:
      return 'rgba(212, 175, 55, 0.3)'; // Стандартный золотистый
  }
};

// Получение названия для типа стата
const getStatTypeName = (type) => {
  switch (type) {
    case "empty": return "Пусто";
    case "attack": return "Атака";
    case "ice_explosion": return "Лед. взрыв";
    case "fusion": return "Слияние";
    case "boss_attack": return "Урон по боссу";
    case "monster_attack": return "Урон по монстрам";
    case "absorption": return "Поглощение";
    case "ignition": return "Возгорание";
    default: return type;
  }
};

// Получение максимального значения для типа стата
const getMaxValueForType = (type) => {
  switch (type) {
    case "attack": return 4;
    case "ice_explosion": return 30;
    case "boss_attack": return 5;
    case "monster_attack": return 5;
    case "fusion": return 50;  // Для слияния используется выпадающий список со своими значениями
    default: return 50;
  }
};

// Форматирование значения для отображения в карточке нефрита
const formatDisplayValue = (value) => {
  if (!value) return "0";
  // Заменяем точку на запятую для отображения
  return value.toString().replace('.', ',');
};

// Нормализация вводимого значения для внутренней обработки
const normalizeInputValue = (value) => {
  if (!value) return "0";
  // Заменяем запятую на точку для корректных расчетов
  return value.toString().replace(',', '.');
};

/**
 * Компонент для отображения сетки нефритов
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onJadeBonusChange - Функция для обновления бонусов нефритов
 * @returns {JSX.Element} - Элемент компонента
 */
const JadesGrid = ({ onJadeBonusChange }) => {
  // Состояние для 6 нефритов
  const [jades, setJades] = useState([
    createEmptyJade(),
    createEmptyJade(),
    createEmptyJade(),
    createEmptyJade(),
    createEmptyJade(),
    createEmptyJade(),
  ]);
  
  // Состояние для отслеживания активного нефрита
  const [activeJadeIndex, setActiveJadeIndex] = useState(null);
  
  // Типы статов нефрита для селекта
  const statTypeOptions = [
    { id: "empty", name: "Пусто" },
    { id: "attack", name: "Атака" },
    { id: "ice_explosion", name: "Лед. взрыв" },
    { id: "fusion", name: "Слияние" },
    { id: "boss_attack", name: "Урон по боссу" },
    { id: "monster_attack", name: "Урон по монстрам" },
    { id: "absorption", name: "Поглощение" },
    { id: "ignition", name: "Возгорание" },
  ];

  // Значения только для статов слияния
  const fusionStatValueOptions = [
    { id: "30", name: "30%" },
    { id: "40", name: "40%" },
    { id: "50", name: "50%" }
  ];
  
  // Значения для стата поглощения
  const absorptionStatValueOptions = [
    { id: "15", name: "15%" },
    { id: "20", name: "20%" },
    { id: "25", name: "25%" }
  ];
  
  // Значения для стата возгорания
  const ignitionStatValueOptions = [
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" }
  ];

  // Обновляет нефрит по индексу
  const handleJadeChange = (index, updatedJade) => {
    const newJades = [...jades];
    newJades[index] = updatedJade;
    setJades(newJades);
  };

  // Обработчик изменения типа стата
  const handleStatTypeChange = (jadeIndex, statIndex, type) => {
    const updatedJade = { ...jades[jadeIndex] };
    updatedJade.stats[statIndex].type = type;

    // Устанавливаем значения по умолчанию в зависимости от типа стата
    if (type === "fusion") {
      updatedJade.stats[statIndex].value = "50";
    } else if (type === "absorption") {
      updatedJade.stats[statIndex].value = "25";
    } else if (type === "ignition") {
      updatedJade.stats[statIndex].value = "3";
    } else if (type !== "empty") {
      // Для других типов устанавливаем значение по умолчанию
      updatedJade.stats[statIndex].value = type === "ice_explosion" ? "30" : type === "attack" ? "4" : "5";
    } else {
      updatedJade.stats[statIndex].value = "0";
    }

    handleJadeChange(jadeIndex, updatedJade);
  };

  // Обработчик изменения значения стата
  const handleStatValueChange = (jadeIndex, statIndex, value) => {
    const updatedJade = { ...jades[jadeIndex] };
    updatedJade.stats[statIndex].value = value;
    handleJadeChange(jadeIndex, updatedJade);
  };

  // Обработчик ввода значения для стата
  const handleStatValueInput = (jadeIndex, statIndex, event) => {
    // Получаем введенное значение и заменяем запятую на точку
    let inputValue = event.target.value;
    
    // Оставляем только цифры, точки и запятые
    inputValue = inputValue.replace(/[^\d.,]/g, '');
    
    // Ограничиваем до одного разделителя (точка или запятая)
    const dotIndex = inputValue.indexOf('.');
    const commaIndex = inputValue.indexOf(',');
    
    if (dotIndex !== -1 && commaIndex !== -1) {
      // Если есть и точка и запятая, удаляем последний добавленный разделитель
      const lastSeparatorIndex = Math.max(dotIndex, commaIndex);
      inputValue = inputValue.substring(0, lastSeparatorIndex) + 
                   inputValue.charAt(lastSeparatorIndex) + 
                   inputValue.substring(lastSeparatorIndex + 1).replace(/[.,]/g, '');
    }
    
    // Если значение не пустое, проверяем его против максимума
    if (inputValue !== '') {
      // Нормализуем значение для сравнения (заменяем запятую на точку)
      const normalizedValue = normalizeInputValue(inputValue);
      const numValue = parseFloat(normalizedValue);
      
      // Получаем тип стата
      const statType = jades[jadeIndex].stats[statIndex].type;
      
      // Определяем максимальное значение для данного типа
      const maxValue = getMaxValueForType(statType);
      
      // Ограничиваем значение минимумом и максимумом
      if (!isNaN(numValue)) {
        if (numValue < 0) inputValue = '0';
        if (numValue > maxValue) inputValue = maxValue.toString();
      }
    }

    const updatedJade = { ...jades[jadeIndex] };
    updatedJade.stats[statIndex].value = inputValue;
    handleJadeChange(jadeIndex, updatedJade);
  };

  // Пересчитываем суммарные бонусы от нефритов
  useEffect(() => {
    calculateJadeBonuses(jades);
  }, [jades]);

  /**
   * Расчет бонусов от нефритов
   * @param {Array} jadesList - Список нефритов
   */
  const calculateJadeBonuses = (jadesList) => {
    let attackBonus = 0;
    let iceExplosionBonus = 0;
    let bossAttackBonus = 0;
    let monsterAttackBonus = 0;

    // Сначала рассчитаем множитель слияния для каждого нефрита
    const jadeMultipliers = jadesList.map((jade) => {
      // Собираем базовые статы
      const baseStats = {
        attack: 0,
        ice_explosion: 0,
        boss_attack: 0,
        monster_attack: 0,
      };

      // Общий множитель слияния для этого нефрита
      let fusionMultiplier = 1.0;

      // Вычисляем базовые статы и множитель слияния
      jade.stats.forEach((stat) => {
        if (stat.type === "fusion") {
          fusionMultiplier += parseFloat(normalizeInputValue(stat.value)) / 100;
        } else if (stat.type !== "empty") {
          baseStats[stat.type] += parseFloat(normalizeInputValue(stat.value)) / 100;
        }
      });

      // Возвращаем объект с базовыми статами и множителем
      return { baseStats, fusionMultiplier };
    });

    // Теперь применим множители к статам и суммируем
    jadeMultipliers.forEach(({ baseStats, fusionMultiplier }) => {
      attackBonus += baseStats.attack * fusionMultiplier;
      iceExplosionBonus += baseStats.ice_explosion * fusionMultiplier;
      bossAttackBonus += baseStats.boss_attack * fusionMultiplier;
      monsterAttackBonus += baseStats.monster_attack * fusionMultiplier;
    });

    // Обновляем общие бонусы от нефритов
    onJadeBonusChange({
      attackBonus,
      iceExplosionBonus,
      bossAttackBonus,
      monsterAttackBonus,
    });
  };

  return (
    <div className="jades-grid-container">
      <h2 className="section-title">Нефриты</h2>
      
      <div className="jades-grid">
        {jades.map((jade, index) => (
          <div 
            key={index} 
            className={`jade-item ${activeJadeIndex === index ? 'active' : ''}`}
            style={{
              borderColor: getJadeColor(jade),
              backgroundColor: index === activeJadeIndex ? 'rgba(26, 26, 26, 0.9)' : 'rgba(26, 26, 26, 0.6)'
            }}
            onClick={() => setActiveJadeIndex(activeJadeIndex === index ? null : index)}
          >
            <div className="jade-header">
              <span className="jade-number">Нефрит {index + 1}</span>
            </div>
            
            <div className="jade-stats-preview">
              {jade.stats.filter(stat => stat.type !== "empty").length > 0 ? (
                jade.stats.filter(stat => stat.type !== "empty").map((stat, statIndex) => (
                  <div key={statIndex} className="jade-stat-preview">
                    <span 
                      className="stat-type"
                      style={{
                        color: ["fusion", "absorption", "ignition"].includes(stat.type) ? 'var(--naraka-primary)' : 'var(--naraka-light)'
                      }}
                    >
                      {getStatTypeName(stat.type)}
                    </span>
                    <span 
                      className="stat-value"
                      style={{
                        color: ["fusion", "absorption", "ignition"].includes(stat.type) ? 'var(--naraka-primary)' : 'var(--naraka-light)'
                      }}
                    >
                      +{formatDisplayValue(stat.value)}{stat.type === "ignition" ? "" : "%"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="jade-empty-message">Пустой слот</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Панель редактирования нефрита */}
      {activeJadeIndex !== null && (
        <div className="jade-edit-panel">
          <h3 className="jade-edit-title">Редактирование нефрита {activeJadeIndex + 1}</h3>
          
          <div className="jade-stats-edit">
            {jades[activeJadeIndex].stats.map((stat, statIndex) => (
              <div 
                key={statIndex} 
                className="jade-stat-row"
                data-type={stat.type}
              >
                <div className="jade-stat-type">
                  <CustomSelect
                    options={statTypeOptions}
                    value={stat.type}
                    onChange={(value) => handleStatTypeChange(activeJadeIndex, statIndex, value)}
                    className="stat-select"
                  />
                </div>

                <div className="jade-stat-value">
                  {stat.type !== "empty" && (
                    ["fusion", "absorption", "ignition"].includes(stat.type) ? (
                      <CustomSelect
                        options={
                          stat.type === "fusion" 
                            ? fusionStatValueOptions 
                            : stat.type === "absorption"
                              ? absorptionStatValueOptions
                              : ignitionStatValueOptions
                        }
                        value={stat.value}
                        onChange={(value) => handleStatValueChange(activeJadeIndex, statIndex, value)}
                        className="stat-select"
                      />
                    ) : (
                      <div className="stat-value-input-container">
                                                  <input
                          type="text"
                          className="stat-value-input"
                          value={stat.value}
                          onChange={(e) => handleStatValueInput(activeJadeIndex, statIndex, e)}
                          placeholder="0"
                        />
                        <span className="input-suffix">{stat.type === "ignition" ? "" : "%"}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="jade-edit-actions">
            <button 
              className="btn btn-secondary close-edit-button"
              onClick={() => setActiveJadeIndex(null)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadesGrid;