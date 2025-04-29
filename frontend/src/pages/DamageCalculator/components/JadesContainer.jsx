import React, { useState, useEffect } from "react";
import JadeSlot from "./JadeSlot";

// Создаем пустой слот нефрита с 4 пустыми статами
const createEmptyJade = () => ({
  stats: [
    { type: "empty", value: "0" },
    { type: "empty", value: "0" },
    { type: "empty", value: "0" },
    { type: "empty", value: "0" },
  ],
});

/**
 * Компонент контейнера нефритов
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onJadeBonusChange - Функция для обновления бонусов нефритов
 * @returns {JSX.Element} - Элемент компонента
 */
const JadesContainer = ({ onJadeBonusChange }) => {
  // Состояние для 6 нефритов
  const [jades, setJades] = useState([
    createEmptyJade(),
    createEmptyJade(),
    createEmptyJade(),
    createEmptyJade(),
    createEmptyJade(),
    createEmptyJade(),
  ]);

  // Обновляет нефрит по индексу
  const handleJadeChange = (index, updatedJade) => {
    const newJades = [...jades];
    newJades[index] = updatedJade;
    setJades(newJades);
  };

  // Пересчитываем суммарные бонусы от нефритов
  useEffect(() => {
    calculateJadeBonuses(jades);
  }, [jades]);

  /**
   * Расчет бонусов от нефритов
   * @param {Array} jadesList - Список нефритов
   */
  const calculateJadeBonuses = (jadesList) => {
    let attackBonus = 0;
    let iceExplosionBonus = 0;
    let bossAttackBonus = 0;
    let monsterAttackBonus = 0;

    // Сначала рассчитаем множитель слияния для каждого нефрита
    const jadeMultipliers = jadesList.map((jade) => {
      // Собираем базовые статы
      const baseStats = {
        attack: 0,
        ice_explosion: 0,
        boss_attack: 0,
        monster_attack: 0,
      };

      // Общий множитель слияния для этого нефрита
      let fusionMultiplier = 1.0;

      // Вычисляем базовые статы и множитель слияния
      jade.stats.forEach((stat) => {
        if (stat.type === "fusion") {
          fusionMultiplier += parseFloat(stat.value) / 100;
        } else if (stat.type !== "empty") {
          baseStats[stat.type] += parseFloat(stat.value) / 100;
        }
      });

      // Возвращаем объект с базовыми статами и множителем
      return { baseStats, fusionMultiplier };
    });

    // Теперь применим множители к статам и суммируем
    jadeMultipliers.forEach(({ baseStats, fusionMultiplier }) => {
      attackBonus += baseStats.attack * fusionMultiplier;
      iceExplosionBonus += baseStats.ice_explosion * fusionMultiplier;
      bossAttackBonus += baseStats.boss_attack * fusionMultiplier;
      monsterAttackBonus += baseStats.monster_attack * fusionMultiplier;
    });

    // Обновляем общие бонусы от нефритов
    onJadeBonusChange({
      attackBonus,
      iceExplosionBonus,
      bossAttackBonus,
      monsterAttackBonus,
    });
  };

  return (
    <div className="jades-container">
      <h2 className="section-title">Нефриты</h2>
      <div className="jades-list">
        {jades.map((jade, index) => (
          <JadeSlot
            key={index}
            index={index}
            jade={jade}
            onJadeChange={handleJadeChange}
          />
        ))}
      </div>
    </div>
  );
};

export default JadesContainer;
