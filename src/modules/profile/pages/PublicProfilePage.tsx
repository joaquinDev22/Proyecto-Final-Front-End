import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Code, MapPin, Building, Globe, Users, Briefcase } from "lucide-react";
import GlassCard from "../../../core/components/ui/GlassCard";
import Button from "../../../core/components/ui/Button";

export default function PublicProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // TODO: Define proper types centrally
    const [perfil, setPerfil] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // En la vida real, harías un fetch usando el "id" para traer el perfil real.
        const fetchPerfil = async () => {
            try {
                // const response = await fetch(`/api/perfiles/${id}`);
                // const data = await response.json();
                // setPerfil(data);
                
                // Simulating empty state
                setPerfil(null);
            } catch (error) {
                console.error("Error fetching perfil:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPerfil();
    }, [id]);

    if (isLoading) {
        return (
            <div className="w-full max-w-5xl mx-auto px-6 py-8 flex justify-center mt-20">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!perfil) {
        return (
            <div className="w-full max-w-5xl mx-auto px-6 py-8 animate-fade-in-up">
                <button
                    onClick={() => navigate(-1)}
                    className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
                >
                    ← Volver Atrás
                </button>
                <div className="glass p-12 text-center rounded-3xl mt-8">
                    <p className="text-slate-400 text-lg">Perfil no encontrado.</p>
                </div>
            </div>
        );
    }

    const isEnterprise = perfil.rol === 'ENTERPRISE' || perfil.rol === 'EMPRESA';

    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-8 animate-fade-in-up">
            <button
                onClick={() => navigate(-1)}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Volver Atrás
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Columna Izquierda - Info Principal */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <GlassCard padding="p-8" className="text-center flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-cyan-900 flex justify-center items-center mb-4 border-4 border-cyan-500/30">
                            {isEnterprise ? <Building className="w-12 h-12 text-cyan-300" /> : <Code className="w-12 h-12 text-cyan-300" />}
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">{perfil.nombre}</h1>
                        <p className="text-cyan-400 font-medium mb-3">{perfil.rol}</p>
                        <p className="text-slate-400 text-sm mb-6 flex items-center justify-center gap-2">
                            <MapPin className="w-4 h-4" /> {perfil.ubicacion || 'Ubicación no especificada'}
                        </p>
                        <Button className="w-full bg-cyan-600 hover:bg-cyan-500 border-0 p-2 rounded-[8px]" onClick={() => window.open('https://linkedin.com', '_blank')}>
                            Contactar (LinkedIn)
                        </Button>
                    </GlassCard>

                    {isEnterprise && (
                        <GlassCard padding="p-6">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Datos de la Empresa</h3>
                            <div className="flex flex-col gap-4 text-slate-300 text-sm">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-cyan-400" />
                                    <span>{perfil.sitioWeb || 'No especificado'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="w-4 h-4 text-cyan-400" />
                                    <span>{perfil.tamano || 'No especificado'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-4 h-4 text-cyan-400" />
                                    <span>{perfil.sector || 'No especificado'}</span>
                                </div>
                            </div>
                        </GlassCard>
                    )}

                    {!isEnterprise && perfil.skills && (
                        <GlassCard padding="p-6">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Habilidades</h3>
                            <div className="flex flex-wrap gap-2">
                                {perfil.skills.map((skill: string, index: number) => (
                                    <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </GlassCard>
                    )}
                </div>

                {/* Columna Derecha - Detalles */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <GlassCard padding="p-8">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Acerca de</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {perfil.acercaDe || 'No hay información disponible.'}
                        </p>
                    </GlassCard>

                    {!isEnterprise && perfil.experiencia && perfil.experiencia.length > 0 && (
                        <GlassCard padding="p-8">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Experiencia Laboral</h3>
                            <div className="flex flex-col gap-6">
                                {perfil.experiencia.map((exp: any, index: number) => (
                                    <div key={index} className="relative pl-6 border-l border-cyan-500/30">
                                        <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-[6.5px] top-1"></div>
                                        <h4 className="font-bold text-white">{exp.puesto}</h4>
                                        <p className="text-cyan-400 text-sm">{exp.empresa}</p>
                                        <p className="text-slate-500 text-xs mt-1">{exp.periodo}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    )}

                    {!isEnterprise && perfil.educacion && perfil.educacion.length > 0 && (
                        <GlassCard padding="p-8">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Educación</h3>
                            <div className="flex flex-col gap-6">
                                {perfil.educacion.map((edu: any, index: number) => (
                                    <div key={index} className="relative pl-6 border-l border-purple-500/30">
                                        <div className="absolute w-3 h-3 bg-purple-400 rounded-full -left-[6.5px] top-1"></div>
                                        <h4 className="font-bold text-white">{edu.titulo}</h4>
                                        <p className="text-purple-400 text-sm">{edu.institucion}</p>
                                        <p className="text-slate-500 text-xs mt-1">{edu.periodo}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    )}

                    {!isEnterprise && perfil.resenas && perfil.resenas.length > 0 && (
                        <GlassCard padding="p-8">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Reseñas</h3>
                            <div className="flex flex-col gap-6">
                                {perfil.resenas.map((resena: any, index: number) => (
                                    <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-white">{resena.titulo}</h4>
                                            <span className="text-yellow-400 text-sm">{'⭐'.repeat(resena.rating)}</span>
                                        </div>
                                        <p className="text-slate-400 text-sm mb-2">{resena.comentario}</p>
                                        <p className="text-slate-500 text-xs">Por {resena.cliente} • Proyecto: {resena.proyecto}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    )}
                </div>
            </div>
        </div>
    );
}
