import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Users, AlertTriangle } from "lucide-react";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";

export default function VerVacantesPublicadas() {
    const navigate = useNavigate();
    
    // TODO: Define proper types centrally
    const [vacantes, setVacantes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const fetchVacantes = async () => {
            try {
                const { jobService } = await import('../../../../../core/api/jobService');
                const data = await jobService.getMyVacancies();
                // Map the data appropriately if needed, or if it matches the interface just set it
                const mappedData = data.map(job => ({
                    id: job.id,
                    title: job.title,
                    type: job.locationType,
                    status: 'Activo', // Defaulting to active for now
                    applications: 0 // Mock applications count
                }));
                setVacantes(mappedData);
            } catch (error) {
                console.error("Error fetching vacantes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVacantes();
    }, []);

    const handleRemove = () => {
        if (confirmDeleteId !== null) {
            setVacantes(vacantes.filter(v => v.id !== confirmDeleteId));
            setConfirmDeleteId(null);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <PageHeader 
                    title="Mis Vacantes Publicadas" 
                    subtitle="Administra tus ofertas de trabajo, revísalas y gestiona los postulantes."
                />
                <Button 
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    onClick={() => navigate('/recruiter/vacantes/crear')}
                >
                    + Publicar Nueva Vacante
                </Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : vacantes.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {vacantes.map(vacante => (
                        <GlassCard key={vacante.id} padding="p-6" borderColor={vacante.status === 'Activo' ? 'cyan' : 'white'}>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    vacante.status === 'Activo' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                }`}>
                                    {vacante.status}
                                </span>
                                <Briefcase className="w-6 h-6 text-slate-400" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2">{vacante.title}</h3>
                            
                            <div className="flex flex-col gap-2 text-slate-400 text-sm mb-6">
                                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {vacante.type}</span>
                                <span className="text-cyan-400 font-medium flex items-center gap-2"><Users className="w-4 h-4" /> {vacante.applications} Postulaciones nuevas</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                <Button className="bg-cyan-600 hover:bg-cyan-500 text-sm py-2 col-span-2 border-0 p-2 rounded-[8px]" onClick={() => navigate(`/recruiter/vacantes/${vacante.id}/postulaciones`)}>
                                    Ver Postulantes
                                </Button>
                                <Button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border-0 p-2 rounded-[8px] text-sm py-2 col-span-2" onClick={() => setConfirmDeleteId(vacante.id)}>
                                    Dar de Baja
                                </Button>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            ) : (
                <div className="glass p-12 text-center rounded-3xl mt-8">
                    <p className="text-slate-400 text-lg">No tienes vacantes publicadas actualmente.</p>
                </div>
            )}

            {/* Modal Confirmación Dar de Baja */}
            {confirmDeleteId !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="w-full max-w-sm">
                        <GlassCard borderColor="none" padding="p-8" className="shadow-2xl border border-red-500/30">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-4">
                                    <AlertTriangle className="w-8 h-8" />
                                </div>
                                <h2 className="text-xl font-bold text-white mb-2">¿Dar de baja vacante?</h2>
                                <p className="text-slate-400 text-sm mb-6">
                                    Se cerrará la vacante y ya no aceptará nuevas postulaciones. Los candidatos en proceso serán notificados.
                                </p>
                                <div className="flex gap-3 w-full">
                                    <Button variant="outline" className="flex-1" onClick={() => setConfirmDeleteId(null)}>Cancelar</Button>
                                    <Button className="bg-red-600 hover:bg-red-500 text-white font-bold flex-1" onClick={handleRemove}>Eliminar</Button>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            )}
        </div>
    );
}
