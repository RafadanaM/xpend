import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transactionsSlice";
import tasksReducer from "../features/tasksSlice";

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
