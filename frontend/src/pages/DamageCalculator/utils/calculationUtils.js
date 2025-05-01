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
 * @param {boolean} zipingF - Включен ли талант "F Цзыпин"
 * @returns {number} - Боевой бонус атаки
 */
export const calculateCombatAttackBonus = (
  baseBonus,
  aromaAura,
  frostSeal,
  tundraPower,
  frostboundLotus,
  zipingF
) => {
  let bonus = baseBonus;

  if (aromaAura) bonus += TALENT_VALUES.aroma_aura;
  if (frostSeal) bonus += TALENT_VALUES.frost_seal;
  if (tundraPower) bonus += TALENT_VALUES.tundra_power;
  if (frostboundLotus) bonus += TALENT_VALUES.frostbound_lotus;
  if (zipingF) bonus += TALENT_VALUES.ziping_f;

  return bonus;
};

/**
 * Расчет процента ледяного взрыва
 * @param {boolean} iceRoot - Включен ли талант "Ледяной корень"
 * @param {boolean} iceFlash - Включен ли талант "Ледяная вспышка"
 * @param {number} jadeIceExplosionBonus - Бонус ледяного взрыва от нефритов
 * @param {boolean} frostBloom - Включен ли талант "Морозный цветок"
 * @param {boolean} zipingUlt
 * @returns {number} - Процент ледяного взрыва
 */
export const calculateIceExplosionPercent = (
  iceRoot,
  iceFlash,
  jadeIceExplosionBonus,
  frostBloom,
  zipingUlt,
) => {
  let percent = 1.0;

  if (iceRoot) percent += TALENT_VALUES.ice_root;
  if (iceFlash) percent += TALENT_VALUES.ice_flash;
  if (frostBloom) percent += TALENT_VALUES.frost_bloom;
  if (zipingUlt) percent += TALENT_VALUES.ziping_ult;

  percent += jadeIceExplosionBonus;


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
    zipingUlt,
    aromaAura,
    frostBloom,
    frostSeal,
    tundraPower,
    frostboundLotus,
    zipingF,
    tessaF,
    consciousnessMatch,
    witheredGlorySnokha,
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
    false,
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
    zipingF,
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
    zipingUlt,
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

  // 11. Получаем множитель для урона цветка от диковинки
  const flowerBonusMultiplier = witheredGlorySnokha ? TALENT_VALUES.withered_glory_snokha : 0;
  steps.push({
    title: "Бонус цветочного взрыва от Снохи увядшей славы",
    value: flowerBonusMultiplier.toFixed(2),
  });
  
  // Расчет урона взрыва цветка с учетом диковинки
  const flowerExplosionPercent = 1 * (1 + flowerBonusMultiplier) + (finalIceExplosionPercent - 1);
  steps.push({
    title: "Процент цветочного взрыва с диковинкой",
    value: flowerExplosionPercent.toFixed(2),
  });
  
  const flowerExplosionDamage =
    finalAttack * flowerExplosionPercent * FLOWER_EXPLOSION_COEF;
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

  // Расчет урона взрыва цветка по боссам с учетом диковинки
  const bossFlowerExplosionPercent = 1 * (1 + bossAttackBonus + flowerBonusMultiplier) + (finalIceExplosionPercent - 1);
  steps.push({
    title: "Процент цветочного взрыва по боссам с диковинкой",
    value: bossFlowerExplosionPercent.toFixed(2),
  });
  
  const bossFlowerDamage =
    finalAttack * bossFlowerExplosionPercent * FLOWER_EXPLOSION_COEF;
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

  // Расчет урона взрыва цветка по монстрам с учетом диковинки
  const monsterFlowerExplosionPercent = 1 * (1 + monsterAttackBonus + flowerBonusMultiplier) + (finalIceExplosionPercent - 1);
  steps.push({
    title: "Процент цветочного взрыва по монстрам с диковинкой",
    value: monsterFlowerExplosionPercent.toFixed(2),
  });
  
  const monsterFlowerDamage =
    finalAttack * monsterFlowerExplosionPercent * FLOWER_EXPLOSION_COEF;
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
      flowerExplosionPercent,
      bossDamage,
      bossFlowerDamage,
      bossFlowerExplosionPercent,
      monsterDamage,
      monsterFlowerDamage,
      monsterFlowerExplosionPercent,
      bossTotalJadeDamage,
      monsterTotalJadeDamage,
      bossIceExplosionPercent,
      monsterIceExplosionPercent,
      jadeMonsterAttackBonus,
      jadeBossAttackBonus,
      witheredGlorySnokhaBonus: flowerBonusMultiplier,
    },
    steps,
  };
};