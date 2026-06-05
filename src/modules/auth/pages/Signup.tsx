import { useNavigate } from "react-router-dom";
import Card from "../../../core/components/layout/public/Card";
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
                    <div className="flex w-full m-0 flex-col h-fit p-2 rounded-2xl bg-[#a7f9ffad] shadow-[0_0_10px_#00a2ff8f,0_0_20px_#00ccffa4,0_0_30px_#00eeff94] items-center justify-center">
                        <h1 className="mt-2 text-center font-bold text-2xl mb-4">Please select an option to sign up</h1>
                        <div className="flex w-full m-0 h-fit">                       
                            <Card title="Freelance" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                                        odit doloribus. Et voluptatibus dolores in corrupti eius possimus!" 
                                src="/layout/cards/freelance_image.png" 
                                imgClassName="option-card-image-principal"
                                onClick={() => setChooseOption("freelance")}
                            />             
                            <Card title="Enterprise" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                                        odit doloribus. Et voluptatibus dolores in corrupti eius possimus!" 
                                src="/layout/cards/enterprise_image.png" 
                                imgClassName="option-card-image-principal"
                                onClick={() => setChooseOption("enterprise")}
                            />
                        </div>
                    </div>
                    <Button className="flex items-center justify-center bg-[#4bcdee] min-w-[110px] h-[45px] text-base font-bold text-white no-underline border-none rounded-[10px] cursor-pointer transition-all duration-300 hover:bg-[#3398b1] hover:scale-[1.04] hover:-translate-y-[5px] hover:shadow-[0_0_10px_rgba(0,191,255,0.4),0_0_20px_rgba(123,44,255,0.3),0_0_30px_rgba(255,0,204,0.2)]" label="Back" containerName="fixed bottom-[60px] right-[30px] z-[1000]" onClick={() => navigate("/home")} imageSrc="" imageAlt=""/>
                </div>
            )}
            {chooseOption === "freelance" && formType === null && (
                <div className="w-[80%] max-w-[1200px] h-[50%] mt-0">
                    <div className="flex w-full m-0 flex-col h-fit p-2 rounded-2xl bg-[#a7f9ffad] shadow-[0_0_10px_#00a2ff8f,0_0_20px_#00ccffa4,0_0_30px_#00eeff94] items-center justify-center">
                        <h1 className="mt-2 text-center font-bold text-2xl mb-4">Who are you? (Choose an option)</h1>
                        <div className="flex w-full m-0 h-fit">
                            <Card title="Freelancer" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Cupiditate odio laborum a perferendis nemo!" 
                                src="/layout/cards/freelancer_image.png" 
                                imgClassName="option-card-image"
                                onClick={() => setFormType("freelancer")}
                            /> 
                            <Card title="Instructor" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Cupiditate odio laborum a perferendis nemo!" 
                                src="/layout/cards/instructor_image.png" 
                                imgClassName="option-card-image"
                                onClick={() => setFormType("instructor")}
                            /> 
                            <Card title="Client" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Cupiditate odio laborum a perferendis nemo!" 
                                src="/layout/cards/client_image.png"
                                imgClassName="option-card-image"
                                onClick={() => setFormType("client")}
                            />    
                        </div>
                    </div>
                    <Button className="flex items-center justify-center bg-[#4bcdee] min-w-[110px] h-[45px] text-base font-bold text-white no-underline border-none rounded-[10px] cursor-pointer transition-all duration-300 hover:bg-[#3398b1] hover:scale-[1.04] hover:-translate-y-[5px] hover:shadow-[0_0_10px_rgba(0,191,255,0.4),0_0_20px_rgba(123,44,255,0.3),0_0_30px_rgba(255,0,204,0.2)]" label="Back" containerName="fixed bottom-[60px] right-[30px] z-[1000]" onClick={() => setChooseOption("")} imageSrc="" imageAlt=""/>
                </div>
            )}
            {chooseOption === "enterprise" && formType === null && (
                <div className="w-[80%] max-w-[1200px] h-[50%] mt-0">
                    <div className="flex w-full m-0 flex-col h-fit p-2 rounded-2xl bg-[#a7f9ffad] shadow-[0_0_10px_#00a2ff8f,0_0_20px_#00ccffa4,0_0_30px_#00eeff94] items-center justify-center">
                        <div className="flex w-full m-0 flex-col h-fit p-2 rounded-2xl bg-[#a7f9ffad] shadow-[0_0_10px_#00a2ff8f,0_0_20px_#00ccffa4,0_0_30px_#00eeff94] items-center justify-center">
                            <Card title="Job Seeker" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Cupiditate odio laborum a perferendis nemo!" 
                                src="/layout/job_seeker_image.png" 
                                imgClassName="option-card-image"
                                onClick={() => setFormType("job_seeker")}
                            /> 
                            <Card title="Recruiter" 
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Cupiditate odio laborum a perferendis nemo!" 
                                src="/layout/recruiter_image.png" 
                                imgClassName="option-card-image"
                                onClick={() => setFormType("recruiter")}
                            />    
                        </div>
                    </div>
                    <Button className="flex items-center justify-center bg-[#4bcdee] min-w-[110px] h-[45px] text-base font-bold text-white no-underline border-none rounded-[10px] cursor-pointer transition-all duration-300 hover:bg-[#3398b1] hover:scale-[1.04] hover:-translate-y-[5px] hover:shadow-[0_0_10px_rgba(0,191,255,0.4),0_0_20px_rgba(123,44,255,0.3),0_0_30px_rgba(255,0,204,0.2)]" label="Back" containerName="fixed bottom-[60px] right-[30px] z-[1000]" onClick={() => navigate("/home")} imageSrc="" imageAlt=""/>  
                </div>                  
            )}
            {formType === "freelancer" && (
                <>
                    <ClientFields/>
                    <Button className="flex items-center justify-center bg-[#4bcdee] min-w-[110px] h-[45px] text-base font-bold text-white no-underline border-none rounded-[10px] cursor-pointer transition-all duration-300 hover:bg-[#3398b1] hover:scale-[1.04] hover:-translate-y-[5px] hover:shadow-[0_0_10px_rgba(0,191,255,0.4),0_0_20px_rgba(123,44,255,0.3),0_0_30px_rgba(255,0,204,0.2)]" label="Back" containerName="fixed bottom-[60px] right-[30px] z-[1000]" onClick={() => setFormType(null)} imageSrc="" imageAlt=""/>
                </>
            )}
      </div>  
    );
}     