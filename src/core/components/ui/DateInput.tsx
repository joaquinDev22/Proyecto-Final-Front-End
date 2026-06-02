import { useState } from "react";
import "../../styles/calendar.css"
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

    return (
        <div className="date-input">

            <select value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Day</option>
                {days.map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                ))}
            </select>

            <select value={month} onChange={(e) => setMonth(e.target.value)} >
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

            <select value={year} onChange={(e) => setYear(e.target.value)}>
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