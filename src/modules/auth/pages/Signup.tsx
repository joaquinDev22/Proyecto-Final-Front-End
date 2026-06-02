import { useNavigate } from "react-router-dom";
import "../styles/pages.css"
import Card from "../../../core/components/layout/Card";
import Button from "../../../core/components/ui/Button";
import { useChooseOption } from "../hooks/useChooseOption";
import { useSignupForm } from "../hooks/useSignupForm"
import ClientFields from "../components/ClientFields";
export default function Signup(){
    const {chooseOption, setChooseOption} = useChooseOption();
    const {formType, setFormType} = useSignupForm();
    const navigate = useNavigate();
    return (
      <div className="page">
            {chooseOption === "" && (
                <div className="container">
                    <h1 className="page-title">Please select an option to sign up</h1>
                    <div className="card-container">                       
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
                    <Button className="back-btn" label="Back" containerName="btn-container" onClick={() => navigate("/home")} imageSrc="" imageAlt=""/>
                </div>
            )}
            {chooseOption === "freelance" && formType === null && (
                <div className="container">
                    <h1 className="page-title">Who are you? (Choose an option)</h1>
                    <div className="card-container">
                        <Card title="Freelancer" 
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                                    odit doloribus. Et voluptatibus dolores in corrupti eius possimus!" 
                            src="/layout/cards/freelancer_image.png" 
                            imgClassName="option-card-image"
                            onClick={() => setFormType("freelancer")}
                        /> 
                        <Card title="Instructor" 
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                                    odit doloribus. Et voluptatibus dolores in corrupti eius possimus!" 
                            src="/layout/cards/instructor_image.png" 
                            imgClassName="option-card-image"
                            onClick={() => setFormType("instructor")}
                        /> 
                        <Card title="Client" 
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                                    odit doloribus. Et voluptatibus dolores in corrupti eius possimus!" 
                            src="/layout/cards/client_image.png"
                            imgClassName="option-card-image"
                            onClick={() => setFormType("client")}
                        />    
                    </div>
                    <Button className="back-btn" label="Back" containerName="btn-container" onClick={() => setChooseOption("")} imageSrc="" imageAlt=""/>
                </div>
            )}
            {chooseOption === "enterprise" && formType === null && (
                <div className="container">
                    <div className="card-container">
                        <Card title="Job Seeker" 
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                                    odit doloribus. Et voluptatibus dolores in corrupti eius possimus!" 
                            src="/layout/job_seeker_image.png" 
                            imgClassName="option-card-image"
                            onClick={() => setFormType("job_seeker")}
                        /> 
                        <Card title="Recruiter" 
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                                    odit doloribus. Et voluptatibus dolores in corrupti eius possimus!" 
                            src="/layout/recruiter_image.png" 
                            imgClassName="option-card-image"
                            onClick={() => setFormType("recruiter")}
                        />    
                    </div>
                    <Button className="back-btn" label="Back" containerName="btn-container" onClick={() => navigate("/home")} imageSrc="" imageAlt=""/>  
                </div>                  
            )}
            {formType === "freelancer" && (
                <>
                    <ClientFields/>
                    <Button className="back-btn" label="Back" containerName="btn-container" onClick={() => setFormType(null)} imageSrc="" imageAlt=""/>
                </>
            )}
      </div>  
    );
}     