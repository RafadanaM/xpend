import { ReactChild } from "react";

interface IContainer {
  children: ReactChild;
}
const Container = ({ children }: IContainer) => {
  return (
    <div className="w-full h-full md:w-11/12 max-w-screen-2xl mx-auto ">
      {children}
    </div>
  );
};

export default Container;
