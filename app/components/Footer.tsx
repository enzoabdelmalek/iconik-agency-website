import Link from "next/link";

const navLinks = [
    { href: "/talents", label: "Talents" },
    { href: "/projets", label: "Projets" },
    { href: "/a-propos", label: "À propos" },
    { href: "/equipe", label: "Équipe" },
    { href: "/actualites", label: "Actualités" },
    { href: "/contact", label: "Contact" },
];

export default function Footer() {
    return (
        <footer className="bg-foreground text-background">
            {/* ─── Top: Brand ─── */}
            <div className="max-w-[1400px] mx-auto px-8 md:px-12 pt-24 pb-16">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16">
                    {/* Left: Brand block */}
                    <div className="max-w-md">
                        <Link
                            href="/"
                            className="font-serif text-4xl md:text-5xl tracking-[0.06em] text-background no-underline block mb-6"
                        >
                            ICONIK
                        </Link>
                        <p className="text-sm leading-relaxed text-background/50">
                            Agence parisienne dédiée aux jeunes comédiens.
                            <br />
                            Nous révélons et accompagnons les talents de demain
                            pour le cinéma, la télévision et le théâtre.
                        </p>
                    </div>

                    {/* Right: Nav + Contact grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-20">
                        {/* Navigation */}
                        <div>
                            <p className="text-[0.6875rem] font-sans font-medium tracking-[0.2em] uppercase mb-6 text-background/30">
                                Pages
                            </p>
                            <nav className="flex flex-col gap-[0.875rem]">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-[0.9375rem] text-background/60 no-underline hover:text-background transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="text-[0.6875rem] font-sans font-medium tracking-[0.2em] uppercase mb-6 text-background/30">
                                Contact
                            </p>
                            <div className="flex flex-col gap-5 text-[0.9375rem] text-background/60">
                                <a
                                    href="mailto:contact@iconik-agency.com"
                                    className="no-underline text-background/60 hover:text-background transition-colors duration-300"
                                >
                                    contact@iconik-agency.com
                                </a>
                                <a
                                    href="tel:+33142000000"
                                    className="no-underline text-background/60 hover:text-background transition-colors duration-300"
                                >
                                    +33 1 42 00 00 00
                                </a>
                                <p className="leading-relaxed">
                                    12 Rue du Faubourg Saint-Honoré
                                    <br />
                                    75008 Paris, France
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Bottom bar ─── */}
            <div className="border-t border-background/10">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-7 flex flex-col md:flex-row items-center justify-between gap-5">
                    {/* Copyright */}
                    <p className="text-[0.75rem] text-background/35 tracking-[0.02em]">
                        © {new Date().getFullYear()} Iconik Agency. Tous droits réservés.
                    </p>

                    {/* Social + Legal */}
                    <div className="flex items-center gap-8">
                        {["Instagram", "LinkedIn", "Vimeo"].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-[0.75rem] text-background/35 no-underline hover:text-background/70 transition-colors duration-300 tracking-[0.04em]"
                            >
                                {social}
                            </a>
                        ))}
                        <span className="w-[1px] h-3 bg-background/15" />
                        <Link
                            href="/mentions-legales"
                            className="text-[0.75rem] text-background/35 no-underline hover:text-background/70 transition-colors duration-300 tracking-[0.04em]"
                        >
                            Mentions légales
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
