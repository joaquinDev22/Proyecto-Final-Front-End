import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlassCard from '../../../../../core/components/ui/GlassCard';
import Badge from '../../../../../core/components/ui/Badge';
import Button from '../../../../../core/components/ui/Button';

export default function DetalleProyecto() {
    const { id } = useParams();
    const navigate = useNavigate();

    // TODO: Define proper types centrally
    const [project, setProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchProject = async () => {
            if (!id) return;
            try {
                const { freelanceService } = await import('../../../../../core/api/freelanceService');
                const data = await freelanceService.getById(Number(id));
                setProject(data);
            } catch (error) {
                console.error("Error fetching project details:", error);
                setProject(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (isLoading) {
        return (
            <div className="w-full max-w-5xl mx-auto px-6 py-8 flex justify-center mt-20">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) {
        return (
             <div className="w-full max-w-5xl mx-auto px-6 py-8 animate-fade-in-up">
                <button
                    onClick={() => navigate('/freelance/buscar-proyecto')}
                    className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
                >
                    ← Volver a Proyectos
                </button>
                <div className="glass p-12 text-center rounded-3xl mt-8 border-t border-purple-500/30">
                    <p className="text-slate-400 text-lg">Proyecto no encontrado.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-8 animate-fade-in-up">
            <button
                onClick={() => navigate('/freelance/buscar-proyecto')}
                className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Proyectos
            </button>

            {/* Header */}
            <GlassCard padding="p-8" borderColor="purple" className="mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] pointer-events-none"></div>

                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    <div className="w-24 h-24 bg-dark-bg/50 rounded-2xl border border-white/10 flex items-center justify-center text-4xl shrink-0">
                        📱
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
                        <p className="text-xl text-purple-400 font-medium mb-4">{project.client}</p>

                        <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm mb-6">
                            <span className="flex items-center gap-1">💰 {project.budget}</span>
                            <span className="flex items-center gap-1">⏳ {project.duration}</span>
                            <span className="flex items-center gap-1">🕒 Publicado {project.postedAt}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <Button
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                onClick={() => navigate(`/freelance/buscar-proyecto/${id}/propuesta`)}
                            >
                                Enviar Propuesta
                            </Button>
                            <Button variant="outline" className="border-white/20">
                                Guardar Proyecto
                            </Button>
                            <p className="text-xs text-slate-400 mt-2 md:mt-0 md:ml-auto">
                                <b>{project.proposals}</b> freelancers han enviado propuestas.
                            </p>
                        </div>
                    </div>
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2">
                    <GlassCard>
                        <h2 className="text-2xl font-bold text-white mb-6">Detalles del Proyecto</h2>
                        <div className="prose prose-invert max-w-none text-slate-300">
                            {project.description?.split('\n').map((line: string, idx: number) => {
                                if (line.startsWith('###')) return <h3 key={idx} className="text-white font-bold mt-6 mb-3 text-lg">{line.replace('### ', '')}</h3>;
                                if (line.startsWith('-')) return <li key={idx} className="ml-4 mb-1">{line.replace('- ', '')}</li>;
                                return <p key={idx} className="mb-4">{line}</p>;
                            })}
                        </div>
                    </GlassCard>
                </div>

                {/* Sidebar Info */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <GlassCard>
                        <h3 className="font-bold text-white mb-4">Habilidades y Tecnologías</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.skills?.map((skill: string, idx: number) => (
                                <Badge key={idx} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h3 className="font-bold text-white mb-4">Sobre el Cliente</h3>
                        <div className="flex items-center gap-2 mb-2 text-sm text-slate-300">
                            <span>⭐ {project.clientRating || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4 text-sm text-slate-300">
                            <span>✅ Medio de pago verificado</span>
                        </div>
                        <p className="text-sm text-slate-400">{project.clientHistory || 'Sin historial de cliente.'}</p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
