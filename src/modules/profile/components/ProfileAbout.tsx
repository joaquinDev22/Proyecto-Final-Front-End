interface ProfileAboutProps {
    title?: string;
    description: string;
}

export default function ProfileAbout({ title = "Acerca de mí", description }: ProfileAboutProps) {
    return (
        <div className="glass p-8 rounded-3xl border-t border-white/10 mb-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
            
            <h2 className="text-xl font-bold text-white mb-4 relative z-10">{title}</h2>
            <p className="text-slate-300 leading-relaxed relative z-10 whitespace-pre-wrap">
                {description}
            </p>
        </div>
    );
}
