import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthService } from "../api/services/AuthService";
import { UserService } from "../api/services/UserService";
import User from "../interfaces/user.interface";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setError(null);
  }, [location.pathname]);

  useEffect(() => {
    UserService.getUser()
      .then((user) => setUser(user))
      .catch((_error) => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      AuthService.login(email, password)
        .then((user) => {
          setUser(user);
          navigate("/home", { replace: true });
        })
        .catch((error) => {
          const msg = error?.response?.data?.message;
          setError(msg);
        })
        .finally(() => setLoading(false));
    },
    [navigate]
  );

  function logout() {
    //   sessionsApi.logout().then(() => setUser(undefined));
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error, login]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
