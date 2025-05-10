// components/layout/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-brand-title">Naraka PVE Wiki</h3>
            <p className="footer-brand-subtitle">
              Ваш путеводитель по PVE режиму игры Naraka Bladepoint
            </p>
          </div>

          <nav className="footer-nav">
            <Link to="/" className="header-nav-link">
              Главная
            </Link>
            <Link to="/about" className="header-nav-link">
              О проекте
            </Link>
            <Link to="/guides" className="header-nav-link">
              Гайды
            </Link>
            <Link to="/damage-calculator" className="header-nav-link">
              Калькулятор урона
            </Link>
          </nav>
        </div>

        <div className="footer-copyright">
          <p>&copy; {currentYear} Naraka PVE Wiki. Все права защищены.</p>
          <p className="mt-1">
            Naraka Bladepoint является товарным знаком и интеллектуальной
            собственностью 24 Entertainment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;