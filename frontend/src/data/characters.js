// src/data/characters.js

import { ModifierType } from './jades';

// Цели модификаторов для талантов
export const TalentModifierTarget = {
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
    stats: {
      health: 1200,
      defense: 85,
      attack: 60,
      mobility: 40,
      base_attack: 140, // Базовая атака для расчетов
    },
    talents: [
      {
        id: "untouchable_talent",
        name: "Неуязвимость",
        description: "Увеличивает базовую атаку на 8%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ATTACK,
            value: 8
          }
        ],
        isBase: true // Базовый талант, влияющий на основные характеристики
      },
      {
        id: "power",
        name: "Сила",
        description: "Увеличивает базовую атаку на 4.5%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ATTACK,
            value: 4.5
          }
        ],
        isBase: true
      },
      {
        id: "ice_root",
        name: "Ледяной корень",
        description: "Увеличивает урон ледяного взрыва на 40%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ICE_EXPLOSION,
            value: 40
          }
        ],
        isBase: true
      },
      {
        id: "ice_flash",
        name: "Ледяная вспышка",
        description: "Увеличивает урон ледяного взрыва на 35%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ICE_EXPLOSION,
            value: 35
          }
        ],
        isBase: true
      },
      {
        id: "aroma_aura",
        name: "Аура аромата",
        description: "Увеличивает атаку на 10% в бою",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.AROMA_AURA,
            value: 10
          }
        ],
        isBase: false
      },
      {
        id: "frost_seal",
        name: "Печать мороза",
        description: "Увеличивает атаку на 20% в бою",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.FROST_SEAL,
            value: 20
          }
        ],
        isBase: false
      }
    ],
    skills: [
      {
        name: "Каменная кожа",
        description: "Тянь Хай получает временный щит, блокирующий определенное количество урона и увеличивающий его защиту.",
        cooldown: "18 секунд",
      },
      {
        name: "Удар земли",
        description: "Мощный удар в землю, наносящий урон всем врагам вокруг и оглушающий их на короткое время.",
        cooldown: "25 секунд",
      },
      {
        name: "Непоколебимость",
        description: "Пассивный навык, снижающий получаемый урон на 15% при здоровье ниже 50%.",
        cooldown: "Пассивный",
      },
    ],
    recommended_jades: ["iron-heart", "guardian-shield", "resilience"],
  },
  {
    id: "ziping",
    name: "Цзыпин",
    role: CharacterRole.FIGHTER,
    thumbnail: null,
    description: "Мастер ледяной магии, специализирующаяся на управлении полем боя и нанесении массового урона с помощью ледяных взрывов и цветочных заклинаний.",
    stats: {
      health: 950,
      defense: 65,
      attack: 75,
      mobility: 60,
      base_attack: 140, // Базовая атака для расчетов
    },
    talents: [
      {
        id: "untouchable_talent",
        name: "Неуязвимость",
        description: "Увеличивает базовую атаку на 8%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ATTACK,
            value: 8
          }
        ],
        isBase: true
      },
      {
        id: "power",
        name: "Сила",
        description: "Увеличивает базовую атаку на 4.5%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ATTACK,
            value: 4.5
          }
        ],
        isBase: true
      },
      {
        id: "ice_root",
        name: "Ледяной корень",
        description: "Увеличивает урон ледяного взрыва на 40%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ICE_EXPLOSION,
            value: 40
          }
        ],
        isBase: true
      },
      {
        id: "ice_flash",
        name: "Ледяная вспышка",
        description: "Увеличивает урон ледяного взрыва на 35%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ICE_EXPLOSION,
            value: 35
          }
        ],
        isBase: true
      },
      {
        id: "tundra_power",
        name: "Сила тундры",
        description: "Увеличивает атаку на 15% в бою",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.TUNDRA_POWER,
            value: 15
          }
        ],
        isBase: false
      },
      {
        id: "frostbound_lotus",
        name: "Ледяной лотос",
        description: "Увеличивает атаку на 25% в бою",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.FROSTBOUND_LOTUS,
            value: 25
          }
        ],
        isBase: false
      },
      {
        id: "frost_bloom",
        name: "Морозный цветок",
        description: "Увеличивает урон ледяного взрыва на 45% в бою",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.FROST_BLOOM,
            value: 45
          }
        ],
        isBase: false
      }
    ],
    skills: [
      {
        name: "Ледяной взрыв",
        description: "Создает область ледяного взрыва, наносящая урон всем врагам в зоне действия.",
        cooldown: "12 секунд",
      },
      {
        name: "Цветочная магия",
        description: "Призывает ледяной цветок, который взрывается, нанося урон и замедляя врагов.",
        cooldown: "15 секунд",
      },
      {
        name: "Зимняя стужа",
        description: "Пассивный навык, увеличивающий урон ледяных атак при последовательных попаданиях.",
        cooldown: "Пассивный",
      },
    ],
    recommended_jades: ["jade_ice_blast", "jade_fusion_core", "jade_dual_effect"],
  },
  {
    id: "tessa",
    name: "Тесса",
    role: CharacterRole.ASSASSIN,
    thumbnail: null,
    description: "Быстрая и смертоносная охотница на демонов, использующая духов лисы для нанесения дополнительного урона.",
    stats: {
      health: 880,
      defense: 55,
      attack: 85,
      mobility: 95,
      base_attack: 140, // Базовая атака для расчетов
    },
    talents: [
      {
        id: "untouchable_talent",
        name: "Неуязвимость",
        description: "Увеличивает базовую атаку на 8%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ATTACK,
            value: 8
          }
        ],
        isBase: true
      },
      {
        id: "power",
        name: "Сила",
        description: "Увеличивает базовую атаку на 4.5%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ATTACK,
            value: 4.5
          }
        ],
        isBase: true
      },
      {
        id: "ice_root",
        name: "Ледяной корень",
        description: "Увеличивает урон ледяного взрыва на 40%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ICE_EXPLOSION,
            value: 40
          }
        ],
        isBase: true
      },
      {
        id: "ice_flash",
        name: "Ледяная вспышка",
        description: "Увеличивает урон ледяного взрыва на 35%",
        effects: [
          {
            type: ModifierType.PERCENTAGE,
            target: TalentModifierTarget.ICE_EXPLOSION,
            value: 35
          }
        ],
        isBase: true
      },
      {
        id: "tessa_f",
        name: "Духовная связь",
        description: "Увеличивает общий урон на 8%",
        effects: [
          {
            type: ModifierType.MULTIPLICATIVE,
            target: TalentModifierTarget.TESSA_F,
            value: 8
          }
        ],
        isBase: false
      },
      {
        id: "consciousness_match",
        name: "Гармония сознания",
        description: "Увеличивает урон на 15% при совпадении уровня сознания",
        effects: [
          {
            type: ModifierType.MULTIPLICATIVE,
            target: TalentModifierTarget.CONSCIOUSNESS_MATCH,
            value: 15
          }
        ],
        isBase: false
      }
    ],
    skills: [
      {
        name: "Зачарование: Приключение",
        description: "Активирует духовную сущность лисы, которая может наносить дополнительные удары.",
        cooldown: "25 секунд",
      },
      {
        name: "Удар хвостом",
        description: "Быстрый удар с возможностью призыва духа лисы для дополнительного урона.",
        cooldown: "10 секунд",
      },
      {
        name: "Духовное зрение",
        description: "Пассивный навык, позволяющий видеть скрытых врагов и получать бонус к критическому урону.",
        cooldown: "Пассивный",
      },
    ],
    recommended_jades: ["jade_frozen_lotos", "jade_dual_effect", "jade_boss_hunter"],
  }
];

// Функция для получения персонажа по ID
export function getCharacterById(id) {
  return charactersData.find(character => character.id === id) || null;
}

// Функция для получения таланта персонажа по ID
export function getCharacterTalent(characterId, talentId) {
  const character = getCharacterById(characterId);
  if (!character) return null;
  
  return character.talents.find(talent => talent.id === talentId) || null;
}

// Функция для фильтрации персонажей
export function filterCharacters({ role, searchTerm }) {
  return charactersData.filter(character => {
    const matchesRole = !role || role === "all" || character.role === role;
    const matchesSearch = !searchTerm || 
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesSearch;
  });
}