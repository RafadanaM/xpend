import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { completeTask } from "../../features/tasks/tasks.thunks";
import { selectTaskById } from "../../features/tasks/tasksSlice";
import {
  updateTransaction,
  addNewTransaction,
  deleteTransaction,
} from "../../features/transactions/transaction.thunks";
import Transaction from "../../interfaces/transaction.interface";
import {
  // formatDate,
  formatToInput,
  // transactionDateFormat,
} from "../../utils/formatDate";
import { transactionInputs } from "../../utils/formInputs";
import useForm from "../../utils/useForm";
import ModalButton from "../Buttons/ModalButton";
import FormInput from "../Forms/FormInput";
import BaseModal from "./BaseModal";

export type TransactionFormType = {
  id?: number;
  title: string;
  description: string;
  type: "income" | "expense";
  amount: number;
  date: string;
};
interface AddTransactionModalI {
  onCancel: Function;
  taskId?: number | undefined;
  transaction?: Transaction | undefined;
}

export const TransactionModal = ({
  onCancel,
  transaction,
  taskId,
}: AddTransactionModalI) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedTask = useAppSelector((state) =>
    taskId ? selectTaskById(state, taskId) : undefined
  );

  const handleCallback = async () => {
    setLoading(true);

    try {
      if (transaction) {
        // update
        await dispatch(
          updateTransaction({
            id: transaction.id,
            transaction: {
              title: formData.title,
              description: formData.description,
              date: formData.date,
              type: formData.type,
              amount: +formData.amount,
            },
          })
        ).unwrap();
      } else if (selectedTask) {
        // complete tAsk
        await dispatch(
          completeTask({
            taskId: selectedTask.id,
            transactionData: {
              title: formData.title,
              description: formData.description,
              date: formData.date,
              type: formData.type,
              amount: formData.amount,
            },
          })
        ).unwrap();
      } else {
        //create new
        await dispatch(
          addNewTransaction({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            type: formData.type,
            amount: formData.amount,
          })
        ).unwrap();
      }
      setLoading(false);
      onCancel();
    } catch (error: any) {
      console.log(error?.response);
      setLoading(false);
    }

    //onSave(type, formData);
  };

  const { formData, focused, handleFocus, handleChange, onSubmit, resetForm } =
    useForm<TransactionFormType>(
      {
        title: transaction
          ? transaction.title
          : selectedTask
          ? selectedTask.title
          : "",
        description: transaction
          ? transaction.description
          : selectedTask
          ? selectedTask.description
          : "",
        type: transaction
          ? transaction.amount > 0
            ? "income"
            : "expense"
          : selectedTask
          ? selectedTask.amount > 0
            ? "income"
            : "expense"
          : "income",
        amount: Math.abs(
          transaction
            ? transaction.amount
            : selectedTask
            ? selectedTask.amount
            : 0
        ),
        date: formatToInput(
          transaction ? transaction.date : new Date().toString()
        ),
        id: transaction ? transaction.id : undefined,
      },
      handleCallback
    );

  const handleDelete = (id: number) => {
    //NOT COMPLETE
    try {
      setLoading(true);
      dispatch(deleteTransaction(id)).unwrap();
      setLoading(false);
      onCancel();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    setIsEdit(false);
  };

  let valueKeys = Object.keys(formData) as (keyof TransactionFormType)[];

  return (

    <BaseModal onCancel={() => onCancel()}>
      <div className="py-2 relative w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
        <span>
          {transaction
            ? isEdit
              ? "Edit Transaction"
              : "Transaction"
            : "New Transaction"}
        </span>
        <div
          className="absolute -top-1 right-1 flex items-center justify-center w-6 h-6 cursor-pointer hover:bg-secondary rounded-full p-1"
          onClick={() => onCancel()}
        >
          <CloseIcon className="w-full h-full" />
        </div>
      </div>
      <div className="px-8 py-4">
        <form onSubmit={onSubmit}>
          {transactionInputs.map((input, index) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                value={formData[valueKeys[index]]}
                onChange={handleChange}
                onBlur={() => handleFocus(index)}
                focused={focused[index]}
                labelStyle="font-medium"
                disabled={!isEdit && transaction !== undefined}
              />
            );
          })}
          <div className="flex items-center gap-x-4 justify-between mt-8">
            {transaction ? (
              <>
                <ModalButton
                  disabled={loading}
                  type="button"
                  color="cancel"
                  onClick={() =>
                    isEdit ? handleCancelEdit() : handleDelete(transaction.id)
                  }
                >
                  {isEdit ? "Cancel" : "Delete"}
                </ModalButton>
                {isEdit ? (
                  <ModalButton color="success" disabled={loading}>
                    Save
                  </ModalButton>
                ) : (
                  <ModalButton
                    disabled={loading}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEdit(true);
                    }}
                  >
                    Edit
                  </ModalButton>
                )}
              </>
            ) : (
              <>
                <ModalButton disabled={loading}>Create</ModalButton>
              </>
            )}
          </div>
        </form>
      </div>
    </BaseModal>
  );
};
