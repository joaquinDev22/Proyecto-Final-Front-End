import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { jobService } from '../../../core/api/jobService';
import type { Job as JobType } from '../../../core/data/mockData';
import Button from '../../../core/components/ui/Button';
import Input from '../../../core/components/ui/Input';

export default function Enterprise() {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilters, setTypeFilters] = useState<Set<string>>(new Set());
    const [locationFilters, setLocationFilters] = useState<Set<string>>(new Set());
    const [jobs, setJobs] = useState<JobType[]>([]);

    useEffect(() => {
        jobService.getAll().then(data => {
            setJobs(data);
        }).catch(err => console.error("Error loading jobs", err));
    }, []);

    const toggleFilter = (set: Set<string>, value: string, setter: React.Dispatch<React.SetStateAction<Set<string>>>) => {
        const newSet = new Set(set);
        if (newSet.has(value)) newSet.delete(value);
        else newSet.add(value);
        setter(newSet);
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              job.company?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilters.size === 0 || typeFilters.has(job.type);
        const matchesLoc = locationFilters.size === 0 || locationFilters.has(job.locationType);
        return matchesSearch && matchesType && matchesLoc;
    });

    return (
        <div className="flex-1 flex flex-col pt-10 pb-20 px-6 w-full max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold mb-3 text-white">Empleos en Empresas</h1>
                <p className="text-slate-400 text-lg">Encuentra el mejor talento y oportunidades para tu crecimiento profesional.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 flex-shrink-0 sticky top-28">
                    <div className="glass rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-lg text-white">Filtros</h2>
                            {(typeFilters.size > 0 || locationFilters.size > 0 || searchTerm) && (
                                <Button 
                                    variant="ghost"
                                    size="sm"
                                    className="text-cyan-400 hover:text-cyan-300"
                                    onClick={() => { setTypeFilters(new Set()); setLocationFilters(new Set()); setSearchTerm(''); }}
                                >
                                    Borrar todos
                                </Button>
                            )}
                        </div>
                        
                        <div className="mb-6">
                            <Input 
                                type="text"
                                label="Buscar"
                                placeholder="Palabras clave o empresa..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-300 mb-3">Tipo de Empleo</label>
                            <div className="space-y-3">
                                {['Tiempo Completo', 'Medio Tiempo', 'Contrato'].map(type => (
                                    <label key={type} className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${typeFilters.has(type) ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600 group-hover:border-cyan-400'}`}>
                                            {typeFilters.has(type) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={typeFilters.has(type)} onChange={() => toggleFilter(typeFilters, type, setTypeFilters)} />
                                        <span className="group-hover:text-white transition-colors">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-slate-300 mb-3">Ubicación</label>
                            <div className="space-y-3">
                                {['Remoto', 'Presencial', 'Híbrido'].map(loc => (
                                    <label key={loc} className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${locationFilters.has(loc) ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600 group-hover:border-cyan-400'}`}>
                                            {locationFilters.has(loc) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={locationFilters.has(loc)} onChange={() => toggleFilter(locationFilters, loc, setLocationFilters)} />
                                        <span className="group-hover:text-white transition-colors">{loc}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <p className="text-sm font-medium text-slate-400">
                            Mostrando <span className="text-white">{filteredJobs.length}</span> resultados
                        </p>
                        <select className="bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-cyan-400 cursor-pointer">
                            <option>Más Recientes</option>
                            <option>Más Relevantes</option>
                            <option>Mayor Salario</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))
                        ) : (
                            <div className="glass rounded-2xl flex flex-col items-center justify-center py-24 px-4 text-center border-dashed border-2 border-white/10">
                                <div className="w-16 h-16 bg-slate-800 text-slate-400 flex items-center justify-center rounded-full mb-4 text-3xl">
                                    🔍
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">No se encontraron empleos</h3>
                                <p className="text-slate-400 text-sm max-w-sm mb-6">
                                    No pudimos encontrar ningún empleo que coincida con tus criterios. Intenta ajustar tus filtros de búsqueda.
                                </p>
                                <Button variant="outline" onClick={() => { setTypeFilters(new Set()); setLocationFilters(new Set()); setSearchTerm(''); }}>
                                    Borrar todos los filtros
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}