import { useState } from "react";
import { SummaryCard } from "../components/Cards/SummaryCard";
import { TaskCard } from "../components/Cards/TaskCard";
import { Filter } from "../components/Filter";
import { AddTransactionModal } from "../components/Modals/AddTransactionModal";
import { Table } from "../components/Table";

export const Home = () => {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  return (
    <>
      <AddTransactionModal
        open={openTransactionModal}
        changeOpen={setOpenTransactionModal}
      />
      <div className="grid grid-cols-2 md:px-0 md:py-8 gap-x-10 md:gap-y-2 bg-secondary">
        <SummaryCard />
        <TaskCard />
        <Filter />
        <button
          className="px-2 col-start-2 py-1.5 bg-accent-orange text-white text-xs rounded ml-auto my-auto mr-2 md:mr-0 md:mt-auto"
          onClick={() => setOpenTransactionModal(true)}
        >
          Add Transaction
        </button>
        <Table />
      </div>
    </>
  );
};
