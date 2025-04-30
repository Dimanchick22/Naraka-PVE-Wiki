// pages/DamageCalculator/index.jsx
import React, { useState } from "react";
import CalculatorForm from "./components/CalculatorForm";
import JadesContainer from "./components/JadesContainer";
import DamageSummary from "./components/DamageSummary";
import { useCalculator } from "./hooks/useCalculator";

// Импорт стилей
import "../../styles/damageCalculator.css";

/**
 * Основной компонент страницы калькулятора урона (исправленная версия)
 * @returns {JSX.Element} - Элемент компонента
 */
const DamageCalculator = () => {
  // Получаем состояние калькулятора из хука
  const calculator = useCalculator();

  // Состояние для хранения бонусов нефритов
  const [jadeBonuses, setJadeBonuses] = useState({
    attackBonus: 0,
    iceExplosionBonus: 0,
    bossAttackBonus: 0,
    monsterAttackBonus: 0,
  });

  // Обработчик изменения бонусов нефритов
  const handleJadeBonusChange = (bonuses) => {
    setJadeBonuses(bonuses);

    // Обновляем значения в калькуляторе
    calculator.setJadeAttackBonus(bonuses.attackBonus);
    calculator.setJadeIceExplosionBonus(bonuses.iceExplosionBonus);
    calculator.setJadeBossAttackBonus(bonuses.bossAttackBonus);
    calculator.setJadeMonsterAttackBonus(bonuses.monsterAttackBonus);
  };

  return (
    <div className="page-container calculator-page">
      <h1 className="page-title">Калькулятор урона</h1>

      <div className="section-description">
        <p>
          Этот калькулятор позволяет рассчитать урон на основе параметров
          персонажа, талантов и нефритов. Настройте нефриты справа и параметры
          персонажа слева для расчета итогового урона.
        </p>
      </div>

      <div className="calculator-layout">
        <div className="left-column">
          {/* Форма ввода параметров */}
          <CalculatorForm calculator={calculator} />
        </div>

        <div className="right-column">
          {/* Контейнер с нефритами */}
          <JadesContainer onJadeBonusChange={handleJadeBonusChange} />

          {/* Отображение текущих бонусов от нефритов */}
          <div className="jade-bonuses">
            <h2 className="section-title">Бонусы от нефритов</h2>
            <div className="bonuses-grid">
              <div className="bonus-item">
                <div className="bonus-label">Бонус атаки:</div>
                <div className="bonus-value">
                  {(jadeBonuses.attackBonus * 100).toFixed(2)}%
                </div>
              </div>
              <div className="bonus-item">
                <div className="bonus-label">Бонус ледяного взрыва:</div>
                <div className="bonus-value">
                  {(jadeBonuses.iceExplosionBonus * 100).toFixed(2)}%
                </div>
              </div>
              <div className="bonus-item">
                <div className="bonus-label">Бонус атаки по боссам:</div>
                <div className="bonus-value">
                  {(jadeBonuses.bossAttackBonus * 100).toFixed(2)}%
                </div>
              </div>
              <div className="bonus-item">
                <div className="bonus-label">Бонус атаки по монстрам:</div>
                <div className="bonus-value">
                  {(jadeBonuses.monsterAttackBonus * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Итоговый урон (на всю ширину, 2 колонки) */}
      {calculator.results && (
        <div className="full-width-damage-summary">
          <DamageSummary results={calculator.results} />
        </div>
      )}
    </div>
  );
};

export default DamageCalculator;
