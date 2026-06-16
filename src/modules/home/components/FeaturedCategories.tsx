import { Link } from "react-router-dom";

const CATEGORIES = [
    { title: "Development & IT", count: "1,240 Jobs", icon: "💻" },
    { title: "Design & Creative", count: "850 Jobs", icon: "🎨" },
    { title: "Sales & Marketing", count: "620 Jobs", icon: "📈" },
    { title: "Writing & Translation", count: "430 Jobs", icon: "✍️" },
    { title: "Admin & Customer Support", count: "910 Jobs", icon: "🎧" },
    { title: "Finance & Accounting", count: "250 Jobs", icon: "📊" },
];

export default function FeaturedCategories() {
    return (
        <section className="py-20 bg-bg-base">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">Explore by Category</h2>
                    <p className="text-text-muted text-lg">Find the perfect role or the ideal candidate in our top categories.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CATEGORIES.map((cat, idx) => (
                        <Link 
                            key={idx} 
                            to="/freelancer" 
                            className="group flex items-center p-6 bg-bg-surface border border-slate-100 rounded-2xl hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                {cat.icon}
                            </div>
                            <div className="ml-4">
                                <h3 className="font-semibold text-lg text-text-main group-hover:text-primary transition-colors">{cat.title}</h3>
                                <p className="text-text-muted text-sm">{cat.count}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
