import React from 'react';

type CardProps = {
    title: string;
    description?: string;
    src?: string;
    icon?: string;
    imgClassName?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
};

export default function Card({ title, description, imgClassName, src, icon, onClick, children, className = '' }: CardProps) {
    // If it's used as the old "option card" in Signup
    if ((src || icon) && description) {
        const imgContainerClass = imgClassName === "option-card-image-principal" 
            ? "flex justify-center items-center h-32 mb-4" 
            : "flex justify-center items-center h-28 mb-4";
        
        const imgClass = imgClassName === "option-card-image-principal" 
            ? "w-auto h-full object-contain drop-shadow-2xl" 
            : "w-auto h-full object-contain rounded-full border border-cyan-500/50 p-1 bg-dark-bg";

        return (
            <div 
                className="group w-full h-[370px] relative rounded-2xl glass p-6 transition-all duration-300 cursor-pointer m-[10px] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:border-cyan-400/50 flex flex-col justify-between" 
                onClick={() => onClick?.()}
            >
                <div className={imgContainerClass}>
                    {icon ? (
                        <div className="w-24 h-24 bg-dark-bg/50 rounded-full flex items-center justify-center text-5xl border border-white/5 drop-shadow-2xl">
                            {icon}
                        </div>
                    ) : (
                        <img src={src} alt="card-image" className={imgClass} />
                    )}
                </div>
                <div className="rounded-xl text-center p-4 bg-dark-bg/50 border border-white/5 group-hover:bg-dark-bg/80 transition-colors flex-1 flex flex-col items-center justify-start">
                    <h2 className="text-white font-bold mb-2 text-lg group-hover:text-cyan-400 transition-colors">{title}</h2>
                    <p className="text-slate-400 text-center m-0 text-xs w-full leading-relaxed overflow-hidden">{description}</p>
                </div>
            </div>
        );
    }

    // Generic modern card
    return (
        <div className={`glass rounded-xl p-6 ${onClick ? 'cursor-pointer glass-hover' : ''} ${className}`} onClick={onClick}>
            {title && <h3 className="text-xl font-bold text-white mb-2">{title}</h3>}
            {description && <p className="text-slate-400 mb-4 text-sm">{description}</p>}
            {children}
        </div>
    );
}