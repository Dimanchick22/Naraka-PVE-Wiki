// src/utils/DamageCalculator.js

import { ModifierType, ModifierTarget } from "../data/jades";
import { PotentialModifierTarget, POTENTIAL_VALUES } from "../data/potentials";
import { RarityModifierTarget } from "../data/rarities";
import { baseStats, damageConstants } from "../data/baseStats";
import { getCharacterById, getCharacterDamageBoosts } from "../data/characters";

/**
 * Класс для расчета урона на основе характеристик персонажа, нефритов, диковинок и потенциалов
 */
class DamageCalculator {
  constructor() {
    // Базовые параметры
    this.character = null;
    this.consciousness = damageConstants.DEFAULT_CONSCIOUSNESS;
    this.heroLevel = 20;
    this.jades = [];
    this.rarity = null;
    
    // Активные навыки персонажа
    this.activeSkills = {};

    // Активные потенциалы (таланты)
    this.activePotentials = {
      // Базовые потенциалы (влияют на базовую атаку)
      base: {
        untouchable_talent: false,
        power: false,
        ice_root: false,
        ice_flash: false
      },
      // Боевые потенциалы
      combat: {
        aroma_aura: false,
        frost_bloom: false,
        consciousness_match: false
      }
    };

    // Модификаторы эффектов
    this.modifiers = {
      attack: [],           // Модификаторы атаки
      ice_explosion: [],    // Модификаторы ледяного взрыва
      boss_attack: [],      // Модификаторы атаки по боссам
      monster_attack: [],   // Модификаторы атаки по монстрам
      fusion: [],           // Модификаторы слияния
      flower_explosion: [], // Модификаторы цветочного взрыва
      special: []           // Особые модификаторы
    };

    // Результаты расчетов
    this.results = {
      baseAttack: 0,                  // Базовая атака 
      finalAttack: 0,                 // Финальная атака с бонусами
      iceExplosionPercent: 0,         // Процент ледяного взрыва
      finalIceExplosionPercent: 0,    // Финальный процент ледяного взрыва с бонусами
      
      // Физический урон
      physicalDamage: 0,
      
      // Урон ледяного взрыва
      iceExplosionDamage: 0,
      flowerExplosionDamage: 0,
      
      // Урон по боссам
      bossPhysicalDamage: 0,
      bossAttackPercent: 0,
      bossIceExplosionPercent: 0,
      bossIceExplosionDamage: 0,
      bossFlowerExplosionDamage: 0,
      
      // Урон по монстрам
      monsterPhysicalDamage: 0,
      monsterAttackPercent: 0,
      monsterIceExplosionPercent: 0,
      monsterIceExplosionDamage: 0,
      monsterFlowerExplosionDamage: 0,
      
      // Урон последовательности нефрита
      jadeFirstBlastDamage: 0,
      jadeSecondBlastDamage: 0,
      jadeThirdBlastDamage: 0,
      jadeTotalBlastDamage: 0,
      
      // Урон последовательности нефрита по боссам
      bossJadeFirstBlastDamage: 0,
      bossJadeSecondBlastDamage: 0,
      bossJadeThirdBlastDamage: 0,
      bossJadeTotalBlastDamage: 0,
      
      // Урон последовательности нефрита по монстрам
      monsterJadeFirstBlastDamage: 0,
      monsterJadeSecondBlastDamage: 0,
      monsterJadeThirdBlastDamage: 0,
      monsterJadeTotalBlastDamage: 0,
      
      // Подробные шаги расчета для отображения
      calculationSteps: []
    };
  }

