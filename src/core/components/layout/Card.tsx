import "../../styles/cards.css"
type CardProps = {
    title: string,
    description: string,
    src: string
    imgClassName: string,
    onClick?: () => void
};

export default function Card({ title, description, imgClassName,src, onClick }: CardProps) {
    
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
        <div className="option-card" onClick={() => onClick?.()}>
            <svg className="card-border" viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect className="border-rect" x="0.5" y="0.5" width="99" height="98.86" rx="3" ry="3" />
            </svg>
            <div className={imgClassName}>
                <img src={src} alt="card-image" />
            </div>
            <div className="option-card-description">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
        </>
    );
}