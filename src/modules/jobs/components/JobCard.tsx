import { useNavigate } from 'react-router-dom';
import GlassCard from '../../../core/components/ui/GlassCard';
import Badge from '../../../core/components/ui/Badge';
import Button from '../../../core/components/ui/Button';

export interface Job {
    id: string | number;
    title: string;
    company: string;
    location: string;
    type: string; // Full-time, Part-time, etc.
    salary?: string;
    postedAt: string;
    description: string;
    tags: string[];
    logoUrl?: string;
}

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const navigate = useNavigate();

    return (
        <GlassCard padding="p-6 md:p-8" rounded="rounded-2xl" hoverEffect className="flex flex-col md:flex-row gap-6 transition-all duration-300">
            {/* Logo */}
            <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                {job.logoUrl ? (
                    <img src={job.logoUrl} alt={job.company} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-2xl font-bold text-slate-400">{job.company.charAt(0)}</span>
                )}
            </div>

            {/* Info */}
            <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => navigate(`/postulante/vacantes/${job.id}`)}>
                            {job.title}
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">
                            <span className="font-medium text-slate-300">{job.company}</span> • {job.location}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="success">{job.type}</Badge>
                        <span className="text-sm text-slate-500">{job.postedAt}</span>
                    </div>
                </div>

                <p className="text-slate-300 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary">{tag}</Badge>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {job.salary && (
                            <span className="font-bold text-white bg-dark-bg/50 px-3 py-1 rounded-lg border border-white/5 text-sm">
                                {job.salary}
                            </span>
                        )}
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => navigate(`/postulante/vacantes/${job.id}`)}
                        >
                            Ver Detalles
                        </Button>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
