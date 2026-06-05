import DateInput from "../../../core/components/ui/DateInput";
import Input from "../../../core/components/ui/Input";

export default function CommonUserFields(){
    return(
       <>
        <Input placeholder="First name" label="First Name" type="text" name="firstname"/>
        <Input placeholder="Last name" label="Last Name" type="text" name="lastname"/>
        <Input placeholder="email@example.com" label="Email" type="email" name="email"/>
        <a className="block mb-2 font-medium text-[0.9rem]">Date of birth</a>
        <div className="p-4">
            <DateInput/>
        </div>
       </>
    );
}