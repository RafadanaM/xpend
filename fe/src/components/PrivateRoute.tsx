import { Navigate, Outlet, useNavigate } from "react-router-dom";
import apiClient from "../api/ApiClient";
import useAuth from "../utils/useAuth";
import Container from "./Container";

const PrivateRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  apiClient.interceptors.response.use(undefined, (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      navigate("/");
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
