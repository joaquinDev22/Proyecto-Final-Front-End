import { useState, useEffect } from "react";
import Button from "../../../../../core/components/ui/Button";

export default function ProyectosEnCurso() {
    // TODO: Define proper types centrally
    const [activeProjects, setActiveProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { freelanceService } = await import('../../../../../core/api/freelanceService');
                const data = await freelanceService.getMyAssignedProjects();
                
                if (data && data.length > 0) {
                    const mapped = data.map((p: any, idx: number) => ({
                        id: p.proyectoId,
                        title: p.area || p.descripcion.substring(0, 30) + '...',
                        clientName: p.nombreCliente || 'Cliente Desconocido',
                        status: p.estado || "En Progreso",
                        color: idx % 2 === 0 ? "purple" : "cyan",
                        progress: p.estado === "FINALIZADO" ? 100 : 45,
                        deadline: p.fechaPublicacion || "Próxima semana"
                    }));
                    setActiveProjects(mapped);
                } else {
                    setActiveProjects([]);
                }
            } catch (error) {
                console.error("Error fetching active projects:", error);
                setActiveProjects([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Proyectos en Curso</h1>
                <p className="text-slate-400">Gestiona tus entregas y comunícate con tus clientes.</p>
            </div>

            <div className="flex flex-col gap-6">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : activeProjects.length > 0 ? (
                    activeProjects.map((project) => (
                        <div key={project.id} className="glass p-6 md:p-8 rounded-2xl border-t border-white/10 flex flex-col md:flex-row gap-6 md:items-center hover:bg-white/[0.03] transition-colors">

                            {/* Project Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${project.color === 'cyan'
                                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                                            : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm">Cliente: <span className="text-slate-300 font-medium">{project.clientName}</span> • Entrega: {project.deadline}</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="flex-1 w-full max-w-sm">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-300 font-medium">Progreso</span>
                                    <span className={project.color === 'cyan' ? 'text-cyan-400 font-bold' : 'text-purple-400 font-bold'}>{project.progress}%</span>
                                </div>
                                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${project.color === 'cyan' ? 'bg-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'bg-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]'
                                            }`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 md:min-w-[200px] justify-end">
                                <Button variant="outline" className="border rounded-[8px] hover:bg-white/5 text-sm p-2">
                                    Entregable
                                </Button>
                                <Button className="bg-white text-[#0b1121] font-bold border-0 rounded-[15px] hover:bg-slate-200 text-sm px-6">
                                    Chat
                                </Button>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 glass rounded-2xl border-dashed border-white/20">
                        <p className="text-slate-400 mb-4">No tienes proyectos activos en este momento.</p>
                        <Button variant="outline" className="border-white/20">Buscar Proyectos</Button>
                    </div>
                )}
            </div>
        </div>
    );
}