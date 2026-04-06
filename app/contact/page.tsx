import type { Metadata } from "next";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contactez Iconik Agency pour toute demande de casting, inscription de talent ou collaboration.",
};

type DayKey = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi" | "dimanche";
interface DaySchedule { open: boolean; from: string; to: string; }
type Hours = Record<DayKey, DaySchedule>;

const DAY_LABELS: Record<DayKey, string> = {
    lundi: "Lundi",
    mardi: "Mardi",
    mercredi: "Mercredi",
    jeudi: "Jeudi",
    vendredi: "Vendredi",
    samedi: "Samedi",
    dimanche: "Dimanche",
};
const DAYS: DayKey[] = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

function formatHours(hours: Hours | null) {
    if (!hours) return null;

    const openDays = DAYS.filter((d) => hours[d]?.open);
    if (openDays.length === 0) return null;

    const groups: { days: DayKey[]; from: string; to: string }[] = [];
    for (const day of openDays) {
        const { from, to } = hours[day];
        const last = groups[groups.length - 1];
        if (last && last.from === from && last.to === to) {
            last.days.push(day);
        } else {
            groups.push({ days: [day], from, to });
        }
    }

    return groups.map(({ days, from, to }) => {
        const label =
            days.length === 1
                ? DAY_LABELS[days[0]]
                : `${DAY_LABELS[days[0]]} — ${DAY_LABELS[days[days.length - 1]]}`;
        return `${label} : ${from} — ${to}`;
    });
}

export default async function ContactPage() {
    const { data: business } = await supabase
        .from("businesses")
        .select("address, contact_email, contact_phone, maps_url, hours")
        .eq("id", BUSINESS_ID)
        .single();

    const hours = business?.hours as Hours | null;
    const hoursLines = formatHours(hours);

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
                                {business?.address && (
                                    <AnimateOnScroll delay={2}>
                                        <div>
                                            <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                                Adresse
                                            </p>
                                            <p className="leading-relaxed whitespace-pre-line">
                                                {business.address}
                                            </p>
                                        </div>
                                    </AnimateOnScroll>
                                )}

                                {business?.contact_email && (
                                    <AnimateOnScroll delay={3}>
                                        <div>
                                            <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                                Email
                                            </p>
                                            <a
                                                href={`mailto:${business.contact_email}`}
                                                className="text-foreground no-underline hover:opacity-70 transition-opacity"
                                            >
                                                {business.contact_email}
                                            </a>
                                        </div>
                                    </AnimateOnScroll>
                                )}

                                {business?.contact_phone && (
                                    <AnimateOnScroll delay={3}>
                                        <div>
                                            <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                                Téléphone
                                            </p>
                                            <a
                                                href={`tel:${business.contact_phone.replace(/\s/g, "")}`}
                                                className="text-foreground no-underline hover:opacity-70 transition-opacity"
                                            >
                                                {business.contact_phone}
                                            </a>
                                        </div>
                                    </AnimateOnScroll>
                                )}

                                {hoursLines && hoursLines.length > 0 && (
                                    <AnimateOnScroll delay={4}>
                                        <div>
                                            <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                                                Horaires
                                            </p>
                                            <div className="flex flex-col gap-1">
                                                {hoursLines.map((line) => (
                                                    <p key={line} className="leading-relaxed">
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </AnimateOnScroll>
                                )}
                            </div>

                            <AnimateOnScroll delay={5}>
                                <div className="mt-12">
                                    {business?.maps_url ? (
                                        <a
                                            href={business.maps_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="photo-placeholder aspect-[16/9] w-full flex items-center justify-center no-underline hover:opacity-80 transition-opacity"
                                        >
                                            <span className="relative z-10 text-sm tracking-[0.1em] uppercase">
                                                Voir sur Google Maps →
                                            </span>
                                        </a>
                                    ) : (
                                        <div className="photo-placeholder aspect-[16/9] w-full">
                                            <span className="relative z-10 text-sm tracking-[0.1em] uppercase">
                                                Carte
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
