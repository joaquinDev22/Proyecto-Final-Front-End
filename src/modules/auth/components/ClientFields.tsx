import CommonUserFields from "./CommonUserFields"
import Input from "../../../core/components/ui/Input"
import "../../../core/styles/forms.css"
import Button from "../../../core/components/ui/Button"
export default function ClientFields(){
    return(
       <form className="form-style">
            <div className="image-container">
                <img src="/logo/UTN_icon.png" className="login-image"/>
                <label className="image-label">JOB BOARD</label>
            </div>
            <br/>
            <h2 className="form-style-h2">Please enter your personal information</h2>
            <CommonUserFields/>
            <Input placeholder="Phone number" type="tel" name="phone-number" label="Phone Number"/>
            <Input placeholder="Country" type="text" name="country" label="Country"/>
            <Button containerName="submit-btn-container" label="Sign Up" className="submit-btn" imageSrc="" imageAlt=""/>
       </form>
    )
}