  /**
   * Установка персонажа
   * @param {Object} character - Объект персонажа
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  setCharacter(character) {
    this.character = character;
    return this;
  }
  
  /**
   * Установка активных навыков персонажа
   * @param {Object} activeSkills - Объект с активными навыками
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  setActiveSkills(activeSkills) {
    this.activeSkills = activeSkills || {};
    return this;
  }

  /**
   * Установка значения сознания
   * @param {number} value - Значение сознания
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  setConsciousness(value) {
    this.consciousness = Number(value);
    return this;
  }

  /**
   * Установка уровня героя
   * @param {number} level - Уровень героя
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  setHeroLevel(level) {
    this.heroLevel = Number(level);
    return this;
  }

  /**
   * Добавление нефрита
   * @param {Object} jade - Объект нефрита
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  addJade(jade) {
    if (!jade) return this;
    
    this.jades.push(jade);
    this._processJadeStats(jade);
    return this;
  }

  /**
   * Установка диковинки
   * @param {Object} rarity - Объект диковинки
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  setRarity(rarity) {
    this.rarity = rarity;
    if (rarity) {
      this._processRarityEffects(rarity);
    }
    return this;
  }

  /**
   * Активация/деактивация базового потенциала (таланта)
   * @param {string} potentialId - ID потенциала
   * @param {boolean} active - Активен ли потенциал
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  setBaseTalent(potentialId, active) {
    if (potentialId in this.activePotentials.base) {
      this.activePotentials.base[potentialId] = active;
    }
    return this;
  }

  /**
   * Активация/деактивация боевого потенциала (таланта)
   * @param {string} potentialId - ID потенциала
   * @param {boolean} active - Активен ли потенциал
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  setCombatTalent(potentialId, active) {
    if (potentialId in this.activePotentials.combat) {
      this.activePotentials.combat[potentialId] = active;
    }
    return this;
  }

  /**
   * Сброс всех модификаторов
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  resetModifiers() {
    for (const key in this.modifiers) {
      this.modifiers[key] = [];
    }
    return this;
  }

  /**
   * Обработка статов нефрита
   * @param {Object} jade - Объект нефрита
   * @private
   */
  _processJadeStats(jade) {
    if (jade.stats && jade.stats.length > 0) {
      jade.stats.forEach(stat => {
        const targetKey = this._getModifierTargetKey(stat.target);
        
        if (targetKey && this.modifiers[targetKey]) {
          this.modifiers[targetKey].push({
            source: `Jade: ${jade.name}`,
            type: stat.type,
            value: stat.value,
            calculate: stat.calculate
          });
        }
      });
    }
    
    // Обработка пользовательских статов, если они есть
    if (jade.customStats) {
      jade.customStats.forEach(stat => {
        if (!stat.type || stat.type === '') return;
        
        const targetKey = this._getModifierTargetKey(stat.type);
        
        if (targetKey && this.modifiers[targetKey]) {
          this.modifiers[targetKey].push({
            source: `Custom stat for ${jade.name}`,
            type: ModifierType.PERCENTAGE,
            value: stat.value,
            calculate: true
          });
        }
      });
    }
  }

  /**
   * Обработка эффектов диковинки
   * @param {Object} rarity - Объект диковинки
   * @private
   */
  _processRarityEffects(rarity) {
    // Стандартные эффекты
    if (rarity.effects) {
      rarity.effects.forEach(effect => {
        const targetKey = this._getModifierTargetKey(effect.target);
        
        if (targetKey && this.modifiers[targetKey]) {
          this.modifiers[targetKey].push({
            source: `Rarity: ${rarity.name}`,
            type: effect.type,
            value: effect.value,
            condition: effect.condition
          });
        } else if (effect.target === RarityModifierTarget.FLOWER_EXPLOSION_DAMAGE) {
          // Особая обработка для урона цветочного взрыва
          this.modifiers.flower_explosion.push({
            source: `Rarity: ${rarity.name}`,
            type: effect.type,
            value: effect.value
          });
        }
      });
    }
    
    // Пользовательские статы, если они есть
    if (rarity.customStats) {
      rarity.customStats.forEach(stat => {
        if (!stat.type || stat.type === '') return;
        
        const targetKey = this._getModifierTargetKey(stat.type);
        
        if (targetKey && this.modifiers[targetKey]) {
          this.modifiers[targetKey].push({
            source: `Custom stat for ${rarity.name}`,
            type: ModifierType.PERCENTAGE,
            value: stat.value,
            calculate: true
          });
        }
      });
    }
  }

