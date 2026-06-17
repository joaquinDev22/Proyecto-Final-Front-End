import React from 'react';

interface HeroSectionProps {
    badgeText: string;
    badgeColor: 'cyan' | 'purple' | 'blue';
    titlePlain: string;
    titleGradient: string;
    description: string;
    children?: React.ReactNode; // For buttons
}

export default function HeroSection({ badgeText, badgeColor, titlePlain, titleGradient, description, children }: HeroSectionProps) {
    const badgeBg = {
        cyan: "bg-cyan-400",
        purple: "bg-purple-400",
        blue: "bg-blue-400"
    };

    const badgeTextColors = {
        cyan: "text-cyan-400",
        purple: "text-purple-400",
        blue: "text-blue-400"
    };

    const titleGradients = {
        cyan: "from-cyan-400 to-blue-400",
        purple: "from-purple-400 to-cyan-400",
        blue: "from-blue-400 to-cyan-400"
    };

    return (
        <div className="text-center mx-auto mb-20 w-full max-w-5xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                <span className={`flex h-2 w-2 rounded-full ${badgeBg[badgeColor]}`}></span>
                <span className={`text-sm font-medium ${badgeTextColors[badgeColor]}`}>{badgeText}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
                {titlePlain} <br className="hidden md:block" />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${titleGradients[badgeColor]}`}>{titleGradient}</span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12">
                {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                {children}
            </div>
        </div>
    );
}
