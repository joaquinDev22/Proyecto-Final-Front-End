import { useNavigate } from 'react-router-dom';
import Button from '../../../../core/components/ui/Button';

export default function FreelancerLanding() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col items-center justify-start pt-20 pb-20 w-full relative">

            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

            <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-10">
                    <span className="flex h-2 w-2 rounded-full bg-purple-400"></span>
                    <span className="text-sm font-medium text-purple-400">El Marketplace Definitivo</span>
                </div>

                {/* Hero Section */}
                <div className="text-center mx-auto mb-20 w-full max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
                        Conecta Talento con <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Oportunidades.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        Ya sea que busques trabajar bajo tus propios términos o necesites contratar a un experto para tu próximo gran proyecto, WorkLink es el lugar correcto.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-xl text-base shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                            onClick={() => navigate('/signup?role=freelancer')}
                        >
                            Quiero Trabajar
                        </Button>
                        <Button
                            variant="outline"
                            className="px-8 py-3 rounded-xl text-base border-white hover:bg-white/10"
                            onClick={() => navigate('/signup?role=client')}
                        >
                            Quiero Contratar
                        </Button>
                    </div>
                </div>

                {/* Dual Value Proposition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-24">
                    {/* For Freelancers */}
                    <div className="glass p-10 rounded-3xl border-t border-purple-500/30 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px]"></div>
                        <h2 className="text-3xl font-bold text-white mb-4">Para Freelancers</h2>
                        <p className="text-slate-400 mb-8 text-lg">Construye tu carrera independiente. Elige los proyectos que te apasionan y trabaja con clientes de todo el mundo.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3 text-slate-300">
                                <span className="text-purple-400 mt-1">✓</span>
                                <span>Pagos seguros y garantizados a través de nuestra plataforma.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-300">
                                <span className="text-purple-400 mt-1">✓</span>
                                <span>Construye un portafolio y reputación con cada proyecto completado.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-300">
                                <span className="text-purple-400 mt-1">✓</span>
                                <span>Flexibilidad total: tú decides cuándo y cuánto trabajar.</span>
                            </li>
                        </ul>
                    </div>

                    {/* For Clients */}
                    <div className="glass p-10 rounded-3xl border-t border-cyan-500/30 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px]"></div>
                        <h2 className="text-3xl font-bold text-white mb-4">Para Clientes</h2>
                        <p className="text-slate-400 mb-8 text-lg">Encuentra al talento perfecto en minutos. Publica tu proyecto y recibe propuestas de expertos validados.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3 text-slate-300">
                                <span className="text-cyan-400 mt-1">✓</span>
                                <span>Publicación de proyectos 100% gratuita y sin compromiso.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-300">
                                <span className="text-cyan-400 mt-1">✓</span>
                                <span>Perfiles con calificaciones reales e historiales de trabajo comprobables.</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-300">
                                <span className="text-cyan-400 mt-1">✓</span>
                                <span>Solo pagas cuando apruebas el trabajo finalizado.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="w-full max-w-4xl glass p-12 rounded-3xl text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 mix-blend-overlay"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">¿Listo para dar el siguiente paso?</h2>
                    <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto relative z-10">
                        Únete a miles de profesionales y empresas que ya están colaborando y creando el futuro juntos en WorkLink.
                    </p>
                    <Button
                        className="bg-white text-[#0b1121] hover:bg-slate-200 px-8 py-3 rounded-xl text-lg font-bold relative z-10"
                        onClick={() => navigate('/signup')}
                    >
                        Comenzar Ahora
                    </Button>
                </div>
            </div>
        </div>
    );
}