import Transaction from "../../interfaces/transaction.interface";
import { SearchFormType } from "../../pages/Home";
import apiClient from "../ApiClient";

const BASE_SERVICE_URL = "/transactions";
export const TransactionService = {
  getTransactions: async (
    search: SearchFormType = { searchText: "", searchDate: "" }
  ) => {
    if (search.searchText !== "") {
      if (search.searchDate !== "") {
        return await apiClient.get(
          `${BASE_SERVICE_URL}/search?search=${search.searchText}&date=${search.searchDate}`
        );
      } else {
        return await apiClient.get(`${BASE_SERVICE_URL}/search?search=${search.searchText}`);
      }
    } else {
      if (search.searchDate !== "") {
        return await apiClient.get(`${BASE_SERVICE_URL}/search?date=${search.searchDate}`);
      }
      return await apiClient.get(`${BASE_SERVICE_URL}`);
    }
  },

  getThisMonthTransactions: async () => {
    return await apiClient.get(`${BASE_SERVICE_URL}/summary`);
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