  /**
   * Преобразование цели модификатора в ключ модификатора
   * @param {string} target - Цель модификатора
   * @returns {string|null} - Ключ модификатора
   * @private
   */
  _getModifierTargetKey(target) {
    switch (target) {
      case ModifierTarget.ATTACK:
        return 'attack';
      case ModifierTarget.ICE_EXPLOSION:
        return 'ice_explosion';
      case ModifierTarget.BOSS_ATTACK:
        return 'boss_attack';
      case ModifierTarget.MONSTER_ATTACK:
        return 'monster_attack';
      case ModifierTarget.FUSION:
        return 'fusion';
      default:
        if (target === RarityModifierTarget.FLOWER_EXPLOSION_DAMAGE) {
          return 'flower_explosion';
        }
        return null;
    }
  }

  /**
   * Расчет бонуса уровня героя
   * @returns {number} - Бонус атаки от уровня героя (в процентах, например, 0.12 = 12%)
   * @private
   */
  _calculateHeroLevelBonus() {
    let bonus = 0;
    
    // Обходим baseStats.heroLevelBonuses
    for (const level in baseStats.heroLevelBonuses) {
      if (this.heroLevel >= Number(level)) {
        bonus += baseStats.heroLevelBonuses[level];
      }
    }
    
    return bonus;
  }

/**
 * Расчет бонуса базовой атаки
 * @returns {number} - Множитель базовой атаки
 * @private
 */
_calculateBaseAttackBonus() {
    let bonus = 1.0;
    
    // Бонус от уровня героя
    bonus += this._calculateHeroLevelBonus();
    
    // Бонусы от базовых потенциалов
    if (this.activePotentials.base.untouchable_talent) {
      bonus += POTENTIAL_VALUES.UNTOUCHABLE_TALENT;
    }
    
    if (this.activePotentials.base.power) {
      bonus += POTENTIAL_VALUES.POWER;
    }
    
    // Бонусы от навыков персонажа (перенесено из _calculateCombatAttackBonus)
    if (this.character && this.activeSkills) {
      const skillBoosts = getCharacterDamageBoosts(this.character.id, this.activeSkills);
      if (skillBoosts.attackBoost) {
        bonus += skillBoosts.attackBoost / 100;
      }
    }
    
    // Бонусы от нефритов (процентные)
    this.modifiers.attack.forEach(mod => {
      if (mod.type === ModifierType.PERCENTAGE) {
        bonus += mod.value / 100;
      }
    });
    
    return bonus;
  }

  /**
   * Расчет базовой атаки
   * @returns {number} - Значение базовой атаки
   * @private
   */
  _calculateBaseAttack() {
    const baseAttackValue = baseStats.base_attack + (this.consciousness / 10);
    const baseAttackBonus = this._calculateBaseAttackBonus();
    
    const baseAttack = baseAttackValue * baseAttackBonus;
    
    this.results.baseAttack = baseAttack;
    this.results.calculationSteps.push({
      name: "Базовая атака",
      formula: "(BASE_ATTACK + (сознание/10)) * бонус_базовой_атаки (включая навыки)",
      calculation: `(${baseStats.base_attack} + (${this.consciousness}/10)) * ${baseAttackBonus.toFixed(3)}`,
      result: baseAttack.toFixed(2)
    });
    
    return baseAttack;
  }

