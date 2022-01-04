import { ReactNode, useRef } from "react";
import useOutsideAlerter from "../../utils/useOutsideAlerter";

interface BaseModalI {
  onCancel: () => void;
  children: ReactNode;
}

const BaseModal = ({ onCancel, children }: BaseModalI) => {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    onCancel();
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full md:max-h-screen lg:overflow-auto md:overflow-scroll bg-gray-700 bg-opacity-60 z-50 flex justify-center items-center">
      <div
        className="bg-white lg:w-11/12 lg:max-w-lg w-full h-full md:h-auto z-50 py-2 flex flex-col"
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
