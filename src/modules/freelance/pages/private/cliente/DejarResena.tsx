import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";
import Input from "../../../../../core/components/ui/Input";
import useShowAlert from "../../../../../core/hooks/useShowAlert";
import Alert from "../../../../../core/components/ui/Alert";
import { useState } from "react";

export default function DejarResena() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();
    const [rating, setRating] = useState(5);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        triggerAlert(() => {
            navigate('/cliente/mis-proyectos');
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-6 py-8 animate-fade-in-up">
            <button 
                onClick={() => navigate('/cliente/mis-proyectos')}
                className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Mis Proyectos
            </button>

            <PageHeader 
                title="Dejar Reseña" 
                subtitle={`Califica el trabajo realizado en el proyecto #${id}`} 
            />

            {!isRendered && (
                <GlassCard padding="p-8" borderColor="purple">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        
                        {/* Rating Stars */}
                        <div className="flex flex-col items-center gap-4">
                            <label className="text-white font-bold text-lg">¿Cómo calificarías el trabajo del freelancer?</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`text-5xl transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'text-slate-600 grayscale'}`}
                                    >
                                        ⭐
                                    </button>
                                ))}
                            </div>
                            <span className="text-slate-400 font-medium">
                                {rating === 5 ? "¡Excelente!" : rating === 4 ? "Muy Bueno" : rating === 3 ? "Bueno" : rating === 2 ? "Regular" : "Malo"}
                            </span>
                        </div>

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Resumen (Título de la reseña)</label>
                            <Input 
                                placeholder="Ej: Excelente trabajo, entregado a tiempo." 
                                type="text" 
                                required
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 text-white placeholder-slate-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Comentarios Detallados</label>
                            <textarea 
                                rows={5}
                                required
                                placeholder="Describe tu experiencia trabajando con este freelancer. ¿Qué hizo bien? ¿Lo recomendarías?"
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 text-white placeholder-slate-500 resize-none transition-all"
                            ></textarea>
                        </div>

                        <div className="border-t border-white/10 pt-6 mt-2 flex justify-end">
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                Publicar Reseña
                            </Button>
                        </div>
                    </form>
                </GlassCard>
            )}

            {isRendered && (
                <Alert message="¡Reseña publicada! Gracias por fortalecer la comunidad." type="success" isVisible={showAlert} />
            )}
        </div>
    );
}
