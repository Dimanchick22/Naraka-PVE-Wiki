// Модифицированный src/utils/DamageCalculator.js

import { ModifierType, ModifierTarget } from "../data/jades";
import { PotentialModifierTarget, POTENTIAL_VALUES } from "../data/potentials";
import { RarityModifierTarget } from "../data/rarities";
import { baseStats, heroLevelBonuses, damageConstants } from "../data/baseStats";
import { getCharacterById, getCharacterDamageBoosts, EffectValueType } from "../data/characters";

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
      attack: 0,                     // Итоговая атака (вместо baseAttack и finalAttack)
      iceExplosionPercent: 0,        // Процент ледяного взрыва
      physicalDamage: 0,             // Физический урон равен атаке
      
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
   * Обработка эффекта в зависимости от типа значения
   * @param {Object} effect - Объект эффекта
   * @param {number} currentValue - Текущее значение
   * @returns {number} - Новое значение после применения эффекта
   * @private
   */
  _applyEffect(effect, currentValue) {
    switch (effect.valueType) {
      case EffectValueType.FLAT:
        return currentValue + effect.value;
      
      case EffectValueType.PERCENTAGE:
        return currentValue + (effect.value / 100);
      
      case EffectValueType.MULTIPLIER:
        return currentValue * effect.value;
      
      default:
        return currentValue;
    }
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
            valueType: stat.valueType,
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
            valueType: EffectValueType.PERCENTAGE,
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
            valueType: effect.valueType,
            condition: effect.condition
          });
        } else if (effect.target === RarityModifierTarget.FLOWER_EXPLOSION_DAMAGE) {
          // Особая обработка для урона цветочного взрыва
          this.modifiers.flower_explosion.push({
            source: `Rarity: ${rarity.name}`,
            type: effect.type,
            value: effect.value,
            valueType: effect.valueType
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
            valueType: EffectValueType.PERCENTAGE,
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
    
    // Применяем все бонусы для уровней, которые достигнуты
    for (const level in heroLevelBonuses) {
      if (this.heroLevel >= Number(level)) {
        bonus += heroLevelBonuses[level];
      }
    }
    
    // Добавляем шаг в историю расчетов для наглядности
    this.results.calculationSteps.push({
      name: "Бонус от уровня героя",
      formula: "Сумма бонусов для достигнутых уровней",
      calculation: Object.entries(heroLevelBonuses)
        .filter(([level]) => this.heroLevel >= Number(level))
        .map(([level, value]) => `${level}: +${value * 100}%`)
        .join(", "),
      result: `+${(bonus * 100).toFixed(1)}%`
    });
    
    return bonus;
  }

  /**
   * Расчет бонуса атаки
   * @returns {number} - Множитель атаки
   * @private
   */
  _calculateAttackBonus() {
    // Аддитивные бонусы (складываются)
    let additiveBonus = 1.0;
    
    // Мультипликативные бонусы (умножаются)
    let multipliers = [];
    
    // Бонус от уровня героя (аддитивный)
    additiveBonus += this._calculateHeroLevelBonus();
    
    // Бонусы от базовых потенциалов (аддитивные)
    if (this.activePotentials.base.untouchable_talent) {
      additiveBonus += POTENTIAL_VALUES.UNTOUCHABLE_TALENT;
    }
    
    if (this.activePotentials.base.power) {
      additiveBonus += POTENTIAL_VALUES.POWER;
    }

    // Бонусы от боевых потенциалов (аддитивные)
    if (this.activePotentials.combat.aroma_aura) {
      additiveBonus += POTENTIAL_VALUES.AROMA_AURA;
    }
    
    // Бонусы от навыков персонажа
    if (this.character && this.activeSkills) {
      const skillBoosts = getCharacterDamageBoosts(this.character.id, this.activeSkills);
      
      // Применяем процентные бонусы (аддитивные)
      if (skillBoosts.attackBoost) {
        additiveBonus += skillBoosts.attackBoost / 100;
      }
      
      // Сохраняем мультипликативные бонусы
      if (skillBoosts.multipliers && skillBoosts.multipliers.length > 0) {
        multipliers = [...skillBoosts.multipliers];
      }
    }
    
    // Бонусы от нефритов (аддитивные и мультипликативные)
    this.modifiers.attack.forEach(mod => {
      if (mod.valueType) {
        if (mod.valueType === EffectValueType.PERCENTAGE) {
          // Процентные бонусы добавляем к общему аддитивному бонусу
          additiveBonus += mod.value / 100;
        } else if (mod.valueType === EffectValueType.MULTIPLIER) {
          // Мультипликативные бонусы сохраняем отдельно
          multipliers.push(mod.value);
        }
      } else if (mod.type === ModifierType.PERCENTAGE) {
        // Обратная совместимость со старым форматом
        additiveBonus += mod.value / 100;
      } else if (mod.type === ModifierType.MULTIPLICATIVE) {
        // Обратная совместимость со старым форматом для мультипликативных бонусов
        multipliers.push(1 + (mod.value / 100));
      }
    });
    
    // Теперь применяем все мультипликативные бонусы к аддитивному бонусу
    let finalBonus = additiveBonus;
    
    multipliers.forEach(multiplier => {
      finalBonus *= multiplier;
    });
    
    // Добавляем шаги в историю расчетов для наглядности
    this.results.calculationSteps.push({
      name: "Аддитивный бонус атаки",
      formula: "1.0 + бонус_уровня + бонусы_потенциалов + процентные_бонусы_навыков + процентные_бонусы_нефритов",
      calculation: `1.0 + [бонусы] = ${additiveBonus.toFixed(3)}`,
      result: `${additiveBonus.toFixed(3)}`
    });
    
    if (multipliers.length > 0) {
      this.results.calculationSteps.push({
        name: "Применение мультипликативных бонусов",
        formula: "аддитивный_бонус * множитель1 * множитель2 * ...",
        calculation: `${additiveBonus.toFixed(3)} * ${multipliers.map(m => m.toFixed(3)).join(' * ')}`,
        result: `${finalBonus.toFixed(3)}`
      });
    }
    
    return finalBonus;
  }

  /**
   * Расчет атаки
   * @returns {number} - Значение атаки
   * @private
   */
  _calculateAttack() {
    const baseAttackValue = baseStats.base_attack + (this.consciousness / 10);
    const attackBonus = this._calculateAttackBonus();
    
    let attack = baseAttackValue * attackBonus;
    
    // Применение множителя от потенциала совпадения сознания
    if (this.activePotentials.combat.consciousness_match) {
      attack *= POTENTIAL_VALUES.CONSCIOUSNESS_MATCH;
    }
    
    this.results.attack = attack;
    this.results.physicalDamage = attack;
    
    this.results.calculationSteps.push({
      name: "Расчет атаки",
      formula: "(базовая_атака + (сознание/10)) * бонус_атаки * consciousness_match",
      calculation: `(${baseStats.base_attack} + (${this.consciousness}/10)) * ${attackBonus.toFixed(3)} * ${this.activePotentials.combat.consciousness_match ? POTENTIAL_VALUES.CONSCIOUSNESS_MATCH : 1.0}`,
      result: attack.toFixed(2)
    });
    
    return attack;
  }

  /**
   * Расчет процента ледяного взрыва
   * @returns {number} - Процент ледяного взрыва
   * @private
   */
  _calculateIceExplosionPercent() {
    let percent = 1.0; // Базовое значение 100%
    
    // Бонусы от базовых потенциалов
    if (this.activePotentials.base.ice_root) {
      percent += POTENTIAL_VALUES.ICE_ROOT;
    }
    
    if (this.activePotentials.base.ice_flash) {
      percent += POTENTIAL_VALUES.ICE_FLASH;
    }
    
    // Бонус от потенциала frost_bloom
    if (this.activePotentials.combat.frost_bloom) {
      percent += POTENTIAL_VALUES.FROST_BLOOM;
    }
    
    // Бонусы от нефритов
    this.modifiers.ice_explosion.forEach(mod => {
      if (mod.valueType) {
        percent = this._applyEffect(mod, percent);
      } else if (mod.type === ModifierType.PERCENTAGE) {
        percent += mod.value / 100;
      }
    });
    
    // Бонусы от активных навыков персонажа
    if (this.character && this.activeSkills) {
      const skillBoosts = getCharacterDamageBoosts(this.character.id, this.activeSkills);
      if (skillBoosts.iceExplosionBoost) {
        percent += skillBoosts.iceExplosionBoost / 100;
      }
    }
    
    this.results.iceExplosionPercent = percent;
    this.results.calculationSteps.push({
      name: "Процент ледяного взрыва",
      formula: "1.0 + бонусы_потенциалов + бонусы_нефритов + бонусы_навыков",
      calculation: `1.0 + ${this.activePotentials.base.ice_root ? POTENTIAL_VALUES.ICE_ROOT : 0} + ${this.activePotentials.base.ice_flash ? POTENTIAL_VALUES.ICE_FLASH : 0} + ${this.activePotentials.combat.frost_bloom ? POTENTIAL_VALUES.FROST_BLOOM : 0} + [бонусы от нефритов и навыков]`,
      result: percent.toFixed(2)
    });
    
    return percent;
  }

  /**
   * Расчет урона ледяного взрыва
   * @private
   */
  _calculateIceExplosionDamage() {
    const attack = this.results.attack;
    const iceExplosionPercent = this.results.iceExplosionPercent;
    
    // Урон ледяного взрыва
    const iceExplosionDamage = attack * iceExplosionPercent * damageConstants.EXPLOSION_COEF;
    this.results.iceExplosionDamage = iceExplosionDamage;
    
    // Урон цветочного взрыва
    const flowerExplosionDamage = attack * iceExplosionPercent * damageConstants.FLOWER_EXPLOSION_COEF;
    this.results.flowerExplosionDamage = flowerExplosionDamage;
    
    this.results.calculationSteps.push({
      name: "Урон ледяного взрыва",
      formula: "атака * процент_ледяного_взрыва * EXPLOSION_COEF",
      calculation: `${attack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${damageConstants.EXPLOSION_COEF}`,
      result: iceExplosionDamage.toFixed(2)
    });
    
    this.results.calculationSteps.push({
      name: "Урон цветочного взрыва",
      formula: "атака * процент_ледяного_взрыва * FLOWER_EXPLOSION_COEF",
      calculation: `${attack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${damageConstants.FLOWER_EXPLOSION_COEF}`,
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
      if (mod.valueType) {
        if (mod.valueType === EffectValueType.PERCENTAGE) {
          bonus += mod.value / 100;
        }
      } else if (mod.type === ModifierType.PERCENTAGE) {
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
    const attack = this.results.attack;
    const bossAttackBonus = this._calculateBossAttackBonus();
    
    // Физический урон по боссам
    const bossPhysicalDamage = attack * (1 + bossAttackBonus);
    this.results.bossPhysicalDamage = bossPhysicalDamage;
    
    // Процент ледяного взрыва по боссам
    const bossIceExplosionPercent = (1 * (1 + bossAttackBonus)) + (this.results.iceExplosionPercent - 1);
    this.results.bossIceExplosionPercent = bossIceExplosionPercent;
    
    // Урон ледяного взрыва по боссам
    const bossIceExplosionDamage = attack * bossIceExplosionPercent * damageConstants.EXPLOSION_COEF;
    this.results.bossIceExplosionDamage = bossIceExplosionDamage;
    
    // Урон цветочного взрыва по боссам
    const bossFlowerExplosionDamage = attack * bossIceExplosionPercent * damageConstants.FLOWER_EXPLOSION_COEF;
    this.results.bossFlowerExplosionDamage = bossFlowerExplosionDamage;
    
    this.results.calculationSteps.push({
      name: "Процент ледяного взрыва по боссам",
      formula: "(1 * (1 + бонус_атаки_по_боссам)) + (процент_ледяного_взрыва - 1)",
      calculation: `(1 * (1 + ${bossAttackBonus.toFixed(2)})) + (${this.results.iceExplosionPercent.toFixed(2)} - 1)`,
      result: bossIceExplosionPercent.toFixed(2)
    });
    
    this.results.calculationSteps.push({
      name: "Урон ледяного взрыва по боссам",
      formula: "атака * процент_ледяного_взрыва_по_боссам * EXPLOSION_COEF",
      calculation: `${attack.toFixed(2)} * ${bossIceExplosionPercent.toFixed(2)} * ${damageConstants.EXPLOSION_COEF}`,
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
      if (mod.valueType) {
        if (mod.valueType === EffectValueType.PERCENTAGE) {
          bonus += mod.value / 100;
        }
      } else if (mod.type === ModifierType.PERCENTAGE) {
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
    const attack = this.results.attack;
    const monsterAttackBonus = this._calculateMonsterAttackBonus();
    
    // Физический урон по монстрам
    const monsterPhysicalDamage = attack * (1 + monsterAttackBonus);
    this.results.monsterPhysicalDamage = monsterPhysicalDamage;
    
    // Процент ледяного взрыва по монстрам
    const monsterIceExplosionPercent = (1 * (1 + monsterAttackBonus)) + (this.results.iceExplosionPercent - 1);
    this.results.monsterIceExplosionPercent = monsterIceExplosionPercent;
    
    // Урон ледяного взрыва по монстрам
    const monsterIceExplosionDamage = attack * monsterIceExplosionPercent * damageConstants.EXPLOSION_COEF;
    this.results.monsterIceExplosionDamage = monsterIceExplosionDamage;

    // Урон цветочного взрыва по монстрам
    const monsterFlowerExplosionDamage = attack * monsterIceExplosionPercent * damageConstants.FLOWER_EXPLOSION_COEF;
    this.results.monsterFlowerExplosionDamage = monsterFlowerExplosionDamage;

    this.results.calculationSteps.push({
      name: "Процент ледяного взрыва по монстрам",
      formula: "(1 * (1 + бонус_атаки_по_монстрам)) + (процент_ледяного_взрыва - 1)",
      calculation: `(1 * (1 + ${monsterAttackBonus.toFixed(2)})) + (${this.results.iceExplosionPercent.toFixed(2)} - 1)`,
      result: monsterIceExplosionPercent.toFixed(2)
    });

    this.results.calculationSteps.push({
      name: "Урон ледяного взрыва по монстрам",
      formula: "атака * процент_ледяного_взрыва_по_монстрам * EXPLOSION_COEF",
      calculation: `${attack.toFixed(2)} * ${monsterIceExplosionPercent.toFixed(2)} * ${damageConstants.EXPLOSION_COEF}`,
      result: monsterIceExplosionDamage.toFixed(2)
    });
  }

  /**
  * Расчет урона от последовательности нефрита (3 взрыва)
  * @private
  */
  _calculateJadeBlastDamage() {
    // Обычный урон
    const attack = this.results.attack;
    const iceExplosionPercent = this.results.iceExplosionPercent;

    const jadeFirstBlastDamage = Math.round(attack * iceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_FIRST_BLAST_MULTIPLIER);
    const jadeSecondBlastDamage = Math.round(attack * iceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_OTHER_BLAST_MULTIPLIER);
    const jadeThirdBlastDamage = jadeSecondBlastDamage; // Третий взрыв равен второму
    const jadeTotalBlastDamage = jadeFirstBlastDamage + jadeSecondBlastDamage + jadeThirdBlastDamage;

    this.results.jadeFirstBlastDamage = jadeFirstBlastDamage;
    this.results.jadeSecondBlastDamage = jadeSecondBlastDamage;
    this.results.jadeThirdBlastDamage = jadeThirdBlastDamage;
    this.results.jadeTotalBlastDamage = jadeTotalBlastDamage;

    // Урон по боссам
    const bossIceExplosionPercent = this.results.bossIceExplosionPercent;

    const bossJadeFirstBlastDamage = Math.round(attack * bossIceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_FIRST_BLAST_MULTIPLIER);
    const bossJadeSecondBlastDamage = Math.round(attack * bossIceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_OTHER_BLAST_MULTIPLIER);
    const bossJadeThirdBlastDamage = bossJadeSecondBlastDamage;
    const bossJadeTotalBlastDamage = bossJadeFirstBlastDamage + bossJadeSecondBlastDamage + bossJadeThirdBlastDamage;

    this.results.bossJadeFirstBlastDamage = bossJadeFirstBlastDamage;
    this.results.bossJadeSecondBlastDamage = bossJadeSecondBlastDamage;
    this.results.bossJadeThirdBlastDamage = bossJadeThirdBlastDamage;
    this.results.bossJadeTotalBlastDamage = bossJadeTotalBlastDamage;

    // Урон по монстрам
    const monsterIceExplosionPercent = this.results.monsterIceExplosionPercent;

    const monsterJadeFirstBlastDamage = Math.round(attack * monsterIceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_FIRST_BLAST_MULTIPLIER);
    const monsterJadeSecondBlastDamage = Math.round(attack * monsterIceExplosionPercent * damageConstants.EXPLOSION_COEF * damageConstants.JADE_OTHER_BLAST_MULTIPLIER);
    const monsterJadeThirdBlastDamage = monsterJadeSecondBlastDamage;
    const monsterJadeTotalBlastDamage = monsterJadeFirstBlastDamage + monsterJadeSecondBlastDamage + monsterJadeThirdBlastDamage;

    this.results.monsterJadeFirstBlastDamage = monsterJadeFirstBlastDamage;
    this.results.monsterJadeSecondBlastDamage = monsterJadeSecondBlastDamage;
    this.results.monsterJadeThirdBlastDamage = monsterJadeThirdBlastDamage;
    this.results.monsterJadeTotalBlastDamage = monsterJadeTotalBlastDamage;

    this.results.calculationSteps.push({
      name: "Урон первого взрыва нефрита",
      formula: "round(атака * процент_ледяного_взрыва * EXPLOSION_COEF * JADE_FIRST_BLAST_MULTIPLIER)",
      calculation: `round(${attack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${damageConstants.EXPLOSION_COEF} * ${damageConstants.JADE_FIRST_BLAST_MULTIPLIER})`,
      result: jadeFirstBlastDamage
    });

    this.results.calculationSteps.push({
      name: "Урон второго взрыва нефрита",
      formula: "round(атака * процент_ледяного_взрыва * EXPLOSION_COEF * JADE_OTHER_BLAST_MULTIPLIER)",
      calculation: `round(${attack.toFixed(2)} * ${iceExplosionPercent.toFixed(2)} * ${damageConstants.EXPLOSION_COEF} * ${damageConstants.JADE_OTHER_BLAST_MULTIPLIER})`,
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
      attack: 0,
      iceExplosionPercent: 0,
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

    // Расчет атаки
    this._calculateAttack();

    // Расчет процента ледяного взрыва
    this._calculateIceExplosionPercent();

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
          valueType: mod.valueType || null,
          condition: mod.condition || null
        }));
      }
    }

    return modifiersInfo;
  }
}

export default DamageCalculator;