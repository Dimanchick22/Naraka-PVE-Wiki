// src/data/rarities.js

import { ModifierType } from './jades';

// Цели модификаторов специфичные для диковинок
export const RarityModifierTarget = {
  FLOWER_EXPLOSION_DAMAGE: 'flower_explosion_damage',
  FLOWER_EXPLOSION_RADIUS: 'flower_explosion_radius',
  FOX_SPIRIT_DAMAGE: 'fox_spirit_damage',
  ADDITIONAL_ATTACK: 'additional_attack'
};

// Типы диковинок
export const RarityType = {
  YIN: 'yin',
  YANG: 'yang'
};

// Уровни редкости
export const RarityLevel = {
  MYTHIC: 'mythic',
  LEGENDARY: 'legendary',
  EPIC: 'epic'
};

// Данные о диковинках
export const raritiesData = [
  // Колокольчик девятихвостой души - три варианта редкости
  {
    id: "nine-tailed-chime-mythic",
    name: "Колокольчик девятихвостой души",
    type: RarityType.YANG,
    rarity: RarityLevel.MYTHIC,
    description: "Во время действия [Зачарования: Приключение], когда горизонтальные и вертикальные завершающие удары, заряженная атака, боевое мастерство Раскола эгиды и [Удар хвостом: Приключение] поражают врага, можно призвать дух лисы и нанести дополнительный удар. Урон от удара духа лисы увеличен на 200%.",
    for_character: "Тесса",
    effects: [
      {
        id: "fox_spirit_damage_200",
        description: "Увеличивает урон духа лисы на 200%",
        type: ModifierType.PERCENTAGE,
        target: RarityModifierTarget.FOX_SPIRIT_DAMAGE,
        value: 200
      },
      {
        id: "additional_attack_fox",
        description: "Активируется от различных типов атак",
        type: ModifierType.SPECIAL,
        target: RarityModifierTarget.ADDITIONAL_ATTACK,
        value: 1, // Дополнительная атака
        condition: "Зачарование: Приключение активно"
      }
    ],
    cloudinaryId: "nine-tailed-chime-mythic_j8pxhp.png",
  },
  {
    id: "nine-tailed-chime-legendary",
    name: "Колокольчик девятихвостой души",
    type: RarityType.YANG,
    rarity: RarityLevel.LEGENDARY,
    description: "Во время действия [Зачарования: Приключение], когда горизонтальные и вертикальные завершающие удары, заряженная атака, боевое мастерство Раскола эгиды и [Удар хвостом: Приключение] поражают врага, можно призвать дух лисы и нанести дополнительный удар. Урон от удара духа лисы увеличен на 100%.",
    for_character: "Тесса",
    effects: [
      {
        id: "fox_spirit_damage_100",
        description: "Увеличивает урон духа лисы на 100%",
        type: ModifierType.PERCENTAGE,
        target: RarityModifierTarget.FOX_SPIRIT_DAMAGE,
        value: 100
      },
      {
        id: "additional_attack_fox_leg",
        description: "Активируется от различных типов атак",
        type: ModifierType.SPECIAL,
        target: RarityModifierTarget.ADDITIONAL_ATTACK,
        value: 1,
        condition: "Зачарование: Приключение активно"
      }
    ],
    cloudinaryId: "nine-tailed-chime-mythic_j8pxhp.png",
  },
  {
    id: "nine-tailed-chime-epic",
    name: "Колокольчик девятихвостой души",
    type: RarityType.YANG,
    rarity: RarityLevel.EPIC,
    description: "Во время действия [Зачарования: Приключение], когда горизонтальные и вертикальные завершающие удары, заряженная атака, боевое мастерство Раскола эгиды и [Удар хвостом: Приключение] поражают врага, можно призвать дух лисы и нанести дополнительный удар.",
    for_character: "Тесса",
    effects: [
      {
        id: "additional_attack_fox_epic",
        description: "Позволяет призвать дух лисы для дополнительного удара",
        type: ModifierType.SPECIAL,
        target: RarityModifierTarget.ADDITIONAL_ATTACK,
        value: 1,
        condition: "Зачарование: Приключение активно"
      }
    ],
    cloudinaryId: "nine-tailed-chime-mythic_j8pxhp.png",
  },
  
  // Чаша увядшей славы - три варианта редкости (доступны для всех персонажей)
  {
    id: "withered-glory-mythic",
    name: "Чаша увядшей славы",
    type: RarityType.YIN,
    rarity: RarityLevel.MYTHIC,
    description: "Увеличивает урон цветочного взрыва на 50%. Также увеличивает радиус взрыва на 30%.",
    for_character: null, // Убрано ограничение на конкретный персонаж
    effects: [
      {
        id: "flower_explosion_damage_50",
        description: "Увеличивает урон цветочного взрыва на 50%",
        type: ModifierType.PERCENTAGE,
        target: RarityModifierTarget.FLOWER_EXPLOSION_DAMAGE,
        value: 50
      },
      {
        id: "flower_explosion_radius_30",
        description: "Также увеличивает радиус взрыва на 30%",
        type: ModifierType.PERCENTAGE,
        target: RarityModifierTarget.FLOWER_EXPLOSION_RADIUS,
        value: 30
      }
    ],
    cloudinaryId: "withered-glory-mythic_zds2gn.png",
  },
  {
    id: "withered-glory-legendary",
    name: "Чаша увядшей славы",
    type: RarityType.YIN,
    rarity: RarityLevel.LEGENDARY,
    description: "Увеличивает урон цветочного взрыва на 30%. Также увеличивает радиус взрыва на 15%.",
    for_character: null, // Убрано ограничение на конкретный персонаж
    effects: [
      {
        id: "flower_explosion_damage_30",
        description: "Увеличивает урон цветочного взрыва на 30%",
        type: ModifierType.PERCENTAGE,
        target: RarityModifierTarget.FLOWER_EXPLOSION_DAMAGE,
        value: 30
      },
      {
        id: "flower_explosion_radius_15",
        description: "Также увеличивает радиус взрыва на 15%",
        type: ModifierType.PERCENTAGE,
        target: RarityModifierTarget.FLOWER_EXPLOSION_RADIUS,
        value: 15
      }
    ],
    cloudinaryId: "withered-glory-mythic_zds2gn.png",
  },
  {
    id: "withered-glory-epic",
    name: "Чаша увядшей славы",
    type: RarityType.YIN,
    rarity: RarityLevel.EPIC,
    description: "Увеличивает урон цветочного взрыва на 10%.",
    for_character: null, // Убрано ограничение на конкретный персонаж
    effects: [
      {
        id: "flower_explosion_damage_10",
        description: "Увеличивает урон цветочного взрыва на 10%",
        type: ModifierType.PERCENTAGE,
        target: RarityModifierTarget.FLOWER_EXPLOSION_DAMAGE,
        value: 10
      }
    ],
    cloudinaryId: "withered-glory-mythic_zds2gn.png",
  },
  
  // Дополните этот массив своими диковинками при необходимости
];

