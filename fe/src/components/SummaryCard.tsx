interface ISummaryCard {
  className?: string;
}

const SummaryCard = ({ className = "" }: ISummaryCard) => {
  return (
    <div
      className={`flex flex-col bg-secondary w-full xl:w-124 h-36 sm:h-52 md:h-64 mx-auto rounded-lg shadow-lg p-2.5 ${className}`}
    >
      <div>Title</div>
    </div>
  );
};

export default SummaryCard;
