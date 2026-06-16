import { useState, useRef, useEffect } from 'react';
import Button from './Button';

interface Option {
    label: string | number;
    value: string | number;
}

interface SelectProps {
    value?: string | number;
    onChange?: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
}

export default function Select({ value, onChange, options, placeholder, className}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value.toString() === value?.toString());

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string | number) => {
        if (onChange) {
            onChange(optionValue.toString());
        }
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Select Trigger */}
            <Button
                type="button"
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-left text-white outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all flex items-center justify-between shadow-sm hover:border-white/20 h-[42px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selectedOption ? "text-white" : "text-slate-400"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                
                {/* Custom Arrow */}
                <svg 
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </Button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-[#0d1424] border border-purple-500/50 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                        {options.map((option) => (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                                        ${value?.toString() === option.value.toString() 
                                            ? 'bg-purple-500/10 text-purple-400 font-medium' 
                                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
