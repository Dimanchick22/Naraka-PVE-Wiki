// src/pages/DamageCalculator/BasicParameters.jsx
import React from 'react';

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
          className="form-control"
          value={consciousness} 
          onChange={(e) => onConsciousnessChange(Number(e.target.value))} 
          min="0"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="hero-level">Уровень героя:</label>
        <input 
          type="number" 
          id="hero-level"
          className="form-control"
          value={heroLevel} 
          onChange={(e) => onHeroLevelChange(Number(e.target.value))} 
          min="1" 
          max="30"
        />
      </div>
    </div>
  );
};

export default BasicParameters;