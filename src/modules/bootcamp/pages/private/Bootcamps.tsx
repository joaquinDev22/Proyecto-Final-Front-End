import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../../core/components/ui/Button";
import Badge from "../../../../core/components/ui/Badge";
import { bootcampService } from "../../../../core/api/bootcampService";
import type { Bootcamp } from "../../../../core/types/models";

export default function Bootcamps() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [myBootcamps, setMyBootcamps] = useState<any[]>([]);
    const [availableBootcamps, setAvailableBootcamps] = useState<Bootcamp[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBootcamps = async () => {
            try {
                // Fetch de la API
                const bootcamps = await bootcampService.getAll();
                setAvailableBootcamps(bootcamps);
                
                try {
                    const myEnrolled = await bootcampService.getMyEnrollments();
                    // Agregar propiedad progress para UI
                    const myEnrolledWithProgress = myEnrolled.map((b: any) => ({
                        ...b,
                        progress: Math.floor(Math.random() * 100), // mock progress
                        nextClass: "Mañana a las 18:00hs" // mock next class
                    }));
                    setMyBootcamps(myEnrolledWithProgress);
                } catch (e) {
                    console.error("Error al obtener mis inscripciones (puede que el usuario no sea empleado/freelancer)", e);
                    setMyBootcamps([]);
                }
            } catch (error) {
                console.error("Error fetching bootcamps:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBootcamps();
    }, []);

    const handleNavigateToDetail = (id: string | number) => {
        navigate(`${location.pathname}/${id}`);
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-center mt-20">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">Mis Bootcamps</h1>
                <p className="text-slate-400">Continúa tu aprendizaje y mejora tus habilidades.</p>
            </div>

            {/* Enrolled Bootcamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {myBootcamps.length > 0 ? (
                    myBootcamps.map((bootcamp) => (
                        <div key={bootcamp.id} className="glass p-6 rounded-3xl border-t border-cyan-500/30 flex gap-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-colors"></div>

                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {bootcamp.logo ? (
                                    <span className="text-4xl">{bootcamp.logo}</span>
                                ) : (
                                    <span className="text-3xl">⚛️</span>
                                )}
                            </div>

                            <div className="flex-1 z-10 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-white mb-1">{bootcamp.title}</h3>
                                <p className="text-slate-400 text-sm mb-4">Instructor: {bootcamp.provider}</p>

                                <div className="flex items-center gap-4 mb-2 text-sm">
                                    <span className="text-cyan-400 font-bold">{bootcamp.progress}%</span>
                                    <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                                        <div className="bg-cyan-400 h-full drop-shadow-[0_0_5px_rgba(34,211,238,0.6)]" style={{ width: `${bootcamp.progress}%` }}></div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 font-medium mb-3">Siguiente clase: {bootcamp.nextClass}</p>
                                <Button size="sm" variant="primary" className="w-fit" onClick={() => navigate(`${location.pathname}/${bootcamp.id}/aula`)}>Ir al Aula</Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="md:col-span-2 text-center py-12 glass rounded-2xl border-dashed border-white/20">
                        <p className="text-slate-400 mb-4">Aún no estás inscrito en ningún bootcamp.</p>
                        <Button className="bg-cyan-600 hover:bg-cyan-500 text-white border-0 px-6 py-2 rounded-[8px]" onClick={() => {}}>
                            Explorar Bootcamps
                        </Button>
                    </div>
                )}
            </div>

            {/* Available Bootcamps */}
            <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Descubrir Bootcamps</h2>
                    <p className="text-slate-400 text-sm">Aprende nuevas tecnologías para acceder a mejores proyectos.</p>
                </div>
                <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300">Ver catálogo completo →</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableBootcamps.length > 0 ? (
                    availableBootcamps.map((bootcamp) => (
                        <div key={bootcamp.id} className="glass rounded-2xl border border-purple-500/20 flex flex-col group hover:border-purple-500/50 transition-all overflow-hidden">

                            {/* Image Header */}
                            <div className="h-40 w-full bg-slate-800 relative">
                                {bootcamp.logo ? (
                                    <div className="w-full h-full flex items-center justify-center text-6xl">{bootcamp.logo}</div>
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                                )}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                    <div className="px-3 py-1 bg-black/50 backdrop-blur-md text-purple-400 rounded-lg border border-purple-500/30 text-sm font-bold">
                                        {bootcamp.price}
                                    </div>
                                    <span className="text-xs font-medium text-white bg-black/50 backdrop-blur-md border border-white/20 px-2 py-1 rounded-md">{bootcamp.level}</span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{bootcamp.title}</h3>
                                <p className="text-slate-400 text-sm mb-4">Por {bootcamp.provider} • {bootcamp.duration}</p>

                                <div className="flex gap-2 mb-6 mt-auto">
                                    {bootcamp.tags?.map((tag: string, idx: number) => (
                                        <Badge key={idx} variant="info" className="bg-white/5 text-slate-300 border-white/10">{tag}</Badge>
                                    ))}
                                </div>

                                <Button 
                                    className="w-full py-3 font-bold border-0 rounded-[5px] bg-purple-600 hover:bg-purple-500 text-md"
                                    onClick={() => handleNavigateToDetail(bootcamp.id)}
                                >
                                    Ver Temario e Inscribirme
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="md:col-span-3 text-center py-12 glass rounded-2xl border-dashed border-white/20">
                        <p className="text-slate-400">No hay bootcamps disponibles en este momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
}