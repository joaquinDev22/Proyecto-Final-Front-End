type CardProps = {
    title: string,
    description: string,
    src: string
    imgClassName: string,
    onClick?: () => void
};

export default function Card({ title, description, imgClassName,src, onClick }: CardProps) {
    const imgContainerClass = imgClassName === "option-card-image-principal" ? "flex justify-center items-center" : "flex justify-center items-center mb-4";
    const imgClass = imgClassName === "option-card-image-principal" ? "w-auto h-[110px] object-cover mb-4" : "w-auto h-[110px] object-cover rounded-full border border-[#5cf1f7eb]";

    return (
        <>
        <svg width="0" height="0">
            <defs>
                <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#00bfff" />
                    <stop offset="50%" stopColor="#7b2cff" />
                    <stop offset="100%" stopColor="#ff00cc" />
                </linearGradient>
            </defs>
        </svg>
        <div className="group w-full h-[370px] relative rounded-2xl bg-[rgba(255,255,255,0.85)] p-6 transition-all duration-300 cursor-pointer m-[10px] hover:scale-[1.04] hover:-translate-y-[5px] hover:shadow-[0_0_10px_rgba(0,191,255,0.4),0_0_20px_rgba(123,44,255,0.3),0_0_30px_rgba(255,0,204,0.2)] max-md:flex max-md:flex-row max-md:justify-center max-md:gap-[30px]" onClick={() => onClick?.()}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect className="fill-none stroke-[url(#gradient)] stroke-[1.5] [stroke-dasharray:400] [stroke-dashoffset:400] transition-[stroke-dashoffset] duration-600 ease-in-out group-hover:[stroke-dashoffset:0]" 
                x="0.5" y="0.5"
                width="99" height="98.96" 
                rx="3" ry="3" />
            </svg>
            <div className={imgContainerClass}>
                <img src={src} alt="card-image" className={imgClass} />
            </div>
            <div className="rounded-2xl text-center p-2 bg-[#d4d4d4]">
                <h2 className="text-black font-bold m-2 text-base">{title}</h2>
                <p className="text-black m-0 text-[x-small] h-[120px] w-full max-w-[60ch] leading-[1.5]">{description}</p>
            </div>
        </div>
        </>
    );
}