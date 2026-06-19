import { useState } from 'react';

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    name?: string;
}

export default function PasswordInput({ 
    value, 
    onChange, 
    placeholder = "••••••••", 
    required = false, 
    className = "",
    name
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input 
                type={showPassword ? "text" : "password"} 
                name={name}
                placeholder={placeholder} 
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full bg-dark-bg/50 border border-white/10 rounded-[8px] p-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 pr-12 transition-all ${className}`}
            />
            <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium hover:text-white transition-colors"
            >
                {showPassword ? "Ocultar" : "Mostrar"}
            </button>
        </div>
    );
}
