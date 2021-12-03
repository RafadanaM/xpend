import SummaryCard from "../components/SummaryCard";

export const Home = () => {
  return (
    <div className="grid grid-cols-2 px-2 md:px-0 py-8 gap-x-10 gap-y-5">
      <SummaryCard className="col-span-2 md:col-span-1" />
      <SummaryCard className="row-start-2 md:row-start-1 col-span-2 md:col-span-1" />
    </div>
  );
};
