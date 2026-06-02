import DateInput from "../../../core/components/ui/DateInput";
import Input from "../../../core/components/ui/Input";
import "../../../core/styles/forms.css";
export default function CommonUserFields(){
    return(
       <>
        <Input placeholder="First name" label="First Name" type="text" name="firstname"/>
        <Input placeholder="Last name" label="Last Name" type="text" name="lastname"/>
        <Input placeholder="email@example.com" label="Email" type="email" name="email"/>
        <a className="field-label">Date of birth</a>
        <div className="date-selector-container">
            <DateInput/>
        </div>
       </>
    );
}