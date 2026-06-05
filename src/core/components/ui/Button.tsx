type buttonProps = {
        className: string,
        imageSrc:string,
        imageClassName?: string,
        label: string,
        containerName: string,
        imageAlt: string,
        onClick?: () => void
    };
export default function Button({imageSrc,imageAlt,containerName,className,label,onClick,imageClassName}:buttonProps){
    return(
        <div className={containerName}>
            <button className={className} onClick={() => onClick?.()}>
                {label}
                <img className={imageClassName} src={imageSrc} alt={imageAlt}/>
            </button>
        </div>
    );
}