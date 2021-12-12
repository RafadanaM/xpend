import Task from "../interfaces/task.interface";
import Checkbox from "./Checkbox";

interface TaskItemI {
  task: Task;
  onCheckboxClick: Function;
  onTextClick?: Function;
}
const TaskItem = ({
  task,
  onCheckboxClick,
  onTextClick = () => {},
}: TaskItemI) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxClick(task);
  };
  return (
    <div className="flex items-center ">
      <span className="font-bold mr-2">-</span>
      <span
        onClick={() => onTextClick(task)}
        className={` ${task.isComplete ? "line-through cursor-pointer" : ""}`}
      >
        {task.title}
      </span>
      <Checkbox
        checked={task.isComplete}
        onChange={handleCheckboxChange}
        className="ml-auto mr-2 rounded-full cursor-pointer"
      />
    </div>
  );
};
export default TaskItem;
