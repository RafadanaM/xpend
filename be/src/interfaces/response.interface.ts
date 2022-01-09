import Transactions from "../modules/transactions/transactions.entity";


export interface TransactionSummaryResponse {
  gained: number;
  spent: number;
  totalTransactions: number;
}

export interface EditTransactionResponse {
  prevTransaction: Transactions
  updatedTransaction: Transactions
}
