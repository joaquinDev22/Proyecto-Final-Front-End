type CheckboxProps = {
    className: string,
    name: string,
    label: string,
    onClick?: () => void
};
export default function Checkbox({className,name,label,onClick} : CheckboxProps){
    return(
        <div className={className}>
                <input type="checkbox" id={name} name={name} onClick={() => onClick?.()} />
                <label htmlFor={name}>{label}</label>
        </div>
    );
}