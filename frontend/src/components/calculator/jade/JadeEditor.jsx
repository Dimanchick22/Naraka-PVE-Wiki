// Обновленный компонент JadeEditor с использованием CustomSelect
import React from 'react';
import { jadesData } from '../../../data/jades';
import JadeStatRow from './JadeStatRow';
import CustomSelect from '../../common/CustomSelect';

const JadeEditor = ({
  jadeIndex,
  jade,
  customStats,
  onJadeSelect,
  onStatTypeChange,
  onStatValueChange,
  onClose
}) => {
  // Подготовка опций для CustomSelect
  const emptyOption = { id: '', name: 'Нет нефрита' };
  
  // Создаем группы для разных типов нефритов
  const attackJades = jadesData.filter(jade => jade.type === 'attack').map(jade => ({ 
    id: jade.id, 
    name: `${jade.name} (${jade.rarity})` 
  }));
  
  const iceExplosionJades = jadesData.filter(jade => jade.type === 'ice_explosion').map(jade => ({ 
    id: jade.id, 
    name: `${jade.name} (${jade.rarity})` 
  }));
  
  const bossAttackJades = jadesData.filter(jade => jade.type === 'boss_attack').map(jade => ({ 
    id: jade.id, 
    name: `${jade.name} (${jade.rarity})` 
  }));
  
  const monsterAttackJades = jadesData.filter(jade => jade.type === 'monster_attack').map(jade => ({ 
    id: jade.id, 
    name: `${jade.name} (${jade.rarity})` 
  }));
  
  const fusionJades = jadesData.filter(jade => jade.type === 'fusion').map(jade => ({ 
    id: jade.id, 
    name: `${jade.name} (${jade.rarity})` 
  }));
  
  const mixedJades = jadesData.filter(jade => jade.type === 'mixed').map(jade => ({ 
    id: jade.id, 
    name: `${jade.name} (${jade.rarity})` 
  }));
  
  // Объединяем все группы в один массив опций
  const options = [
    emptyOption,
    ...attackJades,
    ...iceExplosionJades,
    ...bossAttackJades,
    ...monsterAttackJades,
    ...fusionJades,
    ...mixedJades
  ];

  return (
    <div className="jade-edit-panel">
      <h4 className="jade-edit-title">Настройка нефрита #{jadeIndex + 1}</h4>
      
      <div className="form-group">
        <label className="mb-2 block">Выберите тип нефрита:</label>
        <CustomSelect 
          options={options}
          value={jade?.id || ''}
          onChange={onJadeSelect}
          placeholder="Выберите нефрит"
        />
      </div>
      
      {/* Настройка статов нефрита - максимум 4 стата */}
      {jade && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h5 className="m-0">Статы нефрита</h5>
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
          
          <div className="p-3 bg-black bg-opacity-20 rounded-md mt-4 text-sm">
            <p>{jade.description}</p>
          </div>
        </div>
      )}
      
      <div className="jade-edit-actions">
        <button 
          className="btn btn-secondary btn-small"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default JadeEditor;