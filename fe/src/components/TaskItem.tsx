import Task from "../interfaces/task.interface";
import Checkbox from "./Checkbox";

interface TaskItemI {
  task: Task;
  onCheckboxClick: Function;
}
const TaskItem = ({ task, onCheckboxClick }: TaskItemI) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    onCheckboxClick(task);
  };
  return (
    <div className="flex items-center ">
      <span className="font-bold mr-2">-</span>
      <span className={` ${task.isComplete ? "line-through" : ""}`}>
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
