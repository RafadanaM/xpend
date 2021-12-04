import SummaryCard from "../components/SummaryCard";
import { Table } from "../components/Table/Table";

export const Home = () => {
  return (
    <div className="grid grid-cols-2 px-2 md:px-0 py-8 gap-x-10 gap-y-10">
      <SummaryCard className="col-span-2 md:col-span-1" />
      <SummaryCard className="row-start-2 md:row-start-1 col-span-2 md:col-span-1" />
      <Table />
    </div>
  );
};
