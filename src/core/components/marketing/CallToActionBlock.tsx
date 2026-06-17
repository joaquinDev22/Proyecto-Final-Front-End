import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface CallToActionBlockProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    gradientFrom?: string;
    gradientTo?: string;
}

export default function CallToActionBlock({ 
    title, 
    description, 
    buttonText, 
    buttonLink,
    gradientFrom = "from-cyan-500/20",
    gradientTo = "to-blue-500/20"
}: CallToActionBlockProps) {
    const navigate = useNavigate();

    return (
        <div className="w-full glass p-12 rounded-3xl text-center relative overflow-hidden flex flex-col items-center justify-center border-t border-white/10">
            <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} mix-blend-overlay`}></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">{title}</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto relative z-10">
                {description}
            </p>
            <Button
                className="bg-white text-[#0b1121] hover:bg-slate-200 px-8 py-3 rounded-xl text-lg font-bold relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                onClick={() => navigate(buttonLink)}
            >
                {buttonText}
            </Button>
        </div>
    );
}
