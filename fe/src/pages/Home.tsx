import { useEffect, useState } from "react";
import { TaskService } from "../api/services/TaskService";
import { TransactionService } from "../api/services/TransactionService";
import { SummaryCard } from "../components/Cards/SummaryCard";
import { TaskCard } from "../components/Cards/TaskCard";
import { Filter } from "../components/Filter";
import {
  TransactionFormType,
  TransactionModal,
  TransactionModalType,
} from "../components/Modals/TransactionModal";
import { Table } from "../components/Table";
import Task from "../interfaces/task.interface";
import Transaction from "../interfaces/transaction.interface";

export type SearchFormType = {
  searchText: string;
  searchDate: string;
};

export const Home = () => {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [search, setSearch] = useState<SearchFormType>({
    searchText: "",
    searchDate: "",
  });
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    Promise.all([
      TransactionService.getTransactions(search)
        .then(({ data }) => {
          setTransactions(data);
        })
        .catch((err) => {
          console.log(err);
        }),
      TaskService.getTasks()
        .then(({ data }) => {
          console.log(data);

          setTasks(data);
        })
        .catch((err) => {
          console.log(err?.reponse);
        }),
    ]);
  }, [search]);

  const handleOpenDetailTransactionModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenTransactionModal(true);
  };

  const handleDelete = (id: number) => {
    TransactionService.deleteTransaction(id)
      .then(async ({ data }) => {
        setTasks((prevState: Task[]) => [
          ...prevState.map((currentTask) => {
            if (currentTask.id === data.task.id) {
              currentTask.isComplete = data.task.isComplete || false;
              currentTask.transactions = [];
              return currentTask;
            }
            return currentTask;
          }),
        ]);
        setTransactions((prevState: Transaction[]) => [
          ...prevState.filter((transaction) => transaction.id !== data.id),
        ]);
        setSelectedTransaction(undefined);
        setOpenTransactionModal(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCancel = () => {
    setSelectedTransaction(undefined);
    setOpenTransactionModal(false);
  };

  const handleSave = (
    type: TransactionModalType,
    values: TransactionFormType
  ) => {
    switch (type) {
      case "add":
        TransactionService.createTransaction(
          values.title,
          +values.amount,
          values.description,
          values.date
        )
          .then(async (_) => {
            const { data } = await TransactionService.getTransactions();
            setTransactions(data);
            setOpenTransactionModal(false);
          })
          .catch((err) => {
            console.log(err.response);
          });
        return;

      case "edit":
        if (!values.id) {
          return;
        }
        TransactionService.editTransaction(values as Transaction, values.id)
          .then(async ({ data }) => {
            setTransactions((prevState) => [
              ...prevState.map((transaction) => {
                if (transaction.id === data.id) {
                  transaction = data;
                }
                return transaction;
              }),
            ]);
            setOpenTransactionModal(false);
          })
          .catch((err) => {
            console.log(err.response);
          });
        return;

      default:
        return;
    }
  };

  return (
    <>
      {openTransactionModal ? (
        <TransactionModal
          defaultValue={
            selectedTransaction && {
              title: selectedTransaction.title,
              description: selectedTransaction.description,
              amount: selectedTransaction.amount,
              date: selectedTransaction.date,
              id: selectedTransaction.id,
            }
          }
          defaultType={selectedTransaction ? "view" : "add"}
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      ) : null}

      <div className="grid grid-cols-2 md:px-0 md:py-8 gap-x-10 md:gap-y-2 bg-secondary md:bg-white">
        <SummaryCard transactions={transactions} />
        <TaskCard
          setTransactions={setTransactions}
          tasks={tasks}
          setTasks={setTasks}
        />
        <div className="py-1 w-full col-span-2 bg-white flex justify-end">
        <button
          className="h-8 w-28 col-start-2 bg-accent-orange text-white text-xs rounded ml-auto my-auto mr-1 md:mr-0 md:my-0 md:mt-10 hover:bg-opacity-75"
          onClick={() => setOpenTransactionModal(true)}
        >
          Add Transaction
        </button>
        </div>
        <Filter setSearch={setSearch} />
        
        <Table
          transactions={transactions}
          onRowClick={handleOpenDetailTransactionModal}
        />
      </div>
    </>
  );
};
