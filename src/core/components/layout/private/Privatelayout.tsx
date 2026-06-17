import { Outlet, Navigate } from "react-router-dom";
import LoggedHeader from "../private/LoggedHeader";
import Footer from "../public/Footer";
import { useAuth } from "../../../context/AuthContext";
export default function PrivateLayout() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

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