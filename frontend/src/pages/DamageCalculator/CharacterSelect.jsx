// src/pages/DamageCalculator/CharacterSelect.jsx
import React from 'react';

const CharacterSelect = ({ character, onCharacterChange, characters }) => {
  return (
    <div className="form-section">
      <h3 className="section-title">Выбор персонажа</h3>
      
      <div className="form-group">
        <label htmlFor="character-select">Персонаж:</label>
        <select 
          id="character-select"
          className="form-control"
          value={character?.id || ''}
          onChange={(e) => {
            const selected = characters.find(c => c.id === e.target.value);
            onCharacterChange(selected || null);
          }}
        >
          <option value="">Выберите персонажа</option>
          {characters.map(char => (
            <option key={char.id} value={char.id}>{char.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CharacterSelect;