import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    borderColor?: 'white' | 'cyan' | 'purple' | 'blue' | 'emerald' | 'yellow' | 'none';
    hoverEffect?: boolean;
    padding?: string;
    rounded?: string;
}

export default function GlassCard({ 
    children, 
    className = "", 
    borderColor = "white", 
    hoverEffect = false,
    padding = "p-8",
    rounded = "rounded-3xl"
}: GlassCardProps) {
    const borders = {
        white: "border-t border-white/10",
        cyan: "border-t border-cyan-500/30",
        purple: "border-t border-purple-500/30",
        blue: "border-t border-blue-500/30",
        emerald: "border-t border-emerald-500/30",
        yellow: "border-t border-yellow-500/30",
        none: ""
    };

    const hoverClass = hoverEffect ? "hover:bg-white/[0.03] transition-colors" : "";

    return (
        <div className={`glass ${padding} ${rounded} ${borders[borderColor]} ${hoverClass} ${className}`}>
            {children}
        </div>
    );
}
