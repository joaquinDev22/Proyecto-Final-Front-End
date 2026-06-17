import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";
import Input from "../../../../../core/components/ui/Input";
import useShowAlert from "../../../../../core/hooks/useShowAlert";
import Alert from "../../../../../core/components/ui/Alert";

export default function CrearBootcamp() {
    const navigate = useNavigate();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();
    const [isPreviewing, setIsPreviewing] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        title: "",
        specialty: "",
        description: "",
        price: ""
    });
    
    const [modulos, setModulos] = useState([{ id: 1, title: "", description: "" }]);

    const handleAddModulo = () => {
        setModulos([...modulos, { id: modulos.length + 1, title: "", description: "" }]);
    };

    const handleRemoveModulo = (id: number) => {
        setModulos(modulos.filter(m => m.id !== id));
    };

    const handleModuloChange = (id: number, field: 'title' | 'description', value: string) => {
        setModulos(modulos.map(m => m.id === id ? { ...m, [field]: value } : m));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        triggerAlert(() => {
            navigate('/instructor/bootcamps');
        });
    };

    const handlePreview = () => {
        setIsPreviewing(true);
    };

    if (isPreviewing) {
        return (
            <div className="w-full max-w-4xl mx-auto px-6 py-8 animate-fade-in-up">
                <button 
                    onClick={() => setIsPreviewing(false)}
                    className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
                >
                    ← Volver a Edición
                </button>

                <PageHeader 
                    title="Vista Previa del Bootcamp" 
                    subtitle="Así es como los estudiantes verán el curso."
                />

                <GlassCard padding="p-8" borderColor="cyan" className="mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-black text-white mb-2">
                                {formData.title || "Título del Bootcamp"}
                            </h1>
                            <div className="flex items-center gap-4 text-slate-400 text-sm">
                                <span className="flex items-center gap-1">📚 {formData.specialty || "Especialidad no definida"}</span>
                                {formData.price && (
                                    <span className="flex items-center gap-1 text-cyan-400 font-bold">
                                        💰 ${formData.price}
                                    </span>
                                )}
                            </div>
                        </div>
                        <Button className="bg-cyan-600 opacity-50 cursor-not-allowed">Inscribirme (Deshabilitado)</Button>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Descripción General</h2>
                        <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                            {formData.description || "No se ha proporcionado una descripción."}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Temario ({modulos.length} Módulos)</h2>
                        <div className="flex flex-col gap-4">
                            {modulos.map((modulo, index) => (
                                <div key={modulo.id} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <h3 className="font-bold text-white mb-2">Módulo {index + 1}: {modulo.title || "Sin Título"}</h3>
                                    <p className="text-slate-400 text-sm whitespace-pre-line">{modulo.description || "Sin descripción"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </GlassCard>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => setIsPreviewing(false)}>Seguir Editando</Button>
                    <Button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold" onClick={handleSubmit}>Confirmar y Publicar</Button>
                </div>
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
                title="Crear Nuevo Bootcamp" 
                subtitle="Estructura tu curso, define el temario y establece el costo de inscripción."
            />

            {!isRendered && (
                <form onSubmit={(e) => { e.preventDefault(); handlePreview(); }} className="flex flex-col gap-8">
                    
                    {/* Información General */}
                    <GlassCard padding="p-8" borderColor="cyan">
                        <h2 className="text-xl font-bold text-white mb-6">Información General</h2>
                        <div className="flex flex-col gap-5">
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Título del Bootcamp</label>
                                <Input 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="Ej: React y TypeScript Avanzado" 
                                    required 
                                    className="w-full border-0 p-2 rounded-[8px] bg-dark-bg/50" 
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Especialidad</label>
                                <Input 
                                    value={formData.specialty}
                                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                                    placeholder="Ej: Frontend Development" 
                                    required 
                                    className="w-full border-0 p-2 rounded-[8px] bg-dark-bg/50" 
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Descripción General</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Describe qué aprenderán los estudiantes..."
                                    required
                                    className="w-full min-h-[120px] bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all resize-y"
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Precio (USD)</label>
                                <Input 
                                    type="number" 
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    placeholder="Ej: 500" 
                                    required 
                                    className="w-full border-0 p-2 rounded-[8px] max-w-xs bg-dark-bg/50" 
                                />
                            </div>
                        </div>
                    </GlassCard>

                    {/* Temario / Módulos */}
                    <GlassCard padding="p-8" borderColor="purple">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Temario del Curso</h2>
                            <Button type="button" variant="outline" size="sm" onClick={handleAddModulo}>
                                + Añadir Módulo
                            </Button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {modulos.map((modulo, index) => (
                                <div key={modulo.id} className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl relative">
                                    {modulos.length > 1 && (
                                        <button 
                                            type="button"
                                            onClick={() => handleRemoveModulo(modulo.id)}
                                            className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
                                        >
                                            ✕
                                        </button>
                                    )}
                                    <h3 className="text-cyan-400 font-bold text-sm mb-4">Módulo {index + 1}</h3>
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <label className="text-slate-300 font-bold block mb-2 text-sm">Título del Módulo</label>
                                            <Input 
                                                value={modulo.title}
                                                onChange={(e) => handleModuloChange(modulo.id, 'title', e.target.value)}
                                                placeholder="Ej: Introducción a la arquitectura" 
                                                required 
                                                className="w-full border-0 p-2 rounded-[8px] bg-dark-bg/80" 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-slate-300 font-bold block mb-2 text-sm">Contenido o Material de Estudio</label>
                                            <textarea 
                                                value={modulo.description}
                                                onChange={(e) => handleModuloChange(modulo.id, 'description', e.target.value)}
                                                placeholder="Link a repositorio, descripción de la clase..."
                                                required
                                                className="w-full min-h-[80px] bg-dark-bg/80 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all resize-y"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button 
                            type="submit" 
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-10 py-4 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] text-lg"
                        >
                            Vista Previa
                        </Button>
                    </div>
                </form>
            )}

            {isRendered && (
                <Alert message="¡Bootcamp creado exitosamente! Redirigiendo a tu panel..." type="success" isVisible={showAlert} />
            )}
        </div>
    );
}
