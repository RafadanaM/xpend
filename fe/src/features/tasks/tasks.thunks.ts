import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskService } from "../../api/services/TaskService";
import Task from "../../interfaces/task.interface";
import {
  isMonthYearSameWithCurrent,
  getCorrectDate,
} from "../../utils/formatDate";
import { fetchTransactionSummary } from "../transactions/transaction.thunks";
import {
  TaskDTO,
  EditTaskData,
  CompleteTaskData,
  CompleteTaskResponse,
  UndoTaskResponse,
} from "./tasks.interface";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await TaskService.getTasks();
  return response.data as Task[];
});

export const addNewTask = createAsyncThunk(
  "tasks/addNewTasks",
  async (taskData: TaskDTO) => {
    const response = await TaskService.createTask(
      taskData.title,
      taskData.description,
      +taskData.amount
    );
    return response.data as Task;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (editTaskData: EditTaskData) => {
    const response = await TaskService.editTask(
      editTaskData.title,
      editTaskData.description,
      +editTaskData.amount,
      editTaskData.id
    );
    return response.data as Task;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number) => {
    const response = await TaskService.deleteTask(id);
    return response.data as Task;
  }
);

export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async (completeTaskData: CompleteTaskData, { dispatch }) => {
    const { taskId, transactionData } = completeTaskData;
    const response = await TaskService.completeTask(
      taskId,
      transactionData.title,
      +transactionData.amount,
      transactionData.description,
      transactionData.date
    );
    const data: CompleteTaskResponse = response.data;
    if (isMonthYearSameWithCurrent(getCorrectDate(data.transaction.date))) {
      dispatch(fetchTransactionSummary());
    }
    return data;
  }
);

export const undoTask = createAsyncThunk(
  "tasks/undoTask",
  async (id: number, { dispatch }) => {
    const response = await TaskService.undoTask(id);
    const data: UndoTaskResponse = response.data;
    if (
      data.transaction &&
      isMonthYearSameWithCurrent(getCorrectDate(data.transaction.date))
    ) {
      dispatch(fetchTransactionSummary());
    }
    return data;
  }
);
