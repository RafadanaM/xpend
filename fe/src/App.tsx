import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="flex flex-col min-h-screen h-screen">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
