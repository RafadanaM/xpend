import { useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import { ReactComponent as Down } from "../../assets/down.svg";
import { ReactComponent as Up } from "../../assets/up.svg";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import MenuItems from "./MenuItems";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const match = useMatch("/");
  const menuRef = useRef(null);

  useOutsideAlerter(menuRef, () => {
    setIsOpen(false);
  });

  const toggleOpenModal = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div
      ref={menuRef}
      className={`relative w-24 md:w-36 -mx-3 md:mx-0 h-full flex items-center justify-center ${
        match ? "hidden" : ""
      }`}
    >
      <button onClick={toggleOpenModal} className="w-full">
        {isOpen ? (
          <Up className="h-5 w-5 md:w-7 md:h-7 stroke-current stroke-1 mx-auto" />
        ) : (
          <Down className="h-5 w-5 md:w-7 md:h-7 stroke-current stroke-1 mx-auto" />
        )}
      </button>

      <MenuItems isOpen={isOpen} />
    </div>
  );
};

export default Menu;
