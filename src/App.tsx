import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import AboutPage from "./pages/AboutPage";
import BackgroundsPage from "./pages/BackgroundsPage";
import HomePage from "./pages/HomePage";
import ImpressumPage from "./pages/ImpressumPage";
import RoutesPage from "./pages/RoutesPage";

function App() {
  return (
    <Router>
      <TopNavigation />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/backgrounds" element={<BackgroundsPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
