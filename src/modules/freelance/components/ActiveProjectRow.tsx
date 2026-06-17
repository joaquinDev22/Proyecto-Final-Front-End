import GlassCard from '../../../core/components/ui/GlassCard';
import Button from '../../../core/components/ui/Button';

export interface ActiveProject {
    id: string | number;
    title: string;
    clientName: string;
    status: string;
    progress: number;
    deadline: string;
    color: 'cyan' | 'purple' | 'blue';
}

interface ActiveProjectRowProps {
    project: ActiveProject;
    onDeliverable?: (id: string | number) => void;
    onChat?: (id: string | number) => void;
}

export default function ActiveProjectRow({ project, onDeliverable, onChat }: ActiveProjectRowProps) {
    const bgColors = {
        cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    };

    const textColors = {
        cyan: "text-cyan-400",
        purple: "text-purple-400",
        blue: "text-blue-400"
    };

    const progressColors = {
        cyan: "bg-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]",
        purple: "bg-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]",
        blue: "bg-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
    };

    return (
        <GlassCard
            padding="p-6 md:p-8"
            rounded="rounded-2xl"
            borderColor="white"
            hoverEffect
            className="flex flex-col md:flex-row gap-6 md:items-center"
        >
            {/* Project Info */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${bgColors[project.color]}`}>
                        {project.status}
                    </span>
                </div>
                <p className="text-slate-400 text-sm">
                    Cliente: <span className="text-slate-300 font-medium">{project.clientName}</span> • Entrega: {project.deadline}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 w-full max-w-sm">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 font-medium">Progreso</span>
                    <span className={`${textColors[project.color]} font-bold`}>{project.progress}%</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${progressColors[project.color]}`}
                        style={{ width: `${project.progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 md:min-w-[200px] justify-end">
                <Button
                    variant="outline"
                    className="border rounded-[8px] hover:bg-white/5 text-sm p-2"
                    onClick={() => onDeliverable && onDeliverable(project.id)}
                >
                    Entregable
                </Button>
                <Button
                    className="bg-white text-[#0b1121] font-bold border-0 rounded-[15px] hover:bg-slate-200 text-sm px-6"
                    onClick={() => onChat && onChat(project.id)}
                >
                    Chat
                </Button>
            </div>
        </GlassCard>
    );
}
