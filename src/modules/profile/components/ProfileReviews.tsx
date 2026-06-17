import { Star } from "lucide-react";

interface ReviewItem {
    id: number;
    clientName: string;
    rating: number;
    comment: string;
    date: string;
}

interface ProfileReviewsProps {
    averageRating: number;
    totalReviews: number;
    reviews: ReviewItem[];
}

export default function ProfileReviews({ averageRating, totalReviews, reviews }: ProfileReviewsProps) {
    return (
        <div className="glass p-8 rounded-3xl border-t border-purple-500/20 mb-6">
            <h2 className="text-xl font-bold text-white mb-6">Calificaciones y Reseñas</h2>
            
            <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-6">
                <div className="text-center">
                    <p className="text-5xl font-bold text-white mb-1">{averageRating.toFixed(1)}</p>
                    <div className="flex text-amber-400 justify-center mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                                key={i} 
                                className={`w-5 h-5 ${i < Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} 
                            />
                        ))}
                    </div>
                    <p className="text-slate-400 text-sm">{totalReviews} reseñas</p>
                </div>
                
                <div className="flex-1 space-y-2">
                    {/* Just a decorative mock of progress bars for 5,4,3,2,1 stars */}
                    {[5, 4, 3].map(star => (
                        <div key={star} className="flex items-center gap-2 text-sm">
                            <span className="text-slate-400 w-3">{star}</span>
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                                <div className="bg-amber-400 h-full" style={{width: `${star === 5 ? 80 : star === 4 ? 15 : 5}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="text-white font-bold">{review.clientName}</h4>
                                    <div className="flex text-amber-400 mt-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} 
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-slate-400 text-xs">{review.date}</span>
                            </div>
                            <p className="text-slate-300 text-sm italic">"{review.comment}"</p>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-400 text-center italic">No hay reseñas disponibles aún.</p>
                )}
            </div>
        </div>
    );
}
