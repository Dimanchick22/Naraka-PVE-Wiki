// src/utils/DamageCalculator.js

import { ModifierType, ModifierTarget } from "../data/jades";
import { TalentModifierTarget } from "../data/characters";
import { RarityModifierTarget } from "../data/rarities";

// Константы для расчетов
const CONSTANTS = {
  BASE_ATTACK: 140,                   // Базовое значение атаки
  EXPLOSION_COEF: 4.06,               // Коэффициент урона ледяного взрыва
  FLOWER_EXPLOSION_COEF: 4.97,        // Коэффициент урона взрыва цветка
  JADE_FIRST_BLAST_MULTIPLIER: 0.55,  // Множитель первого взрыва нефрита
  JADE_OTHER_BLAST_MULTIPLIER: 0.569, // Множитель второго и третьего взрывов нефрита
  DEFAULT_CONSCIOUSNESS: 1120,        // Значение по умолчанию для сознания
  DEFAULT_HERO_LEVEL: 20,             // Уровень героя по умолчанию
  HERO_LEVEL_ATTACK_BONUS: {          // Бонусы к атаке по уровню героя
    10: 0.03, // +3% на уровне 10
    12: 0.03, // +3% на уровне 12
    16: 0.03, // +3% на уровне 16
    20: 0.03  // +3% на уровне 20
  },
  TALENT_VALUES: {
    "untouchable_talent": 0.08,
    "power": 0.045,
    "ice_root": 0.4,
    "ice_flash": 0.35,
    "aroma_aura": 0.1,
    "frost_seal": 0.2,
    "tundra_power": 0.15,
    "frostbound_lotus": 0.25,
    "frost_bloom": 0.45,
    "tessa_f": 1.08,
    "consciousness_match": 1.15
  }
};

/**
 * Класс для расчета урона на основе характеристик персонажа, нефритов и диковинок
 */
