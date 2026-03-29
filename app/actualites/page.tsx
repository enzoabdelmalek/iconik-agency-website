import type { Metadata } from "next";
import { news } from "@/app/data/news";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export const metadata: Metadata = {
    title: "Actualités",
    description:
        "Suivez les dernières actualités d'Iconik Agency : projets, festivals, partenariats et succès de nos jeunes talents.",
};

export default function ActualitesPage() {
    return (
        <>
            {/* Header */}
            <section className="page-header bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                        Dernières Nouvelles
                    </p>
                    <h1 className="text-5xl md:text-7xl mb-6">Actualités</h1>
                    <div className="section-divider" />
                    <p className="text-muted leading-relaxed max-w-xl text-lg mt-6">
                        Les dernières nouvelles de l&apos;agence, de nos talents et de
                        leurs projets.
                    </p>
                </div>
            </section>

            {/* News List */}
            <section className="py-24 md:py-32">
                <div className="max-w-[900px] mx-auto px-8 md:px-12">
                    <div className="flex flex-col">
                        {news.map((item, index) => (
                            <AnimateOnScroll key={item.slug}>
                                <article
                                    className={`py-12 ${index < news.length - 1 ? "border-b border-border" : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-xs tracking-[0.1em] uppercase text-muted px-3 py-1 border border-border">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-muted">{item.date}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl mb-4 hover:opacity-70 transition-opacity cursor-pointer">
                                        {item.title}
                                    </h2>
                                    <p className="text-muted leading-relaxed mb-4">
                                        {item.excerpt}
                                    </p>
                                    <p className="text-muted leading-relaxed text-sm">
                                        {item.content}
                                    </p>
                                </article>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
