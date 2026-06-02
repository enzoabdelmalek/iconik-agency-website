import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export const metadata: Metadata = {
    title: "Iconik Tour",
    description:
        "L'Iconik Tour est la seule voie pour intégrer Iconik Agency. Un dispositif de détection itinérante de talents, au cœur des territoires.",
    alternates: { canonical: "https://www.iconikagency.fr/iconik-tour" },
    openGraph: {
        type: "website",
        url: "https://www.iconikagency.fr/iconik-tour",
        title: "Iconik Tour | Iconik Agency",
        description: "L'Iconik Tour est la seule voie pour intégrer Iconik Agency. Un dispositif de détection itinérante de talents, au cœur des territoires.",
        images: [{ url: "/assets/_69A7006.jpg", width: 1200, height: 630, alt: "Iconik Tour — session de détection de talents" }],
    },
    twitter: {
        card: "summary",
        title: "Iconik Tour | Iconik Agency",
        description: "Détection itinérante de talents — la seule voie pour intégrer Iconik Agency.",
    },
};

const steps = [
    {
        number: "01",
        title: "Des sessions en présentiel",
        desc: "Des castings et auditions organisés en continu, au cœur des territoires. Pas de profil type, pas d'expérience requise. Une seule exigence : l'envie.",
    },
    {
        number: "02",
        title: "Face à un jury de professionnels",
        desc: "Chaque jeune a l'espace pour se révéler, s'exprimer, et peut-être découvrir une passion qu'il ne savait pas encore nommer.",
    },
    {
        number: "03",
        title: "La sélection",
        desc: "Les talents retenus intègrent Iconik Agency. C'est le début d'une aventure qui peut tout changer.",
    },
    {
        number: "04",
        title: "L'accompagnement",
        desc: "Suivi personnalisé, projets concrets, protection et cadre bienveillant — parce que derrière chaque talent, il y a un enfant à protéger.",
    },
];

const chiffres = [
    { num: "300", label: "participants à la première édition" },
    { num: "30", label: "talents sélectionnés par le jury" },
    { num: "2023", label: "année de lancement" },
];

