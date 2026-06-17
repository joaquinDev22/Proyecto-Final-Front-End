import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";

export default function VisualizarBootcamp() {
    const navigate = useNavigate();
    
    // TODO: Define proper types centrally
    const [bootcamps, setBootcamps] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchBootcamps = async () => {
            try {
                // const response = await fetch(`/api/instructor/bootcamps`);
                // const data = await response.json();
                // setBootcamps(data);

                // Fallback / Empty state
                setBootcamps([]);
            } catch (error) {
                console.error("Error fetching bootcamps:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBootcamps();
    }, []);

    const handleRemove = async () => {
        if (confirmDeleteId !== null) {
            try {
                // TODO: Call API to delete bootcamp
                // await fetch(`/api/instructor/bootcamps/${confirmDeleteId}`, { method: 'DELETE' });
                
                setBootcamps(bootcamps.filter(b => b.id !== confirmDeleteId));
                setConfirmDeleteId(null);
            } catch (error) {
                console.error("Error deleting bootcamp:", error);
            }
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <PageHeader 
                    title="Mis Bootcamps" 
                    subtitle="Gestiona tus cursos, edita el contenido y revisa las inscripciones."
                />
                <Button 
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    onClick={() => navigate('/instructor/bootcamps/crear')}
                >
                    + Crear Bootcamp
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="lg:col-span-3 flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : bootcamps.length > 0 ? (
                    bootcamps.map(bootcamp => (
                        <GlassCard key={bootcamp.id} padding="p-6" borderColor={bootcamp.status === 'Activo' ? 'cyan' : 'white'}>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    bootcamp.status === 'Activo' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                }`}>
                                    {bootcamp.status}
                                </span>
                                <span className="text-xl">🎓</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2">{bootcamp.title}</h3>
                            
                            <div className="flex items-center gap-4 text-slate-400 text-sm mb-6">
                                <span>👥 {bootcamp.students} Alumnos</span>
                                <span>💰 {bootcamp.earnings} Generados</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                <Button variant="outline" className="text-sm py-2 col-span-2 border-0 p-2 rounded-[8px]" onClick={() => navigate(`/instructor/bootcamps/editar/${bootcamp.id}`)}>
                                    Editar
                                </Button>
                                <Button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border-0 p-2 rounded-[8px] text-sm py-2 col-span-2" onClick={() => setConfirmDeleteId(bootcamp.id)}>
                                    Dar de Baja
                                </Button>
                            </div>
                        </GlassCard>
                    ))
                ) : (
                    <div className="lg:col-span-3 text-center py-12 glass rounded-2xl border-dashed border-white/20">
                        <p className="text-slate-400">No tienes bootcamps creados aún.</p>
                    </div>
                )}
            </div>

            {/* Modal Confirmación Dar de Baja */}
            {confirmDeleteId !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="w-full max-w-sm">
                        <GlassCard borderColor="none" padding="p-8" className="shadow-2xl border border-red-500/30">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center text-3xl mb-4">
                                    ⚠️
                                </div>
                                <h2 className="text-xl font-bold text-white mb-2">¿Dar de baja bootcamp?</h2>
                                <p className="text-slate-400 text-sm mb-6">
                                    Los alumnos actuales perderán acceso al material y ya no se podrán inscribir nuevos postulantes.
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
