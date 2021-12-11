interface UndoTaskModalI {
  open: boolean;
  onCancel: Function;
}

const UndoTaskModal = ({ open, onCancel }: UndoTaskModalI) => {
  return open ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-60 z-20 flex justify-center items-center">
      <div className="bg-white md:w-8/12 md:max-w-sm w-full h-full md:h-auto z-50 py-2 flex flex-col rounded overflow-hidden">
        <div className="px-4 border-b">
          <span className="text-xl text-red-500 font-medium">WARNING!</span>
        </div>
        <div className="px-4 mt-2">
          <p>
            Undoing the task will also delete previously created transaction. Do
            you want to continue?
          </p>
        </div>
        <div className="flex w-full mt-5 gap-x-2 text-white font-medium px-4">
          <button
            className="flex-1 bg-red-500 py-0.5"
            onClick={() => onCancel(false)}
          >
            No
          </button>
          <button className="flex-1 bg-accent-orange py-0.5">Yes</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default UndoTaskModal;
