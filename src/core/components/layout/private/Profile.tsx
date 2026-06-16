import Button from "../../ui/Button";
import Badge from "../../ui/Badge";

type ProfileProps = {
    userRole: "freelance" | "enterprise";
};

export default function Profile({ userRole }: ProfileProps) {
    const isFreelance = userRole === "freelance";

    return (
        <div className="flex-1 flex flex-col pt-10 pb-20 px-6 w-full max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1">
                        <div className="w-full h-full bg-dark-bg rounded-full flex items-center justify-center text-3xl font-bold">
                            {isFreelance ? "JD" : "AC"}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">
                            {isFreelance ? "John Doe" : "Acme Corp"}
                        </h1>
                        <p className="text-slate-400 font-medium">
                            {isFreelance ? "Senior Full-Stack Developer" : "Enterprise Tech Company"}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Edit Profile</Button>
                    <Button variant="primary">{isFreelance ? "Upload CV" : "Post a Job"}</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Left Column (span 2) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="glass rounded-2xl p-6">
                            <p className="text-slate-400 text-sm font-medium mb-2">
                                {isFreelance ? "Profile Views" : "Total Applicants"}
                            </p>
                            <h3 className="text-3xl font-bold text-white">
                                {isFreelance ? "1,204" : "4,209"}
                            </h3>
                            <p className="text-emerald-400 text-xs mt-2 font-medium">↑ 12% this week</p>
                        </div>
                        <div className="glass rounded-2xl p-6">
                            <p className="text-slate-400 text-sm font-medium mb-2">
                                {isFreelance ? "Active Proposals" : "Active Jobs"}
                            </p>
                            <h3 className="text-3xl font-bold text-white">
                                {isFreelance ? "12" : "5"}
                            </h3>
                            <p className="text-slate-500 text-xs mt-2 font-medium">Out of {isFreelance ? "40 connects" : "15 limits"}</p>
                        </div>
                        <div className="glass rounded-2xl p-6">
                            <p className="text-slate-400 text-sm font-medium mb-2">
                                {isFreelance ? "Total Earnings" : "Total Spent"}
                            </p>
                            <h3 className="text-3xl font-bold text-white">
                                {isFreelance ? "$12,450" : "$45,200"}
                            </h3>
                            <p className="text-emerald-400 text-xs mt-2 font-medium">Top Rated</p>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="glass rounded-2xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                            <Button variant="ghost" size="sm">View all</Button>
                        </div>
                        
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 items-start pb-6 border-b border-white/5 last:border-0 last:pb-0">
                                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                                        {isFreelance ? "📄" : "💼"}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-1">
                                            {isFreelance 
                                                ? "Your proposal was viewed by TechCorp" 
                                                : "New applicant for Senior Frontend Engineer"}
                                        </p>
                                        <p className="text-slate-400 text-sm">{i * 2} hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Right Column */}
                <div className="space-y-8">
                    {/* Skills/Details */}
                    <div className="glass rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6">
                            {isFreelance ? "Top Skills" : "Company Details"}
                        </h2>
                        {isFreelance ? (
                            <div className="flex flex-wrap gap-2">
                                {["React", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL", "AWS"].map((skill, i) => (
                                    <Badge key={i} variant="secondary">{skill}</Badge>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Industry</p>
                                    <p className="text-white font-medium">Information Technology</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Company Size</p>
                                    <p className="text-white font-medium">500-1000 Employees</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Location</p>
                                    <p className="text-white font-medium">San Francisco, CA</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Completion Card */}
                    <div className="glass rounded-2xl p-8 bg-gradient-to-br from-cyan-900/40 to-dark-surface border-cyan-500/20">
                        <h2 className="text-xl font-bold text-white mb-2">Profile Completion</h2>
                        <div className="flex justify-between text-sm mb-2 mt-4">
                            <span className="text-cyan-400 font-medium">85% Complete</span>
                            <span className="text-slate-400">15% left</span>
                        </div>
                        <div className="w-full bg-dark-bg rounded-full h-2 mb-6 overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <Button variant="outline" className="w-full text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10">
                            Complete Profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}