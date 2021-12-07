import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Layouts/Footer";
import Navbar from "./components/Layouts/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";
import { AuthProvider } from "./utils/useAuth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Landing />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
