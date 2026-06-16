import Header from "./core/components/layout/public/Header";
import Footer from "./core/components/layout/public/Footer";
import { Routes, Route } from "react-router-dom";

import Home from "./modules/home/pages/Home";
import Login from "./modules/auth/pages/Login";
import Signup from "./modules/auth/pages/Signup";
import Freelancer from "./modules/freelance/pages/Freelancer";
import Enterprise from "./modules/jobs/pages/Enterprise";
import Bootcamp from "./modules/bootcamp/pages/Bootcamp";
import ProfilePage from "./modules/profile/pages/ProfilePage";
import { AuthProvider } from "./core/context/AuthContext";
import ProtectedRoute from "./core/components/layout/private/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#0b1121] text-white font-sans">
        <Header/>
        <main className="relative flex-1 overflow-hidden flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            
            {/* Rutas públicas (Landing pages) */}
            <Route path="/freelancer" element={<Freelancer />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/bootcamp" element={<Bootcamp />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />

            {/* Ruta protegida */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer/>
      </div>
    </AuthProvider>
  );
}
