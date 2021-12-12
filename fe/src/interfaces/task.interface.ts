import Transaction from "./transaction.interface";

interface Task {
  id: number;
  title: string;
  description: string;
  amount: number;
  isComplete: boolean;
  created: string;
  updated: string;
  transactions: Transaction[];
}
export default Task;
