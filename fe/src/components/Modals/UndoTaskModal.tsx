import { TaskService } from "../../api/services/TaskService";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import Task from "../../interfaces/task.interface";

interface UndoTaskModalI {
  onCancel: Function;
  task?: Task;
  onSubmit: Function;
}

const UndoTaskModal = ({ onCancel, task, onSubmit }: UndoTaskModalI) => {
  const handleClickYes = (id: number) => {
    TaskService.undoTask(id)
      .then(({ data }) => {
        onSubmit(data?.task?.id, data?.task?.isComplete);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return task ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-60 z-20 flex justify-center items-center">
      <div className="bg-white md:w-8/12 md:max-w-sm w-full h-full md:h-auto z-50 py-2 flex flex-col rounded overflow-hidden">
        <div className="px-4 border-b flex w-full justify-between">
          <p className="text-xl text-red-500 font-medium">WARNING!</p>
          <CloseIcon
            className="-mx-2 w-4 h-4 cursor-pointer"
            onClick={() => onCancel(false)}
          />
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
          <button
            className="flex-1 bg-accent-orange py-0.5"
            onClick={() => handleClickYes(task.id)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default UndoTaskModal;
