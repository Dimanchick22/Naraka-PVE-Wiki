// src/data/characters.js
import { ModifierType } from './jades';
import { getCharacterSkills } from './characterSkills';
import { baseStats } from './baseStats';

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
      mobility: 40
    },
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
      mobility: 60
    },
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
      mobility: 95
    },
    recommended_jades: ["jade_frozen_lotos", "jade_dual_effect", "jade_boss_hunter"],
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
 * Получить навыки персонажа
 * @param {string} characterId - ID персонажа
 * @returns {Array} - Массив навыков персонажа
 */
export function getCharacterSkillsById(characterId) {
  return getCharacterSkills(characterId);
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