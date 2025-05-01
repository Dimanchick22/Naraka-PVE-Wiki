// pages/About.jsx

const About = () => {
  return (
    <div className="page-container about-container">
      <h1 className="page-title">О проекте</h1>

      <div className="about-section">
        <h2 className="section-title">Naraka PVE Wiki</h2>
        <p>
          Добро пожаловать на Naraka PVE Wiki – ваш надежный источник информации
          о PVE-режиме в игре Naraka Bladepoint. Этот проект создан с целью
          помочь игрокам всех уровней мастерства максимально эффективно
          проходить PVE-режимы, выбирать оптимальные билды и стратегии.
        </p>
        <p>
          Мы собираем и систематизируем информацию об игре на основе личного
          опыта и исследований, чтобы предоставить вам самые актуальные и
          полезные руководства.
        </p>
      </div>

      <div className="about-section">
        <h2 className="section-title">Наши цели</h2>
        <ul>
          <li>
            Создать самую полную базу знаний по PVE-режиму Naraka Bladepoint
          </li>
          <li>Помогать новичкам быстрее освоиться в игре</li>
          <li>
            Предоставлять продвинутым игрокам детальную информацию для
            оптимизации билдов
          </li>
          <li>Создать сообщество игроков для обмена опытом и стратегиями</li>
          <li>
            Разработать полезные инструменты, такие как калькулятор урона, для
            планирования билдов
          </li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="section-title">О разработчике</h2>
        <div className="team-member">
          <div className="team-member-avatar"></div>
          <div className="team-member-info">
            <h3 className="team-member-name">ChillGuy</h3>
            <p className="team-member-role">
              Full-stack разработчик & энтузиаст Naraka Bladepoint
            </p>
            <p>
              Я опытный игрок в Naraka Bladepoint, увлеченный PVE-режимом. Мой
              опыт в программировании и страсть к игре вдохновили меня на
              создание этого ресурса, чтобы помочь другим игрокам. Сайт
              разработан с использованием React для фронтенда и Go для бэкенда,
              чтобы обеспечить быструю и эффективную работу.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Планы на будущее</h2>
        <p>
          Проект находится в активной разработке. В ближайшее время планируется:
        </p>
        <ul>
          <li>
            Запуск полноценного калькулятора урона с возможностью сохранения и
            сравнения билдов
          </li>
          <li>Расширение базы данных персонажей, нефритов и врагов</li>
          <li>Добавление интерактивных карт для PVE-режимов</li>
          <li>Создание форума для обсуждения стратегий и обмена опытом</li>
          <li>Интеграция с API игры (при наличии такой возможности)</li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="section-title">Связь</h2>
        <p>
          Если у вас есть вопросы, предложения или вы хотите внести свой вклад в
          развитие проекта, не стесняйтесь связаться со мной через:
        </p>
        <ul>
          <li>Email: contact@naraka-pve-wiki.com</li>
          <li>Discord: NarakaPVEGuide#1234</li>
          <li>GitHub: github.com/naraka-pve-wiki</li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="section-title">Благодарности</h2>
        <p>
          Особая благодарность всем игрокам, которые делятся своим опытом и
          помогают развивать проект. Также спасибо разработчикам Naraka
          Bladepoint за создание такой увлекательной игры.
        </p>
        <p>
          Все торговые марки, упомянутые на сайте, принадлежат их законным
          владельцам. Naraka Bladepoint является интеллектуальной собственностью
          24 Entertainment.
        </p>
      </div>
    </div>
  );
};

export default About;
