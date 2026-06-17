import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlassCard from '../../../../core/components/ui/GlassCard';
import Badge from '../../../../core/components/ui/Badge';
import Button from '../../../../core/components/ui/Button';

export default function DetalleBootcamp() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // TODO: Define proper types centrally
    const [bootcamp, setBootcamp] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchBootcamp = async () => {
            try {
                // const response = await fetch(`/api/bootcamps/${id}`);
                // const data = await response.json();
                // setBootcamp(data);

                // Fallback / Empty state
                setBootcamp(null);
            } catch (error) {
                console.error("Error fetching bootcamp details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBootcamp();
    }, [id]);

    if (isLoading) {
        return (
            <div className="w-full max-w-5xl mx-auto px-6 py-8 flex justify-center mt-20">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!bootcamp) {
        return (
             <div className="w-full max-w-5xl mx-auto px-6 py-8 animate-fade-in-up">
                <button 
                    onClick={() => navigate(-1)}
                    className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
                >
                    ← Volver a Bootcamps
                </button>
                <div className="glass p-12 text-center rounded-3xl mt-8 border-t border-cyan-500/30">
                    <p className="text-slate-400 text-lg">No se encontró información de este bootcamp.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-8 animate-fade-in-up">
            <button 
                onClick={() => navigate(-1)}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Bootcamps
            </button>

            {/* Header */}
            <GlassCard padding="p-8" borderColor="cyan" className="mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    <div className="w-24 h-24 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-4xl shrink-0">
                        {bootcamp.logo || '🌐'}
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {bootcamp.tags?.map((t: string) => <Badge key={t} variant="secondary">{t}</Badge>)}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{bootcamp.title}</h1>
                        <p className="text-xl text-cyan-400 font-medium mb-4">{bootcamp.provider}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm mb-6">
                            <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md">⭐ {bootcamp.rating} ({bootcamp.reviews} reseñas)</span>
                            <span className="flex items-center gap-1">⏱️ {bootcamp.duration}</span>
                            <span className="flex items-center gap-1">📍 {bootcamp.format}</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                            <div>
                                <p className="text-sm text-slate-400">Precio del Programa</p>
                                <p className="text-2xl font-bold text-white">{bootcamp.price}</p>
                            </div>
                            <Button 
                                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-10 py-4 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] text-lg"
                                onClick={() => navigate(`${window.location.pathname}/pago`)}
                            >
                                Inscribirme Ahora
                            </Button>
                        </div>
                    </div>
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2">
                    <GlassCard>
                        <h2 className="text-2xl font-bold text-white mb-6">Sobre este Bootcamp</h2>
                        <div className="prose prose-invert max-w-none text-slate-300">
                            {bootcamp.description?.split('\n').map((line: string, idx: number) => {
                                if (line.startsWith('###')) return <h3 key={idx} className="text-white font-bold mt-6 mb-3 text-lg">{line.replace('### ', '')}</h3>;
                                if (line.startsWith('-')) return <li key={idx} className="ml-4 mb-1">{line.replace('- ', '')}</li>;
                                return <p key={idx} className="mb-4">{line}</p>;
                            })}
                        </div>
                    </GlassCard>
                </div>

                {/* Sidebar Info */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <GlassCard borderColor="purple">
                        <h3 className="font-bold text-white mb-4">Garantía de Empleo</h3>
                        <p className="text-sm text-slate-400 mb-4">Si no consigues trabajo en el sector tecnológico dentro de los 6 meses posteriores a tu graduación, te reembolsamos el 100% de tu matrícula.</p>
                        <a href="#" className="text-purple-400 hover:underline text-sm font-medium">Ver términos y condiciones</a>
                    </GlassCard>
                    
                    <GlassCard>
                        <h3 className="font-bold text-white mb-4">Este curso incluye</h3>
                        <ul className="text-sm text-slate-300 space-y-3">
                            <li className="flex items-center gap-2"><span>💻</span> {bootcamp.hours || 400} horas de contenido</li>
                            <li className="flex items-center gap-2"><span>👥</span> Mentoría semanal 1 a 1</li>
                            <li className="flex items-center gap-2"><span>🚀</span> Preparación de entrevistas</li>
                            <li className="flex items-center gap-2"><span>📄</span> Certificado de finalización</li>
                        </ul>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