  /**
   * Расчет базового процента ледяного взрыва
   * @returns {number} - Базовый процент ледяного взрыва
   * @private
   */
  _calculateBaseIceExplosionPercent() {
    let percent = 1.0; // Базовое значение 100%
    
    // Бонусы от базовых потенциалов
    if (this.activePotentials.base.ice_root) {
      percent += POTENTIAL_VALUES.ICE_ROOT;
    }
    
    if (this.activePotentials.base.ice_flash) {
      percent += POTENTIAL_VALUES.ICE_FLASH;
    }
    
    // Бонусы от нефритов
    this.modifiers.ice_explosion.forEach(mod => {
      if (mod.type === ModifierType.PERCENTAGE) {
        percent += mod.value / 100;
      }
    });
    
    this.results.iceExplosionPercent = percent;
    this.results.calculationSteps.push({
      name: "Базовый процент ледяного взрыва",
      formula: "1.0 + бонусы_потенциалов + бонусы_нефритов",
      calculation: `1.0 + ${this.activePotentials.base.ice_root ? POTENTIAL_VALUES.ICE_ROOT : 0} + ${this.activePotentials.base.ice_flash ? POTENTIAL_VALUES.ICE_FLASH : 0} + ${percent - 1.0 - (this.activePotentials.base.ice_root ? POTENTIAL_VALUES.ICE_ROOT : 0) - (this.activePotentials.base.ice_flash ? POTENTIAL_VALUES.ICE_FLASH : 0)}`,
      result: percent.toFixed(2)
    });
    
    return percent;
  }

  /**
 * Расчет бонуса боевой атаки
 * @returns {number} - Множитель боевой атаки
 * @private
 */
_calculateCombatAttackBonus() {
    let bonus = this._calculateBaseAttackBonus();
    
    // Бонусы от боевых потенциалов
    if (this.activePotentials.combat.aroma_aura) {
      bonus += POTENTIAL_VALUES.AROMA_AURA;
    }
    
    
    this.results.calculationSteps.push({
      name: "Бонус боевой атаки",
      formula: "бонус_базовой_атаки + боевые_бонусы_потенциалов",
      calculation: `${this._calculateBaseAttackBonus().toFixed(3)} + ${this.activePotentials.combat.aroma_aura ? POTENTIAL_VALUES.AROMA_AURA : 0}`,
      result: bonus.toFixed(3)
    });
    
    return bonus;
  }

  /**
 * Расчет финальной атаки
 * @returns {number} - Значение финальной атаки
 * @private
 */
_calculateFinalAttack() {
    const baseAttackValue = baseStats.base_attack + (this.consciousness / 10);
    const combatAttackBonus = this._calculateCombatAttackBonus();
    
    let finalAttack = baseAttackValue * combatAttackBonus;
    
    // Получаем бонусы от навыков (только для мультипликативных бонусов)
    if (this.character) {
      const skillBoosts = getCharacterDamageBoosts(this.character.id, this.activeSkills);
      
      // Применяем только мультипликативные бонусы от навыков
      if (skillBoosts.multipliers && skillBoosts.multipliers.length > 0) {
        skillBoosts.multipliers.forEach(multiplier => {
          finalAttack *= multiplier;
        });
      }
    }
    
    // Применение множителя от потенциала совпадения сознания
    if (this.activePotentials.combat.consciousness_match) {
      finalAttack *= POTENTIAL_VALUES.CONSCIOUSNESS_MATCH;
    }
    
    this.results.finalAttack = finalAttack;
    this.results.physicalDamage = finalAttack;
    
    this.results.calculationSteps.push({
      name: "Финальная атака",
      formula: "(BASE_ATTACK + (сознание/10)) * бонус_боевой_атаки * множители_от_навыков * consciousness_match",
      calculation: `(${baseStats.base_attack} + (${this.consciousness}/10)) * ${combatAttackBonus.toFixed(3)} * [множители от навыков] * ${this.activePotentials.combat.consciousness_match ? POTENTIAL_VALUES.CONSCIOUSNESS_MATCH : 1.0}`,
      result: finalAttack.toFixed(2)
    });
    
    return finalAttack;
  }

