// Обновленный src/data/characters.js
import { ModifierType } from './jades';
import { baseStats } from './baseStats';

// Типы эффектов навыков
export const SkillEffectType = {
    ATTACK_BOOST: 'attack_boost',         // Увеличение атаки
    ICE_EXPLOSION_BOOST: 'ice_boost',     // Увеличение урона ледяного взрыва
    DEFENSIVE: 'defensive',               // Защитный эффект
    CROWD_CONTROL: 'crowd_control',       // Контроль толпы
    SUMMON: 'summon',                     // Призыв
    MOBILITY: 'mobility',                 // Мобильность
    DOT: 'dot',                           // Урон со временем
    HEAL: 'heal',                         // Лечение
    BUFF: 'buff',                         // Усиление
    DEBUFF: 'debuff'                      // Ослабление
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
    ],
    talents: [
      // Здесь могут быть таланты конкретно для Тянь Хай
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
        description: "Создает область ледяного взрыва, наносящая урон всем врагам в зоне действия.",
        cooldown: "12 секунд",
        effectType: SkillEffectType.ICE_EXPLOSION_BOOST,
        effects: [
          {
            description: "Наносит 220% от базовой атаки в качестве урона",
            value: 100
          }
        ],
        isActive: false // Добавляем флаг активности навыка
      },
      {
        id: "flower_magic",
        name: "Цветочная магия",
        description: "Призывает ледяной цветок, который взрывается, нанося урон и замедляя врагов.",
        cooldown: "15 секунд",
        effectType: SkillEffectType.ICE_EXPLOSION_BOOST,
        effects: [
          {
            description: "Наносит 180% от базовой атаки в качестве урона",
            value: 180
          },
          {
            description: "Замедляет врагов на 30% на 4 секунды",
            value: 30,
            duration: 4
          },
          {
            description: "Увеличивает урон цветочного взрыва на 25% на 6 секунд",
            value: 25,
            duration: 6
          }
        ],
        isActive: false
      },
      {
        id: "winter_freeze",
        name: "Зимняя стужа",
        description: "Пассивный навык, увеличивающий урон ледяных атак при последовательных попаданиях.",
        cooldown: "Пассивный",
        effectType: SkillEffectType.ICE_EXPLOSION_BOOST,
        effects: [
          {
            description: "Каждое попадание увеличивает урон ледяного взрыва на 5%, суммируется до 5 раз",
            value: 5,
            stacks: 5
          }
        ],
        isActive: false
      }
    ],
    talents: [
      // Таланты для Цзыпин
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
        id: "tail_strike",
        name: "Удар хвостом",
        description: "Быстрый удар с возможностью призыва духа лисы для дополнительного урона.",
        cooldown: "10 секунд",
        effectType: SkillEffectType.ATTACK_BOOST,
        effects: [
          {
            description: "Наносит 8% от базовой атаки в качестве урона",
            value: 8
          }
        ],
        isActive: false
      },
      {
        id: "tessa_f",
        name: "Духовная связь",
        description: "Увеличивает общий урон на 8%",
        cooldown: "20 секунд", 
        effectType: SkillEffectType.ATTACK_BOOST,
        effects: [
          {
            description: "Увеличивает общий урон на 8%",
            value: 8
          }
        ],
        isActive: false
      }
    ],
    talents: [
      // Таланты для Тессы
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
  if (!character) return {
    attackBoost: 0,
    iceExplosionBoost: 0,
    critRateBoost: 0,
    critDamageBoost: 0
  };
  
  const damageBoosts = {
    attackBoost: 0,
    iceExplosionBoost: 0,
    critRateBoost: 0,
    critDamageBoost: 0,
    multipliers: [] // Для хранения мультипликативных бонусов
  };
  
  // Проходим по активным навыкам
  character.skills.forEach(skill => {
    // Проверяем, активен ли навык
    if (activeSkills && activeSkills[skill.id]) {
      if (skill.effectType === SkillEffectType.ATTACK_BOOST) {
        // Если навык влияет на атаку
        skill.effects.forEach(effect => {
          if (effect.multiplier) {
            // Если есть множитель, добавляем его в список множителей
            damageBoosts.multipliers.push(effect.multiplier);
          } else if (effect.description.includes('атак')) {
            // Иначе суммируем процентный бонус
            damageBoosts.attackBoost += effect.value;
          }
        });
      } else if (skill.effectType === SkillEffectType.ICE_EXPLOSION_BOOST) {
        // Если навык влияет на ледяной взрыв
        skill.effects.forEach(effect => {
          if (effect.description.includes('лед')) {
            damageBoosts.iceExplosionBoost += effect.value;
          }
        });
      } else if (skill.effectType === SkillEffectType.BUFF) {
        // Если навык дает бафф
        skill.effects.forEach(effect => {
          if (effect.description.includes('критического удара')) {
            damageBoosts.critRateBoost += effect.value;
          }
          if (effect.description.includes('критический урон')) {
            damageBoosts.critDamageBoost += effect.value;
          }
        });
      }
    }
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