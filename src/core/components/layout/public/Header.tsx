import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="flex bg-white items-center justify-between px-6 py-2 sticky top-0 z-10 shadow-md:bg-gray-800">
            <div className="flex items-center">
                <img src="../../public/logo/UTN_Logo_Dark.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <Link to="/home" className="no-underline text-inherit">
                <h1 className="text-black font-bold text-[1.6rem] m-0 cursor-pointer" >Job Board</h1>
            </Link>
            <nav className="flex items-center justify-center gap-4 bg-transparent p-0 dark:bg-transparent">
                <Link to="/freelancer" className="text-black font-bold  font-medium no-underline relative inline-block px-[0.7rem] py-2 rounded-[5px] cursor-pointer after:content-[''] after:absolute after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-[#35c2e6] after:rounded-[20px] after:shadow-[0_0_20px_#1292b3] after:scale-x-0 after:origin-center after:transition-transform after:duration-500 hover:after:scale-x-100">Freelancer</Link>
                <Link to="/enterprise" className="text-black font-bold font-medium no-underline relative inline-block px-[0.7rem] py-2 rounded-[5px] cursor-pointer after:content-[''] after:absolute after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-[#35c2e6] after:rounded-[20px] after:shadow-[0_0_20px_#1292b3] after:scale-x-0 after:origin-center after:transition-transform after:duration-500 hover:after:scale-x-100">Enterprise</Link>
                <Link to="/bootcamp" className="text-black font-bold font-medium no-underline relative inline-block px-[0.7rem] py-2 rounded-[5px] cursor-pointer after:content-[''] after:absolute after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-[#35c2e6] after:rounded-[20px] after:shadow-[0_0_20px_#1292b3] after:scale-x-0 after:origin-center after:transition-transform after:duration-500 hover:after:scale-x-100">Bootcamp</Link>
                <Link to="/signup" className="no-underline flex items-center justify-center min-w-[110px] h-[45px] px-4 py-2 rounded-[5px] text-base font-medium transition-all duration-200 bg-transparent text-[#045b70] border-2 border-[#139cbe] hover:bg-[#0f365e] hover:text-white hover:shadow-[0_0_35px_rgba(0,191,255,0.678)]">Sign Up</Link>
                <Link to="/login" className="no-underline flex items-center justify-center min-w-[110px] h-[45px] px-4 py-2 rounded-[5px] text-base font-medium transition-all duration-200 bg-[#139cbe] text-white border-2 border-[#139cbe] hover:bg-[#0f365e] hover:shadow-[0_0_35px_rgba(0,191,255,0.678)]">Login</Link>
            </nav>
        </header>
    );
}