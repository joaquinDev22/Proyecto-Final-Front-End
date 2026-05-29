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

            <div className="container-show">

                <input
                    type="checkbox"
                    id="remote-only"
                    checked={remoteOnly}
                    onChange={(e) =>
                        setRemoteOnly(e.target.checked)
                    }
                />

                <label htmlFor="remote-only">
                    Remote jobs only
                </label>

            </div>

        </>

    );
}