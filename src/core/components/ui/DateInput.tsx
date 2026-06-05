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
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - 1900 + 1 },
        (_, i) => currentYear - i
    );

    const baseSelectClass = "text-center px-4 py-[0.8rem] bg-white text-black text-base font-bold border-2 border-[#2cd5ff] rounded-[7px] cursor-pointer transition-all duration-300 appearance-none hover:border-[#2c80ff] hover:shadow-[0_8px_20px_#2c80ff5d] focus:outline-none focus:shadow-[0_0_0_4px_#2c80ff5d,0_8px_20px_#2c80ff5d] disabled:opacity-50 disabled:cursor-not-allowed [&>option]:bg-white [&>option]:text-[#333]";

    return (
        <div className="flex gap-4 justify-center items-center w-full">

            <select value={day} onChange={(e) => setDay(e.target.value)} className={`${baseSelectClass} w-[100px]`}>
                <option value="">Day</option>
                {days.map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                ))}
            </select>

            <select value={month} onChange={(e) => setMonth(e.target.value)} className={`${baseSelectClass} w-[180px]`}>
                <option value="">Month</option>
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
                <option value="">Year</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
}