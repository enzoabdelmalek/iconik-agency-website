import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export const metadata: Metadata = {
    title: "À propos",
    description:
        "Découvrez l'histoire d'Iconik Agency, née en 2023 d'un constat terrain : révéler, protéger et sublimer les talents du cinéma partout en France.",
    alternates: { canonical: "https://www.iconikagency.fr/a-propos" },
    openGraph: {
        type: "website",
        url: "https://www.iconikagency.fr/a-propos",
        title: "À propos | Iconik Agency",
        description: "Découvrez l'histoire d'Iconik Agency, née en 2023 d'un constat terrain : révéler, protéger et sublimer les talents du cinéma partout en France.",
        images: [{ url: "/assets/0e9e52d9-306c-4d77-8cb6-b59cfae2c936.jpg", width: 1200, height: 630, alt: "Aïssata Diaw — Fondatrice d'Iconik Agency" }],
    },
    twitter: {
        card: "summary",
        title: "À propos | Iconik Agency",
        description: "Iconik Agency — révéler, protéger et sublimer les talents du cinéma.",
    },
};

const values = [
    {
        number: "01",
        title: "Exigence",
        description:
            "Nous maintenons les plus hauts standards de qualité dans la sélection et l'accompagnement de nos talents. Chaque comédien est préparé avec rigueur pour briller dans les plus grandes productions.",
    },
    {
        number: "02",
        title: "Bienveillance",
        description:
            "Le bien-être de nos jeunes comédiens est notre priorité absolue. Nous créons un environnement de confiance où chacun peut s'épanouir, grandir et exprimer pleinement son potentiel artistique.",
    },
    {
        number: "03",
        title: "Authenticité",
        description:
            "Nous célébrons la singularité de chaque talent. Pas de moule, pas de formatage : nous révélons ce qui rend chaque comédien unique et irremplaçable.",
    },
    {
        number: "04",
        title: "Engagement",
        description:
            "Notre engagement va au-delà du simple placement. Nous accompagnons nos talents dans leur développement artistique, leur formation continue et la construction d'une carrière durable.",
    },
];

