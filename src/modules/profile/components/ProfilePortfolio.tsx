import { useState, useRef } from "react";
import { Image, X } from "lucide-react";
import Button from "../../../core/components/ui/Button";
import { profileService, type Proyecto } from "../../../core/api/profileService";

interface ProfilePortfolioProps {
    items: Proyecto[];
    onRefreshProfile?: () => void;
}

export default function ProfilePortfolio({ items, onRefreshProfile }: ProfilePortfolioProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [link, setLink] = useState("");
    const [imagen, setImagen] = useState<File | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleAdd = async () => {
        if (!nombre || !descripcion) {
            alert("Nombre y descripción son obligatorios.");
            return;
        }
        try {
            await profileService.addProyecto(nombre, descripcion, link, imagen || undefined);
            setIsAdding(false);
            setNombre("");
            setDescripcion("");
            setLink("");
            setImagen(null);
            if (onRefreshProfile) onRefreshProfile();
        } catch (error) {
            console.error(error);
            alert("Error al agregar el proyecto. Es posible que hayas alcanzado el límite de 5 proyectos.");
        }
    };

    const handleRemove = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("¿Seguro que deseas eliminar este proyecto?")) return;
        try {
            await profileService.removeProyecto(id);
            if (onRefreshProfile) onRefreshProfile();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el proyecto.");
        }
    };

    const handleItemClick = (item: Proyecto) => {
        if (item.link) {
            window.open(item.link, '_blank');
        }
    };

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-xl font-bold text-white">Portafolio ({items.length}/5)</h2>
                {items.length < 5 && !isAdding && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 text-xs"
                        onClick={() => setIsAdding(true)}
                    >
                        + Agregar Proyecto
                    </Button>
                )}
            </div>

            {isAdding && (
                <div className="glass p-6 rounded-3xl border border-cyan-500/30 mb-6">
                    <h3 className="text-lg font-bold text-white mb-4">Nuevo Proyecto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-xs text-slate-400 block mb-1">Nombre</label>
                            <input type="text" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white" value={nombre} onChange={e => setNombre(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1">Enlace (Opcional)</label>
                            <input type="text" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white" value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1">Descripción</label>
                            <textarea className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white" rows={2} value={descripcion} onChange={e => setDescripcion(e.target.value)}></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1">Imagen (Opcional)</label>
                            <input type="file" className="hidden" ref={imageInputRef} accept="image/*" onChange={e => setImagen(e.target.files ? e.target.files[0] : null)} />
                            <div className="flex items-center gap-4">
                                <Button variant="outline" type="button" onClick={() => imageInputRef.current?.click()}>
                                    Seleccionar Imagen
                                </Button>
                                {imagen && <span className="text-sm text-cyan-400">{imagen.name}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAdding(false)}>Cancelar</Button>
                        <Button onClick={handleAdd}>Guardar Proyecto</Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} onClick={() => handleItemClick(item)} className="group relative rounded-2xl overflow-hidden glass aspect-video cursor-pointer border border-white/5 hover:border-cyan-500/50 transition-all">
                            {item.imagen ? (
                                <img src={`data:image/jpeg;base64,${item.imagen}`} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center">
                                    <Image className="w-10 h-10 text-slate-400 opacity-50 group-hover:scale-110 transition-transform" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h3 className="text-white font-bold truncate">{item.nombre}</h3>
                                <p className="text-slate-300 text-xs truncate">{item.descripcion}</p>
                            </div>
                            <button onClick={(e) => handleRemove(item.id, e)} className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all">
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full glass p-8 rounded-3xl border-dashed border-white/20 text-center">
                        <p className="text-slate-400">Aún no has agregado trabajos a tu portafolio.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
