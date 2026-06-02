import { useState } from "react"
type FormType =
    | "client"
    | "recruiter"
    | "job_seeker"
    | "freelancer"
    | "enterprise"
    | "instructor";
export function useSignupForm(){
    const [formType, setFormType] = useState<FormType | null>(null);
    return{
        formType,
        setFormType
    };
}