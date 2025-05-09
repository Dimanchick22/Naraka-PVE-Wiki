// src/pages/DamageCalculator/TalentSelection.jsx
const TalentSelection = ({ 
    character, 
    baseTalents, 
    combatTalents,
    onBaseTalentChange,
    onCombatTalentChange
  }) => {
    if (!character) return null;
    
    return (
      <>
        <div className="form-section">
          <h3 className="section-title">Базовые таланты</h3>
          <div className="talents-grid">
            {character.talents.filter(talent => talent.isBase).map(talent => (
              <div key={talent.id} className="form-group checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    id={talent.id}
                    checked={baseTalents[talent.id] || false}
                    onChange={() => onBaseTalentChange(talent.id)}
                  />
                  {talent.name} ({talent.description})
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-section">
          <h3 className="section-title">Боевые таланты</h3>
          <div className="talents-grid">
            {character.talents.filter(talent => !talent.isBase).map(talent => (
              <div key={talent.id} className="form-group checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    id={talent.id}
                    checked={combatTalents[talent.id] || false}
                    onChange={() => onCombatTalentChange(talent.id)}
                  />
                  {talent.name} ({talent.description})
                </label>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  export default TalentSelection;