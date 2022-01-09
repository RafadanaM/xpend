import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TaskService } from "../api/services/TaskService";
import { RootState } from "../app/store";
import ExtraState from "../interfaces/extraState.interface";
import Task from "../interfaces/task.interface";
import Transaction from "../interfaces/transaction.interface";
import {
  getCorrectDate,
  isMonthYearSameWithCurrent,
} from "../utils/formatDate";
import {
  deleteTransaction,
  fetchTransactionSummary,
  TransactionDTO,
} from "./transactionsSlice";

export interface TaskDTO {
  title: string;
  amount: number;
  description: string;
}

interface TaskSelectedPayload {
  id: number | undefined;
}

interface CompleteTaskData {
  taskId: number;
  transactionData: TransactionDTO;
}

interface EditTaskData extends TaskDTO {
  id: number;
}

interface CompleteTaskResponse {
  task: Task;
  transaction: Transaction;
}

interface UndoTaskResponse {
  task: Task;
  transaction: Transaction | undefined;
}

const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => a.created.localeCompare(b.created),
});

const initialState = tasksAdapter.getInitialState<ExtraState>({
  status: "idle",
  error: null,
  selectedId: undefined,
});

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

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskSelected: (state, action: PayloadAction<TaskSelectedPayload>) => {
      const { id } = action.payload;
      state.selectedId = id;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        tasksAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addNewTask.fulfilled, tasksAdapter.addOne)
      .addCase(completeTask.fulfilled, (state, action) => {
        const { task, transaction } = action.payload;
        const updatedTask = state.entities[task.id];
        if (updatedTask) {
          updatedTask.isComplete = true;
          updatedTask.transactions = [transaction];
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        const task = action.payload.task;
        if (!task) return;
        const updatedTask = state.entities[task.id];
        if (updatedTask) {
          updatedTask.isComplete = task.isComplete || false;
          updatedTask.transactions = [];
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const task = action.payload;
        tasksAdapter.updateOne(state, {
          id: task.id,
          changes: {
            title: task.title,
            description: task.description,
            amount: task.amount,
          },
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        tasksAdapter.removeOne(state, action.payload.id);
      })
      .addCase(undoTask.fulfilled, (state, action) => {
        const { task } = action.payload;
        console.log();

        const updatedTask = state.entities[task.id];
        if (updatedTask) {
          updatedTask.isComplete = task.isComplete || false;
        }
      });
  },
});

export default tasksSlice.reducer;

export const { taskSelected } = tasksSlice.actions;

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
} = tasksAdapter.getSelectors<RootState>((state) => state.tasks);

export const getTasksStatus = (state: RootState) => state.tasks.status;

export const getSelectedTaskId = (state: RootState) => state.tasks.selectedId;

export const selectTasksIdsByCompleteness = createSelector(
  [selectTaskEntities, (_, isComplete: boolean) => isComplete],
  (entities, isComplete) =>
    Object.entries(entities)
      .filter(([_, task]) => task?.isComplete === isComplete)
      .map(([id, _]) => +id)
);
