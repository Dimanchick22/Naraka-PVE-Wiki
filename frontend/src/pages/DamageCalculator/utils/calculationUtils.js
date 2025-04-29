// Утилиты для расчетов калькулятора урона
import {
  BASE_ATTACK,
  EXPLOSION_COEF,
  FLOWER_EXPLOSION_COEF,
  JADE_FIRST_BLAST_MULTIPLIER,
  JADE_OTHER_BLAST_MULTIPLIER,
  HERO_LEVEL_ATTACK_BONUS,
  TALENT_VALUES,
} from "../constants";

/**
 * Расчет бонуса уровня героя
 * @param {number} level - Уровень героя
 * @returns {number} - Бонус от уровня героя
 */
export const calculateHeroLevelBonus = (level) => {
  let bonus = 0.0;
  for (const [lvl, value] of Object.entries(HERO_LEVEL_ATTACK_BONUS)) {
    if (level >= parseInt(lvl)) {
      bonus += value;
    }
  }
  return bonus;
};

/**
 * Расчет базового бонуса атаки
 * @param {number} heroLevel - Уровень героя
 * @param {boolean} untouchableTalent - Включен ли талант "Неприкасаемый"
 * @param {boolean} power - Включен ли талант "Сила"
 * @param {number} jadeAttackBonus - Бонус атаки от нефритов
 * @returns {number} - Базовый бонус атаки
 */
export const calculateBaseAttackBonus = (
  heroLevel,
  untouchableTalent,
  power,
  jadeAttackBonus,
) => {
  let bonus = 1.0 + calculateHeroLevelBonus(heroLevel);

  if (untouchableTalent) bonus += TALENT_VALUES.untouchable_talent;
  if (power) bonus += TALENT_VALUES.power;

  bonus += jadeAttackBonus;

  return bonus;
};

/**
 * Расчет боевого бонуса атаки
 * @param {number} baseBonus - Базовый бонус атаки
 * @param {boolean} aromaAura - Включен ли талант "Аромат ауры"
 * @param {boolean} frostSeal - Включен ли талант "Морозная печать"
 * @param {boolean} tundraPower - Включен ли талант "Сила тундры"
 * @param {boolean} frostboundLotus - Включен ли талант "Морозный лотос"
 * @returns {number} - Боевой бонус атаки
 */
export const calculateCombatAttackBonus = (
  baseBonus,
  aromaAura,
  frostSeal,
  tundraPower,
  frostboundLotus,
) => {
  let bonus = baseBonus;

  if (aromaAura) bonus += TALENT_VALUES.aroma_aura;
  if (frostSeal) bonus += TALENT_VALUES.frost_seal;
  if (tundraPower) bonus += TALENT_VALUES.tundra_power;
  if (frostboundLotus) bonus += TALENT_VALUES.frostbound_lotus;

  return bonus;
};

/**
 * Расчет процента ледяного взрыва
 * @param {boolean} iceRoot - Включен ли талант "Ледяной корень"
 * @param {boolean} iceFlash - Включен ли талант "Ледяная вспышка"
 * @param {number} jadeIceExplosionBonus - Бонус ледяного взрыва от нефритов
 * @param {boolean} frostBloom - Включен ли талант "Морозный цветок"
 * @returns {number} - Процент ледяного взрыва
 */
export const calculateIceExplosionPercent = (
  iceRoot,
  iceFlash,
  jadeIceExplosionBonus,
  frostBloom,
) => {
  let percent = 1.0;

  if (iceRoot) percent += TALENT_VALUES.ice_root;
  if (iceFlash) percent += TALENT_VALUES.ice_flash;

  percent += jadeIceExplosionBonus;

  if (frostBloom) percent += TALENT_VALUES.frost_bloom;

  return percent;
};

/**
 * Основная функция расчета урона
 * @param {Object} params - Входные параметры для расчета
 * @returns {Object} - Результаты расчета и шаги
 */
