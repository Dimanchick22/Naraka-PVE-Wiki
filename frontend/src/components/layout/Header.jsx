// components/layout/Header.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Главная", path: "/" },
    { name: "Персонажи", path: "/characters" },
    { name: "Нефриты", path: "/jades" },
    { name: "Диковинки", path: "/rarities" },
    { name: "Враги", path: "/enemies" },
    { name: "PVE режимы", path: "/pve-modes" },
    { name: "Калькулятор урона", path: "/damage-calculator" },
    { name: "Калькулятор урона", path: "/damage-calculatorv1" },
    { name: "Гайды", path: "/guides" },
    { name: "О проекте", path: "/about" },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-container">
          <Link to="/" className="header-brand">
            <span className="header-brand-text">Naraka PVE Wiki</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            <ul className="header-nav-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "header-nav-link active" : "header-nav-link"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="header-menu-button"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="header-mobile-nav">
            <ul className="header-mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "header-nav-link active" : "header-nav-link"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;