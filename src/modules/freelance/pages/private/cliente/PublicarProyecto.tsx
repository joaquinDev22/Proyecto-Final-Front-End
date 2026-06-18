import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";
import Input from "../../../../../core/components/ui/Input";
import Select from "../../../../../core/components/ui/Select";
import useShowAlert from "../../../../../core/hooks/useShowAlert";
import Alert from "../../../../../core/components/ui/Alert";

export default function PublicarProyecto() {
    const navigate = useNavigate();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        // Parse budget string "500 - 1000"
        const budgetStr = formData.get('presupuesto') as string || '';
        const budgetParts = budgetStr.split('-').map(p => parseFloat(p.replace(/[^0-9.]/g, '')));
        const min = budgetParts[0] || 0;
        const max = budgetParts.length > 1 ? budgetParts[1] : min;

        const payload = {
            clienteId: 0, // Bypass DTO validation, backend '/me' endpoint will override this with the authenticated user's ID
            area: formData.get('categoria') || "Desarrollo Web",
            descripcion: formData.get('descripcion'),
            presupuestoMin: min,
            presupuestoMax: max,
            duracion: formData.get('duracion'),
            tipoPago: "Fijo", // Por defecto
            habilidades: (formData.get('habilidades') as string)?.split(',').map(s => s.trim()) || []
        };

        try {
            const { freelanceService } = await import('../../../../../core/api/freelanceService');
            await freelanceService.create(payload);
            triggerAlert(() => {
                navigate('/cliente/mis-proyectos');
            });
        } catch (error) {
            console.error("Error al publicar proyecto:", error);
            window.alert("Error al publicar el proyecto.");
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-6 py-8 animate-fade-in-up">
            <PageHeader 
                title="Publicar Nuevo Proyecto" 
                subtitle="Describe lo que necesitas y encuentra al talento ideal en minutos." 
            />

            {!isRendered && (
                <GlassCard padding="p-8" borderColor="cyan">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Título del Proyecto</label>
                            <Input 
                                placeholder="Ej: Rediseño completo de App Móvil iOS/Android" 
                                type="text" 
                                required
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Descripción Detallada</label>
                            <textarea 
                                name="descripcion"
                                rows={6}
                                required
                                placeholder="Describe el alcance, los objetivos y qué esperas del freelancer..."
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 resize-none transition-all"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Categoría principal</label>
                                <Select 
                                    name="categoria"
                                    options={[
                                        { label: "Seleccione una categoría", value: "" },
                                        { label: "Desarrollo Web", value: "web" },
                                        { label: "App Móvil", value: "mobile" },
                                        { label: "Diseño UX/UI", value: "design" }
                                    ]}
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Habilidades requeridas</label>
                                <Input 
                                    name="habilidades"
                                    placeholder="Ej: React, Node.js, Figma..." 
                                    type="text" 
                                    required
                                    className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Presupuesto Estimado (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <Input 
                                        name="presupuesto"
                                        placeholder="Ej: 500 - 1000" 
                                        type="text" 
                                        required
                                        className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all pl-8"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Duración Esperada</label>
                                <Input 
                                    name="duracion"
                                    placeholder="Ej: 2 semanas" 
                                    type="text" 
                                    required
                                    className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6 mt-2 flex justify-end">
                            <Button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                Publicar Proyecto
                            </Button>
                        </div>
                    </form>
                </GlassCard>
            )}

            {isRendered && (
                <Alert message="¡Proyecto publicado con éxito! Ahora los freelancers podrán enviarte propuestas." type="success" isVisible={showAlert} />
            )}
        </div>
    );
}
