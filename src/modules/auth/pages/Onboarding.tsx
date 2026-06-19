import { useState } from "react";
import { useAuth } from "../../../core/context/AuthContext";
import { profileService, type UserProfile } from "../../../core/api/profileService";
import Input from "../../../core/components/ui/Input";
import Button from "../../../core/components/ui/Button";
import Alert from "../../../core/components/ui/Alert";
import useShowAlert from "../../../core/hooks/useShowAlert";

export default function Onboarding() {
    const { user } = useAuth();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();
    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState<Partial<UserProfile>>({
        nombre: user?.nombre || "",
        apellido: user?.apellido || "",
        telefono: user?.telefono || "",
        pais: user?.pais || "",
        fechaNacimiento: user?.fechaNacimiento || "",
        descripcion: user?.descripcion || "",
        ubicacion: user?.ubicacion || "",
        sitioWeb: user?.sitioWeb || "",
        logo: user?.logo || ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            await profileService.updateProfile(formData);
            triggerAlert(() => {
                // Forzar recarga completa para actualizar el contexto y redirigir al perfil
                window.location.href = '/profile';
            });
        } catch (error: any) {
            setErrorMsg(error.response?.data?.message || "Error al guardar el perfil. Intenta de nuevo.");
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-white">Cargando usuario...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-60px)] flex items-center justify-center flex-col p-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            <div className="w-full max-w-xl h-fit glass rounded-3xl border-t border-white/10 p-8 sm:p-12 flex flex-col items-center shadow-2xl relative z-10">
                <h1 className="text-white font-bold text-3xl mb-2 text-center">Completa tu perfil</h1>
                <p className="text-slate-400 mb-8 text-center">Ayúdanos a conocerte mejor para personalizar tu experiencia.</p>

                {errorMsg && <Alert message={errorMsg} type="error" isVisible={true} />}

                {isRendered && (
                    <div className="w-full mb-4">
                        <Alert message="¡Perfil actualizado con éxito! Redirigiendo..." type="success" isVisible={showAlert} />
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    {/* Subida de foto de perfil */}
                    <div className="flex flex-col items-center justify-center mb-6">
                        <label className="w-24 h-24 rounded-full border-2 border-dashed border-cyan-500/50 flex items-center justify-center bg-cyan-500/10 mb-3 overflow-hidden cursor-pointer hover:bg-cyan-500/20 transition-colors relative group">
                            {formData.logo ? (
                                <img src={formData.logo} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <span className="text-cyan-400 text-xs text-center px-2 group-hover:hidden">Subir Foto</span>
                                    <span className="text-white text-2xl hidden group-hover:block">+</span>
                                </>
                            )}
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData(prev => ({ ...prev, logo: reader.result as string }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }} 
                            />
                        </label>
                        <p className="text-slate-400 text-xs">(Opcional)</p>
                    </div>

                    {/* Campos comunes para individuos */}
                    {(user.rol === 'EMPLOYEE' || user.rol === 'FREELANCER' || user.rol === 'CLIENTE' || user.rol === 'POSTULANTE' || user.rol === 'INSTRUCTOR') && (
                        <>
                            <Input placeholder="Nombre" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                            <Input placeholder="Apellido" type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                        </>
                    )}

                    {/* Campos extra para Cliente o Freelancer */}
                    {(user.rol === 'CLIENTE' || user.rol === 'FREELANCER' || user.rol === 'EMPLOYEE' || user.rol === 'POSTULANTE') && (
                        <>
                            <Input placeholder="Ubicación (País/Ciudad)" type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
                            <Input placeholder="Teléfono" type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
                        </>
                    )}

                    {/* Fecha de nacimiento para Freelancer / Postulante */}
                    {(user.rol === 'FREELANCER' || user.rol === 'EMPLOYEE' || user.rol === 'POSTULANTE') && (
                        <div className="w-full">
                            <label className="text-slate-300 font-bold block mb-2 text-[0.7rem] uppercase tracking-wider">Fecha de nacimiento</label>
                            <Input placeholder="YYYY-MM-DD" type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                        </div>
                    )}

                    {/* Campos para Empresas / Recrutadores */}
                    {(user.rol === 'EMPRESA' || user.rol === 'ENTERPRISE' || user.rol === 'RECRUITER') && (
                        <>
                            <Input placeholder="Nombre de la Empresa" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                            <Input placeholder="Ubicación" type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
                            <Input placeholder="Sitio Web" type="url" name="sitioWeb" value={formData.sitioWeb} onChange={handleChange} />
                            <div className="w-full">
                                <label className="text-slate-300 font-bold block mb-2 text-[0.7rem] uppercase tracking-wider">Descripción</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-[8px] p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="Describe a tu empresa..."
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    rows={4}
                                />
                            </div>
                        </>
                    )}

                    <Button containerName="mt-6" label="Finalizar" variant="primary" className="w-full text-lg py-3" type="submit" />
                </form>
            </div>
        </div>
    );
}
