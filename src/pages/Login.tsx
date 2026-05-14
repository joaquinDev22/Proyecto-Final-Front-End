export default function Login() {
    return (
        <div className="login">
            <h1>Login</h1>
            <form>
                <div className="field">
                    <input placeholder="username" type="text" id="user" name="user" />
                </div>
                <div className="field">
                    <input placeholder="password" type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
}