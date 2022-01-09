import apiClient from "../ApiClient";

const BASE_SERVICE_URL = "/tasks";

export const TaskService = {
  createTask: async (title: string, description: string, amount: number) => {
    console.log(amount);

    return await apiClient.post(BASE_SERVICE_URL, {
      title,
      description,
      amount,
    });
  },

  getTasks: async () => {
    return await apiClient.get(BASE_SERVICE_URL);
  },

  editTask: async (
    title: string,
    description: string,
    amount: number,
    id: number
  ) => {
    return await apiClient.patch(`${BASE_SERVICE_URL}/${id}`, {
      title,
      description,
      amount,
    });
  },

  deleteTask: async (id: number) => {
    console.log(id);

    return await apiClient.delete(`${BASE_SERVICE_URL}/${id}`);
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
