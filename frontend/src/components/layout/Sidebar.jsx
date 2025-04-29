// components/layout/Sidebar.jsx
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const sidebarItems = [
    { name: "Персонажи", path: "/characters" },
    { name: "Нефриты", path: "/jades" },
    { name: "Враги", path: "/enemies" },
    { name: "PVE режимы", path: "/pve-modes" },
    { name: "Калькулятор урона", path: "/damage-calculator" },
    { name: "Гайды", path: "/guides" },
    { name: "О проекте", path: "/about" },
  ];

  // Определяем подразделы в зависимости от текущего пути
  const getSubItems = (path) => {
    switch (path) {
      case "/characters":
        return [
          { name: "Тянь Хай", path: "/characters/tian-hai" },
          { name: "Валда Цуй", path: "/characters/valda-cui" },
          { name: "Юши Каданоджи", path: "/characters/yueshan" },
          // Добавьте других персонажей
        ];
      case "/jades":
        return [
          { name: "Атакующие", path: "/jades/attack" },
          { name: "Защитные", path: "/jades/defense" },
          { name: "Восстановление", path: "/jades/recovery" },
          { name: "Универсальные", path: "/jades/universal" },
        ];
      case "/enemies":
        return [
          { name: "Обычные враги", path: "/enemies/regular" },
          { name: "Элитные враги", path: "/enemies/elite" },
          { name: "Боссы", path: "/enemies/bosses" },
        ];
      case "/pve-modes":
        return [
          { name: "Обычный режим", path: "/pve-modes/regular" },
          { name: "Продвинутый режим", path: "/pve-modes/advanced" },
          { name: "Режим испытания", path: "/pve-modes/trial" },
        ];
      case "/guides":
        return [
          { name: "Для новичков", path: "/guides/beginner" },
          { name: "Продвинутые", path: "/guides/advanced" },
          { name: "Советы и хитрости", path: "/guides/tips" },
        ];
      default:
        return [];
    }
  };

  // Получаем подразделы для текущего пути
  const currentPath = `/${location.pathname.split("/")[1]}`;
  const subItems = getSubItems(currentPath);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-toggle">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="sidebar-toggle-button"
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-nav-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-nav-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {!isCollapsed && subItems.length > 0 && (
          <div className="sidebar-subnav">
            <h3 className="sidebar-subnav-heading">Подразделы</h3>
            <ul className="sidebar-subnav-list">
              {subItems.map((subItem) => (
                <li key={subItem.path}>
                  <NavLink
                    to={subItem.path}
                    className={({ isActive }) =>
                      `sidebar-subnav-item ${isActive ? "active" : ""}`
                    }
                  >
                    {subItem.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
