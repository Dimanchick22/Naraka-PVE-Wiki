// src/data/characterSkills.js

/**
 * Типы эффектов навыков
 */
export const SkillEffectType = {
    ATTACK_BOOST: 'attack_boost',         // Увеличение атаки
    ICE_EXPLOSION_BOOST: 'ice_boost',     // Увеличение урона ледяного взрыва
    DEFENSIVE: 'defensive',               // Защитный эффект
    CROWD_CONTROL: 'crowd_control',       // Контроль толпы
    SUMMON: 'summon',                     // Призыв
    MOBILITY: 'mobility',                 // Мобильность
    DOT: 'dot',                           // Урон со временем
    HEAL: 'heal',                         // Лечение
    BUFF: 'buff',                         // Усиление
    DEBUFF: 'debuff'                      // Ослабление
  };
  
  /**
   * Навыки персонажей с описанием их эффектов для расчета урона
   */
  export const characterSkills = {
    "tian-hai": [
     
    ],
    
    "ziping": [
      {
        name: "Ледяной взрыв",
        description: "Создает область ледяного взрыва, наносящая урон всем врагам в зоне действия.",
        cooldown: "12 секунд",
        effectType: SkillEffectType.ICE_EXPLOSION_BOOST,
        effects: [
          {
            description: "Наносит 220% от базовой атаки в качестве урона",
            value: 100
          }
        ]
      },
      {
        name: "Цветочная магия",
        description: "Призывает ледяной цветок, который взрывается, нанося урон и замедляя врагов.",
        cooldown: "15 секунд",
        effectType: SkillEffectType.ICE_EXPLOSION_BOOST,
        effects: [
          {
            description: "Наносит 180% от базовой атаки в качестве урона",
            value: 180
          },
          {
            description: "Замедляет врагов на 30% на 4 секунды",
            value: 30,
            duration: 4
          },
          {
            description: "Увеличивает урон цветочного взрыва на 25% на 6 секунд",
            value: 25,
            duration: 6
          }
        ]
      },
      {
        name: "Зимняя стужа",
        description: "Пассивный навык, увеличивающий урон ледяных атак при последовательных попаданиях.",
        cooldown: "Пассивный",
        effectType: SkillEffectType.ICE_EXPLOSION_BOOST,
        effects: [
          {
            description: "Каждое попадание увеличивает урон ледяного взрыва на 5%, суммируется до 5 раз",
            value: 5,
            stacks: 5
          }
        ]
      }
    ],
    
    "tessa": [
      {
        name: "Удар хвостом",
        description: "Быстрый удар с возможностью призыва духа лисы для дополнительного урона.",
        cooldown: "10 секунд",
        effectType: SkillEffectType.ATTACK_BOOST,
        effects: [
          {
            description: "Наносит 8% от базовой атаки в качестве урона",
            value: 8
          }
        ]
      }
    ]
  };
  
  /**
   * Получить все навыки персонажа
   * @param {string} characterId - ID персонажа
   * @returns {Array} - Массив навыков персонажа
   */
  export function getCharacterSkills(characterId) {
    return characterSkills[characterId] || [];
  }
  
  /**
   * Получить бонусы к урону от навыков персонажа
   * @param {string} characterId - ID персонажа
   * @returns {Object} - Объект с бонусами к урону
   */
  export function getCharacterDamageBoosts(characterId) {
    const skills = getCharacterSkills(characterId);
    const damageBoosts = {
      attackBoost: 0,
      iceExplosionBoost: 0,
      critRateBoost: 0,
      critDamageBoost: 0
    };
    
    skills.forEach(skill => {
      if (skill.effectType === SkillEffectType.ATTACK_BOOST) {
        // Если навык влияет на атаку, суммируем бонусы
        skill.effects.forEach(effect => {
          if (effect.description.includes('атак')) {
            damageBoosts.attackBoost += effect.value;
          }
        });
      } else if (skill.effectType === SkillEffectType.ICE_EXPLOSION_BOOST) {
        // Если навык влияет на ледяной взрыв, суммируем бонусы
        skill.effects.forEach(effect => {
          if (effect.description.includes('лед')) {
            damageBoosts.iceExplosionBoost += effect.value;
          }
        });
      } else if (skill.effectType === SkillEffectType.BUFF) {
        // Если навык дает бафф, проверяем на криты
        skill.effects.forEach(effect => {
          if (effect.description.includes('критического удара')) {
            damageBoosts.critRateBoost += effect.value;
          }
          if (effect.description.includes('критический урон')) {
            damageBoosts.critDamageBoost += effect.value;
          }
        });
      }
    });
    
    return damageBoosts;
  }