import { useParams, useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import PageHeader from '../../../../../core/components/ui/PageHeader';
import GlassCard from '../../../../../core/components/ui/GlassCard';
import Button from '../../../../../core/components/ui/Button';
import Input from '../../../../../core/components/ui/Input';
import useShowAlert from '../../../../../core/hooks/useShowAlert';
import Alert from '../../../../../core/components/ui/Alert';

export default function RealizarPostulacion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would upload the CV and cover letter to backend
        triggerAlert(() => {
            navigate('/postulante/postulaciones');
        });
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-6 py-8 animate-fade-in-up">
            <button
                onClick={() => navigate(`/postulante/vacantes/${id}`)}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 mb-6 transition-colors"
            >
                ← Cancelar Postulación
            </button>

            <PageHeader
                title="Completar Postulación"
                subtitle="Estás a un paso de postularte a Senior Full Stack Engineer en TechGlobal Inc."
            />

            {!isRendered && (
                <GlassCard padding="p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Curriculum Vitae (CV)</label>
                            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-colors bg-white/5 cursor-pointer flex flex-col items-center">
                                <FileText className="w-10 h-10 text-slate-400 mb-3" />
                                <p className="text-white font-medium mb-1">Haz clic para subir un nuevo CV o arrástralo aquí</p>
                                <p className="text-slate-400 text-xs">Se usará tu CV guardado en el perfil por defecto. (PDF, DOCX max 5MB)</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Carta de Presentación (Opcional)</label>
                            <textarea
                                rows={5}
                                placeholder="Escribe un mensaje breve destacando por qué eres el candidato ideal..."
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 resize-none transition-all"
                            ></textarea>
                        </div>

                        <div>
                            <label className="text-slate-300 font-bold block mb-2 text-sm">Disponibilidad para comenzar</label>
                            <Input placeholder="Ej: Inmediata, 2 semanas, 1 mes..." type="text" />
                        </div>

                        <div className="border-t border-white/10 pt-6 mt-2 flex justify-end">
                            <Button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-3 rounded-xl">
                                Enviar Postulación
                            </Button>
                        </div>
                    </form>
                </GlassCard>
            )}

            {isRendered && (
                <Alert message="¡Postulación enviada exitosamente!" type="success" isVisible={showAlert} />
            )}
        </div>
    );
}