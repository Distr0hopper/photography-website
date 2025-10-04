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
        border-0 shadow-transparent transition-colors h-full text-2xl mx-2
        ${
          isActive
            ? "bg-[#2f3e46] text-white hover:bg-gray-800"
            : "bg-gray-900/0 text-white hover:bg-gray-800 hover:text-white"
        }
      `}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default TopButtons;
