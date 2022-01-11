import { TransactionDTO } from "../../features/transactions/transactions.interface";
import { SearchFormType } from "../../pages/Home";
import apiClient from "../ApiClient";

const BASE_SERVICE_URL = "/transactions";
export const TransactionService = {
  getTransactions: async (
    search: SearchFormType = { searchText: "", searchDate: "" }
  ) => {
    return await apiClient.get(
      `${BASE_SERVICE_URL}/?name=${search.searchText}&date=${search.searchDate}`
    );
  },

  getThisMonthTransactions: async (timeZone: number) => {
    return await apiClient.post(`${BASE_SERVICE_URL}/summary`, {
      timeZone,
    });
  },

  createTransaction: async (
    title: string,
    amount: number,
    description: string,
    date: string
  ) => {
    console.log(date);

    return await apiClient.post(`${BASE_SERVICE_URL}`, {
      title,
      amount,
      description,
      date,
    });
  },

  editTransaction: async (updatedData: TransactionDTO, id: number) => {
    return await apiClient.patch(`${BASE_SERVICE_URL}/${id}`, {
      ...updatedData,
    });
  },

  deleteTransaction: async (id: number) => {
    return await apiClient.delete(`${BASE_SERVICE_URL}/${id}`);
  },
};
