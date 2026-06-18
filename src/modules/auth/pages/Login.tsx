import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../core/components/ui/Button";
import { useAuth } from "../../../core/context/AuthContext";
import { useShowPassword } from "../hooks/useShowPassword";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { showPassword, setShowPassword } = useShowPassword();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const profile = await login({ usuario, password });
            
            let isIncomplete = false;
            if (profile) {
                if (profile.rol === 'ENTERPRISE' || profile.rol === 'RECRUITER' || profile.rol === 'EMPRESA') {
                    isIncomplete = !profile.nombre || profile.nombre === "" || !profile.descripcion || profile.descripcion === "";
                } else {
                    isIncomplete = !profile.nombre || profile.nombre === "" || !profile.apellido || profile.apellido === "";
                }
            }

            if (isIncomplete) {
                navigate('/onboarding');
            } else {
                navigate('/profile');
            }
        } catch (err: any) {
            setError(err.response?.data?.mensaje || "Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            <div className="glass rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-2xl relative z-10 border-t border-white/20">
                <div className="flex justify-center mb-8">
                    <img 
                        src="/logo/logo_principal.png" 
                        alt="WorkLink Logo" 
                        className="h-30 w-auto object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                    />
                </div>
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-white tracking-tight">Bienvenido de nuevo</h1>
                    <p className="text-slate-400 text-sm">Ingresa tus credenciales para acceder a tu cuenta.</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Correo o Usuario</label>
                        <input 
                            type="text" 
                            placeholder="Usuario o correo" 
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                            className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Contraseña</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 pr-12 transition-all"
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium hover:text-white transition-colors"
                            >
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <label 
                            className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer group"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default label click behavior that might toggle twice
                                setRememberMe(!rememberMe);
                            }}
                        >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${rememberMe ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600 group-hover:border-cyan-400'}`}>
                                <svg className={`w-3 h-3 text-white ${rememberMe ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span className="group-hover:text-white transition-colors">Recordarme</span>
                        </label>
                        <a href="#" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">¿Olvidaste tu contraseña?</a>
                    </div>

                    <Button type="submit" className="w-full py-3 text-base shadow-lg shadow-cyan-500/20" disabled={isLoading}>
                        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </Button>
                </form>

                <div className="mt-8 flex items-center justify-center">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <span className="px-4 text-xs text-slate-400 font-medium uppercase tracking-wider">O continúa con</span>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>

                <div className="mt-6 flex gap-4">
                    <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2 py-3">
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/></svg>
                        Google
                    </Button>
                    <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2 py-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                        GitHub
                    </Button>
                </div>

                <div className="mt-8 text-center text-sm text-slate-400">
                    ¿No tienes una cuenta? <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">Regístrate</Link>
                </div>
            </div>
        </div>
    );
}