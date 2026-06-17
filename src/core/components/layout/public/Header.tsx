import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const isActive = (path: string) => location.pathname === path;
    
    const navLinkClass = (path: string) => 
        `font-semibold transition-colors duration-200 ${
            isActive(path) 
            ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
            : "text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        }`;

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 bg-[#0b1121]/90 backdrop-blur-md border-b border-white/5 w-full flex justify-center">
            <div className="flex flex-col w-full max-w-[1400px]">
                {/* Navbar Desktop / Top Bar Mobile */}
                <div className="flex items-center justify-between px-6 md:px-12 py-4">
                    <Link to="/home" className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity" onClick={closeMenu}>
                        <img src="/logo/logo_principal.png" 
                            alt="WorkLink Logo" 
                            className="h-10 md:h-15 w-auto object-contain" 
                        />
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                            Work<span className="text-cyan-400">Link</span>
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-10">
                        <Link to="/freelancer" className={`text-sm ${navLinkClass("/freelancer")}`}>Freelancers</Link>
                        <Link to="/enterprise" className={`text-sm ${navLinkClass("/enterprise")}`}>Empresas</Link>
                        <Link to="/bootcamp" className={`text-sm ${navLinkClass("/bootcamp")}`}>Bootcamps</Link>
                    </nav>
                    
                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button 
                            variant="outline" size="sm"
                            className="text-white font-bold border-0 shadow-none hover:border-1 border-white hover:shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                            onClick={() => navigate("/login")}
                        >
                            Iniciar sesión
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => navigate("/signup")}>
                            Registrarse
                        </Button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button 
                        className="md:hidden text-white p-2 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden flex flex-col items-center bg-[#0b1121] border-t border-white/5 py-6 gap-6 px-6 shadow-2xl animate-fade-in-down">
                        <nav className="flex flex-col items-center gap-6 w-full">
                            <Link to="/freelancer" className={`text-lg ${navLinkClass("/freelancer")}`} onClick={closeMenu}>Freelancers</Link>
                            <Link to="/enterprise" className={`text-lg ${navLinkClass("/enterprise")}`} onClick={closeMenu}>Empresas</Link>
                            <Link to="/bootcamp" className={`text-lg ${navLinkClass("/bootcamp")}`} onClick={closeMenu}>Bootcamps</Link>
                        </nav>
                        
                        <div className="w-full h-px bg-white/10 my-2"></div>
                        
                        <div className="flex flex-col gap-4 w-full max-w-sm">
                            <Button 
                                variant="outline" 
                                className="w-full text-white font-bold border border-white/20"
                                onClick={() => { closeMenu(); navigate("/login"); }}
                            >
                                Iniciar sesión
                            </Button>
                            <Button 
                                variant="primary" 
                                className="w-full"
                                onClick={() => { closeMenu(); navigate("/signup"); }}
                            >
                                Registrarse
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}