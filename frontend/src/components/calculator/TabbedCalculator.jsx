// src/components/calculator/TabbedCalculator.jsx
import { useState } from 'react';
import JadeGrid from './JadeGrid';
import RaritiesPanel from './RaritiesPanel';
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
 * @returns {JSX.Element} - React компонент
 */
const TabbedCalculator = ({ 
  jades = [], 
  onJadeChange,
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
          <JadeGrid 
            jades={jades}
            onJadeChange={onJadeChange}
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
          />
        </div>
      )}
    </div>
  );
};

export default TabbedCalculator;