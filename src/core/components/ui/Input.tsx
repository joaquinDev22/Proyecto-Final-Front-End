type InputProps = {
    label?: string,
    type: string,
    placeholder?: string,
    name?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string
};

export default function Input({label, type, placeholder, name, value, onChange, className = ""}: InputProps) {
    return(
        <div className={`flex flex-col w-full mb-4 ${className}`}>
            {label && <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">{label}</label>}
            <input 
                id={name} 
                name={name} 
                type={type} 
                placeholder={placeholder} 
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 transition-all" 
                value={value} 
                onChange={onChange}
            />
        </div>
    )
}