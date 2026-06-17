import { Image } from "lucide-react";
import Button from "../../../core/components/ui/Button";

interface PortfolioItem {
    id: number;
    title: string;
    imageUrl?: string;
    link?: string;
}

interface ProfilePortfolioProps {
    items: PortfolioItem[];
}

export default function ProfilePortfolio({ items }: ProfilePortfolioProps) {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-xl font-bold text-white">Portafolio</h2>
                <Button variant="outline" size="sm" className="border-white/10 text-xs">
                    + Agregar Proyecto
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} className="group relative rounded-2xl overflow-hidden glass aspect-video cursor-pointer border border-white/5 hover:border-cyan-500/50 transition-all">
                            {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center">
                                    <Image className="w-10 h-10 text-slate-400 opacity-50 group-hover:scale-110 transition-transform" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <h3 className="text-white font-bold truncate">{item.title}</h3>
                            </div>
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
