import axios, { AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL: "/api",
  responseType: "json",
  withCredentials: true,
});

export default apiClient;
