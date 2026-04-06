import type { Metadata } from "next";
import { team } from "@/app/data/team";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Équipe",
    description:
        "Rencontrez l'équipe d'Iconik Agency : des professionnels passionnés au service des jeunes talents du spectacle.",
};

export default function EquipePage() {
    return (
        <>
            {/* Header */}
            <section className="page-header bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                        Les Visages de l&apos;Agence
                    </p>
                    <h1 className="text-5xl md:text-7xl mb-6">Équipe</h1>
                    <div className="section-divider" />
                    <p className="text-muted leading-relaxed max-w-xl text-lg mt-6">
                        Derrière chaque talent, une équipe dévouée qui travaille dans
                        l&apos;ombre pour créer la lumière.
                    </p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
                        {team.map((member, index) => (
                            <AnimateOnScroll
                                key={member.name}
                                delay={((index % 2) + 1) as 1 | 2}
                            >
                                <div className="group">
                                    <div className="photo-placeholder aspect-[3/4] w-full mb-8 group-hover:opacity-90 transition-opacity">
                                        <span className="relative z-10 text-4xl md:text-5xl">
                                            {member.initials}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                            {member.role}
                                        </p>
                                        <h2 className="text-2xl md:text-3xl mb-4">{member.name}</h2>
                                        <div className="section-divider" />
                                        <p className="text-muted leading-relaxed mt-4">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join CTA */}
            <section className="py-24 md:py-32 bg-surface">
                <div className="max-w-[800px] mx-auto px-8 md:px-12 text-center">
                    <AnimateOnScroll>
                        <h2 className="text-3xl md:text-4xl mb-6">
                            Rejoindre notre équipe
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={1}>
                        <p className="text-muted leading-relaxed mb-8 text-lg">
                            Vous partagez notre passion pour les jeunes talents et le monde
                            du spectacle ? Nous sommes toujours à la recherche de
                            collaborateurs passionnés.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={2}>
                        <Link href="/contact" className="btn-primary">
                            <span>Candidater</span>
                        </Link>
                    </AnimateOnScroll>
                </div>
            </section>
        </>
    );
}
