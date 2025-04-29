import React from "react";

/**
 * Компонент для отображения панели вкладок
 * @param {Object} props - Свойства компонента
 * @param {Array} props.tabs - Массив вкладок с полями { id, label }
 * @param {string} props.activeTab - ID активной вкладки
 * @param {Function} props.onTabChange - Функция для изменения активной вкладки
 * @returns {JSX.Element} - Элемент компонента
 */
const TabPanel = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="calculator-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabPanel;
