"use client";

import { useState } from "react";
import { talents, categories } from "@/app/data/talents";
import TalentCard from "@/app/components/TalentCard";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export default function TalentsPage() {
    const [activeCategory, setActiveCategory] = useState("Tous");

    const filteredTalents =
        activeCategory === "Tous"
            ? talents
            : talents.filter((t) => t.category === activeCategory);

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                        {filteredTalents.map((talent, index) => (
                            <AnimateOnScroll
                                key={talent.slug}
                                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                            >
                                <TalentCard talent={talent} />
                            </AnimateOnScroll>
                        ))}
                    </div>

                    {filteredTalents.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted text-lg">
                                Aucun talent dans cette catégorie pour le moment.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