  /**
   * Расчет финального процента ледяного взрыва
   * @returns {number} - Финальный процент ледяного взрыва
   * @private
   */
  _calculateFinalIceExplosionPercent() {
    let percent = this._calculateBaseIceExplosionPercent();
    
    // Бонус от потенциала frost_bloom
    if (this.activePotentials.combat.frost_bloom) {
      percent += POTENTIAL_VALUES.FROST_BLOOM;
    }
    
    // Бонусы от активных навыков персонажа
    if (this.character && this.activeSkills) {
      const skillBoosts = getCharacterDamageBoosts(this.character.id, this.activeSkills);
      if (skillBoosts.iceExplosionBoost) {
        percent += skillBoosts.iceExplosionBoost / 100;
      }
    }
    
    this.results.finalIceExplosionPercent = percent;
    this.results.calculationSteps.push({
      name: "Финальный процент ледяного взрыва",
      formula: "базовый_процент_ледяного_взрыва + frost_bloom + бонусы_навыков",
      calculation: `${this._calculateBaseIceExplosionPercent().toFixed(2)} + ${this.activePotentials.combat.frost_bloom ? POTENTIAL_VALUES.FROST_BLOOM : 0} + [бонусы от навыков]`,
      result: percent.toFixed(2)
    });
    
    return percent;
  }

  /**
   * Расчет урона ледяного взрыва
   * @private
   */
  _calculateIceExplosionDamage() {
    const finalAttack = this.results.finalAttack;
    const iceExplosionPercent = this._calculateFinalIceExplosionPercent();
    
    // Урон ледяного взрыва
    const iceExplosionDamage = finalAttack * iceExplosionPercent * damageConstants.EXPLOSION_COEF;
    this.results.iceExplosionDamage = iceExplosionDamage;
    
    // Урон цветочного взрыва
    const flowerExplosionDamage = finalAttack * iceExplosionPercent * damageConstants.FLOWER_EXPLOSION_COEF;
    this.results.flowerExplosionDamage = flowerExplosionDamage;
    
    this.results.calculationSteps.push({
      name: "Урон ледяного взрыва",
      formula: "финальная_атака * процент_ледяного_взрыва * EXPLOSION_COEF",
      calculation: `${finalAttack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${damageConstants.EXPLOSION_COEF}`,
      result: iceExplosionDamage.toFixed(2)
    });
    
    this.results.calculationSteps.push({
      name: "Урон цветочного взрыва",
      formula: "финальная_атака * процент_ледяного_взрыва * FLOWER_EXPLOSION_COEF",
      calculation: `${finalAttack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${damageConstants.FLOWER_EXPLOSION_COEF}`,
      result: flowerExplosionDamage.toFixed(2)
    });
  }

  /**
   * Расчет бонуса атаки по боссам
   * @returns {number} - Процент бонуса атаки по боссам
   * @private
   */
  _calculateBossAttackBonus() {
    let bonus = 0;
    
    // Бонусы от нефритов
    this.modifiers.boss_attack.forEach(mod => {
      if (mod.type === ModifierType.PERCENTAGE) {
        bonus += mod.value / 100;
      }
    });
    
    this.results.bossAttackPercent = bonus;
    this.results.calculationSteps.push({
      name: "Бонус атаки по боссам",
      formula: "сумма_бонусов_нефритов",
      calculation: `${bonus.toFixed(3)}`,
      result: bonus.toFixed(3)
    });
    
    return bonus;
  }

