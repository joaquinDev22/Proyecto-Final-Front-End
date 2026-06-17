import GlassCard from '../../../core/components/ui/GlassCard';

interface FinancialWidgetProps {
    title: string;
    amount: string | number;
    subtitle: string;
    color?: 'cyan' | 'purple' | 'blue' | 'white';
}

export default function FinancialWidget({ title, amount, subtitle, color = 'cyan' }: FinancialWidgetProps) {
    const textColors = {
        cyan: "text-cyan-400",
        purple: "text-purple-400",
        blue: "text-blue-400",
        white: "text-slate-400"
    };

    const glowColors = {
        cyan: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
        purple: "bg-purple-500/10 group-hover:bg-purple-500/20",
        blue: "bg-blue-500/10 group-hover:bg-blue-500/20",
        white: "bg-white/5 group-hover:bg-white/10"
    };

    return (
        <GlassCard borderColor={color as any} padding="p-8" className="relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] transition-colors ${glowColors[color]}`}></div>
            <p className="text-slate-400 font-medium mb-2 relative z-10">{title}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">
                {amount}
            </h2>
            <p className={`${textColors[color]} text-sm font-semibold relative z-10`}>{subtitle}</p>
        </GlassCard>
    );
}
