// src/data/jades.js

// Типы модификаторов
export const ModifierType = {
  FLAT: 'flat',           // Прямое добавление (например, +50 к атаке)
  PERCENTAGE: 'percentage', // Процентное увеличение (например, +15% к атаке)
  MULTIPLICATIVE: 'multiplicative', // Множитель (например, x1.2 к итоговому урону)
  SPECIAL: 'special'      // Особый модификатор с собственной логикой
};

// Цели модификаторов
export const ModifierTarget = {
  ATTACK: 'attack',
  ICE_EXPLOSION: 'ice_explosion',
  FLOWER_EXPLOSION: 'flower_explosion',
  BOSS_ATTACK: 'boss_attack',
  MONSTER_ATTACK: 'monster_attack',
  FUSION: 'fusion'
};

// Данные нефритов
export const jadesData = [
  {
    id: "jade_frozen_lotos",
    name: "Морозный лотос",
    type: "attack",
    rarity: "epic",
    thumbnail: null,
    description: "Увеличивает урон на 25%, но одновременно с этим накапливает обморожение в течении 5с",
    stats: [
      {
        id: "frozen_lotos_attack",
        name: "Атака",
        type: ModifierType.PERCENTAGE,
        target: ModifierTarget.ATTACK,
        value: 25,
        condition: null
      }
    ],
    recommended_for: ["tessa"],
  },
  {
    id: "jade_ice_blast",
    name: "Ледяной взрыв",
    type: "ice_explosion",
    rarity: "legendary",
    thumbnail: null,
    description: "Увеличивает урон ледяного взрыва на 30%",
    stats: [
      {
        id: "ice_blast_explosion",
        name: "Лед. взрыв",
        type: ModifierType.PERCENTAGE,
        target: ModifierTarget.ICE_EXPLOSION,
        value: 30,
        condition: null
      }
    ],
    recommended_for: ["ziping"],
  },
  {
    id: "jade_fusion_core",
    name: "Ядро слияния",
    type: "fusion",
    rarity: "epic",
    thumbnail: null,
    description: "Усиливает эффекты других нефритов на 30%",
    stats: [
      {
        id: "fusion_core_stat",
        name: "Слияние",
        type: ModifierType.PERCENTAGE,
        target: ModifierTarget.FUSION,
        value: 30,
        condition: null
      }
    ],
    recommended_for: [],
  },
  {
    id: "jade_boss_hunter",
    name: "Охотник на боссов",
    type: "boss_attack",
    rarity: "legendary",
    thumbnail: null,
    description: "Увеличивает урон по боссам на 20%",
    stats: [
      {
        id: "boss_hunter_stat",
        name: "Атака по боссу",
        type: ModifierType.PERCENTAGE,
        target: ModifierTarget.BOSS_ATTACK,
        value: 20,
        condition: null
      }
    ],
    recommended_for: [],
  },
  {
    id: "jade_monster_slayer",
    name: "Истребитель монстров",
    type: "monster_attack",
    rarity: "epic",
    thumbnail: null,
    description: "Увеличивает урон по обычным монстрам на 15%",
    stats: [
      {
        id: "monster_slayer_stat",
        name: "Атака по монстрам",
        type: ModifierType.PERCENTAGE,
        target: ModifierTarget.MONSTER_ATTACK,
        value: 15,
        condition: null
      }
    ],
    recommended_for: [],
  },
  {
    id: "jade_dual_effect",
    name: "Двойной эффект",
    type: "mixed",
    rarity: "legendary",
    thumbnail: null,
    description: "Увеличивает атаку на 15% и урон ледяного взрыва на 20%",
    stats: [
      {
        id: "dual_effect_attack",
        name: "Атака",
        type: ModifierType.PERCENTAGE,
        target: ModifierTarget.ATTACK,
        value: 15,
        condition: null
      },
      {
        id: "dual_effect_ice",
        name: "Лед. взрыв",
        type: ModifierType.PERCENTAGE,
        target: ModifierTarget.ICE_EXPLOSION,
        value: 20,
        condition: null
      }
    ],
    recommended_for: ["tessa", "ziping"],
  }
];

// Функция для получения иконки нефрита
export function getJadeIcon(jade) {
  // Заглушка, в будущем здесь может быть логика получения иконки
  return null;
}

// Функция для получения цвета нефрита по редкости
export function getJadeRarityColor(rarity) {
  switch (rarity.toLowerCase()) {
    case "legendary":
      return "#ff8000";
    case "epic":
      return "#a335ee";
    case "rare":
      return "#0070dd";
    case "uncommon":
      return "#2dc50e";
    default:
      return "#7e7e7e";
  }
}

// Функция для получения нефрита по ID
export function getJadeById(id) {
  return jadesData.find(jade => jade.id === id) || null;
}

// Функция для фильтрации нефритов
export function filterJades({ rarity, type, searchTerm }) {
  return jadesData.filter(jade => {
    const matchesRarity = !rarity || rarity === "all" || jade.rarity === rarity;
    const matchesType = !type || type === "all" || jade.type === type;
    const matchesSearch = !searchTerm || 
      jade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jade.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRarity && matchesType && matchesSearch;
  });
}