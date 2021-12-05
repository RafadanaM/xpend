import { ReactNode } from "react";

interface ISummaryCard {
  className?: string;
  title: string;
  children?: ReactNode;
}

const SummaryCard = ({ className = "", title, children }: ISummaryCard) => {
  return (
    <div
      className={`flex flex-col bg-secondary w-full xl:w-124 h-36 sm:h-52 md:h-64 mx-auto md:rounded-lg md:shadow-lg px-2.5 md:px-4 py-1.5 md:py-2.5 border-b border-accent-grey md:border-b-0 ${className}`}
    >
      <div className="border-b border-primary py-1 md:py-2">
        <h2 className="md:text-2xl font-semibold">{title}</h2>
      </div>
      <div className="overflow-y-auto w-full">{children}</div>
    </div>
  );
};

export default SummaryCard;
