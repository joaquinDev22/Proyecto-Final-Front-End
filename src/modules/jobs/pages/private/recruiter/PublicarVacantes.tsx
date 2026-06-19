import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, DollarSign } from "lucide-react";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";
import Input from "../../../../../core/components/ui/Input";
import Select from "../../../../../core/components/ui/Select";
import useShowAlert from "../../../../../core/hooks/useShowAlert";
import Alert from "../../../../../core/components/ui/Alert";

export default function PublicarVacante() {
    const navigate = useNavigate();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();
    const [isPreviewing, setIsPreviewing] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        workday: "",
        description: "",
        requirements: "",
        minSalary: "",
        maxSalary: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const payload = {
            puesto: formData.title,
            descripcion: formData.description,
            tipoUbicacion: formData.type || "Remoto",
            tipoVacante: formData.workday || "Tiempo Completo",
            salario: formData.minSalary && formData.maxSalary ? `${formData.minSalary} - ${formData.maxSalary}` : (formData.minSalary || formData.maxSalary || ""),
            etiquetas: formData.requirements ? formData.requirements.split(',').map(r => r.trim()) : [],
            ubicacion: "No especificada" // Added as fallback
        };

        try {
            const { jobService } = await import('../../../../../core/api/jobService');
            await jobService.create(payload);
            triggerAlert(() => {
                navigate('/recruiter/dashboard');
            });
        } catch (error) {
            console.error("Error al publicar vacante:", error);
            window.alert("Hubo un error al publicar la vacante.");
        }
    };

    const handlePreview = () => {
        setIsPreviewing(true);
    };

    const MODALIDAD_OPTIONS = [
        { label: "100% Remoto", value: "Remoto" },
        { label: "Híbrido", value: "Hibrido" },
        { label: "Presencial", value: "Presencial" }
    ];

    const JORNADA_OPTIONS = [
        { label: "Full-Time", value: "Full-Time" },
        { label: "Part-Time", value: "Part-Time" },
        { label: "Freelance / Contrato", value: "Freelance" }
    ];

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
                    title="Vista Previa de Vacante" 
                    subtitle="Así es como los candidatos verán tu publicación."
                />

                <GlassCard padding="p-8" borderColor="cyan" className="mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-black text-white mb-2">
                                {formData.title || "Título de la Vacante"}
                            </h1>
                            <div className="flex items-center gap-4 text-slate-400 text-sm">
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {formData.type || "Modalidad no definida"}</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {formData.workday || "Jornada no definida"}</span>
                                {(formData.minSalary || formData.maxSalary) && (
                                    <span className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4" /> {formData.minSalary ? `$${formData.minSalary}` : ''} 
                                        {formData.minSalary && formData.maxSalary ? ' - ' : ''} 
                                        {formData.maxSalary ? `$${formData.maxSalary}` : ''}
                                    </span>
                                )}
                            </div>
                        </div>
                        <Button className="bg-cyan-600 opacity-50 cursor-not-allowed">Postularme (Deshabilitado)</Button>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Descripción del Puesto</h2>
                        <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                            {formData.description || "No se ha proporcionado una descripción."}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Requisitos</h2>
                        <div className="flex flex-wrap gap-2">
                            {formData.requirements ? formData.requirements.split(',').map((req, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300">
                                    {req.trim()}
                                </span>
                            )) : (
                                <span className="text-slate-500 italic">No se especificaron requisitos.</span>
                            )}
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
                ← Volver a Mis Vacantes
            </button>

            <PageHeader 
                title="Publicar Nueva Vacante" 
                subtitle="Define los detalles del puesto, requisitos y el proceso de postulación."
            />

            {!isRendered && (
                <form onSubmit={(e) => { e.preventDefault(); handlePreview(); }} className="flex flex-col gap-8">
                    
                    <GlassCard padding="p-8" borderColor="cyan">
                        <h2 className="text-xl font-bold text-white mb-6">Detalles del Puesto</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Título de la Vacante</label>
                                <Input 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="Ej: Senior React Developer" 
                                    required 
                                    className="w-full border-0 p-2 rounded-[8px] bg-dark-bg/50" 
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm z-20">Modalidad</label>
                                <Select 
                                    value={formData.type}
                                    onChange={(val) => setFormData({...formData, type: val})}
                                    options={MODALIDAD_OPTIONS}
                                    placeholder="Seleccionar modalidad"
                                    className="w-full z-20 relative border-0 p-2 rounded-[8px]"
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm z-10">Tipo de Jornada</label>
                                <Select 
                                    value={formData.workday}
                                    onChange={(val) => setFormData({...formData, workday: val})}
                                    options={JORNADA_OPTIONS}
                                    placeholder="Seleccionar jornada"
                                    className="w-full z-10 relative border-0 p-2 rounded-[8px]"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Descripción del Puesto</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Describe las responsabilidades, la misión del rol, etc..."
                                    required
                                    className="w-full min-h-[120px] bg-dark-bg/50 border border-white/10 rounded-[8px] p-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all resize-y"
                                />
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard padding="p-8" borderColor="purple">
                        <h2 className="text-xl font-bold text-white mb-6">Requisitos y Salario</h2>
                        <div className="flex flex-col gap-5">
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Requisitos (separados por coma)</label>
                                <Input 
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                                    placeholder="Ej: React, TypeScript, 5 años de experiencia..." 
                                    required 
                                    className="w-full border-0 p-2 rounded-[8px] bg-dark-bg/50" 
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-slate-300 font-bold block mb-2 text-sm">Salario Mínimo (USD)</label>
                                    <Input 
                                        type="number" 
                                        value={formData.minSalary}
                                        onChange={(e) => setFormData({...formData, minSalary: e.target.value})}
                                        placeholder="Ej: 3000" 
                                        className="w-full border-0 p-2 rounded-[8px] bg-dark-bg/50" 
                                    />
                                </div>
                                <div>
                                    <label className="text-slate-300 font-bold block mb-2 text-sm">Salario Máximo (USD)</label>
                                    <Input 
                                        type="number" 
                                        value={formData.maxSalary}
                                        onChange={(e) => setFormData({...formData, maxSalary: e.target.value})}
                                        placeholder="Ej: 5000" 
                                        className="w-full border-0 p-2 rounded-[8px] bg-dark-bg/50" 
                                    />
                                </div>
                            </div>
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
                <Alert message="¡Vacante publicada exitosamente! Redirigiendo..." type="success" isVisible={showAlert} />
            )}
        </div>
    );
}
