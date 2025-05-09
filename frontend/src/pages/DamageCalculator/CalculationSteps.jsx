// src/pages/DamageCalculator/CalculationSteps.jsx
const CalculationSteps = ({ steps }) => {
    return (
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
              {steps.map((step, index) => (
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
    );
  };
  
  export default CalculationSteps;