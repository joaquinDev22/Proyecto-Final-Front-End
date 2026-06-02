import { Link } from "react-router-dom";
import '../../styles/layout.css'
import '../../styles/buttons.css'
export default function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src="../../public/logo/UTN_Logo_Dark.png" alt="Logo" />
            </div>
            <Link to="/home" className="title-link">
                <h1 className="title" >Job Board</h1>
            </Link>
            <nav className="nav">
                <Link to="/freelancer" className="nav-link">Freelancer</Link>
                <Link to="/enterprise" className="nav-link">Enterprise</Link>
                <Link to="/bootcamp" className="nav-link">Bootcamp</Link>
                <Link to="/signup" className="signup-btn">Sign Up</Link>
                <Link to="/login" className="login-btn">Login</Link>
            </nav>
        </header>
    );
}