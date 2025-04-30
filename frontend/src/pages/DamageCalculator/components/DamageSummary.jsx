import React from "react";
import { formatNumber } from "../utils/formatUtils";

/**
 * Компонент для отображения итогового урона (переработанная версия)
 * @param {Object} props - Свойства компонента
 * @param {Object} props.results - Результаты расчетов
 * @returns {JSX.Element | null} - Элемент компонента или null, если нет результатов
 */
const DamageSummary = ({ results }) => {
  if (!results) return null;

  return (
    <div className="damage-summary">
      <h2 className="section-title">Итоговый урон</h2>

      <div className="summary-blocks">
        <div className="summary-block boss-damage">
          <h3 className="summary-title">Урон по боссам</h3>

          <div className="summary-item">
            <div className="summary-label">Урон нефрита (общий):</div>
            <div className="summary-value highlight">
              {formatNumber(results.bossTotalJadeDamage)}
            </div>
          </div>

          <div className="summary-details">
            <div className="detail-item">
              <span className="detail-label">Первый взрыв:</span>
              <span className="detail-value">
                {formatNumber(
                  Math.round(
                    results.finalAttack *
                      results.bossIceExplosionPercent *
                      4.06 *
                      0.55,
                  ),
                )}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Второй взрыв:</span>
              <span className="detail-value">
                {formatNumber(
                  Math.round(
                    results.finalAttack *
                      results.bossIceExplosionPercent *
                      4.06 *
                      0.569,
                  ),
                )}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Третий взрыв:</span>
              <span className="detail-value">
                {formatNumber(
                  Math.round(
                    results.finalAttack *
                      results.bossIceExplosionPercent *
                      4.06 *
                      0.569,
                  ),
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="summary-block monster-damage">
          <h3 className="summary-title">Урон по монстрам</h3>

          <div className="summary-item">
            <div className="summary-label">Урон нефрита (общий):</div>
            <div className="summary-value highlight">
              {formatNumber(results.monsterTotalJadeDamage)}
            </div>
          </div>

          <div className="summary-details">
            <div className="detail-item">
              <span className="detail-label">Первый взрыв:</span>
              <span className="detail-value">
                {formatNumber(
                  Math.round(
                    results.finalAttack *
                      results.monsterIceExplosionPercent *
                      4.06 *
                      0.55,
                  ),
                )}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Второй взрыв:</span>
              <span className="detail-value">
                {formatNumber(
                  Math.round(
                    results.finalAttack *
                      results.monsterIceExplosionPercent *
                      4.06 *
                      0.569,
                  ),
                )}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Третий взрыв:</span>
              <span className="detail-value">
                {formatNumber(
                  Math.round(
                    results.finalAttack *
                      results.monsterIceExplosionPercent *
                      4.06 *
                      0.569,
                  ),
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-info">
        <div className="info-item">
          <span className="info-label">Атака:</span>
          <span className="info-value">
            {formatNumber(Math.round(results.finalAttack))}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Ледяной взрыв:</span>
          <span className="info-value">
            {formatNumber(Math.round(results.iceExplosionDamage))}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Взрыв цветка:</span>
          <span className="info-value">
            {formatNumber(Math.round(results.flowerExplosionDamage))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DamageSummary;
