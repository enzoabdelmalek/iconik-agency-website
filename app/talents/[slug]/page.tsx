import { notFound } from "next/navigation";
import Link from "next/link";
import { talents, getTalentBySlug } from "@/app/data/talents";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import type { Metadata } from "next";

export async function generateStaticParams() {
    return talents.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const talent = getTalentBySlug(slug);
    if (!talent) return {};
    return {
        title: `${talent.firstName} ${talent.lastName}`,
        description: talent.bio.slice(0, 160),
    };
}

export default async function TalentDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const talent = getTalentBySlug(slug);

    if (!talent) {
        notFound();
    }

    return (
        <>
            {/* Back link */}
            <div className="pt-24 pb-4 max-w-[1400px] mx-auto px-8 md:px-12">
                <Link
                    href="/talents"
                    className="text-xs tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors no-underline"
                >
                    ← Retour aux talents
                </Link>
            </div>

            {/* Profile Header */}
            <section className="pb-24 md:pb-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Photo */}
                        <AnimateOnScroll>
                            <div className="photo-placeholder aspect-[3/4] w-full max-w-lg mx-auto lg:mx-0">
                                <span className="relative z-10 text-5xl md:text-6xl">
                                    {talent.initials}
                                </span>
                            </div>
                        </AnimateOnScroll>

                        {/* Info */}
                        <div className="flex flex-col justify-center">
                            <AnimateOnScroll delay={1}>
                                <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
                                    {talent.category}
                                </p>
                            </AnimateOnScroll>

                            <AnimateOnScroll delay={1}>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl mb-2">
                                    {talent.firstName}
                                </h1>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-muted/40">
                                    {talent.lastName}
                                </h1>
                            </AnimateOnScroll>

                            <AnimateOnScroll delay={2}>
                                <div className="section-divider" />
                            </AnimateOnScroll>

                            <AnimateOnScroll delay={2}>
                                <p className="text-muted leading-relaxed text-lg mb-10">
                                    {talent.bio}
                                </p>
                            </AnimateOnScroll>

                            {/* Details grid */}
                            <AnimateOnScroll delay={3}>
                                <div className="grid grid-cols-2 gap-6 mb-10">
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">
                                            Âge
                                        </p>
                                        <p className="font-medium">{talent.age} ans</p>
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">
                                            Taille
                                        </p>
                                        <p className="font-medium">{talent.height}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">
                                            Yeux
                                        </p>
                                        <p className="font-medium">{talent.eyeColor}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">
                                            Cheveux
                                        </p>
                                        <p className="font-medium">{talent.hairColor}</p>
                                    </div>
                                </div>
                            </AnimateOnScroll>

                            {/* Languages */}
                            <AnimateOnScroll delay={4}>
                                <div className="mb-8">
                                    <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
                                        Langues
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {talent.languages.map((lang) => (
                                            <span
                                                key={lang}
                                                className="px-3 py-1 border border-border text-sm"
                                            >
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </AnimateOnScroll>

                            {/* Skills */}
                            <AnimateOnScroll delay={4}>
                                <div className="mb-10">
                                    <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
                                        Compétences
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {talent.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 bg-surface text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </AnimateOnScroll>

                            {/* Projects */}
                            {talent.projects.length > 0 && (
                                <AnimateOnScroll delay={5}>
                                    <div className="mb-10">
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
                                            Projets
                                        </p>
                                        <div className="flex flex-col gap-2">
                                            {talent.projects.map((project) => (
                                                <p key={project} className="text-sm">
                                                    — {project}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            )}

                            {/* CTA */}
                            <AnimateOnScroll delay={5}>
                                <Link href="/contact" className="btn-primary w-fit">
                                    <span>Contacter l&apos;agence</span>
                                </Link>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery placeholder */}
            <section className="py-24 md:py-32 bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <AnimateOnScroll>
                        <h2 className="text-3xl md:text-4xl mb-12">Book photo</h2>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <AnimateOnScroll key={i} delay={(((i - 1) % 3) + 1) as 1 | 2 | 3}>
                                <div className="photo-placeholder aspect-[4/5]">
                                    <span className="relative z-10 text-lg opacity-50">
                                        {talent.initials} — {i}
                                    </span>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
