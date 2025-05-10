// src/data/baseStats.js

/**
 * Базовые статы, которые одинаковы для всех персонажей
 * Эти значения используются как основа для расчетов
 */
export const baseStats = {
    base_attack: 140,        // Базовая атака
    base_health: 1000,       // Базовое здоровье
    base_defense: 50,        // Базовая защита
    base_critical_rate: 5,   // Базовый шанс крита (%)
    base_critical_damage: 50 // Базовый урон крита (%)
  };
  
  /**
   * Бонусы к статам от уровня героя
   * Ключ - уровень героя, значение - процент бонуса
   */
  export const heroLevelBonuses = {
    10: 0.03, // +3% на уровне 10
    12: 0.03, // +3% на уровне 12
    16: 0.03, // +3% на уровне 16
    20: 0.03  // +3% на уровне 20
  };
  
  /**
   * Константы для расчетов урона
   */
  export const damageConstants = {
    EXPLOSION_COEF: 4.06,               // Коэффициент урона ледяного взрыва
    FLOWER_EXPLOSION_COEF: 4.97,        // Коэффициент урона взрыва цветка
    JADE_FIRST_BLAST_MULTIPLIER: 0.55,  // Множитель первого взрыва нефрита
    JADE_OTHER_BLAST_MULTIPLIER: 0.569, // Множитель второго и третьего взрывов нефрита
    DEFAULT_CONSCIOUSNESS: 1120         // Значение по умолчанию для сознания
  };
  
  /**
   * Функция для расчета базовой атаки на основе сознания и уровня героя
   * @param {number} consciousness - Значение сознания
   * @param {number} heroLevel - Уровень героя
   * @returns {number} - Базовая атака
   */
  export function calculateBaseAttack(consciousness, heroLevel) {
    // Базовое значение атаки + бонус от сознания
    let baseAttackValue = baseStats.base_attack + (consciousness / 10);
    
    // Расчет бонуса от уровня героя
    let levelBonus = 1.0;
    Object.keys(heroLevelBonuses).forEach(level => {
      if (heroLevel >= parseInt(level)) {
        levelBonus += heroLevelBonuses[level];
      }
    });
    
    // Итоговая базовая атака с учетом бонуса от уровня
    return baseAttackValue * levelBonus;
  }