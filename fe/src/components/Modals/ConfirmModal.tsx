import { MouseEventHandler } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";

interface ConfirmationModal {
  onCancel: Function;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  text: string;
}

const ConfirmModal = ({ onCancel, onSubmit, text = "" }: ConfirmationModal) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-60 z-20 flex justify-center items-center">
      <div className="bg-white w-10/12 md:w-8/12 max-w-sm  h-auto z-50 py-2 flex flex-col rounded overflow-hidden">
        <div className="px-4 border-b py-2 flex w-full justify-between">
          <p className="text-xl text-red-500 font-medium">WARNING!</p>
          <CloseIcon
            className="-mx-2 w-4 h-4 cursor-pointer"
            onClick={() => onCancel(false)}
          />
        </div>
        <div className="px-4 mt-2">
          <p>{text}</p>
        </div>
        <div className="flex w-full mt-5 gap-x-2 text-white font-medium px-4">
          <button
            className="flex-1 bg-red-500 py-0.5"
            onClick={() => onCancel(false)}
          >
            No
          </button>
          <button className="flex-1 bg-accent-orange py-0.5" onClick={onSubmit}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
