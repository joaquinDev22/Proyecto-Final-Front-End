import { useState, useEffect } from "react";
import { useAuth } from "../../../core/context/AuthContext";

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
    
    // TODO: Define proper types centrally
    const [profileData, setProfileData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch profile data from backend API
        const fetchProfile = async () => {
            try {
                // const response = await fetch('/api/profile/me');
                // const data = await response.json();
                // setProfileData(data);
                
                // Fallback for empty state while integrating
                setProfileData({
                    name: user ? `${user.nombre} ${user.apellido}` : "Usuario",
                    title: user?.rol === 'FREELANCER' ? "Freelancer" :
                        user?.rol === 'ENTERPRISE' ? "Empresa" : "Perfil",
                    location: "Ubicación no especificada",
                    about: "Sin descripción.",
                    skills: [],
                    portfolio: [],
                    reviews: []
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

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

    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-10 animate-fade-in-up">

            {/* Header: Siempre visible para todos */}
            <ProfileHeader
                name={profileData.name}
                title={profileData.title}
                location={profileData.location}
            />

            <div className="flex flex-col gap-2 mt-6">

                {/* ---------------- FREELANCER ---------------- */}
                {user?.rol === 'FREELANCER' && (
                    <>
                        <ProfileAbout description={profileData.about} />
                        <ProfileSkills skills={profileData.skills} />
                        <ProfilePortfolio items={profileData.portfolio} />
                        <ProfileReviews averageRating={0} totalReviews={0} reviews={profileData.reviews} />
                    </>
                )}

                {/* ---------------- CLIENTE ---------------- */}
                {user?.rol === 'CLIENTE' && (
                    <>
                        <ProfileAbout description={profileData.about || "Buscando el mejor talento tecnológico."} />
                    </>
                )}

                {/* ---------------- ENTERPRISE (EMPRESA) ---------------- */}
                {user?.rol === 'ENTERPRISE' && (
                    <>
                        <ProfileCompanyInfo
                            website={profileData.website || "https://www.mi-empresa.com"}
                            employeeCount={profileData.employeeCount || "No especificado"}
                        />
                        <ProfileAbout title="Sobre la Empresa" description={profileData.about} />
                    </>
                )}

                {/* ---------------- POSTULANTE (JOBSEEKER) ---------------- */}
                {user?.rol === 'POSTULANTE' && (
                    <>
                        <ProfileAbout description={profileData.about} />
                        <ProfileResume lastUpdated="Recientemente" resumeUrl={profileData.resumeUrl || "#"} />
                        <ProfileSkills skills={profileData.skills} />
                    </>
                )}

                {/* ---------------- INSTRUCTOR ---------------- */}
                {user?.rol === 'INSTRUCTOR' && (
                    <>
                        <ProfileAbout description={profileData.about} />
                        <ProfileSkills skills={profileData.skills} />
                        <ProfileReviews averageRating={0} totalReviews={0} reviews={profileData.reviews} />
                    </>
                )}

                {/* ---------------- RECRUITER ---------------- */}
                {user?.rol === 'RECRUITER' && (
                    <>
                        <ProfileCompanyInfo />
                        <ProfileAbout title="Acerca del Recruiter" description={profileData.about} />
                    </>
                )}

            </div>
        </div>
    );
}
