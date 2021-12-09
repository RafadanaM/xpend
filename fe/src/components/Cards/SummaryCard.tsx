import BaseCard from "./BaseCard";

export const SummaryCard = () => {
  return (
    <BaseCard
      title="Monthly Summary"
      className="col-span-2 md:col-span-1"
    >
      <div className="mt-2 text-sm w-full">
        <p className="font-medium" >Summary</p>
      </div>
    </BaseCard>
  );
};
