import type { Metadata } from "next";
import Link from "next/link";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import { mapPersonToTalent } from "@/lib/talent-utils";
import TalentCard from "./components/TalentCard";
import AnimateOnScroll from "./components/AnimateOnScroll";
import ReviewsSection from "./components/ReviewsSection";

export const metadata: Metadata = {
    title: "Iconik Agency — Agence de Jeunes Comédiens à Paris",
    description:
        "Iconik Agency est une agence artistique parisienne dédiée aux jeunes comédiens. Nous révélons et accompagnons les talents de demain pour le cinéma, la télévision et le théâtre.",
    alternates: { canonical: "https://www.iconikagency.fr" },
    openGraph: {
        type: "website",
        url: "https://www.iconikagency.fr",
        title: "Iconik Agency — Agence de Jeunes Comédiens à Paris",
        description:
            "Agence artistique parisienne dédiée aux jeunes comédiens pour le cinéma, la télévision, le théâtre et la publicité.",
    },
    twitter: {
        card: "summary",
        title: "Iconik Agency — Agence de Jeunes Comédiens à Paris",
        description: "Agence artistique parisienne dédiée aux jeunes comédiens.",
    },
};

export default async function HomePage() {
    const [{ data: peopleData }, { data: projectsData }, { data: newsData }] = await Promise.all([
        supabase
            .from("people")
            .select("id, name, first_name, last_name, age, specialty, skills, photo_url, date_of_birth, gender, height, eye_color, hair_color, languages, projects, description")
            .eq("business_id", BUSINESS_ID)
            .neq("active", false)
            .order("display_order", { ascending: true })
            .order("last_name", { ascending: true })
            .limit(4),
        supabase
            .from("projects")
            .select("id, title, type, year, photo_url")
            .eq("business_id", BUSINESS_ID)
            .neq("active", false)
            .order("year", { ascending: false })
            .order("display_order", { ascending: true })
            .limit(3),
        supabase
            .from("blog" as any)
            .select("id, slug, title, date, category, excerpt")
            .eq("business_id", BUSINESS_ID)
            .eq("active", true)
            .order("created_at", { ascending: false })
            .limit(3),
    ]);

    const featuredTalents = (peopleData || []).map(mapPersonToTalent);

    const featuredProjects = projectsData || [];
    const latestNews = (newsData || []) as { id: string; slug: string; title: string; date: string; category: string; excerpt: string }[];

    return (
        <>
            {/* ─── HERO ─── */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.02)_0%,transparent_60%)]" />

                <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 text-center">
                    <p className="hero-subtitle text-xs md:text-sm tracking-[0.3em] uppercase text-muted mb-8">
                        Agence de Jeunes Comédiens — Paris
                    </p>

                    <h1 className="hero-title text-[clamp(3rem,10vw,9rem)] leading-[0.95] tracking-[-0.03em] mb-8">
                        ICONIK
                    </h1>

                    <div className="hero-line h-[1px] bg-foreground mx-auto mb-8" />

                    <p className="hero-description text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed font-light mb-12">
                        Nous révélons et accompagnons les talents de demain.
                        <br className="hidden md:block" />
                        Cinéma, télévision, théâtre & publicité.
                    </p>

                    <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/talents" className="btn-primary">
                            <span>Découvrir nos talents</span>
                        </Link>
                        <Link href="/contact" className="btn-outline">
                            Nous contacter
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
                    <svg className="w-5 h-5 text-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </section>

            {/* ─── ABOUT PREVIEW ─── */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <AnimateOnScroll>
                            <div className="photo-placeholder-dark photo-placeholder aspect-[4/5] w-full max-w-lg mx-auto lg:mx-0">
                                <span className="relative z-10 text-4xl">IA</span>
                            </div>
                        </AnimateOnScroll>

                        <div>
                            <AnimateOnScroll delay={1}>
                                <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                                    Notre Engagement
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={2}>
                                <h2 className="text-4xl md:text-5xl mb-6">
                                    Le talent n&apos;attend pas
                                    <br />
                                    le nombre des années
                                </h2>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={3}>
                                <div className="section-divider" />
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={3}>
                                <p className="text-muted leading-relaxed mb-6">
                                    Fondée à Paris, Iconik Agency est née d&apos;une conviction :
                                    chaque jeune possède une lumière unique qui mérite d&apos;être
                                    révélée. Nous accompagnons nos comédiens avec exigence et
                                    bienveillance, du premier casting aux plus grands plateaux.
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={4}>
                                <p className="text-muted leading-relaxed mb-8">
                                    Notre approche allie formation, accompagnement personnalisé et
                                    un réseau privilégié dans l&apos;industrie du cinéma, de la
                                    télévision et du spectacle vivant.
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={5}>
                                <Link href="/a-propos" className="btn-outline">
                                    En savoir plus
                                </Link>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── MARQUEE ─── */}
            <section className="py-6 border-y border-border overflow-hidden">
                <div className="marquee-track">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12 px-6">
                            {["Cinéma", "Télévision", "Théâtre", "Publicité", "Doublage", "Comédie Musicale"].map((item) => (
                                <span
                                    key={`${i}-${item}`}
                                    className="font-serif text-2xl md:text-3xl text-foreground/10 whitespace-nowrap"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FEATURED TALENTS ─── */}
            {featuredTalents.length > 0 && (
                <section className="py-24 md:py-32">
                    <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                            <div>
                                <AnimateOnScroll>
                                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                                        Nos Talents
                                    </p>
                                </AnimateOnScroll>
                                <AnimateOnScroll delay={1}>
                                    <h2 className="text-4xl md:text-5xl">
                                        Visages d&apos;aujourd&apos;hui,
                                        <br />
                                        étoiles de demain
                                    </h2>
                                </AnimateOnScroll>
                            </div>
                            <AnimateOnScroll delay={2}>
                                <Link
                                    href="/talents"
                                    className="mt-6 md:mt-0 text-sm tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors no-underline border-b border-muted hover:border-foreground pb-1"
                                >
                                    Voir tous les talents →
                                </Link>
                            </AnimateOnScroll>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {featuredTalents.map((talent, index) => (
                                <AnimateOnScroll key={talent.slug} delay={(index + 1) as 1 | 2 | 3 | 4}>
                                    <TalentCard talent={talent} />
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── STATS ─── */}
            <section className="py-20 bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { number: "12", label: "Talents" },
                            { number: "30+", label: "Projets réalisés" },
                            { number: "8", label: "Années d'expérience" },
                            { number: "100%", label: "Passion" },
                        ].map((stat, index) => (
                            <AnimateOnScroll key={stat.label} delay={(index + 1) as 1 | 2 | 3 | 4}>
                                <div className="text-center">
                                    <p className="font-serif text-4xl md:text-5xl mb-2">
                                        {stat.number}
                                    </p>
                                    <p className="text-xs tracking-[0.15em] uppercase text-muted">
                                        {stat.label}
                                    </p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURED PROJECTS ─── */}
            {featuredProjects.length > 0 && (
                <section className="py-24 md:py-32">
                    <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                            <div>
                                <AnimateOnScroll>
                                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                                        Projets
                                    </p>
                                </AnimateOnScroll>
                                <AnimateOnScroll delay={1}>
                                    <h2 className="text-4xl md:text-5xl">
                                        Nos dernières
                                        <br />
                                        collaborations
                                    </h2>
                                </AnimateOnScroll>
                            </div>
                            <AnimateOnScroll delay={2}>
                                <Link
                                    href="/projets"
                                    className="mt-6 md:mt-0 text-sm tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors no-underline border-b border-muted hover:border-foreground pb-1"
                                >
                                    Tous les projets →
                                </Link>
                            </AnimateOnScroll>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredProjects.map((project, index) => (
                                <AnimateOnScroll key={project.id} delay={(index + 1) as 1 | 2 | 3}>
                                    <Link href={`/projets/${project.id}`} className="block no-underline project-card group">
                                        <div className="aspect-[16/10] w-full mb-6 overflow-hidden">
                                            {project.photo_url ? (
                                                <img
                                                    src={project.photo_url}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="photo-placeholder-dark photo-placeholder w-full h-full">
                                                    <span className="relative z-10 text-3xl">
                                                        {project.title[0]}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 mb-3">
                                            {project.type && (
                                                <span className="text-xs tracking-[0.1em] uppercase text-muted">
                                                    {project.type}
                                                </span>
                                            )}
                                            {project.type && project.year && (
                                                <span className="w-1 h-1 rounded-full bg-muted" />
                                            )}
                                            {project.year && (
                                                <span className="text-xs tracking-[0.1em] uppercase text-muted">
                                                    {project.year}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl md:text-2xl group-hover:opacity-70 transition-opacity">
                                            {project.title}
                                        </h3>
                                    </Link>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── ACTUALITÉS ─── */}
            {latestNews.length > 0 && (
                <section className="py-24 md:py-32 bg-surface">
                    <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                            <div>
                                <AnimateOnScroll>
                                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">Actualités</p>
                                </AnimateOnScroll>
                                <AnimateOnScroll delay={1}>
                                    <h2 className="text-4xl md:text-5xl">Dernières nouvelles</h2>
                                </AnimateOnScroll>
                            </div>
                            <AnimateOnScroll delay={2}>
                                <Link href="/actualites" className="mt-6 md:mt-0 text-sm tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors no-underline border-b border-muted hover:border-foreground pb-1">
                                    Toutes les actualités →
                                </Link>
                            </AnimateOnScroll>
                        </div>

                        <div className="flex flex-col">
                            {latestNews.map((item, index) => (
                                <AnimateOnScroll key={item.id} delay={(index + 1) as 1 | 2 | 3}>
                                    <Link
                                        href={`/actualites/${item.slug}`}
                                        className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-8 group no-underline ${index < latestNews.length - 1 ? "border-b border-border" : ""}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs tracking-[0.1em] uppercase text-muted px-3 py-1 border border-border shrink-0">{item.category}</span>
                                            <h3 className="text-lg md:text-xl group-hover:opacity-60 transition-opacity">{item.title}</h3>
                                        </div>
                                        <span className="text-xs text-muted shrink-0">{item.date}</span>
                                    </Link>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── REVIEWS ─── */}
            <ReviewsSection />

            {/* ─── CTA SECTION ─── */}
            <section className="py-24 md:py-32 bg-foreground text-background">
                <div className="max-w-[800px] mx-auto px-8 md:px-12 text-center">
                    <AnimateOnScroll>
                        <p className="text-xs tracking-[0.2em] uppercase text-background/40 mb-6">
                            Rejoignez-nous
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={1}>
                        <h2 className="text-4xl md:text-5xl text-background mb-6">
                            Votre enfant a du talent ?
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={2}>
                        <p className="text-background/60 leading-relaxed mb-10 text-lg">
                            Nous recherchons en permanence de nouveaux visages et de nouvelles
                            personnalités. Contactez-nous pour une audition.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={3}>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground text-[0.8125rem] font-medium tracking-[0.12em] uppercase no-underline hover:bg-background/90 transition-colors duration-300"
                        >
                            Prendre contact
                        </Link>
                    </AnimateOnScroll>
                </div>
            </section>
        </>
    );
}
