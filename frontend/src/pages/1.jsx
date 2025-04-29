// pages/DamageCalculator.jsx
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import "../styles/damageCalculator.css";

const DamageCalculator = () => {
  // Константы из документации
  const BASE_ATTACK = 140;
  const EXPLOSION_COEF = 4.06;
  const FLOWER_EXPLOSION_COEF = 4.97;
  const JADE_FIRST_BLAST_MULTIPLIER = 0.55;
  const JADE_OTHER_BLAST_MULTIPLIER = 0.569;
  const DEFAULT_CONSCIOUSNESS = 1120;
  const DEFAULT_HERO_LEVEL = 20;

  const HERO_LEVEL_ATTACK_BONUS = {
    10: 0.03,
    12: 0.03,
    16: 0.03,
    20: 0.03,
  };

  const TALENT_VALUES = {
    untouchable_talent: 0.08,
    power: 0.045,
    ice_root: 0.4,
    ice_flash: 0.35,
    aroma_aura: 0.1,
    frost_seal: 0.2,
    tundra_power: 0.15,
    frostbound_lotus: 0.25,
    frost_bloom: 0.45,
    tessa_f: 1.08,
    consciousness_match: 1.15,
  };

  // Состояния для входных параметров
  const [consciousness, setConsciousness] = useState(DEFAULT_CONSCIOUSNESS);
  const [heroLevel, setHeroLevel] = useState(DEFAULT_HERO_LEVEL);

  // Базовые параметры
  const [untouchableTalent, setUntouchableTalent] = useState(false);
  const [power, setPower] = useState(false);
  const [iceRoot, setIceRoot] = useState(false);
  const [iceFlash, setIceFlash] = useState(false);

  // Боевые параметры
  const [aromaAura, setAromaAura] = useState(false);
  const [frostBloom, setFrostBloom] = useState(false);
  const [frostSeal, setFrostSeal] = useState(false);
  const [tundraPower, setTundraPower] = useState(false);
  const [frostboundLotus, setFrostboundLotus] = useState(false);
  const [tessaF, setTessaF] = useState(false);
  const [consciousnessMatch, setConsciousnessMatch] = useState(false);

  // Параметры нефритов
  const [jadeAttackBonus, setJadeAttackBonus] = useState(0);
  const [jadeIceExplosionBonus, setJadeIceExplosionBonus] = useState(0);
  const [jadeBossAttackBonus, setJadeBossAttackBonus] = useState(0);
  const [jadeMonsterAttackBonus, setJadeMonsterAttackBonus] = useState(0);

  // Результаты расчетов
  const [calculationResults, setCalculationResults] = useState(null);
  const [calculationSteps, setCalculationSteps] = useState([]);

  // Вкладки калькулятора
  const [activeTab, setActiveTab] = useState("calculator"); // "calculator", "stats", "charts"

  // Данные для графиков
  const [chartData, setChartData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  // Эффект для расчета при изменении параметров
  useEffect(() => {
    calculateDamage();
  }, [
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
  ]);

  // Функция для расчета бонуса уровня героя
  const calculateHeroLevelBonus = (level) => {
    let bonus = 0.0;
    for (const [lvl, value] of Object.entries(HERO_LEVEL_ATTACK_BONUS)) {
      if (level >= parseInt(lvl)) {
        bonus += value;
      }
    }
    return bonus;
  };

  // Основная функция расчета урона
  const calculateDamage = () => {
    // Очистка шагов расчета
    const steps = [];

    // 1. Расчет бонуса уровня героя
    const heroLevelBonus = calculateHeroLevelBonus(heroLevel);
    steps.push({
      title: "Расчет бонуса уровня героя",
      value: heroLevelBonus.toFixed(2),
    });

    // 2. Базовые расчеты
    let baseAttackBonus = 1.0 + heroLevelBonus;
    if (untouchableTalent) baseAttackBonus += TALENT_VALUES.untouchable_talent;
    if (power) baseAttackBonus += TALENT_VALUES.power;
    baseAttackBonus += jadeAttackBonus;
    steps.push({
      title: "Расчет бонуса базовой атаки",
      value: baseAttackBonus.toFixed(2),
    });

    // 3. Расчет базовой атаки
    const baseAttack = (BASE_ATTACK + consciousness / 10) * baseAttackBonus;
    steps.push({ title: "Расчет базовой атаки", value: baseAttack.toFixed(2) });

    // 4. Расчет базового процента ледяного взрыва
    let baseIceExplosionPercent = 1.0;
    if (iceRoot) baseIceExplosionPercent += TALENT_VALUES.ice_root;
    if (iceFlash) baseIceExplosionPercent += TALENT_VALUES.ice_flash;
    baseIceExplosionPercent += jadeIceExplosionBonus;
    steps.push({
      title: "Расчет базового процента ледяного взрыва",
      value: baseIceExplosionPercent.toFixed(2),
    });

    // 5. Расчет боевых параметров
    let combatAttackBonus = baseAttackBonus;
    if (aromaAura) combatAttackBonus += TALENT_VALUES.aroma_aura;
    if (frostSeal) combatAttackBonus += TALENT_VALUES.frost_seal;
    if (tundraPower) combatAttackBonus += TALENT_VALUES.tundra_power;
    if (frostboundLotus) combatAttackBonus += TALENT_VALUES.frostbound_lotus;
    steps.push({
      title: "Расчет боевого бонуса атаки",
      value: combatAttackBonus.toFixed(2),
    });

    // 6. Применение мультипликаторов
    let tessaMultiplier = tessaF ? TALENT_VALUES.tessa_f : 1.0;
    let consciousnessMultiplier = consciousnessMatch
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
    let finalIceExplosionPercent = baseIceExplosionPercent;
    if (frostBloom) finalIceExplosionPercent += TALENT_VALUES.frost_bloom;
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
    const bossTotalJadeDamage =
      bossFirstBlast + bossSecondBlast + bossThirdBlast;

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

    // Сохранение результатов
    setCalculationSteps(steps);
    setCalculationResults({
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
    });

    // Генерация данных для графиков
    generateChartData(
      finalAttack,
      bossIceExplosionPercent,
      monsterIceExplosionPercent,
    );
    generateComparisonData(
      iceExplosionDamage,
      bossDamage,
      monsterDamage,
      flowerExplosionDamage,
      bossFlowerDamage,
      monsterFlowerDamage,
    );
  };

  // Функция для генерации данных графика
  const generateChartData = (
    finalAttack,
    bossIceExplosionPercent,
    monsterIceExplosionPercent,
  ) => {
    const data = [];

    // Генерация данных по сознанию
    for (let c = 1000; c <= 1500; c += 50) {
      const baseAttack = BASE_ATTACK + c / 10;
      const fa =
        baseAttack *
        combatAttackBonus() *
        (tessaF ? TALENT_VALUES.tessa_f : 1.0) *
        (consciousnessMatch ? TALENT_VALUES.consciousness_match : 1.0);

      data.push({
        consciousness: c,
        attack: Math.round(fa),
        normalDamage: Math.round(fa * iceExplosionPercent() * EXPLOSION_COEF),
        bossDamage: Math.round(fa * bossIceExplosionPercent * EXPLOSION_COEF),
        monsterDamage: Math.round(
          fa * monsterIceExplosionPercent * EXPLOSION_COEF,
        ),
      });
    }

    setChartData(data);
  };

  // Функция для генерации данных для сравнения
  const generateComparisonData = (
    normal,
    boss,
    monster,
    flowerNormal,
    flowerBoss,
    flowerMonster,
  ) => {
    const data = [
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

    setComparisonData(data);
  };

  // Вспомогательные функции для расчетов
  const baseAttackBonus = () => {
    let bonus = 1.0 + calculateHeroLevelBonus(heroLevel);
    if (untouchableTalent) bonus += TALENT_VALUES.untouchable_talent;
    if (power) bonus += TALENT_VALUES.power;
    bonus += jadeAttackBonus;
    return bonus;
  };

  const combatAttackBonus = () => {
    let bonus = baseAttackBonus();
    if (aromaAura) bonus += TALENT_VALUES.aroma_aura;
    if (frostSeal) bonus += TALENT_VALUES.frost_seal;
    if (tundraPower) bonus += TALENT_VALUES.tundra_power;
    if (frostboundLotus) bonus += TALENT_VALUES.frostbound_lotus;
    return bonus;
  };

  const iceExplosionPercent = () => {
    let percent = 1.0;
    if (iceRoot) percent += TALENT_VALUES.ice_root;
    if (iceFlash) percent += TALENT_VALUES.ice_flash;
    percent += jadeIceExplosionBonus;
    if (frostBloom) percent += TALENT_VALUES.frost_bloom;
    return percent;
  };

  // Форматирование числа с разделителями
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Функция для обработки изменения численных полей
  const handleNumericInput = (setter) => (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setter(value);
    } else if (e.target.value === "") {
      setter(0);
    }
  };

  // Функция для обработки изменения процентных полей
  const handlePercentInput = (setter) => (e) => {
    const value = parseFloat(e.target.value) / 100;
    if (!isNaN(value)) {
      setter(value);
    } else if (e.target.value === "") {
      setter(0);
    }
  };

  // Сброс всех параметров к значениям по умолчанию
  const resetAll = () => {
    setConsciousness(DEFAULT_CONSCIOUSNESS);
    setHeroLevel(DEFAULT_HERO_LEVEL);
    setUntouchableTalent(false);
    setPower(false);
    setIceRoot(false);
    setIceFlash(false);
    setAromaAura(false);
    setFrostBloom(false);
    setFrostSeal(false);
    setTundraPower(false);
    setFrostboundLotus(false);
    setTessaF(false);
    setConsciousnessMatch(false);
    setJadeAttackBonus(0);
    setJadeIceExplosionBonus(0);
    setJadeBossAttackBonus(0);
    setJadeMonsterAttackBonus(0);
  };

  return (
    <div className="page-container calculator-page">
      <h1 className="page-title">Калькулятор урона</h1>

      <div className="section-description">
        <p>
          Этот калькулятор позволяет рассчитать урон на основе различных
          параметров персонажа, талантов и нефритов. Используйте его для
          оптимизации своего билда и достижения максимальной эффективности в
          PVE-режиме.
        </p>
      </div>

      <div className="calculator-tabs">
        <button
          className={`tab-button ${activeTab === "calculator" ? "active" : ""}`}
          onClick={() => setActiveTab("calculator")}
        >
          Калькулятор
        </button>
        <button
          className={`tab-button ${activeTab === "stats" ? "active" : ""}`}
          onClick={() => setActiveTab("stats")}
        >
          Подробные расчеты
        </button>
        <button
          className={`tab-button ${activeTab === "charts" ? "active" : ""}`}
          onClick={() => setActiveTab("charts")}
        >
          Графики
        </button>
      </div>

      {activeTab === "calculator" && (
        <div className="calculator-container">
          <div className="calculator-form">
            <div className="form-section">
              <h2 className="section-title">Основные параметры</h2>
              <div className="form-group">
                <label htmlFor="consciousness">Сознание:</label>
                <input
                  type="number"
                  id="consciousness"
                  value={consciousness}
                  onChange={(e) =>
                    setConsciousness(parseInt(e.target.value) || 0)
                  }
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="heroLevel">Уровень героя:</label>
                <input
                  type="number"
                  id="heroLevel"
                  value={heroLevel}
                  onChange={(e) => setHeroLevel(parseInt(e.target.value) || 0)}
                  min="1"
                  max="20"
                />
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Базовые таланты</h2>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="untouchableTalent"
                  checked={untouchableTalent}
                  onChange={() => setUntouchableTalent(!untouchableTalent)}
                />
                <label htmlFor="untouchableTalent">
                  Неприкасаемый талант (+8% к атаке)
                </label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="power"
                  checked={power}
                  onChange={() => setPower(!power)}
                />
                <label htmlFor="power">Сила (+4.5% к атаке)</label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="iceRoot"
                  checked={iceRoot}
                  onChange={() => setIceRoot(!iceRoot)}
                />
                <label htmlFor="iceRoot">
                  Ледяной корень (+40% к ледяному взрыву)
                </label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="iceFlash"
                  checked={iceFlash}
                  onChange={() => setIceFlash(!iceFlash)}
                />
                <label htmlFor="iceFlash">
                  Ледяная вспышка (+35% к ледяному взрыву)
                </label>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Боевые таланты</h2>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="aromaAura"
                  checked={aromaAura}
                  onChange={() => setAromaAura(!aromaAura)}
                />
                <label htmlFor="aromaAura">Аромат ауры (+10% к атаке)</label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="frostBloom"
                  checked={frostBloom}
                  onChange={() => setFrostBloom(!frostBloom)}
                />
                <label htmlFor="frostBloom">
                  Морозный цветок (+45% к ледяному взрыву)
                </label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="frostSeal"
                  checked={frostSeal}
                  onChange={() => setFrostSeal(!frostSeal)}
                />
                <label htmlFor="frostSeal">
                  Морозная печать (+20% к атаке)
                </label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="tundraPower"
                  checked={tundraPower}
                  onChange={() => setTundraPower(!tundraPower)}
                />
                <label htmlFor="tundraPower">Сила тундры (+15% к атаке)</label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="frostboundLotus"
                  checked={frostboundLotus}
                  onChange={() => setFrostboundLotus(!frostboundLotus)}
                />
                <label htmlFor="frostboundLotus">
                  Морозный лотос (+25% к атаке)
                </label>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Мультипликаторы</h2>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="tessaF"
                  checked={tessaF}
                  onChange={() => setTessaF(!tessaF)}
                />
                <label htmlFor="tessaF">Тесса (+8% мультипликатор)</label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="consciousnessMatch"
                  checked={consciousnessMatch}
                  onChange={() => setConsciousnessMatch(!consciousnessMatch)}
                />
                <label htmlFor="consciousnessMatch">
                  Совпадение сознания (+15% мультипликатор)
                </label>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Бонусы от нефритов</h2>
              <div className="form-group">
                <label htmlFor="jadeAttackBonus">Бонус атаки:</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    id="jadeAttackBonus"
                    value={jadeAttackBonus * 100}
                    onChange={handlePercentInput(setJadeAttackBonus)}
                    min="0"
                    step="1"
                  />
                  <span className="input-suffix">%</span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="jadeIceExplosionBonus">
                  Бонус ледяного взрыва:
                </label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    id="jadeIceExplosionBonus"
                    value={jadeIceExplosionBonus * 100}
                    onChange={handlePercentInput(setJadeIceExplosionBonus)}
                    min="0"
                    step="1"
                  />
                  <span className="input-suffix">%</span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="jadeBossAttackBonus">
                  Бонус атаки по боссам:
                </label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    id="jadeBossAttackBonus"
                    value={jadeBossAttackBonus * 100}
                    onChange={handlePercentInput(setJadeBossAttackBonus)}
                    min="0"
                    step="1"
                  />
                  <span className="input-suffix">%</span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="jadeMonsterAttackBonus">
                  Бонус атаки по монстрам:
                </label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    id="jadeMonsterAttackBonus"
                    value={jadeMonsterAttackBonus * 100}
                    onChange={handlePercentInput(setJadeMonsterAttackBonus)}
                    min="0"
                    step="1"
                  />
                  <span className="input-suffix">%</span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={calculateDamage}>
                Рассчитать
              </button>
              <button className="btn btn-secondary" onClick={resetAll}>
                Сбросить
              </button>
            </div>
          </div>

          {calculationResults && (
            <div className="results-container">
              <h2 className="section-title">Результаты расчетов</h2>

              <div className="results-grid">
                <div className="results-summary">
                  <div className="summary-row">
                    <span className="summary-label">Атака:</span>
                    <span className="summary-value">
                      {formatNumber(Math.round(calculationResults.finalAttack))}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Мультипликаторы:</span>
                    <span className="summary-value">
                      {tessaF ? "Тесса (×1.08)" : ""}
                      {tessaF && consciousnessMatch ? ", " : ""}
                      {consciousnessMatch ? "Сознание (×1.15)" : ""}
                      {!tessaF && !consciousnessMatch ? "Нет" : ""}
                    </span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row">
                    <span className="summary-label">
                      Общий урон нефрита (боссы):
                    </span>
                    <span className="summary-value highlight">
                      {formatNumber(calculationResults.bossTotalJadeDamage)}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">
                      Общий урон нефрита (монстры):
                    </span>
                    <span className="summary-value highlight">
                      {formatNumber(calculationResults.monsterTotalJadeDamage)}
                    </span>
                  </div>
                </div>

                <div className="result-card">
                  <h3>Атака</h3>
                  <p className="value">
                    {formatNumber(Math.round(calculationResults.finalAttack))}
                  </p>
                  <p className="label">
                    Базовая атака:{" "}
                    {formatNumber(Math.round(calculationResults.baseAttack))}
                  </p>
                </div>

                <div className="result-card">
                  <h3>Обычный урон</h3>
                  <p className="value">
                    {formatNumber(
                      Math.round(calculationResults.iceExplosionDamage),
                    )}
                  </p>
                  <p className="label">Ледяной взрыв</p>
                </div>

                <div className="result-card">
                  <h3>Урон по боссам</h3>
                  <p className="value">
                    {formatNumber(Math.round(calculationResults.bossDamage))}
                  </p>
                  <p className="label">Ледяной взрыв</p>
                </div>

                <div className="result-card">
                  <h3>Урон по монстрам</h3>
                  <p className="value">
                    {formatNumber(Math.round(calculationResults.monsterDamage))}
                  </p>
                  <p className="label">Ледяной взрыв</p>
                </div>

                <div className="result-card">
                  <h3>Взрыв цветка</h3>
                  <p className="value">
                    {formatNumber(
                      Math.round(calculationResults.flowerExplosionDamage),
                    )}
                  </p>
                  <p className="label">Обычный урон</p>
                </div>

                <div className="result-card">
                  <h3>Взрыв цветка (боссы)</h3>
                  <p className="value">
                    {formatNumber(
                      Math.round(calculationResults.bossFlowerDamage),
                    )}
                  </p>
                  <p className="label">Урон по боссам</p>
                </div>

                <div className="result-card">
                  <h3>Взрыв цветка (монстры)</h3>
                  <p className="value">
                    {formatNumber(
                      Math.round(calculationResults.monsterFlowerDamage),
                    )}
                  </p>
                  <p className="label">Урон по монстрам</p>
                </div>

                <div className="result-card highlight">
                  <h3>Урон нефрита (общий)</h3>
                  <p className="value">
                    {formatNumber(calculationResults.bossTotalJadeDamage)}
                  </p>
                  <p className="label">По боссам (3 взрыва)</p>
                </div>

                <div className="result-card highlight">
                  <h3>Урон нефрита (общий)</h3>
                  <p className="value">
                    {formatNumber(calculationResults.monsterTotalJadeDamage)}
                  </p>
                  <p className="label">По монстрам (3 взрыва)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "stats" && (
        <div className="stats-container">
          <h2 className="section-title">Подробные расчеты</h2>

          {calculationSteps.length > 0 ? (
            <div className="calculation-steps">
              <table className="steps-table">
                <thead>
                  <tr>
                    <th>Параметр</th>
                    <th>Значение</th>
                  </tr>
                </thead>
                <tbody>
                  {calculationSteps.map((step, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "even-row" : "odd-row"}
                    >
                      <td>{step.title}</td>
                      <td>{step.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data-message">
              <p>
                Выполните расчет на вкладке "Калькулятор", чтобы увидеть
                подробности.
              </p>
            </div>
          )}

          <div className="formula-section">
            <h3>Основные формулы расчета</h3>
            <div className="formula-card">
              <h4>Базовая атака</h4>
              <p className="formula">
                базовая_атака = (140 + (сознание/10)) × бонус_базовой_атаки
              </p>
              <p className="formula-explanation">
                где бонус_базовой_атаки = 1.0 + бонус_уровня_героя +
                бонусы_талантов + бонус_атаки_нефрита
              </p>
            </div>

            <div className="formula-card">
              <h4>Финальная атака</h4>
              <p className="formula">
                финальная_атака = (140 + (сознание/10)) × боевой_бонус_атаки ×
                мультипликатор_тессы × мультипликатор_совпадения_сознания
              </p>
            </div>

            <div className="formula-card">
              <h4>Урон ледяного взрыва</h4>
              <p className="formula">
                урон_ледяного_взрыва = финальная_атака ×
                финальный_процент_ледяного_взрыва × 4.06
              </p>
            </div>

            <div className="formula-card">
              <h4>Урон взрыва цветка</h4>
              <p className="formula">
                урон_взрыва_цветка = финальная_атака ×
                финальный_процент_ледяного_взрыва × 4.97
              </p>
            </div>

            <div className="formula-card">
              <h4>Урон по боссам</h4>
              <p className="formula">
                процент_ледяного_взрыва_по_боссам = (1 × (1 +
                бонус_атаки_по_боссам)) + (финальный_процент_ледяного_взрыва -
                1)
              </p>
              <p className="formula">
                урон_по_боссам = финальная_атака ×
                процент_ледяного_взрыва_по_боссам × 4.06
              </p>
            </div>

            <div className="formula-card">
              <h4>Урон нефрита (3 взрыва)</h4>
              <p className="formula">
                урон_первого_взрыва = round(финальная_атака ×
                процент_ледяного_взрыва × 4.06 × 0.55)
              </p>
              <p className="formula">
                урон_второго_взрыва = round(финальная_атака ×
                процент_ледяного_взрыва × 4.06 × 0.569)
              </p>
              <p className="formula">
                урон_третьего_взрыва = урон_второго_взрыва
              </p>
              <p className="formula">
                общий_урон_нефрита = урон_первого_взрыва + урон_второго_взрыва +
                урон_третьего_взрыва
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "charts" && calculationResults && (
        <div className="charts-container">
          <h2 className="section-title">Графики</h2>

          <div className="chart-section">
            <h3>Влияние сознания на урон</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="consciousness"
                    label={{
                      value: "Сознание",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Урон",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="attack"
                    name="Атака"
                    stroke="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="normalDamage"
                    name="Обычный урон"
                    stroke="#82ca9d"
                  />
                  <Line
                    type="monotone"
                    dataKey="bossDamage"
                    name="Урон по боссам"
                    stroke="#ff8042"
                  />
                  <Line
                    type="monotone"
                    dataKey="monsterDamage"
                    name="Урон по монстрам"
                    stroke="#ff4242"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-section">
            <h3>Сравнение урона по типам противников</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Legend />
                  <Bar
                    dataKey="explosion"
                    name="Ледяной взрыв"
                    fill="#8884d8"
                  />
                  <Bar dataKey="flower" name="Взрыв цветка" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {!chartData.length && (
            <div className="no-data-message">
              <p>
                Выполните расчет на вкладке "Калькулятор", чтобы увидеть
                графики.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DamageCalculator;
