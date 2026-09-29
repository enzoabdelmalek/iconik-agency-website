"use client";

import { useState } from "react";
import { mapPersonToTalent } from "@/lib/talent-utils";
import TalentCard from "@/app/components/TalentCard";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export interface Person {
    id: string;
    name: string;
    first_name: string | null;
    last_name: string | null;
    specialty: string | null;
    description: string | null;
    age: number | null;
    date_of_birth: string | null;
    gender: string | null;
    height: string | null;
    eye_color: string | null;
    hair_color: string | null;
    languages: string[];
    skills: string[];
    projects: string[];
    photo_url: string | null;
}

/**
 * Le filtrage et le tri des talents, côté navigateur.
 *
 * Les DONNÉES, elles, arrivent du serveur en propriétés. Avant, cette page
 * était entièrement « use client » et interrogeait Supabase depuis le
 * navigateur : la clé anon partait donc dans le paquet servi à chaque
 * visiteur, et avec elle l'accès à tout ce que le rôle anon peut lire dans
 * le projet — y compris les réservations des autres clients de l'agence.
 *
 * Le filtrage reste ici : il ne touche à rien de sensible, il évite un
 * aller-retour au serveur à chaque clic, et il fonctionne sur des données
 * déjà publiques.
 */
export default function ListeTalents({ talents }: { talents: Person[] }) {
    const [activeCategory, setActiveCategory] = useState("Tous");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const categories = ["Tous", ...Array.from(new Set(talents.map(t => t.specialty?.trim()).filter(Boolean))) as string[]];

    const filteredTalents = (activeCategory === "Tous"
        ? talents
        : talents.filter(t => t.specialty?.trim() === activeCategory)
    ).slice().sort((a, b) => {
        const la = (a.last_name ?? a.name ?? "").toLowerCase();
        const lb = (b.last_name ?? b.name ?? "").toLowerCase();
        return sortOrder === "asc" ? la.localeCompare(lb, "fr") : lb.localeCompare(la, "fr");
    });

    return (
        <>
            {/* Filter Bar */}
            <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-sm z-30">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                            >
                                {cat}
                            </button>
                        ))}
                        <div className="ml-auto flex items-center gap-2 shrink-0">
                            <span className="text-xs text-muted hidden sm:block">Trier :</span>
                            <button
                                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded border border-border bg-background hover:bg-surface transition-colors duration-200"
                                title={sortOrder === "asc" ? "Tri A→Z (cliquer pour Z→A)" : "Tri Z→A (cliquer pour A→Z)"}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                    <path d="M2 4l3-3 3 3M5 1v10M10 8l-2 2-2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity={sortOrder === "asc" ? 1 : 0.35} />
                                    <path d="M10 4l-2-2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity={sortOrder === "desc" ? 1 : 0.35} />
                                </svg>
                                Nom {sortOrder === "asc" ? "A → Z" : "Z → A"}
                            </button>
                            <span className="text-xs text-muted">
                                {filteredTalents.length} talent{filteredTalents.length > 1 ? "s" : ""}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Talent Grid */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    {/* Plus d'état de chargement : le serveur a déjà les
                        données au premier rendu, donc la page arrive
                        complète. C'est aussi meilleur pour le référencement,
                        les talents étant désormais dans le HTML. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                            {filteredTalents.map((talent, index) => (
                                <AnimateOnScroll
                                    key={talent.id}
                                    delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                                >
                                    <TalentCard talent={mapPersonToTalent(talent)} />
                                </AnimateOnScroll>
                        ))}
                    </div>

                    {filteredTalents.length === 0 && (
                        <div className="flex flex-col items-center gap-4 py-24 text-center">
                            <svg className="w-10 h-10 text-muted/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <p className="text-muted">Aucun talent dans cette catégorie pour le moment.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
