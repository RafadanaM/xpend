import { useRef } from "react";
import useOutsideAlerter from "../../utils/useOutsideAlerter";

interface RegisterSuccessModalI {
  open: boolean;
  changeOpen: Function;
}

export const RegisterSuccessModal = ({
  open,
  changeOpen,
}: RegisterSuccessModalI) => {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    changeOpen(false);
  });

  return open ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-60 z-50 flex justify-center items-center">
      <div
        className="bg-white md:w-4/12 w-3/4 max-w-sm h-auto z-50 py-2 flex flex-col"
        ref={modalRef}
      >
        <div className="py-2 w-full px-8 font-semibold text-xl flex flex-col justify-center items-center">
          <span>Register Success!</span>
          <button
            className="w-20 mt-6 bg-accent-orange hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => changeOpen(false)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
