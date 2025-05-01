// pages/DamageCalculator/index.jsx
import React, { useState } from "react";
import { useCalculator } from "./hooks/useCalculator";
import CalculatorForm from "./components/CalculatorForm";
import JadesGrid from "./components/JadesGrid";
import DamageSummary from "./components/DamageSummary";
import ResultsDisplay from "./components/ResultsDisplay";
import DetailedStats from "./components/DetailedStats";
import DamageCharts from "./components/DamageCharts";
import TabPanel from "./components/TabPanel";
import { generateChartData, generateComparisonData, calculateDamage } from "./utils/calculationUtils";

/**
 * Основной компонент страницы калькулятора урона
 * @returns {JSX.Element} - Элемент компонента
 */
const DamageCalculator = () => {
  // Получаем состояние и функции калькулятора из хука
  const calculator = useCalculator();
  
  // Состояние для управления вкладками дополнительной информации
  const [activeTab, setActiveTab] = useState("results"); // "results", "stats", "charts"
  
  // Данные для графиков
  const [chartData, setChartData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  
  // Обновление данных графиков при изменении результатов
  React.useEffect(() => {
    if (calculator.results) {
      const data = generateChartData(
        calculator.results.finalAttack,
        calculator.results.bossIceExplosionPercent,
        calculator.results.monsterIceExplosionPercent,
        {
          heroLevel: calculator.heroLevel,
          untouchableTalent: calculator.untouchableTalent,
          power: calculator.power,
          aromaAura: calculator.aromaAura,
          frostSeal: calculator.frostSeal,
          tundraPower: calculator.tundraPower,
          frostboundLotus: calculator.frostboundLotus,
          tessaF: calculator.tessaF,
          consciousnessMatch: calculator.consciousnessMatch,
          jadeAttackBonus: calculator.jadeAttackBonus,
          jadeIceExplosionBonus: calculator.jadeIceExplosionBonus,
          iceRoot: calculator.iceRoot,
          iceFlash: calculator.iceFlash,
          frostBloom: calculator.frostBloom
        }
      );
      setChartData(data);
      
      const compData = generateComparisonData(
        calculator.results.iceExplosionDamage,
        calculator.results.bossDamage,
        calculator.results.monsterDamage,
        calculator.results.flowerExplosionDamage,
        calculator.results.bossFlowerDamage,
        calculator.results.monsterFlowerDamage
      );
      setComparisonData(compData);
    }
  }, [calculator.results]);

  // Обработчик изменения бонусов нефритов
  const handleJadeBonusChange = (bonuses) => {
    calculator.setJadeAttackBonus(bonuses.attackBonus);
    calculator.setJadeIceExplosionBonus(bonuses.iceExplosionBonus);
    calculator.setJadeBossAttackBonus(bonuses.bossAttackBonus);
    calculator.setJadeMonsterAttackBonus(bonuses.monsterAttackBonus);
  };

  // Перерасчет при изменении вкладки на вкладку статистики
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // Если переключились на вкладку статистики или графиков, убедимся что данные актуальны
    if ((tabId === "stats" || tabId === "charts") && calculator.results) {
      const { steps } = calculateDamage({
        consciousness: calculator.consciousness,
        heroLevel: calculator.heroLevel,
        untouchableTalent: calculator.untouchableTalent,
        power: calculator.power,
        iceRoot: calculator.iceRoot,
        iceFlash: calculator.iceFlash,
        aromaAura: calculator.aromaAura,
        frostBloom: calculator.frostBloom,
        frostSeal: calculator.frostSeal,
        tundraPower: calculator.tundraPower,
        frostboundLotus: calculator.frostboundLotus,
        tessaF: calculator.tessaF,
        consciousnessMatch: calculator.consciousnessMatch,
        jadeAttackBonus: calculator.jadeAttackBonus,
        jadeIceExplosionBonus: calculator.jadeIceExplosionBonus,
        jadeBossAttackBonus: calculator.jadeBossAttackBonus,
        jadeMonsterAttackBonus: calculator.jadeMonsterAttackBonus,
      });
      
      // Обновляем данные для графиков
      if (tabId === "charts" && calculator.results) {
        const data = generateChartData(
          calculator.results.finalAttack,
          calculator.results.bossIceExplosionPercent || 0,
          calculator.results.monsterIceExplosionPercent || 0,
          {
            heroLevel: calculator.heroLevel,
            untouchableTalent: calculator.untouchableTalent,
            power: calculator.power,
            aromaAura: calculator.aromaAura,
            frostSeal: calculator.frostSeal,
            tundraPower: calculator.tundraPower,
            frostboundLotus: calculator.frostboundLotus,
            tessaF: calculator.tessaF,
            consciousnessMatch: calculator.consciousnessMatch,
            jadeAttackBonus: calculator.jadeAttackBonus,
            jadeIceExplosionBonus: calculator.jadeIceExplosionBonus,
            iceRoot: calculator.iceRoot,
            iceFlash: calculator.iceFlash,
            frostBloom: calculator.frostBloom
          }
        );
        setChartData(data);
        
        const compData = generateComparisonData(
          calculator.results.iceExplosionDamage,
          calculator.results.bossDamage,
          calculator.results.monsterDamage,
          calculator.results.flowerExplosionDamage,
          calculator.results.bossFlowerDamage,
          calculator.results.monsterFlowerDamage
        );
        setComparisonData(compData);
      }
    }
  };

  // Определение вкладок для дополнительной информации
  const tabs = [
    { id: "results", label: "Результаты" },
    { id: "stats", label: "Подробные расчеты" },
    { id: "charts", label: "Графики" }
  ];

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

      {/* Вкладки с результатами и дополнительной информацией */}
      {calculator.results && (
        <div className="calculator-results-section">
          <TabPanel 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
          
          {activeTab === "results" && (
            <ResultsDisplay 
              results={calculator.results} 
              tessaF={calculator.tessaF} 
              consciousnessMatch={calculator.consciousnessMatch} 
            />
          )}
          
          {activeTab === "stats" && (
            <DetailedStats 
              calculationSteps={calculateDamage({
                consciousness: calculator.consciousness,
                heroLevel: calculator.heroLevel,
                untouchableTalent: calculator.untouchableTalent,
                power: calculator.power,
                iceRoot: calculator.iceRoot,
                iceFlash: calculator.iceFlash,
                aromaAura: calculator.aromaAura,
                frostBloom: calculator.frostBloom,
                frostSeal: calculator.frostSeal,
                tundraPower: calculator.tundraPower,
                frostboundLotus: calculator.frostboundLotus,
                tessaF: calculator.tessaF,
                consciousnessMatch: calculator.consciousnessMatch,
                jadeAttackBonus: calculator.jadeAttackBonus,
                jadeIceExplosionBonus: calculator.jadeIceExplosionBonus,
                jadeBossAttackBonus: calculator.jadeBossAttackBonus,
                jadeMonsterAttackBonus: calculator.jadeMonsterAttackBonus,
              }).steps} 
            />
          )}
          
          {activeTab === "charts" && (
            <DamageCharts 
              chartData={chartData} 
              comparisonData={comparisonData} 
            />
          )}
          
          {/* Суммарный урон всегда виден */}
          <DamageSummary results={calculator.results} />
        </div>
      )}
    </div>
  );
};

export default DamageCalculator;