import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Link } from "lucide-react";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";

export default function EntrevistasAgendadas() {
    const navigate = useNavigate();
    
    // TODO: Define proper types centrally
    const [entrevistas, setEntrevistas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch data from backend API
        // Simulating API call
        const fetchEntrevistas = async () => {
            try {
                // const response = await fetch('/api/recruiter/entrevistas');
                // const data = await response.json();
                setEntrevistas([]);
            } catch (error) {
                console.error("Error fetching entrevistas:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntrevistas();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <PageHeader 
                title="Entrevistas Agendadas" 
                subtitle="Revisa tus próximas reuniones con candidatos aceptados."
            />

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : entrevistas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {entrevistas.map(entrevista => (
                        <GlassCard key={entrevista.id} padding="p-6" borderColor="emerald">
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    Próxima Entrevista
                                </span>
                                <Calendar className="w-6 h-6 text-slate-400" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{entrevista.name}</h3>
                            <p className="text-slate-400 text-sm mb-4">Para: <span className="text-cyan-400">{entrevista.vacancy}</span></p>
                            
                            <div className="flex flex-col gap-3 bg-dark-bg/50 p-4 rounded-lg border border-white/5 mb-6">
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <span className="w-6 flex justify-center"><Calendar className="w-4 h-4 text-slate-400" /></span>
                                    <span>{entrevista.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <span className="w-6 flex justify-center"><Clock className="w-4 h-4 text-slate-400" /></span>
                                    <span>{entrevista.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <span className="w-6 flex justify-center"><Link className="w-4 h-4 text-slate-400" /></span>
                                    <a href={entrevista.link} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline truncate">
                                        {entrevista.link}
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="text-sm py-2 p-2 rounded-[8px]" onClick={() => navigate(`/perfil/${entrevista.id}`)}>
                                    Ver Perfil
                                </Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm py-2 border-0 p-2 rounded-[8px]" onClick={() => window.open(entrevista.link, '_blank')}>
                                    Entrar a Reunión
                                </Button>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            ) : (
                <div className="glass p-12 text-center rounded-3xl mt-8">
                    <p className="text-slate-400 text-lg">No hay entrevistas agendadas.</p>
                </div>
            )}
        </div>
    );
}
