import MenuItem from "./MenuItem";
import { ReactComponent as ProfileIcon } from "../../assets/person.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";
import { ReactComponent as HomeIcon } from "../../assets/home.svg";
interface MenuItemsI {
  isOpen: boolean;
}

const MenuItems = ({ isOpen }: MenuItemsI) => {
  const handleLogout = () => {
    console.log("logout is clicked");
  };
  return (
    <div
      className={`absolute bg-white shadow-lg z-50 w-full left-0 top-full transform origin-top overflow-hidden transition-all duration-200 ${
        isOpen ? "scale-y-100 translate-y-1 opacity-100" : "scale-y-0 opacity-0"
      }`}
    >
      <MenuItem
        icon={<HomeIcon className="w-5 h-5" />}
        title="Home"
        url="/home"
        isButton={false}
      />
      <MenuItem
        icon={<ProfileIcon className="w-5 h-5" />}
        title="Profile"
        url="/profile"
        isButton={false}
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
