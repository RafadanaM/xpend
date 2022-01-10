import Task from "../../interfaces/task.interface";
import Transaction from "../../interfaces/transaction.interface";
import { TransactionDTO } from "../transactions/transactions.interface";

export interface TaskDTO {
  title: string;
  type?: "income" | "expense";
  amount: number;
  description: string;
}

export interface TaskSelectedPayload {
  id: number | undefined;
}

export interface CompleteTaskData {
  taskId: number;
  transactionData: TransactionDTO;
}

export interface EditTaskData extends TaskDTO {
  id: number;
}

export interface CompleteTaskResponse {
  task: Task;
  transaction: Transaction;
}

export interface UndoTaskResponse {
  task: Task;
  transaction: Transaction | undefined;
}
