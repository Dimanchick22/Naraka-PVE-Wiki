// src/pages/PveModes.jsx
import React from "react";
import { pveModesData } from "../data/pveModes";
import Button from "../components/ui/Button";

const PveModes = () => {
  // Функция для определения иконки в зависимости от режима
  const getModeIcon = (mode) => {
    if (mode.id === "regular") {
      return "М"; // М от "Маршрут" или "Миссия"
    } else if (mode.id === "advanced") {
      return "П"; // П от "Продвинутый"
    } else {
      return "И"; // И от "Испытание"
    }
  };

  // Получение класса для сложности
  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Нормальный":
        return "text-green-400";
      case "Сложный":
        return "text-orange-400";
      case "Очень сложный":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">PVE Режимы</h1>

      <div className="section-description">
        <p>
          Naraka Bladepoint предлагает разнообразные PVE режимы, от простых для
          начинающих до экстремально сложных испытаний для опытных игроков.
          Выбирайте режим в соответствии с вашим уровнем подготовки и целями.
        </p>
      </div>

      {pveModesData.length > 0 ? (
        <div className="pve-modes-list">
          {pveModesData.map((mode) => (
            <div
              key={mode.id}
              className="card mb-8"
            >
              <div className="p-6 border-b border-opacity-30 border-yellow-600 flex items-center gap-4">
                <div
                  className="flex items-center justify-center w-15 h-15 rounded-full bg-red-900 bg-opacity-30 text-2xl font-bold text-secondary"
                >
                  {getModeIcon(mode)}
                </div>

                <div>
                  <h2 className="text-xl mb-1">{mode.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-light opacity-80">
                      Сложность:
                    </span>
                    <span className={`font-bold ${getDifficultyClass(mode.difficulty)}`}>
                      {mode.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="mb-6 text-light leading-relaxed">
                  {mode.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg mb-3 text-secondary">
                      Награды
                    </h3>
                    <ul className="pl-6 list-disc">
                      {mode.rewards && mode.rewards.map((reward, i) => (
                        <li key={i} className="mb-2">
                          {reward}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg mb-3 text-secondary">
                      Этапы
                    </h3>
                    <div className="mb-3">
                      <span className="font-bold">
                        Рекомендуемый уровень:
                      </span>{" "}
                      {mode.recommended_level}
                    </div>
                    <div className="space-y-3">
                      {mode.stages && mode.stages.map((stage, i) => (
                        <div
                          key={i}
                          className="p-2 bg-black bg-opacity-20 rounded"
                        >
                          <div className="font-bold mb-1">
                            {stage.name}
                          </div>
                          <div className="text-sm opacity-80">
                            {stage.description && stage.description.substring(0, 80)}...
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-900 bg-opacity-10 rounded border border-purple-900 border-opacity-30">
                  <h3 className="text-lg mb-3 flex items-center gap-2">
                    Советы для прохождения
                  </h3>
                  <ul className="pl-6 list-disc">
                    {mode.tips && mode.tips.slice(0, 3).map((tip, i) => (
                      <li key={i} className="mb-2">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 border-t border-opacity-30 border-yellow-600 flex justify-end">
                <Button variant="secondary">Подробнее</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-result">
          <p>В настоящее время информация о PVE режимах отсутствует.</p>
          <p className="mt-2">Информация будет добавлена в ближайшее время.</p>
        </div>
      )}
    </div>
  );
};

export default PveModes;