import { useState } from "react";

export default function DateInput() {

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const days = Array.from(
        { length: 31 },
        (_, i) => i + 1
    );

    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - 1900 + 1 },
        (_, i) => currentYear - i
    );

    const baseSelectClass = "w-full bg-dark-bg/50 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&>option]:bg-[#0b1121] [&>option]:text-white";

    return (
        <div className="flex gap-4 justify-center items-center w-full">

            <select value={day} onChange={(e) => setDay(e.target.value)} className={`${baseSelectClass} w-[100px]`}>
                <option value="">Día</option>
                {days.map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                ))}
            </select>

            <select value={month} onChange={(e) => setMonth(e.target.value)} className={`${baseSelectClass} w-[180px]`}>
                <option value="">Mes</option>
                {months.map((month, index) => (
                    <option
                        key={month}
                        value={index + 1}
                    >
                        {month}
                    </option>
                ))}
            </select>

            <select value={year} onChange={(e) => setYear(e.target.value)} className={`${baseSelectClass} w-[120px]`}>
                <option value="">Año</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
}