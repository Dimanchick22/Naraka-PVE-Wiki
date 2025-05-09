// src/components/calculator/rarity/RarityEditor.jsx
import { raritiesData } from '../../../data/rarities';
import RarityStatRow from './RarityStatRow';

const RarityEditor = ({
  type,
  rarity,
  stats,
  character,
  onRarityChange,
  onStatTypeChange,
  onStatValueChange,
  onClose
}) => {
  // Получаем доступные диковинки для персонажа
  const getAvailableRarities = (rarityType) => {
    return raritiesData.filter(r => 
      r.type === rarityType && 
      (
        !r.for_character || 
        r.for_character === character.name ||
        r.name === "Чаша увядшей славы" // Чаша увядшей славы доступна для всех
      )
    );
  };

  // Доступные диковинки для выбранного типа
  const availableRarities = getAvailableRarities(type);

  return (
    <div className="rarity-edit-panel">
      <h4 className="rarity-edit-title">
        Настройка диковинки {type === 'yin' ? 'Инь' : 'Ян'}
      </h4>

      <div className="rarity-selection" style={{ marginBottom: '1rem' }}>
        <label style={{ marginBottom: '0.5rem', display: 'block' }}>
          Выберите диковинку:
        </label>
        <select
          className="rarity-select"
          value={rarity?.id || ''}
          onChange={(e) => onRarityChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: 'rgba(26, 26, 26, 0.8)',
            color: 'var(--naraka-light)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '4px'
          }}
        >
          <option value="">Без диковинки</option>
          <optgroup label="Мифические">
            {availableRarities.filter(r => r.rarity === 'mythic').map(r => (
              <option key={r.id} value={r.id}>
                {r.name} (Мифический)
              </option>
            ))}
          </optgroup>
          <optgroup label="Легендарные">
            {availableRarities.filter(r => r.rarity === 'legendary').map(r => (
              <option key={r.id} value={r.id}>
                {r.name} (Легендарный)
              </option>
            ))}
          </optgroup>
          <optgroup label="Эпические">
            {availableRarities.filter(r => r.rarity === 'epic').map(r => (
              <option key={r.id} value={r.id}>
                {r.name} (Эпический)
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Настройка статов диковинки */}
      {rarity && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '0.75rem' 
          }}>
            <h5 style={{ margin: 0 }}>Статы диковинки</h5>
          </div>
          
          <div className="rarity-stats-list">
            {stats.map((stat, statIndex) => (
              <RarityStatRow
                key={statIndex}
                stat={stat}
                statIndex={statIndex}
                onTypeChange={(type) => onStatTypeChange(statIndex, type)}
                onValueChange={(value) => onStatValueChange(statIndex, value)}
              />
            ))}
          </div>
          
          {/* Описание диковинки */}
          <div className="rarity-description" style={{ 
            marginTop: '1rem', 
            padding: '0.75rem', 
            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
            borderRadius: '4px', 
            fontSize: '0.875rem' 
          }}>
            <p>{rarity.description}</p>
          </div>
          
          {/* Информация о персонаже, для которого предназначена диковинка */}
          {rarity.for_character && (
            <div className="rarity-character-info" style={{ 
              marginTop: '0.75rem', 
              padding: '0.75rem', 
              backgroundColor: 'rgba(75, 0, 130, 0.1)', 
              borderRadius: '4px', 
              fontSize: '0.875rem',
              borderLeft: '3px solid rgba(75, 0, 130, 0.5)'
            }}>
              <p style={{ margin: 0 }}>
                <strong>Предназначена для:</strong> {rarity.for_character}
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="rarity-edit-actions" style={{ marginTop: '1rem', textAlign: 'right' }}>
        <button 
          className="btn btn-secondary"
          onClick={onClose}
          style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default RarityEditor;