import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../../core/components/ui/PageHeader';
import GlassCard from '../../../../core/components/ui/GlassCard';
import Button from '../../../../core/components/ui/Button';

export default function AulaBootcamp() {
    const { id } = useParams();
    const navigate = useNavigate();

    // TODO: Define proper types centrally
    const [aula, setAula] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchAulaData = async () => {
            try {
                // const response = await fetch(`/api/bootcamps/${id}/aula`);
                // const data = await response.json();
                // setAula(data);

                // Fallback / Empty state
                setAula(null);
            } catch (error) {
                console.error("Error fetching aula data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAulaData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-center mt-20">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!aula) {
        return (
            <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
                <button
                    onClick={() => navigate(-1)}
                    className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
                >
                    ← Volver a Bootcamps
                </button>
                <div className="glass p-12 text-center rounded-3xl mt-8 border-t border-cyan-500/30">
                    <p className="text-slate-400 text-lg">No se encontró información del aula.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <button
                onClick={() => navigate(-1)}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Bootcamps
            </button>

            <PageHeader
                title={`Aula: ${aula.title}`}
                subtitle={`Instructor: ${aula.instructor}`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Siguiente Clase Destacada */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <GlassCard borderColor="cyan" padding="p-8" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="flex items-center justify-center w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                                    <span className="text-red-400 font-bold tracking-wider text-sm">EN VIVO PRÓXIMAMENTE</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">{aula.nextClassTopic}</h2>
                                <p className="text-slate-400 mb-4">{aula.nextClassTime}</p>
                            </div>
                            {aula.zoomLink && (
                                <Button
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-4 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] w-full md:w-auto"
                                    onClick={() => window.open(aula.zoomLink, '_blank')}
                                >
                                    Unirme a la Clase (Zoom)
                                </Button>
                            )}
                        </div>
                    </GlassCard>

                    {/* Grabaciones o Recursos */}
                    <GlassCard>
                        <h3 className="text-xl font-bold text-white mb-4">Recursos de la semana</h3>
                        <div className="flex flex-col gap-3">
                            {aula.resources && aula.resources.length > 0 ? (
                                aula.resources.map((resource: any, idx: number) => (
                                    <a key={idx} href={resource.link} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{resource.type === 'video' ? '🎥' : '📄'}</span>
                                            <span className="text-slate-200 font-medium">{resource.title}</span>
                                        </div>
                                        <span className="text-xs text-slate-500">{resource.meta}</span>
                                    </a>
                                ))
                            ) : (
                                <p className="text-slate-400">No hay recursos disponibles esta semana.</p>
                            )}
                        </div>
                    </GlassCard>
                </div>

                <div className="lg:col-span-1">
                    <GlassCard>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Tu Progreso</h3>
                            <span className="text-cyan-400 font-bold">{aula.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-6">
                            <div className="bg-cyan-400 h-full drop-shadow-[0_0_5px_rgba(34,211,238,0.6)]" style={{ width: `${aula.progress || 0}%` }}></div>
                        </div>

                        {(aula.progress === 100 || true) && (
                            <div className="mb-6 flex justify-center">
                                <Button 
                                    variant="outline" 
                                    className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-white"
                                    onClick={() => navigate(`${window.location.pathname.replace('/aula', '')}/resena`)}
                                >
                                    ⭐ Dejar una Opinión
                                </Button>
                            </div>
                        )}

                        <div className="flex flex-col gap-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-white/10">
                            {aula.modules && aula.modules.map((mod: any, idx: number) => (
                                <div key={idx} className="flex gap-4 relative z-10">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 ${mod.completed ? 'bg-cyan-500 border-cyan-500 text-black' :
                                            mod.current ? 'bg-dark-bg border-cyan-400' : 'bg-dark-bg border-slate-600'
                                        }`}>
                                        {mod.completed && <span className="text-[10px] font-bold">✓</span>}
                                        {mod.current && <div className="w-2 h-2 rounded-full bg-cyan-400"></div>}
                                    </div>
                                    <div className="pt-0.5">
                                        <p className={`text-sm ${mod.completed ? 'text-slate-400' : mod.current ? 'text-white font-bold' : 'text-slate-600'}`}>
                                            {mod.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
