import apiClient from "../ApiClient";

const BASE_SERVICE_URL = "/tasks";

export const TaskService = {
  getTasks: async () => {
    return await apiClient.get(BASE_SERVICE_URL);
  },

  completeTask: async (
    taskId: number,
    title: string,
    amount: number,
    description: string,
    date: string
  ) => {
    return await apiClient.post(`${BASE_SERVICE_URL}/${taskId}/complete`, {
      title,
      description,
      amount,
      date,
    });
  },

  undoTask: async (taskId: number) => {
    return await apiClient.post(`${BASE_SERVICE_URL}/${taskId}/undo`);
  },
};
