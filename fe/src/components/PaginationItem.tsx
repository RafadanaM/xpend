import { MouseEventHandler, ReactNode } from "react";

interface PaginationItemI {
  className?: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const PaginationItem = ({ children, className, onClick }: PaginationItemI) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded w-5 h-7 flex items-center justify-center ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default PaginationItem;
