import { useChooseOption } from "../hooks/useChooseOption";
import { useShowPassword } from "../hooks/useShowPassword";
import { useNavigate } from "react-router-dom";
import "../styles/pages.css"
import Card from "../../../core/components/layout/Card";
import Input from "../../../core/components/ui/Input";
import Checkbox from "../../../core/components/ui/Checkbox";
import Button from "../../../core/components/ui/Button";
export default function Login(){
    const {chooseOption, setChooseOption} = useChooseOption();
    const {showPassword, setShowPassword} = useShowPassword();
    const navigate = useNavigate();

    return(
        <div className="page">
            {chooseOption === "" && ( 
                <div className="container">
                    <h1 className="page-title"> Select an option to log in</h1>
                    <div className="card-container">
                        <Card title="Freelance" 
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Deserunt ut sunt ipsam, porro, labore velit quam suscipit saepe ipsum facilis nisi, 
                        aperiam quibusdam ab est veniam totam nostrum sint excepturi!"
                        src="/layout/cards/freelance_image.png"
                        imgClassName="option-card-image-principal"
                        onClick={() => setChooseOption("freelancer")}/>
                        <Card title="Enterprise" 
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Deserunt ut sunt ipsam, porro, labore velit quam suscipit saepe ipsum facilis nisi, 
                        aperiam quibusdam ab est veniam totam nostrum sint excepturi!"
                        src="/layout/cards/enterprise_image.png"
                        imgClassName="option-card-image-principal"
                        onClick={() => setChooseOption("enterprise")}/>
                    </div>
                    <Button containerName="btn-container" label="Back" className="back-btn" onClick={() => navigate("/home")} imageSrc="" imageAlt=""/>
                </div>
            )}
            {(chooseOption === "freelancer" || chooseOption === "enterprise") && (
                <div className="form-container">
                    <div className="image-container">
                        <img src="/logo/UTN_icon.png" className="login-image"/>
                        <label className="image-label">JOB BOARD</label>
                    </div>
                    <div className="input-container">
                        <Input placeholder="Username or email" label="" type="text" name="username"/>
                        <Input placeholder="Password" label="" type={showPassword ? "text" : "password"} name="password"/>
                        <Checkbox className="container-show" label="Show password" name="checkbox" onClick={() => setShowPassword(prev => !prev)}/>
                        <Button containerName="" label="Log In" className="login-form-btn" imageSrc="" imageAlt=""/>
                    </div>
                    <p className="suggest-text-1">Forgot your password?</p>
                    <p className="suggest-text"> Don't have an account?<a className="suggest-text-1" onClick={() => navigate("/signup")}>Sign up</a></p>
                    <div className="separator">
                        <div className="line"></div>
                            <span>OR</span>
                        <div className="line"></div>
                    </div>
                    <Button containerName="" label="Log in with google" className="btn" imageSrc="/layout/button/image.png" imageAlt=""/>

                    <Button containerName="btn-container" label="Back" className="back-btn" onClick={() => setChooseOption("")} imageSrc="" imageAlt=""/>
                </div>
            )}
        </div>
    );
}