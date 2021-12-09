import User from "./user.interface";

interface Transaction {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: string;
  created: string;
  updated: string;
  user: User;
}
export default Transaction;
