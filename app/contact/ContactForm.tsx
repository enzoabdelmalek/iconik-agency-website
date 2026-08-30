"use client";

import { useState } from "react";

const SUBJECTS = [
    "Proposition de casting",
    "Collaboration / Partenariat",
    "Demande presse",
    "Autre",
];

export default function ContactForm() {
    const [subject, setSubject] = useState("");
    const [autreDetail, setAutreDetail] = useState("");
    const [message, setMessage] = useState("");

    const resolvedSubject = subject === "Autre"
        ? `Autre${autreDetail.trim() ? ` : ${autreDetail.trim()}` : ""}`
        : subject;

    const params = [
        resolvedSubject ? `subject=${encodeURIComponent(resolvedSubject)}` : "",
        message ? `body=${encodeURIComponent(message)}` : "",
    ].filter(Boolean).join("&");

    const mailtoHref = `mailto:hello@iconikagency.fr${params ? `?${params}` : ""}`;

    return (
        <div className="flex flex-col gap-8">
            <div>
                <label htmlFor="subject" className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block">
                    Objet
                </label>
                <select
                    id="subject"
                    className="form-input cursor-pointer"
                    value={subject}
                    onChange={e => { setSubject(e.target.value); setAutreDetail(""); }}
                >
                    <option value="">Choisir un objet</option>
                    {SUBJECTS.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {subject === "Autre" && (
                <div>
                    <label htmlFor="autre-detail" className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block">
                        Précisez l'objet
                    </label>
                    <input
                        id="autre-detail"
                        type="text"
                        className="form-input"
                        placeholder="Ex : Demande d'information..."
                        value={autreDetail}
                        onChange={e => setAutreDetail(e.target.value)}
                    />
                </div>
            )}

            <div>
                <label htmlFor="message" className="text-xs tracking-[0.1em] uppercase text-muted mb-2 block">
                    Message
                </label>
                <textarea
                    id="message"
                    className="form-input"
                    placeholder="Votre message..."
                    rows={6}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
            </div>

            <a href={mailtoHref} className="btn-primary w-fit">
                <span>Ouvrir ma boîte mail</span>
            </a>
        </div>
    );
}
