import { useState } from "react";
import { TaskService } from "../../api/services/TaskService";
import { TransactionService } from "../../api/services/TransactionService";
import Task from "../../interfaces/task.interface";
import Transaction from "../../interfaces/transaction.interface";
import {
  TransactionFormType,
  TransactionModal,
  TransactionModalType,
} from "../Modals/TransactionModal";
import UndoTaskModal from "../Modals/UndoTaskModal";
import TaskItem from "../TaskItem";
import BaseCard from "./BaseCard";
interface TaskCardI {
  setTransactions: Function;
  setTasks: Function;
  tasks: Task[];
}
export const TaskCard = ({ setTransactions, setTasks, tasks }: TaskCardI) => {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [openTransactionModal, setOpenTransactionModal] =
    useState<boolean>(false);
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);

  const handleCheckboxClick = (task: Task) => {
    setSelectedTask(task);
    if (task.isComplete) {
      setOpenTaskModal(true);
    } else {
      setOpenTransactionModal(true);
    }
  };

  const handleSubmit = (id: number, isComplete: boolean) => {
    setTasks((prevState: Task[]) => [
      ...prevState.map((currentTask) => {
        if (currentTask.id === id) {
          currentTask.isComplete = isComplete || false;
          return currentTask;
        }
        return currentTask;
      }),
    ]);
    TransactionService.getTransactions()
      .then(({ data }) => {
        setTransactions(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setSelectedTask(undefined);
    setOpenTaskModal(false);
  };

  const handleSave = (
    type: TransactionModalType,
    values: TransactionFormType
  ) => {
    switch (type) {
      case "add":
        if (!values.id) {
          return;
        }
        TaskService.completeTask(
          values.id,
          values.title,
          +values.amount,
          values.description,
          values.date
        ).then(async ({ data }) => {
          setSelectedTask(undefined);
          setTasks((prevState: Task[]) => [
            ...prevState.map((currentTask) => {
              if (currentTask.id === values.id) {
                currentTask.isComplete = data?.task?.isComplete || true;
                currentTask.transactions = [data?.transaction];
                return currentTask;
              }
              return currentTask;
            }),
          ]);
          const response = await TransactionService.getTransactions();
          setTransactions(response.data);
          setOpenTransactionModal(false);
        });

        return;

      case "edit":
        if (!values.id) {
          return;
        }
        TransactionService.editTransaction(values as Transaction, values.id)
          .then(async (_) => {
            const { data } = await TransactionService.getTransactions();
            setTransactions(data);
            setOpenTransactionModal(false);
          })
          .catch((err) => {
            console.log(err.response);
          });
        return;

      default:
        break;
    }
  };

  const handleCancel = () => {
    setSelectedTask(undefined);
    setOpenTransactionModal(false);
  };

  const handleDelete = (id: number) => {
    TransactionService.deleteTransaction(id)
      .then(async (response) => {
        setTasks((prevState: Task[]) => [
          ...prevState.map((currentTask) => {
            if (currentTask.id === response.data.task.id) {
              currentTask.isComplete = response.data.task.isComplete || false;
              return currentTask;
            }
            return currentTask;
          }),
        ]);
        const { data } = await TransactionService.getTransactions();

        setTransactions(data);
        setOpenTransactionModal(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleTextClick = (task: Task) => {
    setSelectedTask(task);
    setOpenTransactionModal(true);
  };

  return (
    <>
      {openTaskModal ? (
        <UndoTaskModal
          onCancel={setOpenTaskModal}
          onSubmit={handleSubmit}
          task={selectedTask}
        />
      ) : null}
      {openTransactionModal ? (
        <TransactionModal
          defaultType={selectedTask?.isComplete ? "view" : "add"}
          defaultValue={
            selectedTask
              ? {
                  id: selectedTask.isComplete
                    ? selectedTask.transactions[0]?.id
                    : selectedTask.id,
                  title: selectedTask.title,
                  description: selectedTask.description,
                  amount: selectedTask.amount,
                  date: new Date().toLocaleString(),
                }
              : undefined
          }
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      ) : null}

      <BaseCard title="Monthly Tasks" className="col-span-2 md:col-span-1">
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
                  onTextClick={handleTextClick}
                  onCheckboxClick={handleCheckboxClick}
                />
              ))}
          </div>
        </div>
      </BaseCard>
    </>
  );
};
