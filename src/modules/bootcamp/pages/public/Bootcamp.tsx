import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../core/components/ui/Button';
import Badge from '../../../../core/components/ui/Badge';
import { bootcampService } from '../../../../core/api/bootcampService';
import type { Bootcamp as BootcampType } from '../../../../core/types/models';

export default function Bootcamp() {
    const navigate = useNavigate();
    const [bootcamps, setBootcamps] = useState<BootcampType[]>([]);

    useEffect(() => {
        bootcampService.getAll().then(data => {
            setBootcamps(data);
        }).catch(err => console.error("Error loading bootcamps", err));
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-start pt-20 pb-20 w-full relative">
            
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

            <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-10 animate-fade-in-up">
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400"></span>
                    <span className="text-sm font-medium text-cyan-400">Próximos grupos comienzan el próximo mes</span>
                </div>

                {/* Hero Section */}
                <div className="text-center mx-auto mb-16 w-full max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
                        Acelera tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Carrera en Tecnología.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        Únete a bootcamps intensivos enfocados en la industria, diseñados para transformarte de principiante a profesional en meses. No requieres experiencia previa.
                    </p>
                    
                    {/* Botones eliminados por redundancia con el final de la página */}
                </div>

                {/* Nueva Sección de Marketing (Reemplazo del Buscador) */}
                <div className="w-full max-w-5xl mx-auto mb-20">
                    <div className="glass p-10 rounded-3xl border-t border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px]"></div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-white mb-4">¿Por qué estudiar en WorkLink?</h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                No solo te enseñamos a programar o analizar datos. Te preparamos para el mundo real. 
                                Nuestros egresados trabajan en las mejores empresas tecnológicas del mundo gracias a nuestra 
                                metodología enfocada 100% en proyectos reales.
                            </p>
                            <div className="flex gap-6">
                                <div>
                                    <h4 className="text-3xl font-bold text-cyan-400 mb-1">94%</h4>
                                    <p className="text-sm text-slate-400">Tasa de Empleabilidad</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-purple-400 mb-1">+40%</h4>
                                    <p className="text-sm text-slate-400">Aumento Salarial Promedio</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 flex justify-center">
                            <div className="w-48 h-48 rounded-full border-4 border-dashed border-cyan-500/30 flex items-center justify-center relative animate-[spin_20s_linear_infinite]">
                                <div className="absolute inset-2 rounded-full border-4 border-purple-500/20"></div>
                                <span className="text-6xl animate-[spin_20s_linear_infinite_reverse]">🎓</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Bootcamps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-24">
                    <div className="glass p-8 rounded-2xl text-center group border-t border-cyan-500/20">
                        <div className="w-14 h-14 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                            🚀
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Aprendizaje Acelerado</h3>
                        <p className="text-slate-400">Domina habilidades en demanda en 12-24 semanas en lugar de 4 años. Currículo intensivo y práctico adaptado al mercado actual.</p>
                    </div>
                    
                    <div className="glass p-8 rounded-2xl text-center group border-t border-purple-500/20">
                        <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                            💼
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Servicios de Carrera</h3>
                        <p className="text-slate-400">Obtén revisión de CV, preparación intensiva de entrevistas y conexiones directas con empleadores aliados al graduarte.</p>
                    </div>

                    <div className="glass p-8 rounded-2xl text-center group border-t border-blue-500/20">
                        <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                            🛠️
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Portafolio de Proyectos</h3>
                        <p className="text-slate-400">Gradúate con un portafolio completo de proyectos reales y complejos para demostrar tu experiencia directamente a los empleadores.</p>
                    </div>
                </div>

                {/* Featured Bootcamps */}
                <div className="w-full text-left mb-24">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 text-white">Programas Destacados</h2>
                            <p className="text-slate-400">Bootcamps mejor calificados inscribiendo ahora</p>
                        </div>
                        <Button variant="ghost">Ver todos los programas &rarr;</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bootcamps.map((bootcamp) => (
                            <div key={bootcamp.id} className="glass glass-hover p-6 rounded-2xl cursor-pointer flex flex-col group transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl border border-white/10 shrink-0">
                                            {bootcamp.logo}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">{bootcamp.title}</h3>
                                            <p className="text-slate-400 text-sm">{bootcamp.provider}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md text-sm font-semibold border border-yellow-500/20">
                                        <span>⭐</span> {bootcamp.rating}
                                    </div>
                                </div>
                                
                                <p className="text-slate-300 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {bootcamp.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {(bootcamp.tags || []).map((tag, i) => (
                                        <Badge key={i} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                                
                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-4 text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <span className="text-lg">⏱️</span> {bootcamp.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="text-lg">📍</span> {bootcamp.format}
                                        </span>
                                    </div>
                                    <span className="font-bold text-white bg-dark-bg/50 px-3 py-1 rounded-lg border border-white/5">
                                        {bootcamp.price}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA / Instructor Dual */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                    <div className="glass p-12 rounded-3xl text-center relative overflow-hidden flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 mix-blend-overlay"></div>
                        <h2 className="text-2xl font-bold text-white mb-4 relative z-10">Conviértete en Estudiante</h2>
                        <p className="text-slate-300 text-sm mb-8 relative z-10">
                            Inicia tu proceso de postulación hoy. Las plazas para las próximas cohortes son limitadas.
                        </p>
                        <Button 
                            className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl text-sm font-bold relative z-10 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            onClick={() => navigate('/signup?role=job_seeker')}
                        >
                            Comenzar Proceso de Admisión
                        </Button>
                    </div>

                    <div className="glass p-12 rounded-3xl text-center relative overflow-hidden border-t border-purple-500/30 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 mix-blend-overlay"></div>
                        <h2 className="text-2xl font-bold text-white mb-4 relative z-10">¿Eres un Experto?</h2>
                        <p className="text-slate-300 text-sm mb-8 relative z-10">
                            Crea y administra tus propios bootcamps, enseña a miles de estudiantes y monetiza tus conocimientos.
                        </p>
                        <Button 
                            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl text-sm font-bold relative z-10 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                            onClick={() => navigate('/signup?role=instructor')}
                        >
                            Crear Cuenta de Instructor
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}