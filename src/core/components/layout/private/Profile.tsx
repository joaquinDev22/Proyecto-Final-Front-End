import { useState, useEffect, useRef } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { profileService, type UserProfile } from "../../../api/profileService";

export default function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Partial<UserProfile>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await profileService.getProfile();
            setProfile(data);
            setEditData(data);
        } catch (error) {
            console.error("Error loading profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const updated = await profileService.updateProfile(editData);
            setProfile(updated);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Error al actualizar el perfil.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        if (file.type !== "application/pdf") {
            alert("Por favor, sube un archivo PDF.");
            return;
        }

        try {
            setLoading(true);
            await profileService.uploadCV(file);
            alert("CV subido exitosamente.");
        } catch (error) {
            console.error("Error uploading CV", error);
            alert("Hubo un error al subir el CV.");
        } finally {
            setLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    if (loading && !profile) {
        return <div className="flex justify-center items-center h-full pt-20"><p className="text-cyan-400">Cargando perfil...</p></div>;
    }

    if (!profile) {
        return <div className="flex justify-center items-center h-full pt-20"><p className="text-red-400">No se pudo cargar el perfil.</p></div>;
    }

    const isFreelance = profile.rol === "EMPLOYEE" || profile.rol === "CLIENTE";
    const displayName = isFreelance 
        ? `${profile.nombre || ""} ${profile.apellido || ""}`.trim() || profile.email
        : profile.nombre || profile.email;
        
    const initials = (profile.nombre?.charAt(0) || "") + (profile.apellido?.charAt(0) || "");

    return (
        <div className="flex-1 flex flex-col pt-10 pb-20 px-6 w-full max-w-7xl mx-auto relative">
            {/* Modal de Edición */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
                    <div className="bg-dark-bg border border-white/10 p-8 rounded-2xl w-full max-w-lg shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Editar Perfil</h2>
                        <div className="space-y-4">
                            <Input 
                                label="Nombre"
                                type="text"
                                value={editData.nombre || ""}
                                onChange={(e) => setEditData({...editData, nombre: e.target.value})}
                            />
                            {isFreelance && (
                                <Input 
                                    label="Apellido"
                                    type="text"
                                    value={editData.apellido || ""}
                                    onChange={(e) => setEditData({...editData, apellido: e.target.value})}
                                />
                            )}
                            <Input 
                                label="Email"
                                type="email"
                                value={editData.email || ""}
                                onChange={(e) => setEditData({...editData, email: e.target.value})}
                            />
                            {profile.rol === "EMPLOYEE" && (
                                <Input 
                                    label="Fecha de Nacimiento (YYYY-MM-DD)"
                                    type="date"
                                    value={editData.fechaNacimiento || ""}
                                    onChange={(e) => setEditData({...editData, fechaNacimiento: e.target.value})}
                                />
                            )}
                            {(profile.rol === "CLIENTE" || profile.rol === "EMPRESA") && (
                                <Input 
                                    label="Teléfono"
                                    type="tel"
                                    value={editData.telefono || ""}
                                    onChange={(e) => setEditData({...editData, telefono: e.target.value})}
                                />
                            )}
                            {profile.rol === "EMPRESA" && (
                                <>
                                    <Input 
                                        label="Descripción"
                                        type="text"
                                        value={editData.descripcion || ""}
                                        onChange={(e) => setEditData({...editData, descripcion: e.target.value})}
                                    />
                                    <Input 
                                        label="Ubicación"
                                        type="text"
                                        value={editData.ubicacion || ""}
                                        onChange={(e) => setEditData({...editData, ubicacion: e.target.value})}
                                    />
                                    <Input 
                                        label="Sitio Web"
                                        type="url"
                                        value={editData.sitioWeb || ""}
                                        onChange={(e) => setEditData({...editData, sitioWeb: e.target.value})}
                                    />
                                </>
                            )}
                        </div>
                        <div className="flex gap-4 mt-8 justify-end">
                            <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancelar</Button>
                            <Button variant="primary" onClick={handleSave} disabled={loading}>Guardar Cambios</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1">
                        <div className="w-full h-full bg-dark-bg rounded-full flex items-center justify-center text-3xl font-bold">
                            {initials || "U"}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">
                            {displayName}
                        </h1>
                        <p className="text-slate-400 font-medium">
                            {profile.rol}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setIsEditing(true)}>Editar Perfil</Button>
                    {profile.rol === "EMPLOYEE" && (
                        <>
                            <input 
                                type="file" 
                                accept="application/pdf" 
                                className="hidden" 
                                ref={fileInputRef} 
                                onChange={handleFileUpload} 
                            />
                            <Button variant="primary" onClick={() => fileInputRef.current?.click()} disabled={loading}>
                                Subir CV
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Left Column (span 2) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="glass rounded-2xl p-6">
                            <p className="text-slate-400 text-sm font-medium mb-2">Vistas de Perfil</p>
                            <h3 className="text-3xl font-bold text-white">0</h3>
                            <p className="text-emerald-400 text-xs mt-2 font-medium">Nuevo en la plataforma</p>
                        </div>
                        <div className="glass rounded-2xl p-6">
                            <p className="text-slate-400 text-sm font-medium mb-2">
                                {isFreelance ? "Propuestas" : "Publicaciones"}
                            </p>
                            <h3 className="text-3xl font-bold text-white">0</h3>
                            <p className="text-slate-500 text-xs mt-2 font-medium">Activas</p>
                        </div>
                        <div className="glass rounded-2xl p-6">
                            <p className="text-slate-400 text-sm font-medium mb-2">Valoración</p>
                            <h3 className="text-3xl font-bold text-white">N/A</h3>
                            <p className="text-emerald-400 text-xs mt-2 font-medium">Sin reseñas aún</p>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="glass rounded-2xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Acerca de</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                            {profile.descripcion || "Aún no has agregado una descripción a tu perfil. Haz clic en 'Editar Perfil' para comenzar."}
                        </p>
                    </div>
                </div>

                {/* Sidebar - Right Column */}
                <div className="space-y-8">
                    {/* Details */}
                    <div className="glass rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6">Detalles</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">Email de Contacto</p>
                                <p className="text-white font-medium">{profile.email}</p>
                            </div>
                            {profile.telefono && (
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Teléfono</p>
                                    <p className="text-white font-medium">{profile.telefono}</p>
                                </div>
                            )}
                            {profile.ubicacion && (
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Ubicación</p>
                                    <p className="text-white font-medium">{profile.ubicacion}</p>
                                </div>
                            )}
                            {profile.sitioWeb && (
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Sitio Web</p>
                                    <a href={profile.sitioWeb} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline font-medium">
                                        {profile.sitioWeb}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Completion Card */}
                    <div className="glass rounded-2xl p-8 bg-gradient-to-br from-cyan-900/40 to-dark-surface border-cyan-500/20">
                        <h2 className="text-xl font-bold text-white mb-2">Completitud del Perfil</h2>
                        <div className="flex justify-between text-sm mb-2 mt-4">
                            <span className="text-cyan-400 font-medium">50% Completo</span>
                            <span className="text-slate-400">50% restante</span>
                        </div>
                        <div className="w-full bg-dark-bg rounded-full h-2 mb-6 overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                        <Button variant="outline" className="w-full text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10" onClick={() => setIsEditing(true)}>
                            Completar Perfil
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}