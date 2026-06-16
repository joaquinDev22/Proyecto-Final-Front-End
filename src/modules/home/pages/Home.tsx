import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../../../core/components/ui/Input";
import Button from "../../../core/components/ui/Button";
import { jobCategories } from "../../../core/utils/constants";
import type { Job as JobType } from "../../../core/types/models";
import { jobService } from '../../../core/api/jobService';
import Badge from "../../../core/components/ui/Badge";

export default function Home() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState<JobType[]>([]);

    useEffect(() => {
        jobService.getAll().then(data => {
            setJobs(data);
        }).catch(err => console.error("Error loading jobs", err));
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-start pt-20 pb-20 w-full relative">
            
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-10 animate-fade-in-up">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
                    <span className="text-sm font-medium text-emerald-400">Más de 1,000 nuevos empleos agregados hoy</span>
                </div>

                {/* Hero Section */}
                <div className="text-center mx-auto mb-10 w-full max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                        Encuentra el trabajo que amas, <br/>
                        <span className="text-gradient-brand">bajo tus propios términos.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Conéctate con las mejores empresas para roles a tiempo completo, o descubre oportunidades freelance de alta remuneración en todo el mundo.
                    </p>
                </div>

                {/* Search Bar Container */}
                <div className="w-full max-w-3xl mb-12 relative z-10">
                    <div className="glass rounded-2xl p-4 flex flex-col md:flex-row items-center gap-2">
                        <div className="flex-1 flex items-center gap-3 bg-dark-bg/50 px-4 py-2 rounded-xl border border-white/5 focus-within:border-cyan-500 transition-color">
                            <span className="text-xl">🔍</span>
                            <Input 
                                type="text"
                                placeholder="Título del empleo, palabras clave o empresa"
                                className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 text-base"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="w-full md:w-auto px-8 py-3 rounded-xl text-base" onClick={() => navigate('/enterprise')}>
                            Buscar
                        </Button>
                    </div>
                </div>

                {/* User Paths */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-24">
                    <div className="glass glass-hover p-8 rounded-2xl text-left flex flex-col justify-between group cursor-pointer" onClick={() => navigate('/enterprise')}>
                        <div>
                            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                🏢
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Encontrar Trabajos Tradicionales</h3>
                            <p className="text-slate-400 mb-6">Explora oportunidades de tiempo completo, medio tiempo y contrato en las mejores empresas tecnológicas.</p>
                        </div>
                        <span className="text-cyan-400 font-medium group-hover:translate-x-1 transition-transform inline-block">Explorar Empleos en Empresas &rarr;</span>
                    </div>

                    <div className="glass glass-hover p-8 rounded-2xl text-left flex flex-col justify-between group cursor-pointer" onClick={() => navigate('/freelancer')}>
                        <div>
                            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                ⚡
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Proyectos Freelance</h3>
                            <p className="text-slate-400 mb-6">Descubre trabajos freelance flexibles y bien pagados que coincidan con tus habilidades específicas.</p>
                        </div>
                        <span className="text-purple-400 font-medium group-hover:translate-x-1 transition-transform inline-block">Explorar Proyectos &rarr;</span>
                    </div>
                </div>

                {/* Popular Categories */}
                <div className="w-full text-left mb-24">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Categorías Populares</h2>
                            <p className="text-slate-400">Explora oportunidades según tu experiencia</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {jobCategories.slice(0,4).map((cat, idx) => (
                            <div key={idx} className="glass glass-hover p-6 rounded-xl cursor-pointer group flex flex-col items-start" onClick={() => navigate('/enterprise')}>
                                <div className={`w-10 h-10 bg-${cat.color}-500/20 text-${cat.color}-400 rounded-lg flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                                    {cat.icon}
                                </div>
                                <h3 className="font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{cat.name}</h3>
                                <p className="text-slate-400 text-sm">{cat.count} roles abiertos</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Jobs Preview */}
                <div className="w-full text-left">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Oportunidades Destacadas</h2>
                            <p className="text-slate-400">Mejores selecciones para ti hoy</p>
                        </div>
                        <Button variant="ghost" onClick={() => navigate('/enterprise')}>
                            Ver todo &rarr;
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {jobs.slice(0, 4).map((job) => (
                            <div key={job.id} className="glass glass-hover p-6 rounded-xl cursor-pointer flex flex-col sm:flex-row gap-4 items-start" onClick={() => navigate('/enterprise')}>
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl shrink-0">
                                    {job.logo}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                                        <Badge variant="outline">{job.postedAt}</Badge>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-3">{job.company} • {job.location}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Badge variant={job.type === 'Tiempo Completo' ? 'success' : 'secondary'}>{job.type}</Badge>
                                        <Badge variant="primary">{job.locationType}</Badge>
                                        <span className="text-sm font-medium text-white ml-auto">{job.salary}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}