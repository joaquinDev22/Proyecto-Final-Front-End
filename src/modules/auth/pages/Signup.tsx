import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "../../../core/components/ui/Select";
import Input from "../../../core/components/ui/Input";
import Button from "../../../core/components/ui/Button";
import Alert from "../../../core/components/ui/Alert";
import useShowAlert from "../../../core/hooks/useShowAlert";
import { authService } from "../../../core/api/authService";

export default function Signup(){
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Map URL role params to valid backend roles
    const getRoleFromParam = (param: string | null) => {
        if (!param) return 'FREELANCER';
        const p = param.toUpperCase();
        if (p === 'JOB_SEEKER') return 'POSTULANTE';
        if (p === 'ENTERPRISE') return 'EMPRESA';
        if (p === 'CLIENT') return 'CLIENTE';
        return p; // INSTRUCTOR or FREELANCER
    };
    const role = getRoleFromParam(searchParams.get('role'));

    const [formData, setFormData] = useState({
        usuario: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMsg, setErrorMsg] = useState("");
    const { isRendered, showAlert, triggerAlert } = useShowAlert();

    const handleRoleChange = (newRole: string) => {
        setSearchParams({ role: newRole });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!formData.usuario || !formData.email || !formData.password || !formData.confirmPassword) {
            setErrorMsg("Todos los campos son requeridos.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("Las contraseñas no coinciden.");
            return;
        }

        try {
            await authService.register({
                usuario: formData.usuario,
                email: formData.email,
                password: formData.password,
                rol: role
            });
            
            // Mostrar alerta de éxito y redirigir
            triggerAlert(() => navigate('/login'));
        } catch (error: any) {
            setErrorMsg(error.response?.data?.message || "Error al crear la cuenta. Intenta de nuevo.");
        }
    };

    const roleOptions = [
        { label: 'Quiero trabajar (Freelancer)', value: 'FREELANCER' },
        { label: 'Quiero contratar (Cliente)', value: 'CLIENTE' },
        { label: 'Soy Empresa / Reclutador', value: 'EMPRESA' },
        { label: 'Busco empleo fijo (Postulante)', value: 'POSTULANTE' },
        { label: 'Quiero enseñar (Instructor)', value: 'INSTRUCTOR' }
    ];

    return (
        <div className="min-h-[calc(100vh-60px)] flex items-center justify-center flex-col p-8 relative">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            
            <div className="w-full max-w-xl h-fit glass rounded-3xl border-t border-white/10 p-8 sm:p-12 flex flex-col items-center shadow-2xl relative z-10">
                <img src="/logo/logo_principal.png" alt="WorkLink Logo" className="h-16 w-auto object-contain mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
                
                <h1 className="text-white font-bold text-3xl mb-2 text-center">Crea tu cuenta</h1>
                <p className="text-slate-400 mb-8 text-center">Únete a la red de talento más grande</p>

                {errorMsg && <Alert message={errorMsg} type="error" isVisible={true} />}
                
                {isRendered && (
                    <div className="w-full mb-4">
                        <Alert message="¡Cuenta creada exitosamente! Redirigiendo..." type="success" isVisible={showAlert} />
                    </div>
                )}

                <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
                    <div className="w-full mb-4">
                        <label className="block text-sm font-medium text-slate-300 mb-2">¿Cómo quieres usar WorkLink?</label>
                        <Select 
                            value={role}
                            onChange={handleRoleChange}
                            options={roleOptions}
                            className="w-full"
                        />
                    </div>

                    <Input placeholder="Nombre de usuario" type="text" name="usuario" value={formData.usuario} onChange={handleChange} />
                    <Input placeholder="Correo electrónico" type="email" name="email" value={formData.email} onChange={handleChange} />
                    <Input placeholder="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} />
                    <Input placeholder="Confirmar contraseña" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />

                    <Button containerName="mt-6" label="Registrar cuenta" variant="primary" className="w-full text-lg py-3" type="submit" />
                </form>

                <div className="mt-8 text-center flex flex-col gap-3">
                    <p className="text-slate-400 text-sm">
                        ¿Ya tienes una cuenta? <button onClick={() => navigate('/login')} className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">Inicia Sesión</button>
                    </p>
                    <button 
                        onClick={() => navigate('/home')}
                        className="text-slate-500 hover:text-white transition-colors text-sm underline underline-offset-4"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>  
    );
}     