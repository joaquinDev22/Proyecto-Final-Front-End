import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import PageHeader from "../../../../../core/components/ui/PageHeader";
import GlassCard from "../../../../../core/components/ui/GlassCard";
import Button from "../../../../../core/components/ui/Button";
import Input from "../../../../../core/components/ui/Input";
import useShowAlert from "../../../../../core/hooks/useShowAlert";
import Alert from "../../../../../core/components/ui/Alert";

export default function GestionRecruiters() {
    // TODO: Define proper types centrally
    const [recruiters, setRecruiters] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const { isRendered, showAlert, triggerAlert } = useShowAlert();

    useEffect(() => {
        // TODO: Fetch data from backend API
        const fetchRecruiters = async () => {
            try {
                // const response = await fetch('/api/empresa/recruiters');
                // const data = await response.json();
                setRecruiters([]);
            } catch (error) {
                console.error("Error fetching recruiters:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecruiters();
    }, []);

    const handleAddRecruiter = (e: React.FormEvent) => {
        e.preventDefault();
        triggerAlert(() => {
            setShowModal(false);
            // Simular que se añadió (en la vida real se llamaría al backend)
        });
    };

    const handleRemove = () => {
        if (confirmDeleteId !== null) {
            setRecruiters(recruiters.filter(r => r.id !== confirmDeleteId));
            setConfirmDeleteId(null);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <PageHeader
                    title="Gestión de Recruiters"
                    subtitle="Administra los perfiles y permisos de tu equipo de selección IT."
                />
                <Button
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    onClick={() => setShowModal(true)}
                >
                    + Añadir Recruiter
                </Button>
            </div>

            <Alert message="¡Recruiter añadido exitosamente! Se le ha enviado un correo con sus accesos." type="success" isVisible={showAlert} />

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : recruiters.length > 0 ? (
                <GlassCard padding="p-0" className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/10">
                                    <th className="p-5 text-sm font-medium text-slate-400">Nombre</th>
                                    <th className="p-5 text-sm font-medium text-slate-400">Email Corporativo</th>
                                    <th className="p-5 text-sm font-medium text-slate-400">Fecha de Alta</th>
                                    <th className="p-5 text-sm font-medium text-slate-400">Estado</th>
                                    <th className="p-5 text-sm font-medium text-slate-400 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recruiters.map(r => (
                                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/30">
                                                    {r.name.charAt(0)}
                                                </div>
                                                <span className="font-bold text-white">{r.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-slate-300 text-sm">{r.email}</td>
                                        <td className="p-5 text-slate-400 text-sm">{r.joined}</td>
                                        <td className="p-5">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.status === 'Activo' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="p-5 text-right">
                                            <button
                                                onClick={() => setConfirmDeleteId(r.id)}
                                                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                                            >
                                                Dar de Baja
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            ) : (
                <div className="glass p-12 text-center rounded-3xl mt-8">
                    <p className="text-slate-400 text-lg">No hay recruiters registrados en tu equipo.</p>
                </div>
            )}

            {/* Modal para añadir Recruiter */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="w-full max-w-md">
                        <GlassCard borderColor="cyan" padding="p-8" className="shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">Alta de Recruiter</h2>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-xl">✕</button>
                            </div>

                            <form onSubmit={handleAddRecruiter} className="flex flex-col gap-5">
                                <div>
                                    <label className="text-slate-300 font-bold block mb-2 text-sm">Nombre Completo</label>
                                    <Input placeholder="Ej: Ana Torres" required />
                                </div>
                                <div>
                                    <label className="text-slate-300 font-bold block mb-2 text-sm">Email Corporativo</label>
                                    <Input placeholder="ana.t@empresa.com" type="email" required />
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                                    <Button variant="outline" type="button" onClick={() => setShowModal(false)}>Cancelar</Button>
                                    <Button type="submit" className="bg-cyan-600 border-0 rounded-[8px] p-3 hover:bg-cyan-500 text-white font-bold">Enviar Invitación</Button>
                                </div>
                            </form>
                        </GlassCard>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación de Baja */}
            {confirmDeleteId !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="w-full max-w-sm">
                        <GlassCard borderColor="none" padding="p-8" className="shadow-2xl border border-red-500/30">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-4">
                                    <AlertTriangle className="w-8 h-8" />
                                </div>
                                <h2 className="text-xl font-bold text-white mb-2">¿Dar de baja?</h2>
                                <p className="text-slate-400 text-sm mb-6">
                                    Esta acción removerá al recruiter de la empresa y revocará sus accesos. Esta acción no se puede deshacer.
                                </p>
                                <div className="flex gap-3 w-full">
                                    <Button variant="outline" className="flex-1" onClick={() => setConfirmDeleteId(null)}>Cancelar</Button>
                                    <Button className="bg-red-600 border-0 rounded-[8px] p-3 hover:bg-red-500 text-white font-bold flex-1" onClick={handleRemove}>Eliminar</Button>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            )}
        </div>
    );
}
