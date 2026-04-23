import type { Metadata } from "next";
import Link from "next/link";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export const metadata: Metadata = {
    title: "Actualités",
    description:
        "Suivez les dernières actualités d'Iconik Agency : projets, festivals, partenariats et succès de nos jeunes talents.",
};

export const revalidate = 60;

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
}

async function getPosts(): Promise<BlogPost[]> {
    const { data } = await supabase
        .from("blog" as any)
        .select("id, slug, title, date, category, excerpt")
        .eq("business_id", BUSINESS_ID)
        .eq("active", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
    return (data as BlogPost[]) || [];
}

export default async function ActualitesPage() {
    const posts = await getPosts();

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
                    {posts.length === 0 ? (
                        <p className="text-muted text-center py-16">Aucune actualité pour le moment.</p>
                    ) : (
                        <div className="flex flex-col">
                            {posts.map((item, index) => (
                                <AnimateOnScroll key={item.id}>
                                    <Link
                                        href={`/actualites/${item.slug}`}
                                        className={`block py-12 group ${index < posts.length - 1 ? "border-b border-border" : ""}`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-xs tracking-[0.1em] uppercase text-muted px-3 py-1 border border-border">
                                                {item.category}
                                            </span>
                                            <span className="text-xs text-muted">{item.date}</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl mb-4 group-hover:opacity-70 transition-opacity">
                                            {item.title}
                                        </h2>
                                        {item.excerpt && (
                                            <p className="text-muted leading-relaxed line-clamp-2">
                                                {item.excerpt}
                                            </p>
                                        )}
                                        <p className="mt-4 text-xs tracking-[0.1em] uppercase text-foreground group-hover:opacity-70 transition-opacity">
                                            Lire la suite →
                                        </p>
                                    </Link>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
