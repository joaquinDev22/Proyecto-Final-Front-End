import { useNavigate } from 'react-router-dom';
import { Zap, Building2, Rocket } from 'lucide-react';
import Button from "../../../../core/components/ui/Button";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col items-center justify-start pt-20 pb-20 w-full relative">

            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

            <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center">

                {/* Hero Section */}
                <div className="text-center mx-auto mb-20 w-full max-w-5xl animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-cyan-400"></span>
                        <span className="text-sm font-medium text-cyan-400">El ecosistema de talento tecnológico</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight text-white">
                        Todo el mundo tech, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">en un solo lugar.</span>
                    </h1>
                    <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-12">
                        WorkLink es la plataforma integral donde profesionales, empresas y educadores convergen para moldear el futuro de la tecnología.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center relative z-10">
                        <Button
                            className="bg-white text-[#0b1121] hover:bg-slate-200 px-8 py-3 rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            onClick={() => navigate('/signup')}
                        >
                            Comenzar Ahora
                        </Button>
                    </div>
                </div>

                {/* Verticals Hub */}
                <div className="w-full text-center mb-16 mt-12">
                    <h2 className="text-3xl font-bold mb-4 text-white">Descubre nuestras soluciones</h2>
                    <p className="text-slate-400 mb-12">Explora el ecosistema según tus necesidades actuales</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

                        {/* Freelance Route */}
                        <div
                            onClick={() => navigate('/freelancer')}
                            className="glass glass-hover p-10 rounded-3xl text-left flex flex-col group cursor-pointer border-t border-purple-500/30 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px]"></div>
                            <div className="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Mercado Freelance</h3>
                            <p className="text-slate-400 mb-8 flex-1 leading-relaxed">
                                Contrata expertos independientes para tus proyectos o trabaja de forma remota bajo tus propios términos.
                            </p>
                            <div className="flex items-center text-purple-400 font-bold group-hover:translate-x-2 transition-transform">
                                Explorar Freelance <span className="ml-2">&rarr;</span>
                            </div>
                        </div>

                        {/* Enterprise Route */}
                        <div
                            onClick={() => navigate('/enterprise')}
                            className="glass glass-hover p-10 rounded-3xl text-left flex flex-col group cursor-pointer border-t border-blue-500/30 overflow-hidden relative mt-0 md:-mt-8 mb-0 md:mb-8"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px]"></div>
                            <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Building2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Empleos Tech</h3>
                            <p className="text-slate-400 mb-8 flex-1 leading-relaxed">
                                Accede a miles de vacantes en las mejores empresas o publica ofertas para construir tu equipo soñado.
                            </p>
                            <div className="flex items-center text-blue-400 font-bold group-hover:translate-x-2 transition-transform">
                                Buscar Empleos <span className="ml-2">&rarr;</span>
                            </div>
                        </div>

                        {/* Bootcamp Route */}
                        <div
                            onClick={() => navigate('/bootcamps')}
                            className="glass glass-hover p-10 rounded-3xl text-left flex flex-col group cursor-pointer border-t border-cyan-500/30 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px]"></div>
                            <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Rocket className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Educación & Bootcamps</h3>
                            <p className="text-slate-400 mb-8 flex-1 leading-relaxed">
                                Acelera tu carrera tecnológica aprendiendo habilidades reales o conviértete en instructor para guiar a otros.
                            </p>
                            <div className="flex items-center text-cyan-400 font-bold group-hover:translate-x-2 transition-transform">
                                Ver Programas <span className="ml-2">&rarr;</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Statistics / Trust Section */}
                <div className="w-full glass p-10 md:p-16 rounded-3xl mt-12 mb-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h4 className="text-4xl md:text-5xl font-bold text-white mb-2">50k+</h4>
                            <p className="text-slate-400 font-medium">Profesionales</p>
                        </div>
                        <div>
                            <h4 className="text-4xl md:text-5xl font-bold text-white mb-2">2k+</h4>
                            <p className="text-slate-400 font-medium">Empresas Aliadas</p>
                        </div>
                        <div>
                            <h4 className="text-4xl md:text-5xl font-bold text-white mb-2">15k+</h4>
                            <p className="text-slate-400 font-medium">Contrataciones</p>
                        </div>
                        <div>
                            <h4 className="text-4xl md:text-5xl font-bold text-white mb-2">98%</h4>
                            <p className="text-slate-400 font-medium">Satisfacción</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}