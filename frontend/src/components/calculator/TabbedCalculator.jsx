// src/components/calculator/TabbedCalculator.jsx (продолжение)
import React, { useState } from 'react';
import JadeGrid from './jade/JadeGrid';
import RaritiesPanel from './rarity/RaritiesPanel';
import { TabType } from '../../utils/constants';

const TabbedCalculator = ({ 
  jades = [], 
  onJadeChange,
  yinRarity,
  yangRarity,
  onRarityChange,
  character,
  customJadeStats,
  onJadeStatsChange,
  yinRarityStats,
  onYinRarityStatsChange,
  yangRarityStats,
  onYangRarityStatsChange
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

      {/* Содержимое вкладки */}
      <div className="tab-content">
        {activeTab === TabType.JADES && (
          <JadeGrid 
            jades={jades}
            onJadeChange={onJadeChange}
            customJadeStats={customJadeStats}
            onJadeStatsChange={onJadeStatsChange}
          />
        )}

        {activeTab === TabType.RARITIES && (
          <RaritiesPanel 
            yinRarity={yinRarity}
            yangRarity={yangRarity}
            onRarityChange={onRarityChange}
            character={character}
            yinRarityStats={yinRarityStats}
            onYinRarityStatsChange={onYinRarityStatsChange}
            yangRarityStats={yangRarityStats}
            onYangRarityStatsChange={onYangRarityStatsChange}
          />
        )}
      </div>
    </div>
  );
};

export default TabbedCalculator;