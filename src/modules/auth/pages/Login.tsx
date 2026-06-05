import { useChooseOption } from "../hooks/useChooseOption";
import { useShowPassword } from "../hooks/useShowPassword";
import { useNavigate } from "react-router-dom";
import Card from "../../../core/components/layout/public/Card";
import Input from "../../../core/components/ui/Input";
import Checkbox from "../../../core/components/ui/Checkbox";
import Button from "../../../core/components/ui/Button";
export default function Login(){
    const {chooseOption, setChooseOption} = useChooseOption();
    const {showPassword, setShowPassword} = useShowPassword();
    const navigate = useNavigate();

    return(
        <div className="min-h-[calc(100vh-60px)] flex items-center justify-center flex-col p-8">
            <div className="w-[80%] max-w-[1200px] h-[50%] mt-0">
                {chooseOption === "" && (
                    <div className="flex w-full m-0 flex-col h-fit p-2 rounded-2xl bg-[#a7f9ffad] shadow-[0_0_10px_#00a2ff8f,0_0_20px_#00ccffa4,0_0_30px_#00eeff94] items-center justify-center">
                        <h2 className="mt-2 text-center mb-2">Select an option to log in</h2>
                        <div className="flex w-full m-0 h-fit">
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
            <Button containerName="fixed bottom-[60px] right-[30px] z-[1000]" label="Back" imageSrc="" imageAlt="" className="flex items-center justify-center bg-[#4bcdee] min-w-[110px] h-[45px] text-base font-bold text-white no-underline border-none rounded-[10px] cursor-pointer transition-all duration-300 hover:bg-[#3398b1] hover:scale-[1.04] hover:-translate-y-[5px] hover:shadow-[0_0_10px_rgba(0,191,255,0.4),0_0_20px_rgba(123,44,255,0.3),0_0_30px_rgba(255,0,204,0.2)]" onClick={() => navigate("/home")}/>
            {chooseOption !== "" && (
                <div className="w-[80%] max-w-[1200px] h-[50%] mt-0">
                    <div className="flex w-full flex-col p-6 rounded-2xl bg-[#a7f9ff96] shadow-[0_0_10px_#00a2ff8f,0_0_20px_#00ccffa4,0_0_30px_#00eeff94]">
                        <div className="flex w-auto h-[100px] items-center justify-center m-0">
                            <img src="/logo/UTN_icon.png" className="h-full"/><span className="ml-[25px] font-bold text-[60px]"> JOB BOARD </span>
                        </div>
                        <div className="mt-[15px]">
                            <Input label="" type="text" name="username" placeholder="Username or email"/>
                            <Input label="" type={showPassword ? "text" : "password"} name="password" placeholder="Password"/>
                            <Checkbox label="Show password" className="flex items-center justify-start gap-2 mt-[10px] mb-[15px]" name="show" onClick={() => setShowPassword(!showPassword)} />
                            <p className="text-[0.8rem] mt-2 text-blue-600 underline text-center cursor-pointer">Forgot your password?</p>
                            <p className="text-[0.8rem] text-center mt-2"> Don't have an account?<a className="text-[0.8rem] mt-2 text-blue-600 underline text-center cursor-pointer ml-1" onClick={() => navigate("/signup")}>Sign up</a></p>
                            {chooseOption === "freelance" && 
                            (<Button containerName="" label="Login" imageSrc="" imageAlt="" className="bg-white border-none w-full rounded-[5px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] px-6 py-[0.8rem] text-[1.1rem] font-semibold cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:bg-[#d8d7d7]" onClick={() => navigate("/freelancer")}
                            />)}
                            {chooseOption === "enterprise" && (<Button containerName="" label="Login" imageSrc="" imageAlt="" className="bg-white border-none w-full rounded-[5px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] px-6 py-[0.8rem] text-[1.1rem] font-semibold cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:bg-[#d8d7d7]" onClick={() => navigate("/enterprise")}/>)}
                            <div className="flex items-center my-[30px] gap-4 w-full">
                                <div className="flex-1 h-[1px] bg-[#ccc]"></div>
                                    <span className="text-[#666] text-[0.9rem] font-semibold">OR</span>
                                <div className="flex-1 h-[1px] bg-[#ccc]"></div>
                            </div>
                            <Button containerName="" label="Login with google" imageSrc="/layout/button/image.png" imageAlt="" className="flex items-center justify-center bg-white border-none w-full rounded-[5px] px-6 py-[0.8rem] text-[1.1rem] font-semibold shadow-[0_4px_6px_rgba(0,0,0,0.1)] cursor-pointer gap-3" onClick={() => navigate("/auth/signup")}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}