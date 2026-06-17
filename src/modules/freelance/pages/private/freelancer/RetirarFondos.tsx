import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";
import Input from "../../../../../core/components/ui/Input";
import useShowAlert from "../../../../../core/hooks/useShowAlert";
import Alert from "../../../../../core/components/ui/Alert";

export default function RetirarFondos() {
    const navigate = useNavigate();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const methods = [
        { id: "bank", name: "Transferencia Bancaria", icon: "🏦", desc: "1-3 días hábiles. Sin comisión." },
        { id: "mercadopago", name: "Mercado Pago", icon: "🤝", desc: "Instantáneo. Comisión del 1%." },
        { id: "paypal", name: "PayPal", icon: "🅿️", desc: "Instantáneo. Comisión de USD $2 + 2%." }
    ];

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMethod) return;

        triggerAlert(() => {
            navigate('/freelance/cobros');
        });
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-6 py-8 animate-fade-in-up">
            <button 
                onClick={() => navigate('/freelance/cobros')}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Cobros
            </button>

            <PageHeader 
                title="Retirar Fondos" 
                subtitle="Selecciona tu método preferido para transferir tu saldo disponible." 
            />

            {!isRendered && (
                <form onSubmit={handleWithdraw} className="flex flex-col gap-8">
                    
                    {/* Saldo a Retirar */}
                    <GlassCard padding="p-6" borderColor="cyan">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="text-white font-bold text-lg">Saldo Disponible</h3>
                                <p className="text-slate-400 text-sm">Este es el dinero listo para transferir.</p>
                            </div>
                            <span className="text-4xl font-black text-cyan-400">$2,450.00</span>
                        </div>
                        
                        <div className="mt-6">
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Monto a retirar (USD)</label>
                            <div className="relative max-w-sm">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                <Input 
                                    type="number" 
                                    placeholder="2450.00" 
                                    required
                                    max="2450"
                                    min="1"
                                    className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-lg outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all pl-8"
                                />
                                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 font-bold text-sm hover:text-cyan-300">
                                    Máx
                                </button>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Métodos de Pago */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Método de Retiro</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {methods.map(method => (
                                <div 
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center gap-2
                                        ${selectedMethod === method.id 
                                            ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                                            : 'bg-dark-bg/40 border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    <span className="text-4xl mb-2">{method.icon}</span>
                                    <h4 className="text-white font-bold">{method.name}</h4>
                                    <p className="text-xs text-slate-400">{method.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/10">
                        <Button 
                            type="submit" 
                            disabled={!selectedMethod}
                            className={`px-10 py-4 rounded-xl text-lg font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all ${selectedMethod ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
                        >
                            Confirmar Retiro
                        </Button>
                    </div>
                </form>
            )}

            {isRendered && (
                <Alert message="¡Retiro en proceso! Te redirigiremos hacia la pasarela seleccionada para finalizar la operación..." type="success" isVisible={showAlert} />
            )}
        </div>
    );
}
