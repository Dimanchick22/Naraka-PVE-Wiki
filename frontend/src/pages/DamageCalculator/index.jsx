// pages/DamageCalculator/index.jsx
import React from "react";
import { useCalculator } from "./hooks/useCalculator";
import CalculatorForm from "./components/CalculatorForm";
import JadesGrid from "./components/JadesGrid";
import DamageSummary from "./components/DamageSummary";

/**
 * Основной компонент страницы калькулятора урона (только с итоговым уроном)
 * @returns {JSX.Element} - Элемент компонента
 */
const DamageCalculator = () => {
  // Получаем состояние и функции калькулятора из хука
  const calculator = useCalculator();
  
  // Обработчик изменения бонусов нефритов
  const handleJadeBonusChange = (bonuses) => {
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
          Этот калькулятор позволяет рассчитать урон персонажа на основе параметров, талантов и нефритов.
          Настройте нефриты и параметры для расчета итогового урона по разным типам врагов.
        </p>
      </div>

      <div className="calculator-main-layout">
        {/* Левая колонка - Форма с параметрами */}
        <div className="calculator-left-column">
          <CalculatorForm calculator={calculator} />
        </div>

        {/* Правая колонка - Нефриты */}
        <div className="calculator-right-column">
          <JadesGrid onJadeBonusChange={handleJadeBonusChange} />
        </div>
      </div>

      {/* Только итоговый урон */}
      {calculator.results && (
        <div className="calculator-results-section">
          <DamageSummary results={calculator.results} />
        </div>
      )}
    </div>
  );
};

export default DamageCalculator;