import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import Badge from "../../../core/components/ui/Badge";
import Button from "../../../core/components/ui/Button";
import Select from "../../../core/components/ui/Select";
import { profileService, type Habilidad } from "../../../core/api/profileService";

interface ProfileSkillsProps {
    skills: Habilidad[];
    onRefreshProfile?: () => void;
}

const NIVEL_MAP: Record<number, string> = {
    1: "Básico",
    2: "Intermedio",
    3: "Avanzado",
    4: "Experto"
};

export default function ProfileSkills({ skills, onRefreshProfile }: ProfileSkillsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [allSkills, setAllSkills] = useState<Habilidad[]>([]);

    // Add form state
    const [selectedSkill, setSelectedSkill] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("1");
    const [customSkillName, setCustomSkillName] = useState("");

    useEffect(() => {
        if (isEditing) {
            profileService.getTodasHabilidades().then(setAllSkills).catch(console.error);
        }
    }, [isEditing]);

    const handleAdd = async () => {
        const nameToUse = selectedSkill === "custom" ? customSkillName : selectedSkill;
        if (!nameToUse) return;

        try {
            await profileService.addHabilidad(nameToUse, parseInt(selectedLevel));
            setSelectedSkill("");
            setCustomSkillName("");
            if (onRefreshProfile) onRefreshProfile();
        } catch (error) {
            console.error(error);
            alert("Error al agregar habilidad");
        }
    };

    const handleRemove = async (id: number) => {
        try {
            await profileService.removeHabilidad(id);
            if (onRefreshProfile) onRefreshProfile();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar habilidad");
        }
    };

    return (
        <div className={`glass p-8 rounded-3xl border-t border-purple-500/20 mb-6 relative ${isEditing ? 'z-50' : 'z-10'}`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Habilidades Técnicas</h2>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 text-xs"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? "Cerrar Edición" : "Editar"}
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {skills.length > 0 ? (
                    skills.map((skill, idx) => (
                        <Badge key={idx} variant="info" className="px-3 py-1.5 text-sm flex items-center gap-2">
                            {skill.nombre} <span className="opacity-70 text-xs">({NIVEL_MAP[skill.nivel]})</span>
                            {isEditing && (
                                <button onClick={() => handleRemove(skill.habilidadId)} className="hover:text-red-400">
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </Badge>
                    ))
                ) : (
                    <p className="text-slate-500 text-sm italic">Aún no has agregado habilidades.</p>
                )}
            </div>

            {isEditing && (
                <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <h3 className="text-sm font-semibold text-cyan-400 mb-3">Agregar Nueva Habilidad</h3>
                    <div className="flex flex-col md:flex-row gap-3 items-end">
                        <div className="flex-1 w-full">
                            <label className="text-xs text-slate-400 mb-1 block">Habilidad</label>
                            {selectedSkill === "custom" ? (
                                <input
                                    type="text"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-500/50"
                                    placeholder="Nombre de habilidad..."
                                    value={customSkillName}
                                    onChange={e => setCustomSkillName(e.target.value)}
                                />
                            ) : (
                                <Select
                                    options={[
                                        { label: "Seleccionar existente...", value: "" },
                                        ...allSkills.map(s => ({ label: s.nombre, value: s.nombre })),
                                        { label: "+ Otra (Escribir nueva)", value: "custom" }
                                    ]}
                                    value={selectedSkill}
                                    onChange={setSelectedSkill}
                                />
                            )}
                        </div>

                        <div className="w-full md:w-48">
                            <label className="text-xs text-slate-400 mb-1 block">Nivel</label>
                            <Select
                                options={[
                                    { label: "Básico", value: "1" },
                                    { label: "Intermedio", value: "2" },
                                    { label: "Avanzado", value: "3" },
                                    { label: "Experto", value: "4" }
                                ]}
                                value={selectedLevel}
                                onChange={setSelectedLevel}
                            />
                        </div>

                        <Button onClick={handleAdd} disabled={!selectedSkill && !customSkillName} className="w-full md:w-auto h-[42px]">
                            <Plus className="w-4 h-4 mr-2" /> Agregar
                        </Button>
                    </div>
                    {selectedSkill === "custom" && (
                        <button onClick={() => setSelectedSkill("")} className="text-xs text-slate-400 mt-2 underline">
                            Volver a lista
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