// Функция для получения цвета диковинки по редкости
export function getRarityColor(rarity) {
  switch (rarity.toLowerCase()) {
    case RarityLevel.MYTHIC:
      return "#990000"; // Приглушенный красный для мифического
    case RarityLevel.LEGENDARY:
      return "#cc6600"; // Приглушенный оранжевый для легендарного
    case RarityLevel.EPIC:
      return "#7a1fa5"; // Приглушенный фиолетовый для эпического
    default:
      return "#555555"; // Темно-серый для обычного
  }
}

// Функция для получения названия редкости
export function getRarityName(rarity) {
  switch (rarity.toLowerCase()) {
    case RarityLevel.MYTHIC:
      return "Мифический";
    case RarityLevel.LEGENDARY:
      return "Легендарный";
    case RarityLevel.EPIC:
      return "Эпический";
    default:
      return "Обычный";
  }
}

// Функция для получения названия типа
export function getRarityTypeName(type) {
  switch (type.toLowerCase()) {
    case RarityType.YIN:
      return "Инь";
    case RarityType.YANG:
      return "Ян";
    default:
      return type;
  }
}

// Функция для получения диковинки по ID
export function getRarityById(id) {
  return raritiesData.find(rarity => rarity.id === id) || null;
}

// Функция для фильтрации диковинок
export function filterRarities({ rarity, type, searchTerm, character }) {
  return raritiesData.filter(item => {
    const matchesRarity = !rarity || rarity === "all" || item.rarity === rarity;
    const matchesType = !type || type === "all" || item.type === type;
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCharacter = !character || 
      !item.for_character || 
      item.for_character === character;
    
    return matchesRarity && matchesType && matchesSearch && matchesCharacter;
  });
}