import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";
import Input from "../../../../../core/components/ui/Input";
import useShowAlert from "../../../../../core/hooks/useShowAlert";
import Alert from "../../../../../core/components/ui/Alert";

export default function EditarBootcamp() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();
    
    // TODO: Define proper types centrally
    const [title, setTitle] = useState("");
    const [modulos, setModulos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchBootcampData = async () => {
            try {
                // const response = await fetch(`/api/instructor/bootcamps/${id}`);
                // const data = await response.json();
                // setTitle(data.title);
                // setModulos(data.modulos);

                // Fallback / Empty state for testing
                setTitle("Bootcamp no encontrado");
                setModulos([]);
            } catch (error) {
                console.error("Error fetching bootcamp data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBootcampData();
    }, [id]);

    const handleUpdateModulo = (moduloId: number, field: string, value: string) => {
        setModulos(modulos.map(m => m.id === moduloId ? { ...m, [field]: value } : m));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // TODO: Call API to update bootcamp
            // await fetch(`/api/instructor/bootcamps/${id}`, { method: 'PUT', body: JSON.stringify({ modulos }) });
            
            triggerAlert(() => {
                navigate('/instructor/bootcamps');
            });
        } catch (error) {
            console.error("Error saving bootcamp:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto px-6 py-8 flex justify-center mt-20">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-8 animate-fade-in-up">
            <button 
                onClick={() => navigate(-1)}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Mis Bootcamps
            </button>

            <PageHeader 
                title={`Editando: ${title}`} 
                subtitle="Modifica los horarios, añade material de estudio o actualiza los enlaces a las clases."
            />

            {!isRendered && (
                <form onSubmit={handleSave} className="flex flex-col gap-8">
                    
                    {modulos.length > 0 ? (
                        modulos.map((modulo, index) => (
                            <GlassCard key={modulo.id} padding="p-8" borderColor="purple">
                                <h2 className="text-xl font-bold text-white mb-6">Módulo {index + 1}: {modulo.title}</h2>
                                <div className="flex flex-col gap-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-slate-300  font-bold block mb-2 text-sm">Horario de Clase</label>
                                            <Input 
                                                value={modulo.date || ""} 
                                                onChange={(e) => handleUpdateModulo(modulo.id, 'date', e.target.value)}
                                                placeholder="Ej: Lunes 18:00 hrs" 
                                                required 
                                                className="w-full border-0 p-2 rounded-[8px] bg-dark-bg/50" 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-slate-300 font-bold block mb-2 text-sm">Link a Clase (Zoom/Meet/Video)</label>
                                            <Input 
                                                value={modulo.link || ""} 
                                                onChange={(e) => handleUpdateModulo(modulo.id, 'link', e.target.value)}
                                                placeholder="https://..." 
                                                type="url"
                                                className="w-full border-0 p-2 rounded-[8px] bg-dark-bg/50" 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 font-bold block mb-2 text-sm">Material de Estudio (URL o Descripción)</label>
                                        <textarea 
                                            value={modulo.material || ""}
                                            onChange={(e) => handleUpdateModulo(modulo.id, 'material', e.target.value)}
                                            placeholder="Links a Google Drive, Repositorios, PDFs..."
                                            className="w-full min-h-[100px] bg-dark-bg/50 border-0 p-2 rounded-[8px] text-sm outline-none focus:ring-1 focus:ring-purple-400/50 text-white placeholder-slate-500 transition-all resize-y"
                                        />
                                    </div>
                                </div>
                            </GlassCard>
                        ))
                    ) : (
                        <div className="text-center py-12 glass rounded-2xl border-dashed border-white/20">
                            <p className="text-slate-400">No hay módulos cargados para este bootcamp.</p>
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <Button 
                            type="submit" 
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-10 py-4 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] text-lg"
                        >
                            Guardar Cambios
                        </Button>
                    </div>
                </form>
            )}

            {isRendered && (
                <Alert message="¡Los cambios se han guardado exitosamente!" type="success" isVisible={showAlert} />
            )}
        </div>
    );
}
