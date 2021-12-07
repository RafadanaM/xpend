import apiClient from "../ApiClient";

const BASE_SERVICE_URL = "/auth";
export const AuthService = {
  login: async (email: string, password: string): Promise<any> => {
    const response = await apiClient.post(`${BASE_SERVICE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  },

  logout: async (): Promise<any> => {
    const response = await apiClient.post(`${BASE_SERVICE_URL}/logout`);
    return response;
  },
};
