import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import ExtraState from "../../interfaces/extraState.interface";
import Task from "../../interfaces/task.interface";
import { deleteTransaction } from "../transactions/transaction.thunks";
import { TaskSelectedPayload } from "./tasks.interface";
import {
  fetchTasks,
  addNewTask,
  completeTask,
  updateTask,
  deleteTask,
  undoTask,
} from "./tasks.thunks";

const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => a.created.localeCompare(b.created),
});

const initialState = tasksAdapter.getInitialState<ExtraState>({
  status: "idle",
  error: null,
  selectedId: undefined,
});

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
