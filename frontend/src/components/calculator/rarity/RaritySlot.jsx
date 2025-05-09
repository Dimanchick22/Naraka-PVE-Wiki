// src/components/calculator/rarity/RaritySlot.jsx
import { getActiveStats } from '../../../utils/rarityHelpers';
import { getRarityColor, getRarityName, getRarityTypeName } from '../../../data/rarities';
import EmptyRarity from './EmptyRarity';
import CloudinaryImage from '../../common/CloudinaryImage';

const RaritySlot = ({ type, rarity, isSelected, onClick }) => {
  // Цвет заголовка в зависимости от типа
  const headerColor = type === 'yin' ? '#1e4e8a' : '#8a1e1e';
  
  return (
    <div 
      className={`rarity-slot ${type}-slot ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="rarity-slot-header" style={{ backgroundColor: headerColor }}>
        <h4>{type === 'yin' ? 'Инь' : 'Ян'}</h4>
      </div>
      {rarity ? (
        <div className="rarity-content">
          <div className="rarity-icon">
            {rarity.cloudinaryId ? (
              <CloudinaryImage 
                publicId={rarity.cloudinaryId} 
                alt={rarity.name}
                transformations={{ width: 60, height: 60, crop: "fill" }}
              />
            ) : (
              <div className="rarity-icon-placeholder">
                {type === 'yin' ? '阴' : '阳'}
              </div>
            )}
          </div>
          <div className="rarity-info">
            <h5 className="rarity-name">{rarity.name}</h5>
            <div className="rarity-level" style={{ color: getRarityColor(rarity.rarity) }}>
              {getRarityName(rarity.rarity)}
            </div>
            
            {/* Отображение активных статов */}
            <div className="rarity-stats">
              {getActiveStats(rarity).map((stat, index) => (
                <div key={index} className="rarity-stat">
                  {getStatDisplayName(stat.type)}: {stat.value}%
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EmptyRarity type={type} />
      )}
    </div>
  );
};

// Вспомогательная функция для получения отображаемого имени стата
const getStatDisplayName = (statType) => {
  switch (statType) {
    case 'attack':
      return 'Атака';
    case 'ice_explosion':
      return 'Лед. взрыв';
    case 'boss_attack':
      return 'Атака по боссам';
    case 'monster_attack':
      return 'Атака по монстрам';
    case 'fusion':
      return 'Слияние';
    case '':
      return 'Пусто';
    default:
      return statType;
  }
};

export default RaritySlot;