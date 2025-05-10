// src/pages/DamageCalculator/PotentialSelection.jsx
import { getBasePotentials, getCombatPotentials } from '../../data/potentials';

const PotentialSelection = ({ 
  basePotentials, 
  combatPotentials,
  onBasePotentialChange,
  onCombatPotentialChange
}) => {
  // Получаем все доступные потенциалы
  const allBasePotentials = getBasePotentials();
  const allCombatPotentials = getCombatPotentials();
  
  return (
    <>
      <div className="form-section">
        <h3 className="section-title">Базовые потенциалы</h3>
        <div className="potentials-grid">
          {allBasePotentials.map(potential => (
            <div key={potential.id} className="form-group checkbox">
              <label>
                <input 
                  type="checkbox" 
                  id={potential.id}
                  checked={basePotentials[potential.id] || false}
                  onChange={() => onBasePotentialChange(potential.id)}
                />
                {potential.name} ({potential.description})
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
              <label>
                <input 
                  type="checkbox" 
                  id={potential.id}
                  checked={combatPotentials[potential.id] || false}
                  onChange={() => onCombatPotentialChange(potential.id)}
                />
                {potential.name} ({potential.description})
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PotentialSelection;