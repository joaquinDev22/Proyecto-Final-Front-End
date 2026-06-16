export default function Alert({ message, type, isVisible = true }: { message: string; type: 'success' | 'error'; isVisible?: boolean }) {
    const bgColor = type === 'success' ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500';
    const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';

    return (
        <div className={`${bgColor} ${textColor} flex justify-center p-4 rounded-2xl mb-4 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {message}
        </div>
    );
}