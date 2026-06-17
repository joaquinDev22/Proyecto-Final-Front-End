import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";

export default function DashboardCliente() {
    const navigate = useNavigate();

    // TODO: Define proper types centrally
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchDashboardData = async () => {
            try {
                // const response = await fetch('/api/cliente/dashboard');
                // const data = await response.json();
                // setDashboardData(data);

                // Fallback / Empty state
                setDashboardData({
                    totalSpent: 0,
                    activeProjects: 0,
                    unreadProposals: 0,
                    projects: [],
                    recentActivity: []
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-center mt-20">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Hola 👋</h1>
                    <p className="text-slate-400">Aquí tienes un resumen de tus proyectos y talento contratado.</p>
                </div>
                <Button 
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    onClick={() => navigate('/cliente/publicar')}
                >
                    + Publicar Nuevo Proyecto
                </Button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <GlassCard padding="p-6">
                    <h3 className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Total Gastado</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-black text-white">${dashboardData?.totalSpent || 0}</span>
                        <span className="text-cyan-400 text-sm font-bold mb-1">USD</span>
                    </div>
                </GlassCard>

                <GlassCard padding="p-6">
                    <h3 className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Proyectos Activos</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-black text-white">{dashboardData?.activeProjects || 0}</span>
                    </div>
                </GlassCard>

                <GlassCard padding="p-6">
                    <h3 className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Propuestas sin leer</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-black text-purple-400">{dashboardData?.unreadProposals || 0}</span>
                        <span className="text-slate-500 text-sm font-medium mb-1">esperando revisión</span>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Proyectos Resumen */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <GlassCard>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Tus Proyectos Activos</h2>
                            <button 
                                className="text-sm text-cyan-400 hover:text-cyan-300 font-medium"
                                onClick={() => navigate('/cliente/mis-proyectos')}
                            >
                                Ver todos →
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {dashboardData?.projects?.length > 0 ? (
                                dashboardData.projects.map((project: any) => (
                                    <div key={project.id} className="p-5 bg-dark-bg/40 border border-white/5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-white/10 transition-colors">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white text-lg">{project.title}</h3>
                                            <p className="text-sm text-slate-400 mt-1 mb-3">{project.status}</p>
                                            {project.progress !== undefined && (
                                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-purple-500 h-full drop-shadow-[0_0_5px_rgba(168,85,247,0.6)]" style={{ width: `${project.progress}%` }}></div>
                                                </div>
                                            )}
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => navigate('/cliente/mis-proyectos')}>Detalles</Button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-slate-400">No tienes proyectos activos.</p>
                                </div>
                            )}
                        </div>
                    </GlassCard>
                </div>

                {/* Actividad Reciente */}
                <div className="lg:col-span-1">
                    <GlassCard className="h-full">
                        <h2 className="text-xl font-bold text-white mb-6">Actividad Reciente</h2>
                        {dashboardData?.recentActivity?.length > 0 ? (
                            <div className="flex flex-col gap-6 relative before:absolute before:inset-y-0 before:left-[15px] before:w-[2px] before:bg-white/5">
                                {dashboardData.recentActivity.map((activity: any) => (
                                    <div key={activity.id} className="flex gap-4 relative z-10">
                                        <div className="w-8 h-8 rounded-full bg-dark-bg border border-white/10 flex items-center justify-center shrink-0 text-sm">
                                            {activity.type === 'proposal' ? '📩' : activity.type === 'milestone' ? '✅' : '💸'}
                                        </div>
                                        <div>
                                            <p className="text-sm text-white font-medium mb-1">{activity.message}</p>
                                            <p className="text-xs text-slate-500">{activity.project} • {activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-slate-400">No hay actividad reciente.</p>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
