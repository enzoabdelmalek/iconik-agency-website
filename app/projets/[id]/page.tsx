import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import type { Metadata } from "next";

function getEmbedUrl(url: string): string | null {
    try {
        const u = new URL(url);
        // YouTube
        if (u.hostname.includes("youtube.com")) {
            const v = u.searchParams.get("v");
            return v ? `https://www.youtube.com/embed/${v}` : null;
        }
        if (u.hostname.includes("youtu.be")) {
            return `https://www.youtube.com/embed${u.pathname}`;
        }
        // Vimeo
        if (u.hostname.includes("vimeo.com")) {
            const id = u.pathname.replace("/", "");
            return `https://player.vimeo.com/video/${id}`;
        }
    } catch { /* invalid URL */ }
    return null;
}

export async function generateStaticParams() {
    const { data } = await supabase
        .from("projects")
        .select("id")
        .eq("business_id", BUSINESS_ID)
        .eq("active", true);
    return (data || []).map(p => ({ id: p.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const { data } = await supabase
        .from("projects")
        .select("title, description")
        .eq("id", id)
        .single();
    if (!data) return {};
    return {
        title: data.title,
        description: data.description?.slice(0, 160) || "",
    };
}

export default async function ProjetDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { data: project } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .eq("business_id", BUSINESS_ID)
        .single();

    if (!project) notFound();

    // Fetch talents assigned to this project
    const { data: assignments } = await supabase
        .from("people_projects")
        .select("role, people(id, slug, name, first_name, last_name, photo_url, specialty)")
        .eq("project_id", id);

    const talents = (assignments || []).map((a: any) => ({
        ...a.people,
        role: a.role,
    }));

    return (
        <>
            {/* Back link */}
            <div className="pt-24 pb-4 max-w-[1400px] mx-auto px-8 md:px-12">
                <Link
                    href="/projets"
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors no-underline"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Retour aux projets
                </Link>
            </div>

            {/* Header */}
            <section className="pb-24 md:pb-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Image */}
                        <AnimateOnScroll>
                            <div className="aspect-[16/10] w-full overflow-hidden bg-surface">
                                {project.photo_url ? (
                                    <img
                                        src={project.photo_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="photo-placeholder w-full h-full">
                                        <span className="relative z-10 text-6xl font-serif">{project.title[0]}</span>
                                    </div>
                                )}
                            </div>
                        </AnimateOnScroll>

                        {/* Info */}
                        <div className="flex flex-col justify-center">
                            <AnimateOnScroll delay={1}>
                                <div className="flex items-center gap-3 mb-4">
                                    {project.type && (
                                        <span className="text-xs tracking-[0.1em] uppercase text-muted px-3 py-1 border border-border">
                                            {project.type}
                                        </span>
                                    )}
                                    {project.year && (
                                        <span className="text-xs tracking-[0.1em] text-muted">{project.year}</span>
                                    )}
                                </div>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8">{project.title}</h1>
                            </AnimateOnScroll>

                            <AnimateOnScroll delay={2}>
                                <div className="section-divider" />
                            </AnimateOnScroll>

                            {project.description && (
                                <AnimateOnScroll delay={2}>
                                    <p className="text-muted leading-relaxed text-lg mb-10 mt-6">
                                        {project.description}
                                    </p>
                                </AnimateOnScroll>
                            )}

                            <AnimateOnScroll delay={3}>
                                <Link href="/contact" className="btn-primary w-fit">
                                    <span>Contacter l&apos;agence</span>
                                </Link>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vidéo */}
            {project.video_url && (
                <section className="py-16 md:py-24">
                    <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                        <AnimateOnScroll>
                            {getEmbedUrl(project.video_url) ? (
                                <div className="aspect-video w-full overflow-hidden">
                                    <iframe
                                        src={getEmbedUrl(project.video_url)!}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <a
                                    href={project.video_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline w-fit inline-flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                    </svg>
                                    Voir la vidéo
                                </a>
                            )}
                        </AnimateOnScroll>
                    </div>
                </section>
            )}

            {/* Talents */}
            {talents.length > 0 && (
                <section className="py-24 md:py-32 bg-surface">
                    <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                        <AnimateOnScroll>
                            <h2 className="text-3xl md:text-4xl mb-12">Talents Iconik</h2>
                        </AnimateOnScroll>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                            {talents.map((talent: any, index: number) => {
                                const firstName = talent.first_name || talent.name.split(" ")[0];
                                const lastName = talent.last_name || talent.name.split(" ").slice(1).join(" ");
                                const initials = `${firstName[0]}${lastName?.[0] || ""}`.toUpperCase();
                                return (
                                    <AnimateOnScroll key={talent.id} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                                        <Link href={`/talents/${talent.slug || talent.id}`} className="block no-underline group">
                                            <div className="photo-placeholder aspect-[3/4] w-full mb-3 group-hover:opacity-90 transition-opacity">
                                                {talent.photo_url ? (
                                                    <img
                                                        src={talent.photo_url}
                                                        alt={talent.name}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className="relative z-10 text-xl">{initials}</span>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium text-foreground">{firstName} {lastName}</p>
                                            {talent.role && (
                                                <p className="text-xs text-muted mt-0.5">{talent.role}</p>
                                            )}
                                        </Link>
                                    </AnimateOnScroll>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
