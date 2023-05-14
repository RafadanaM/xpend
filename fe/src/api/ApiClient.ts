import axios, { AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
  responseType: "json",
  withCredentials: true,
});

export default apiClient;
