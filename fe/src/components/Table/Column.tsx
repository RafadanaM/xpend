import { ReactNode } from "react";

interface ColumnI {
  children: ReactNode;
  className?: string;
}

export const Column = ({ children, className = "" }: ColumnI) => {
  return (
    <td className={`border p-3 border-accent-grey ${className}`}>{children}</td>
  );
};
