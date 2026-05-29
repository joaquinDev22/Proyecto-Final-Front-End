import "../styles/signup.css"
export default function Signup(){

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
      <div className="signup-page">
        <div className="signup-options">
            <h1 className="signup-title">Who are you? (Choose an option)</h1>
            <div className="options">
                <div className="option-card">
                    <svg className="card-border" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <rect className="border-rect"x="0.5"y="0.5"width="99"height="99"rx="3"ry="3"/>
                    </svg>
                    <div className="option-card-image-principal">
                        <img src="../../public/layout/freelance_image.png" alt="card-image"/>
                    </div>
                    <div className="option-card-description">
                        <h2>Freelance</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                            odit doloribus. Et voluptatibus dolores in corrupti eius possimus!
                        </p>
                    </div>
                </div>                
                <div className="option-card">
                    <svg className="card-border" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <rect className="border-rect"x="0.5"y="0.5"width="99"height="99"rx="3"ry="3"/>
                    </svg>
                    <div className="option-card-image-principal">
                        <img src="../../public/layout/enterprise_image.png" alt="card-image"/>
                    </div>
                    <div className="option-card-description">
                     <h2>Enterprise</h2>
                     <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Cupiditate odio laborum a perferendis nemo! Impedit corporis fuga quo nam aperiam possimus, 
                            odit doloribus. Et voluptatibus dolores in corrupti eius possimus!
                    </p>
                    </div>
                </div>
            </div>
        </div>
      </div>  
     </>
    );
}
//<div className="option-card">
//    <div className="option-card-image">
//        <img src="../../../public/freelancer_image.png" alt="card-image"/>
//    </div>
//    <h2 className="option-card-title">Freelancer</h2>
//    <div className="option-card-description">
//        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//            Perferendis animi impedit omnis mollitia eos, 
//            rerum molestiae dignissimos alias explicabo obcaecati ea nihil, 
//            dicta saepe quo provident ratione officia at ab!</p>
//    </div>
//</div>            
//<div className="option-card">
//    <div className="option-card-image">
//    <img src="../../../public/recruiter_image.png" alt="card-image"/>
//    </div>
//    <h2 className="option-card-title">Recruiter</h2>
//    <div className="option-card-description">
//        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//            Perferendis animi impedit omnis mollitia eos, 
//            rerum molestiae dignissimos alias explicabo obcaecati ea nihil, 
//            dicta saepe quo provident ratione officia at ab!</p>
//    </div>
//</div>            
//<div className="option-card">
//    <div className="option-card-image">
//    <img src="../../../public/job_seeker_image.png" alt="card-image"/>
//    </div>
//    <h2 className="option-card-title">Job Seeker</h2>
//    <div className="option-card-description">
//        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//            Perferendis animi impedit omnis mollitia eos, 
//            rerum molestiae dignissimos alias explicabo obcaecati ea nihil, 
//            dicta saepe quo provident ratione officia at ab!</p>
//    </div>
//</div>            
//<div className="option-card">
//    <div className="option-card-image">
//    <img src="../../../public/instructor_image.png" alt="card-image"/>
//    </div>
//    <h2 className="option-card-title">Instructor</h2>
//    <div className="option-card-description">
//        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//            Perferendis animi impedit omnis mollitia eos, 
//            rerum molestiae dignissimos alias explicabo obcaecati ea nihil, 
//            dicta saepe quo provident ratione officia at ab!</p>
//    </div>
//</div>            