import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";
import Input from "../../../../../core/components/ui/Input";
import useShowAlert from "../../../../../core/hooks/useShowAlert";
import Alert from "../../../../../core/components/ui/Alert";

export default function RealizarPago() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        triggerAlert(() => {
            navigate('/cliente/mis-proyectos');
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-6 py-8 animate-fade-in-up">
            <button 
                onClick={() => navigate('/cliente/mis-proyectos')}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Mis Proyectos
            </button>

            <PageHeader 
                title="Realizar Pago" 
                subtitle={`Liberar fondos para el proyecto #${id}`} 
            />

            {!isRendered && (
                <GlassCard padding="p-8" borderColor="cyan">
                    <form onSubmit={handlePayment} className="flex flex-col gap-6">
                        
                        <div className="bg-dark-bg/50 p-4 rounded-xl border border-white/5 mb-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold mb-1">Monto a pagar</h3>
                                <p className="text-slate-400 text-sm">Hito final - Proyecto completado</p>
                            </div>
                            <span className="text-3xl font-black text-white">$800</span>
                        </div>

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Nombre en la tarjeta</label>
                            <Input 
                                placeholder="Ej: JUAN PEREZ" 
                                type="text" 
                                required
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-[8px] p-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all uppercase"
                            />
                        </div>

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Número de la tarjeta</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">💳</span>
                                <Input 
                                    placeholder="0000 0000 0000 0000" 
                                    type="text" 
                                    required
                                    maxLength={19}
                                    className="w-full bg-dark-bg/50 border border-white/10 rounded-[8px] p-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all pl-12 tracking-widest"
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
                                    className="w-full bg-dark-bg/50 border border-white/10 rounded-[8px] p-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all text-center tracking-widest"
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 font-bold block mb-2 text-sm">CVV</label>
                                <Input 
                                    placeholder="123" 
                                    type="password" 
                                    required
                                    maxLength={4}
                                    className="w-full bg-dark-bg/50 border border-white/10 rounded-[8px] p-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all text-center tracking-widest"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6 mt-2 flex flex-col gap-4 items-center">
                            <p className="text-xs text-slate-400 flex items-center gap-2">
                                🔒 Tus datos de pago están encriptados y seguros.
                            </p>
                            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-4 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] text-lg">
                                Pagar $800 USD
                            </Button>
                        </div>
                    </form>
                </GlassCard>
            )}

            {isRendered && (
                <Alert message="¡Pago procesado exitosamente! Los fondos han sido liberados." type="success" isVisible={showAlert} />
            )}
        </div>
    );
}
