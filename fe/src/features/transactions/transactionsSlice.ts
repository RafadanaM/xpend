import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import Transaction from "../../interfaces/transaction.interface";
import { RootState } from "../../app/store";
import {
  TransactionSelectedPayload,
  TransactionState,
} from "./transactions.interface";
import { completeTask, undoTask } from "../tasks/tasks.thunks";
import {
  fetchTransactions,
  deleteTransaction,
  updateTransaction,
  fetchTransactionSummary,
} from "./transaction.thunks";

const transactionsAdapter = createEntityAdapter<Transaction>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = transactionsAdapter.getInitialState<TransactionState>({
  spent: 0,
  gained: 0,
  totalTransactions: 0,
  status: "idle",
  error: null,
  selectedTransaction: undefined,
});

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    transactionSelected: (
      state,
      action: PayloadAction<TransactionSelectedPayload>
    ) => {
      const { transaction } = action.payload;
      state.selectedTransaction = transaction;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTransactions.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        transactionsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        const { id } = action.payload;
        transactionsAdapter.removeOne(state, id);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        //change be to return transaction
        const { prevTransaction, updatedTransaction } = action.payload;
        let currentTransaction = state.entities[updatedTransaction.id];
        if (!currentTransaction) {
          currentTransaction = prevTransaction;
        }
        console.log(updatedTransaction.amount, currentTransaction.amount);
        transactionsAdapter.updateOne(state, {
          id: updatedTransaction.id,
          changes: {
            title: updatedTransaction.title,
            description: updatedTransaction.description,
            date: updatedTransaction.date,
            amount: updatedTransaction.amount,
          },
        });
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const { transaction } = action.payload;
        transactionsAdapter.addOne(state, transaction);
      })
      .addCase(undoTask.fulfilled, (state, action) => {
        const { transaction } = action.payload;
        if (!transaction) return;

        transactionsAdapter.removeOne(state, transaction.id);
      })
      .addCase(fetchTransactionSummary.fulfilled, (state, action) => {
        const { gained, spent, totalTransactions } = action.payload;
        state.spent = spent;
        state.gained = gained;
        state.totalTransactions = totalTransactions;
      });
  },
});

export default transactionsSlice.reducer;

export const { transactionSelected } = transactionsSlice.actions;

export const {
  selectAll: selectAllTransactions,
  selectById: selectTransactionById,
  selectIds: selectTransactionIds,
} = transactionsAdapter.getSelectors<RootState>((state) => state.transactions);

export const getTransactionsStatus = (state: RootState) =>
  state.transactions.status;

export const getSelectedTransaction = (state: RootState) =>
  state.transactions.selectedTransaction;

export const getGained = (state: RootState) => state.transactions.gained;

export const getSpent = (state: RootState) => state.transactions.spent;
