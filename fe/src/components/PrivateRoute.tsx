import { Navigate, Outlet } from "react-router-dom";
import Container from "./Container";

const PrivateRoute = () => {
  const auth = true;
  return auth ? (
    <Container className="h-full">
      <Outlet />
    </Container>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
