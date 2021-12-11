import Transaction from "../../interfaces/transaction.interface";
import apiClient from "../ApiClient";

const BASE_SERVICE_URL = "/transactions";
export const TransactionService = {
  getTransactions: async () => {
    return await apiClient.get(`${BASE_SERVICE_URL}`);
  },

  createTransaction: async (
    title: string,
    amount: number,
    description: string,
    date: string
  ) => {
    return await apiClient.post(`${BASE_SERVICE_URL}`, {
      title,
      amount,
      description,
      date,
    });
  },

  editTransaction: async (updatedData: Transaction, id: number) => {
    return await apiClient.patch(`${BASE_SERVICE_URL}/${id}`, {
      ...updatedData,
    });
  },

  deleteTransaction: async (id: number) => {
    return await apiClient.delete(`${BASE_SERVICE_URL}/${id}`);
  },
};
