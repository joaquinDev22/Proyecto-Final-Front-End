type EmployeeFieldsProps = {
    technologies: string;
    setTechnologies: (value: string) => void;

    remoteOnly: boolean;
    setRemoteOnly: (value: boolean) => void;
};

export default function EmployeeFields({
    technologies,
    setTechnologies,
    remoteOnly,
    setRemoteOnly
}: EmployeeFieldsProps) {

    return (

        <>

            <div className="field">

                <p className="field-label">
                    Technologies
                </p>

                <input
                    type="text"
                    className="field-input"
                    placeholder="React, Java, Spring..."
                    value={technologies}
                    onChange={(e) =>
                        setTechnologies(e.target.value)
                    }
                />

            </div>

            <div className="flex items-center justify-start gap-2 mt-[10px] mb-[15px]">

                <input
                    type="checkbox"
                    id="remote-only"
                    checked={remoteOnly}
                    onChange={(e) =>
                        setRemoteOnly(e.target.checked)
                    }
                />

                <label htmlFor="remote-only" className="m-0 font-inherit font-medium cursor-pointer text-[0.9rem]">
                    Remote jobs only
                </label>

            </div>

        </>

    );
}