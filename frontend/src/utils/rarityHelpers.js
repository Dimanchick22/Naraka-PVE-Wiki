// src/utils/rarityHelpers.js

/**
 * Получить активные статы диковинки
 * @param {Object} rarity - Объект диковинки
 * @returns {Array} - Массив активных статов
 */
export const getActiveStats = (rarity) => {
    if (!rarity || !rarity.customStats) return [];
    
    return rarity.customStats.filter(stat => stat.type !== '');
  };
  
  /**
   * Получить отображаемое имя типа стата
   * @param {string} statType - Тип стата
   * @returns {string} - Отображаемое имя
   */
  export const getStatDisplayName = (statType) => {
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
      case 'flower_explosion_damage':
        return 'Урон цвет. взрыва';
      case 'flower_explosion_radius':
        return 'Радиус цвет. взрыва';
      case 'fox_spirit_damage':
        return 'Урон духа лисы';
      case 'additional_attack':
        return 'Доп. атака';
      case '':
        return 'Пусто';
      default:
        return statType;
    }
  };