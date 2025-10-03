import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const TopButtons = ({ children, isActive = false, onClick }: Props) => {
  return (
    <Button
      className={`
        border-0 shadow-transparent transition-colors
        ${
          isActive
            ? "bg-green-800 text-white"
            : "bg-green-900 text-white hover:bg-green-800 hover:text-white"
        }
      `}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default TopButtons;
