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
        .select("id")
        .eq("business_id", BUSINESS_ID)
        .eq("active", true);
    return (data || []).map(t => ({ slug: t.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { data: talent } = await supabase
        .from("people")
        .select("name, first_name, last_name, description")
        .eq("id", slug)
        .single();
    if (!talent) return {};
    const fullName = talent.first_name && talent.last_name
        ? `${talent.first_name} ${talent.last_name}`
        : talent.name;
    return {
        title: fullName,
        description: talent.description?.slice(0, 160) || "",
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
        .eq("id", slug)
        .eq("business_id", BUSINESS_ID)
        .single();

    if (!talent) notFound();

    const { data: projectAssignments } = await supabase
        .from("people_projects")
        .select("role, projects(id, title, type, year, photo_url)")
        .eq("person_id", slug);

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
                                {talent.photo_url ? (
                                    <img src={talent.photo_url} alt={talent.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="relative z-10 text-5xl md:text-6xl">{initials}</span>
                                )}
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

                            <AnimateOnScroll delay={2}>
                                <p className="text-muted leading-relaxed text-lg mb-10">
                                    {talent.description}
                                </p>
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

                            {/* CTA */}
                            <AnimateOnScroll delay={5}>
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

            {/* Gallery */}
            {talent.photos?.length > 0 && (
                <section className="py-24 md:py-32 bg-surface">
                    <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                        <AnimateOnScroll>
                            <h2 className="text-3xl md:text-4xl mb-12">Book photo</h2>
                        </AnimateOnScroll>
                        <div className="max-w-lg mx-auto lg:mx-0">
                            <PhotoCarousel photos={talent.photos} name={`${firstName} ${lastName}`} />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
