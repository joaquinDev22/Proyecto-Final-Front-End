type ProfileProps = {
    userRole: "freelance" | "enterprise";
};
export default function Profile({userRole}: ProfileProps) {
    return (
        <div className="profile">
            <h1>Profile</h1>
            <p>Welcome to your profile! Here you can view and manage your personal information, settings, and preferences.</p>
        </div>
    );
}