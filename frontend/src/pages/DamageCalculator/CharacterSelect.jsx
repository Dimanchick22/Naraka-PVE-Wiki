// src/pages/DamageCalculator/CharacterSelect.jsx
import React from 'react';
import CustomSelect from '../../components/common/CustomSelect';

const CharacterSelect = ({ character, onCharacterChange, characters }) => {
  // Подготовка опций для CustomSelect
  const emptyOption = { id: '', name: 'Выберите персонажа' };
  
  // Преобразуем массив персонажей в формат для CustomSelect
  const characterOptions = characters.map(char => ({
    id: char.id,
    name: char.name
  }));
  
  // Объединяем все опции
  const options = [emptyOption, ...characterOptions];
  
  return (
    <div className="form-section">
      <h3 className="section-title">Выбор персонажа</h3>
      
      <div className="form-group">
        <label htmlFor="character-select">Персонаж:</label>
        <CustomSelect 
          options={options}
          value={character?.id || ''}
          onChange={(selectedId) => {
            const selected = characters.find(c => c.id === selectedId);
            onCharacterChange(selected || null);
          }}
          placeholder="Выберите персонажа"
        />
      </div>
    </div>
  );
};

export default CharacterSelect;