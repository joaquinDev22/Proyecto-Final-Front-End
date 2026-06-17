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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        triggerAlert(() => {
            navigate('/cliente/mis-proyectos');
        });
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
                                    options={[
                                        { label: "Seleccione una categoría", value: "" },
                                        { label: "Desarrollo Web", value: "web" },
                                        { label: "App Móvil", value: "mobile" },
                                        { label: "Diseño UX/UI", value: "design" }
                                    ]}
                                    value=""
                                    onChange={() => {}}
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Habilidades requeridas</label>
                                <Input 
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
