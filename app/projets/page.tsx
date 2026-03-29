import type { Metadata } from "next";
import { projects } from "@/app/data/projects";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export const metadata: Metadata = {
    title: "Projets",
    description:
        "Découvrez les films, séries, publicités et pièces de théâtre auxquels ont participé les talents d'Iconik Agency.",
};

export default function ProjetsPage() {
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

            {/* Projects List */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="flex flex-col gap-20 md:gap-28">
                        {projects.map((project, index) => (
                            <AnimateOnScroll key={project.slug}>
                                <article
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index % 2 === 1 ? "lg:direction-rtl" : ""
                                        }`}
                                >
                                    {/* Image */}
                                    <div
                                        className={`${index % 2 === 1 ? "lg:order-2" : ""
                                            }`}
                                    >
                                        <div className="project-card">
                                            <div className="photo-placeholder-dark photo-placeholder project-image aspect-[16/10] w-full">
                                                <span className="relative z-10 text-4xl">
                                                    {project.initials}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div
                                        className={`${index % 2 === 1 ? "lg:order-1" : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-xs tracking-[0.1em] uppercase text-muted px-3 py-1 border border-border">
                                                {project.type}
                                            </span>
                                            <span className="text-xs tracking-[0.1em] text-muted">
                                                {project.year}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl mb-2">
                                            {project.title}
                                        </h2>
                                        <p className="text-sm text-muted mb-6">
                                            Réalisation : {project.director}
                                        </p>
                                        <div className="section-divider" />
                                        <p className="text-muted leading-relaxed mb-8 mt-6">
                                            {project.description}
                                        </p>

                                        {/* Talents involved */}
                                        <div>
                                            <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
                                                Talents Iconik
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.talents.map((name) => (
                                                    <span
                                                        key={name}
                                                        className="px-3 py-1 bg-surface text-sm"
                                                    >
                                                        {name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
