import GlassCard from '../../../core/components/ui/GlassCard';

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: string;
    status: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
    onViewAll?: () => void;
}

export default function TransactionTable({ transactions, onViewAll }: TransactionTableProps) {
    return (
        <GlassCard padding="p-0" className="overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Historial de Transacciones</h3>
                {onViewAll && (
                    <button onClick={onViewAll} className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">Ver todas</button>
                )}
            </div>

            <div className="overflow-x-auto">
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
                        {transactions.map((tx) => (
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
                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-slate-400">
                                    No hay transacciones recientes.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </GlassCard>
    );
}
