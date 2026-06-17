import { useNavigate } from 'react-router-dom';
import { Building2, Target, Rocket } from "lucide-react";
import Button from '../../../../core/components/ui/Button';

export default function EnterpriseLanding() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col items-center justify-start pt-20 pb-20 w-full relative">

            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

            <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-10">
                    <span className="flex h-2 w-2 rounded-full bg-blue-400"></span>
                    <span className="text-sm font-medium text-blue-400">Bolsa de Empleo Tech</span>
                </div>

                {/* Hero Section */}
                <div className="text-center mx-auto mb-20 w-full max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
                        El Ecosistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Laboral Perfecto.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        Donde las mejores empresas encuentran el talento que necesitan, y donde los profesionales tech impulsan su carrera al siguiente nivel.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl text-base shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                            onClick={() => navigate('/signup?role=enterprise')}
                        >
                            Publicar Empleos (Empresas)
                        </Button>
                        <Button
                            variant="outline"
                            className="px-8 py-3 rounded-xl text-base border-white hover:bg-white/10"
                            onClick={() => navigate('/signup?role=job_seeker')}
                        >
                            Buscar Empleos (Postulantes)
                        </Button>
                    </div>
                </div>

                {/* Triple Value Proposition */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-24">

                    {/* For Companies */}
                    <div className="glass p-8 rounded-3xl border-t border-blue-500/30 flex flex-col">
                        <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                            <Building2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Para Empresas</h2>
                        <p className="text-slate-400 mb-6 flex-1">Construye equipos de alto rendimiento. Accede a nuestra base de datos de profesionales tecnológicos pre-evaluados.</p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2 text-sm text-slate-300">
                                <span className="text-blue-400">✓</span> Publicación de vacantes
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-300">
                                <span className="text-blue-400">✓</span> Branding empleador
                            </li>
                        </ul>
                    </div>

                    {/* For Recruiters */}
                    <div className="glass p-8 rounded-3xl border-t border-purple-500/30 flex flex-col">
                        <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6">
                            <Target className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Para Recruiters</h2>
                        <p className="text-slate-400 mb-6 flex-1">Gestiona el ciclo completo de reclutamiento con herramientas avanzadas de seguimiento de candidatos (ATS integrado).</p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2 text-sm text-slate-300">
                                <span className="text-purple-400">✓</span> Gestión de pipelines
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-300">
                                <span className="text-purple-400">✓</span> Filtros inteligentes
                            </li>
                        </ul>
                    </div>

                    {/* For Applicants */}
                    <div className="glass p-8 rounded-3xl border-t border-cyan-500/30 flex flex-col">
                        <div className="w-14 h-14 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-6">
                            <Rocket className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Para Postulantes</h2>
                        <p className="text-slate-400 mb-6 flex-1">Descubre oportunidades en empresas líderes. Postula fácilmente y haz seguimiento del estado de tu candidatura.</p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2 text-sm text-slate-300">
                                <span className="text-cyan-400">✓</span> Miles de vacantes tech
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-300">
                                <span className="text-cyan-400">✓</span> Estado de postulaciones
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Final CTA */}
                <div className="w-full max-w-4xl glass p-12 rounded-3xl text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 mix-blend-overlay"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Forma parte de la comunidad</h2>
                    <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto relative z-10">
                        Inicia tu proceso hoy. Ya sea para contratar, reclutar o encontrar tu próximo desafío.
                    </p>
                    <Button
                        className="bg-white text-[#0b1121] hover:bg-slate-200 px-8 py-3 rounded-xl text-lg font-bold relative z-10"
                        onClick={() => navigate('/signup')}
                    >
                        Crear una Cuenta
                    </Button>
                </div>
            </div>
        </div>
    );
}