import type { Metadata } from "next";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export const metadata: Metadata = {
    title: "À propos",
    description:
        "Découvrez l'histoire, la philosophie et les valeurs d'Iconik Agency, agence parisienne dédiée aux jeunes comédiens.",
    alternates: { canonical: "https://www.iconikagency.fr/a-propos" },
    openGraph: {
        type: "website",
        url: "https://www.iconikagency.fr/a-propos",
        title: "À propos | Iconik Agency",
        description: "Découvrez l'histoire, la philosophie et les valeurs d'Iconik Agency, agence parisienne dédiée aux jeunes comédiens.",
    },
    twitter: {
        card: "summary",
        title: "À propos | Iconik Agency",
        description: "Découvrez l'histoire, la philosophie et les valeurs d'Iconik Agency.",
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
                                    Une agence née
                                    <br />
                                    d&apos;une passion
                                </h2>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={1}>
                                <p className="text-muted leading-relaxed mb-6 text-lg">
                                    Iconik Agency a été fondée par Aïssata Diaw avec une vision
                                    claire : créer un espace où les jeunes talents du spectacle
                                    peuvent s&apos;épanouir en toute confiance.
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={2}>
                                <p className="text-muted leading-relaxed mb-6">
                                    Forte de son expérience dans l&apos;industrie du spectacle,
                                    Aïssata a constaté un manque criant : trop de jeunes comédiens
                                    talentueux restaient dans l&apos;ombre, faute d&apos;un
                                    accompagnement adapté à leur âge et à leurs besoins.
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={3}>
                                <p className="text-muted leading-relaxed">
                                    Aujourd&apos;hui, Iconik représente une vingtaine de comédiens
                                    de 8 à 22 ans et collabore avec les plus grands noms du
                                    cinéma, de la télévision et du théâtre français. Notre
                                    approche sur-mesure et notre exigence font de nous une
                                    référence dans le milieu.
                                </p>
                            </AnimateOnScroll>
                        </div>

                        <div>
                            <AnimateOnScroll delay={2}>
                                <div className="photo-placeholder aspect-[4/5] w-full">
                                    <span className="relative z-10 text-3xl">IA</span>
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
                            &ldquo;Chaque enfant porte en lui une lumière unique. Notre rôle
                            est de créer les conditions pour qu&apos;elle brille sur les plus
                            grandes scènes.&rdquo;
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={2}>
                        <p className="mt-8 text-sm tracking-[0.15em] uppercase text-background/50">
                            Aïssata Diaw — Fondatrice
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

            {/* Approach */}
            <section className="py-24 md:py-32 bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="max-w-3xl">
                        <AnimateOnScroll>
                            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                                Notre Méthode
                            </p>
                            <h2 className="text-3xl md:text-4xl mb-8">
                                Un accompagnement sur-mesure
                            </h2>
                        </AnimateOnScroll>

                        <div className="flex flex-col gap-8">
                            {[
                                {
                                    title: "Sélection rigoureuse",
                                    desc: "Chaque talent est sélectionné pour sa singularité, sa motivation et son potentiel. Nous organisons des auditions tout au long de l'année.",
                                },
                                {
                                    title: "Formation continue",
                                    desc: "Ateliers de jeu, coaching vocal, préparation physique — nos comédiens bénéficient d'une formation complète et adaptée à leur niveau.",
                                },
                                {
                                    title: "Accompagnement personnalisé",
                                    desc: "Chaque talent est suivi individuellement par son agent référent, de la préparation des castings à la gestion de carrière.",
                                },
                                {
                                    title: "Réseau privilégié",
                                    desc: "Nos relations étroites avec les directeurs de casting, réalisateurs et producteurs ouvrent des portes exclusives à nos talents.",
                                },
                            ].map((item, i) => (
                                <AnimateOnScroll key={item.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                                    <div className="flex gap-6 items-start">
                                        <div className="w-8 h-8 flex items-center justify-center border border-foreground text-sm font-medium shrink-0 mt-1">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-xl mb-2 font-serif">{item.title}</h3>
                                            <p className="text-muted leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Fondatrice */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <AnimateOnScroll>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                            La Fondatrice
                        </p>
                        <h2 className="text-3xl md:text-4xl mb-16">Derrière Iconik</h2>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
                        <AnimateOnScroll delay={1}>
                            <div className="photo-placeholder aspect-[3/4] w-full">
                                <span className="relative z-10 text-4xl md:text-5xl">AD</span>
                            </div>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={2}>
                            <div className="flex flex-col justify-center h-full">
                                <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
                                    Fondatrice & Directrice
                                </p>
                                <h3 className="text-3xl md:text-4xl mb-6">Aïssata Diaw</h3>
                                <div className="section-divider" />
                                <p className="text-muted leading-relaxed mt-6">
                                    Aïssata a fondé Iconik avec la conviction que le talent
                                    n&apos;attend pas le nombre des années. Son regard aiguisé,
                                    sa bienveillance et sa rigueur sont au cœur de l&apos;identité
                                    de l&apos;agence.
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
                            Envie de rejoindre l&apos;aventure ?
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={1}>
                        <p className="text-muted mb-8 text-lg">
                            Que vous soyez un jeune talent en quête de représentation ou un
                            professionnel à la recherche de comédiens, contactez-nous.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={2}>
                        <Link href="/contact" className="btn-primary">
                            <span>Nous contacter</span>
                        </Link>
                    </AnimateOnScroll>
                </div>
            </section>
        </>
    );
}
