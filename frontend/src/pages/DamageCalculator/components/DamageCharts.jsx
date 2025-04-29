import React from "react";
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
import { formatNumber } from "../utils/formatUtils";

/**
 * Компонент для отображения графиков урона
 * @param {Object} props - Свойства компонента
 * @param {Array} props.chartData - Данные для линейного графика
 * @param {Array} props.comparisonData - Данные для столбчатой диаграммы
 * @returns {JSX.Element} - Элемент компонента
 */
const DamageCharts = ({ chartData, comparisonData }) => {
  return (
    <div className="charts-container">
      <h2 className="section-title">Графики</h2>

      {chartData.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="no-data-message">
          <p>
            Выполните расчет на вкладке "Калькулятор", чтобы увидеть графики.
          </p>
        </div>
      )}
    </div>
  );
};

export default DamageCharts;
