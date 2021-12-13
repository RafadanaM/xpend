import Task from "../interfaces/task.interface";
import Checkbox from "./Checkbox";
import { ReactComponent as TrashIcon } from "../assets/trash.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { ReactComponent as DownIcon } from "../assets/down.svg";
import { ReactComponent as UpIcon } from "../assets/up.svg";
import { useRef, useState } from "react";
import useOutsideAlerter from "../utils/useOutsideAlerter";

interface TaskItemI {
  task: Task;
  onCheckboxClick: Function;
  onTextClick?: Function;
  onEditClick: Function;
  onDeleteClick: Function;
}
const TaskItem = ({
  task,
  onCheckboxClick,
  onTextClick = () => {},
  onEditClick,
  onDeleteClick,
}: TaskItemI) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxClick(task);
  };

  const dropDownRef = useRef(null);
  useOutsideAlerter(dropDownRef, () => {
    setIsOpen(false);
  });
  return (
    <div className="flex items-center justify-between relative group">
      <div>
        <span className="font-bold mr-2">-</span>
        <span
          onClick={() => onTextClick(task)}
          className={` ${task.isComplete ? "line-through cursor-pointer" : ""}`}
        >
          {task.title}
        </span>
      </div>
      <div className="flex gap-x-1">
        <div ref={dropDownRef} className="relative md:hidden">
          {isOpen ? (
            <UpIcon
              className="cursor-pointer"
              onClick={() => setIsOpen((prevState) => !prevState)}
            />
          ) : (
            <DownIcon
              className="cursor-pointer"
              onClick={() => setIsOpen((prevState) => !prevState)}
            />
          )}

          <div
            className={`absolute bg-secondary -left-2 shadow-md border border-accent-grey rounded z-10 flex p-1 gap-x-1.5 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <EditIcon
              onClick={() => onEditClick(task)}
              className="text-primary cursor-pointer"
            />
            <TrashIcon
              onClick={() => onDeleteClick(task)}
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
            onClick={() => onEditClick(task)}
            className="text-primary cursor-pointer"
          />
          <TrashIcon
            onClick={() => onDeleteClick(task)}
            className="text-red-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default TaskItem;