export default function IkonikTourPage() {
    return (
        <>
            {/* Header */}
            <section className="page-header bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                        Dispositif de détection
                    </p>
                    <h1 className="text-5xl md:text-7xl mb-6">Iconik Tour ©</h1>
                    <div className="section-divider" />
                    <p className="text-muted leading-relaxed max-w-xl text-lg mt-6">
                        À la rencontre des talents cachés.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <AnimateOnScroll>
                                <h2 className="text-3xl md:text-4xl mb-8">
                                    Bien plus<br />qu&apos;un casting
                                </h2>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={1}>
                                <p className="text-muted leading-relaxed mb-6 text-lg">
                                    L&apos;Iconik Tour est une main tendue vers ceux qui n&apos;osent pas encore. Ce dispositif est la seule voie pour intégrer Iconik Agency — et le point de départ d&apos;une aventure qui peut tout changer.
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={2}>
                                <p className="text-muted leading-relaxed mb-6">
                                    L&apos;industrie du cinéma fonctionne. Les opportunités existent. Mais combien de jeunes talents ne franchissent jamais la porte, faute de structure près de chez eux ? Faute de quelqu&apos;un pour leur dire &quot;toi aussi, tu as ta place ici&quot; ?
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={3}>
                                <p className="text-muted leading-relaxed">
                                    Dans nos territoires, ces jeunes sont là. Ils ont le feu, l&apos;imagination, le potentiel. Ce qui leur manque, c&apos;est un espace pour s&apos;exprimer. C&apos;est exactement ce que nous allons chercher.
                                </p>
                            </AnimateOnScroll>
                        </div>

                        <div>
                            <AnimateOnScroll delay={2}>
                                <div className="aspect-[4/5] w-full overflow-hidden relative">
                                    <Image
                                        src="/assets/_69A7006.jpg"
                                        alt="Iconik Tour — jeune talent en audition"
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

            {/* Chiffres */}
            <section className="py-16 bg-foreground text-background">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-background/10">
                        {chiffres.map((c, i) => (
                            <AnimateOnScroll key={c.num} delay={(i + 1) as 1 | 2 | 3}>
                                <div className="text-center md:px-12">
                                    <p className="font-serif text-5xl md:text-6xl text-background mb-3">{c.num}</p>
                                    <p className="text-xs tracking-[0.15em] uppercase text-background/50">{c.label}</p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Galerie */}
            <section className="py-16 md:py-24">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { src: "/assets/_69A6963.jpg", alt: "Le jury Iconik Tour" },
                            { src: "/assets/_69A7006.jpg", alt: "Un talent en audition" },
                            { src: "/assets/_69A7025.jpg", alt: "Le jury en discussion" },
                            { src: "/assets/_69A7114.jpg", alt: "Session de casting Iconik Tour" },
                        ].map((photo, i) => (
                            <AnimateOnScroll key={photo.src} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                                <div className="aspect-square overflow-hidden relative">
                                    <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pourquoi les moins de 18 ans */}
            <section className="py-24 md:py-32 bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="max-w-3xl">
                        <AnimateOnScroll>
                            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                                Notre conviction profonde
                            </p>
                            <h2 className="text-3xl md:text-4xl mb-8">
                                Pourquoi les moins de 18 ans ?
                            </h2>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={1}>
                            <p className="text-muted leading-relaxed mb-6">
                                Ce n&apos;est pas un hasard. C&apos;est un choix profond et réfléchi. L&apos;enfance et l&apos;adolescence sont les âges charnières où tout se joue : la confiance en soi se construit ou se brise. C&apos;est à cet âge que les rêves sont encore intacts et que la créativité est débordante.
                            </p>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={2}>
                            <p className="text-muted leading-relaxed mb-6">
                                L&apos;industrie du cinéma n&apos;attend pas. Les opportunités sont réelles, mais elles profitent majoritairement à ceux qui ont déjà été repérés, accompagnés, préparés. Rarement aux enfants de nos territoires, qui n&apos;ont ni le réseau, ni la structure, ni parfois même l&apos;idée que c&apos;est possible pour eux.
                            </p>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={3}>
                            <p className="text-muted leading-relaxed">
                                En allant chercher ces jeunes tôt, nous faisons bien plus que détecter des talents. Nous plantons une graine de confiance — où chaque jeune détecté est accompagné, protégé et préparé à entrer dans l&apos;industrie dans les meilleures conditions.
                            </p>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>

            {/* Comment ça se passe */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <AnimateOnScroll>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                            Le processus
                        </p>
                        <h2 className="text-3xl md:text-4xl mb-16">Comment ça se passe ?</h2>
                    </AnimateOnScroll>

                    <div className="flex flex-col gap-0">
                        {steps.map((step, index) => (
                            <AnimateOnScroll key={step.number} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                                <div className="flex gap-6 md:gap-12 items-start py-10 border-t border-border">
                                    <span className="text-xs tracking-[0.1em] text-muted w-8 shrink-0 pt-1">{step.number}</span>
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-serif mb-3">{step.title}</h3>
                                        <p className="text-muted leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        ))}
                        <div className="border-t border-border" />
                    </div>
                </div>
            </section>

            {/* Après la sélection */}
            <section className="py-24 md:py-32 bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <AnimateOnScroll>
                                <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                                    Après la sélection
                                </p>
                                <h2 className="text-3xl md:text-4xl mb-8">
                                    L&apos;aventure<br />commence vraiment
                                </h2>
                            </AnimateOnScroll>
                            <AnimateOnScroll delay={1}>
                                <p className="text-muted leading-relaxed mb-8">
                                    Les jeunes talents retenus intègrent Iconik Agency et bénéficient d&apos;un accompagnement complet, structuré et humain.
                                </p>
                            </AnimateOnScroll>
                            <div className="flex flex-col gap-6">
                                {[
                                    { title: "Suivi personnalisé", desc: "Un accompagnement à chaque étape de leur parcours." },
                                    { title: "Projets concrets", desc: "Participation à des productions réelles pour construire leur expérience." },
                                    { title: "Protection et cadre bienveillant", desc: "Parce que derrière chaque talent, il y a un enfant à protéger." },
                                ].map((item, i) => (
                                    <AnimateOnScroll key={item.title} delay={((i + 2) as 1 | 2 | 3 | 4)}>
                                        <div className="flex gap-4 items-start">
                                            <div className="w-6 h-6 border border-foreground flex items-center justify-center shrink-0 mt-0.5">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium mb-1">{item.title}</h3>
                                                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </AnimateOnScroll>
                                ))}
                            </div>
                            <AnimateOnScroll delay={4}>
                                <p className="text-sm tracking-[0.1em] uppercase text-muted mt-8 border-t border-border pt-8">
                                    Notre engagement : ne jamais laisser un talent seul face à l&apos;industrie.
                                </p>
                            </AnimateOnScroll>
                        </div>

                        <AnimateOnScroll delay={2}>
                            <div className="aspect-[4/5] w-full overflow-hidden relative">
                                <Image
                                    src="/assets/_69A7025.jpg"
                                    alt="Iconik Tour — le jury en action"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>

            {/* Un mot pour les parents */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="max-w-3xl">
                        <AnimateOnScroll>
                            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                                Pour les parents
                            </p>
                            <h2 className="text-3xl md:text-4xl mb-8">
                                Un mot pour les parents
                            </h2>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={1}>
                            <p className="text-muted leading-relaxed mb-6">
                                Confier son enfant à une structure, c&apos;est une décision qui ne se prend pas à la légère. Nous le savons. Nous le respectons.
                            </p>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={2}>
                            <p className="text-muted leading-relaxed mb-6">
                                Chez Iconik Agency, votre enfant ne sera jamais un simple numéro. Chaque jeune est suivi, encadré et accompagné dans un environnement sécurisé, bienveillant et professionnel.
                            </p>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={3}>
                            <p className="text-muted leading-relaxed">
                                Notre rôle n&apos;est pas seulement de faire émerger des talents pour le cinéma. C&apos;est aussi de contribuer à construire des jeunes confiants, épanouis et armés — que le cinéma devienne leur métier ou non.
                            </p>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>

            {/* Quote finale */}
            <section className="py-24 md:py-32 bg-foreground text-background">
                <div className="max-w-[900px] mx-auto px-8 md:px-12 text-center">
                    <AnimateOnScroll>
                        <p className="font-serif text-2xl md:text-4xl leading-snug text-background italic">
                            &ldquo;Les talents cachés n&apos;attendent qu&apos;une chose : qu&apos;on aille les chercher là où ils sont. L&apos;Iconik Tour, c&apos;est cette promesse mise en action.&rdquo;
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={2}>
                        <p className="mt-8 text-sm tracking-[0.15em] uppercase text-background/50">
                            Aïssata Diaw — Fondatrice d&apos;Iconik Agency
                        </p>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 md:py-32">
                <div className="max-w-[800px] mx-auto px-8 md:px-12 text-center">
                    <AnimateOnScroll>
                        <h2 className="text-3xl md:text-4xl mb-6">
                            Votre enfant a le feu ?
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={1}>
                        <p className="text-muted mb-8 text-lg">
                            Contactez-nous pour en savoir plus sur les prochaines dates de l&apos;Iconik Tour près de chez vous.
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
