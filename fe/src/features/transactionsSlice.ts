import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import Transaction from "../interfaces/transaction.interface";
import { RootState } from "../app/store";
import { TransactionService } from "../api/services/TransactionService";
// import ExtraState from "../interfaces/extraState.interface";
import { completeTask, undoTask } from "./tasksSlice";
import Task from "../interfaces/task.interface";
import {
  getCorrectDate,
  isMonthYearSameWithCurrent,
} from "../utils/formatDate";

interface TransactionSelectedPayload {
  transaction: Transaction | undefined;
}

export interface TransactionDTO {
  title: string;
  amount: number;
  description: string;
  date: string;
}

interface TransactionSummaryResponse {
  gained: number;
  spent: number;
  totalTransactions: number;
}

interface DeleteTransactionResponse extends Transaction {
  task?: Task;
}

interface updateTransactionI {
  id: number;
  transaction: TransactionDTO;
}

interface EditTransactionResponse {
  prevTransaction: Transaction;
  updatedTransaction: Transaction;
}

interface TransactionState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | SerializedError;
  selectedTransaction: Transaction | undefined;
  spent: number;
  gained: number;
  totalTransactions: number;
}

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

export const fetchTransactionSummary = createAsyncThunk(
  "transactions/summary",
  async () => {
    const timeZone = new Date().getTimezoneOffset() * 60 * 1000;
    const response = await TransactionService.getThisMonthTransactions(
      timeZone
    );
    return response.data as TransactionSummaryResponse;
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ transaction, id }: updateTransactionI, { dispatch }) => {
    const response = await TransactionService.editTransaction(transaction, id);
    const data: EditTransactionResponse = response.data;
    const { prevTransaction, updatedTransaction } = data;
    const currentTransactionDate = getCorrectDate(prevTransaction.date);
    const updatedTransactionDate = getCorrectDate(updatedTransaction.date);
    if (
      prevTransaction.amount !== updatedTransaction.amount &&
      (isMonthYearSameWithCurrent(currentTransactionDate) ||
        isMonthYearSameWithCurrent(updatedTransactionDate))
    ) {
      dispatch(fetchTransactionSummary());
    }
    return data;
  }
);

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await TransactionService.getTransactions();
    return response.data as Transaction[];
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id: number, { dispatch }) => {
    const response = await TransactionService.deleteTransaction(id);
    const data: DeleteTransactionResponse = response.data;
    const deletedTransactionDate = getCorrectDate(data.date);
    if (isMonthYearSameWithCurrent(deletedTransactionDate)) {
      dispatch(fetchTransactionSummary());
    }

    return data;
  }
);

export const addNewTransaction = createAsyncThunk(
  "transactions/addNewTransaction",
  async (transaction: TransactionDTO, { dispatch }) => {
    const response = await TransactionService.createTransaction(
      transaction.title,
      +transaction.amount,
      transaction.description,
      transaction.date
    );
    const data: Transaction = response.data;
    if (isMonthYearSameWithCurrent(getCorrectDate(data.date))) {
      dispatch(fetchTransactionSummary());
    }
    dispatch(fetchTransactions());
  }
);

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
        // if (amount >= 0) {
        //   state.gained -= amount;
        // } else {
        //   state.spent -= Math.abs(amount);
        // }
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
        //I think theres a better way, it's 23:00 I want to sleep
        // const currentAmount = currentTransaction.amount;
        // const updatedAmount = updatedTransaction.amount;
        // if (currentAmount !== updatedAmount) {
        //   if (currentAmount >= 0) {
        //     if (updatedAmount >= 0) {
        //       state.gained += updatedAmount - currentAmount;
        //     } else {
        //       state.gained -= currentAmount;
        //       state.spent += Math.abs(updatedAmount);
        //     }
        //   } else {
        //     if (updatedAmount >= 0) {
        //       state.gained += updatedAmount;
        //       state.spent -= Math.abs(currentAmount);
        //     } else {
        //       state.spent += Math.abs(updatedAmount - currentAmount);
        //     }
        //   }
        // }
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
        // if (transaction.amount >= 0) {
        //   state.gained += transaction.amount;
        // } else {
        //   state.spent += Math.abs(transaction.amount);
        // }
      })
      .addCase(undoTask.fulfilled, (state, action) => {
        // change the be to return transaction instead
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