  /**
   * Расчет урона по боссам
   * @private
   */
  _calculateBossDamage() {
    const finalAttack = this.results.finalAttack;
    const bossAttackBonus = this._calculateBossAttackBonus();
    
    // Физический урон по боссам
    const bossPhysicalDamage = finalAttack * (1 + bossAttackBonus);
    this.results.bossPhysicalDamage = bossPhysicalDamage;
    
    // Процент ледяного взрыва по боссам
    const bossIceExplosionPercent = (1 * (1 + bossAttackBonus)) + (this.results.finalIceExplosionPercent - 1);
    this.results.bossIceExplosionPercent = bossIceExplosionPercent;
    
    // Урон ледяного взрыва по боссам
    const bossIceExplosionDamage = finalAttack * bossIceExplosionPercent * damageConstants.EXPLOSION_COEF;
    this.results.bossIceExplosionDamage = bossIceExplosionDamage;
    
    // Урон цветочного взрыва по боссам
    const bossFlowerExplosionDamage = finalAttack * bossIceExplosionPercent * damageConstants.FLOWER_EXPLOSION_COEF;
    this.results.bossFlowerExplosionDamage = bossFlowerExplosionDamage;
    
    this.results.calculationSteps.push({
      name: "Процент ледяного взрыва по боссам",
      formula: "(1 * (1 + бонус_атаки_по_боссам)) + (финальный_процент_ледяного_взрыва - 1)",
      calculation: `(1 * (1 + ${bossAttackBonus.toFixed(2)})) + (${this.results.finalIceExplosionPercent.toFixed(2)} - 1)`,
      result: bossIceExplosionPercent.toFixed(2)
    });
    
    this.results.calculationSteps.push({
      name: "Урон ледяного взрыва по боссам",
      formula: "финальная_атака * процент_ледяного_взрыва_по_боссам * EXPLOSION_COEF",
      calculation: `${finalAttack.toFixed(2)} * ${bossIceExplosionPercent.toFixed(2)} * ${damageConstants.EXPLOSION_COEF}`,
      result: bossIceExplosionDamage.toFixed(2)
    });
  }

  /**
   * Расчет бонуса атаки по монстрам
   * @returns {number} - Процент бонуса атаки по монстрам
   * @private
   */
  _calculateMonsterAttackBonus() {
    let bonus = 0;
    
    // Бонусы от нефритов
    this.modifiers.monster_attack.forEach(mod => {
      if (mod.type === ModifierType.PERCENTAGE) {
        bonus += mod.value / 100;
      }
    });
    
    this.results.monsterAttackPercent = bonus;
    this.results.calculationSteps.push({
      name: "Бонус атаки по монстрам",
      formula: "сумма_бонусов_нефритов",
      calculation: `${bonus.toFixed(3)}`,
      result: bonus.toFixed(3)
    });
    
    return bonus;
  }

