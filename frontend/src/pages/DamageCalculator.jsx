// src/pages/DamageCalculator.jsx
import { useState, useEffect } from 'react';
import { charactersData } from '../data/characters';
import { raritiesData, RarityType } from '../data/rarities';
import DamageCalculator from '../utils/DamageCalculator';
import TabbedCalculator from '../components/calculator/TabbedCalculator';

const DamageCalculatorPage = () => {
  // Состояние калькулятора
  const [character, setCharacter] = useState(null);
  const [consciousness, setConsciousness] = useState(1120);
  const [heroLevel, setHeroLevel] = useState(20);
  const [selectedJades, setSelectedJades] = useState(Array(6).fill(null));
  const [jadeStats, setJadeStats] = useState([
    { type: 'attack', value: 0 },
    { type: 'ice_explosion', value: 0 },
    { type: 'boss_attack', value: 0 },
    { type: 'monster_attack', value: 0 }
  ]);
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
  const [showDetailedCalc, setShowDetailedCalc] = useState(false); // Скрываем подробный расчет изначально
  
  // Эффект при изменении персонажа - сброс талантов
  useEffect(() => {
    if (character) {
      // Сброс талантов при смене персонажа
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
      
      // Также сбрасываем выбранные диковинки
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
    
    // Добавление дополнительных статов
    jadeStats.forEach(stat => {
      if (stat.value > 0) {
        // Создаем имитацию нефрита с выбранным статом
        const customJade = {
          id: `custom_${stat.type}_${stat.value}`,
          name: `Пользовательский ${stat.type}`,
          type: stat.type,
          stats: [
            {
              id: `custom_stat_${stat.type}`,
              name: stat.type,
              type: 'percentage',
              target: stat.type,
              value: stat.value
            }
          ]
        };
        calculator.addJade(customJade);
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
            {/* Выбор персонажа */}
            <div className="form-section">
              <h3 className="section-title">Выбор персонажа</h3>
              <div className="form-group">
                <label htmlFor="character-select">Персонаж:</label>
                <select 
                  id="character-select"
                  value={character?.id || ''}
                  onChange={(e) => {
                    const selected = charactersData.find(c => c.id === e.target.value);
                    setCharacter(selected || null);
                  }}
                  style={{ width: '100%', padding: '0.5rem' }}
                >
                  <option value="">Выберите персонажа</option>
                  {charactersData.map(char => (
                    <option key={char.id} value={char.id}>{char.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Базовые параметры */}
            <div className="form-section">
              <h3 className="section-title">Базовые параметры</h3>
              <div className="form-group">
                <label htmlFor="consciousness">Сознание:</label>
                <input 
                  type="number" 
                  id="consciousness"
                  value={consciousness} 
                  onChange={(e) => setConsciousness(Number(e.target.value))} 
                  min="0"
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hero-level">Уровень героя:</label>
                <input 
                  type="number" 
                  id="hero-level"
                  value={heroLevel} 
                  onChange={(e) => setHeroLevel(Number(e.target.value))} 
                  min="1" 
                  max="30"
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
            </div>
            
            {/* Базовые таланты */}
            {character && (
              <div className="form-section">
                <h3 className="section-title">Базовые таланты</h3>
                <div className="talents-grid">
                  {character.talents.filter(talent => talent.isBase).map(talent => (
                    <div key={talent.id} className="form-group checkbox">
                      <label>
                        <input 
                          type="checkbox" 
                          id={talent.id}
                          checked={baseTalents[talent.id] || false}
                          onChange={() => handleBaseTalentChange(talent.id)}
                        />
                        {talent.name} ({talent.description})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Боевые таланты */}
            {character && (
              <div className="form-section">
                <h3 className="section-title">Боевые таланты</h3>
                <div className="talents-grid">
                  {character.talents.filter(talent => !talent.isBase).map(talent => (
                    <div key={talent.id} className="form-group checkbox">
                      <label>
                        <input 
                          type="checkbox" 
                          id={talent.id}
                          checked={combatTalents[talent.id] || false}
                          onChange={() => handleCombatTalentChange(talent.id)}
                        />
                        {talent.name} ({talent.description})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
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
            jadeStats={jadeStats}
            onJadeStatsChange={setJadeStats}
            yinRarity={yinRarity}
            yangRarity={yangRarity}
            onRarityChange={handleRarityChange}
            character={character}
          />
        </div>
      </div>
      
      {/* Результаты расчета - отображаются под настройками */}
      {results && (
        <div id="calculation-results" className="calculator-results">
          <div className="damage-summary">
            <h3 className="summary-title">Результаты расчета</h3>
            
            {/* Вкладки для переключения между типами урона */}
            <div className="calculator-tabs">
              <button 
                className={`tab-button ${activeTab === 'normal' ? 'active' : ''}`}
                onClick={() => setActiveTab('normal')}
              >
                Обычный урон
              </button>
              <button 
                className={`tab-button ${activeTab === 'boss' ? 'active' : ''}`}
                onClick={() => setActiveTab('boss')}
              >
                Урон по боссам
              </button>
              <button 
                className={`tab-button ${activeTab === 'monster' ? 'active' : ''}`}
                onClick={() => setActiveTab('monster')}
              >
                Урон по монстрам
              </button>
            </div>
            
            {/* Вкладка с обычным уроном */}
            {activeTab === 'normal' && (
              <div className="tab-content">
                <div className="summary-blocks">
                  <div className="summary-block">
                    <h4 className="summary-title">Базовые характеристики</h4>
                    <div className="summary-item">
                      <span className="summary-label">Базовая атака:</span>
                      <span className="summary-value">{Math.round(results.baseAttack)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Финальная атака:</span>
                      <span className="summary-value highlight">{Math.round(results.finalAttack)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Базовый % лед. взрыва:</span>
                      <span className="summary-value">{Math.round(results.iceExplosionPercent * 100)}%</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Финальный % лед. взрыва:</span>
                      <span className="summary-value highlight">{Math.round(results.finalIceExplosionPercent * 100)}%</span>
                    </div>
                  </div>
                  
                  <div className="summary-block">
                    <h4 className="summary-title">Урон по обычным целям</h4>
                    <div className="summary-item">
                      <span className="summary-label">Физический урон:</span>
                      <span className="summary-value">{Math.round(results.physicalDamage)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Урон лед. взрыва:</span>
                      <span className="summary-value">{Math.round(results.iceExplosionDamage)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Урон цветочного взрыва:</span>
                      <span className="summary-value">{Math.round(results.flowerExplosionDamage)}</span>
                    </div>
                  </div>
                  
                  <div className="summary-block">
                    <h4 className="summary-title">Урон от последовательности нефрита</h4>
                    <div className="summary-item">
                      <span className="summary-label">Первый взрыв:</span>
                      <span className="summary-value">{results.jadeFirstBlastDamage}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Второй взрыв:</span>
                      <span className="summary-value">{results.jadeSecondBlastDamage}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Третий взрыв:</span>
                      <span className="summary-value">{results.jadeThirdBlastDamage}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Общий урон:</span>
                      <span className="summary-value highlight">{results.jadeTotalBlastDamage}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Вкладка с уроном по боссам */}
            {activeTab === 'boss' && (
              <div className="tab-content">
                <div className="summary-blocks">
                  <div className="summary-block boss-damage">
                    <h4 className="summary-title">Бонусы против боссов</h4>
                    <div className="summary-item">
                      <span className="summary-label">Бонус атаки по боссам:</span>
                      <span className="summary-value">{Math.round(results.bossAttackPercent * 100)}%</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">% лед. взрыва по боссам:</span>
                      <span className="summary-value highlight">{Math.round(results.bossIceExplosionPercent * 100)}%</span>
                    </div>
                  </div>
                  
                  <div className="summary-block boss-damage">
                    <h4 className="summary-title">Урон по боссам</h4>
                    <div className="summary-item">
                      <span className="summary-label">Физический урон:</span>
                      <span className="summary-value">{Math.round(results.bossPhysicalDamage)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Урон лед. взрыва:</span>
                      <span className="summary-value">{Math.round(results.bossIceExplosionDamage)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Урон цветочного взрыва:</span>
                      <span className="summary-value">{Math.round(results.bossFlowerExplosionDamage)}</span>
                    </div>
                  </div>
                  
                  <div className="summary-block boss-damage">
                    <h4 className="summary-title">Урон нефрита по боссам</h4>
                    <div className="summary-item">
                      <span className="summary-label">Первый взрыв:</span>
                      <span className="summary-value">{results.bossJadeFirstBlastDamage}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Второй взрыв:</span>
                      <span className="summary-value">{results.bossJadeSecondBlastDamage}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Третий взрыв:</span>
                      <span className="summary-value">{results.bossJadeThirdBlastDamage}</span>
                    </div>
                    <div className="summary-item">
                    <span className="summary-label">Общий урон:</span>
                      <span className="summary-value highlight">{results.bossJadeTotalBlastDamage}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Вкладка с уроном по монстрам */}
            {activeTab === 'monster' && (
              <div className="tab-content">
                <div className="summary-blocks">
                  <div className="summary-block monster-damage">
                    <h4 className="summary-title">Бонусы против монстров</h4>
                    <div className="summary-item">
                      <span className="summary-label">Бонус атаки по монстрам:</span>
                      <span className="summary-value">{Math.round(results.monsterAttackPercent * 100)}%</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">% лед. взрыва по монстрам:</span>
                      <span className="summary-value highlight">{Math.round(results.monsterIceExplosionPercent * 100)}%</span>
                    </div>
                  </div>
                  
                  <div className="summary-block monster-damage">
                    <h4 className="summary-title">Урон по монстрам</h4>
                    <div className="summary-item">
                      <span className="summary-label">Физический урон:</span>
                      <span className="summary-value">{Math.round(results.monsterPhysicalDamage)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Урон лед. взрыва:</span>
                      <span className="summary-value">{Math.round(results.monsterIceExplosionDamage)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Урон цветочного взрыва:</span>
                      <span className="summary-value">{Math.round(results.monsterFlowerExplosionDamage)}</span>
                    </div>
                  </div>
                  
                  <div className="summary-block monster-damage">
                    <h4 className="summary-title">Урон нефрита по монстрам</h4>
                    <div className="summary-item">
                      <span className="summary-label">Первый взрыв:</span>
                      <span className="summary-value">{results.monsterJadeFirstBlastDamage}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Второй взрыв:</span>
                      <span className="summary-value">{results.monsterJadeSecondBlastDamage}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Третий взрыв:</span>
                      <span className="summary-value">{results.monsterJadeThirdBlastDamage}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Общий урон:</span>
                      <span className="summary-value highlight">{results.monsterJadeTotalBlastDamage}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Секция для подробного расчета с возможностью скрытия/показа */}
            <div className="detailed-calc-section">
              <div 
                className="section-toggle" 
                onClick={() => setShowDetailedCalc(!showDetailedCalc)}
              >
                <span>
                  {showDetailedCalc ? 'Скрыть подробный расчет' : 'Показать подробный расчет'}
                  <span>{showDetailedCalc ? '▲' : '▼'}</span>
                </span>
              </div>
              
              {showDetailedCalc && (
                <div className="calculator-results-section">
                  <h3 className="section-title">Подробный расчет</h3>
                  <div className="steps-container">
                    <table className="steps-table">
                      <thead>
                        <tr>
                          <th>Шаг</th>
                          <th>Формула</th>
                          <th>Расчет</th>
                          <th>Результат</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.calculationSteps.map((step, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <td>{step.name}</td>
                            <td>{step.formula}</td>
                            <td>{step.calculation}</td>
                            <td>{step.result}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DamageCalculatorPage;