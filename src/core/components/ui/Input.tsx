type InputProps = {
    type: string,
    placeholder?: string,
    name?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string
};

export default function Input({type, placeholder, name, value, onChange, className}: InputProps) {
    return(
        <input 
            id={name} 
            name={name} 
            type={type} 
            placeholder={placeholder} 
            className={className}
            value={value} 
            onChange={onChange}
        />
    )
}