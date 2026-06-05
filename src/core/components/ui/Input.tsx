type InputProps = {
    label: string,
    type: string,
    placeholder: string,
    name: string
};
export default function Input({label,type,placeholder,name}:InputProps){
    return(
        <div className="flex flex-col mb-2 w-full">
            <label className="block mb-2 font-medium text-[0.7rem] text-black font-bold">{label}</label>
            <input id={name} name={name} type={type} placeholder={placeholder} className="flex bg-white placeholder:text-[grey] items-center justify-center w-full border-2 border-[#2cd5ff] mb-[1em] rounded-[5px] px-4 py-[0.8rem] text-[0.8rem] hover:border-[#2c80ff] hover:shadow-[0_8px_20px_#2c80ff5d] focus:outline-none focus:shadow-[0_0_0_4px_#2c80ff5d,0_8px_20px_#2c80ff5d]"/>
        </div>
    )
}