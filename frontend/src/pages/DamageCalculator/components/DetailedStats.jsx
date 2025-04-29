import React from "react";
import { FORMULAS } from "../constants";

/**
 * Компонент для отображения подробных расчетов
 * @param {Object} props - Свойства компонента
 * @param {Array} props.calculationSteps - Шаги расчета
 * @returns {JSX.Element} - Элемент компонента
 */
const DetailedStats = ({ calculationSteps }) => {
  return (
    <div className="stats-container">
      <h2 className="section-title">Подробные расчеты</h2>

      {calculationSteps.length > 0 ? (
        <div className="calculation-steps">
          <table className="steps-table">
            <thead>
              <tr>
                <th>Параметр</th>
                <th>Значение</th>
              </tr>
            </thead>
            <tbody>
              {calculationSteps.map((step, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{step.title}</td>
                  <td>{step.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data-message">
          <p>
            Выполните расчет на вкладке "Калькулятор", чтобы увидеть
            подробности.
          </p>
        </div>
      )}

      <div className="formula-section">
        <h3>Основные формулы расчета</h3>
        {FORMULAS.map((formula, index) => (
          <div key={index} className="formula-card">
            <h4>{formula.title}</h4>
            <p className="formula">{formula.formula}</p>
            {formula.explanation && (
              <p className="formula-explanation">{formula.explanation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedStats;
