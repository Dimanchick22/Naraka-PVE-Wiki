// src/components/calculator/TabbedCalculator.jsx
import { useState } from 'react';
import JadeGrid from './JadeGrid';
import JadeStats from './JadeStats';
import RaritiesPanel from './RaritiesPanel';
import { TabType } from '../../utils/constants';

/**
 * Компонент с вкладками для калькулятора урона
 * @param {Object} props - Свойства компонента
 * @param {Array} props.jades - Массив с выбранными нефритами
 * @param {Function} props.onJadeChange - Функция обработки изменения нефрита
 * @param {Array} props.jadeStats - Массив с кастомными статами нефритов
 * @param {Function} props.onJadeStatsChange - Функция обработки изменения статов нефрита
 * @param {Object} props.yinRarity - Выбранная диковинка типа Инь
 * @param {Object} props.yangRarity - Выбранная диковинка типа Ян
 * @param {Function} props.onRarityChange - Функция обработки изменения диковинки
 * @param {Object} props.character - Выбранный персонаж
 * @returns {JSX.Element} - React компонент
 */
const TabbedCalculator = ({ 
  jades = [], 
  onJadeChange,
  jadeStats = [],
  onJadeStatsChange,
  yinRarity,
  yangRarity,
  onRarityChange,
  character 
}) => {
  // Активная вкладка (JADES или RARITIES)
  const [activeTab, setActiveTab] = useState(TabType.JADES);

  return (
    <div className="calculator-tabbed-container">
      {/* Переключатель вкладок */}
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === TabType.JADES ? 'active' : ''}`}
          onClick={() => setActiveTab(TabType.JADES)}
        >
          Нефриты
        </button>
        <button
          className={`tab-button ${activeTab === TabType.RARITIES ? 'active' : ''}`}
          onClick={() => setActiveTab(TabType.RARITIES)}
        >
          Диковинки
        </button>
      </div>

      {/* Содержимое вкладки "Нефриты" */}
      {activeTab === TabType.JADES && (
        <div className="tab-content">
          <div className="jades-container">
            <div className="jades-stats-panel">
              <JadeStats 
                jadeStats={jadeStats}
                onJadeStatsChange={onJadeStatsChange}
              />
            </div>
            <div className="jades-grid-panel">
              <JadeGrid 
                jades={jades}
                onJadeChange={onJadeChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Содержимое вкладки "Диковинки" */}
      {activeTab === TabType.RARITIES && (
        <div className="tab-content">
          <RaritiesPanel 
            yinRarity={yinRarity}
            yangRarity={yangRarity}
            onRarityChange={onRarityChange}
            character={character}
          />
        </div>
      )}
    </div>
  );
};

export default TabbedCalculator;