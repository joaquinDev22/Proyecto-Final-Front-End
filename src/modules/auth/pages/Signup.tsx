import { useNavigate } from "react-router-dom";
import Card from "../../../core/components/ui/Card";
import Button from "../../../core/components/ui/Button";
import { useChooseOption } from "../hooks/useChooseOption";
import { useSignupForm } from "../hooks/useSignupForm"
import ClientFields from "../components/ClientFields";
export default function Signup(){
    const {chooseOption, setChooseOption} = useChooseOption();
    const {formType, setFormType} = useSignupForm();
    const navigate = useNavigate();
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center flex-col p-8">
            {chooseOption === "" && (
                <div className="w-[80%] max-w-[1200px] h-[50%] mt-0">
                    <div className="flex w-full m-0 flex-col h-fit p-6 rounded-2xl glass items-center justify-center border-t border-white/10">
                        <img src="/logo/logo_principal.png" alt="WorkLink Logo" className="h-16 w-auto object-contain mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
                        <h1 className="mt-2 text-center text-white font-bold text-2xl mb-8">Please select an option to sign up</h1>
                        <div className="flex w-full m-0 h-fit">                       
                            <Card title="Freelance" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                                        odit doloribus. Et voluptatibus dolores in corrupti eius possimus!" 
                                icon="⚡"
                                onClick={() => setChooseOption("freelance")}
                            />             
                            <Card title="Enterprise" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                                        odit doloribus. Et voluptatibus dolores in corrupti eius possimus!" 
                                icon="🏢"
                                onClick={() => setChooseOption("enterprise")}
                            />
                        </div>
                    </div>
                    <Button variant="secondary" label="Back" containerName="fixed bottom-[60px] right-[30px] z-[1000]" onClick={() => navigate("/home")} />
                </div>
            )}
            {chooseOption === "freelance" && formType === null && (
                <div className="w-[80%] max-w-[1200px] h-[50%] mt-0">
                    <div className="flex w-full m-0 flex-col h-fit p-6 rounded-2xl glass items-center justify-center border-t border-white/10">
                        <img src="/logo/logo_principal.png" alt="WorkLink Logo" className="h-16 w-auto object-contain mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
                        <h1 className="mt-2 text-center text-white font-bold text-2xl mb-8">Who are you? (Choose an option)</h1>
                        <div className="flex w-full m-0 h-fit">
                            <Card title="Freelancer" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Cupiditate odio laborum a perferendis nemo!" 
                                icon="💻"
                                onClick={() => setFormType("freelancer")}
                            /> 
                            <Card title="Instructor" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Cupiditate odio laborum a perferendis nemo!" 
                                icon="🎓"
                                onClick={() => setFormType("instructor")}
                            /> 
                            <Card title="Client" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Cupiditate odio laborum a perferendis nemo!" 
                                icon="🤝"
                                onClick={() => setFormType("client")}
                            />    
                        </div>
                    </div>
                    <Button variant="secondary" label="Back" containerName="fixed bottom-[60px] right-[30px] z-[1000]" onClick={() => setChooseOption("")} />
                </div>
            )}
            {chooseOption === "enterprise" && formType === null && (
                <div className="w-[80%] max-w-[1200px] h-[50%] mt-0">
                    <div className="flex w-full m-0 flex-col h-fit p-6 rounded-2xl glass items-center justify-center border-t border-white/10">
                        <img src="/logo/logo_principal.png" alt="WorkLink Logo" className="h-16 w-auto object-contain mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
                        <h1 className="mt-2 text-center text-white font-bold text-2xl mb-8">Who are you? (Choose an option)</h1>
                        <div className="flex w-full m-0 h-fit">
                            <Card title="Recruiter" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Cupiditate odio laborum a perferendis nemo!" 
                                icon="🔍"
                                onClick={() => setFormType("recruiter")}
                            /> 
                            <Card title="Job Seeker" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Cupiditate odio laborum a perferendis nemo!" 
                                icon="📄"
                                onClick={() => setFormType("job_seeker")}
                            />    
                        </div>
                    </div>
                    <Button variant="secondary" label="Back" containerName="fixed bottom-[60px] right-[30px] z-[1000]" onClick={() => navigate("/home")} />
                </div>                  
            )}
            {formType === "freelancer" && (
                <>
                    <ClientFields/>
                    <Button variant="secondary" label="Back" containerName="fixed bottom-[60px] right-[30px] z-[1000]" onClick={() => setFormType(null)} />
                </>
            )}
      </div>  
    );
}     