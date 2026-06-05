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

            <div className="flex flex-col mb-2 w-full">

                <p className="block mb-2 text-[0.7rem] text-black font-bold">
                    Technologies
                </p>

                <input
                    type="text"
                    className="flex items-center justify-center w-full border-2 border-[#2cd5ff] mb-[1em] rounded-[5px] px-4 py-[0.8rem] text-[0.8rem] hover:border-[#2c80ff] hover:shadow-[0_8px_20px_#2c80ff5d] focus:outline-none focus:shadow-[0_0_0_4px_#2c80ff5d,0_8px_20px_#2c80ff5d]"
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