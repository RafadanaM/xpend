import apiClient from "../ApiClient";

export const UserService = {
  getUser: async (): Promise<any> => {
    const response = await apiClient.get("/users");
    return response.data;
  },
};
