import React, { useState } from "react";
import CalculatorForm from "./components/CalculatorForm";
import JadesContainer from "./components/JadesContainer";
import JadeBonusesDisplay from "./components/JadeBonusesDisplay";
import DamageSummary from "./components/DamageSummary";
import { useCalculator } from "./hooks/useCalculator";

// Импорт стилей
import "../../styles/damageCalculator.css";

/**
 * Основной компонент страницы калькулятора урона (переработанная версия)
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

      <div className="new-calculator-layout">
        <div className="left-column">
          {/* Форма ввода параметров */}
          <CalculatorForm calculator={calculator} />

          {/* Отображение бонусов от нефритов */}
          <JadeBonusesDisplay bonuses={jadeBonuses} />

          {/* Итоговый урон */}
          {calculator.results && <DamageSummary results={calculator.results} />}
        </div>

        <div className="right-column">
          {/* Контейнер с нефритами */}
          <JadesContainer onJadeBonusChange={handleJadeBonusChange} />
        </div>
      </div>
    </div>
  );
};

export default DamageCalculator;
