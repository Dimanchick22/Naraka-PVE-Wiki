// src/utils/jadeHelpers.js
import { getJadeRarityColor } from '../data/jades';

/**
 * Получить цвет нефрита в зависимости от редкости
 * @param {Object} jade - Объект нефрита
 * @returns {string} - HEX код цвета
 */
export const getJadeColor = (jade) => {
  if (!jade) return '#555555';
  return getJadeRarityColor(jade.rarity);
};

/**
 * Получить отображаемое имя типа нефрита
 * @param {string} type - Тип нефрита
 * @returns {string} - Отображаемое имя
 */
export const getJadeTypeName = (type) => {
  switch (type) {
    case 'attack':
      return 'Атака';
    case 'ice_explosion':
      return 'Ледяной взрыв';
    case 'boss_attack':
      return 'Атака по боссам';
    case 'monster_attack':
      return 'Атака по монстрам';
    case 'fusion':
      return 'Слияние';
    case 'mixed':
      return 'Смешанный';
    default:
      return type;
  }
};