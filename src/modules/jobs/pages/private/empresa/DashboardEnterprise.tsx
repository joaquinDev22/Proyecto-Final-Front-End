import { useNavigate } from "react-router-dom";
import { Users, GraduationCap } from "lucide-react";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";

export default function DashboardEnterprise() {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <PageHeader 
                title="Centro de Comando Enterprise" 
                subtitle="Administra a tu equipo de reclutamiento e instructores en un solo lugar."
            />

            {/* Resumen General */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <GlassCard padding="p-6" borderColor="cyan">
                    <h3 className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Recruiters Activos</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-black text-white">12</span>
                        <span className="text-cyan-400 text-sm font-bold mb-1">en línea</span>
                    </div>
                </GlassCard>

                <GlassCard padding="p-6" borderColor="purple">
                    <h3 className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Instructores Activos</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-black text-white">8</span>
                        <span className="text-purple-400 text-sm font-bold mb-1">dando clases</span>
                    </div>
                </GlassCard>

                <GlassCard padding="p-6" borderColor="emerald">
                    <h3 className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Vacantes Abiertas</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-black text-white">45</span>
                    </div>
                </GlassCard>

                <GlassCard padding="p-6" borderColor="yellow">
                    <h3 className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Bootcamps Activos</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-black text-white">3</span>
                    </div>
                </GlassCard>
            </div>

            {/* Accesos Rápidos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Gestión de Recruiters */}
                <GlassCard padding="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 border border-cyan-500/20">
                                <Users className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Equipo de Reclutamiento</h2>
                            <p className="text-slate-400 text-sm mb-6">Da de alta nuevos selectores IT, revisa sus perfiles y dales de baja cuando sea necesario.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button className="bg-cyan-600 border-0 rounded-[8px] p-3 hover:bg-cyan-500 flex-1" onClick={() => navigate('/enterprise/recruiters')}>
                            Gestionar Recruiters
                        </Button>
                    </div>
                </GlassCard>

                {/* Gestión de Instructores */}
                <GlassCard padding="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 border border-purple-500/20">
                                <GraduationCap className="w-6 h-6 text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Equipo Docente</h2>
                            <p className="text-slate-400 text-sm mb-6">Administra a los profesores de los bootcamps. Autoriza sus accesos o revoca sus permisos.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button className="bg-purple-600 border-0 rounded-[8px] p-3 hover:bg-purple-500 flex-1" onClick={() => navigate('/enterprise/instructores')}>
                            Gestionar Instructores
                        </Button>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
