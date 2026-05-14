type HeaderProps = {
    darkMode: boolean;
};
export default function Header({ darkMode }: HeaderProps) {
    return (
        <header className="header">
            <div className="logo">
                <img src={darkMode ? "/UTN_Logo_Light.png" : "/UTN_Logo_Dark.png"} alt="Logo" />
            </div>
            <h1 className="title">Job Board</h1>
            <nav className="nav">
                <a href="/">Freelancer</a>
                <a href="/about">Enterprise</a>
                <a href="/contact">Bootcamp</a>
                <button className="signup-btn">Sign Up</button>
                <button className="login-btn">Login</button>
            </nav>
        </header>
    );
}