// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Jades from "./pages/Jades";
import JadeDetail from "./pages/JadeDetail";
import Rarities from "./pages/Rarities"; // New component for Rarities
import Enemies from "./pages/Enemies";
import EnemyDetail from "./pages/EnemyDetail";
import PveModes from "./pages/PveModes";
import DamageCalculator from "./pages/DamageCalculator.jsx";
import DamageCalculatorv1 from "./pages/DamageCalculator/index.jsx";
import Guides from "./pages/Guides";
import About from "./pages/About";

// Импортируем стили
import "./styles/index.css";
import "./styles/layout.css";
import "./styles/pages.css";
import "./styles/components.css";
import "./styles/damageCalculator.css"; // Обновленные стили калькулятора
import "./styles/jadeGrid.css";         // Стили для сетки нефритов
import "./styles/customSelect.css";     // Стили для кастомного селекта
import "./styles/tabbedCalculator.css"; // Новые стили для калькулятора с вкладками

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="characters" element={<Characters />} />
          <Route path="characters/:characterId" element={<CharacterDetail />} />
          <Route path="jades" element={<Jades />} />
          <Route path="jades/:jadeId" element={<JadeDetail />} />
          <Route path="rarities" element={<Rarities />} />
          <Route path="enemies" element={<Enemies />} />
          <Route path="enemies/:enemyId" element={<EnemyDetail />} />
          <Route path="pve-modes" element={<PveModes />} />
          <Route path="damage-calculator" element={<DamageCalculator />} />
          <Route path="damage-calculatorv1" element={<DamageCalculatorv1 />} />
          <Route path="guides" element={<Guides />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;