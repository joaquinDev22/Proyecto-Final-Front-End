import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'info';
  className?: string;
};

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const variants = {
    primary: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    secondary: "bg-slate-500/10 text-slate-300 border border-slate-500/20",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20",
    outline: "bg-transparent text-slate-300 border border-slate-600",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/20"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
