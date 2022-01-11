import { ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";

interface MenuItemI {
  icon: ReactNode;
  title: string;
  isButton?: boolean;
  url?: string;
  onClick?: () => void;
}
const MenuItem = ({
  icon,
  title,
  isButton = true,
  url = "",
  onClick,
}: MenuItemI) => {
  const match = useMatch(`/${title.toLowerCase()}`);
  return isButton ? (
    <button
      onClick={onClick}
      className="w-full flex gap-x-3 text-sm md:text-base items-center p-2 bg-opacity-100 transition-all duration-300 bg-accent-orange hover:bg-opacity-75"
    >
      {icon}
      <span>{title}</span>
    </button>
  ) : (
    <Link
      className={`w-full flex gap-x-3 text-sm md:text-base items-center p-2 bg-opacity-100 transition-all duration-300 bg-accent-orange hover:bg-opacity-75 ${
        match ? "hidden" : ""
      }`}
      to={url}
      onClick={onClick}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};

export default MenuItem;
