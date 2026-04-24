import Link from "next/link";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import AnimateOnScroll from "./AnimateOnScroll";
import Stars from "./Stars";

interface Review {
    id: string;
    author_name: string;
    rating: number;
    comment: string;
}

export default async function ReviewsSection() {
    const [{ data: reviews }, { data: allReviews }] = await Promise.all([
        supabase
            .from("reviews" as any)
            .select("id, author_name, rating, comment")
            .eq("business_id", BUSINESS_ID)
            .gte("rating", 4)
            .order("created_at", { ascending: false })
            .limit(3),
        supabase
            .from("reviews" as any)
            .select("rating")
            .eq("business_id", BUSINESS_ID),
    ]);

    const list = (reviews as Review[]) || [];
    const all = allReviews || [];
    if (list.length === 0) return null;

    const avgRating = all.length > 0
        ? (all.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / all.length).toFixed(1)
        : null;

    return (
        <section className="py-24 md:py-32 bg-surface">
            <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <AnimateOnScroll>
                            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">Témoignages</p>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={1}>
                            <h2 className="text-4xl md:text-5xl">
                                Ce que disent
                                <br />
                                nos clients
                            </h2>
                        </AnimateOnScroll>
                        {avgRating && (
                            <AnimateOnScroll delay={2}>
                                <div className="flex items-center gap-3 mt-4">
                                    <span className="font-serif text-2xl">{avgRating}</span>
                                    <Stars rating={Math.round(parseFloat(avgRating))} />
                                    <span className="text-xs text-muted">({all.length} avis)</span>
                                </div>
                            </AnimateOnScroll>
                        )}
                    </div>
                    <AnimateOnScroll delay={2}>
                        <Link href="/avis" className="mt-6 md:mt-0 text-sm tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors no-underline border-b border-muted hover:border-foreground pb-1">
                            Tous les avis →
                        </Link>
                    </AnimateOnScroll>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {list.map((review, i) => (
                        <AnimateOnScroll key={review.id} delay={(i + 1) as 1 | 2 | 3}>
                            <div className="flex flex-col gap-4 border-t border-border pt-8">
                                <Stars rating={review.rating} />
                                <p className="text-muted leading-relaxed text-sm flex-1">&ldquo;{review.comment}&rdquo;</p>
                                <p className="text-xs tracking-[0.1em] uppercase">— {review.author_name}</p>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>

                <AnimateOnScroll delay={4}>
                    <div className="mt-16 text-center">
                        <Link href="/avis" className="btn-outline">
                            Laisser un avis
                        </Link>
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
}
