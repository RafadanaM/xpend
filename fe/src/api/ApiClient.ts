import axios, { AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
  withCredentials: true,
});

export default apiClient;
