import { Navigate, Outlet } from "react-router-dom";
import apiClient from "../api/ApiClient";
import useAuth from "../utils/useAuth";
import Container from "./Container";

const PrivateRoute = () => {
  const { user, setUser } = useAuth();

  apiClient.interceptors.response.use(undefined, (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      setUser(undefined);
    }

    return Promise.reject(error);
  });

  return user ? (
    <Container>
      <Outlet />
    </Container>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
