import apiClient from "../ApiClient";

export const AuthService = {
  login: async (email: string, password: string): Promise<any> => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) : Promise<any> => {
    const response = await apiClient.post("/users", { firstName, lastName, email, password, confirmPassword });
    return response.data;
  },
};
