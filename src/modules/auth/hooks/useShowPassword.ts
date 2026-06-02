import { useState } from "react";
export function useShowPassword(){
    const [showPassword, setShowPassword] = useState(false);
    return{
    showPassword,
    setShowPassword
    };
}