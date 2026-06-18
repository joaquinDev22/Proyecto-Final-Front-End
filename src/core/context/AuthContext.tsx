import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "../api/authService";
import { profileService, type UserProfile } from "../api/profileService";

interface AuthContextType {
    isAuthenticated: boolean;
    user: UserProfile | null;
    loading: boolean;
    login: (credentials: any) => Promise<any>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Cargar perfil si ya hay token al iniciar la app
    useEffect(() => {
        const fetchProfile = async () => {
            if (authService.isAuthenticated()) {
                try {
                    const profile = await profileService.getProfile();
                    setUser(profile);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error cargando el perfil", error);
                    // Si falla el token podría estar vencido
                    authService.logout();
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const login = async (credentials: any) => {
        // 1. Loguearse y guardar token
        await authService.login(credentials);
        setIsAuthenticated(true);

        // 2. Obtener y guardar el perfil (con el rol)
        try {
            const profile = await profileService.getProfile();
            setUser(profile);
            return profile;
        } catch (error) {
            console.error("Error cargando perfil tras login", error);
            return null;
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
