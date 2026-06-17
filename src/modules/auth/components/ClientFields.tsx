import CommonUserFields from "./CommonUserFields"
import Input from "../../../core/components/ui/Input"
import Button from "../../../core/components/ui/Button"
import { useCreateAccount } from "../hooks/useCreateAccount"
import useShowAlert from "../../../core/hooks/useShowAlert"
import Alert from "../../../core/components/ui/Alert"
import { useNavigate } from "react-router-dom"

export default function ClientFields() {
    const { createAccount, setCreateAccount } = useCreateAccount();
    const Navigate = useNavigate();
    const { isRendered, showAlert, triggerAlert } = useShowAlert();

    return (
        <div className="w-full flex flex-col gap-4 animate-fade-in-up">
            {!isRendered && (
                <>
                    {!createAccount && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-white font-bold text-xl mb-2">Información Personal (Cliente)</h2>
                            <CommonUserFields />
                            <Input placeholder="Número de teléfono" type="tel" name="phone-number" />
                            <Input placeholder="País" type="text" name="country" />
                            <Button containerName="mt-4" label="Siguiente" variant="primary" className="w-full text-lg py-3"
                                onClick={() => setCreateAccount(true)} />
                        </div>
                    )}
                    {createAccount && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-white font-bold text-xl mb-2">Detalles de la Cuenta</h2>
                            <Input placeholder="Nombre de usuario" type="text" name="username" />
                            <Input placeholder="Contraseña" type="password" name="password" />
                            <Input placeholder="Confirmar contraseña" type="password" name="confirm-password" />
                            <Button containerName="mt-4" label="Crear Cuenta" variant="primary" className="w-full text-lg py-3"
                                onClick={() => triggerAlert(() => Navigate("/login"))} />
                        </div>
                    )}
                </>
            )}
            {isRendered && (
                <div className="mt-4">
                    <Alert message="¡Cuenta creada exitosamente!" type="success" isVisible={showAlert} />
                </div>
            )}
        </div>
    )
}