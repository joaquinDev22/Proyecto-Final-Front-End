import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import GlassCard from '../../../../../core/components/ui/GlassCard';
import Badge from '../../../../../core/components/ui/Badge';
import Button from '../../../../../core/components/ui/Button';

export default function DetalleVacante() {
    const { id } = useParams();
    const navigate = useNavigate();

    // TODO: Define proper types centrally
    const [job, setJob] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API using `id`
        const fetchJob = async () => {
            try {
                // const response = await fetch(`/api/vacantes/${id}`);
                // const data = await response.json();
                // setJob(data);
                setJob(null); // Simulating empty state for backend integration
            } catch (error) {
                console.error("Error fetching job details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    if (isLoading) {
        return (
            <div className="w-full max-w-5xl mx-auto px-6 py-8 flex justify-center mt-20">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="w-full max-w-5xl mx-auto px-6 py-8 animate-fade-in-up">
                 <button
                    onClick={() => navigate('/postulante/vacantes')}
                    className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
                >
                    ← Volver a Vacantes
                </button>
                <div className="glass p-12 text-center rounded-3xl mt-8">
                    <p className="text-slate-400 text-lg">Vacante no encontrada.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-8 animate-fade-in-up">
            <button
                onClick={() => navigate('/postulante/vacantes')}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Vacantes
            </button>

            {/* LinkedIn Style Header */}
            <GlassCard padding="p-8" className="mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none"></div>

                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    <div className="w-24 h-24 bg-dark-bg/50 rounded-2xl border border-white/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-10 h-10 text-slate-400" />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{job.title}</h1>
                        <p className="text-xl text-cyan-400 font-medium mb-4">{job.company}</p>

                        <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm mb-6">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                            <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.postedAt}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <Button
                                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                onClick={() => navigate(`/postulante/vacantes/${id}/postular`)}
                            >
                                Postularme Fácilmente
                            </Button>
                            <Button variant="outline" className="border-white/20">
                                Guardar Vacante
                            </Button>
                            <p className="text-xs text-slate-400 mt-2 md:mt-0 md:ml-auto">
                                <b>{job.applicants}</b> personas ya se han postulado.
                            </p>
                        </div>
                    </div>
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2">
                    <GlassCard>
                        <h2 className="text-2xl font-bold text-white mb-6">Descripción del Puesto</h2>
                        <div className="prose prose-invert max-w-none text-slate-300">
                            {/* Simple text rendering with newlines. For markdown, use a library. */}
                            {job.description?.split('\n').map((line: string, idx: number) => {
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
                        <h3 className="font-bold text-white mb-4">Habilidades Requeridas</h3>
                        <div className="flex flex-wrap gap-2">
                            {job.tags?.map((tag: string, idx: number) => (
                                <Badge key={idx} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h3 className="font-bold text-white mb-4">Sobre la Empresa</h3>
                        <p className="text-sm text-slate-400 mb-4">TechGlobal Inc. es líder en soluciones en la nube para empresas Fortune 500. Nuestro equipo remoto se extiende por 15 países.</p>
                        <a href="#" className="text-cyan-400 hover:underline text-sm">Ver sitio web de la empresa</a>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
