import type { Metadata } from "next";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import ContactForm from "./ContactForm";
import { SOCIAL_LINKS } from "@/lib/social";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contactez Iconik Agency pour toute demande de casting, inscription de talent ou collaboration.",
    alternates: { canonical: "https://www.iconikagency.fr/contact" },
    openGraph: {
        type: "website",
        url: "https://www.iconikagency.fr/contact",
        title: "Contact | Iconik Agency",
        description: "Contactez Iconik Agency pour toute demande de casting, inscription de talent ou collaboration.",
        images: [{ url: "/assets/_69A7114.jpg", width: 1200, height: 630, alt: "Iconik Agency" }],
    },
    twitter: {
        card: "summary",
        title: "Contact | Iconik Agency",
        description: "Contactez Iconik Agency pour toute demande de casting ou collaboration.",
    },
};

export default function ContactPage() {
    return (
        <>
            {/* Header */}
            <section className="page-header bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                        Parlons ensemble
                    </p>
                    <h1 className="text-5xl md:text-7xl mb-6">Contact</h1>
                    <div className="section-divider" />
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Form */}
                        <div>
                            <AnimateOnScroll>
                                <h2 className="text-3xl md:text-4xl mb-8">
                                    Envoyez-nous un message
                                </h2>
                            </AnimateOnScroll>
                            <ContactForm />
                        </div>

                        {/* Info */}
                        <div>
                            <AnimateOnScroll delay={1}>
                                <div className="mb-12">
                                    <h3 className="text-2xl mb-6">Informations</h3>
                                    <div className="section-divider" />
                                </div>
                            </AnimateOnScroll>

                            <div className="flex flex-col gap-10">
                                <AnimateOnScroll delay={2}>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                            Adresse
                                        </p>
                                        <p className="leading-relaxed">
                                            Mantes-la-Jolie, France
                                        </p>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll delay={3}>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                            Email
                                        </p>
                                        <a
                                            href="mailto:hello@iconikagency.fr"
                                            className="text-foreground no-underline hover:opacity-70 transition-opacity"
                                        >
                                            hello@iconikagency.fr
                                        </a>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll delay={3}>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                            Téléphone
                                        </p>
                                        <a
                                            href="tel:+33756899078"
                                            className="text-foreground no-underline hover:opacity-70 transition-opacity"
                                        >
                                            +33 7 56 89 90 78
                                        </a>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll delay={4}>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
                                            Réseaux sociaux
                                        </p>
                                        <div className="flex gap-6">
                                            {SOCIAL_LINKS.filter(s => s.href).map((social) => (
                                                <a
                                                    key={social.label}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-foreground no-underline hover:opacity-70 transition-opacity border-b border-foreground pb-[2px]"
                                                >
                                                    {social.label}
                                                </a>
                                            ))}
                                            {SOCIAL_LINKS.every(s => !s.href) && (
                                                <p className="text-sm text-muted">À venir</p>
                                            )}
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
