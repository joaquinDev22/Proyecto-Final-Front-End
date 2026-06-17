import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";
import Badge from "../../../../../core/components/ui/Badge";

export default function MisProyectosCliente() {
    const navigate = useNavigate();

    // TODO: Define proper types centrally
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchProjects = async () => {
            try {
                // const response = await fetch('/api/cliente/proyectos');
                // const data = await response.json();
                // setProjects(data);

                // Fallback / Empty state
                setProjects([]);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <PageHeader 
                title="Mis Proyectos" 
                subtitle="Gestiona los proyectos que has publicado, revisa propuestas y realiza pagos."
            />

            <div className="grid gap-6">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : projects.length > 0 ? (
                    projects.map((project) => (
                        <GlassCard key={project.id} className="flex flex-col md:flex-row gap-6 md:items-center justify-between hover:border-cyan-500/30 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-xl font-bold text-white">{project.title}</h2>
                                    {project.status === "BUSCANDO_TALENTO" && <Badge variant="info">Buscando Talento</Badge>}
                                    {project.status === "EN_PROGRESO" && <Badge variant="warning">En Progreso</Badge>}
                                    {project.status === "FINALIZADO" && <Badge variant="success">Finalizado</Badge>}
                                </div>
                                
                                {project.status === "BUSCANDO_TALENTO" && (
                                    <p className="text-slate-400 text-sm">
                                        Presupuesto: {project.budget} • Publicado: {project.postedAt} • <span className="text-purple-400 font-bold">{project.proposals} propuestas recibidas</span>
                                    </p>
                                )}

                                {project.status === "EN_PROGRESO" && (
                                    <div>
                                        <p className="text-slate-400 text-sm mb-3">Freelancer: {project.freelancer} • Siguiente Hito: {project.nextMilestone}</p>
                                        <div className="flex items-center gap-3 max-w-md">
                                            <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                                                <div className="bg-purple-500 h-full drop-shadow-[0_0_5px_rgba(168,85,247,0.6)]" style={{ width: `${project.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs text-purple-400 font-bold">{project.progress}%</span>
                                        </div>
                                    </div>
                                )}

                                {project.status === "FINALIZADO" && (
                                    <p className="text-slate-400 text-sm">
                                        Freelancer: {project.freelancer} • Completado: {project.completedAt}
                                        {!project.paid && <span className="ml-2 text-red-400 font-bold">• Pago Pendiente</span>}
                                        {project.paid && <span className="ml-2 text-green-400 font-bold">• Pagado</span>}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-3 min-w-[200px]">
                                {project.status === "BUSCANDO_TALENTO" && (
                                    <Button className="bg-purple-600 border-0 rounded-[8px] p-2 hover:bg-purple-500" onClick={() => navigate(`/cliente/mis-proyectos/${project.id}/propuestas`)}>Revisar Propuestas</Button>
                                )}
                                {project.status === "EN_PROGRESO" && (
                                    <Button variant="outline" onClick={() => navigate(`/cliente/mis-proyectos/${project.id}/hitos`)}>Ver Hitos</Button>
                                )}
                                {project.status === "FINALIZADO" && !project.paid && (
                                    <Button className="bg-emerald-600 border-0 rounded-[8px] p-2  hover:bg-emerald-500" onClick={() => navigate(`/cliente/mis-proyectos/${project.id}/pago`)}>Realizar Pago</Button>
                                )}
                                {project.status === "FINALIZADO" && project.paid && (
                                    <Button variant="outline" onClick={() => navigate(`/cliente/mis-proyectos/${project.id}/resena`)}>Dejar Reseña</Button>
                                )}
                            </div>
                        </GlassCard>
                    ))
                ) : (
                     <div className="text-center py-20 glass rounded-2xl border-dashed border-white/20">
                        <p className="text-slate-400 mb-4">No tienes proyectos publicados en este momento.</p>
                        <Button className="bg-cyan-600 hover:bg-cyan-500 border-0 p-2 rounded-[8px]" onClick={() => navigate('/cliente/publicar')}>Publicar Nuevo Proyecto</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
