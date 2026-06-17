import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "lucide-react";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";
import Input from "../../../../../core/components/ui/Input";

export default function PostulacionesPorVacante() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // TODO: Define proper types centrally
    const [postulantes, setPostulantes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPostulante, setSelectedPostulante] = useState<number | null>(null);

    // Estado del Modal de Entrevista
    const [interviewData, setInterviewData] = useState({ date: "", time: "", link: "" });

    useEffect(() => {
        // TODO: Fetch data from backend API using `id`
        const fetchPostulantes = async () => {
            try {
                // const response = await fetch(`/api/recruiter/vacantes/${id}/postulantes`);
                // const data = await response.json();
                setPostulantes([]);
            } catch (error) {
                console.error("Error fetching postulantes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostulantes();
    }, [id]);

    const handleReject = (postId: number) => {
        setPostulantes(postulantes.map(p => p.id === postId ? { ...p, status: "Rechazado" } : p));
    };

    const handleScheduleInterview = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPostulante !== null) {
            setPostulantes(postulantes.map(p => p.id === selectedPostulante ? { ...p, status: "Entrevista Agendada" } : p));
            setSelectedPostulante(null);
            setInterviewData({ date: "", time: "", link: "" });
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <button 
                onClick={() => navigate('/recruiter/dashboard')}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver a Mis Vacantes
            </button>

            <PageHeader 
                title="Postulaciones Recibidas" 
                subtitle={`Candidatos para la vacante #${id} - Revisa perfiles y agenda entrevistas.`}
            />

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : postulantes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                    {postulantes.map(p => (
                        <GlassCard key={p.id} padding="p-6" borderColor={
                            p.status === 'Entrevista Agendada' ? 'emerald' : 
                            p.status === 'Rechazado' ? 'none' : 'cyan'
                        } className={p.status === 'Rechazado' ? 'opacity-60 grayscale' : ''}>
                            
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    p.status === 'Entrevista Agendada' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                    p.status === 'Rechazado' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                    'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                }`}>
                                    {p.status}
                                </span>
                                <User className="w-6 h-6 text-slate-400" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                            <p className="text-slate-400 text-sm mb-4">{p.role} • Exp: {p.experience}</p>
                            
                            <div className="flex items-center gap-2 bg-dark-bg/50 p-3 rounded-lg border border-white/5 mb-6">
                                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2" style={{ width: p.match }}></div>
                                </div>
                                <span className="text-xs font-bold text-white">{p.match} Match</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="text-sm py-2 col-span-2" onClick={() => navigate(`/perfil/${p.id}`)}>
                                    Ver Perfil Completo
                                </Button>
                                
                                {p.status === 'Pendiente' && (
                                    <>
                                        <Button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-sm py-2 border-0 rounded-[8px]" onClick={() => handleReject(p.id)}>
                                            Rechazar
                                        </Button>
                                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm py-2 border-0 rounded-[8px]" onClick={() => setSelectedPostulante(p.id)}>
                                            Aceptar
                                        </Button>
                                    </>
                                )}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            ) : (
                <div className="glass p-12 text-center rounded-3xl mt-8">
                    <p className="text-slate-400 text-lg">No hay postulaciones recibidas aún.</p>
                </div>
            )}

            {/* Modal para Agendar Entrevista */}
            {selectedPostulante !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="w-full max-w-md">
                        <GlassCard borderColor="emerald" padding="p-8" className="shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">Agendar Entrevista</h2>
                                <button onClick={() => setSelectedPostulante(null)} className="text-slate-400 hover:text-white text-xl">✕</button>
                            </div>
                            <p className="text-slate-400 text-sm mb-6">
                                Has aceptado a este candidato. Define los detalles de la reunión virtual para que se le notifique.
                            </p>
                            
                            <form onSubmit={handleScheduleInterview} className="flex flex-col gap-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-slate-300 font-bold block mb-2 text-xs">Fecha</label>
                                        <Input 
                                            type="date" 
                                            required 
                                            className="w-full bg-dark-bg/80 text-sm border-0 p-2 rounded-[8px]" 
                                            value={interviewData.date}
                                            onChange={(e) => setInterviewData({...interviewData, date: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-slate-300 font-bold block mb-2 text-xs">Hora</label>
                                        <Input 
                                            type="time" 
                                            required 
                                            className="w-full bg-dark-bg/80 text-sm border-0 p-2 rounded-[8px]"
                                            value={interviewData.time}
                                            onChange={(e) => setInterviewData({...interviewData, time: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-slate-300 font-bold block mb-2 text-xs">Link de Reunión (Meet/Zoom)</label>
                                    <Input 
                                        type="url" 
                                        placeholder="https://meet.google.com/..." 
                                        required 
                                        className="w-full bg-dark-bg/80 text-sm border-0 p-2 rounded-[8px]"
                                        value={interviewData.link}
                                        onChange={(e) => setInterviewData({...interviewData, link: e.target.value})}
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 mt-2 border-0 p-2 rounded-[8px]">
                                    Confirmar Entrevista
                                </Button>
                            </form>
                        </GlassCard>
                    </div>
                </div>
            )}
        </div>
    );
}
