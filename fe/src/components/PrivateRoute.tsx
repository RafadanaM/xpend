import { Navigate, Outlet } from "react-router-dom";
import Container from "./Container";

const PrivateRoute = () => {
  const auth = true;
  return auth ? (
    <Container>
      <Outlet />
    </Container>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
