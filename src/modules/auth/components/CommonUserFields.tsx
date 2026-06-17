import DateInput from "../../../core/components/ui/DateInput";
import Input from "../../../core/components/ui/Input";

type Props = {
    email?: string;
    setEmail?: (val: string) => void;
};

export default function CommonUserFields({ email, setEmail }: Props){
    return(
       <>
        <Input placeholder="Nombre" type="text" name="firstname"/>
        <Input placeholder="Apellido" type="text" name="lastname"/>
        <Input placeholder="correo@ejemplo.com" type="email" name="email" value={email} onChange={(e) => setEmail && setEmail(e.target.value)}/>
        <label className="text-slate-300 font-bold block mb-2 text-[0.7rem] uppercase tracking-wider">Fecha de nacimiento</label>
        <div className="p-4">
            <DateInput/>
        </div>
       </>
    );
}