type buttonProps = {
        className: string,
        imageSrc:string,
        label: string,
        containerName: string,
        imageAlt: string,
        onClick?: () => void
    };
export default function Button({imageSrc,imageAlt,containerName,className,label,onClick}:buttonProps){
    return(
        <div className={containerName}>
            <button className={className} onClick={() => onClick?.()}>
                {label}
                <img src={imageSrc} alt={imageAlt}/>
            </button>
        </div>
    );
}