import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../core/context/AuthContext";
import { profileService, type UserProfile } from "../../../core/api/profileService";

// Profile Components
import ProfileHeader from "../components/ProfileHeader";
import ProfileAbout from "../components/ProfileAbout";
import ProfileSkills from "../components/ProfileSkills";
import ProfilePortfolio from "../components/ProfilePortfolio";
import ProfileResume from "../components/ProfileResume";
import ProfileReviews from "../components/ProfileReviews";
import ProfileCompanyInfo from "../components/ProfileCompanyInfo";

export default function ProfilePage() {
    const { user } = useAuth();

    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await profileService.getProfile();
            setProfileData(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleUploadFoto = async (file: File) => {
        try {
            await profileService.uploadFoto(file);
            await fetchProfile(); // recargar
        } catch (error) {
            console.error("Error al subir foto", error);
            alert("Hubo un error al subir la foto.");
        }
    };

    const handleUploadBanner = async (file: File) => {
        try {
            await profileService.uploadBanner(file);
            await fetchProfile(); // recargar
        } catch (error) {
            console.error("Error al subir banner", error);
            alert("Hubo un error al subir el banner.");
        }
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-5xl mx-auto px-6 py-10 flex justify-center mt-20">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="w-full max-w-5xl mx-auto px-6 py-10">
                <div className="glass p-12 text-center rounded-3xl mt-8">
                    <p className="text-slate-400 text-lg">No se pudo cargar el perfil.</p>
                </div>
            </div>
        );
    }

    const getTitleByRole = (rol: string) => {
        switch (rol) {
            case 'FREELANCER':
            case 'EMPLOYEE': return "Freelancer";
            case 'ENTERPRISE':
            case 'EMPRESA': return "Empresa";
            case 'CLIENTE': return "Cliente";
            case 'INSTRUCTOR': return "Instructor";
            case 'POSTULANTE': return "Postulante";
            case 'RECRUITER': return "Reclutador";
            default: return "Perfil";
        }
    };
    const title = getTitleByRole(profileData.rol || "");

    const nameToDisplay = profileData.nombre ? `${profileData.nombre} ${profileData.apellido || ''}` : "Usuario";

    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-10 animate-fade-in-up">

            {/* Header: Siempre visible para todos */}
            <ProfileHeader
                name={nameToDisplay}
                title={title}
                location={profileData.ubicacion || profileData.pais || ""}
                avatarUrl={profileData.fotoPerfil}
                bannerUrl={profileData.bannerPerfil}
                onUploadFoto={handleUploadFoto}
                onUploadBanner={handleUploadBanner}
            />

            <div className="flex justify-end mt-4">
                <button
                    onClick={() => window.location.href = '/onboarding'}
                    className="px-6 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-full font-semibold hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
                >
                    Editar Perfil Completo
                </button>
            </div>

            <div className="flex flex-col gap-2 mt-6">

                {/* ---------------- FREELANCER ---------------- */}
                {(user?.rol === 'FREELANCER' || user?.rol === 'EMPLOYEE') && (
                    <>
                        <ProfileAbout description={profileData.descripcion || "Sin descripción."} />
                        <ProfileSkills
                            skills={profileData.habilidades || []}
                            onRefreshProfile={fetchProfile}
                        />
                        <ProfilePortfolio
                            items={profileData.proyectos || []}
                            onRefreshProfile={fetchProfile}
                        />
                        <ProfileReviews averageRating={0} totalReviews={0} reviews={[]} />
                    </>
                )}

                {/* ---------------- CLIENTE ---------------- */}
                {user?.rol === 'CLIENTE' && (
                    <>
                        <ProfileAbout description={profileData.descripcion || "Buscando el mejor talento tecnológico."} />
                    </>
                )}

                {/* ---------------- ENTERPRISE (EMPRESA) ---------------- */}
                {(user?.rol === 'ENTERPRISE' || user?.rol === 'EMPRESA') && (
                    <>
                        <ProfileCompanyInfo
                            website={profileData.sitioWeb || "No especificado"}
                            employeeCount={"No especificado"}
                        />
                        <ProfileAbout title="Sobre la Empresa" description={profileData.descripcion || "Sin descripción."} />
                    </>
                )}

                {/* ---------------- POSTULANTE (JOBSEEKER) ---------------- */}
                {user?.rol === 'POSTULANTE' && (
                    <>
                        <ProfileAbout description={profileData.descripcion || "Sin descripción."} />
                        <ProfileResume lastUpdated="Recientemente" resumeUrl={"#"} />
                        <ProfileSkills
                            skills={profileData.habilidades || []}
                            onRefreshProfile={fetchProfile}
                        />
                        <ProfilePortfolio
                            items={profileData.proyectos || []}
                            onRefreshProfile={fetchProfile}
                        />
                    </>
                )}

                {/* ---------------- INSTRUCTOR ---------------- */}
                {user?.rol === 'INSTRUCTOR' && (
                    <>
                        <ProfileAbout description={profileData.descripcion || "Sin descripción."} />
                        <ProfileSkills
                            skills={profileData.habilidades || []}
                            onRefreshProfile={fetchProfile}
                        />
                        <ProfileReviews averageRating={0} totalReviews={0} reviews={[]} />
                    </>
                )}

                {/* ---------------- RECRUITER ---------------- */}
                {user?.rol === 'RECRUITER' && (
                    <>
                        <ProfileCompanyInfo />
                        <ProfileAbout title="Acerca del Recruiter" description={profileData.descripcion || "Sin descripción."} />
                    </>
                )}

            </div>
        </div>
    );
}
