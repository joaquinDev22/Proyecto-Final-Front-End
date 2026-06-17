import { useNavigate, useSearchParams } from "react-router-dom";
import ClientFields from "../components/ClientFields";
import Select from "../../../core/components/ui/Select";

export default function Signup(){
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Obtenemos el rol desde la URL o usamos 'freelancer' por defecto
    const role = searchParams.get('role') || 'freelancer';

    const handleRoleChange = (newRole: string) => {
        setSearchParams({ role: newRole });
    };

    const roleOptions = [
        { label: 'Quiero trabajar (Freelancer)', value: 'freelancer' },
        { label: 'Quiero contratar (Cliente)', value: 'client' },
        { label: 'Soy Empresa / Reclutador', value: 'enterprise' },
        { label: 'Busco empleo fijo (Postulante)', value: 'job_seeker' },
        { label: 'Quiero enseñar (Instructor)', value: 'instructor' }
    ];

    return (
        <div className="min-h-[calc(100vh-60px)] flex items-center justify-center flex-col p-8 relative">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            
            <div className="w-full max-w-xl h-fit glass rounded-3xl border-t border-white/10 p-8 sm:p-12 flex flex-col items-center shadow-2xl relative z-10">
                <img src="/logo/logo_principal.png" alt="WorkLink Logo" className="h-16 w-auto object-contain mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
                
                <h1 className="text-white font-bold text-3xl mb-2 text-center">Crea tu cuenta</h1>
                <p className="text-slate-400 mb-8 text-center">Únete a la red de talento más grande</p>

                {/* Selector de Rol */}
                <div className="w-full mb-8">
                    <label className="block text-sm font-medium text-slate-300 mb-2">¿Cómo quieres usar WorkLink?</label>
                    <Select 
                        value={role}
                        onChange={handleRoleChange}
                        options={roleOptions}
                        className="w-full"
                    />
                </div>

                {/* Renderizado dinámico del formulario según el rol */}
                <div className="w-full border-t border-white/5 pt-8">
                    {role === 'client' && <ClientFields />}
                    
                    {role === 'freelancer' && (
                        <div className="text-center text-slate-400 py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                            Formulario de Freelancer próximamente
                        </div>
                    )}

                    {role === 'enterprise' && (
                        <div className="text-center text-slate-400 py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                            Formulario de Empresa próximamente
                        </div>
                    )}

                    {role === 'job_seeker' && (
                        <div className="text-center text-slate-400 py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                            Formulario de Postulante próximamente
                        </div>
                    )}

                    {role === 'instructor' && (
                        <div className="text-center text-slate-400 py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                            Formulario de Instructor próximamente
                        </div>
                    )}
                </div>

                {/* Botón de volver */}
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => navigate('/home')}
                        className="text-slate-400 hover:text-white transition-colors text-sm underline underline-offset-4"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>  
    );
}     