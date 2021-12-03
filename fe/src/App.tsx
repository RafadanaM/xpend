import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="flex flex-col min-h-screen h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<PrivateRoute />}>
            <Route path="" element={<Home />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
