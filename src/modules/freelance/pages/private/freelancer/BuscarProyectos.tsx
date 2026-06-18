import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardProjectCard from "../../../components/DashboardProjectCard";
import Input from "../../../../../core/components/ui/Input";
import Select from "../../../../../core/components/ui/Select";

export default function BuscarProyectos() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [categoria, setCategoria] = useState("");
    const [presupuesto, setPresupuesto] = useState("");

    // TODO: Define proper types centrally
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const opcionesCategoria = [
        { label: "Todas las categorías", value: "" },
        { label: "Desarrollo Web", value: "web" },
        { label: "App Móvil", value: "mobile" },
        { label: "Base de Datos", value: "db" },
        { label: "Diseño UX/UI", value: "design" }
    ];

    const opcionesPresupuesto = [
        { label: "Cualquier presupuesto", value: "" },
        { label: "Menos de $500", value: "low" },
        { label: "$500 - $1,500", value: "mid" },
        { label: "Más de $1,500", value: "high" }
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { freelanceService } = await import('../../../../../core/api/freelanceService');
                const data = await freelanceService.getAll();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.skills?.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCategory = categoria === "" || true; // TODO: map category logic
        const matchesBudget = presupuesto === "" || true; // TODO: map budget logic

        return matchesSearch && matchesCategory && matchesBudget;
    });

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Explorar Proyectos</h1>
                <p className="text-slate-400">Encuentra tu próximo desafío y conecta con clientes top.</p>
            </div>

            {/* Search and Filters Bar */}
            <div className="glass p-4 rounded-2xl flex flex-col md:flex-row gap-4 mb-8 relative z-20">
                <div className="flex-1 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <Input
                        type="text"
                        placeholder="Buscar por palabra clave, tecnología o cliente..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 min-w-[450px]">
                    <Select
                        options={opcionesCategoria}
                        value={categoria}
                        onChange={(val) => setCategoria(val)}
                        placeholder="Categoría"
                        className="w-full"
                    />
                    <Select
                        options={opcionesPresupuesto}
                        value={presupuesto}
                        onChange={(val) => setPresupuesto(val)}
                        placeholder="Presupuesto"
                        className="w-full"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <DashboardProjectCard
                                    key={project.id}
                                    title={project.title}
                                    clientName={project.client}
                                    budget={project.budget}
                                    description={project.description}
                                    skills={project.skills}
                                    postedTime={project.postedAt}
                                    onApply={() => navigate(`/freelance/buscar-proyecto/${project.id}/propuesta`)}
                                    onViewDetails={() => navigate(`/freelance/buscar-proyecto/${project.id}`)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-slate-400 glass rounded-3xl">
                                {projects.length === 0 ? "No hay proyectos disponibles en este momento." : "No se encontraron proyectos con esos filtros."}
                            </div>
                        )}
                    </div>

                    {/* Empty state / Load more */}
                    {projects.length > 0 && (
                        <div className="mt-12 text-center">
                            <button className="px-6 py-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                                Cargar más proyectos ↓
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}