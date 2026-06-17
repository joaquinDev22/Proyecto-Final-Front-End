interface GlowProps {
    color: 'cyan' | 'purple' | 'blue';
    size?: 'sm' | 'md' | 'lg' | 'hero';
    position?: string;
    className?: string;
}

export default function Glow({ color, size = 'md', position = "top-0 right-0", className = "" }: GlowProps) {
    const colors = {
        cyan: "bg-cyan-500/10",
        purple: "bg-purple-500/10",
        blue: "bg-blue-500/10"
    };

    const sizes = {
        sm: "w-32 h-32 blur-[50px]", 
        md: "w-64 h-64 blur-[80px]", 
        lg: "w-[600px] h-[600px] blur-[150px]", 
        hero: "w-[800px] h-[500px] blur-[120px]"
    };

    return (
        <div className={`absolute ${position} ${sizes[size]} ${colors[color]} rounded-full pointer-events-none ${className}`}></div>
    );
}
