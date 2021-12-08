import apiClient from "../ApiClient";

export const UserService = {
  getUser: async (): Promise<any> => {
    const response = await apiClient.get("/users");
    return response.data;
  },
  register: async (first_name: string, last_name: string, email: string, password: string, confirm_password: string): Promise<any> => {
    const response = await apiClient.post("/users", {first_name, last_name, email, password, confirm_password});
    return response.data
  }
};
