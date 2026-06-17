import Badge from "../../../core/components/ui/Badge";
import Button from "../../../core/components/ui/Button";

interface ProfileSkillsProps {
    skills: string[];
}

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
    return (
        <div className="glass p-8 rounded-3xl border-t border-purple-500/20 mb-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Habilidades Técnicas</h2>
                <Button variant="outline" size="sm" className="border-white/10 text-xs">
                    Editar
                </Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                    skills.map((skill, idx) => (
                        <Badge key={idx} variant="info" className="px-3 py-1.5 text-sm">
                            {skill}
                        </Badge>
                    ))
                ) : (
                    <p className="text-slate-500 text-sm italic">Aún no has agregado habilidades.</p>
                )}
            </div>
        </div>
    );
}
