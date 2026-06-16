import Badge from '../../../core/components/ui/Badge';
import { type Job } from '../../../core/data/mockData';

type JobCardProps = {
    job: Job;
    onClick?: () => void;
};

export default function JobCard({ job, onClick }: JobCardProps) {
    return (
        <div 
            className="glass glass-hover p-6 rounded-2xl cursor-pointer flex flex-col sm:flex-row gap-5 items-start group"
            onClick={onClick}
        >
            <div className="w-14 h-14 bg-dark-bg rounded-xl flex items-center justify-center text-3xl border border-white/5 shrink-0 shadow-inner">
                {job.logo}
            </div>
            
            <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                    <div>
                        <h3 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                        <p className="text-slate-400 text-sm font-medium">{job.company} • {job.location}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">{job.postedAt}</Badge>
                </div>
                
                <p className="text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {job.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={job.type === 'Full-time' ? 'success' : 'secondary'}>{job.type}</Badge>
                    <Badge variant="primary">{job.locationType}</Badge>
                    
                    {job.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                            {tag}
                        </span>
                    ))}
                    
                    <span className="text-sm font-semibold text-white ml-auto bg-dark-bg/50 px-3 py-1 rounded-lg border border-white/5">
                        {job.salary}
                    </span>
                </div>
            </div>
        </div>
    );
}
