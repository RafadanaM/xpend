import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Layouts/Footer";
import Navbar from "./components/Layouts/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import { AuthProvider } from "./utils/useAuth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
