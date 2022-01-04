import { ReactNode } from "react";

interface ModalButtonI extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "normal" | "success" | "cancel";
}

const ModalButton = ({ children, color, ...rest }: ModalButtonI) => {
  const selectedColor = () => {
    switch (color) {
      case "cancel":
        return "bg-red-600";

      case "success":
        return "bg-green-500 ";

      default:
        return "bg-accent-orange";
    }
  };

  return (
    <button
      className={`${selectedColor()} flex-1 px-2 py-1 text-white hover:bg-opacity-75`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ModalButton;