  /**
   * Расчет урона по монстрам
   * @private
   */
  _calculateMonsterDamage() {
    const finalAttack = this.results.finalAttack;
    const monsterAttackBonus = this._calculateMonsterAttackBonus();
    
    // Физический урон по монстрам
    const monsterPhysicalDamage = finalAttack * (1 + monsterAttackBonus);
    this.results.monsterPhysicalDamage = monsterPhysicalDamage;
    
    // Процент ледяного взрыва по монстрам
    const monsterIceExplosionPercent = (1 * (1 + monsterAttackBonus)) + (this.results.finalIceExplosionPercent - 1);
    this.results.monsterIceExplosionPercent = monsterIceExplosionPercent;
    
    // Урон ледяного взрыва по монстрам
    const monsterIceExplosionDamage = finalAttack * monsterIceExplosionPercent * damageConstants.EXPLOSION_COEF;
    this.results.monsterIceExplosionDamage = monsterIceExplosionDamage;
    
    // Урон цветочного взрыва по монстрам
    const monsterFlowerExplosionDamage = finalAttack * monsterIceExplosionPercent * damageConstants.FLOWER_EXPLOSION_COEF;
    this.results.monsterFlowerExplosionDamage = monsterFlowerExplosionDamage;
    
    this.results.calculationSteps.push({
      name: "Процент ледяного взрыва по монстрам",
      formula: "(1 * (1 + бонус_атаки_по_монстрам)) + (финальный_процент_ледяного_взрыва - 1)",
      calculation: `(1 * (1 + ${monsterAttackBonus.toFixed(2)})) + (${this.results.finalIceExplosionPercent.toFixed(2)} - 1)`,
      result: monsterIceExplosionPercent.toFixed(2)
    });
    
    this.results.calculationSteps.push({
      name: "Урон ледяного взрыва по монстрам",
      formula: "финальная_атака * процент_ледяного_взрыва_по_монстрам * EXPLOSION_COEF",
      calculation: `${finalAttack.toFixed(2)} * ${monsterIceExplosionPercent.toFixed(2)} * ${damageConstants.EXPLOSION_COEF}`,
      result: monsterIceExplosionDamage.toFixed(2)
    });
  }

/**
   * Расчет урона от последовательности нефрита (3 взрыва)
   * @private
   */
_calculateJadeBlastDamage() {
    // Обычный урон
    const finalAttack = this.results.finalAttack;
    const iceExplosionPercent = this.results.finalIceExplosionPercent;
    
    const jadeFirstBlastDamage = Math.round(finalAttack * iceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_FIRST_BLAST_MULTIPLIER);
    const jadeSecondBlastDamage = Math.round(finalAttack * iceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_OTHER_BLAST_MULTIPLIER);
    const jadeThirdBlastDamage = jadeSecondBlastDamage; // Третий взрыв равен второму
    const jadeTotalBlastDamage = jadeFirstBlastDamage + jadeSecondBlastDamage + jadeThirdBlastDamage;
    
    this.results.jadeFirstBlastDamage = jadeFirstBlastDamage;
    this.results.jadeSecondBlastDamage = jadeSecondBlastDamage;
    this.results.jadeThirdBlastDamage = jadeThirdBlastDamage;
    this.results.jadeTotalBlastDamage = jadeTotalBlastDamage;
    
    // Урон по боссам
    const bossIceExplosionPercent = this.results.bossIceExplosionPercent;
    
    const bossJadeFirstBlastDamage = Math.round(finalAttack * bossIceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_FIRST_BLAST_MULTIPLIER);
    const bossJadeSecondBlastDamage = Math.round(finalAttack * bossIceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_OTHER_BLAST_MULTIPLIER);
    const bossJadeThirdBlastDamage = bossJadeSecondBlastDamage;
    const bossJadeTotalBlastDamage = bossJadeFirstBlastDamage + bossJadeSecondBlastDamage + bossJadeThirdBlastDamage;
    
    this.results.bossJadeFirstBlastDamage = bossJadeFirstBlastDamage;
    this.results.bossJadeSecondBlastDamage = bossJadeSecondBlastDamage;
    this.results.bossJadeThirdBlastDamage = bossJadeThirdBlastDamage;
    this.results.bossJadeTotalBlastDamage = bossJadeTotalBlastDamage;
    
    // Урон по монстрам
    const monsterIceExplosionPercent = this.results.monsterIceExplosionPercent;
    
    const monsterJadeFirstBlastDamage = Math.round(finalAttack * monsterIceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_FIRST_BLAST_MULTIPLIER);
    const monsterJadeSecondBlastDamage = Math.round(finalAttack * monsterIceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_OTHER_BLAST_MULTIPLIER);
    const monsterJadeThirdBlastDamage = monsterJadeSecondBlastDamage;
    const monsterJadeTotalBlastDamage = monsterJadeFirstBlastDamage + monsterJadeSecondBlastDamage + monsterJadeThirdBlastDamage;
    
    this.results.monsterJadeFirstBlastDamage = monsterJadeFirstBlastDamage;
    this.results.monsterJadeSecondBlastDamage = monsterJadeSecondBlastDamage;
    this.results.monsterJadeThirdBlastDamage = monsterJadeThirdBlastDamage;
    this.results.monsterJadeTotalBlastDamage = monsterJadeTotalBlastDamage;
    
    this.results.calculationSteps.push({
      name: "Урон первого взрыва нефрита",
      formula: "round(финальная_атака * процент_ледяного_взрыва * EXPLOSION_COEF * JADE_FIRST_BLAST_MULTIPLIER)",
      calculation: `round(${finalAttack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${damageConstants.EXPLOSION_COEF} * ${damageConstants.JADE_FIRST_BLAST_MULTIPLIER})`,
      result: jadeFirstBlastDamage
    });
    
    this.results.calculationSteps.push({
      name: "Урон второго взрыва нефрита",
      formula: "round(финальная_атака * процент_ледяного_взрыва * EXPLOSION_COEF * JADE_OTHER_BLAST_MULTIPLIER)",
      calculation: `round(${finalAttack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${damageConstants.EXPLOSION_COEF} * ${damageConstants.JADE_OTHER_BLAST_MULTIPLIER})`,
      result: jadeSecondBlastDamage
    });
    
    this.results.calculationSteps.push({
      name: "Общий урон нефрита",
      formula: "первый_взрыв + второй_взрыв + третий_взрыв",
      calculation: `${jadeFirstBlastDamage} + ${jadeSecondBlastDamage} + ${jadeThirdBlastDamage}`,
      result: jadeTotalBlastDamage
    });
  }

