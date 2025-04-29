import React, { useState } from "react";

/**
 * Компонент слота нефрита
 * @param {Object} props - Свойства компонента
 * @param {number} props.index - Индекс слота нефрита
 * @param {Object} props.jade - Объект нефрита
 * @param {Function} props.onJadeChange - Функция обработки изменений
 * @returns {JSX.Element} - Элемент компонента
 */
const JadeSlot = ({ index, jade, onJadeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Типы статов нефрита
  const statTypes = [
    { id: "empty", name: "Пусто" },
    { id: "attack", name: "Атака" },
    { id: "ice_explosion", name: "Лед. взрыв" },
    { id: "fusion", name: "Слияние" },
    { id: "boss_attack", name: "Атака по боссу" },
    { id: "monster_attack", name: "Атака по монстрам" },
  ];

  // Значения для статов
  const statValues = ["10", "20", "30", "40", "50"];
  const fusionValues = ["30", "40", "50"];

  // Обработчик изменения типа стата
  const handleStatTypeChange = (statIndex, type) => {
    const updatedJade = { ...jade };
    updatedJade.stats[statIndex].type = type;

    // Если изменился тип на слияние, установим соответствующее значение
    if (type === "fusion") {
      updatedJade.stats[statIndex].value = "30";
    } else if (type !== "empty") {
      updatedJade.stats[statIndex].value = "20";
    } else {
      updatedJade.stats[statIndex].value = "0";
    }

    onJadeChange(index, updatedJade);
  };

  // Обработчик изменения значения стата
  const handleStatValueChange = (statIndex, value) => {
    const updatedJade = { ...jade };
    updatedJade.stats[statIndex].value = value;
    onJadeChange(index, updatedJade);
  };

  return (
    <div className="jade-slot">
      <div className="jade-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="jade-number">Нефрит {index + 1}</span>
        <span className="jade-toggle">{isOpen ? "▼" : "►"}</span>
      </div>

      {isOpen && (
        <div className="jade-content">
          {jade.stats.map((stat, statIndex) => (
            <div key={statIndex} className="jade-stat">
              <div className="jade-stat-row">
                <select
                  value={stat.type}
                  onChange={(e) =>
                    handleStatTypeChange(statIndex, e.target.value)
                  }
                  className="jade-stat-type"
                >
                  {statTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>

                {stat.type !== "empty" && (
                  <select
                    value={stat.value}
                    onChange={(e) =>
                      handleStatValueChange(statIndex, e.target.value)
                    }
                    className="jade-stat-value"
                    disabled={stat.type === "empty"}
                  >
                    {(stat.type === "fusion" ? fusionValues : statValues).map(
                      (val) => (
                        <option key={val} value={val}>
                          {val}%
                        </option>
                      ),
                    )}
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JadeSlot;
