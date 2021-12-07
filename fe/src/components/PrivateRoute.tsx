import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/useAuth";
import Container from "./Container";

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? (
    <Container>
      <Outlet />
    </Container>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
