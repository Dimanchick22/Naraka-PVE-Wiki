// src/pages/DamageCalculator.jsx
import { useState, useEffect } from 'react';
import JadeGrid from '../components/calculator/JadeGrid';
import { charactersData } from '../data/characters';
import { raritiesData, getRarityTypeName, getRarityName } from '../data/rarities';
import DamageCalculator from '../utils/DamageCalculator';

const DamageCalculatorPage = () => {
  // Состояние калькулятора
  const [character, setCharacter] = useState(null);
  const [consciousness, setConsciousness] = useState(1120);
  const [heroLevel, setHeroLevel] = useState(20);
  const [selectedJades, setSelectedJades] = useState(Array(6).fill(null));
  const [selectedRarity, setSelectedRarity] = useState(null);
  
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
    
    // Установка диковинки
    if (selectedRarity) {
      calculator.setRarity(selectedRarity);
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
  
  // Отфильтрованные диковинки для выбранного персонажа
  const filteredRarities = character 
    ? raritiesData.filter(r => !r.for_character || r.for_character === character.name)
    : [];
  
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
      <div className="calculator-main-layout" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {/* Левая колонка - настройки персонажа */}
        <div className="calculator-left-column" style={{ flex: '1', minWidth: '300px' }}>
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
                <div className="talents-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {character.talents.filter(talent => talent.isBase).map(talent => (
                    <div key={talent.id} className="form-group checkbox">
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                          type="checkbox" 
                          id={talent.id}
                          checked={baseTalents[talent.id] || false}
                          onChange={() => handleBaseTalentChange(talent.id)}
                          style={{ marginRight: '0.5rem' }}
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
                <div className="talents-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {character.talents.filter(talent => !talent.isBase).map(talent => (
                    <div key={talent.id} className="form-group checkbox">
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                          type="checkbox" 
                          id={talent.id}
                          checked={combatTalents[talent.id] || false}
                          onChange={() => handleCombatTalentChange(talent.id)}
                          style={{ marginRight: '0.5rem' }}
                        />
                        {talent.name} ({talent.description})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Выбор диковинки */}
            {character && (
              <div className="form-section">
                <h3 className="section-title">Диковинка</h3>
                <div className="form-group">
                  <select
                    value={selectedRarity?.id || ''}
                    onChange={(e) => {
                      const selected = raritiesData.find(r => r.id === e.target.value);
                      setSelectedRarity(selected || null);
                    }}
                    style={{ width: '100%', padding: '0.5rem' }}
                  >
                    <option value="">Нет диковинки</option>
                    {filteredRarities.map(rarity => (
                      <option key={rarity.id} value={rarity.id}>
                        {rarity.name} ({getRarityTypeName(rarity.type)}, {getRarityName(rarity.rarity)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {/* Кнопка расчета */}
            <div className="form-actions" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button 
                className="btn btn-primary"
                onClick={calculateDamage}
                disabled={!character}
                style={{ 
                  background: '#8b0000', 
                  color: 'white', 
                  padding: '0.75rem 2rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  cursor: !character ? 'not-allowed' : 'pointer',
                  opacity: !character ? 0.7 : 1
                }}
              >
                Рассчитать
              </button>
            </div>
          </div>
        </div>
        
        {/* Правая колонка - настройка нефритов */}
        <div className="calculator-right-column" style={{ flex: '1', minWidth: '300px' }}>
          <JadeGrid 
            jades={selectedJades}
            onJadeChange={setSelectedJades}
          />
        </div>
      </div>
      
      {/* Результаты расчета - отображаются под настройками */}
      {results && (
        <div id="calculation-results" className="calculator-results" style={{ marginTop: '3rem' }}>
          <div className="damage-summary" style={{ 
            backgroundColor: 'rgba(26, 26, 26, 0.8)', 
            border: '1px solid #d4af37', 
            borderRadius: '8px', 
            padding: '1.5rem' 
          }}>
            <h3 className="summary-title" style={{ color: '#d4af37', marginBottom: '1.5rem', textAlign: 'center' }}>
              Результаты расчета
            </h3>
            
            {/* Вкладки для переключения между типами урона */}
            <div className="calculator-tabs" style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '1.5rem', 
              gap: '0.5rem' 
            }}>
              <button 
                className={`tab-button ${activeTab === 'normal' ? 'active' : ''}`}
                onClick={() => setActiveTab('normal')}
                style={{ 
                  padding: '0.5rem 1rem', 
                  borderRadius: '4px',
                  backgroundColor: activeTab === 'normal' ? '#8b0000' : 'rgba(0, 0, 0, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Обычный урон
              </button>
              <button 
                className={`tab-button ${activeTab === 'boss' ? 'active' : ''}`}
                onClick={() => setActiveTab('boss')}
                style={{ 
                  padding: '0.5rem 1rem', 
                  borderRadius: '4px',
                  backgroundColor: activeTab === 'boss' ? '#8b0000' : 'rgba(0, 0, 0, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Урон по боссам
              </button>
              <button 
                className={`tab-button ${activeTab === 'monster' ? 'active' : ''}`}
                onClick={() => setActiveTab('monster')}
                style={{ 
                  padding: '0.5rem 1rem', 
                  borderRadius: '4px',
                  backgroundColor: activeTab === 'monster' ? '#8b0000' : 'rgba(0, 0, 0, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Урон по монстрам
              </button>
            </div>
            
            {/* Вкладка с обычным уроном */}
            {activeTab === 'normal' && (
              <div className="tab-content">
                <div className="summary-blocks" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div className="summary-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px', padding: '1.5rem' }}>
                    <h4 className="summary-title" style={{ color: '#d4af37', marginBottom: '1rem' }}>Базовые характеристики</h4>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Базовая атака:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.baseAttack)}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Финальная атака:</span>
                      <span className="summary-value highlight" style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '1.25rem' }}>{Math.round(results.finalAttack)}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Базовый % лед. взрыва:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.iceExplosionPercent * 100)}%</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Финальный % лед. взрыва:</span>
                      <span className="summary-value highlight" style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '1.25rem' }}>{Math.round(results.finalIceExplosionPercent * 100)}%</span>
                    </div>
                  </div>
                  
                  <div className="summary-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px', padding: '1.5rem' }}>
                    <h4 className="summary-title" style={{ color: '#d4af37', marginBottom: '1rem' }}>Урон по обычным целям</h4>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Физический урон:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.physicalDamage)}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Урон лед. взрыва:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.iceExplosionDamage)}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Урон цветочного взрыва:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.flowerExplosionDamage)}</span>
                    </div>
                  </div>
                  
                  <div className="summary-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px', padding: '1.5rem' }}>
                    <h4 className="summary-title" style={{ color: '#d4af37', marginBottom: '1rem' }}>Урон от последовательности нефрита</h4>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Первый взрыв:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{results.jadeFirstBlastDamage}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Второй взрыв:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{results.jadeSecondBlastDamage}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Третий взрыв:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{results.jadeThirdBlastDamage}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Общий урон:</span>
                      <span className="summary-value highlight" style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '1.25rem' }}>{results.jadeTotalBlastDamage}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Вкладка с уроном по боссам */}
            {activeTab === 'boss' && (
              <div className="tab-content">
                <div className="summary-blocks" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div className="summary-block boss-damage" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderRadius: '8px', 
                    padding: '1.5rem',
                    borderLeft: '4px solid #8b0000'
                  }}>
                    <h4 className="summary-title" style={{ color: '#d4af37', marginBottom: '1rem' }}>Бонусы против боссов</h4>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Бонус атаки по боссам:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.bossAttackPercent * 100)}%</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>% лед. взрыва по боссам:</span>
                      <span className="summary-value highlight" style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '1.25rem' }}>{Math.round(results.bossIceExplosionPercent * 100)}%</span>
                    </div>
                  </div>
                  
                  <div className="summary-block boss-damage" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderRadius: '8px', 
                    padding: '1.5rem',
                    borderLeft: '4px solid #8b0000'
                  }}>
                    <h4 className="summary-title" style={{ color: '#d4af37', marginBottom: '1rem' }}>Урон по боссам</h4>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Физический урон:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.bossPhysicalDamage)}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Урон лед. взрыва:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.bossIceExplosionDamage)}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Урон цветочного взрыва:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.bossFlowerExplosionDamage)}</span>
                    </div>
                  </div>
                  
                  <div className="summary-block boss-damage" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderRadius: '8px', 
                    padding: '1.5rem',
                    borderLeft: '4px solid #8b0000'
                  }}>
                    <h4 className="summary-title" style={{ color: '#d4af37', marginBottom: '1rem' }}>Урон нефрита по боссам</h4>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Первый взрыв:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{results.bossJadeFirstBlastDamage}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Второй взрыв:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{results.bossJadeSecondBlastDamage}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Третий взрыв:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{results.bossJadeThirdBlastDamage}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                    <span className="summary-label" style={{ fontWeight: 'bold' }}>Общий урон:</span>
                      <span className="summary-value highlight" style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '1.25rem' }}>{results.bossJadeTotalBlastDamage}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Вкладка с уроном по монстрам */}
            {activeTab === 'monster' && (
              <div className="tab-content">
                <div className="summary-blocks" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div className="summary-block monster-damage" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderRadius: '8px', 
                    padding: '1.5rem',
                    borderLeft: '4px solid #4b0082'
                  }}>
                    <h4 className="summary-title" style={{ color: '#d4af37', marginBottom: '1rem' }}>Бонусы против монстров</h4>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Бонус атаки по монстрам:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.monsterAttackPercent * 100)}%</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>% лед. взрыва по монстрам:</span>
                      <span className="summary-value highlight" style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '1.25rem' }}>{Math.round(results.monsterIceExplosionPercent * 100)}%</span>
                    </div>
                  </div>
                  
                  <div className="summary-block monster-damage" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderRadius: '8px', 
                    padding: '1.5rem',
                    borderLeft: '4px solid #4b0082'
                  }}>
                    <h4 className="summary-title" style={{ color: '#d4af37', marginBottom: '1rem' }}>Урон по монстрам</h4>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Физический урон:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.monsterPhysicalDamage)}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Урон лед. взрыва:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.monsterIceExplosionDamage)}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Урон цветочного взрыва:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round(results.monsterFlowerExplosionDamage)}</span>
                    </div>
                  </div>
                  
                  <div className="summary-block monster-damage" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderRadius: '8px', 
                    padding: '1.5rem',
                    borderLeft: '4px solid #4b0082'
                  }}>
                    <h4 className="summary-title" style={{ color: '#d4af37', marginBottom: '1rem' }}>Урон нефрита по монстрам</h4>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Первый взрыв:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{results.monsterJadeFirstBlastDamage}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Второй взрыв:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{results.monsterJadeSecondBlastDamage}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Третий взрыв:</span>
                      <span className="summary-value" style={{ color: '#d4af37', fontWeight: 'bold' }}>{results.monsterJadeThirdBlastDamage}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.75rem' }}>
                      <span className="summary-label" style={{ fontWeight: 'bold' }}>Общий урон:</span>
                      <span className="summary-value highlight" style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '1.25rem' }}>{results.monsterJadeTotalBlastDamage}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Секция для подробного расчета с возможностью скрытия/показа */}
            <div className="detailed-calc-section" style={{ marginTop: '2rem' }}>
              <div 
                className="section-toggle" 
                onClick={() => setShowDetailedCalc(!showDetailedCalc)}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '4px',
                  marginBottom: showDetailedCalc ? '1rem' : 0
                }}
              >
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d4af37',
                  fontWeight: 'bold'
                }}>
                  {showDetailedCalc ? 'Скрыть подробный расчет' : 'Показать подробный расчет'}
                  <span style={{ marginLeft: '0.5rem' }}>{showDetailedCalc ? '▲' : '▼'}</span>
                </span>
              </div>
              
              {showDetailedCalc && (
                <div className="calculator-results-section">
                  <h3 className="section-title" style={{ color: '#d4af37', marginBottom: '1rem' }}>Подробный расчет</h3>
                  <div className="steps-container" style={{ overflowX: 'auto' }}>
                    <table className="steps-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ backgroundColor: 'rgba(139, 0, 0, 0.3)', padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.3)' }}>Шаг</th>
                          <th style={{ backgroundColor: 'rgba(139, 0, 0, 0.3)', padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.3)' }}>Формула</th>
                          <th style={{ backgroundColor: 'rgba(139, 0, 0, 0.3)', padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.3)' }}>Расчет</th>
                          <th style={{ backgroundColor: 'rgba(139, 0, 0, 0.3)', padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.3)' }}>Результат</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.calculationSteps.map((step, index) => (
                          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.2)' }}>
                            <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>{step.name}</td>
                            <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>{step.formula}</td>
                            <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>{step.calculation}</td>
                            <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>{step.result}</td>
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