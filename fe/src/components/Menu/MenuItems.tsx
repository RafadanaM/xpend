import MenuItem from "./MenuItem";
import { ReactComponent as ProfileIcon } from "../../assets/person.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";
import { ReactComponent as HomeIcon } from "../../assets/home.svg";
import useAuth from "../../utils/useAuth";
interface MenuItemsI {
  isOpen: boolean;
  onItemClick: () => void;
}

const MenuItems = ({ isOpen, onItemClick }: MenuItemsI) => {
  const { logout } = useAuth();
  const handleLogout = () => {
    onItemClick();
    logout();
  };
  return (
    <div
      className={`absolute bg-white shadow-lg z-50 w-full left-0 top-full transform origin-top overflow-hidden transition-all duration-200 ${
        isOpen ? "scale-y-100" : "scale-y-0"
      }`}
    >
      <MenuItem
        icon={<HomeIcon className="w-5 h-5" />}
        title="Home"
        url="/home"
        isButton={false}
        onClick={onItemClick}
      />
      <MenuItem
        icon={<ProfileIcon className="w-5 h-5" />}
        title="Profile"
        url="/profile"
        isButton={false}
        onClick={onItemClick}
      />
      <MenuItem
        icon={<LogoutIcon className="w-5 h-5" />}
        title="Logout"
        url="/logout"
        onClick={handleLogout}
      />
    </div>
  );
};

export default MenuItems;
