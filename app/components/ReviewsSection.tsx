import Link from "next/link";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import AnimateOnScroll from "./AnimateOnScroll";

interface Review {
    id: string;
    author_name: string;
    rating: number;
    comment: string;
}

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-3 h-3" viewBox="0 0 24 24"
                    fill={rating >= s ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"
                    style={{ color: rating >= s ? "var(--foreground)" : "var(--muted)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
            ))}
        </div>
    );
}

export default async function ReviewsSection() {
    const [{ data: reviews }, { data: allReviews }] = await Promise.all([
        (supabase as any)
            .from("reviews")
            .select("id, author_name, rating, comment")
            .eq("business_id", BUSINESS_ID)
            .gte("rating", 4)
            .order("created_at", { ascending: false })
            .limit(3),
        (supabase as any)
            .from("reviews")
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
                                nos familles
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
