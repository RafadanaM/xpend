// import Task from "../interfaces/task.interface";
import Checkbox from "./Checkbox";
import { ReactComponent as TrashIcon } from "../assets/trash.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { ReactComponent as DownIcon } from "../assets/down.svg";

import { useRef, useState } from "react";
import useOutsideAlerter from "../utils/useOutsideAlerter";
import { useAppSelector } from "../app/hooks";
import { selectTaskById } from "../features/tasksSlice";
import Transaction from "../interfaces/transaction.interface";

interface TaskItemI {
  taskId: number;
  onCheckboxClick: (taskId: number, isComplete: boolean | undefined) => void;
  onTextClick?: (Transaction: Transaction) => void;
  onEditClick: (taskId: number) => void;
  onDeleteClick: (taskId: number) => void;
}
const TaskItem = ({
  taskId,
  onCheckboxClick,
  onTextClick = () => {},
  onEditClick,
  onDeleteClick,
}: TaskItemI) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCheckboxChange = () => {
    onCheckboxClick(taskId, task?.isComplete);
  };
  const task = useAppSelector((state) => selectTaskById(state, taskId));

  const dropDownRef = useRef(null);
  useOutsideAlerter(dropDownRef, () => {
    setIsOpen(false);
  });
  return (
    <div className="flex items-center justify-between relative group">
      {task ? (
        <>
          <div>
            <span className="font-bold mr-2">-</span>
            <span
              onClick={() => onTextClick(task.transactions[0])}
              className={` ${
                task.isComplete ? "line-through cursor-pointer" : ""
              }`}
            >
              {task.title}
            </span>
          </div>
          <div className="flex gap-x-1">
            <div ref={dropDownRef} className="relative md:hidden">
              <DownIcon
                onClick={() => setIsOpen((prevState) => !prevState)}
                className={`cursor-pointer transform transition-all duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
              <div
                className={`absolute bg-secondary -left-2 shadow-md border border-accent-grey rounded z-10 flex p-1 gap-x-1.5 ${
                  isOpen ? "" : "hidden"
                }`}
              >
                <EditIcon
                  onClick={() => onEditClick(task.id)}
                  className="text-primary cursor-pointer"
                />
                <TrashIcon
                  onClick={() => onDeleteClick(task.id)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            </div>
            <Checkbox
              checked={task.isComplete}
              onChange={handleCheckboxChange}
              className="mr-2 rounded-full cursor-pointer"
            />
            <div className="absolute hidden md:group-hover:flex gap-x-1.5 right-7">
              <EditIcon
                onClick={() => onEditClick(taskId)}
                className="text-primary cursor-pointer"
              />
              <TrashIcon
                onClick={() => onDeleteClick(task.id)}
                className="text-red-500 cursor-pointer"
              />
            </div>
          </div>
        </>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  );
};
export default TaskItem;
