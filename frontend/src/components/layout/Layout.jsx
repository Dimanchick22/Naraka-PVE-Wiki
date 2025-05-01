// components/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../../styles/layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;