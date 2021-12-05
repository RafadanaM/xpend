import SummaryCard from "../components/SummaryCard";
import { Table } from "../components/Table/Table";

export const Home = () => {
  return (
    <div className="grid grid-cols-2 px-2 md:px-0 py-8 gap-x-10 gap-y-10">
      <SummaryCard
        title="Monthly Summary"
        className="col-span-2 md:col-span-1"
      />
      <SummaryCard title="Tasks" className="col-span-2 md:col-span-1">
        <ul className="list-disc list-inside">
          <li className="">Pay Rent</li>
          <li>Pay Rent</li>
        </ul>
      </SummaryCard>
      <Table />
    </div>
  );
};
