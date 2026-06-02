import "../../styles/forms.css"
type InputProps = {
    label: string,
    type: string,
    placeholder: string,
    name: string
};
export default function Input({label,type,placeholder,name}:InputProps){
    return(
        <div className="field">
            <label className="field-label">{label}</label>
            <input id={name} name={name} type={type} placeholder={placeholder}/>
        </div>
    )
}