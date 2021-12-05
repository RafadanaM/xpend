import { SummaryCard } from "../components/Cards/SummaryCard";
import { TaskCard } from "../components/Cards/TaskCard";
import { Filter } from "../components/Filter";
import { Table } from "../components/Table";

export const Home = () => {
  return (
    <div className="grid grid-cols-2 md:px-0 md:py-8 gap-x-10 md:gap-y-2">
      <SummaryCard />
      <TaskCard />
      <Filter />
      <Table />
    </div>
  );
};
