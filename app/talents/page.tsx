"use client";

import { useState, useEffect } from "react";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import { mapPersonToTalent } from "@/lib/talent-utils";
import TalentCard from "@/app/components/TalentCard";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

interface Person {
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

export default function TalentsPage() {
    const [talents, setTalents] = useState<Person[]>([]);
    const [activeCategory, setActiveCategory] = useState("Tous");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTalents = async () => {
            const { data } = await supabase
                .from("people")
                .select("*")
                .eq("business_id", BUSINESS_ID)
                .neq("active", false)
                .order("display_order", { ascending: true })
                .order("last_name", { ascending: true });
            setTalents((data as Person[]) || []);
            setLoading(false);
        };
        fetchTalents();
    }, []);

    const categories = ["Tous", ...Array.from(new Set(talents.map(t => t.specialty?.trim()).filter(Boolean))) as string[]];

    const filteredTalents = activeCategory === "Tous"
        ? talents
        : talents.filter(t => t.specialty?.trim() === activeCategory);

    return (
        <>
            {/* Header */}
            <section className="page-header bg-surface">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                        Nos Talents
                    </p>
                    <h1 className="text-5xl md:text-7xl mb-6">Talents</h1>
                    <div className="section-divider" />
                    <p className="text-muted leading-relaxed max-w-xl text-lg mt-6">
                        Découvrez nos comédiens : enfants, adolescents et jeunes adultes,
                        chacun avec une personnalité et un talent uniques.
                    </p>
                </div>
            </section>

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
                        <span className="ml-auto text-xs text-muted">
                            {filteredTalents.length} talent{filteredTalents.length > 1 ? "s" : ""}
                        </span>
                    </div>
                </div>
            </section>

            {/* Talent Grid */}
            <section className="py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="aspect-[3/4] bg-surface animate-pulse rounded" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                            {filteredTalents.map((talent, index) => (
                                <AnimateOnScroll
                                    key={talent.id}
                                    delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                                >
                                    <TalentCard talent={mapPersonToTalent(talent as any)} />
                                </AnimateOnScroll>
                            ))}
                        </div>
                    )}

                    {!loading && filteredTalents.length === 0 && (
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
