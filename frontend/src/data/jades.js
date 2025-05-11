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
    rarity: "legendary",
    thumbnail: null,
    description: "После поподания [Удара лотоса] Увеличивает урон на 25%, но одновременно с этим накапливает обморожение в течении 5с",
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
    description: "Увеличивает урон ледяного взрыва на 35%, уменьшает перезарядку 33% и снижает минимальное значение обморожения на 450",
    stats: [
      {
        id: "ice_blast_explosion",
        name: "Лед. взрыв",
        type: ModifierType.PERCENTAGE,
        target: ModifierTarget.ICE_EXPLOSION,
        value: 35,
        condition: null
      }
    ],
    recommended_for: ["ziping"],
  },
  {
    id: "successive_ice_blast",
    name: "Непрерывный ледяной взрыв",
    type: null,
    rarity: "legendary",
    thumbnail: null,
    description: "Ледяеной взрыв сработает 3 раза, но урон от каждого взрыва будет уменьшен на 45%",
    stats: null,
    recommended_for: [],
  },
  {
    id: "elemental_lotus",
    name: "Элементальный лотас",
    type: null,
    rarity: "legendary",
    thumbnail: null,
    description: "Призывает лотасы на 16с которые крутятся вокруг вас и наносят урон врагам, максимальное значение лотасов 4",
    stats: null,
    recommended_for: [],
  },
  {
    id: "ghastbloom",
    name: "Финальное цвеетение",
    type: null,
    rarity: "legendary",
    thumbnail: null,
    description: "Призывает [Цветочные взрывы] когда лотас исчезает или когда лотасы превышают максимальное значение",
    stats: null,
    recommended_for: [],
  },
  {
    id: "thundra_might",
    name: "Мощь тундры",
    type: "attack",
    rarity: "epic",
    thumbnail: null,
    description: "Увеличивает атаку на 15% и накопление ледяного взрыва на 45% на 5с каждый раз когда вы накапливаете обморожение",
    stats: [
      {
        id: "thundra_might_attack",
        name: "Атака",
        type: ModifierType.PERCENTAGE,
        target: ModifierTarget.ATTACK,
        value: 15,
        condition: null
      }
    ],
    recommended_for: ["tessa", "ziping"],
  },
  {
    id: "sub-zero_seal",
    name: "Морозная печать",
    type: "attack",
    rarity: "epic",
    thumbnail: null,
    description: "При здоровье больше 50% Увеличивает атаку на 20%, но одновременно у владельца непрерывно накапливается обморожение",
    stats: [
      {
        id: "sub-zero_seal_attack",
        name: "Атака",
        type: ModifierType.PERCENTAGE,
        target: ModifierTarget.ATTACK,
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