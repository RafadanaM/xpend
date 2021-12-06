import { FormEvent, useRef, useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { transactionInputs } from "../../utils/formInputs";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import FormInput from "../Forms/FormInput";

type TransactionFormType = {
  title: string;
  description: string;
  amount: number;
  date: Date;
};

interface AddTransactionModalI {
  open: boolean;
  changeOpen: Function;
}

export const AddTransactionModal = ({
  open,
  changeOpen,
}: AddTransactionModalI) => {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    changeOpen(false);
  });
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
    date: new Date(),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("run");
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
        <div className="py-2 w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
          <span>New Transaction</span>
          <CloseIcon
            className="-mx-4 w-4 h-4 cursor-pointer"
            onClick={() => changeOpen(false)}
          />
        </div>
        <div className="px-8 py-4">
          <form onSubmit={handleSubmit}>
            {transactionInputs.map((input, index) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[valueKeys[index]]}
                onChange={onChange}
                onBlur={() => handleFocus(index)}
                focused={focused[index]}
                labelStyle="font-medium"
              />
            ))}
            <div className="flex items-center justify-between mt-8">
              <button
                className="w-full bg-accent-orange hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
