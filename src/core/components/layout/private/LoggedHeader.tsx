import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useAuth } from "../../../context/AuthContext";

export default function LoggedHeader() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/home");
    };

    const isActive = (path: string) => location.pathname === path;

    const navLinkClass = (path: string) =>
        `text-sm font-semibold transition-colors duration-200 ${isActive(path)
            ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            : "text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        }`;

    const getHomePath = (rol?: string) => {
        switch (rol) {
            case 'FREELANCER': return '/freelance/buscar-proyecto';
            case 'POSTULANTE': return '/postulante/vacantes'; // Ruta sugerida
            case 'CLIENTE': return '/cliente/dashboard';
            case 'ENTERPRISE': return '/enterprise/dashboard';
            case 'RECRUITER': return '/recruiter/dashboard';
            case 'INSTRUCTOR': return '/instructor/bootcamps';
            default: return '/profile';
        }
    };

    if (loading) {
        return <p>Cargando...</p>
    }
    return (

        <header className="sticky top-0 z-50 bg-[#0b1121]/90 backdrop-blur-md border-b border-white/5 w-full flex justify-center">
            <div className="flex items-center justify-between w-full max-w-[1400px] px-6 md:px-12 py-4">
                <Link to={getHomePath(user?.rol)} className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
                    <img src="/logo/logo_principal.png"
                        alt="WorkLink Logo"
                        className="h-15 w-auto object-contain"
                    />
                    <span className="text-2xl font-bold tracking-tight text-white">
                        Work<span className="text-cyan-400">Link</span>
                    </span>
                </Link>
                {user?.rol === 'FREELANCER' && (
                    <nav className="hidden md:flex items-center gap-10">
                        <Link to="/freelance/buscar-proyecto" className={navLinkClass("/freelance/buscar-proyecto")}>Buscar Proyecto</Link>
                        <Link to="/freelance/proyectos-en-curso" className={navLinkClass("/freelance/proyectos-en-curso")}>Proyectos en curso</Link>
                        <Link to="/freelance/bootcamps" className={navLinkClass("/freelance/bootcamps")}>Bootcamps</Link>
                        <Link to="/freelance/cobros" className={navLinkClass("/freelance/cobros")}>Cobros</Link>
                    </nav>
                )}
                {user?.rol === 'INSTRUCTOR' && (
                    <nav className="hidden md:flex items-center gap-10">
                        <Link to="/instructor/bootcamps" className={navLinkClass("/instructor/bootcamps")}>Mis Bootcamps</Link>
                        {user?.tipoInstructor === 'PARTICULAR' && (
                            <Link to="/instructor/cobros" className={navLinkClass("/instructor/cobros")}>Cobros</Link>
                        )}
                    </nav>
                )}
                {user?.rol === 'RECRUITER' && (
                    <nav className="hidden md:flex items-center gap-10">
                        <Link to="/recruiter/dashboard" className={navLinkClass("/recruiter/dashboard")}>Mis Vacantes</Link>
                        <Link to="/recruiter/vacantes/crear" className={navLinkClass("/recruiter/vacantes/crear")}>Publicar Vacante</Link>
                        <Link to="/recruiter/entrevistas" className={navLinkClass("/recruiter/entrevistas")}>Entrevistas</Link>
                    </nav>
                )}
                {user?.rol === 'ENTERPRISE' && (
                    <nav className="hidden md:flex items-center gap-10">
                        <Link to="/enterprise/dashboard" className={navLinkClass("/enterprise/dashboard")}>Dashboard</Link>
                        <Link to="/enterprise/recruiters" className={navLinkClass("/enterprise/recruiters")}>Recruiters</Link>
                        <Link to="/enterprise/instructores" className={navLinkClass("/enterprise/instructores")}>Instructores</Link>
                    </nav>
                )}
                {user?.rol === 'POSTULANTE' && (
                    <nav className="hidden md:flex items-center gap-10">
                        <Link to="/postulante/vacantes" className={navLinkClass("/postulante/vacantes")}>Vacantes</Link>
                        <Link to="/postulante/postulaciones" className={navLinkClass("/postulante/postulaciones")}>Postulaciones</Link>
                        <Link to="/postulante/bootcamps" className={navLinkClass("/postulante/bootcamps")}>Bootcamps</Link>
                    </nav>
                )}
                {user?.rol === 'CLIENTE' && (
                    <nav className="hidden md:flex items-center gap-10">
                        <Link to="/cliente/dashboard" className={navLinkClass("/cliente/dashboard")}>Dashboard</Link>
                        <Link to="/cliente/mis-proyectos" className={navLinkClass("/cliente/mis-proyectos")}>Mis Proyectos</Link>
                        <Link to="/cliente/publicar" className={navLinkClass("/cliente/publicar")}>Publicar Proyecto</Link>
                    </nav>
                )}


                <div className="flex items-center gap-4">
                    <button
                        className="px-4 py-2 text-sm font-medium transition-all duration-300 border border-transparent text-white active:border-white focus:border-white active:shadow-[0_0_10px_rgba(255,255,255,0.6)] focus:shadow-[0_0_10px_rgba(255,255,255,0.6)] outline-none rounded-lg cursor-pointer hover:bg-white/10"
                        onClick={() => navigate("/profile")}
                    >
                        Perfil
                    </button>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        Cerrar Sesión
                    </Button>
                </div>
            </div>
        </header>
    )
}
