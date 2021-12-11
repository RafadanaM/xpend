import { useEffect, useState } from "react";
import { TaskService } from "../../api/services/TaskService";
import Task from "../../interfaces/task.interface";
import { TransactionModal } from "../Modals/TransactionModal";
import UndoTaskModal from "../Modals/UndoTaskModal";
import TaskItem from "../TaskItem";
import BaseCard from "./BaseCard";
interface TaskCardI {
  setTransactions: Function;
}
export const TaskCard = ({ setTransactions }: TaskCardI) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [openTransactionModal, setOpenTransactionModal] =
    useState<boolean>(false);
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);
  useEffect(() => {
    TaskService.getTasks()
      .then(({ data }) => {
        console.log(data);

        setTasks(data);
      })
      .catch((err) => {
        console.log(err?.reponse);
      });
  }, []);

  const handleCheckboxClick = (task: Task) => {
    if (task.isComplete) {
      setOpenTaskModal(true);
    } else {
      setSelectedTask(task);
      setOpenTransactionModal(true);
    }
  };

  return (
    <>
      <UndoTaskModal open={openTaskModal} onCancel={setOpenTaskModal} />
      <TransactionModal
        open={openTransactionModal}
        changeOpen={setOpenTransactionModal}
        setTransactions={setTransactions}
        setTasks={setTasks}
        task={selectedTask}
      />
      <BaseCard title="Tasks" className="col-span-2 md:col-span-1">
        <div className="flex text-sm w-full h-full">
          <div className="w-1/2 px-1 flex flex-col border-r border-primary h-full">
            <span className="text-base font-medium mb-1">Incomplete</span>
            {tasks
              .filter((task) => !task.isComplete)
              .map((incompleteTask) => (
                <TaskItem
                  key={incompleteTask.id}
                  task={incompleteTask}
                  onCheckboxClick={handleCheckboxClick}
                />
              ))}
          </div>
          <div className="w-1/2 px-1 flex flex-col border-l border-primary h-full">
            <span className="text-base font-medium mb-1">Complete</span>
            {tasks
              .filter((task) => task.isComplete)
              .map((completeTask) => (
                <TaskItem
                  key={completeTask.id}
                  task={completeTask}
                  onCheckboxClick={handleCheckboxClick}
                />
              ))}
          </div>
        </div>
      </BaseCard>
    </>
  );
};
