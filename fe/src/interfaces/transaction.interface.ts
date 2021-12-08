import User from "./user.interface";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  created: string;
  updated: string;
  user: User;
}
export default Transaction;
