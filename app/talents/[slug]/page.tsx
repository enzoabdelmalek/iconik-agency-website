import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import PhotoCarousel from "@/app/components/PhotoCarousel";
import TalentCVButton from "@/app/components/TalentCVButton";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const { data } = await supabase
        .from("people")
        .select("id, slug")
        .eq("business_id", BUSINESS_ID)
        .eq("active", true);
    return (data || []).map((t: any) => ({ slug: t.slug || t.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { data: talent } = await supabase
        .from("people")
        .select("name, first_name, last_name, description, photo_url")
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .single();
    if (!talent) return {};
    const fullName = talent.first_name && talent.last_name
        ? `${talent.first_name} ${talent.last_name}`
        : talent.name;
    const description = talent.description?.slice(0, 160) || `${fullName} — talent représenté par Iconik Agency`;
    const url = `https://www.iconikagency.fr/talents/${slug}`;
    return {
        title: fullName,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "profile",
            url,
            title: `${fullName} | Iconik Agency`,
            description,
            images: talent.photo_url ? [{ url: talent.photo_url, alt: fullName }] : [],
        },
        twitter: {
            card: talent.photo_url ? "summary_large_image" : "summary",
            title: `${fullName} | Iconik Agency`,
            description,
            images: talent.photo_url ? [talent.photo_url] : [],
        },
    };
}

export default async function TalentDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { data: talent } = await supabase
        .from("people")
        .select("*")
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .eq("business_id", BUSINESS_ID)
        .single();

    if (!talent) notFound();

    const { data: projectAssignments } = await supabase
        .from("people_projects")
        .select("role, projects(id, title, type, year, photo_url)")
        .eq("person_id", talent.id);

    const talentProjects = (projectAssignments || []).map((a: any) => ({
        ...a.projects,
        role: a.role,
    }));

    const firstName = talent.first_name || talent.name.split(" ")[0];
    const lastName = talent.last_name || talent.name.split(" ").slice(1).join(" ");
    const initials = `${firstName[0]}${lastName?.[0] || ""}`.toUpperCase();

    return (
        <>
            {/* Back link */}
            <div className="pt-24 pb-4 max-w-[1400px] mx-auto px-8 md:px-12">
                <Link
                    href="/talents"
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors no-underline"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Retour aux talents
                </Link>
            </div>

            {/* Profile Header */}
            <section className="pb-24 md:pb-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Carousel */}
                        <AnimateOnScroll>
                            <div className="max-w-lg mx-auto lg:mx-0">
                                <PhotoCarousel
                                    photos={[
                                        ...(talent.photo_url ? [talent.photo_url] : []),
                                        ...(talent.photos || []),
                                    ]}
                                    name={`${firstName} ${lastName}`}
                                    initials={initials}
                                />
                            </div>
                        </AnimateOnScroll>

                        {/* Info */}
                        <div className="flex flex-col justify-center">
                            <AnimateOnScroll delay={1}>
                                <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
                                    {talent.specialty}
                                </p>
                            </AnimateOnScroll>

                            <AnimateOnScroll delay={1}>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl mb-2">{firstName}</h1>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-muted/40">{lastName}</h1>
                            </AnimateOnScroll>

                            <AnimateOnScroll delay={2}>
                                <div className="section-divider" />
                            </AnimateOnScroll>

                            {/* Details grid */}
                            <AnimateOnScroll delay={3}>
                                <div className="grid grid-cols-2 gap-6 mb-10">
                                    {talent.age && (
                                        <div>
                                            <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">Âge</p>
                                            <p className="font-medium">{talent.age} ans</p>
                                        </div>
                                    )}
                                    {talent.height && (
                                        <div>
                                            <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">Taille</p>
                                            <p className="font-medium">{talent.height}</p>
                                        </div>
                                    )}
                                    {talent.eye_color && (
                                        <div>
                                            <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">Yeux</p>
                                            <p className="font-medium">{talent.eye_color}</p>
                                        </div>
                                    )}
                                    {talent.hair_color && (
                                        <div>
                                            <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">Cheveux</p>
                                            <p className="font-medium">{talent.hair_color}</p>
                                        </div>
                                    )}
                                </div>
                            </AnimateOnScroll>

                            {/* Languages */}
                            {talent.languages?.length > 0 && (
                                <AnimateOnScroll delay={4}>
                                    <div className="mb-8">
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">Langues</p>
                                        <div className="flex flex-wrap gap-2">
                                            {talent.languages.map((lang: string) => (
                                                <span key={lang} className="px-3 py-1 border border-border text-sm">{lang}</span>
                                            ))}
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            )}

                            {/* Skills */}
                            {talent.skills?.length > 0 && (
                                <AnimateOnScroll delay={4}>
                                    <div className="mb-10">
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">Compétences</p>
                                        <div className="flex flex-wrap gap-2">
                                            {talent.skills.map((skill: string) => (
                                                <span key={skill} className="px-3 py-1 bg-surface text-sm">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            )}

                            {/* Projects */}
                            {talentProjects.length > 0 && (
                                <AnimateOnScroll delay={5}>
                                    <div className="mb-10">
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">Projets</p>
                                        <div className="flex flex-col gap-2">
                                            {talentProjects.map((project: any) => (
                                                <Link key={project.id} href={`/projets/${project.id}`}
                                                    className="text-sm no-underline hover:text-muted transition-colors flex items-center gap-2">
                                                    <span>—</span>
                                                    <span>{project.title}</span>
                                                    {project.role && <span className="text-muted text-xs">({project.role})</span>}
                                                    {project.year && <span className="text-muted text-xs">{project.year}</span>}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            )}

                            {/* Description */}
                            {talent.description && (
                                <AnimateOnScroll delay={5}>
                                    <div className="text-muted leading-relaxed text-lg mb-10 flex flex-col gap-4">
                                        {(talent.description || "").split("\n").filter(Boolean).map((line: string, i: number) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>
                                </AnimateOnScroll>
                            )}

                            {/* CTA */}
                            <AnimateOnScroll delay={6}>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Link href="/contact" className="btn-primary w-fit">
                                        <span>Contacter l&apos;agence</span>
                                    </Link>
                                    <TalentCVButton talent={{
                                        firstName,
                                        lastName,
                                        specialty: talent.specialty,
                                        age: talent.age,
                                        height: talent.height,
                                        eyeColor: talent.eye_color,
                                        hairColor: talent.hair_color,
                                        gender: talent.gender,
                                        languages: talent.languages || [],
                                        skills: talent.skills || [],
                                        description: talent.description,
                                        photoUrl: talent.photo_url,
                                        projects: talentProjects,
                                    }} />
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
