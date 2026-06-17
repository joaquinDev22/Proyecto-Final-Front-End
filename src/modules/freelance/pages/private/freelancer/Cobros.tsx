import { useState, useEffect } from "react";
import Button from "../../../../../core/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Cobros() {
    const navigate = useNavigate();

    // TODO: Define proper types centrally
    const [finances, setFinances] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchCobros = async () => {
            try {
                // const financeResponse = await fetch('/api/freelance/finances');
                // const financeData = await financeResponse.json();
                // setFinances(financeData);
                
                // const txResponse = await fetch('/api/freelance/transactions');
                // const txData = await txResponse.json();
                // setTransactions(txData);

                // Fallback / Empty state
                setFinances({
                    availableBalance: 0,
                    escrowBalance: 0,
                    totalEarnings: 0
                });
                setTransactions([]);
            } catch (error) {
                console.error("Error fetching cobros data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCobros();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-center mt-20">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Cobros y Finanzas</h1>
                    <p className="text-slate-400">Administra tus ganancias y retira tus fondos de forma segura.</p>
                </div>
                <Button 
                    className="bg-cyan-500 border-0 rounded-[10px] hover:bg-cyan-400 text-[#0b1121] font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)] px-6 py-3"
                    onClick={() => navigate('/freelance/retirar-fondos')}
                >
                    Retirar Fondos
                </Button>
            </div>

            {/* Financial Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Available Balance */}
                <div className="glass p-8 rounded-3xl border-t border-cyan-500/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-colors"></div>
                    <p className="text-slate-400 font-medium mb-2 relative z-10">Saldo Disponible</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 relative z-10">
                        ${finances?.availableBalance || 0}<span className="text-2xl text-slate-500">.00</span>
                    </h2>
                    <p className="text-cyan-400 text-sm font-semibold relative z-10">0% este mes</p>
                </div>

                {/* Escrow Balance */}
                <div className="glass p-8 rounded-3xl border-t border-purple-500/30 relative overflow-hidden">
                    <p className="text-slate-400 font-medium mb-2">En Retención (Escrow)</p>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        ${finances?.escrowBalance || 0}<span className="text-xl text-slate-500">.00</span>
                    </h2>
                    <p className="text-purple-400 text-sm font-semibold">De 0 proyectos en curso</p>
                </div>

                {/* Total Earnings */}
                <div className="glass p-8 rounded-3xl border-t border-white/10 relative overflow-hidden">
                    <p className="text-slate-400 font-medium mb-2">Ganancias Totales (Año Actual)</p>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        ${finances?.totalEarnings || 0}<span className="text-xl text-slate-500">.00</span>
                    </h2>
                    <p className="text-slate-400 text-sm">A través de 0 proyectos</p>
                </div>
            </div>

            {/* Transaction History */}
            <div className="glass rounded-3xl border-t border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Historial de Transacciones</h3>
                    <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">Ver todas</button>
                </div>

                <div className="overflow-x-auto">
                    {transactions.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02]">
                                    <th className="p-4 text-sm font-medium text-slate-400">ID Ref</th>
                                    <th className="p-4 text-sm font-medium text-slate-400">Fecha</th>
                                    <th className="p-4 text-sm font-medium text-slate-400">Descripción</th>
                                    <th className="p-4 text-sm font-medium text-slate-400">Estado</th>
                                    <th className="p-4 text-sm font-medium text-slate-400 text-right">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx: any) => (
                                    <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 text-sm font-mono text-slate-500">{tx.id}</td>
                                        <td className="p-4 text-sm text-slate-300">{tx.date}</td>
                                        <td className="p-4 text-sm font-medium text-white">{tx.description}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${tx.status === 'Completado' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className={`p-4 text-sm font-bold text-right ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-slate-300'
                                            }`}>
                                            {tx.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                         <div className="p-12 text-center">
                            <p className="text-slate-400 text-lg">No tienes transacciones recientes.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}