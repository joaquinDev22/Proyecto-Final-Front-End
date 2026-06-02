import { useChooseOption } from "../hooks/useChooseOption";
import { useShowPassword } from "../hooks/useShowPassword";
import { useNavigate } from "react-router-dom";
import "../styles/pages.css"
import Card from "../../../core/components/layout/public/Card";
import Input from "../../../core/components/ui/Input";
import Checkbox from "../../../core/components/ui/Checkbox";
import Button from "../../../core/components/ui/Button";
export default function Login(){
    const {chooseOption, setChooseOption} = useChooseOption();
    const {showPassword, setShowPassword} = useShowPassword();
    const navigate = useNavigate();

    return(
        <div className="page">
            <div className="container">
                {chooseOption === "" && (
                    <div className="card-container">
                        <h2>Select an option to log in</h2>
                        <div className="card-option-container">
                            <Card title="Freelance" 
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Repellat ea harum maiores necessitatibus itaque libero debitis sed sapiente,
                            magnam alias et illum animi excepturi accusantium commodi dignissimos est doloremque? 
                            Repudiandae!" 
                            src="/layout/cards/freelance_image.png" 
                            imgClassName="option-card-image-principal" 
                            onClick={() => setChooseOption("freelance")} />
                            <Card title="Enterprise" 
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Repellat ea harum maiores necessitatibus itaque libero debitis sed sapiente,
                            magnam alias et illum animi excepturi accusantium commodi dignissimos est doloremque? 
                            Repudiandae!" 
                            src="/layout/cards/enterprise_image.png" 
                            imgClassName="option-card-image-principal" 
                            onClick={() => setChooseOption("enterprise")} />
                        </div>
                    </div>
                )}
            </div>
            <Button containerName="btn-container" label="Back" imageSrc="" imageAlt="" className="back-btn" onClick={() => navigate("/home")}/>
            {chooseOption !== "" && (
                <div className="container">
                    <div className="form-container">
                        <div className="image-container">
                            <img src="/logo/UTN_icon.png" className="login-image"/><span className="image-label"> JOB BOARD </span>
                        </div>
                        <div className="input-container">
                            <Input label="" type="text" name="username" placeholder="Username or email"/>
                            <Input label="" type={showPassword ? "text" : "password"} name="password" placeholder="Password"/>
                            <Checkbox label="Show password" className="container-show" name="show" onClick={() => setShowPassword(!showPassword)} />
                            <p className="suggest-text-1">Forgot your password?</p>
                            <p className="suggest-text"> Don't have an account?<a className="suggest-text-1" onClick={() => navigate("/signup")}>Sign up</a></p>
                            {chooseOption === "freelance" && 
                            (<Button containerName="" label="Login" imageSrc="" imageAlt="" className="login-form-btn" onClick={() => navigate("/freelancer")}
                            />)}
                            {chooseOption === "enterprise" && (<Button containerName="" label="Login" imageSrc="" imageAlt="" className="login-form-btn" onClick={() => navigate("/enterprise")}/>)}
                            <div className="separator">
                                <div className="line"></div>
                                    <span>OR</span>
                                <div className="line"></div>
                            </div>
                            <Button containerName="" label="Login with google" imageSrc="/layout/button/image.png" imageAlt="" className="btn" onClick={() => navigate("/auth/signup")}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}