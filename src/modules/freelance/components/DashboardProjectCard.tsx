import Button from "../../../core/components/ui/Button";
import Badge from "../../../core/components/ui/Badge";

interface ProjectCardProps {
    title: string;
    clientName: string;
    budget: string;
    description: string;
    skills: string[];
    postedTime: string;
    onApply: () => void;
    onViewDetails: () => void;
}

export default function DashboardProjectCard({ title, clientName, budget, description, skills, postedTime, onApply, onViewDetails }: ProjectCardProps) {
    return (
        <div className="glass p-6 rounded-2xl border-t border-purple-500/20 flex flex-col h-full hover:border-purple-500/50 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{title}</h3>
                    <p className="text-sm text-slate-400">{clientName} • Publicado {postedTime}</p>
                </div>
                <div className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20 font-bold whitespace-nowrap">
                    {budget}
                </div>
            </div>

            <p className="text-slate-300 mb-6 flex-1 text-sm line-clamp-3">
                {description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
                {skills.map((skill, idx) => (
                    <Badge key={idx} variant="info" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">{skill}</Badge>
                ))}
            </div>

            <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                <Button variant="outline" className="flex-1 border-1 rounded-[8px] border-white/10 hover:bg-white/5 text-sm py-2" onClick={onViewDetails}>
                    Ver Detalles
                </Button>
                <Button className="flex-1 bg-purple-600 rounded-[8px] hover:bg-purple-500 text-sm py-2" onClick={onApply}>
                    Postularme
                </Button>
            </div>
        </div>
    );
}
