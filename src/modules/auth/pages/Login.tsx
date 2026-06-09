import { useState } from "react";
import { useShowPassword } from "../hooks/useShowPassword";
import { useNavigate } from "react-router-dom";
import Input from "../../../core/components/ui/Input";
import Checkbox from "../../../core/components/ui/Checkbox";
import Button from "../../../core/components/ui/Button";
import { useAuth } from "../../../core/context/AuthContext";

export default function Login(){
    const {showPassword, setShowPassword} = useShowPassword();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

const handleLogin = async () => {
        try {
            // Usamos la función 'login' de tu AuthContext que ya hace la magia
            await login({ 
                usuario: user, // El backend espera 'usuario', pero tu estado se llama 'user'
                password: password 
            });
            
            alert("¡Login exitoso!");
            navigate('/home'); // O la ruta principal a la que quieras ir
        } catch (error) {
            console.error("Error iniciando sesión:", error);
            alert("Usuario o contraseña incorrectos");
        }
    };

    return(
        <div className="min-h-[calc(100vh-60px)] flex items-center justify-center flex-col p-8">
            <div className="w-[80%] max-w-[1200px] h-[50%] mt-0">
                <div className="flex w-full flex-col p-6 rounded-2xl bg-[#a7f9ff96] shadow-[0_0_10px_#00a2ff8f,0_0_20px_#00ccffa4,0_0_30px_#00eeff94]">
                    <div className="flex w-auto h-[100px] items-center justify-center m-0">
                        <img src="/logo/UTN_icon.png" className="h-full"/><span className="ml-[25px] text-black font-bold text-[60px]"> JOB BOARD </span>
                    </div>
                    <div className="mt-[15px]">
                        <Input label="" type="text" name="username" placeholder="Username or email" value={user} onChange={(e) => setUser(e.target.value)} />
                        <Input label="" type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Checkbox label="Show password" className="flex label: text-[black] font-bold items-center justify-start gap-2 mt-[10px] mb-[15px]" name="show" onClick={() => setShowPassword(!showPassword)} />
                        <p className=" text-[0.8rem] mt-2 text-blue-600 underline text-center cursor-pointer">Forgot your password?</p>
                        <p className="text-black text-[0.8rem] text-center mt-2 mb-4"> Don't have an account?<a className="text-[0.8rem] mt-2 text-blue-600 underline text-center cursor-pointer ml-1" onClick={() => navigate("/signup")}>Sign up</a></p>
                        <Button containerName="" label="Login" imageSrc="" imageAlt="" className=" text-black bg-white border-none w-full rounded-[5px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] px-6 py-[0.8rem] text-[1.1rem] font-semibold cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:bg-[#d8d7d7]" onClick={handleLogin} />
                        <div className="flex items-center my-[30px] gap-4 w-full">
                            <div className="flex-1 h-[1px] bg-[#ccc]"></div>
                                <span className="text-[#666] text-[0.9rem] font-semibold">OR</span>
                            <div className="flex-1 h-[1px] bg-[#ccc]"></div>
                        </div>
                        <Button containerName="" imageClassName="w-5 h-5" label="Login with google" imageSrc="/layout/button/image.png" imageAlt="" className="text-black flex items-center justify-center bg-white border-none w-full rounded-[5px] px-6 py-[0.8rem] text-[1.1rem] font-semibold shadow-[0_4px_6px_rgba(0,0,0,0.1)] cursor-pointer gap-3" onClick={() => navigate("/auth/signup")}/>
                    </div>
                </div>
            </div>
            <Button containerName="fixed bottom-[60px] right-[30px] z-[1000]" label="Back" imageSrc="" imageAlt="" className="flex items-center justify-center bg-[#4bcdee] min-w-[110px] h-[45px] text-base font-bold text-white no-underline border-none rounded-[10px] cursor-pointer transition-all duration-300 hover:bg-[#3398b1] hover:scale-[1.04] hover:-translate-y-[5px] hover:shadow-[0_0_10px_rgba(0,191,255,0.4),0_0_20px_rgba(123,44,255,0.3),0_0_30px_rgba(255,0,204,0.2)]" onClick={() => navigate("/home")}/>
        </div>
    );
}