class DamageCalculator {
  constructor() {
    // Базовые параметры
    this.character = null;
    this.consciousness = CONSTANTS.DEFAULT_CONSCIOUSNESS;
    this.heroLevel = CONSTANTS.DEFAULT_HERO_LEVEL;
    this.jades = [];
    this.rarity = null;

    // Активные таланты
    this.activeTalents = {
      // Базовые таланты (влияют на базовую атаку)
      base: {
        untouchable_talent: false,
        power: false,
        ice_root: false,
        ice_flash: false
      },
      // Боевые таланты
      combat: {
        aroma_aura: false,
        frost_seal: false,
        tundra_power: false,
        frostbound_lotus: false,
        frost_bloom: false,
        tessa_f: false,
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
   * Активация/деактивация базового таланта
   * @param {string} talentId - ID таланта
   * @param {boolean} active - Активен ли талант
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  setBaseTalent(talentId, active) {
    if (talentId in this.activeTalents.base) {
      this.activeTalents.base[talentId] = active;
    }
    return this;
  }

  /**
   * Активация/деактивация боевого таланта
   * @param {string} talentId - ID таланта
   * @param {boolean} active - Активен ли талант
   * @returns {DamageCalculator} - this для цепочки вызовов
   */
  setCombatTalent(talentId, active) {
    if (talentId in this.activeTalents.combat) {
      this.activeTalents.combat[talentId] = active;
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

  /**
   * Обработка эффектов диковинки
   * @param {Object} rarity - Объект диковинки
   * @private
   */
  _processRarityEffects(rarity) {
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
    
    for (const level in CONSTANTS.HERO_LEVEL_ATTACK_BONUS) {
      if (this.heroLevel >= Number(level)) {
        bonus += CONSTANTS.HERO_LEVEL_ATTACK_BONUS[level];
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
    
    // Бонусы от базовых талантов
    if (this.activeTalents.base.untouchable_talent) {
      bonus += CONSTANTS.TALENT_VALUES.untouchable_talent;
    }
    
    if (this.activeTalents.base.power) {
      bonus += CONSTANTS.TALENT_VALUES.power;
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
    const baseAttackValue = CONSTANTS.BASE_ATTACK + (this.consciousness / 10);
    const baseAttackBonus = this._calculateBaseAttackBonus();
    
    const baseAttack = baseAttackValue * baseAttackBonus;
    
    this.results.baseAttack = baseAttack;
    this.results.calculationSteps.push({
      name: "Базовая атака",
      formula: "(BASE_ATTACK + (сознание/10)) * бонус_базовой_атаки",
      calculation: `(${CONSTANTS.BASE_ATTACK} + (${this.consciousness}/10)) * ${baseAttackBonus.toFixed(3)}`,
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
    
    // Бонусы от базовых талантов
    if (this.activeTalents.base.ice_root) {
      percent += CONSTANTS.TALENT_VALUES.ice_root;
    }
    
    if (this.activeTalents.base.ice_flash) {
      percent += CONSTANTS.TALENT_VALUES.ice_flash;
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
      formula: "1.0 + бонусы_талантов + бонусы_нефритов",
      calculation: `1.0 + ${this.activeTalents.base.ice_root ? CONSTANTS.TALENT_VALUES.ice_root : 0} + ${this.activeTalents.base.ice_flash ? CONSTANTS.TALENT_VALUES.ice_flash : 0} + ${percent - 1.0 - (this.activeTalents.base.ice_root ? CONSTANTS.TALENT_VALUES.ice_root : 0) - (this.activeTalents.base.ice_flash ? CONSTANTS.TALENT_VALUES.ice_flash : 0)}`,
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
    
    // Бонусы от боевых талантов
    if (this.activeTalents.combat.aroma_aura) {
      bonus += CONSTANTS.TALENT_VALUES.aroma_aura;
    }
    
    if (this.activeTalents.combat.frost_seal) {
      bonus += CONSTANTS.TALENT_VALUES.frost_seal;
    }
    
    if (this.activeTalents.combat.tundra_power) {
      bonus += CONSTANTS.TALENT_VALUES.tundra_power;
    }
    
    if (this.activeTalents.combat.frostbound_lotus) {
      bonus += CONSTANTS.TALENT_VALUES.frostbound_lotus;
    }
    
    this.results.calculationSteps.push({
      name: "Бонус боевой атаки",
      formula: "бонус_базовой_атаки + боевые_бонусы_талантов",
      calculation: `${this._calculateBaseAttackBonus().toFixed(3)} + ${this.activeTalents.combat.aroma_aura ? CONSTANTS.TALENT_VALUES.aroma_aura : 0} + ${this.activeTalents.combat.frost_seal ? CONSTANTS.TALENT_VALUES.frost_seal : 0} + ${this.activeTalents.combat.tundra_power ? CONSTANTS.TALENT_VALUES.tundra_power : 0} + ${this.activeTalents.combat.frostbound_lotus ? CONSTANTS.TALENT_VALUES.frostbound_lotus : 0}`,
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
    const baseAttackValue = CONSTANTS.BASE_ATTACK + (this.consciousness / 10);
    const combatAttackBonus = this._calculateCombatAttackBonus();
    
    let finalAttack = baseAttackValue * combatAttackBonus;
    
    // Применение множителя Tessa F
    if (this.activeTalents.combat.tessa_f) {
      finalAttack *= CONSTANTS.TALENT_VALUES.tessa_f;
    }
    
    // Применение множителя совпадения сознания
    if (this.activeTalents.combat.consciousness_match) {
      finalAttack *= CONSTANTS.TALENT_VALUES.consciousness_match;
    }
    
    this.results.finalAttack = finalAttack;
    this.results.physicalDamage = finalAttack;
    
    this.results.calculationSteps.push({
      name: "Финальная атака",
      formula: "(BASE_ATTACK + (сознание/10)) * бонус_боевой_атаки * tessa_f * consciousness_match",
      calculation: `(${CONSTANTS.BASE_ATTACK} + (${this.consciousness}/10)) * ${combatAttackBonus.toFixed(3)} * ${this.activeTalents.combat.tessa_f ? CONSTANTS.TALENT_VALUES.tessa_f : 1.0} * ${this.activeTalents.combat.consciousness_match ? CONSTANTS.TALENT_VALUES.consciousness_match : 1.0}`,
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
    
    // Бонус от таланта frost_bloom
    if (this.activeTalents.combat.frost_bloom) {
      percent += CONSTANTS.TALENT_VALUES.frost_bloom;
    }
    
    this.results.finalIceExplosionPercent = percent;
    this.results.calculationSteps.push({
      name: "Финальный процент ледяного взрыва",
      formula: "базовый_процент_ледяного_взрыва + frost_bloom",
      calculation: `${this._calculateBaseIceExplosionPercent().toFixed(2)} + ${this.activeTalents.combat.frost_bloom ? CONSTANTS.TALENT_VALUES.frost_bloom : 0}`,
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
    const iceExplosionDamage = finalAttack * iceExplosionPercent * CONSTANTS.EXPLOSION_COEF;
    this.results.iceExplosionDamage = iceExplosionDamage;
    
    // Урон цветочного взрыва
    const flowerExplosionDamage = finalAttack * iceExplosionPercent * CONSTANTS.FLOWER_EXPLOSION_COEF;
    this.results.flowerExplosionDamage = flowerExplosionDamage;
    
    this.results.calculationSteps.push({
      name: "Урон ледяного взрыва",
      formula: "финальная_атака * процент_ледяного_взрыва * EXPLOSION_COEF",
      calculation: `${finalAttack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${CONSTANTS.EXPLOSION_COEF}`,
      result: iceExplosionDamage.toFixed(2)
    });
    
    this.results.calculationSteps.push({
      name: "Урон цветочного взрыва",
      formula: "финальная_атака * процент_ледяного_взрыва * FLOWER_EXPLOSION_COEF",
      calculation: `${finalAttack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${CONSTANTS.FLOWER_EXPLOSION_COEF}`,
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
    const bossIceExplosionDamage = finalAttack * bossIceExplosionPercent * CONSTANTS.EXPLOSION_COEF;
    this.results.bossIceExplosionDamage = bossIceExplosionDamage;
    
    // Урон цветочного взрыва по боссам
    const bossFlowerExplosionDamage = finalAttack * bossIceExplosionPercent * CONSTANTS.FLOWER_EXPLOSION_COEF;
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
      calculation: `${finalAttack.toFixed(2)} * ${bossIceExplosionPercent.toFixed(2)} * ${CONSTANTS.EXPLOSION_COEF}`,
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
    const monsterIceExplosionDamage = finalAttack * monsterIceExplosionPercent * CONSTANTS.EXPLOSION_COEF;
    this.results.monsterIceExplosionDamage = monsterIceExplosionDamage;
    
    // Урон цветочного взрыва по монстрам
    const monsterFlowerExplosionDamage = finalAttack * monsterIceExplosionPercent * CONSTANTS.FLOWER_EXPLOSION_COEF;
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
      calculation: `${finalAttack.toFixed(2)} * ${monsterIceExplosionPercent.toFixed(2)} * ${CONSTANTS.EXPLOSION_COEF}`,
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
    
    const jadeFirstBlastDamage = Math.round(finalAttack * iceExplosionPercent * CONSTANTS.EXPLOSION_COEF * CONSTANTS.JADE_FIRST_BLAST_MULTIPLIER);
    const jadeSecondBlastDamage = Math.round(finalAttack * iceExplosionPercent * CONSTANTS.EXPLOSION_COEF * CONSTANTS.JADE_OTHER_BLAST_MULTIPLIER);
    const jadeThirdBlastDamage = jadeSecondBlastDamage; // Третий взрыв равен второму
    const jadeTotalBlastDamage = jadeFirstBlastDamage + jadeSecondBlastDamage + jadeThirdBlastDamage;
    
    this.results.jadeFirstBlastDamage = jadeFirstBlastDamage;
    this.results.jadeSecondBlastDamage = jadeSecondBlastDamage;
    this.results.jadeThirdBlastDamage = jadeThirdBlastDamage;
    this.results.jadeTotalBlastDamage = jadeTotalBlastDamage;
    
    // Урон по боссам
    const bossIceExplosionPercent = this.results.bossIceExplosionPercent;
    
    const bossJadeFirstBlastDamage = Math.round(finalAttack * bossIceExplosionPercent * CONSTANTS.EXPLOSION_COEF * CONSTANTS.JADE_FIRST_BLAST_MULTIPLIER);
    const bossJadeSecondBlastDamage = Math.round(finalAttack * bossIceExplosionPercent * CONSTANTS.EXPLOSION_COEF * CONSTANTS.JADE_OTHER_BLAST_MULTIPLIER);
    const bossJadeThirdBlastDamage = bossJadeSecondBlastDamage;
    const bossJadeTotalBlastDamage = bossJadeFirstBlastDamage + bossJadeSecondBlastDamage + bossJadeThirdBlastDamage;
    
    this.results.bossJadeFirstBlastDamage = bossJadeFirstBlastDamage;
    this.results.bossJadeSecondBlastDamage = bossJadeSecondBlastDamage;
    this.results.bossJadeThirdBlastDamage = bossJadeThirdBlastDamage;
    this.results.bossJadeTotalBlastDamage = bossJadeTotalBlastDamage;
    
    // Урон по монстрам
    const monsterIceExplosionPercent = this.results.monsterIceExplosionPercent;
    
    const monsterJadeFirstBlastDamage = Math.round(finalAttack * monsterIceExplosionPercent * CONSTANTS.EXPLOSION_COEF * CONSTANTS.JADE_FIRST_BLAST_MULTIPLIER);
    const monsterJadeSecondBlastDamage = Math.round(finalAttack * monsterIceExplosionPercent * CONSTANTS.EXPLOSION_COEF * CONSTANTS.JADE_OTHER_BLAST_MULTIPLIER);
    const monsterJadeThirdBlastDamage = monsterJadeSecondBlastDamage;
    const monsterJadeTotalBlastDamage = monsterJadeFirstBlastDamage + monsterJadeSecondBlastDamage + monsterJadeThirdBlastDamage;
    
    this.results.monsterJadeFirstBlastDamage = monsterJadeFirstBlastDamage;
    this.results.monsterJadeSecondBlastDamage = monsterJadeSecondBlastDamage;
    this.results.monsterJadeThirdBlastDamage = monsterJadeThirdBlastDamage;
    this.results.monsterJadeTotalBlastDamage = monsterJadeTotalBlastDamage;
    
    this.results.calculationSteps.push({
      name: "Урон первого взрыва нефрита",
      formula: "round(финальная_атака * процент_ледяного_взрыва * EXPLOSION_COEF * JADE_FIRST_BLAST_MULTIPLIER)",
      calculation: `round(${finalAttack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${CONSTANTS.EXPLOSION_COEF} * ${CONSTANTS.JADE_FIRST_BLAST_MULTIPLIER})`,
      result: jadeFirstBlastDamage
    });
    
    this.results.calculationSteps.push({
      name: "Урон второго взрыва нефрита",
      formula: "round(финальная_атака * процент_ледяного_взрыва * EXPLOSION_COEF * JADE_OTHER_BLAST_MULTIPLIER)",
      calculation: `round(${finalAttack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${CONSTANTS.EXPLOSION_COEF} * ${CONSTANTS.JADE_OTHER_BLAST_MULTIPLIER})`,
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