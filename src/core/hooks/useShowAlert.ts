import { useState } from "react";
export default function useShowAlert() {
    const [showAlert, setShowAlert] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    const triggerAlert = (onComplete?: () => void) => {
        setIsRendered(true);
        // Pequeño retraso para que el navegador procese el renderizado inicial antes de aplicar la transición
        setTimeout(() => {
            setShowAlert(true);
        }, 10);

        setTimeout(() => {
            setShowAlert(false); // Inicia la transición de salida
            setTimeout(() => {
                setIsRendered(false);
                if (onComplete) {
                    onComplete();
                } // Desmonta el componente cuando termina la transición
            }, 300);
        }, 3000); // Oculta el alert después de 3 segundos
    };

    return { showAlert, isRendered, triggerAlert };
}