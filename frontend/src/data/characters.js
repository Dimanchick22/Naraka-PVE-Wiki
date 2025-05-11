// Обновленный src/data/characters.js
import { ModifierType } from './jades';
import { baseStats } from './baseStats';

// Типы эффектов навыков
export const SkillEffectType = {
    ATTACK_BOOST: 'attack_boost',         // Увеличение атаки
    ICE_EXPLOSION_BOOST: 'ice_boost',     // Увеличение урона ледяного взрыва
    DEFENSIVE: 'defensive',               // Защитный эффект
    DOT: 'dot',                           // Урон со временем
    HEAL: 'heal',                         // Лечение
    BUFF: 'buff',                         // Усиление
    DEBUFF: 'debuff'                      // Ослабление
};

// Типы значений эффектов
export const EffectValueType = {
  FLAT: 'flat',           // Прямое значение (например, +50)
  PERCENTAGE: 'percentage', // Процентное значение (например, 15%)
  MULTIPLIER: 'multiplier'  // Множитель (например, ×1.08)
};

// Роли персонажей
export const CharacterRole = {
  TANK: 'tank',
  SUPPORT: 'support',
  FIGHTER: 'fighter',
  ASSASSIN: 'assassin'
};

// Данные о персонажах
export const charactersData = [
  {
    id: "tian-hai",
    name: "Тянь Хай",
    role: CharacterRole.TANK,
    thumbnail: null,
    description: "Могучий боец, защищающий союзников своим щитом. Тянь Хай превосходен в сдерживании врагов и поглощении урона благодаря его могучей защите и навыкам контроля толпы.",
    recommended_jades: ["iron-heart", "guardian-shield", "resilience"],
    skills: [
      // Здесь можно добавить навыки Тянь Хай, если они есть
    ]
  },
  {
    id: "ziping",
    name: "Цзыпин",
    role: CharacterRole.FIGHTER,
    thumbnail: null,
    description: "Мастер ледяной магии, специализирующаяся на управлении полем боя и нанесении массового урона с помощью ледяных взрывов и цветочных заклинаний.",
    recommended_jades: ["jade_ice_blast", "jade_fusion_core", "jade_dual_effect"],
    skills: [
      {
        id: "ice_explosion",
        name: "Ледяной взрыв",
        description: "Баф элементального урона на 100%",
        cooldown: "12 секунд",
        effectType: SkillEffectType.ICE_EXPLOSION_BOOST,
        effects: [
          {
            description: "Наносит 100% от базовой атаки в качестве урона",
            value: 100,
            valueType: EffectValueType.PERCENTAGE
          }
        ],
        isActive: false
      },
      {
        id: "flower_magic",
        name: "F",
        description: "Атака 20%",
        cooldown: "15 секунд",
        effectType: SkillEffectType.ATTACK_BOOST,
        effects: [
          {
            description: "Наносит 180% от базовой атаки в качестве урона",
            value: 20,
            valueType: EffectValueType.PERCENTAGE
          }
        ],
        isActive: false
      }
    ]
  },
  {
    id: "tessa",
    name: "Тесса",
    role: CharacterRole.ASSASSIN,
    thumbnail: null,
    description: "Быстрая и смертоносная охотница на демонов, использующая духов лисы для нанесения дополнительного урона.",
    recommended_jades: ["jade_frozen_lotos", "jade_dual_effect", "jade_boss_hunter"],
    skills: [
      {
        id: "tessa_f",
        name: "Духовная связь",
        description: "Увеличивает общий урон на 8%", 
        cooldown: "20 секунд",
        effectType: SkillEffectType.ATTACK_BOOST,
        effects: [
          {
            description: "Увеличивает общий урон на 8%",
            value: 8,
            valueType: EffectValueType.MULTIPLIER
          }
        ],
        isActive: false
      }
    ]
  }
];

/**
 * Получить персонажа по ID
 * @param {string} id - ID персонажа
 * @returns {Object|null} - Объект персонажа или null
 */
export function getCharacterById(id) {
  return charactersData.find(character => character.id === id) || null;
}

/**
 * Получить базовые характеристики персонажа
 * @param {string} characterId - ID персонажа
 * @returns {Object} - Объект с базовыми характеристиками
 */
export function getCharacterBaseStats(characterId) {
  // Все персонажи имеют одинаковые базовые статы
  return baseStats;
}

/**
 * Получить бонусы к урону от навыков персонажа
 * @param {string} characterId - ID персонажа
 * @param {Object} activeSkills - Объект с активными навыками
 * @returns {Object} - Объект с бонусами к урону
 */
export function getCharacterDamageBoosts(characterId, activeSkills) {
  const character = getCharacterById(characterId);
  if (!character) {
    return {
      attackBoost: 0,
      iceExplosionBoost: 0,
      critRateBoost: 0,
      critDamageBoost: 0,
      multipliers: []
    };
  }
  
  const damageBoosts = {
    attackBoost: 0,
    iceExplosionBoost: 0,
    critRateBoost: 0,
    critDamageBoost: 0,
    multipliers: []
  };
  
  // Если нет активных навыков, возвращаем базовые значения
  if (!activeSkills) return damageBoosts;
  
  // Обрабатываем только активные навыки
  character.skills
    .filter(skill => activeSkills[skill.id])
    .forEach(skill => {
      // Обрабатываем эффекты в зависимости от типа навыка
      skill.effects.forEach(effect => {
        switch (skill.effectType) {
          case SkillEffectType.ATTACK_BOOST:
            if (effect.valueType === EffectValueType.MULTIPLIER) {
              // Преобразуем процентный бонус в множитель (например, 8% -> 1.08)
              damageBoosts.multipliers.push(1 + (effect.value / 100));
            } else if (effect.valueType === EffectValueType.PERCENTAGE) {
              damageBoosts.attackBoost += effect.value;
            }
            break;
            
          case SkillEffectType.ICE_EXPLOSION_BOOST:
            if (effect.valueType === EffectValueType.PERCENTAGE) {
              damageBoosts.iceExplosionBoost += effect.value;
            }
            break;
            
          case SkillEffectType.BUFF:
            if (effect.buffType === 'critRate' && effect.valueType === EffectValueType.PERCENTAGE) {
              damageBoosts.critRateBoost += effect.value;
            } else if (effect.buffType === 'critDamage' && effect.valueType === EffectValueType.PERCENTAGE) {
              damageBoosts.critDamageBoost += effect.value;
            }
            break;
        }
      });
    });
  
  return damageBoosts;
}

/**
 * Фильтрация персонажей
 * @param {Object} params - Параметры фильтрации
 * @param {string|null} params.role - Роль персонажа
 * @param {string|null} params.searchTerm - Строка поиска
 * @returns {Array} - Отфильтрованный массив персонажей
 */
export function filterCharacters({ role, searchTerm }) {
  return charactersData.filter(character => {
    const matchesRole = !role || role === "all" || character.role === role;
    const matchesSearch = !searchTerm || 
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesSearch;
  });
}