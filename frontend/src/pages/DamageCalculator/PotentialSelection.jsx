// src/pages/DamageCalculator/PotentialSelection.jsx
import React from 'react';
import { potentialsData, PotentialType } from '../../data/potentials';

const PotentialSelection = ({ 
  basePotentials, 
  combatPotentials,
  onBasePotentialChange,
  onCombatPotentialChange
}) => {
  // Получаем все доступные потенциалы
  const allBasePotentials = potentialsData.filter(potential => potential.type === PotentialType.BASE);
  const allCombatPotentials = potentialsData.filter(potential => potential.type === PotentialType.COMBAT);
  
  return (
    <>
      <div className="form-section">
        <h3 className="section-title">Базовые потенциалы</h3>
        <div className="potentials-grid">
          {allBasePotentials.map(potential => (
            <div key={potential.id} className="form-group checkbox">
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  id={potential.id}
                  className="mt-1 mr-2"
                  checked={basePotentials[potential.id] || false}
                  onChange={() => onBasePotentialChange(potential.id)}
                />
                <span>
                  <strong>{potential.name}</strong> ({potential.description})
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="section-title">Боевые потенциалы</h3>
        <div className="potentials-grid">
          {allCombatPotentials.map(potential => (
            <div key={potential.id} className="form-group checkbox">
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  id={potential.id}
                  className="mt-1 mr-2"
                  checked={combatPotentials[potential.id] || false}
                  onChange={() => onCombatPotentialChange(potential.id)}
                />
                <span>
                  <strong>{potential.name}</strong> ({potential.description})
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PotentialSelection;