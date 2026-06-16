import { useState } from "react";
import Select from "./Select";

export default function DateInput() {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

    const dayOptions = [
        { label: "Día", value: "" },
        ...days.map(d => ({ label: d, value: d.toString() }))
    ];

    const monthOptions = [
        { label: "Mes", value: "" },
        ...months.map((m, i) => ({ label: m, value: (i + 1).toString() }))
    ];

    const yearOptions = [
        { label: "Año", value: "" },
        ...years.map(y => ({ label: y, value: y.toString() }))
    ];

    return (
        <div className="flex gap-4 justify-center items-center w-full">
            <Select 
                value={day} 
                onChange={setDay} 
                options={dayOptions} 
                className="w-[110px]" 
                placeholder="Día" 
            />
            <Select 
                value={month} 
                onChange={setMonth} 
                options={monthOptions} 
                className="w-[180px]" 
                placeholder="Mes" 
            />
            <Select 
                value={year} 
                onChange={setYear} 
                options={yearOptions} 
                className="w-[120px]" 
                placeholder="Año" 
            />
        </div>
    );
}