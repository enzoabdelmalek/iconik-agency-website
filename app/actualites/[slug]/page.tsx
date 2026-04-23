import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase, BUSINESS_ID } from "@/lib/supabase";

export const revalidate = 60;

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    content: string;
}

async function getPost(slug: string): Promise<BlogPost | null> {
    const { data } = await supabase
        .from("blog" as any)
        .select("id, slug, title, date, category, excerpt, content")
        .eq("business_id", BUSINESS_ID)
        .eq("slug", slug)
        .eq("active", true)
        .single();
    return (data as BlogPost) || null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: "Article introuvable" };
    return {
        title: post.title,
        description: post.excerpt || undefined,
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();

    return (
        <>
            {/* Header */}
            <section className="page-header bg-surface">
                <div className="max-w-[900px] mx-auto px-8 md:px-12">
                    <Link
                        href="/actualites"
                        className="text-xs tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors mb-8 inline-block"
                    >
                        ← Actualités
                    </Link>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs tracking-[0.1em] uppercase text-muted px-3 py-1 border border-border">
                            {post.category}
                        </span>
                        <span className="text-xs text-muted">{post.date}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl mb-6 leading-tight">{post.title}</h1>
                    {post.excerpt && (
                        <>
                            <div className="section-divider" />
                            <p className="text-muted leading-relaxed text-lg mt-6 max-w-xl">
                                {post.excerpt}
                            </p>
                        </>
                    )}
                </div>
            </section>

            {/* Content */}
            {post.content && (
                <section className="py-24 md:py-32">
                    <div className="max-w-[900px] mx-auto px-8 md:px-12">
                        <div className="prose-article">
                            {post.content.split("\n\n").map((paragraph, i) => (
                                <p key={i} className="text-muted leading-relaxed mb-6">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Back */}
            <section className="pb-24">
                <div className="max-w-[900px] mx-auto px-8 md:px-12">
                    <Link href="/actualites" className="btn-primary inline-flex">
                        <span>← Toutes les actualités</span>
                    </Link>
                </div>
            </section>
        </>
    );
}
