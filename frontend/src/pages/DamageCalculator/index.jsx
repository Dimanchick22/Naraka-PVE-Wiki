// src/pages/DamageCalculator/index.jsx
import { useState, useEffect } from 'react';
import { charactersData } from '../../data/characters';
import { RarityType } from '../../data/rarities';
import { ModifierType } from '../../data/jades';
import { baseStats, damageConstants } from '../../data/baseStats';
import DamageCalculator from '../../utils/DamageCalculator';
import TabbedCalculator from '../../components/calculator/TabbedCalculator';
import CharacterSelect from './CharacterSelect';
import BasicParameters from './BasicParameters';
import PotentialSelection from './PotentialSelection';
import ResultsSection from './ResultsSection';

const DamageCalculatorPage = () => {
  // Состояние калькулятора
  const [character, setCharacter] = useState(null);
  const [consciousness, setConsciousness] = useState(damageConstants.DEFAULT_CONSCIOUSNESS);
  const [heroLevel, setHeroLevel] = useState(20);
  const [selectedJades, setSelectedJades] = useState(Array(6).fill(null));
  const [yinRarity, setYinRarity] = useState(null);
  const [yangRarity, setYangRarity] = useState(null);
  
  // Состояние для пользовательских статов нефритов
  const [customJadeStats, setCustomJadeStats] = useState(
    Array(6).fill(null).map(() => [
      { type: '', value: 0 },
      { type: '', value: 0 },
      { type: '', value: 0 },
      { type: '', value: 0 }
    ])
  );
  
  // Состояние для пользовательских статов диковинок
  const [yinRarityStats, setYinRarityStats] = useState([
    { type: '', value: 0 },
    { type: '', value: 0 },
    { type: '', value: 0 },
    { type: '', value: 0 }
  ]);
  
  const [yangRarityStats, setYangRarityStats] = useState([
    { type: '', value: 0 },
    { type: '', value: 0 },
    { type: '', value: 0 },
    { type: '', value: 0 }
  ]);
  
  // Состояние потенциалов (бывшие таланты)
  const [basePotentials, setBasePotentials] = useState({
    untouchable_talent: false,
    power: false,
    ice_root: false,
    ice_flash: false
  });
  
  const [combatPotentials, setCombatPotentials] = useState({
    aroma_aura: false,
    frost_seal: false,
    tundra_power: false,
    frostbound_lotus: false,
    frost_bloom: false,
    tessa_f: false,
    consciousness_match: false
  });
  
  // Результаты расчетов
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('normal'); // 'normal', 'boss', 'monster'
  const [showDetailedCalc, setShowDetailedCalc] = useState(false);

  // Эффект при изменении персонажа - сброс потенциалов
  useEffect(() => {
    if (character) {
      setBasePotentials({
        untouchable_talent: false,
        power: false,
        ice_root: false,
        ice_flash: false
      });
      
      setCombatPotentials({
        aroma_aura: false,
        frost_seal: false,
        tundra_power: false,
        frostbound_lotus: false,
        frost_bloom: false,
        tessa_f: false,
        consciousness_match: false
      });
      
      setYinRarity(null);
      setYangRarity(null);
    }
  }, [character]);
  
  // Обработчики для обновления пользовательских статов
  const handleJadeStatsChange = (jadeIndex, statIndex, type, value) => {
    const updatedStats = [...customJadeStats];
    if (type !== undefined) updatedStats[jadeIndex][statIndex].type = type;
    if (value !== undefined) updatedStats[jadeIndex][statIndex].value = value;
    setCustomJadeStats(updatedStats);
    
    // Обновляем нефрит с новыми статами
    if (selectedJades[jadeIndex]) {
      const updatedJades = [...selectedJades];
      updatedJades[jadeIndex] = {
        ...selectedJades[jadeIndex],
        customStats: updatedStats[jadeIndex]
      };
      setSelectedJades(updatedJades);
    }
  };
  
  const handleYinRarityStatsChange = (statIndex, type, value) => {
    const updatedStats = [...yinRarityStats];
    if (type !== undefined) updatedStats[statIndex].type = type;
    if (value !== undefined) updatedStats[statIndex].value = value;
    setYinRarityStats(updatedStats);
    
    // Обновляем диковинку с новыми статами
    if (yinRarity) {
      setYinRarity({
        ...yinRarity,
        customStats: updatedStats
      });
    }
  };
  
  const handleYangRarityStatsChange = (statIndex, type, value) => {
    const updatedStats = [...yangRarityStats];
    if (type !== undefined) updatedStats[statIndex].type = type;
    if (value !== undefined) updatedStats[statIndex].value = value;
    setYangRarityStats(updatedStats);
    
    // Обновляем диковинку с новыми статами
    if (yangRarity) {
      setYangRarity({
        ...yangRarity,
        customStats: updatedStats
      });
    }
  };
  
  // Обработчик изменения базового потенциала
  const handleBasePotentialChange = (potentialId) => {
    setBasePotentials(prev => ({
      ...prev,
      [potentialId]: !prev[potentialId]
    }));
  };
  
  // Обработчик изменения боевого потенциала
  const handleCombatPotentialChange = (potentialId) => {
    setCombatPotentials(prev => ({
      ...prev,
      [potentialId]: !prev[potentialId]
    }));
  };
  
  // Обработчик изменения диковинки
  const handleRarityChange = (rarity, type) => {
    if (type === RarityType.YIN) {
      setYinRarity(rarity);
    } else if (type === RarityType.YANG) {
      setYangRarity(rarity);
    }
  };
  
  // Вспомогательная функция для получения отображаемого имени стата
  const getStatDisplayName = (statType) => {
    switch (statType) {
      case 'attack':
        return 'Атака';
      case 'ice_explosion':
        return 'Лед. взрыв';
      case 'boss_attack':
        return 'Атака по боссам';
      case 'monster_attack':
        return 'Атака по монстрам';
      case 'fusion':
        return 'Слияние';
      case '':
        return 'Пусто';
      default:
        return statType;
    }
  };
  
  // Обработчик расчета урона
  const calculateDamage = () => {
    if (!character) {
      alert('Выберите персонажа для расчета');
      return;
    }
    
    // Создание экземпляра калькулятора
    const calculator = new DamageCalculator()
      .setCharacter(character)
      .setConsciousness(consciousness)
      .setHeroLevel(heroLevel);
    
    // Установка базовых потенциалов
    Object.keys(basePotentials).forEach(potentialId => {
      calculator.setBaseTalent(potentialId, basePotentials[potentialId]);
    });
    
    // Установка боевых потенциалов
    Object.keys(combatPotentials).forEach(potentialId => {
      calculator.setCombatTalent(potentialId, combatPotentials[potentialId]);
    });
    
    // Добавление нефритов
    selectedJades.forEach((jade, index) => {
      if (jade) {
        // Создаем копию нефрита с пользовательскими статами
        const jadeWithStats = { ...jade };
        
        // Добавляем пользовательские статы
        const stats = customJadeStats[index].filter(stat => stat.type !== '');
        if (stats.length > 0) {
          // Преобразуем пользовательские статы в формат, понятный калькулятору
          const calculatorStats = stats.map(stat => ({
            id: `custom_${stat.type}_${Math.random()}`,
            name: getStatDisplayName(stat.type),
            type: ModifierType.PERCENTAGE,
            target: stat.type,
            value: stat.value,
            condition: null
          }));
          
          // Добавляем статы к нефриту
          jadeWithStats.stats = [...(jadeWithStats.stats || []), ...calculatorStats];
        }
        
        calculator.addJade(jadeWithStats);
      }
    });
    
    // Установка диковинок с пользовательскими статами
    if (yinRarity) {
      const yinRarityWithStats = { ...yinRarity };
      // Добавляем пользовательские статы для диковинки Инь
      const yinStats = yinRarityStats.filter(stat => stat.type !== '');
      if (yinStats.length > 0) {
        const calculatorStats = yinStats.map(stat => ({
          id: `custom_${stat.type}_${Math.random()}`,
          description: getStatDisplayName(stat.type),
          type: ModifierType.PERCENTAGE,
          target: stat.type,
          value: stat.value
        }));
        
        yinRarityWithStats.effects = [...(yinRarityWithStats.effects || []), ...calculatorStats];
      }
      calculator.setRarity(yinRarityWithStats);
    }
    
    if (yangRarity) {
      const yangRarityWithStats = { ...yangRarity };
      // Добавляем пользовательские статы для диковинки Ян
      const yangStats = yangRarityStats.filter(stat => stat.type !== '');
      if (yangStats.length > 0) {
        const calculatorStats = yangStats.map(stat => ({
          id: `custom_${stat.type}_${Math.random()}`,
          description: getStatDisplayName(stat.type),
          type: ModifierType.PERCENTAGE,
          target: stat.type,
          value: stat.value
        }));
        
        yangRarityWithStats.effects = [...(yangRarityWithStats.effects || []), ...calculatorStats];
      }
      calculator.setRarity(yangRarityWithStats);
    }
    
    // Выполнение расчета
    const calculationResults = calculator.calculate();
    setResults(calculationResults);
    
    // Прокрутка к результатам
    setTimeout(() => {
      const resultsElement = document.getElementById('calculation-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
    <div className="page-container">
      <h1 className="page-title">Калькулятор урона</h1>
      
      <div className="section-description">
        <p>
          Этот калькулятор позволяет рассчитать урон персонажа на основе различных параметров, 
          включая сознание, уровень героя, нефриты, диковинки и активные потенциалы.
        </p>
      </div>
      
      {/* Главная часть с настройками */}
      <div className="calculator-main-layout">
        {/* Левая колонка - настройки персонажа */}
        <div className="calculator-left-column">
          <div className="calculator-form">
            <CharacterSelect
              character={character}
              onCharacterChange={setCharacter}
              characters={charactersData}
            />
            
            <BasicParameters
              consciousness={consciousness}
              heroLevel={heroLevel}
              onConsciousnessChange={setConsciousness}
              onHeroLevelChange={setHeroLevel}
            />
            
            {character && (
              <PotentialSelection
                basePotentials={basePotentials}
                combatPotentials={combatPotentials}
                onBasePotentialChange={handleBasePotentialChange}
                onCombatPotentialChange={handleCombatPotentialChange}
              />
            )}
            
            {/* Кнопка расчета */}
            <div className="form-actions">
              <button 
                className="btn btn-primary"
                onClick={calculateDamage}
                disabled={!character}
              >
                Рассчитать
              </button>
            </div>
          </div>
        </div>
        
        {/* Правая колонка - настройка нефритов и диковинок */}
        <div className="calculator-right-column">
          <TabbedCalculator 
            jades={selectedJades}
            onJadeChange={setSelectedJades}
            yinRarity={yinRarity}
            yangRarity={yangRarity}
            onRarityChange={handleRarityChange}
            character={character}
            // Передаем новые пропсы для статов
            customJadeStats={customJadeStats}
            onJadeStatsChange={handleJadeStatsChange}
            yinRarityStats={yinRarityStats}
            onYinRarityStatsChange={handleYinRarityStatsChange}
            yangRarityStats={yangRarityStats}
            onYangRarityStatsChange={handleYangRarityStatsChange}
          />
        </div>
      </div>
      
      {/* Результаты расчета */}
      {results && (
        <ResultsSection
          results={results}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showDetailedCalc={showDetailedCalc}
          onToggleDetailedCalc={setShowDetailedCalc}
        />
      )}
    </div>
  );
};

export default DamageCalculatorPage;