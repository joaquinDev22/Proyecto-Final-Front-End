import { useState, useEffect } from 'react';

import Button from '../../../core/components/ui/Button';
import Badge from '../../../core/components/ui/Badge';
import { bootcampService } from '../../../core/api/bootcampService';
import type { Bootcamp as BootcampType } from '../../../core/data/mockData';

export default function Bootcamp() {
    const [searchQuery, setSearchQuery] = useState('');
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
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                        Acelera tu <span className="text-gradient-brand">Carrera en Tecnología.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        Únete a bootcamps intensivos enfocados en la industria, diseñados para transformarte de principiante a profesional en meses.
                    </p>
                    
                    {/* Search Bar Container */}
                    <div className="w-full max-w-2xl mx-auto relative z-10">
                        <div className="glass rounded-2xl p-2 pl-6 flex flex-col md:flex-row items-center gap-2">
                            <div className="flex-1 w-full flex items-center gap-3">
                                <span className="text-xl">🔍</span>
                                <input 
                                    type="text"
                                    placeholder="Buscar 'Desarrollo Web', 'Data Science'..."
                                    className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button className="w-full md:w-auto px-8 py-3 rounded-xl text-base" onClick={() => {}}>
                                Buscar Bootcamp
                            </Button>
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
                        <p className="text-slate-400">Domina habilidades en demanda en 12-24 semanas en lugar de 4 años. Currículo intensivo y práctico.</p>
                    </div>
                    
                    <div className="glass p-8 rounded-2xl text-center group border-t border-purple-500/20">
                        <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                            💼
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Servicios de Carrera</h3>
                        <p className="text-slate-400">Obtén revisión de CV, preparación de entrevistas y conexiones directas con empleadores al graduarte.</p>
                    </div>

                    <div className="glass p-8 rounded-2xl text-center group border-t border-blue-500/20">
                        <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                            🛠️
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Portafolio de Proyectos</h3>
                        <p className="text-slate-400">Gradúate con un portafolio completo de proyectos del mundo real para mostrar tu experiencia a los empleadores.</p>
                    </div>
                </div>

                {/* Featured Bootcamps */}
                <div className="w-full text-left mb-12">
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

            </div>
        </div>
    );
}