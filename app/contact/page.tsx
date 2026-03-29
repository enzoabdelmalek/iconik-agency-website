"use client";

import { useState } from "react";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // In production, send to API
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

                            {isSubmitted ? (
                                <AnimateOnScroll>
                                    <div className="py-16 text-center">
                                        <div className="w-16 h-16 border-2 border-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg
                                                className="w-8 h-8"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl mb-3">Message envoyé</h3>
                                        <p className="text-muted">
                                            Merci pour votre message. Nous vous répondrons dans les
                                            plus brefs délais.
                                        </p>
                                    </div>
                                </AnimateOnScroll>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-8">
                                        <AnimateOnScroll delay={1}>
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block"
                                                >
                                                    Nom complet *
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    className="form-input"
                                                    placeholder="Votre nom"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </AnimateOnScroll>

                                        <AnimateOnScroll delay={2}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block"
                                                    >
                                                        Email *
                                                    </label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        className="form-input"
                                                        placeholder="votre@email.com"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="phone"
                                                        className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block"
                                                    >
                                                        Téléphone
                                                    </label>
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        className="form-input"
                                                        placeholder="+33 6 00 00 00 00"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </AnimateOnScroll>

                                        <AnimateOnScroll delay={3}>
                                            <div>
                                                <label
                                                    htmlFor="subject"
                                                    className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block"
                                                >
                                                    Objet *
                                                </label>
                                                <select
                                                    id="subject"
                                                    name="subject"
                                                    required
                                                    className="form-input cursor-pointer"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Choisir un objet</option>
                                                    <option value="casting">Proposition de casting</option>
                                                    <option value="inscription">
                                                        Inscription d&apos;un talent
                                                    </option>
                                                    <option value="collaboration">
                                                        Collaboration / Partenariat
                                                    </option>
                                                    <option value="presse">Demande presse</option>
                                                    <option value="autre">Autre</option>
                                                </select>
                                            </div>
                                        </AnimateOnScroll>

                                        <AnimateOnScroll delay={4}>
                                            <div>
                                                <label
                                                    htmlFor="message"
                                                    className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block"
                                                >
                                                    Message *
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    className="form-input"
                                                    placeholder="Votre message..."
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </AnimateOnScroll>

                                        <AnimateOnScroll delay={5}>
                                            <button type="submit" className="btn-primary w-fit">
                                                <span>Envoyer le message</span>
                                            </button>
                                        </AnimateOnScroll>
                                    </div>
                                </form>
                            )}
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
                                            12 Rue du Faubourg Saint-Honoré
                                            <br />
                                            75008 Paris, France
                                        </p>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll delay={3}>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                            Email
                                        </p>
                                        <a
                                            href="mailto:contact@iconik-agency.com"
                                            className="text-foreground no-underline hover:opacity-70 transition-opacity"
                                        >
                                            contact@iconik-agency.com
                                        </a>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll delay={3}>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                            Téléphone
                                        </p>
                                        <a
                                            href="tel:+33142000000"
                                            className="text-foreground no-underline hover:opacity-70 transition-opacity"
                                        >
                                            +33 1 42 00 00 00
                                        </a>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll delay={4}>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                            Horaires
                                        </p>
                                        <p className="leading-relaxed">
                                            Lundi — Vendredi : 9h — 18h
                                            <br />
                                            Samedi : Sur rendez-vous
                                        </p>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll delay={5}>
                                    <div>
                                        <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">
                                            Réseaux sociaux
                                        </p>
                                        <div className="flex gap-6">
                                            {["Instagram", "LinkedIn", "Vimeo"].map((social) => (
                                                <a
                                                    key={social}
                                                    href="#"
                                                    className="text-sm text-foreground no-underline hover:opacity-70 transition-opacity border-b border-foreground pb-[2px]"
                                                >
                                                    {social}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            </div>

                            {/* Map placeholder */}
                            <AnimateOnScroll delay={5}>
                                <div className="mt-12 photo-placeholder aspect-[16/9] w-full">
                                    <span className="relative z-10 text-sm tracking-[0.1em] uppercase">
                                        Carte — Paris 8ème
                                    </span>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
