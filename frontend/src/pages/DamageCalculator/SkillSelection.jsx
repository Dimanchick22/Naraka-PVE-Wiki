// src/pages/DamageCalculator/SkillSelection.jsx
import React from 'react';

const SkillSelection = ({ 
  character, 
  activeSkills,
  onSkillChange
}) => {
  if (!character || !character.skills || character.skills.length === 0) {
    return (
      <div className="form-section">
        <h3 className="section-title">Навыки персонажа</h3>
        <p>У выбранного персонажа нет доступных навыков.</p>
      </div>
    );
  }
  
  return (
    <div className="form-section">
      <h3 className="section-title">Навыки персонажа</h3>
      <div className="skills-grid">
        {character.skills.map(skill => (
          <div key={skill.id} className="form-group checkbox">
            <label className="flex items-start">
              <input 
                type="checkbox" 
                id={`skill-${skill.id}`}
                className="mt-1 mr-2"
                checked={activeSkills[skill.id] || false}
                onChange={() => onSkillChange(skill.id)}
              />
              <span>
                <strong>{skill.name}</strong> ({skill.description})
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSelection;