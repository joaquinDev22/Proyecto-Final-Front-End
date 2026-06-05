type ProfileProps = {
    userRole: "freelance" | "enterprise";
};
export default function Profile({ userRole }: ProfileProps) {
    return (
        <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl font-bold text-black mb-4">Profile</h1>
            <p className="text-lg text-black font-semibold max-w-2xl">Manage your personal information, settings, and preferences here.</p>
        </div>
    );
}