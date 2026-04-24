"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/talents", label: "Talents" },
    { href: "/projets", label: "Projets" },
    { href: "/a-propos", label: "À propos" },
    { href: "/actualites", label: "Actualités" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <>
            <header
                className={`nav-animate fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-serif text-2xl tracking-[0.08em] text-foreground no-underline"
                    >
                        ICONIK
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-[0.8125rem] font-medium tracking-[0.06em] uppercase no-underline transition-colors duration-300 ${pathname === link.href
                                    ? "text-foreground"
                                    : "text-muted hover:text-foreground"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/contact" className="btn-primary text-[0.75rem] py-2.5 px-5">
                            <span>Contact</span>
                        </Link>
                    </nav>

                    {/* Hamburger */}
                    <button
                        className={`lg:hidden flex flex-col gap-[6px] p-2 bg-transparent border-none cursor-pointer relative z-50 ${isMenuOpen ? "hamburger-open" : ""
                            }`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu backdrop */}
            {isMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-30"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={
                            pathname === link.href ? "!opacity-100 underline underline-offset-8" : ""
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link
                    href="/contact"
                    className={pathname === "/contact" ? "!opacity-100 underline underline-offset-8" : ""}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Contact
                </Link>
            </div>
        </>
    );
}
