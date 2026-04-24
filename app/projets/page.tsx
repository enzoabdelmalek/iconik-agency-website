import type { Metadata } from "next";
import Link from "next/link";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export const metadata: Metadata = {
    title: "Projets",
    description:
        "Découvrez les films, séries, publicités et pièces de théâtre auxquels ont participé les talents d'Iconik Agency.",
};

interface Talent {
    id: string;
    slug: string | null;
    name: string;
    first_name: string | null;
    last_name: string | null;
}

interface Project {
    id: string;
    title: string;
    type: string | null;
    year: number | null;
    description: string | null;
    photo_url: string | null;
    people_projects: { people: Talent }[];
}

export default async function ProjetsPage() {
    const { data: projects } = await supabase
        .from("projects")
        .select("id, title, type, year, description, photo_url, people_projects(people(id, slug, name, first_name, last_name))")
        .eq("business_id", BUSINESS_ID)
        .neq("active", false)
        .order("year", { ascending: false })
        .order("display_order", { ascending: true });

    return (
        <>
            {/* Header */}
            <section className="page-header bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                        Nos Réalisations
                    </p>
                    <h1 className="text-5xl md:text-7xl mb-6">Projets</h1>
                    <div className="section-divider" />
                    <p className="text-muted leading-relaxed max-w-xl text-lg mt-6">
                        Films, séries, publicités, théâtre — nos talents brillent sur tous
                        les écrans et toutes les scènes.
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    {!projects || projects.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 py-24 text-center">
                            <svg className="w-10 h-10 text-muted/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-11.25A1.125 1.125 0 0 1 3.375 7.5h17.25c.621 0 1.125.504 1.125 1.125v11.25m-18.375 0h18.375M6 18.375V7.5m12 10.875V7.5" />
                            </svg>
                            <p className="text-muted">Aucun projet pour le moment.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-20 md:gap-28">
                            {(projects as unknown as Project[]).map((project, index) => (
                                <AnimateOnScroll key={project.id}>
                                    <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center group">
                                        {/* Image */}
                                        <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                                            <Link href={`/projets/${project.id}`} className="block no-underline project-card">
                                                <div className="aspect-[16/10] w-full overflow-hidden bg-surface relative">
                                                    {project.photo_url ? (
                                                        <img
                                                            src={project.photo_url}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="photo-placeholder w-full h-full">
                                                            <span className="relative z-10 text-4xl font-serif">
                                                                {project.title[0]}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Info */}
                                        <div className={index % 2 === 1 ? "lg:order-1" : ""}>
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
                                            <Link href={`/projets/${project.id}`} className="no-underline">
                                                <h2 className="text-3xl md:text-4xl mb-4 hover:text-muted transition-colors">
                                                    {project.title}
                                                </h2>
                                            </Link>
                                            {project.description && (
                                                <>
                                                    <div className="section-divider" />
                                                    <p className="text-muted leading-relaxed mt-6 line-clamp-3">
                                                        {project.description}
                                                    </p>
                                                </>
                                            )}
                                            {project.people_projects?.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-6">
                                                    {project.people_projects.map(({ people: t }) => {
                                                        const name = t.first_name && t.last_name
                                                            ? `${t.first_name} ${t.last_name}`
                                                            : t.name;
                                                        return (
                                                            <Link key={t.id} href={`/talents/${t.slug || t.id}`}
                                                                className="text-xs tracking-[0.05em] px-3 py-1 border border-border text-muted hover:text-foreground hover:border-foreground transition-colors no-underline">
                                                                {name}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                            <Link href={`/projets/${project.id}`}
                                                className="block text-xs tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors no-underline mt-6">
                                                Voir le projet →
                                            </Link>
                                        </div>
                                    </article>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
