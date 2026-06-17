import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";

export default function RevisionPropuestas() {
    const { id } = useParams();
    const navigate = useNavigate();

    // TODO: Define proper types centrally
    const [proposals, setProposals] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchProposals = async () => {
            try {
                // const response = await fetch(`/api/cliente/proyectos/${id}/propuestas`);
                // const data = await response.json();
                // setProposals(data);

                // Fallback / Empty state
                setProposals([]);
            } catch (error) {
                console.error("Error fetching proposals:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProposals();
    }, [id]);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <button 
                onClick={() => navigate('/cliente/mis-proyectos')}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Mis Proyectos
            </button>

            <PageHeader 
                title="Propuestas Recibidas" 
                subtitle={`Revisando postulaciones para el proyecto #${id}`}
            />

            <div className="grid gap-6">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : proposals.length > 0 ? (
                    proposals.map((proposal) => (
                        <GlassCard key={proposal.id} padding="p-6">
                            <div className="flex flex-col md:flex-row gap-6 justify-between">
                                
                                {/* Freelancer Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-white text-xl">
                                            {proposal.freelancerName?.charAt(0) || '?'}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                {proposal.freelancerName}
                                                <span className="text-sm font-normal text-yellow-400">⭐ {proposal.rating}</span>
                                            </h3>
                                            <p className="text-slate-400 text-sm">{proposal.freelancerRole}</p>
                                        </div>
                                    </div>
                                    
                                    <p className="text-slate-300 text-sm italic mb-4 bg-dark-bg/50 p-4 rounded-xl border border-white/5">
                                        "{proposal.message}"
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {proposal.technologies?.map((tech: string, idx: number) => (
                                            <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-slate-300">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Terms & Actions */}
                                <div className="flex flex-col justify-between min-w-[250px] border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-slate-400 text-sm">Oferta del Freelancer:</span>
                                            <span className="text-xl font-bold text-white">{proposal.budget}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-slate-400 text-sm">Tiempo estimado:</span>
                                            <span className="text-white font-medium">{proposal.duration}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <Button className="bg-cyan-600 hover:bg-cyan-500 w-full" onClick={() => alert("¡Propuesta Aceptada! El proyecto ha comenzado.")}>
                                            Aceptar Propuesta
                                        </Button>
                                        <Button variant="outline" className="w-full text-slate-300 hover:text-white">
                                            Enviar Mensaje
                                        </Button>
                                        <button className="text-xs text-red-400 hover:text-red-300 transition-colors mt-2 text-center">
                                            Rechazar / Ocultar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    ))
                ) : (
                    <div className="text-center py-20 glass rounded-2xl border-dashed border-white/20">
                        <p className="text-slate-400 mb-4">Aún no has recibido propuestas para este proyecto.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
