import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="login-page">
                <div className="login-card">
                <h1 className="login-title">Welcome</h1>
                <p className="welcome-text">Please enter your credentials to log in.</p>
                <form className="login-form">
                    <div className="field">
                        <p className="field-label">Username</p>
                        <input placeholder="username" type="text" id="user" name="user" />

                        <p className="field-label">Password</p>
                        <input placeholder="password" type="password" id="password" name="password" />
                    </div>
                    <div className="container-show">
                            <input type="checkbox" id="show" name="show" />
                            <label htmlFor="show">Show password</label>
                    </div>
                    <button type="submit" className="login-form-btn">Login</button>
                </form>
                <div>
                    <p className="suggest-text">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    <p className="suggest-text-1"><Link to="/reset-password">Forgot your password?</Link></p>
                </div>
            </div>
        </div>
    );
}