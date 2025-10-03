import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import { AboutPage } from "./pages/AboutPage";
import BackgroundsPage from "./pages/BackgroundsPage";
import HomePage from "./pages/HomePage";
import ImpressumPage from "./pages/ImpressumPage";
import RoutesPage from "./pages/RoutesPage";
import { AppRoutes } from "./components/routes";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <TopNavigation />
      <main>
        <Routes>
          <Route path={AppRoutes.HomePage} element={<HomePage />} />
          <Route path={AppRoutes.AboutPage} element={<AboutPage />} />
          <Route
            path={AppRoutes.BackgroundsPage}
            element={<BackgroundsPage />}
          />
          <Route path={AppRoutes.RoutesPage} element={<RoutesPage />} />
          <Route path={AppRoutes.ImpressumPage} element={<ImpressumPage />} />

          {/* Catch-All Route für 404*/}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