export const calculateDamage = (params) => {
  const {
    consciousness,
    heroLevel,
    untouchableTalent,
    power,
    iceRoot,
    iceFlash,
    aromaAura,
    frostBloom,
    frostSeal,
    tundraPower,
    frostboundLotus,
    tessaF,
    consciousnessMatch,
    jadeAttackBonus,
    jadeIceExplosionBonus,
    jadeBossAttackBonus,
    jadeMonsterAttackBonus,
  } = params;

  // Массив для хранения шагов расчета
  const steps = [];

  // 1. Расчет бонуса уровня героя
  const heroLevelBonus = calculateHeroLevelBonus(heroLevel);
  steps.push({
    title: "Расчет бонуса уровня героя",
    value: heroLevelBonus.toFixed(2),
  });

  // 2. Базовые расчеты
  const baseAttackBonus = calculateBaseAttackBonus(
    heroLevel,
    untouchableTalent,
    power,
    jadeAttackBonus,
  );
  steps.push({
    title: "Расчет бонуса базовой атаки",
    value: baseAttackBonus.toFixed(2),
  });

  // 3. Расчет базовой атаки
  const baseAttack = (BASE_ATTACK + consciousness / 10) * baseAttackBonus;
  steps.push({ title: "Расчет базовой атаки", value: baseAttack.toFixed(2) });

  // 4. Расчет базового процента ледяного взрыва
  const baseIceExplosionPercent = calculateIceExplosionPercent(
    iceRoot,
    iceFlash,
    jadeIceExplosionBonus,
    false, // frostBloom еще не применяется
  );
  steps.push({
    title: "Расчет базового процента ледяного взрыва",
    value: baseIceExplosionPercent.toFixed(2),
  });

  // 5. Расчет боевых параметров
  const combatAttackBonus = calculateCombatAttackBonus(
    baseAttackBonus,
    aromaAura,
    frostSeal,
    tundraPower,
    frostboundLotus,
  );
  steps.push({
    title: "Расчет боевого бонуса атаки",
    value: combatAttackBonus.toFixed(2),
  });

  // 6. Применение мультипликаторов
  const tessaMultiplier = tessaF ? TALENT_VALUES.tessa_f : 1.0;
  const consciousnessMultiplier = consciousnessMatch
    ? TALENT_VALUES.consciousness_match
    : 1.0;
  steps.push({
    title: "Мультипликатор Тессы",
    value: tessaMultiplier.toFixed(2),
  });
  steps.push({
    title: "Мультипликатор совпадения сознания",
    value: consciousnessMultiplier.toFixed(2),
  });

  // 7. Расчет финальной атаки
  const finalAttack =
    (BASE_ATTACK + consciousness / 10) *
    combatAttackBonus *
    tessaMultiplier *
    consciousnessMultiplier;
  steps.push({
    title: "Расчет финальной атаки",
    value: finalAttack.toFixed(2),
  });

  // 8. Расчет физического урона
  const physicalDamage = finalAttack;
  steps.push({
    title: "Расчет физического урона",
    value: physicalDamage.toFixed(2),
  });

  // 9. Расчет финального процента ледяного взрыва
  const finalIceExplosionPercent = calculateIceExplosionPercent(
    iceRoot,
    iceFlash,
    jadeIceExplosionBonus,
    frostBloom,
  );
  steps.push({
    title: "Расчет финального процента ледяного взрыва",
    value: finalIceExplosionPercent.toFixed(2),
  });

  // 10. Расчет урона ледяного взрыва
  const iceExplosionDamage =
    finalAttack * finalIceExplosionPercent * EXPLOSION_COEF;
  steps.push({
    title: "Расчет урона ледяного взрыва",
    value: iceExplosionDamage.toFixed(2),
  });

  // 11. Расчет урона взрыва цветка
  const flowerExplosionDamage =
    finalAttack * finalIceExplosionPercent * FLOWER_EXPLOSION_COEF;
  steps.push({
    title: "Расчет урона взрыва цветка",
    value: flowerExplosionDamage.toFixed(2),
  });

  // 12. Расчеты для боссов
  const bossAttackBonus = jadeBossAttackBonus;
  steps.push({
    title: "Бонус атаки по боссам",
    value: bossAttackBonus.toFixed(2),
  });

  const bossIceExplosionPercent =
    1 * (1 + bossAttackBonus) + (finalIceExplosionPercent - 1);
  steps.push({
    title: "Процент ледяного взрыва по боссам",
    value: bossIceExplosionPercent.toFixed(2),
  });

  const bossDamage = finalAttack * bossIceExplosionPercent * EXPLOSION_COEF;
  steps.push({
    title: "Урон ледяного взрыва по боссам",
    value: bossDamage.toFixed(2),
  });

  const bossFlowerDamage =
    finalAttack * bossIceExplosionPercent * FLOWER_EXPLOSION_COEF;
  steps.push({
    title: "Урон взрыва цветка по боссам",
    value: bossFlowerDamage.toFixed(2),
  });

  // 13. Расчеты для монстров
  const monsterAttackBonus = jadeMonsterAttackBonus;
  steps.push({
    title: "Бонус атаки по монстрам",
    value: monsterAttackBonus.toFixed(2),
  });

  const monsterIceExplosionPercent =
    1 * (1 + monsterAttackBonus) + (finalIceExplosionPercent - 1);
  steps.push({
    title: "Процент ледяного взрыва по монстрам",
    value: monsterIceExplosionPercent.toFixed(2),
  });

  const monsterDamage =
    finalAttack * monsterIceExplosionPercent * EXPLOSION_COEF;
  steps.push({
    title: "Урон ледяного взрыва по монстрам",
    value: monsterDamage.toFixed(2),
  });

  const monsterFlowerDamage =
    finalAttack * monsterIceExplosionPercent * FLOWER_EXPLOSION_COEF;
  steps.push({
    title: "Урон взрыва цветка по монстрам",
    value: monsterFlowerDamage.toFixed(2),
  });

  // 14. Расчет урона нефрита (3 взрыва) - по боссам
  const bossFirstBlast = Math.round(
    finalAttack *
      bossIceExplosionPercent *
      EXPLOSION_COEF *
      JADE_FIRST_BLAST_MULTIPLIER,
  );
  const bossSecondBlast = Math.round(
    finalAttack *
      bossIceExplosionPercent *
      EXPLOSION_COEF *
      JADE_OTHER_BLAST_MULTIPLIER,
  );
  const bossThirdBlast = bossSecondBlast; // Идентичен второму
  const bossTotalJadeDamage = bossFirstBlast + bossSecondBlast + bossThirdBlast;

  steps.push({
    title: "Урон первого взрыва нефрита по боссам",
    value: bossFirstBlast,
  });
  steps.push({
    title: "Урон второго взрыва нефрита по боссам",
    value: bossSecondBlast,
  });
  steps.push({
    title: "Урон третьего взрыва нефрита по боссам",
    value: bossThirdBlast,
  });
  steps.push({
    title: "Общий урон нефрита по боссам",
    value: bossTotalJadeDamage,
  });

  // 15. Расчет урона нефрита (3 взрыва) - по монстрам
  const monsterFirstBlast = Math.round(
    finalAttack *
      monsterIceExplosionPercent *
      EXPLOSION_COEF *
      JADE_FIRST_BLAST_MULTIPLIER,
  );
  const monsterSecondBlast = Math.round(
    finalAttack *
      monsterIceExplosionPercent *
      EXPLOSION_COEF *
      JADE_OTHER_BLAST_MULTIPLIER,
  );
  const monsterThirdBlast = monsterSecondBlast; // Идентичен второму
  const monsterTotalJadeDamage =
    monsterFirstBlast + monsterSecondBlast + monsterThirdBlast;

  steps.push({
    title: "Урон первого взрыва нефрита по монстрам",
    value: monsterFirstBlast,
  });
  steps.push({
    title: "Урон второго взрыва нефрита по монстрам",
    value: monsterSecondBlast,
  });
  steps.push({
    title: "Урон третьего взрыва нефрита по монстрам",
    value: monsterThirdBlast,
  });
  steps.push({
    title: "Общий урон нефрита по монстрам",
    value: monsterTotalJadeDamage,
  });

  // Возвращаем результаты расчетов и шаги
  return {
    results: {
      baseAttack,
      finalAttack,
      physicalDamage,
      iceExplosionDamage,
      flowerExplosionDamage,
      bossDamage,
      bossFlowerDamage,
      monsterDamage,
      monsterFlowerDamage,
      bossTotalJadeDamage,
      monsterTotalJadeDamage,
      bossIceExplosionPercent,
      monsterIceExplosionPercent,
    },
    steps,
  };
};

