import { FileText } from "lucide-react";
import Button from "../../../core/components/ui/Button";

interface ProfileResumeProps {
    resumeUrl?: string;
    lastUpdated?: string;
}

export default function ProfileResume({ resumeUrl, lastUpdated }: ProfileResumeProps) {
    return (
        <div className="glass p-8 rounded-3xl border-t border-cyan-500/20 mb-6 relative">
            <h2 className="text-xl font-bold text-white mb-4">Currículum Vitae (CV)</h2>

            {resumeUrl ? (
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white font-medium">Mi_CV_2026.pdf</p>
                            <p className="text-sm text-slate-400">Actualizado: {lastUpdated}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none border-white/10 hover:bg-white/5 text-sm">
                            Actualizar
                        </Button>
                        <Button className="flex-1 md:flex-none bg-cyan-600 hover:bg-cyan-500 text-sm">
                            Descargar
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 bg-white/5 border border-dashed border-white/20 rounded-2xl">
                    <div className="flex justify-center mb-4">
                        <FileText className="w-12 h-12 text-slate-500 opacity-50" />
                    </div>
                    <p className="text-slate-400 mb-4">No has subido tu CV todavía.</p>
                    <Button className="bg-cyan-600 hover:bg-cyan-500 text-sm">
                        Subir Documento (PDF)
                    </Button>
                </div>
            )}
        </div>
    );
}
