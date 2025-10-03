import { useNavigate, useLocation } from "react-router-dom";
import TopButtons from "./TopButtons";
import { AppRoutes } from "./routes";

const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { label: "Home", path: AppRoutes.HomePage },
    { label: "Über uns", path: AppRoutes.AboutPage },
    { label: "Hintergrundbilder", path: AppRoutes.BackgroundsPage },
    { label: "Reiserouten", path: AppRoutes.RoutesPage },
    { label: "Impressum", path: AppRoutes.ImpressumPage },
  ];

  return (
    <div className="flex justify-center items-center w-full h-10 bg-green-900">
      {buttons.map((button) => (
        <TopButtons
          key={button.label}
          isActive={location.pathname === button.path}
          onClick={() => navigate(button.path)}
        >
          {button.label}
        </TopButtons>
      ))}
    </div>
  );
};

export default TopNavigation;
