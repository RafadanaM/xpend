import { ReactNode } from "react";

interface IContainer {
  children: ReactNode;
  className?: string;
}
const Container = ({ children, className = '' }: IContainer) => {
  return (
    <div className={`w-full md:w-11/12 max-w-screen-2xl mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
