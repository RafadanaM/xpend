import axios, { AxiosInstance } from "axios";
import history from "../history";
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: "json",
  withCredentials: true,
});

apiClient.interceptors.response.use(undefined, (error) => {
  const status = error?.response?.status;

  if (status === 401) {
    history.push("/");
  }

  return Promise.reject(error);
});

export default apiClient;
