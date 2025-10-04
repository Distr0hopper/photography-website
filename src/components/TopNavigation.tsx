import { useNavigate, useLocation } from "react-router-dom";
import TopButtons from "./TopButtons";
import { AppRoutes } from "./routes";

const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { label: "Home", path: AppRoutes.HomePage },
    { label: "About us", path: AppRoutes.AboutPage },
    { label: "Pictures", path: AppRoutes.PicturePage },
    { label: "Travel Routes", path: AppRoutes.RoutesPage },
    { label: "Impressum", path: AppRoutes.ImpressumPage },
  ];

  return (
    // Top navigation with buttons that always stay on top of the page when scrolling
    <header className="flex justify-center items-center sticky top-0 z-50 w-full p-2 bg-[#354f52]/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
      {/* Buttons*/}
      {buttons.map((button) => (
        <TopButtons
          key={button.label}
          isActive={location.pathname === button.path}
          onClick={() => navigate(button.path)}
        >
          {button.label}
        </TopButtons>
      ))}
    </header>
  );
};

export default TopNavigation;
