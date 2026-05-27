import {useExclusiveCheckbox} from "../hooks/useExclusiveCheckBox"

export default function Signup(){
    const {
        freelancer,
        searchJob,
        activateFreelancer,
        activateSearchJob
    } = useExclusiveCheckbox();

    return (
        <div className="signup-page">
            <div className="signup-card">
                <h1 className="signup-title">Create Account</h1>
                <form className="signup-form">
                <div className="field">
                    <p className="field-label">Name</p>
                    <input placeholder="Enter your name" type="text" className="field-input" />
                </div>
                <div className="field">
                    <p className="field-label">Lastname</p>
                    <input placeholder="Enter your lastname" type="text" className="field-input" />
                </div>
                <div className="field">
                    <p className="field-label">Email</p>
                    <input placeholder="Enter your email" type="email" className="field-input" />
                </div>
                 <div className="field">
                    <p className="field-label">Birth date</p>
                    <input type="date" className="field-input"/>
                </div>
                <div className="container-show">
                    <input type="checkbox" id="freelancer" className="field-input"
                    checked={freelancer}
                    onChange={activateFreelancer}/>
                    <label htmlFor="freelancer" className="field-label">I want to be a freelancer </label>
                </div>                
                <div className="container-show">
                    <input type="checkbox" id="search-job" className="field-input"
                    checked={searchJob}
                    onChange={activateSearchJob}/>
                    <label htmlFor="search-job" className="field-label">I want to search for a job</label>
                </div>
                <div className="field">
                    <p className="field-label">Username</p>
                    <input placeholder="Enter your username" type="text" className="field-input" />
                </div>
                <div className="field">
                    <p className="field-label">Password</p>
                    <input placeholder="Enter your password" type="password" className="field-input" />
                </div>
                <p className="link-terms">Terms & Conditions</p>
                <div className="container-show">
                    <input type="checkbox" id="terms" className="field-input"/>
                    <label htmlFor="terms" className="field-label">I agree to the Terms and Conditions</label>
                </div>
                <div >
                    <button type="submit" className="signup-form-btn">Sign Up</button>
                </div>
                <p className="suggest-text">Do you have an account? <a href="/login" className="link-terms">Log in</a></p>
            </form>
            </div>
        </div>
    );
}