import { useEffect, useState } from "react";
import { TransactionService } from "../api/services/TransactionService";
import { SummaryCard } from "../components/Cards/SummaryCard";
import { TaskCard } from "../components/Cards/TaskCard";
import { Filter } from "../components/Filter";
import { TransactionModal } from "../components/Modals/TransactionModal";
import { Table } from "../components/Table";
import Transaction from "../interfaces/transaction.interface";

export const Home = () => {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleOpenDetailTransactionModal = (transaction: Transaction) => {
    console.log(transaction);
    setSelectedTransaction(transaction);
    setOpenTransactionModal(true);
  };

  useEffect(() => {
    TransactionService.getTransactions()
      .then(({ data }) => {
        console.log(data);
        setTransactions(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <TransactionModal
        open={openTransactionModal}
        changeOpen={setOpenTransactionModal}
        setTransactions={setTransactions}
        transaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        // type="create"
      />
      {/* <TransactionModal
        open={openDetailTransactionModal}
        changeOpen={setOpenDetailTransactionModal}
        setTransactions={setTransactions}
        transaction={selectedTransaction}
        type="detail"
      /> */}
      <div className="grid grid-cols-2 md:px-0 md:py-8 gap-x-10 md:gap-y-2 bg-secondary md:bg-white">
        <SummaryCard />
        <TaskCard />
        <Filter />

        <button
          className="h-8 w-28 col-start-2 bg-accent-orange text-white text-xs rounded ml-auto my-auto mr-1 md:mr-0 md:my-0 md:mt-auto"
          onClick={() => setOpenTransactionModal(true)}
        >
          Add Transaction
        </button>
        <Table
          transactions={transactions}
          onRowClick={handleOpenDetailTransactionModal}
        />
      </div>
    </>
  );
};
