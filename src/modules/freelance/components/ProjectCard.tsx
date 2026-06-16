import Badge from '../../../core/components/ui/Badge';
import { type FreelanceProject } from '../../../core/data/mockData';

type ProjectCardProps = {
    project: FreelanceProject;
    onClick?: () => void;
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <div
            className="glass glass-hover p-6 rounded-2xl cursor-pointer flex flex-col gap-4 group"
            onClick={onClick}
        >
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-purple-400 transition-colors mb-1">{project.title}</h3>
                    <p className="text-slate-400 text-sm">Cliente: <span className="text-slate-300 font-medium">{project.client}</span></p>
                </div>
                <div className="text-right shrink-0">
                    <div className="text-lg font-bold text-white">{project.budget}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{project.paymentType}</div>
                </div>
            </div>

            <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-2">
                {project.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-sm text-slate-400">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <span className="text-lg">⏱️</span> {project.duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="text-lg">📝</span> {project.proposals} propuestas
                    </span>
                </div>
                <span>{project.postedAt}</span>
            </div>
        </div>
    );
}
