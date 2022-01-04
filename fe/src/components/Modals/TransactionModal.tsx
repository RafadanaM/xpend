import { useRef, useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import Transaction from "../../interfaces/transaction.interface";
import {
  // formatDate,
  formatToInput,
  // transactionDateFormat,
} from "../../utils/formatDate";
import { transactionInputs } from "../../utils/formInputs";
import useForm from "../../utils/useForm";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import ModalButton from "../Buttons/ModalButton";
import FormInput from "../Forms/FormInput";

export type TransactionFormType = {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: string;
};
interface AddTransactionModalI {
  transaction?: Transaction;
  onCancel: Function;
}

export const TransactionModal = ({
  onCancel,
  transaction,
}: AddTransactionModalI) => {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    onCancel();
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleCallback = () => {
    console.log("run");

    //onSave(type, formData);
  };

  const { formData, focused, handleFocus, handleChange, onSubmit } = useForm(
    {
      title: transaction ? transaction.title : "",
      description: transaction ? transaction.description : "",
      amount: transaction ? transaction.amount : 0,
      date: formatToInput(
        transaction ? transaction.date : new Date().toDateString()
      ),
      id: transaction?.id,
    } as TransactionFormType,
    handleCallback
  );

  const handleDelete = (id: number) => {};

  let valueKeys = Object.keys(formData) as (keyof TransactionFormType)[];

  return (
    <div className="fixed top-0 left-0 w-full h-full md:max-h-screen lg:overflow-auto md:overflow-scroll bg-gray-700 bg-opacity-60 z-50 flex justify-center items-center">
      <div
        className="bg-white lg:w-11/12 lg:max-w-lg w-full h-full md:h-auto z-50 py-2 flex flex-col"
        ref={modalRef}
      >
        <>
          <div className="py-2 w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
            <span>
              {transaction
                ? isEdit
                  ? "Edit Transaction"
                  : "Transaction"
                : "New Transaction"}
            </span>
            <CloseIcon
              className="-mx-4 w-4 h-4 cursor-pointer"
              onClick={() => onCancel()}
            />
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
                    disabled={!isEdit}
                  />
                );
              })}

              <div className="flex items-center gap-x-4 justify-between mt-8">
                {transaction ? (
                  <>
                    <ModalButton
                      type="button"
                      color="cancel"
                      onClick={() =>
                        isEdit ? setIsEdit(false) : handleDelete(transaction.id)
                      }
                    >
                      {isEdit ? "Cancel" : "Delete"}
                    </ModalButton>
                    {isEdit ? (
                      <ModalButton>Save</ModalButton>
                    ) : (
                      <ModalButton
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
                    <ModalButton>Create</ModalButton>
                  </>
                )}
              </div>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};
