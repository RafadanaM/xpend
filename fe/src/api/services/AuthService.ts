import apiClient from "../ApiClient";

export const AuthService = {
  login: async (email: string, password: string): Promise<any> => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },
};
