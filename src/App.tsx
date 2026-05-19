import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Freelancer from "./pages/Freelancer";
import Enterprise from "./pages/Enterprise";
import Bootcamp from "./pages/Bootcamp";

import { useDarkMode } from "./hooks/useDarkMode";
export default function App() {
  const { darkMode } = useDarkMode();
  return (
    <div className="app">
      <Header darkMode={darkMode} />
      <main className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/freelancer" element={<Freelancer />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/bootcamp" element={<Bootcamp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}