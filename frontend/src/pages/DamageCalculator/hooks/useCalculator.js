import { useState, useEffect } from "react";
import { calculateDamage } from "../utils/calculationUtils";
import { DEFAULT_CONSCIOUSNESS, DEFAULT_HERO_LEVEL } from "../constants";

/**
 * Хук для работы с калькулятором урона (убраны дублирующиеся поля)
 * @returns {Object} - Состояние калькулятора и функции управления
 */
export const useCalculator = () => {
  // Основные параметры
  const [consciousness, setConsciousness] = useState(DEFAULT_CONSCIOUSNESS);
  const [heroLevel, setHeroLevel] = useState(DEFAULT_HERO_LEVEL);

  // Базовые таланты
  const [untouchableTalent, setUntouchableTalent] = useState(false);
  const [power, setPower] = useState(false);
  const [iceRoot, setIceRoot] = useState(false);
  const [iceFlash, setIceFlash] = useState(false);

  // Боевые таланты
  const [aromaAura, setAromaAura] = useState(false);
  const [frostBloom, setFrostBloom] = useState(false);
  const [frostSeal, setFrostSeal] = useState(false);
  const [tundraPower, setTundraPower] = useState(false);
  const [frostboundLotus, setFrostboundLotus] = useState(false);
  const [zipingF, setzipingF] = useState(false);
  const [zipingUlt, setZipingUlt] = useState(false);

  // Мультипликаторы
  const [tessaF, setTessaF] = useState(false);
  const [consciousnessMatch, setConsciousnessMatch] = useState(false);
  
  // Диковинки
  const [witheredGlorySnokha, setWitheredGlorySnokha] = useState(false);

  // Параметры нефритов (устанавливаются только через JadesContainer)
  const [jadeAttackBonus, setJadeAttackBonus] = useState(0);
  const [jadeIceExplosionBonus, setJadeIceExplosionBonus] = useState(0);
  const [jadeBossAttackBonus, setJadeBossAttackBonus] = useState(0);
  const [jadeMonsterAttackBonus, setJadeMonsterAttackBonus] = useState(0);

  // Результаты расчетов
  const [results, setResults] = useState(null);

  // Выполнение расчетов при изменении любого параметра
  useEffect(() => {
    performCalculation();
  }, [
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
  ]);

  // Функция для выполнения расчета
  const performCalculation = () => {
    const params = {
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
    };

    // Расчет урона (берем только результаты, без шагов расчета)
    const { results: calculatedResults } = calculateDamage(params);
    setResults(calculatedResults);
  };

  // Функция для сброса параметров к значениям по умолчанию
  const resetAll = () => {
    setConsciousness(DEFAULT_CONSCIOUSNESS);
    setHeroLevel(DEFAULT_HERO_LEVEL);
    setUntouchableTalent(false);
    setPower(false);
    setIceRoot(false);
    setIceFlash(false);
    setZipingUlt(false)
    setAromaAura(false);
    setFrostBloom(false);
    setFrostSeal(false);
    setTundraPower(false);
    setFrostboundLotus(false);
    setzipingF(false)
    setTessaF(false);
    setConsciousnessMatch(false);
    setWitheredGlorySnokha(false);

    // Не сбрасываем параметры нефритов, они управляются компонентом JadesContainer
  };

  return {
    // Состояние параметров
    consciousness,
    setConsciousness,
    heroLevel,
    setHeroLevel,
    untouchableTalent,
    setUntouchableTalent,
    power,
    setPower,
    iceRoot,
    setIceRoot,
    iceFlash,
    setIceFlash,
    zipingUlt,
    setZipingUlt,
    aromaAura,
    setAromaAura,
    frostBloom,
    setFrostBloom,
    frostSeal,
    setFrostSeal,
    tundraPower,
    setTundraPower,
    frostboundLotus,
    setFrostboundLotus,
    zipingF,
    setzipingF,
    tessaF,
    setTessaF,
    consciousnessMatch,
    setConsciousnessMatch,
    witheredGlorySnokha,
    setWitheredGlorySnokha,

    // Параметры нефритов
    jadeAttackBonus,
    setJadeAttackBonus,
    jadeIceExplosionBonus,
    setJadeIceExplosionBonus,
    jadeBossAttackBonus,
    setJadeBossAttackBonus,
    jadeMonsterAttackBonus,
    setJadeMonsterAttackBonus,

    // Результаты расчетов
    results,

    // Функции
    performCalculation,
    resetAll,
  };
};