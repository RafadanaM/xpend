import { ReactNode } from "react";

interface ISummaryCard {
  className?: string;
  title: string;
  children?: ReactNode;
  withButton?: boolean;
  button?: ReactNode;
}

const BaseCard = ({
  className = "",
  title,
  children,
  withButton = false,
  button,
}: ISummaryCard) => {
  return (
    <div
      className={`flex flex-col bg-gradient-to-t from-blue-100 to-white bg-opacity-5 w-full xl:w-124 h-36 sm:h-52 md:h-64 mx-auto md:rounded-lg card-shadow px-1.5 md:px-4 py-1.5 md:py-2.5 border-b border-primary md:border-b-0 ${className}`}
    >
      <div className="border-b border-primary py-1 md:py-2 flex items-center justify-between">
        <h2 className="md:text-2xl font-semibold">{title}</h2>
        {withButton ? button : null}
      </div>
      <div className="w-full h-full ">{children}</div>
    </div>
  );
};

export default BaseCard;
