import { SummaryCard } from "../components/Cards/SummaryCard";
import { TaskCard } from "../components/Cards/TaskCard";
import { Table } from "../components/Table/Table";

export const Home = () => {
  return (
    <div className="grid grid-cols-2 md:px-0 md:py-8 gap-x-10 md:gap-y-10">
      <SummaryCard />
      <TaskCard />
      <Table />
    </div>
  );
};
