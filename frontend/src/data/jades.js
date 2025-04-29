// data/jades.js

export const jadesData = [
  // {
  //   id: "iron-heart",
  //   name: "Железное сердце",
  //   type: "defense",
  //   rarity: "epic",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Увеличивает максимальное здоровье на 15% и снижает получаемый урон на 8%.",
  //   description:
  //     "Редкий защитный нефрит, выкованный из метеоритного железа. Чрезвычайно ценится танками и персонажами первой линии.",
  //   stats: {
  //     health_bonus: 15,
  //     damage_reduction: 8,
  //   },
  //   recommended_for: ["tian-hai", "temulch"],
  // },
  // {
  //   id: "guardian-shield",
  //   name: "Щит хранителя",
  //   type: "defense",
  //   rarity: "rare",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "При получении урона есть 20% шанс создать щит, поглощающий до 300 единиц урона в течение 5 секунд.",
  //   description:
  //     "Нефрит, хранящий защитную ауру древних стражей. Активируется в момент опасности, даруя временную неуязвимость.",
  //   stats: {
  //     shield_chance: 20,
  //     shield_amount: 300,
  //     shield_duration: 5,
  //   },
  //   recommended_for: ["tian-hai", "kurumi"],
  // },
  // {
  //   id: "resilience",
  //   name: "Стойкость",
  //   type: "defense",
  //   rarity: "uncommon",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Увеличивает сопротивление к эффектам контроля на 25% и регенерацию здоровья на 10%.",
  //   description:
  //     "Базовый защитный нефрит, улучшающий восстановительные способности организма. Особенно полезен в длительных сражениях.",
  //   stats: {
  //     cc_resistance: 25,
  //     health_regen: 10,
  //   },
  //   recommended_for: ["tian-hai", "kurumi", "temulch"],
  // },
  // {
  //   id: "healing-touch",
  //   name: "Целебное прикосновение",
  //   type: "recovery",
  //   rarity: "legendary",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Увеличивает эффективность исцеления на 25% и дает 15% шанс создать область исцеления при применении лечащей способности.",
  //   description:
  //     "Чрезвычайно редкий нефрит, усиливающий целительные способности. Легенды гласят, что он был создан из слезы богини милосердия.",
  //   stats: {
  //     healing_bonus: 25,
  //     healing_field_chance: 15,
  //   },
  //   recommended_for: ["valda-cui", "kurumi"],
  // },
  // {
  //   id: "energy-flow",
  //   name: "Поток энергии",
  //   type: "recovery",
  //   rarity: "epic",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Восстанавливает 5 единиц энергии каждые 3 секунды и снижает время восстановления способностей на 10%.",
  //   description:
  //     "Редкий нефрит, улучшающий циркуляцию энергии чи в теле, позволяя чаще использовать способности.",
  //   stats: {
  //     energy_regen: 5,
  //     cooldown_reduction: 10,
  //   },
  //   recommended_for: ["valda-cui", "matari", "kurumi"],
  // },
  // {
  //   id: "harmony",
  //   name: "Гармония",
  //   type: "universal",
  //   rarity: "rare",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Увеличивает все характеристики на 5% и дает 10% шанс избежать любого негативного эффекта.",
  //   description:
  //     "Нефрит, созданный для поддержания баланса сил. Придает равномерное усиление всем аспектам боевого мастерства.",
  //   stats: {
  //     all_stats: 5,
  //     negative_effect_resistance: 10,
  //   },
  //   recommended_for: ["valda-cui", "kurumi"],
  // },
  // {
  //   id: "blade-master",
  //   name: "Мастер клинка",
  //   type: "attack",
  //   rarity: "legendary",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Увеличивает урон от оружия ближнего боя на 20% и дает 15% шанс нанести критический удар.",
  //   description:
  //     "Легендарный нефрит, созданный великим мастером оружия. Значительно усиливает боевые навыки владельца.",
  //   stats: {
  //     melee_damage: 20,
  //     crit_chance: 15,
  //   },
  //   recommended_for: ["yueshan", "matari"],
  // },
  // {
  //   id: "swift-strikes",
  //   name: "Стремительные удары",
  //   type: "attack",
  //   rarity: "epic",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Увеличивает скорость атаки на 15% и скорость передвижения на 10% после каждого убийства на 5 секунд.",
  //   description:
  //     "Редкий нефрит, ускоряющий рефлексы и движения. Особенно эффективен для быстрых и маневренных бойцов.",
  //   stats: {
  //     attack_speed: 15,
  //     movement_speed_after_kill: 10,
  //     buff_duration: 5,
  //   },
  //   recommended_for: ["yueshan", "matari"],
  // },
  // {
  //   id: "fury",
  //   name: "Ярость",
  //   type: "attack",
  //   rarity: "uncommon",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Каждая атака увеличивает урон на 2% (складывается до 10 раз). Эффект сбрасывается, если не атаковать в течение 5 секунд.",
  //   description:
  //     "Нефрит, усиливающий агрессию и боевой пыл. Со временем наполняет владельца неудержимой яростью.",
  //   stats: {
  //     damage_per_stack: 2,
  //     max_stacks: 10,
  //     stack_duration: 5,
  //   },
  //   recommended_for: ["yueshan", "temulch"],
  // },
  // {
  //   id: "shadow-walker",
  //   name: "Теневой странник",
  //   type: "attack",
  //   rarity: "legendary",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Невидимость длится на 30% дольше. Атаки из невидимости наносят на 25% больше урона и игнорируют 20% защиты цели.",
  //   description:
  //     "Таинственный нефрит, добытый из глубин Теневого мира. Позволяет владельцу сливаться с тенями и наносить смертельные удары.",
  //   stats: {
  //     stealth_duration: 30,
  //     stealth_damage: 25,
  //     armor_penetration: 20,
  //   },
  //   recommended_for: ["matari"],
  // },
  // {
  //   id: "precision",
  //   name: "Точность",
  //   type: "attack",
  //   rarity: "epic",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Увеличивает шанс критического удара на 15% и урон критических ударов на 30%.",
  //   description:
  //     "Нефрит, усиливающий способность наносить точные и смертоносные удары в жизненно важные точки противника.",
  //   stats: {
  //     crit_chance: 15,
  //     crit_damage: 30,
  //   },
  //   recommended_for: ["matari", "yueshan"],
  // },
  // {
  //   id: "spiritual-power",
  //   name: "Духовная сила",
  //   type: "universal",
  //   rarity: "epic",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Увеличивает урон способностями на 15% и восстанавливает 5% энергии при каждом использовании способности.",
  //   description:
  //     "Нефрит, усиливающий связь владельца с духовным миром. Улучшает магические и мистические способности.",
  //   stats: {
  //     ability_damage: 15,
  //     energy_per_cast: 5,
  //   },
  //   recommended_for: ["kurumi", "valda-cui"],
  // },
  // {
  //   id: "wind-walker",
  //   name: "Ветроход",
  //   type: "universal",
  //   rarity: "epic",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Увеличивает скорость передвижения на 15% и снижает время восстановления способностей передвижения на 20%.",
  //   description:
  //     "Нефрит, наполненный силой ветра. Позволяет владельцу двигаться с невероятной скоростью и маневренностью.",
  //   stats: {
  //     movement_speed: 15,
  //     mobility_cooldown: 20,
  //   },
  //   recommended_for: ["temulch", "matari"],
  // },
  // {
  //   id: "control-master",
  //   name: "Мастер контроля",
  //   type: "universal",
  //   rarity: "rare",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Увеличивает длительность эффектов контроля на 25% и снижает их стоимость энергии на 15%.",
  //   description:
  //     "Нефрит, усиливающий способность управлять полем боя. Особенно ценится специалистами по контролю противников.",
  //   stats: {
  //     cc_duration: 25,
  //     energy_cost: -15,
  //   },
  //   recommended_for: ["temulch", "tian-hai"],
  // },
  // {
  //   id: "endurance",
  //   name: "Выносливость",
  //   type: "defense",
  //   rarity: "uncommon",
  //   thumbnail: null, // Placeholder
  //   effect:
  //     "Снижает расход выносливости на 20% и ускоряет ее восстановление на 15%.",
  //   description:
  //     "Нефрит, улучшающий физическую выносливость. Позволяет владельцу дольше оставаться в бою и быстрее восстанавливать силы.",
  //   stats: {
  //     stamina_consumption: -20,
  //     stamina_regen: 15,
  //   },
  //   recommended_for: ["temulch", "yueshan", "tian-hai"],
  // },
];
