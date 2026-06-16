import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useAuth } from "../../../context/AuthContext";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    
    const isActive = (path: string) => location.pathname === path;
    
    const navLinkClass = (path: string) => 
        `text-sm font-semibold transition-all duration-300 ${
            isActive(path) 
            ? "text-cyan-400 border-b-2 border-cyan-400 pb-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
            : "text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        }`;

    const handleLogout = () => {
        logout();
        navigate("/home");
    };

    return (
        <header className="sticky top-0 z-50 bg-[#0b1121]/90 backdrop-blur-md border-b border-white/5 w-full flex justify-center">
            <div className="flex items-center justify-between w-full max-w-[1400px] px-6 md:px-12 py-4">
                <Link to="/home" className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
                    <img 
                        src="/logo/logo_principal.png" 
                        alt="WorkLink Logo" 
                        className="h-15 w-auto object-contain" 
                    />
                    <span className="text-2xl font-bold tracking-tight text-white">
                        Work<span className="text-cyan-400">Link</span>
                    </span>
                </Link>
                
                <nav className="hidden md:flex items-center gap-10">
                    <Link to="/freelancer" className={navLinkClass("/freelancer")}>Freelancers</Link>
                    <Link to="/enterprise" className={navLinkClass("/enterprise")}>Empresas</Link>
                    <Link to="/bootcamp" className={navLinkClass("/bootcamp")}>Bootcamps</Link>
                </nav>
                
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <button 
                                className="px-4 py-2 text-sm font-medium transition-all duration-300 border border-transparent text-white active:border-white focus:border-white active:shadow-[0_0_10px_rgba(255,255,255,0.6)] focus:shadow-[0_0_10px_rgba(255,255,255,0.6)] outline-none rounded-lg cursor-pointer hover:bg-white/10" 
                                onClick={() => navigate("/profile")}
                            >
                                Perfil
                            </button>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                Cerrar Sesión
                            </Button>
                        </>
                    ) : (
                        <>
                            <button 
                                className="px-4 py-2 text-sm font-medium transition-all duration-300 border border-transparent text-white active:border-white focus:border-white active:shadow-[0_0_10px_rgba(255,255,255,0.6)] focus:shadow-[0_0_10px_rgba(255,255,255,0.6)] outline-none rounded-lg cursor-pointer" 
                                onClick={() => navigate("/login")}
                            >
                                Iniciar sesión
                            </button>
                            <Button variant="primary" size="sm" onClick={() => navigate("/signup")}>
                                Registrarse
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}