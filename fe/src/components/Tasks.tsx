import Transaction from "../interfaces/transaction.interface";
import TaskItem from "./TaskItem";

interface TasksI {
  title: "Incomplete" | "Complete";
  taskIds: number[];
  onEditClick: (taskId: number) => void;
  onCheckboxClick: (taskId: number, isComplete: boolean | undefined) => void;
  onTextClick?: (transaction: Transaction) => void;
  onDeleteClick: (taskId: number) => void;
}

const Tasks = ({
  taskIds,
  title,
  onEditClick,
  onCheckboxClick,
  onTextClick,
  onDeleteClick,
}: TasksI) => {
  return (
    <div className="w-1/2 px-1 flex flex-col h-full">
      <span className="text-base font-medium mb-1">{title}</span>
      <div className="overflow-y-auto h-full">
        {taskIds.map((taskId) => (
          <TaskItem
            key={taskId}
            taskId={taskId}
            onCheckboxClick={onCheckboxClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onTextClick={onTextClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
