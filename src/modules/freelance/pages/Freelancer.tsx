import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { freelanceService } from '../../../core/api/freelanceService';
import type { FreelanceProject as FreelanceProjectType } from '../../../core/data/mockData';
import Button from '../../../core/components/ui/Button';

export default function Freelancer() {
    const [searchTerm, setSearchTerm] = useState('');
    const [projects, setProjects] = useState<FreelanceProjectType[]>([]);

    useEffect(() => {
        freelanceService.getAll().then(data => {
            setProjects(data);
        }).catch(err => console.error("Error loading freelance projects", err));
    }, []);

    const filteredProjects = projects.filter(proj => 
        proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (proj.skills || []).some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="flex-1 flex flex-col pt-10 pb-20 px-6 w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-medium mb-4">
                    ⚡ Mercado Freelance
                </div>
                <h1 className="text-4xl font-bold mb-4 text-white">Encuentra Tu Próximo Gran Proyecto</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Conéctate con clientes que buscan tu experiencia específica. Oferta en proyectos, construye tu reputación y trabaja bajo tus propios términos.
                </p>
            </div>

            {/* Search and Filters */}
            <div className="glass rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-center gap-3 bg-dark-bg/50 px-4 py-2 rounded-xl border border-white/5 focus-within:border-purple-500 transition-colors">
                    <span className="text-lg">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Buscar habilidades (ej., React, SEO, Solidity)..." 
                        className="w-full bg-transparent border-none text-white focus:outline-none text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select className=" bg-dark-bg/50 border border-white/5 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-purple-500 cursor-pointer sm:w-48">
                    <option>Todos los tipos de pago</option>
                    <option>Precio Fijo</option>
                    <option>Tarifa por Hora</option>
                </select>
                <Button className="rounded-[8px] p-2 bg-purple-600 hover:bg-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] whitespace-nowrap">
                    Encontrar Proyectos
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm font-medium text-slate-400">
                        Mostrando <span className="text-white">{filteredProjects.length}</span> proyectos disponibles
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>Ordenar por:</span>
                        <select className="bg-transparent border-none text-white outline-none cursor-pointer font-medium">
                            <option>Más recientes</option>
                            <option>Mayor presupuesto</option>
                            <option>Menos propuestas</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        <div className="col-span-full glass rounded-2xl flex flex-col items-center justify-center py-20 px-4 text-center border-dashed border-2 border-white/10">
                            <h3 className="text-xl font-bold mb-2 text-white">No se encontraron proyectos</h3>
                            <p className="text-slate-400 text-sm max-w-sm mb-6">
                                Intenta ajustar tus palabras clave de búsqueda o explorar diferentes categorías.
                            </p>
                            <Button variant="outline" onClick={() => setSearchTerm('')}>
                                Borrar Búsqueda
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}