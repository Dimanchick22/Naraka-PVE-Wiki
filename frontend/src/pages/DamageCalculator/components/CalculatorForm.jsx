import React from "react";
import FormSection from "./FormSection";

/**
 * Компонент формы калькулятора (удалены поля для ввода бонусов нефритов)
 * @param {Object} props - Свойства компонента
 * @param {Object} props.calculator - Объект состояния калькулятора из хука useCalculator
 * @returns {JSX.Element} - Элемент компонента
 */
const CalculatorForm = ({ calculator }) => {
  const {
    // Параметры
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
    tessaF,
    setTessaF,
    consciousnessMatch,
    setConsciousnessMatch,

    // Действия
    resetAll,
  } = calculator;

  return (
    <div className="calculator-form">
      <FormSection title="Основные параметры">
        <div className="form-group">
          <label htmlFor="consciousness">Сознание:</label>
          <input
            type="number"
            id="consciousness"
            value={consciousness}
            onChange={(e) => setConsciousness(parseInt(e.target.value) || 0)}
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
      </FormSection>

      <FormSection title="Базовые таланты">
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
      </FormSection>

      <FormSection title="Боевые таланты">
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
          <label htmlFor="frostSeal">Морозная печать (+20% к атаке)</label>
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
          <label htmlFor="frostboundLotus">Морозный лотос (+25% к атаке)</label>
        </div>
      </FormSection>

      <FormSection title="Мультипликаторы">
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
      </FormSection>

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={resetAll}>
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;
