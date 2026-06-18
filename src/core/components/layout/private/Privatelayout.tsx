import { Outlet, Navigate, useLocation } from "react-router-dom";
import LoggedHeader from "../private/LoggedHeader";
import Footer from "../public/Footer";
import { useAuth } from "../../../context/AuthContext";
export default function PrivateLayout() {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  let isIncomplete = false;
  if (user) {
    if (user.rol === 'ENTERPRISE' || user.rol === 'RECRUITER' || user.rol === 'EMPRESA') {
      isIncomplete = !user.nombre || user.nombre === "" || !user.descripcion || user.descripcion === "";
    } else {
      isIncomplete = !user.nombre || user.nombre === "" || !user.apellido || user.apellido === "";
    }
  }
  
  if (isIncomplete && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1121] text-white font-sans">
      <LoggedHeader />
      <main className="relative flex-1 overflow-hidden flex flex-col">
        <Outlet /> {/* Aquí se renderizará ProfilePage, Dashboard, etc. */}
      </main>
      <Footer />
    </div>
  );
}