"use client";

import { useState } from "react";
import { BUSINESS_ID } from "@/lib/supabase";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(false);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, businessId: BUSINESS_ID }),
            });
            if (!res.ok) throw new Error("api error");
            setIsSubmitted(true);
        } catch {
            setSubmitError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isSubmitted) {
        return (
            <AnimateOnScroll>
                <div className="py-16 text-center">
                    <div className="w-16 h-16 border-2 border-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl mb-3">Message envoyé</h3>
                    <p className="text-muted">
                        Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                    </p>
                </div>
            </AnimateOnScroll>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
                <AnimateOnScroll delay={1}>
                    <div>
                        <label htmlFor="name" className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block">
                            Nom complet *
                        </label>
                        <input
                            id="name" name="name" type="text" required
                            className="form-input" placeholder="Votre nom"
                            value={formData.name} onChange={handleChange}
                        />
                    </div>
                </AnimateOnScroll>

                <AnimateOnScroll delay={2}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="email" className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block">
                                Email *
                            </label>
                            <input
                                id="email" name="email" type="email" required
                                className="form-input" placeholder="votre@email.com"
                                value={formData.email} onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block">
                                Téléphone
                            </label>
                            <input
                                id="phone" name="phone" type="tel"
                                className="form-input" placeholder="+33 6 00 00 00 00"
                                value={formData.phone} onChange={handleChange}
                            />
                        </div>
                    </div>
                </AnimateOnScroll>

                <AnimateOnScroll delay={3}>
                    <div>
                        <label htmlFor="subject" className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block">
                            Objet *
                        </label>
                        <select
                            id="subject" name="subject" required
                            className="form-input cursor-pointer"
                            value={formData.subject} onChange={handleChange}
                        >
                            <option value="">Choisir un objet</option>
                            <option value="Proposition de casting">Proposition de casting</option>
                            <option value="Inscription d'un talent">Inscription d&apos;un talent</option>
                            <option value="Collaboration / Partenariat">Collaboration / Partenariat</option>
                            <option value="Demande presse">Demande presse</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                </AnimateOnScroll>

                <AnimateOnScroll delay={4}>
                    <div>
                        <label htmlFor="message" className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block">
                            Message *
                        </label>
                        <textarea
                            id="message" name="message" required
                            className="form-input" placeholder="Votre message..."
                            rows={5} value={formData.message} onChange={handleChange}
                        />
                    </div>
                </AnimateOnScroll>

                <AnimateOnScroll delay={5}>
                    <div className="flex flex-col gap-3">
                        <button type="submit" disabled={isSubmitting} className="btn-primary w-fit">
                            <span>{isSubmitting ? "Envoi en cours..." : "Envoyer le message"}</span>
                        </button>
                        {submitError && (
                            <p className="text-sm text-red-500">
                                Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.
                            </p>
                        )}
                    </div>
                </AnimateOnScroll>
            </div>
        </form>
    );
}
