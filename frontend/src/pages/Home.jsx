// pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  const featuredSections = [
    {
      title: "Персонажи",
      description:
        "Информация о героях, их способностях и лучших билдах для PVE",
      path: "/characters",
      color: "#1e40af", // Синий
    },
    {
      title: "Нефриты",
      description: "Каталог всех нефритов с подробным описанием их эффектов",
      path: "/jades",
      color: "#15803d", // Зелёный
    },
    {
      title: "Враги",
      description: "Информация о противниках, их атаках и слабых местах",
      path: "/enemies",
      color: "#b91c1c", // Красный
    },
    {
      title: "PVE режимы",
      description: "Подробные гайды по прохождению режимов PVE",
      path: "/pve-modes",
      color: "#7e22ce", // Фиолетовый
    },
    {
      title: "Калькулятор урона",
      description:
        "Инструмент для расчета и оптимизации урона вашего персонажа",
      path: "/damage-calculator",
      color: "#ca8a04", // Жёлтый
    },
    {
      title: "Гайды",
      description:
        "Полезные советы и стратегии для начинающих и опытных игроков",
      path: "/guides",
      color: "#0f766e", // Бирюзовый
    },
  ];

  const latestNews = [
    {
      id: 1,
      title: "Запуск проекта Naraka PVE Wiki",
      date: "25 апреля 2025",
      excerpt:
        "Мы рады сообщить о запуске нашего нового проекта, посвященного PVE режиму в Naraka Bladepoint...",
    },
    {
      id: 2,
      title: "Скоро: Калькулятор урона",
      date: "27 апреля 2025",
      excerpt:
        "Мы работаем над созданием подробного калькулятора урона, который поможет вам оптимизировать ваши билды...",
    },
    {
      id: 3,
      title: "Гайд по новому боссу",
      date: "29 апреля 2025",
      excerpt:
        "Новый босс появился в режиме испытаний! Ознакомьтесь с нашим руководством по его победе...",
    },
  ];

  return (
    <div className="page-container">
      <section className="hero-section">
        <h1 className="hero-title">Naraka Bladepoint PVE Wiki</h1>
        <p className="hero-subtitle">
          Ваш подробный путеводитель по PVE режиму игры Naraka Bladepoint.
          Найдите информацию о персонажах, нефритах, врагах, режимах и
          стратегиях для успешного прохождения.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Link to="/guides/beginner" className="btn btn-primary">
            Гайд для новичков
          </Link>
          <Link to="/damage-calculator" className="btn btn-secondary">
            Калькулятор урона
          </Link>
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title" style={{ textAlign: "center" }}>
          Разделы
        </h2>
        <div className="features-grid">
          {featuredSections.map((section, index) => (
            <Link to={section.path} key={index} className="feature-card">
              <div
                className="feature-icon"
                style={{
                  color: section.color,
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {section.title.charAt(0)}
              </div>
              <h3 className="feature-title">{section.title}</h3>
              <p className="feature-description">{section.description}</p>
              <span className="btn btn-secondary">Перейти</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section latest-news">
        <h2 className="section-title">Последние обновления</h2>
        <div className="card">
          {latestNews.map((news) => (
            <div key={news.id} className="news-item">
              <span className="news-date">{news.date}</span>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-excerpt">{news.excerpt}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
