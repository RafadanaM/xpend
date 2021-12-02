import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-16 bg-primary text-white px-3 py-1 flex items-center">
      <Link className="text-3xl font-semibold" to="/">
        <span className="text-accent-orange">X</span>pend
      </Link>
    </nav>
  );
};

export default Navbar;
