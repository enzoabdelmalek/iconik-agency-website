"use client";

import { useState } from "react";

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                >
                    <svg className="w-7 h-7 transition-colors" viewBox="0 0 24 24" fill={(hovered || value) >= star ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"
                        style={{ color: (hovered || value) >= star ? "var(--foreground)" : "var(--muted)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                </button>
            ))}
        </div>
    );
}

export default function ReviewForm() {
    const [rating, setRating] = useState(0);
    const [form, setForm] = useState({ author_name: "", email: "", comment: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) { setError("Veuillez sélectionner une note"); return; }
        setLoading(true);
        setError(null);

        const res = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, rating }),
        });

        if (res.ok) {
            setSuccess(true);
        } else {
            const data = await res.json();
            setError(data.error || "Une erreur est survenue");
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="py-12 text-center">
                <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">Merci</p>
                <p className="text-2xl">Votre avis a été publié.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
                <p className="text-xs tracking-[0.15em] uppercase text-muted mb-3">Votre note</p>
                <StarPicker value={rating} onChange={setRating} />
            </div>

            <div>
                <label className="text-xs tracking-[0.15em] uppercase text-muted block mb-2">Prénom</label>
                <input
                    type="text"
                    required
                    value={form.author_name}
                    onChange={(e) => setForm(p => ({ ...p, author_name: e.target.value }))}
                    placeholder="Jean"
                    className="w-full bg-transparent border-b border-border text-foreground py-2 text-sm outline-none focus:border-foreground transition-colors"
                />
            </div>

            <div>
                <label className="text-xs tracking-[0.15em] uppercase text-muted block mb-2">
                    Email <span className="normal-case tracking-normal text-muted/60">(non publié)</span>
                </label>
                <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="jean@exemple.fr"
                    className="w-full bg-transparent border-b border-border text-foreground py-2 text-sm outline-none focus:border-foreground transition-colors"
                />
            </div>

            <div>
                <label className="text-xs tracking-[0.15em] uppercase text-muted block mb-2">Commentaire</label>
                <textarea
                    required
                    rows={4}
                    value={form.comment}
                    onChange={(e) => setForm(p => ({ ...p, comment: e.target.value }))}
                    placeholder="Partagez votre expérience..."
                    className="w-full bg-transparent border-b border-border text-foreground py-2 text-sm outline-none focus:border-foreground transition-colors resize-none"
                />
            </div>

            {error && <p className="text-sm text-muted">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="btn-primary self-start disabled:opacity-50"
            >
                <span>{loading ? "Envoi..." : "Publier mon avis"}</span>
            </button>
        </form>
    );
}
