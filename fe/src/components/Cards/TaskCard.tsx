import { useEffect, useState } from "react";
import { TaskModal } from "../Modals/TaskModal";
import { TransactionModal } from "../Modals/TransactionModal";
import ConfirmModal from "../Modals/ConfirmModal";

import BaseCard from "./BaseCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteTask,
  fetchTasks,
  getSelectedTaskId,
  getTasksStatus,
  selectTasksIdsByCompleteness,
  taskSelected,
  undoTask,
} from "../../features/tasksSlice";
import Tasks from "../Tasks";
import {
  getSelectedTransaction,
  transactionSelected,
} from "../../features/transactionsSlice";
import Transaction from "../../interfaces/transaction.interface";
export const TaskCard = () => {
  const [openTransactionModal, setOpenTransactionModal] =
    useState<boolean>(false);
  const [openUndoTaskModal, setOpenUndoTaskModal] = useState<boolean>(false);
  const [openDeleteTaskModal, setOpenDeleteTaskModal] =
    useState<boolean>(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const dispatch = useAppDispatch();
  const taskStatus = useAppSelector(getTasksStatus);
  const selectedTransactionId = useAppSelector(getSelectedTransaction);
  const completedTaskIds = useAppSelector((state) =>
    selectTasksIdsByCompleteness(state, true)
  );
  const incompleteTaskIds = useAppSelector((state) =>
    selectTasksIdsByCompleteness(state, false)
  );
  const selectedTaskId = useAppSelector(getSelectedTaskId);

  useEffect(() => {
    if (taskStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  const handleCheckboxClick = (
    taskId: number,
    isComplete: boolean | undefined
  ) => {
    if (isComplete === undefined) return;
    dispatch(taskSelected({ id: taskId }));
    if (isComplete) {
      setOpenUndoTaskModal(true);
    } else {
      setOpenTransactionModal(true);
    }
  };

  const handleDeleteTask = (id: number | undefined) => {
    if (!id) return;
    try {
      dispatch(deleteTask(id));
      dispatch(taskSelected({ id: undefined }));
      setOpenDeleteTaskModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUndoTask = async (id: number | undefined) => {
    if (!id) return;
    try {
      await dispatch(undoTask(id)).unwrap();
      dispatch(taskSelected({ id: undefined }));
      setOpenUndoTaskModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelTransactionModal = () => {
    dispatch(taskSelected({ id: undefined }));
    setOpenTransactionModal(false);
  };

  const handleCancelTaskModal = () => {
    dispatch(taskSelected({ id: undefined }));
    setOpenTaskModal(false);
  };

  const handleCancelDeleteModal = () => {
    dispatch(taskSelected({ id: undefined }));
    setOpenDeleteTaskModal(false);
  };

  const handleTextClick = (transaction: Transaction) => {
    dispatch(transactionSelected({ transaction }));
    setOpenTransactionModal(true);
  };

  const handleDeleteClick = (taskId: number) => {
    dispatch(taskSelected({ id: taskId }));
    setOpenDeleteTaskModal(true);
  };

  const handleEditClick = (taskId: number) => {
    dispatch(taskSelected({ id: taskId }));
    setOpenTaskModal(true);
  };

  return (
    <>
      {openTaskModal ? (
        <TaskModal onCancel={handleCancelTaskModal} taskId={selectedTaskId} />
      ) : null}
      {openDeleteTaskModal ? (
        <ConfirmModal
          text={`Are you sure you want to delete?`}
          onCancel={handleCancelDeleteModal}
          onSubmit={() => handleDeleteTask(selectedTaskId)}
        />
      ) : null}
      {openUndoTaskModal ? (
        <ConfirmModal
          text="Undoing the task will also delete previously created transaction. Do
        you want to continue?"
          onCancel={setOpenUndoTaskModal}
          onSubmit={() => handleUndoTask(selectedTaskId)}
        />
      ) : null}
      {openTransactionModal ? (
        <TransactionModal
          transaction={selectedTransactionId}
          taskId={selectedTaskId}
          onCancel={handleCancelTransactionModal}
        />
      ) : null}

      <BaseCard
        title="Monthly Tasks"
        className="col-span-2 md:col-span-1"
        withButton
        button={
          <button
            onClick={() => setOpenTaskModal(true)}
            className="text-2xl leading-none hover:bg-opacity-75 font-medium w-6 flex items-center justify-center h-6 bg-accent-orange text-white rounded "
          >
            +
          </button>
        }
      >
        <div className="flex text-sm w-full divide-x divide-primary h-full">
          <Tasks
            title="Incomplete"
            taskIds={incompleteTaskIds}
            onEditClick={handleEditClick}
            onCheckboxClick={handleCheckboxClick}
            onDeleteClick={handleDeleteClick}
          />
          <Tasks
            title="Complete"
            taskIds={completedTaskIds}
            onEditClick={handleEditClick}
            onCheckboxClick={handleCheckboxClick}
            onTextClick={handleTextClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      </BaseCard>
    </>
  );
};
