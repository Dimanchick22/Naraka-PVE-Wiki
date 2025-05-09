// src/components/calculator/TabbedCalculator.jsx
import { useState } from 'react';
import JadeGrid from './jade/JadeGrid';
import RaritiesPanel from './rarity/RaritiesPanel';
import { TabType } from '../../utils/constants';

/**
 * Обновленный компонент с вкладками для калькулятора урона
 * @param {Object} props - Свойства компонента
 * @param {Array} props.jades - Массив с выбранными нефритами
 * @param {Function} props.onJadeChange - Функция обработки изменения нефрита
 * @param {Object} props.yinRarity - Выбранная диковинка типа Инь
 * @param {Object} props.yangRarity - Выбранная диковинка типа Ян
 * @param {Function} props.onRarityChange - Функция обработки изменения диковинки
 * @param {Object} props.character - Выбранный персонаж
 * @param {Array} props.customJadeStats - Пользовательские статы нефритов
 * @param {Function} props.onJadeStatsChange - Функция изменения статов нефритов
 * @param {Array} props.yinRarityStats - Статы диковинки типа Инь
 * @param {Function} props.onYinRarityStatsChange - Функция изменения статов диковинки Инь
 * @param {Array} props.yangRarityStats - Статы диковинки типа Ян
 * @param {Function} props.onYangRarityStatsChange - Функция изменения статов диковинки Ян
 * @returns {JSX.Element} - React компонент
 */
const TabbedCalculator = ({ 
  jades = [], 
  onJadeChange,
  yinRarity,
  yangRarity,
  onRarityChange,
  character,
  // Новые пропсы для статов
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

      {/* Содержимое вкладки "Нефриты" */}
      {activeTab === TabType.JADES && (
        <div className="tab-content">
          <JadeGrid 
            jades={jades}
            onJadeChange={onJadeChange}
            customJadeStats={customJadeStats}
            onJadeStatsChange={onJadeStatsChange}
          />
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
            yinRarityStats={yinRarityStats}
            onYinRarityStatsChange={onYinRarityStatsChange}
            yangRarityStats={yangRarityStats}
            onYangRarityStatsChange={onYangRarityStatsChange}
          />
        </div>
      )}
    </div>
  );
};

export default TabbedCalculator;