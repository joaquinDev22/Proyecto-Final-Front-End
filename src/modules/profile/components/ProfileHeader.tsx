import { MapPin, User, Upload } from "lucide-react";
import { useRef } from "react";
import Button from "../../../core/components/ui/Button";

interface ProfileHeaderProps {
    name: string;
    title: string;
    location: string;
    avatarUrl?: string;
    bannerUrl?: string;
    onUploadFoto?: (file: File) => void;
    onUploadBanner?: (file: File) => void;
}

export default function ProfileHeader({ name, title, location, avatarUrl, bannerUrl, onUploadFoto, onUploadBanner }: ProfileHeaderProps) {
    const fotoInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && onUploadFoto) {
            onUploadFoto(e.target.files[0]);
        }
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && onUploadBanner) {
            onUploadBanner(e.target.files[0]);
        }
    };

    return (
        <div className="glass rounded-3xl overflow-hidden mb-8 border-t border-white/10 relative">
            {/* Banner */}
            <div className="h-48 w-full bg-gradient-to-r from-cyan-900/40 to-purple-900/40 relative">
                {bannerUrl && <img src={`data:image/jpeg;base64,${bannerUrl}`} alt="Banner" className="w-full h-full object-cover opacity-50" />}
                <div className="absolute top-4 right-4">
                    <input type="file" className="hidden" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" />
                    <Button 
                        variant="outline" 
                        className="bg-black/40 border-0 p-2 rounded-[8px] border-white/20 backdrop-blur-md text-sm px-4 flex items-center gap-2"
                        onClick={() => bannerInputRef.current?.click()}
                    >
                        <Upload className="w-4 h-4" /> Editar Banner
                    </Button>
                </div>
            </div>

            {/* Profile Info Row */}
            <div className="px-8 pb-8 pt-5 relative flex flex-col md:flex-row gap-6 md:items-end -mt-16 md:-mt-12">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full border-4 border-[#0b1121] bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden flex-shrink-0 z-10 bg-[#0b1121] relative group">
                    {avatarUrl ? (
                        <img src={`data:image/jpeg;base64,${avatarUrl}`} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-12 h-12 text-slate-400" />
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 mt-4 md:mt-0 pt-2 md:pt-0">
                    <h1 className="text-3xl font-bold text-white mb-1">{name}</h1>
                    <p className="text-cyan-400 font-medium mb-1">{title}</p>
                    <p className="text-slate-400 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {location || "Ubicación no especificada"}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 md:mt-0">
                    <input type="file" className="hidden" ref={fotoInputRef} onChange={handleFotoChange} accept="image/*" />
                    <Button 
                        variant="outline" 
                        className="bg-black/40 border border-white/20 p-2 rounded-[8px] text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                        onClick={() => fotoInputRef.current?.click()}
                    >
                        <Upload className="w-4 h-4" /> Editar Foto
                    </Button>
                </div>
            </div>
        </div>
    );
}
