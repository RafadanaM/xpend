import apiClient from "../ApiClient";

const BASE_SERVICE_URL = "/users";
export const UserService = {
  getUser: async (): Promise<any> => {
    const response = await apiClient.get(`${BASE_SERVICE_URL}`);
    return response.data;
  },
  register: async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string
  ): Promise<any> => {
    const response = await apiClient.post(`${BASE_SERVICE_URL}`, {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    });
    return response.data;
  },
  editProfile: async (values: any) => {
    return await apiClient.patch(`${BASE_SERVICE_URL}`, values);
  },
};
