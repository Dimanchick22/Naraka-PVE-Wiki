// src/components/calculator/jade/JadeEditor.jsx
import { jadesData } from '../../../data/jades';
import JadeStatRow from './JadeStatRow';

const JadeEditor = ({
  jadeIndex,
  jade,
  customStats,
  onJadeSelect,
  onStatTypeChange,
  onStatValueChange,
  onClose
}) => {
  return (
    <div className="jade-edit-panel">
      <h4 className="jade-edit-title">Настройка нефрита #{jadeIndex + 1}</h4>
      
      <div className="jade-type-selection" style={{ marginBottom: '1rem' }}>
        <label style={{ marginBottom: '0.5rem', display: 'block' }}>Выберите тип нефрита:</label>
        <select 
          className="jade-select"
          value={jade?.id || ''}
          onChange={(e) => onJadeSelect(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', backgroundColor: 'rgba(26, 26, 26, 0.8)', color: 'var(--naraka-light)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '4px' }}
        >
          <option value="">Нет нефрита</option>
          <optgroup label="Атака">
            {jadesData.filter(jade => jade.type === 'attack').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
          <optgroup label="Ледяной взрыв">
            {jadesData.filter(jade => jade.type === 'ice_explosion').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
          <optgroup label="Атака по боссам">
            {jadesData.filter(jade => jade.type === 'boss_attack').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
          <optgroup label="Атака по монстрам">
            {jadesData.filter(jade => jade.type === 'monster_attack').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
          <optgroup label="Слияние">
            {jadesData.filter(jade => jade.type === 'fusion').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
          <optgroup label="Смешанные">
            {jadesData.filter(jade => jade.type === 'mixed').map(jade => (
              <option key={jade.id} value={jade.id}>
                {jade.name} ({jade.rarity})
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      
      {/* Настройка статов нефрита - максимум 4 стата */}
      {jade && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '0.75rem' 
          }}>
            <h5 style={{ margin: 0 }}>Статы нефрита</h5>
          </div>
          
          <div className="jade-stats-list">
            {customStats.map((stat, statIndex) => (
              <JadeStatRow
                key={statIndex}
                stat={stat}
                statIndex={statIndex}
                onTypeChange={(type) => onStatTypeChange(statIndex, type)}
                onValueChange={(value) => onStatValueChange(statIndex, value)}
              />
            ))}
          </div>
          
          <div className="jade-description" style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '4px', fontSize: '0.875rem' }}>
            <p>{jade.description}</p>
          </div>
        </div>
      )}
      
      <div className="jade-edit-actions">
        <button 
          className="btn btn-secondary close-edit-button"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default JadeEditor;