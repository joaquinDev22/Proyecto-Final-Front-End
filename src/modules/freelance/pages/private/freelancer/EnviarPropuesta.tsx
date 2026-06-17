import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../../../core/components/ui/PageHeader';
import GlassCard from '../../../../../core/components/ui/GlassCard';
import Button from '../../../../../core/components/ui/Button';
import Input from '../../../../../core/components/ui/Input';
import useShowAlert from '../../../../../core/hooks/useShowAlert';
import Alert from '../../../../../core/components/ui/Alert';

export default function EnviarPropuesta() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would send the proposal data to your backend
        triggerAlert(() => {
            navigate('/freelance/buscar-proyecto'); // o a una página de "Mis Propuestas"
        });
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-6 py-8 animate-fade-in-up">
            <button
                onClick={() => navigate(`/freelance/buscar-proyecto/${id}`)}
                className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver al Proyecto
            </button>

            <PageHeader
                title="Enviar Propuesta"
                subtitle="Destácate explicando cómo resolverás el problema del cliente."
            />

            {!isRendered && (
                <GlassCard padding="p-8" borderColor="purple">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">¿Cómo abordarás este proyecto?</label>
                            <textarea
                                rows={6}
                                required
                                placeholder="Describe tu enfoque paso a paso, por qué eres el candidato ideal y qué valor agregado aportarás..."
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 text-white placeholder-slate-500 resize-none transition-all"
                            ></textarea>
                            <p className="text-xs text-slate-500 mt-2">Una buena propuesta es concisa pero demuestra que entendiste la necesidad del cliente.</p>
                        </div>

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Tecnologías a utilizar</label>
                            <Input 
                                placeholder="Ej: React Native, Firebase, Stripe..." 
                                type="text" 
                                required
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 text-white placeholder-slate-500 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Valor de tu trabajo (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <Input
                                        placeholder="1500"
                                        type="number"
                                        min="1"
                                        required
                                        className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 text-white placeholder-slate-500 transition-all pl-8"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Tiempo estimado de entrega</label>
                                <Input
                                    placeholder="Ej: 3 semanas, 1 mes..."
                                    type="text"
                                    required
                                    className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 text-white placeholder-slate-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6 mt-2 flex justify-between items-center">
                            <p className="text-xs text-slate-400">
                                Al enviar esta propuesta, aceptas los <a href="#" className="text-purple-400 hover:underline">Términos de Servicio</a>.
                            </p>
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                Enviar Propuesta
                            </Button>
                        </div>
                    </form>
                </GlassCard>
            )}

            {isRendered && (
                <Alert message="¡Propuesta enviada exitosamente!" type="success" isVisible={showAlert} />
            )}
        </div>
    );
}