export default function AProposPage() {
    return (
        <>
            {/* Header */}
            <section className="page-header bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                        Notre Histoire
                    </p>
                    <h1 className="text-5xl md:text-7xl mb-6">À propos</h1>
                    <div className="section-divider" />
                </div>
            </section>

            {/* Story */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        <div>
                            <AnimateOnScroll>
                                <h2 className="text-3xl md:text-4xl mb-8">
                                    Une conviction,<br />
                                    une naissance
                                </h2>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={1}>
                                <p className="text-muted leading-relaxed mb-6 text-lg">
                                    Iconik Agency est née en 2023 d&apos;un constat simple fait sur le terrain : les talents existent partout, mais les structures pour les accompagner sont rares, notamment en dehors de Paris.
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={2}>
                                <p className="text-muted leading-relaxed mb-6">
                                    Fondée par Aïssata Diaw, l&apos;agence s&apos;est construite avec une mission claire : révéler, protéger et sublimer les talents du cinéma, aussi bien devant que derrière la caméra.
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={3}>
                                <p className="text-muted leading-relaxed mb-6">
                                    Avant de structurer l&apos;agence, nous nous sommes formés en travaillant sur des projets réels — direction de casting, gestion de tournages, rencontres avec des professionnels du secteur. C&apos;est en étant au cœur de l&apos;industrie que nous avons construit notre réseau et affûté notre regard pour détecter les vrais talents.
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={4}>
                                <div className="border-l-2 border-foreground pl-6 mt-8">
                                    <p className="text-sm tracking-[0.15em] uppercase text-muted mb-4">L&apos;Iconik Tour — Juillet 2023</p>
                                    <div className="flex flex-col gap-3">
                                        {[
                                            "300 participants",
                                            "30 talents sélectionnés par un jury de professionnels",
                                            "Premiers projets réalisés",
                                        ].map((item) => (
                                            <div key={item} className="flex items-start gap-3">
                                                <span className="w-1 h-1 rounded-full bg-foreground mt-2 shrink-0" />
                                                <p className="text-muted leading-relaxed">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>

                        <div>
                            <AnimateOnScroll delay={2}>
                                <div className="aspect-[4/5] w-full overflow-hidden relative">
                                    <Image
                                        src="/assets/_69A7006.jpg"
                                        alt="Iconik Tour — audition"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Quote */}
            <section className="py-24 md:py-32 bg-foreground text-background">
                <div className="max-w-[900px] mx-auto px-8 md:px-12 text-center">
                    <AnimateOnScroll>
                        <p className="font-serif text-2xl md:text-4xl leading-snug text-background italic">
                            &ldquo;Le cinéma ne devrait pas être réservé à quelques privilégiés. Notre rôle : révéler le potentiel de chaque personne, partout où il se trouve.&rdquo;
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={2}>
                        <p className="mt-8 text-sm tracking-[0.15em] uppercase text-background/50">
                            Aïssata Diaw — Fondatrice d&apos;Iconik Agency
                        </p>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <AnimateOnScroll>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                            Ce qui nous guide
                        </p>
                        <h2 className="text-3xl md:text-4xl mb-16">Nos valeurs</h2>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        {values.map((value, index) => (
                            <AnimateOnScroll
                                key={value.number}
                                delay={(index + 1) as 1 | 2 | 3 | 4}
                            >
                                <div className="border-t border-border pt-8">
                                    <span className="text-xs tracking-[0.1em] text-muted">
                                        {value.number}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl mt-4 mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-muted leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fondatrice */}
            <section className="py-24 md:py-32 bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <AnimateOnScroll>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                            La Fondatrice
                        </p>
                        <h2 className="text-3xl md:text-4xl mb-16">Derrière Iconik</h2>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
                        <AnimateOnScroll delay={1}>
                            <div className="aspect-[3/4] w-full overflow-hidden relative">
                                <Image
                                    src="/assets/0e9e52d9-306c-4d77-8cb6-b59cfae2c936.jpg"
                                    alt="Aïssata Diaw — Fondatrice d'Iconik Agency"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={2}>
                            <div className="flex flex-col justify-center h-full">
                                <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
                                    Fondatrice & Directrice
                                </p>
                                <h3 className="text-3xl md:text-4xl mb-6">Aïssata Diaw</h3>
                                <div className="section-divider" />
                                <p className="text-muted leading-relaxed mt-6 mb-4">
                                    Aïssata a fondé Iconik avec la conviction que le talent n&apos;attend pas le nombre des années. Son regard aiguisé, sa bienveillance et sa rigueur sont au cœur de l&apos;identité de l&apos;agence.
                                </p>
                                <p className="text-muted leading-relaxed">
                                    Formée sur le terrain — direction de casting, gestion de tournages, immersion dans les réseaux professionnels — elle a construit Iconik Agency pierre par pierre, avec une ambition claire : que le cinéma ne soit plus réservé à quelques-uns.
                                </p>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 md:py-32">
                <div className="max-w-[800px] mx-auto px-8 md:px-12 text-center">
                    <AnimateOnScroll>
                        <h2 className="text-3xl md:text-4xl mb-6">
                            Vous voulez en savoir plus sur l&apos;Iconik Tour ?
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={1}>
                        <p className="text-muted mb-8 text-lg">
                            L&apos;Iconik Tour est la seule voie pour intégrer Iconik Agency. Découvrez comment ça fonctionne.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={2}>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link href="/iconik-tour" className="btn-primary">
                                <span>Découvrir l&apos;Iconik Tour</span>
                            </Link>
                            <Link href="/contact" className="btn-outline">
                                <span>Nous contacter</span>
                            </Link>
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>
        </>
    );
}
