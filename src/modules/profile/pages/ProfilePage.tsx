import Profile from "../../../core/components/layout/private/Profile";

export default function ProfilePage() {
    return (
        <div className="min-h-[calc(100vh-60px)] w-full flex flex-col">
            <Profile userRole="freelance" />
        </div>
    );
}
