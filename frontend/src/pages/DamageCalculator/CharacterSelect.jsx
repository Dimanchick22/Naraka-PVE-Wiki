// src/pages/DamageCalculator/CharacterSelect.jsx
const CharacterSelect = ({ character, onCharacterChange, characters }) => {
    return (
      <div className="form-section">
        <h3 className="section-title">Выбор персонажа</h3>
        <div className="form-group">
          <label htmlFor="character-select">Персонаж:</label>
          <select 
            id="character-select"
            value={character?.id || ''}
            onChange={(e) => {
              const selected = characters.find(c => c.id === e.target.value);
              onCharacterChange(selected || null);
            }}
            style={{ width: '100%', padding: '0.5rem' }}
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