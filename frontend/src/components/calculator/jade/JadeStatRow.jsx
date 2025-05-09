// src/components/calculator/jade/JadeStatRow.jsx
import { ModifierTarget } from '../../../data/jades';

// Опции для выбора типа стата
const statTypeOptions = [
  { value: '', label: 'Пусто' },
  { value: ModifierTarget.ATTACK, label: 'Атака' },
  { value: ModifierTarget.ICE_EXPLOSION, label: 'Лед. взрыв' },
  { value: ModifierTarget.BOSS_ATTACK, label: 'Атака по боссам' },
  { value: ModifierTarget.MONSTER_ATTACK, label: 'Атака по монстрам' },
  { value: ModifierTarget.FUSION, label: 'Слияние' }
];

const JadeStatRow = ({ stat, statIndex, onTypeChange, onValueChange }) => {
  return (
    <div 
      className="jade-stat-row" 
      data-type={stat.type || 'empty'}
      style={{ 
        marginBottom: '0.75rem',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center'
      }}
    >
      <div style={{ flex: 2 }}>
        <select
          value={stat.type}
          onChange={(e) => onTypeChange(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: 'rgba(26, 26, 26, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '4px',
            padding: '0.5rem',
            color: 'var(--naraka-light)',
          }}
        >
          {statTypeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <input
          type="number"
          value={stat.value}
          onChange={(e) => onValueChange(Number(e.target.value))}
          min="0"
          max="100"
          step="5"
          disabled={stat.type === ''}
          style={{
            width: '100%',
            padding: '0.5rem 1.5rem 0.5rem 0.5rem',
            backgroundColor: stat.type === '' ? 'rgba(26, 26, 26, 0.4)' : 'rgba(26, 26, 26, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '4px',
            color: 'var(--naraka-light)',
            opacity: stat.type === '' ? 0.5 : 1
          }}
        />
        {stat.type !== '' && (
          <span style={{
            position: 'absolute',
            right: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--naraka-light)',
            opacity: '0.7',
          }}>%</span>
        )}
      </div>
    </div>
  );
};

export default JadeStatRow;