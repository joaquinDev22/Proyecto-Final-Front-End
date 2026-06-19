import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    imageSrc?: string;
    imageClassName?: string;
    imageAlt?: string;
    label?: string;
    containerName?: string;
};

export default function Button({
    variant = 'primary',
    size = 'md',
    className = '',
    imageSrc,
    imageClassName,
    imageAlt = '',
    label,
    containerName,
    onClick,
    children,
    type = "button",
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-cyan-500 text-white hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]",
        secondary: "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700",
        outline: "bg-transparent text-cyan-400 border border-cyan-500",
        ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    };

    const sizes = {
        sm: "text-sm p-2",
        md: "text-sm p-2",
        lg: "text-base p-2"
    };

    const safeClassName = className || '';
    const hasCustomBg = safeClassName.includes('bg-');
    const buttonClasses = hasCustomBg ? safeClassName : `${baseStyles} ${variants[variant]} ${sizes[size]} ${safeClassName}`;

    const buttonContent = (
        <button type={type} className={buttonClasses} onClick={onClick} {...props}>
            {label || children}
            {imageSrc && <img className={imageClassName || "ml-2 w-5 h-5"} src={imageSrc} alt={imageAlt}/>}
        </button>
    );

    if (containerName) {
        return <div className={containerName}>{buttonContent}</div>;
    }

    return buttonContent;
}