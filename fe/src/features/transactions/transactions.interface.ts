import { SerializedError } from "@reduxjs/toolkit";
import Task from "../../interfaces/task.interface";
import Transaction from "../../interfaces/transaction.interface";

export interface TransactionSelectedPayload {
  transaction: Transaction | undefined;
}

export interface TransactionDTO {
  title: string;
  amount: number;
  description: string;
  date: string;
}

export interface TransactionSummaryResponse {
  gained: number;
  spent: number;
  totalTransactions: number;
}

export interface DeleteTransactionResponse extends Transaction {
  task?: Task;
}

export interface updateTransactionI {
  id: number;
  transaction: TransactionDTO;
}

export interface EditTransactionResponse {
  prevTransaction: Transaction;
  updatedTransaction: Transaction;
}

export interface TransactionState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | SerializedError;
  selectedTransaction: Transaction | undefined;
  spent: number;
  gained: number;
  totalTransactions: number;
}
