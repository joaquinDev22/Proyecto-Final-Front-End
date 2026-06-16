import CommonUserFields from "./CommonUserFields"
import Input from "../../../core/components/ui/Input"
import Button from "../../../core/components/ui/Button"
import {useCreateAccount} from "../hooks/useCreateAccount"
import useShowAlert from "../../../core/hooks/useShowAlert"
import Alert from "../../../core/components/ui/Alert"
import { useNavigate } from "react-router-dom"

export default function ClientFields(){
    const {createAccount, setCreateAccount} = useCreateAccount();
    const Navigate = useNavigate();
    const {isRendered, showAlert, triggerAlert} = useShowAlert();

    return(
       <div className="w-full max-w-[calc(100%-2rem)] md:w-[80%] md:max-w-[1250px] mx-auto">
            <div className="glass w-auto h-auto p-10 rounded-2xl align-center justify-center border-t border-white/10">
                <div className="image-container flex items-center justify-center">
                    <img src="/logo/logo_principal.png" className="w-48 h-auto mb-8 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"/>
                </div>
                    {!isRendered && (
                        <>
                            {!createAccount && (                    
                                <div>
                                    <h2 className="text-center text-white font-bold text-2xl mb-6">Por favor ingresa tu información personal</h2>
                                    <CommonUserFields/>
                                    <Input placeholder="Número de teléfono" type="tel" name="phone-number" label="Número de teléfono"/>
                                    <Input placeholder="País" type="text" name="country" label="País"/>
                                    <Button containerName="mt-8" label="Siguiente" variant="primary" className="w-full text-lg py-3" 
                                    onClick={() => setCreateAccount(true)}/>
                                </div>
                            )}
                            {createAccount && (
                                <div>
                                    <Input placeholder="Nombre de usuario" type="text" name="username" label="Nombre de usuario"/>
                                    <Input placeholder="Contraseña" type="password" name="password" label="Contraseña"/>
                                    <Input placeholder="Confirmar contraseña" type="password" name="confirm-password" label="Confirmar Contraseña"/>
                                    <Button containerName="mt-8" label="Crear Cuenta" variant="primary" className="w-full text-lg py-3"
                                        onClick={() => triggerAlert(()=> Navigate("/login"))}/>
                                </div>
                            )}
                        </>
                    )}
                    {isRendered && (
                        <Alert message="¡Cuenta creada exitosamente!" type="success" isVisible={showAlert} />
                    )}
            </div>
       </div>
    )
}