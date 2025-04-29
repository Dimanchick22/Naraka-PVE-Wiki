import React from "react";
import { formatNumber } from "../utils/formatUtils";

/**
 * Компонент для отображения результатов расчетов
 * @param {Object} props - Свойства компонента
 * @param {Object} props.results - Результаты расчетов
 * @param {boolean} props.tessaF - Использовался ли мультипликатор Тессы
 * @param {boolean} props.consciousnessMatch - Использовался ли мультипликатор совпадения сознания
 * @returns {JSX.Element | null} - Элемент компонента или null, если нет результатов
 */
const ResultsDisplay = ({ results, tessaF, consciousnessMatch }) => {
  if (!results) return null;

  return (
    <div className="results-container">
      <h2 className="section-title">Результаты расчетов</h2>

      <div className="results-grid">
        <div className="results-summary">
          <div className="summary-row">
            <span className="summary-label">Атака:</span>
            <span className="summary-value">
              {formatNumber(Math.round(results.finalAttack))}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Мультипликаторы:</span>
            <span className="summary-value">
              {tessaF ? "Тесса (×1.08)" : ""}
              {tessaF && consciousnessMatch ? ", " : ""}
              {consciousnessMatch ? "Сознание (×1.15)" : ""}
              {!tessaF && !consciousnessMatch ? "Нет" : ""}
            </span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row">
            <span className="summary-label">Общий урон нефрита (боссы):</span>
            <span className="summary-value highlight">
              {formatNumber(results.bossTotalJadeDamage)}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Общий урон нефрита (монстры):</span>
            <span className="summary-value highlight">
              {formatNumber(results.monsterTotalJadeDamage)}
            </span>
          </div>
        </div>

        <ResultCard
          title="Атака"
          value={formatNumber(Math.round(results.finalAttack))}
          label={`Базовая атака: ${formatNumber(Math.round(results.baseAttack))}`}
        />

        <ResultCard
          title="Обычный урон"
          value={formatNumber(Math.round(results.iceExplosionDamage))}
          label="Ледяной взрыв"
        />

        <ResultCard
          title="Урон по боссам"
          value={formatNumber(Math.round(results.bossDamage))}
          label="Ледяной взрыв"
        />

        <ResultCard
          title="Урон по монстрам"
          value={formatNumber(Math.round(results.monsterDamage))}
          label="Ледяной взрыв"
        />

        <ResultCard
          title="Взрыв цветка"
          value={formatNumber(Math.round(results.flowerExplosionDamage))}
          label="Обычный урон"
        />

        <ResultCard
          title="Взрыв цветка (боссы)"
          value={formatNumber(Math.round(results.bossFlowerDamage))}
          label="Урон по боссам"
        />

        <ResultCard
          title="Взрыв цветка (монстры)"
          value={formatNumber(Math.round(results.monsterFlowerDamage))}
          label="Урон по монстрам"
        />

        <ResultCard
          title="Урон нефрита (общий)"
          value={formatNumber(results.bossTotalJadeDamage)}
          label="По боссам (3 взрыва)"
          highlight
        />

        <ResultCard
          title="Урон нефрита (общий)"
          value={formatNumber(results.monsterTotalJadeDamage)}
          label="По монстрам (3 взрыва)"
          highlight
        />
      </div>
    </div>
  );
};

/**
 * Компонент карточки результата
 * @param {Object} props - Свойства компонента
 * @param {string} props.title - Заголовок карточки
 * @param {string} props.value - Значение
 * @param {string} props.label - Подпись к значению
 * @param {boolean} props.highlight - Флаг выделения карточки
 * @returns {JSX.Element} - Элемент компонента
 */
const ResultCard = ({ title, value, label, highlight = false }) => {
  return (
    <div className={`result-card ${highlight ? "highlight" : ""}`}>
      <h3>{title}</h3>
      <p className="value">{value}</p>
      <p className="label">{label}</p>
    </div>
  );
};

export default ResultsDisplay;
