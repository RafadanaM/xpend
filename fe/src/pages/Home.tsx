import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { SummaryCard } from "../components/Cards/SummaryCard";
import { TaskCard } from "../components/Cards/TaskCard";
import { Filter } from "../components/Filter";
import { TransactionModal } from "../components/Modals/TransactionModal";
import { Table } from "../components/Table";
import {
  getSelectedTransaction,
  transactionSelected,
} from "../features/transactionsSlice";
import Transaction from "../interfaces/transaction.interface";

export type SearchFormType = {
  searchText: string;
  searchDate: string;
};

export const Home = () => {
  const dispatch = useAppDispatch();
  const selectedTransaction = useSelector(getSelectedTransaction);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [search, setSearch] = useState<SearchFormType>({
    searchText: "",
    searchDate: "",
  });

  useEffect(() => {
    // for adding search
  }, [search]);

  const handleOpenDetailTransactionModal = (transaction: Transaction) => {
    dispatch(transactionSelected({ transaction }));
    setOpenTransactionModal(true);
  };

  const handleCancel = () => {
    dispatch(transactionSelected({ transaction: undefined }));
    setOpenTransactionModal(false);
  };

  return (
    <>
      {openTransactionModal ? (
        <TransactionModal
          transaction={selectedTransaction}
          onCancel={handleCancel}
        />
      ) : null}

      <div className="grid grid-cols-2 h-full md:px-0 md:py-8 gap-x-10 md:gap-y-2 bg-secondary md:bg-white">
        <SummaryCard />
        <TaskCard />

        <button
          className="h-6 md:h-8 w-28 col-start-2 hidden md:inline-block bg-accent-orange text-white text-xs rounded ml-auto my-auto mr-1 md:mr-0 md:my-0 md:mt-auto hover:bg-opacity-75"
          onClick={() => setOpenTransactionModal(true)}
        >
          Add Transaction
        </button>

        <Filter setSearch={setSearch} />

        <button
          className="h-6 mb-2 md:h-8 w-28 col-start-2 bg-accent-orange text-white text-xs rounded md:hidden ml-auto my-auto mr-1 md:mr-0 md:my-0 md:mt-auto hover:bg-opacity-75"
          onClick={() => setOpenTransactionModal(true)}
        >
          Add Transaction
        </button>

        <Table onRowClick={handleOpenDetailTransactionModal} />
      </div>
    </>
  );
};
