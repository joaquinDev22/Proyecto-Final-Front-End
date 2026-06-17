interface PageHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
    return (
        <div className={`mb-8 animate-fade-in-up ${className}`}>
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            {subtitle && <p className="text-slate-400">{subtitle}</p>}
        </div>
    );
}
