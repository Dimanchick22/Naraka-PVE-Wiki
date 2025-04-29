// pages/DamageCalculator.jsx

const DamageCalculator = () => {
  return (
    <div className="page-container calculator-container">
      <h1 className="page-title">Калькулятор урона</h1>
      <div className="calculator-card">
        <div className="text-center">
          <div
            className="calculator-icon"
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(139, 0, 0, 0.3)",
              borderRadius: "50%",
              fontSize: "32px",
              fontWeight: "bold",
              color: "var(--naraka-secondary)",
            }}
          >
            К
          </div>
          <h2 className="calculator-title">Калькулятор в разработке</h2>
          <p className="calculator-description">
            Мы работаем над созданием подробного калькулятора урона для Naraka
            Bladepoint PVE. Здесь вы сможете рассчитать оптимальные билды,
            сравнить эффективность различных нефритов и многое другое.
          </p>
          <div className="features-list">
            <h3 className="features-list-title">Планируемые возможности:</h3>
            <ul>
              <li>Выбор персонажа и оружия</li>
              <li>Настройка уровней и характеристик</li>
              <li>Добавление и сравнение нефритов</li>
              <li>Расчет DPS против различных противников</li>
              <li>Сравнение эффективности билдов</li>
              <li>Визуализация результатов</li>
            </ul>
          </div>
          <p
            className="text-center"
            style={{ color: "var(--naraka-secondary)", marginTop: "1rem" }}
          >
            Следите за обновлениями!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DamageCalculator;
