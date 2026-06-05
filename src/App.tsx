import Header from "./core/components/layout/public/Header";
import Footer from "./core/components/layout/public/Footer";
import { Routes, Route } from "react-router-dom";


import Home from "./modules/home/pages/Home";
import Login from "./modules/auth/pages/Login";
import Signup from "./modules/auth/pages/Signup";
import Freelancer from "./modules/freelance/pages/Freelancer";
import Enterprise from "./modules/jobs/pages/Enterprise";
import Bootcamp from "./modules/bootcamp/pages/Bootcamp";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-[#121212] dark:text-white">
      <Header/>
      <main className="relative flex-1 overflow-hidden bg-[url('/body/fondo_pagina.png')] bg-cover bg-center bg-no-repeat">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/freelancer" element={<Freelancer />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/bootcamp" element={<Bootcamp />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}
