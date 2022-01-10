import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionService } from "../../api/services/TransactionService";
import Transaction from "../../interfaces/transaction.interface";
import { SearchFormType } from "../../pages/Home";
import {
  getCorrectDate,
  isMonthYearSameWithCurrent,
} from "../../utils/formatDate";
import {
  TransactionSummaryResponse,
  updateTransactionI,
  EditTransactionResponse,
  DeleteTransactionResponse,
  TransactionDTO,
} from "./transactions.interface";

export const fetchTransactionSummary = createAsyncThunk(
  "transactions/summary",
  async () => {
    const timeZone = new Date().getTimezoneOffset();
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
  async (search: SearchFormType = { searchText: "", searchDate: "" }) => {
    const response = await TransactionService.getTransactions(search);
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