/**
 * Генерация данных для графика зависимости урона от сознания
 * @param {number} finalAttack - Финальная атака
 * @param {number} bossIceExplosionPercent - Процент ледяного взрыва по боссам
 * @param {number} monsterIceExplosionPercent - Процент ледяного взрыва по монстрам
 * @param {Object} params - Параметры персонажа
 * @returns {Array} - Данные для графика
 */
export const generateChartData = (
  finalAttack,
  bossIceExplosionPercent,
  monsterIceExplosionPercent,
  params,
) => {
  const data = [];
  const icePercent = calculateIceExplosionPercent(
    params.iceRoot,
    params.iceFlash,
    params.jadeIceExplosionBonus,
    params.frostBloom,
  );

  // Генерация данных по сознанию
  for (let c = 1000; c <= 1500; c += 50) {
    const baseAttack = BASE_ATTACK + c / 10;
    const combatBonus = calculateCombatAttackBonus(
      calculateBaseAttackBonus(
        params.heroLevel,
        params.untouchableTalent,
        params.power,
        params.jadeAttackBonus,
      ),
      params.aromaAura,
      params.frostSeal,
      params.tundraPower,
      params.frostboundLotus,
    );

    const fa =
      baseAttack *
      combatBonus *
      (params.tessaF ? TALENT_VALUES.tessa_f : 1.0) *
      (params.consciousnessMatch ? TALENT_VALUES.consciousness_match : 1.0);

    data.push({
      consciousness: c,
      attack: Math.round(fa),
      normalDamage: Math.round(fa * icePercent * EXPLOSION_COEF),
      bossDamage: Math.round(fa * bossIceExplosionPercent * EXPLOSION_COEF),
      monsterDamage: Math.round(
        fa * monsterIceExplosionPercent * EXPLOSION_COEF,
      ),
    });
  }

  return data;
};

/**
 * Генерация данных для сравнения урона по типам противников
 * @param {number} normal - Обычный урон
 * @param {number} boss - Урон по боссам
 * @param {number} monster - Урон по монстрам
 * @param {number} flowerNormal - Урон взрыва цветка
 * @param {number} flowerBoss - Урон взрыва цветка по боссам
 * @param {number} flowerMonster - Урон взрыва цветка по монстрам
 * @returns {Array} - Данные для графика
 */
export const generateComparisonData = (
  normal,
  boss,
  monster,
  flowerNormal,
  flowerBoss,
  flowerMonster,
) => {
  return [
    {
      name: "Обычный урон",
      explosion: Math.round(normal),
      flower: Math.round(flowerNormal),
    },
    {
      name: "Урон по боссам",
      explosion: Math.round(boss),
      flower: Math.round(flowerBoss),
    },
    {
      name: "Урон по монстрам",
      explosion: Math.round(monster),
      flower: Math.round(flowerMonster),
    },
  ];
};
