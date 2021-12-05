import { useState } from "react";
import { useMatch } from "react-router-dom";
import { ReactComponent as Down } from "../../assets/down.svg";
import { ReactComponent as Up } from "../../assets/up.svg";
import MenuItems from "./MenuItems";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const match = useMatch("/");
  const toggleOpenModal = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div
      className={`relative w-36 h-full flex items-center justify-center ${
        match ? "hidden" : ""
      }`}
    >
      <button onClick={toggleOpenModal} className="w-full">
        {isOpen ? (
          <Up className="w-7 h-7 stroke-current stroke-1 mx-auto" />
        ) : (
          <Down className="w-7 h-7  stroke-current stroke-1 mx-auto" />
        )}
      </button>

      <MenuItems isOpen={isOpen} />
    </div>
  );
};

export default Menu;
