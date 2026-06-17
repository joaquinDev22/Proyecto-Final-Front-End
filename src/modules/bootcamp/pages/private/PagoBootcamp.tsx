import { useNavigate, useParams, useLocation } from "react-router-dom";
import PageHeader from "../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../core/components/ui/GlassCard";
import Button from "../../../../core/components/ui/Button";
import Input from "../../../../core/components/ui/Input";
import useShowAlert from "../../../../core/hooks/useShowAlert";
import Alert from "../../../../core/components/ui/Alert";

export default function PagoBootcamp() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();

    // Determinar la ruta base para volver correctamente
    const basePath = location.pathname.split(`/${id}/pago`)[0];

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        triggerAlert(() => {
            navigate(`${basePath}/${id}/aula`);
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-6 py-8 animate-fade-in-up">
            <button 
                onClick={() => navigate(-1)}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Detalles del Bootcamp
            </button>

            <PageHeader 
                title="Inscripción al Bootcamp" 
                subtitle={`Completar pago para acceder al curso`} 
            />

            {!isRendered && (
                <GlassCard padding="p-8" borderColor="cyan">
                    <form onSubmit={handlePayment} className="flex flex-col gap-6">
                        
                        <div className="bg-dark-bg/50 p-4 rounded-xl border border-white/5 mb-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold mb-1">Full Stack Web Developer</h3>
                                <p className="text-slate-400 text-sm">Matrícula completa - 6 Meses</p>
                            </div>
                            <span className="text-3xl font-black text-white">$2,500</span>
                        </div>

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Nombre en la tarjeta</label>
                            <Input 
                                placeholder="Ej: JUAN PEREZ" 
                                type="text" 
                                required
                                className="w-full bg-dark-bg/50 border-0 p-2 rounded-[8px] text-sm outline-none focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all uppercase"
                            />
                        </div>

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Número de la tarjeta</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">💳</span>
                                <Input 
                                    placeholder="0000 0000 0000 0000" 
                                    type="text" 
                                    required
                                    maxLength={19}
                                    className="w-full bg-dark-bg/50 border-0 p-2 rounded-[8px] text-sm outline-none focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all pl-12 tracking-widest"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">Vencimiento (MM/AA)</label>
                                <Input 
                                    placeholder="12/28" 
                                    type="text" 
                                    required
                                    maxLength={5}
                                    className="w-full bg-dark-bg/50 border-0 p-2 rounded-[8px] text-sm outline-none focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all text-center tracking-widest"
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">CVV</label>
                                <Input 
                                    placeholder="123" 
                                    type="password" 
                                    required
                                    maxLength={4}
                                    className="w-full bg-dark-bg/50 border-0 p-2 rounded-[8px] text-sm outline-none focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all text-center tracking-widest"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6 mt-2 flex flex-col gap-4 items-center">
                            <p className="text-xs text-slate-400 flex items-center gap-2">
                                🔒 Transacción encriptada. Se aplicarán los términos de Garantía de Empleo.
                            </p>
                            <Button type="submit" className="w-full border-0 p-2 rounded-[8px] bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] text-lg">
                                Confirmar Pago e Inscribirse
                            </Button>
                        </div>
                    </form>
                </GlassCard>
            )}

            {isRendered && (
                <Alert message="¡Inscripción exitosa! Redirigiendo a tu nueva aula..." type="success" isVisible={showAlert} />
            )}
        </div>
    );
}
