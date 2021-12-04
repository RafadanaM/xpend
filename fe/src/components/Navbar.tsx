import { Link } from "react-router-dom";
import Menu from "./Menu/Menu";

const Navbar = () => {
  return (
    <nav className="h-16 bg-primary text-white px-3 flex justify-between items-center">
      <Link className="text-3xl font-semibold" to="/">
        <span className="text-accent-orange">X</span>pend
      </Link>
      <Menu />
    </nav>
  );
};

export default Navbar;
