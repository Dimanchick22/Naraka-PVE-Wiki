// src/pages/DamageCalculator/ResultsSection.jsx (обновленная версия)
import React from 'react';
import CalculationSteps from './CalculationSteps';

const ResultsSection = ({ 
  results, 
  activeTab, 
  onTabChange, 
  showDetailedCalc, 
  onToggleDetailedCalc 
}) => {
  if (!results) return null;
  
  return (
    <div id="calculation-results" className="calculator-results">
      <div className="damage-summary">
        <h3 className="summary-title">Результаты расчета</h3>
        
        {/* Вкладки для переключения между типами урона */}
        <div className="calculator-tabs">
          <button 
            className={`tab-button ${activeTab === 'normal' ? 'active' : ''}`}
            onClick={() => onTabChange('normal')}
          >
            Обычный урон
          </button>
          <button 
            className={`tab-button ${activeTab === 'boss' ? 'active' : ''}`}
            onClick={() => onTabChange('boss')}
          >
            Урон по боссам
          </button>
          <button 
            className={`tab-button ${activeTab === 'monster' ? 'active' : ''}`}
            onClick={() => onTabChange('monster')}
          >
            Урон по монстрам
          </button>
        </div>
        
        {/* Контент вкладок */}
        <div className="tab-content">
          {activeTab === 'normal' && <NormalDamageTab results={results} />}
          {activeTab === 'boss' && <BossDamageTab results={results} />}
          {activeTab === 'monster' && <MonsterDamageTab results={results} />}
        </div>
        
        {/* Секция для подробного расчета */}
        <div className="detailed-calc-section">
          <div 
            className="section-toggle" 
            onClick={() => onToggleDetailedCalc(!showDetailedCalc)}
          >
            <span>
              {showDetailedCalc ? 'Скрыть подробный расчет' : 'Показать подробный расчет'}
            </span>
            <span className="ml-2">{showDetailedCalc ? '▲' : '▼'}</span>
          </div>
          
          {showDetailedCalc && <CalculationSteps steps={results.calculationSteps} />}
        </div>
      </div>
    </div>
  );
};

// Подкомпоненты для вкладок
const NormalDamageTab = ({ results }) => (
  <div className="summary-blocks">
    <div className="summary-block">
      <h4 className="summary-title">Базовые характеристики</h4>
      <div className="summary-item">
        <span className="summary-label">Атака:</span>
        <span className="summary-value highlight">{Math.round(results.attack)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Базовый % лед. взрыва:</span>
        <span className="summary-value highlight">{Math.round(results.iceExplosionPercent * 100)}%</span>
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
);

const BossDamageTab = ({ results }) => (
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
);

const MonsterDamageTab = ({ results }) => (
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
);

export default ResultsSection;