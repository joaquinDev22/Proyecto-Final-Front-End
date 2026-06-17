import { Outlet, Navigate } from "react-router-dom";
import Header from "../public/Header";
import Footer from "../public/Footer";
import { useAuth } from "../../../context/AuthContext";

export default function PublicLayout() {
  const { isAuthenticated, loading } = useAuth();

  // Si está cargando, podemos mostrar nada o un loader pequeño
  if (loading) return null;

  // Si está logueado, lo sacamos de las páginas públicas y lo mandamos a su panel
  if (isAuthenticated) {
      return <Navigate to="/profile" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1121] text-white font-sans">
      <Header />
      <main className="relative flex-1 overflow-hidden flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}