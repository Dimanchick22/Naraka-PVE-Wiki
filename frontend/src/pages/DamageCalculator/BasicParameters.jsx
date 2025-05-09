// src/pages/DamageCalculator/BasicParameters.jsx
const BasicParameters = ({
    consciousness,
    heroLevel,
    onConsciousnessChange,
    onHeroLevelChange
  }) => {
    return (
      <div className="form-section">
        <h3 className="section-title">Базовые параметры</h3>
        <div className="form-group">
          <label htmlFor="consciousness">Сознание:</label>
          <input 
            type="number" 
            id="consciousness"
            value={consciousness} 
            onChange={(e) => onConsciousnessChange(Number(e.target.value))} 
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
            onChange={(e) => onHeroLevelChange(Number(e.target.value))} 
            min="1" 
            max="30"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
      </div>
    );
  };
  
  export default BasicParameters;