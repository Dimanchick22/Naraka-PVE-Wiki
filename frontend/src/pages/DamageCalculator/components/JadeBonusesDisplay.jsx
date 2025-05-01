import React from "react";

/**
 * Компонент для отображения бонусов от нефритов
 * @param {Object} props - Свойства компонента
 * @param {Object} props.bonuses - Объект с бонусами
 * @returns {JSX.Element} - Элемент компонента
 */
const JadeBonusesDisplay = ({ bonuses }) => {
  const {
    attackBonus,
    iceExplosionBonus,
    bossAttackBonus,
    monsterAttackBonus,
  } = bonuses;

  // Форматирование бонуса в процентах
  const formatBonus = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <div className="jade-bonuses-display">
      <h2 className="bonuses-title">Бонусы от нефритов</h2>
      <div className="bonuses-grid">
        <div className="bonus-item" style={{ borderLeft: "4px solid rgba(139, 0, 0, 0.6)" }}>
          <div className="bonus-label">Бонус атаки:</div>
          <div className="bonus-value">{formatBonus(attackBonus)}</div>
        </div>
        <div className="bonus-item" style={{ borderLeft: "4px solid rgba(0, 112, 221, 0.6)" }}>
          <div className="bonus-label">Бонус ледяного взрыва:</div>
          <div className="bonus-value">{formatBonus(iceExplosionBonus)}</div>
        </div>
        <div className="bonus-item" style={{ borderLeft: "4px solid rgba(163, 53, 238, 0.6)" }}>
          <div className="bonus-label">Бонус атаки по боссам:</div>
          <div className="bonus-value">{formatBonus(bossAttackBonus)}</div>
        </div>
        <div className="bonus-item" style={{ borderLeft: "4px solid rgba(45, 197, 14, 0.6)" }}>
          <div className="bonus-label">Бонус атаки по монстрам:</div>
          <div className="bonus-value">{formatBonus(monsterAttackBonus)}</div>
        </div>
      </div>
    </div>
  );
};

export default JadeBonusesDisplay;