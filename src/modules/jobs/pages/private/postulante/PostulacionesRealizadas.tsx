import { useState, useEffect } from 'react';
import PageHeader from '../../../../../core/components/ui/PageHeader';
import GlassCard from '../../../../../core/components/ui/GlassCard';
import FinancialWidget from '../../../../freelance/components/FinancialWidget';

export default function PostulacionesRealizadas() {
    // TODO: Define proper types centrally
    const [applications, setApplications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchApplications = async () => {
            try {
                // const response = await fetch('/api/postulante/postulaciones');
                // const data = await response.json();
                setApplications([]);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <PageHeader
                title="Mis Postulaciones"
                subtitle="Haz seguimiento de todas las vacantes a las que has aplicado."
            />

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <FinancialWidget title="Total Postulaciones" amount={applications.length} subtitle="En los últimos 30 días" color="cyan" />
                <FinancialWidget title="En Proceso / Entrevista" amount={applications.filter(a => a.status === 'Entrevista').length} subtitle="Postulaciones activas" color="purple" />
                <FinancialWidget title="Tasa de Respuesta" amount="0%" subtitle="Basado en tus datos históricos" color="white" />
            </div>

            {/* Applications List */}
            <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold text-white mb-2">Historial Reciente</h3>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : applications.length > 0 ? (
                    applications.map((app) => (
                        <GlassCard key={app.id} padding="p-6 md:p-8" rounded="rounded-2xl" hoverEffect className="flex flex-col">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 border-b border-white/5 pb-4 mb-4">
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-1">{app.jobTitle}</h4>
                                    <p className="text-cyan-400 font-medium">{app.company}</p>
                                </div>

                                <div className="flex flex-col items-start md:items-end gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${app.statusColor === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                            app.statusColor === 'purple' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                'bg-white/5 text-slate-400 border-white/10'
                                        }`}>
                                        {app.status}
                                    </span>
                                    <span className="text-xs text-slate-500">Aplicado: {app.appliedAt}</span>
                                </div>
                            </div>

                            {/* Feedback / Mensaje */}
                            <div className="bg-dark-bg/30 rounded-[8px] p-2 border border-white/5">
                                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Última actualización / Mensaje del Reclutador</h5>
                                <p className="text-slate-300 text-sm leading-relaxed">{app.feedback}</p>
                            </div>
                        </GlassCard>
                    ))
                ) : (
                    <div className="glass p-12 text-center rounded-3xl mt-2">
                        <p className="text-slate-400 text-lg">No has realizado ninguna postulación aún.</p>
                    </div>
                )}
            </div>
        </div>
    );
}