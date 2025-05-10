// src/data/potentials.js
import { ModifierType } from './jades';

/**
 * Типы потенциалов (талантов)
 */
export const PotentialType = {
  BASE: 'base',     // Базовые потенциалы (влияют на базовую атаку)
  COMBAT: 'combat'  // Боевые потенциалы (активируются в бою)
};

/**
 * Цели модификаторов для потенциалов
 */
export const PotentialModifierTarget = {
  ATTACK: 'attack',
  ICE_EXPLOSION: 'ice_explosion',
  DEFENSE: 'defense',
  AROMA_AURA: 'aroma_aura',
  FROST_SEAL: 'frost_seal',
  TUNDRA_POWER: 'tundra_power',
  FROST_BLOOM: 'frost_bloom',
  FROSTBOUND_LOTUS: 'frostbound_lotus',
  TESSA_F: 'tessa_f',
  CONSCIOUSNESS_MATCH: 'consciousness_match'
};

/**
 * Значения эффектов потенциалов
 */
export const POTENTIAL_VALUES = {
  UNTOUCHABLE_TALENT: 0.08,  // +8% к атаке
  POWER: 0.045,              // +4.5% к атаке
  ICE_ROOT: 0.4,             // +40% к лед. взрыву
  ICE_FLASH: 0.35,           // +35% к лед. взрыву
  AROMA_AURA: 0.1,           // +10% к атаке в бою
  FROST_SEAL: 0.2,           // +20% к атаке в бою
  TUNDRA_POWER: 0.15,        // +15% к атаке в бою
  FROSTBOUND_LOTUS: 0.25,    // +25% к атаке в бою
  FROST_BLOOM: 0.45,         // +45% к лед. взрыву в бою
  TESSA_F: 1.08,             // +8% множитель урона
  CONSCIOUSNESS_MATCH: 1.15  // +15% множитель при совпадении сознания
};

/**
 * Данные о всех потенциалах (талантах) в игре
 * Доступны для всех персонажей
 */
export const potentialsData = [
  // Базовые потенциалы (влияют на базовую атаку)
  {
    id: "untouchable_talent",
    name: "Неуязвимость",
    description: "Увеличивает базовую атаку на 8%",
    type: PotentialType.BASE,
    effects: [
      {
        type: ModifierType.PERCENTAGE,
        target: PotentialModifierTarget.ATTACK,
        value: POTENTIAL_VALUES.UNTOUCHABLE_TALENT * 100 // 8%
      }
    ]
  },
  {
    id: "power",
    name: "Сила",
    description: "Увеличивает базовую атаку на 4.5%",
    type: PotentialType.BASE,
    effects: [
      {
        type: ModifierType.PERCENTAGE,
        target: PotentialModifierTarget.ATTACK,
        value: POTENTIAL_VALUES.POWER * 100 // 4.5%
      }
    ]
  },
  {
    id: "ice_root",
    name: "Ледяной корень",
    description: "Увеличивает урон ледяного взрыва на 40%",
    type: PotentialType.BASE,
    effects: [
      {
        type: ModifierType.PERCENTAGE,
        target: PotentialModifierTarget.ICE_EXPLOSION,
        value: POTENTIAL_VALUES.ICE_ROOT * 100 // 40%
      }
    ]
  },
  {
    id: "ice_flash",
    name: "Ледяная вспышка",
    description: "Увеличивает урон ледяного взрыва на 35%",
    type: PotentialType.BASE,
    effects: [
      {
        type: ModifierType.PERCENTAGE,
        target: PotentialModifierTarget.ICE_EXPLOSION,
        value: POTENTIAL_VALUES.ICE_FLASH * 100 // 35%
      }
    ]
  },
  
  // Боевые потенциалы (активируются в бою)
  {
    id: "aroma_aura",
    name: "Аура аромата",
    description: "Увеличивает атаку на 10% в бою",
    type: PotentialType.COMBAT,
    effects: [
      {
        type: ModifierType.PERCENTAGE,
        target: PotentialModifierTarget.AROMA_AURA,
        value: POTENTIAL_VALUES.AROMA_AURA * 100 // 10%
      }
    ]
  },
  {
    id: "frost_seal",
    name: "Печать мороза",
    description: "Увеличивает атаку на 20% в бою",
    type: PotentialType.COMBAT,
    effects: [
      {
        type: ModifierType.PERCENTAGE,
        target: PotentialModifierTarget.FROST_SEAL,
        value: POTENTIAL_VALUES.FROST_SEAL * 100 // 20%
      }
    ]
  },
  {
    id: "tundra_power",
    name: "Сила тундры",
    description: "Увеличивает атаку на 15% в бою",
    type: PotentialType.COMBAT,
    effects: [
      {
        type: ModifierType.PERCENTAGE,
        target: PotentialModifierTarget.TUNDRA_POWER,
        value: POTENTIAL_VALUES.TUNDRA_POWER * 100 // 15%
      }
    ]
  },
  {
    id: "frostbound_lotus",
    name: "Ледяной лотос",
    description: "Увеличивает атаку на 25% в бою",
    type: PotentialType.COMBAT,
    effects: [
      {
        type: ModifierType.PERCENTAGE,
        target: PotentialModifierTarget.FROSTBOUND_LOTUS,
        value: POTENTIAL_VALUES.FROSTBOUND_LOTUS * 100 // 25%
      }
    ]
  },
  {
    id: "frost_bloom",
    name: "Морозный цветок",
    description: "Увеличивает урон ледяного взрыва на 45% в бою",
    type: PotentialType.COMBAT,
    effects: [
      {
        type: ModifierType.PERCENTAGE,
        target: PotentialModifierTarget.FROST_BLOOM,
        value: POTENTIAL_VALUES.FROST_BLOOM * 100 // 45%
      }
    ]
  },
  {
    id: "tessa_f",
    name: "Духовная связь",
    description: "Увеличивает общий урон на 8%",
    type: PotentialType.COMBAT,
    effects: [
      {
        type: ModifierType.MULTIPLICATIVE,
        target: PotentialModifierTarget.TESSA_F,
        value: (POTENTIAL_VALUES.TESSA_F - 1) * 100 // 8%
      }
    ]
  },
  {
    id: "consciousness_match",
    name: "Гармония сознания",
    description: "Увеличивает урон на 15% при совпадении уровня сознания",
    type: PotentialType.COMBAT,
    effects: [
      {
        type: ModifierType.MULTIPLICATIVE,
        target: PotentialModifierTarget.CONSCIOUSNESS_MATCH,
        value: (POTENTIAL_VALUES.CONSCIOUSNESS_MATCH - 1) * 100 // 15%
      }
    ]
  }
];

/**
 * Получить все базовые потенциалы
 * @returns {Array} - Массив базовых потенциалов
 */
export function getBasePotentials() {
  return potentialsData.filter(potential => potential.type === PotentialType.BASE);
}

/**
 * Получить все боевые потенциалы
 * @returns {Array} - Массив боевых потенциалов
 */
export function getCombatPotentials() {
  return potentialsData.filter(potential => potential.type === PotentialType.COMBAT);
}

/**
 * Получить потенциал по ID
 * @param {string} id - ID потенциала
 * @returns {Object|null} - Объект потенциала или null
 */
export function getPotentialById(id) {
  return potentialsData.find(potential => potential.id === id) || null;
}