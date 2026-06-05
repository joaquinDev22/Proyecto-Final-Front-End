import CommonUserFields from "./CommonUserFields"
import Input from "../../../core/components/ui/Input"
import Button from "../../../core/components/ui/Button"

export default function ClientFields(){
    return(
       <div className="w-full max-w-[calc(100%-2rem)] md:w-[80%] md:max-w-[1250px] mx-auto">
            <div className="bg-[#d8feffeb] w-auto h-auto p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-[10px] align-center justify-center">
                <div className="image-container flex items-center justify-center">
                    <img src="/logo/UTN_icon.png" className=" w-20 h-20 mb-4"/><span className="ml-8 text-black font-bold text-[30px] mb-4">JOB BOARD</span>
                </div>
                <div>
                    <h2 className="text-center text-black font-bold text-[24px] mb-4">Please enter your personal information</h2>
                    <CommonUserFields/>
                    <Input placeholder="Phone number" type="tel" name="phone-number" label="Phone Number"/>
                    <Input placeholder="Country" type="text" name="country" label="Country"/>
                    <Button containerName="flex items-center justify-center mt-[30px]" label="Sign Up" className="bg-[#00ffaa] text-white border-none w-full rounded-[5px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] px-6 py-[0.8rem] text-[1.1rem] font-semibold cursor-pointer" imageSrc="" imageAlt=""/>
                </div>
            </div>
       </div>
    )
}