import React from "react";
import { formatNumber } from "../utils/formatUtils";

/**
 * Улучшенный компонент для отображения итогового урона
 * @param {Object} props - Свойства компонента
 * @param {Object} props.results - Результаты расчетов
 * @returns {JSX.Element | null} - Элемент компонента или null, если нет результатов
 */
const DamageSummary = ({ results }) => {
  if (!results) return null;

  // Получаем процент урона по боссам и монстрам из results напрямую
  const bossDamagePercent = Math.round((results.jadeBossAttackBonus) * 100);
  const monsterDamagePercent = Math.round(results.jadeMonsterAttackBonus * 100);

  // Расчёт урона с оружия (финальная атака * (1 + % урона))
  const bossWeaponDamage = Math.round(results.finalAttack * (1 + results.jadeBossAttackBonus));
  const monsterWeaponDamage = Math.round(results.finalAttack * (1 + results.jadeMonsterAttackBonus));

  return (
    <div className="damage-summary">
      <h2 className="section-title">Итоговый урон</h2>

      <div className="summary-blocks">
        <div className="summary-block boss-damage">
          <h3 className="summary-title">Урон по боссам</h3>

          <div className="summary-item">
            <div className="summary-label">% урона по боссам:</div>
            <div className="summary-value">
              {bossDamagePercent}%
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-label">Атака:</div>
            <div className="summary-value">
              {formatNumber(Math.round(results.finalAttack))}
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-label">Урон с оружия:</div>
            <div className="summary-value">
              {formatNumber(bossWeaponDamage)}
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-label">% лед. взрыва:</div>
            <div className="summary-value">
              {Math.round(results.bossIceExplosionPercent * 100)}%
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-label">Ледяной взрыв:</div>
            <div className="summary-value">
              {formatNumber(Math.round(results.bossDamage))}
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-label">Взрыв цветка:</div>
            <div className="summary-value">
              {formatNumber(Math.round(results.bossFlowerDamage))}
            </div>
          </div>

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
            <div className="summary-label">% урона по монстрам:</div>
            <div className="summary-value">
              {monsterDamagePercent}%
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-label">Атака:</div>
            <div className="summary-value">
              {formatNumber(Math.round(results.finalAttack))}
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-label">Урон с оружия:</div>
            <div className="summary-value">
              {formatNumber(monsterWeaponDamage)}
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-label">% лед. взрыва:</div>
            <div className="summary-value">
              {Math.round(results.monsterIceExplosionPercent * 100)}%
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-label">Ледяной взрыв:</div>
            <div className="summary-value">
              {formatNumber(Math.round(results.monsterDamage))}
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-label">Взрыв цветка:</div>
            <div className="summary-value">
              {formatNumber(Math.round(results.monsterFlowerDamage))}
            </div>
          </div>

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
    </div>
  );
};

export default DamageSummary;