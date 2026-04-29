import type { Metadata } from "next";
import React from "react";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import ReviewForm from "@/app/components/ReviewForm";
import Stars from "@/app/components/Stars";

export const metadata: Metadata = {
    title: "Avis",
    description: "Découvrez les avis sur Iconik Agency et partagez votre expérience.",
    alternates: { canonical: "https://www.iconikagency.fr/avis" },
    openGraph: {
        type: "website",
        url: "https://www.iconikagency.fr/avis",
        title: "Avis | Iconik Agency",
        description: "Découvrez les avis sur Iconik Agency et partagez votre expérience.",
    },
    twitter: {
        card: "summary",
        title: "Avis | Iconik Agency",
        description: "Découvrez les avis sur Iconik Agency et partagez votre expérience.",
    },
};

export const revalidate = 60;

interface Review {
    id: string;
    author_name: string;
    rating: number;
    comment: string;
    reply: string | null;
    created_at: string;
}

export default async function AvisPage() {
    const { data: reviews } = await supabase
        .from("reviews" as any)
        .select("id, author_name, rating, comment, reply, created_at")
        .eq("business_id", BUSINESS_ID)
        .order("created_at", { ascending: false });

    const list = (reviews as Review[]) || [];
    const avgRating = list.length > 0
        ? (list.reduce((acc, r) => acc + r.rating, 0) / list.length).toFixed(1)
        : null;
    const distribution = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: list.filter((r) => r.rating === star).length,
    }));

    const jsonLd = avgRating
        ? {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Iconik Agency",
              url: "https://www.iconikagency.fr",
              aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: avgRating,
                  reviewCount: list.length,
                  bestRating: 5,
                  worstRating: 1,
              },
              review: list.slice(0, 10).map((r) => ({
                  "@type": "Review",
                  author: { "@type": "Person", name: r.author_name },
                  reviewRating: { "@type": "Rating", ratingValue: r.rating },
                  reviewBody: r.comment,
                  datePublished: r.created_at.slice(0, 10),
              })),
          }
        : null;

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            {/* Header */}
            <section className="page-header bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">Témoignages</p>
                    <h1 className="text-5xl md:text-7xl mb-6">Avis</h1>
                    <div className="section-divider" />
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">

                    {/* Stats */}
                    {avgRating && (
                        <AnimateOnScroll>
                            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center mb-20 pb-20 border-b border-border">
                                <div>
                                    <p className="text-7xl font-serif mb-3">{avgRating}</p>
                                    <Stars rating={Math.round(parseFloat(avgRating))} size="md" />
                                    <p className="text-xs tracking-[0.15em] uppercase text-muted mt-2">{list.length} avis</p>
                                </div>
                                <div className="flex flex-col gap-2 flex-1 max-w-xs">
                                    {distribution.map(({ star, count }) => (
                                        <div key={star} className="flex items-center gap-3">
                                            <span className="text-xs text-muted w-2">{star}</span>
                                            <div className="flex-1 bg-border h-[1px] relative">
                                                <div className="rating-bar absolute top-0 left-0 h-[1px] bg-foreground transition-all"
                                                    style={{ '--rating-w': list.length > 0 ? `${(count / list.length) * 100}%` : "0%" } as React.CSSProperties} />
                                            </div>
                                            <span className="text-xs text-muted w-4">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimateOnScroll>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Liste */}
                        <div className="flex flex-col gap-10">
                            <AnimateOnScroll>
                                <h2 className="text-3xl md:text-4xl mb-8">Tous les avis</h2>
                            </AnimateOnScroll>
                            {list.length === 0 ? (
                                <div className="py-16 flex flex-col items-start gap-3">
                                    <svg className="w-8 h-8 text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
                                    </svg>
                                    <p className="text-muted text-sm">Soyez le premier à laisser un avis.</p>
                                </div>
                            ) : (
                                list.map((review, i) => (
                                    <AnimateOnScroll key={review.id} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                                        <div className="border-b border-border pb-10">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="font-medium">{review.author_name}</p>
                                                <Stars rating={review.rating} />
                                            </div>
                                            <p className="text-muted leading-relaxed text-sm">{review.comment}</p>
                                            {review.reply && (
                                                <div className="mt-5 pl-5 border-l border-border">
                                                    <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">Réponse d&apos;Iconik Agency</p>
                                                    <p className="text-sm text-muted/80 leading-relaxed">{review.reply}</p>
                                                </div>
                                            )}
                                            <p className="text-xs text-muted/50 mt-4">
                                                {new Date(review.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                                            </p>
                                        </div>
                                    </AnimateOnScroll>
                                ))
                            )}
                        </div>

                        {/* Formulaire */}
                        <div>
                            <AnimateOnScroll delay={1}>
                                <div className="mb-8">
                                    <h2 className="text-3xl md:text-4xl mb-6">Laisser un avis</h2>
                                    <div className="section-divider" />
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={2}>
                                <ReviewForm />
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
