/**
 * Форматирование числа с разделителями
 * @param {number} num - Число для форматирования
 * @returns {string} - Отформатированное число
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

/**
 * Преобразование процентного значения из строки в число
 * @param {string} valueStr - Строка с процентным значением
 * @returns {number} - Число в десятичном формате
 */
export const parsePercentValue = (valueStr) => {
  const value = parseFloat(valueStr);
  return isNaN(value) ? 0 : value / 100;
};

/**
 * Преобразование числа в процентное отображение
 * @param {number} value - Число в десятичном формате
 * @param {number} decimals - Количество знаков после запятой
 * @returns {string} - Строка с процентным форматированием
 */
export const formatPercent = (value, decimals = 2) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Проверяет, существенно ли изменилось значение
 * @param {number} oldValue - Старое значение
 * @param {number} newValue - Новое значение
 * @param {number} threshold - Порог изменения (в процентах)
 * @returns {boolean} - True, если изменение существенно
 */
export const isSignificantChange = (oldValue, newValue, threshold = 5) => {
  if (oldValue === 0) return newValue !== 0;

  const percentChange = Math.abs(((newValue - oldValue) / oldValue) * 100);
  return percentChange >= threshold;
};
