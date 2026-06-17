import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";

export default function HitosProyecto() {
    const { id } = useParams();
    const navigate = useNavigate();

    // TODO: Define proper types centrally
    const [milestones, setMilestones] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchMilestones = async () => {
            try {
                // const response = await fetch(`/api/cliente/proyectos/${id}/hitos`);
                // const data = await response.json();
                // setMilestones(data);

                // Fallback / Empty state
                setMilestones([]);
            } catch (error) {
                console.error("Error fetching milestones:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMilestones();
    }, [id]);

    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-8 animate-fade-in-up">
            <button 
                onClick={() => navigate('/cliente/mis-proyectos')}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Mis Proyectos
            </button>

            <PageHeader 
                title="Hitos del Proyecto" 
                subtitle={`Seguimiento de progreso y aprobaciones para el proyecto #${id}`}
            />

            <div className="grid gap-6">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : milestones.length > 0 ? (
                    milestones.map((milestone, idx) => (
                        <GlassCard key={milestone.id} padding="p-6">
                            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        {milestone.status === 'completado' && <span className="text-2xl">✅</span>}
                                        {milestone.status === 'en_revision' && <span className="text-2xl animate-pulse">👀</span>}
                                        {milestone.status === 'pendiente' && <span className="text-2xl grayscale opacity-50">⏳</span>}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            Hito {idx + 1}: {milestone.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm">Valor: {milestone.amount} • Fecha estimada: {milestone.date}</p>
                                        
                                        {milestone.deliverableUrl && (
                                            <a href={milestone.deliverableUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline text-sm mt-2 inline-block">
                                                📎 Ver archivo entregable
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 min-w-[200px]">
                                    {milestone.status === 'completado' && (
                                        <div className="text-center py-2 px-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-bold text-sm">
                                            Aprobado y Pagado
                                        </div>
                                    )}
                                    {milestone.status === 'en_revision' && (
                                        <>
                                            <Button className="bg-cyan-600 hover:bg-cyan-500 w-full" onClick={() => navigate(`/cliente/mis-proyectos/${id}/pago`)}>
                                                Aprobar y Pagar
                                            </Button>
                                            <button className="text-xs text-red-400 hover:text-red-300">Rechazar / Pedir cambios</button>
                                        </>
                                    )}
                                    {milestone.status === 'pendiente' && (
                                        <div className="text-center py-2 px-4 bg-white/5 border border-white/10 rounded-xl text-slate-400 font-bold text-sm">
                                            Aún no entregado
                                        </div>
                                    )}
                                </div>
                            </div>
                        </GlassCard>
                    ))
                ) : (
                    <div className="text-center py-20 glass rounded-2xl border-dashed border-white/20">
                        <p className="text-slate-400 mb-4">No hay hitos definidos para este proyecto aún.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