  /**
   * Выполнение расчета урона на основе установленных параметров
   * @returns {Object} - Результаты расчета
   */
  calculate() {
    // Сброс результатов и шагов расчета
    this.results = {
      baseAttack: 0,
      finalAttack: 0,
      iceExplosionPercent: 0,
      finalIceExplosionPercent: 0,
      physicalDamage: 0,
      iceExplosionDamage: 0,
      flowerExplosionDamage: 0,
      bossPhysicalDamage: 0,
      bossAttackPercent: 0,
      bossIceExplosionPercent: 0,
      bossIceExplosionDamage: 0,
      bossFlowerExplosionDamage: 0,
      monsterPhysicalDamage: 0,
      monsterAttackPercent: 0,
      monsterIceExplosionPercent: 0,
      monsterIceExplosionDamage: 0,
      monsterFlowerExplosionDamage: 0,
      jadeFirstBlastDamage: 0,
      jadeSecondBlastDamage: 0,
      jadeThirdBlastDamage: 0,
      jadeTotalBlastDamage: 0,
      bossJadeFirstBlastDamage: 0,
      bossJadeSecondBlastDamage: 0,
      bossJadeThirdBlastDamage: 0,
      bossJadeTotalBlastDamage: 0,
      monsterJadeFirstBlastDamage: 0,
      monsterJadeSecondBlastDamage: 0,
      monsterJadeThirdBlastDamage: 0,
      monsterJadeTotalBlastDamage: 0,
      calculationSteps: []
    };
    
    // Расчет базовой атаки
    this._calculateBaseAttack();
    
    // Расчет базового процента ледяного взрыва
    this._calculateBaseIceExplosionPercent();
    
    // Расчет финальной атаки
    this._calculateFinalAttack();
    
    // Расчет финального процента ледяного взрыва
    this._calculateFinalIceExplosionPercent();
    
    // Расчет урона ледяного взрыва
    this._calculateIceExplosionDamage();
    
    // Расчет урона по боссам
    this._calculateBossDamage();
    
    // Расчет урона по монстрам
    this._calculateMonsterDamage();
    
    // Расчет урона последовательности нефрита
    this._calculateJadeBlastDamage();
    
    return this.results;
  }

  /**
   * Получение текущих результатов расчета
   * @returns {Object} - Результаты расчета
   */
  getResults() {
    return this.results;
  }

  /**
   * Получение шагов расчета для подробного вывода
   * @returns {Array} - Шаги расчета
   */
  getCalculationSteps() {
    return this.results.calculationSteps;
  }

  /**
   * Получение информации о текущих модификаторах
   * @returns {Object} - Информация о модификаторах
   */
  getModifiersInfo() {
    // Подготовка информации о модификаторах для отображения
    const modifiersInfo = {};
    
    for (const key in this.modifiers) {
      if (this.modifiers[key].length > 0) {
        modifiersInfo[key] = this.modifiers[key].map(mod => ({
          source: mod.source,
          type: mod.type,
          value: mod.value,
          condition: mod.condition || null
        }));
      }
    }
    
    return modifiersInfo;
  }
}

export default DamageCalculator;