import { FormEvent, useRef, useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import Transaction from "../../interfaces/transaction.interface";
import {
  // formatDate,
  formatToInput,
  // transactionDateFormat,
} from "../../utils/formatDate";
import { transactionInputs } from "../../utils/formInputs";
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
export type TransactionModalType = "add" | "view" | "edit";
interface AddTransactionModalI {
  transaction?: Transaction;
  defaultValue?: TransactionFormType;
  defaultType?: TransactionModalType;
  onSave: Function;
  onDelete: Function;
  onCancel: Function;
}

export const TransactionModal = ({
  onSave,
  onDelete,
  onCancel,
  defaultValue,
  transaction,
  defaultType = "add",
}: AddTransactionModalI) => {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    onCancel();
  });
  const [type, setType] = useState(defaultType);
  const [isEdit, setIsEdit] = useState(false);

  const [focused, setFocused] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [values, setValues] = useState<TransactionFormType>({
    title: transaction ? transaction.title : "",
    description: transaction ? transaction.description : "",
    amount: transaction ? transaction.amount : 0,
    date: formatToInput(
      transaction ? transaction.date : new Date().toDateString()
    ),
    id: transaction?.id,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("run");

    onSave(type, values);
    setType("add");
  };

  const handleFocus = (index: number) => {
    focused[index] = true;
    setFocused([...focused]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let valueKeys = Object.keys(values) as (keyof TransactionFormType)[];
  console.log(isEdit);

  return (
    <div className="fixed top-0 left-0 w-full h-full md:max-h-screen lg:overflow-auto md:overflow-scroll bg-gray-700 bg-opacity-60 z-50 flex justify-center items-center">
      <div
        className="bg-white lg:w-11/12 lg:max-w-lg w-full h-full md:h-auto z-50 py-2 flex flex-col"
        ref={modalRef}
      >
        <>
          <div className="py-2 w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
            <span>
              {type === "edit" ? "Edit Transaction" : "New Transaction"}
            </span>
            <CloseIcon
              className="-mx-4 w-4 h-4 cursor-pointer"
              onClick={() => onCancel()}
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
                {transaction ? (
                  <>
                    <ModalButton
                      type="button"
                      color="cancel"
                      onClick={() =>
                        isEdit ? setIsEdit(false) : onDelete(transaction.id)
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
