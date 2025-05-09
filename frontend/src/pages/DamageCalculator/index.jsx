// src/pages/DamageCalculator/index.jsx
import { useState, useEffect } from 'react';
import { charactersData } from '../../data/characters';
import { RarityType } from '../../data/rarities';
import DamageCalculator from '../../utils/DamageCalculator';
import TabbedCalculator from '../../components/calculator/TabbedCalculator';
import CharacterSelect from './CharacterSelect';
import BasicParameters from './BasicParameters';
import TalentSelection from './TalentSelection';
import ResultsSection from './ResultsSection';

const DamageCalculatorPage = () => {
  // Состояние калькулятора
  const [character, setCharacter] = useState(null);
  const [consciousness, setConsciousness] = useState(1120);
  const [heroLevel, setHeroLevel] = useState(20);
  const [selectedJades, setSelectedJades] = useState(Array(6).fill(null));
  const [yinRarity, setYinRarity] = useState(null);
  const [yangRarity, setYangRarity] = useState(null);
  
  // Состояние талантов
  const [baseTalents, setBaseTalents] = useState({
    untouchable_talent: false,
    power: false,
    ice_root: false,
    ice_flash: false
  });
  
  const [combatTalents, setCombatTalents] = useState({
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

  // Эффект при изменении персонажа - сброс талантов
  useEffect(() => {
    if (character) {
      setBaseTalents({
        untouchable_talent: false,
        power: false,
        ice_root: false,
        ice_flash: false
      });
      
      setCombatTalents({
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
  
  // Обработчик изменения базового таланта
  const handleBaseTalentChange = (talentId) => {
    setBaseTalents(prev => ({
      ...prev,
      [talentId]: !prev[talentId]
    }));
  };
  
  // Обработчик изменения боевого таланта
  const handleCombatTalentChange = (talentId) => {
    setCombatTalents(prev => ({
      ...prev,
      [talentId]: !prev[talentId]
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
    
    // Установка базовых талантов
    Object.keys(baseTalents).forEach(talentId => {
      calculator.setBaseTalent(talentId, baseTalents[talentId]);
    });
    
    // Установка боевых талантов
    Object.keys(combatTalents).forEach(talentId => {
      calculator.setCombatTalent(talentId, combatTalents[talentId]);
    });
    
    // Добавление нефритов
    selectedJades.forEach(jade => {
      if (jade) {
        calculator.addJade(jade);
      }
    });
    
    // Установка диковинок
    if (yinRarity) {
      calculator.setRarity(yinRarity);
    }
    
    if (yangRarity) {
      calculator.setRarity(yangRarity);
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
          включая сознание, уровень героя, нефриты, диковинки и активные таланты.
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
              <TalentSelection
                character={character}
                baseTalents={baseTalents}
                combatTalents={combatTalents}
                onBaseTalentChange={handleBaseTalentChange}
                onCombatTalentChange={handleCombatTalentChange}
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