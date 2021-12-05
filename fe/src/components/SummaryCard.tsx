import { ReactNode } from "react";

interface ISummaryCard {
  className?: string;
  title: string;
  children?: ReactNode;
}

const SummaryCard = ({ className = "", title, children }: ISummaryCard) => {
  return (
    <div
      className={`flex flex-col bg-secondary w-full xl:w-124 h-36 sm:h-52 md:h-64 mx-auto rounded-lg shadow-lg px-4 py-2.5 ${className}`}
    >
      <div className="border-b border-primary py-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
};

export default SummaryCard;
