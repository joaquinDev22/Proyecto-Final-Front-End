
interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    features?: string[];
    color?: 'cyan' | 'purple' | 'blue';
}

export default function FeatureCard({ icon, title, description, features, color = 'cyan' }: FeatureCardProps) {
    const borders = {
        cyan: "border-cyan-500/30",
        purple: "border-purple-500/30",
        blue: "border-blue-500/30"
    };

    const iconBgs = {
        cyan: "bg-cyan-500/10 text-cyan-400",
        purple: "bg-purple-500/10 text-purple-400",
        blue: "bg-blue-500/10 text-blue-400"
    };

    const checkColors = {
        cyan: "text-cyan-400",
        purple: "text-purple-400",
        blue: "text-blue-400"
    };

    return (
        <div className={`glass p-8 rounded-3xl border-t ${borders[color]} flex flex-col`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 ${iconBgs[color]}`}>
                {icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <p className="text-slate-400 mb-6 flex-1">{description}</p>

            {features && features.length > 0 && (
                <ul className="space-y-3 mb-6">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                            <span className={checkColors[color]}>✓</span> {feature}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
