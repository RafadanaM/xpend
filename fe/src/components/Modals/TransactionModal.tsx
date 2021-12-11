import { FormEvent, useEffect, useRef, useState } from "react";
import { TaskService } from "../../api/services/TaskService";
import { TransactionService } from "../../api/services/TransactionService";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import Task from "../../interfaces/task.interface";
import Transaction from "../../interfaces/transaction.interface";
import {
  formatDate,
  formatToInput,
  transactionDateFormat,
} from "../../utils/formatDate";
import { transactionInputs } from "../../utils/formInputs";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import FormInput from "../Forms/FormInput";

type TransactionFormType = {
  title: string;
  description: string;
  amount: number;
  date: string;
};

interface AddTransactionModalI {
  open: boolean;
  changeOpen: Function;
  setTransactions: Function;
  task?: Task;
  setTasks?: Function;
  transaction?: Transaction;
  setSelectedTransaction?: Function;
}

export const TransactionModal = ({
  open,
  changeOpen,
  setTransactions,
  transaction,
  task,
  setTasks,
  setSelectedTransaction,
}: AddTransactionModalI) => {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    handleClose();
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [values, setValues] = useState<TransactionFormType>({
    title: "",
    description: "",
    amount: 0,
    date: "",
  });

  useEffect(() => {
    console.log(task);

    setValues({
      title: transaction ? transaction.title : task ? task.title : "",
      description: transaction
        ? transaction.description
        : task
        ? task.description
        : "",
      amount: transaction ? transaction.amount : task ? task.amount : 0,
      date: transaction ? formatToInput(transaction.date) : "",
    });
  }, [isEdit, transaction, task]);

  const handleClose = () => {
    changeOpen(false);
    if (setSelectedTransaction) {
      setSelectedTransaction(false);
    }
    setIsEdit(false);
  };

  const handleDelete = () => {
    if (transaction) {
      TransactionService.deleteTransaction(transaction?.id)
        .then(async (_) => {
          const { data } = await TransactionService.getTransactions();
          setTransactions(data);
          handleClose();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    return;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task && setTasks) {
      TaskService.completeTask(
        task.id,
        values.title,
        +values.amount,
        values.description,
        values.date
      ).then(async ({ data }) => {
        setTasks((prevState: Task[]) => [
          ...prevState.map((currentTask) => {
            if (currentTask.id === task.id) {
              currentTask.isComplete = data?.task?.isComplete || true;
              return currentTask;
            }
            return currentTask;
          }),
        ]);
        const response = await TransactionService.getTransactions();
        setTransactions(response.data);
        handleClose();
      });

      return;
    }
    if (isEdit) {
      if (transaction)
        TransactionService.editTransaction(
          values as Transaction,
          transaction?.id
        )
          .then(async (_) => {
            const { data } = await TransactionService.getTransactions();
            setTransactions(data);
            handleClose();
          })
          .catch((err) => {
            console.log(err.response);
          });
    } else {
      TransactionService.createTransaction(
        values.title,
        +values.amount,
        values.description,
        values.date
      )
        .then(async (_) => {
          const { data } = await TransactionService.getTransactions();
          setTransactions(data);
          handleClose();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const handleFocus = (index: number) => {
    focused[index] = true;
    setFocused([...focused]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let valueKeys = Object.keys(values) as (keyof TransactionFormType)[];
  return open ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-60 z-20 flex justify-center items-center">
      <div
        className="bg-white md:w-11/12 md:max-w-lg w-full h-full md:h-auto z-50 py-2 flex flex-col"
        ref={modalRef}
      >
        {!transaction || isEdit ? (
          <>
            <div className="py-2 w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
              <span>{isEdit ? "Edit Transaction" : "New Transaction"}</span>
              <CloseIcon
                className="-mx-4 w-4 h-4 cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <div className="px-8 py-4">
              <form onSubmit={handleSubmit}>
                {transactionInputs.map((input, index) => {
                  return (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={values[valueKeys[index]]}
                      onChange={onChange}
                      onBlur={() => handleFocus(index)}
                      focused={focused[index]}
                      labelStyle="font-medium"
                    />
                  );
                })}

                <div className="flex items-center gap-x-4 justify-between mt-8">
                  {transaction && (
                    <button
                      className="bg-red-600 px-2 py-1 font-medium flex-1 text-white hover:bg-opacity-75"
                      onClick={() => setIsEdit(false)}
                      type="button"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    className="flex-1 bg-accent-orange hover:bg-opacity-75 text-white font-medium py-1 px-4 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {isEdit ? "Save" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="py-2 w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
              <span>Transaction Detail</span>
              <CloseIcon
                className="-mx-4 w-4 h-4 cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <div className="px-8 py-4 flex flex-col">
              <span className="text-lg font-medium">Title</span>
              <span className="text-gray-700 break-words">
                {transaction.title}
              </span>
              <span className="text-lg font-medium mt-5">Description</span>
              <span className="text-gray-700 break-words">
                {transaction.description}
              </span>
              <span className="text-lg font-medium mt-5">Amount</span>
              <span className="text-gray-700">{`Rp. ${transaction.amount}`}</span>
              <span className="text-lg font-medium mt-5">Date</span>
              <span className="text-gray-700">
                {formatDate(transaction.date, transactionDateFormat)}
              </span>
              <div className="flex w-full mt-10 gap-x-4">
                <button
                  className="bg-red-600 px-2 py-1 flex-1 text-white hover:bg-opacity-75"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-accent-orange flex-1 px-2 py-1 text-white hover:bg-opacity-75"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};
