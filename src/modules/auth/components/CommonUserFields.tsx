import DateInput from "../../../core/components/ui/DateInput";
import Input from "../../../core/components/ui/Input";

export default function CommonUserFields(){
    return(
       <>
        <Input placeholder="Nombre" label="Nombre" type="text" name="firstname"/>
        <Input placeholder="Apellido" label="Apellido" type="text" name="lastname"/>
        <Input placeholder="correo@ejemplo.com" label="Correo electrónico" type="email" name="email"/>
        <a className="text-slate-300 font-bold block mb-2 text-[0.7rem] uppercase tracking-wider">Fecha de nacimiento</a>
        <div className="p-4">
            <DateInput/>
        </div>
       </>
    );
}