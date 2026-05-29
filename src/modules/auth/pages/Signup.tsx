import "../styles/signup.css"
export default function Signup(){

    return (
      <div className="signup-page">
        <div className="signup-card">
            <h1 className="signup-card-title">Who are you? (Choose an option)</h1>
            <div className="signup-options-card">
                <div className="option-card">
                    <div className="option-card-image">
                    <img src="../../../public/freelancer_image.png" alt="card-image"/>
                    </div>
                    <h2 className="option-card-title">Freelancer</h2>
                    <div className="option-card-description">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Perferendis animi impedit omnis mollitia eos, 
                            rerum molestiae dignissimos alias explicabo obcaecati ea nihil, 
                            dicta saepe quo provident ratione officia at ab!</p>
                    </div>
                </div>            
                <div className="option-card">
                    <div className="option-card-image">
                    <img src="../../../public/recruiter_image.png" alt="card-image"/>
                    </div>
                    <h2 className="option-card-title">Recruiter</h2>
                    <div className="option-card-description">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Perferendis animi impedit omnis mollitia eos, 
                            rerum molestiae dignissimos alias explicabo obcaecati ea nihil, 
                            dicta saepe quo provident ratione officia at ab!</p>
                    </div>
                </div>            
                <div className="option-card">
                    <div className="option-card-image">
                    <img src="../../../public/job_seeker_image.png" alt="card-image"/>
                    </div>
                    <h2 className="option-card-title">Job Seeker</h2>
                    <div className="option-card-description">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Perferendis animi impedit omnis mollitia eos, 
                            rerum molestiae dignissimos alias explicabo obcaecati ea nihil, 
                            dicta saepe quo provident ratione officia at ab!</p>
                    </div>
                </div>            
                <div className="option-card">
                    <div className="option-card-image">
                    <img src="../../../public/instructor_image.png" alt="card-image"/>
                    </div>
                    <h2 className="option-card-title">Instructor</h2>
                    <div className="option-card-description">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Perferendis animi impedit omnis mollitia eos, 
                            rerum molestiae dignissimos alias explicabo obcaecati ea nihil, 
                            dicta saepe quo provident ratione officia at ab!</p>
                    </div>
                </div>            
            </div>
        </div>
      </div>  
    );
}