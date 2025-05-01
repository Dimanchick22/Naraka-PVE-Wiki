// pages/DamageCalculator/index.jsx
import React from "react";
import CalculatorForm from "./components/CalculatorForm";
import DamageSummary from "./components/DamageSummary";
import JadesGrid from "./components/JadesGrid";
import { useCalculator } from "./hooks/useCalculator";

/**
 * Основной компонент страницы калькулятора урона (обновленная версия)
 * @returns {JSX.Element} - Элемент компонента
 */
const DamageCalculator = () => {
  // Получаем состояние калькулятора из хука
  const calculator = useCalculator();

  // Обработчик изменения бонусов нефритов
  const handleJadeBonusChange = (bonuses) => {
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
          Этот калькулятор позволяет рассчитать урон на основе параметров персонажа, талантов и нефритов.
          Настройте нефриты и параметры персонажа для расчета итогового урона.
        </p>
      </div>

      <div className="calculator-main-layout">
        {/* Левая колонка - Форма с параметрами */}
        <div className="calculator-left-column">
          <CalculatorForm calculator={calculator} />
        </div>

        {/* Правая колонка - Нефриты */}
        <div className="calculator-right-column">
          {/* Сетка нефритов */}
          <JadesGrid onJadeBonusChange={handleJadeBonusChange} />
        </div>
      </div>

      {/* Итоговый урон (на всю ширину) */}
      {calculator.results && (
        <div className="calculator-results-section">
          <DamageSummary results={calculator.results} />
        </div>
      )}
    </div>
  );
};

export default DamageCalculator;