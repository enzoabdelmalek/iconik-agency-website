import Link from "next/link";
import type { Talent } from "@/app/data/talents";

interface TalentCardProps {
    talent: Talent;
}

export default function TalentCard({ talent }: TalentCardProps) {
    return (
        <Link href={`/talents/${talent.slug}`} className="block no-underline group">
            <div className="talent-card">
                {/* Photo */}
                <div className="photo-placeholder talent-image aspect-[3/4] w-full">
                    {talent.photoUrl ? (
                        <img src={talent.photoUrl} alt={`${talent.firstName} ${talent.lastName}`} className="w-full h-full object-cover" />
                    ) : (
                        <span className="relative z-10 text-2xl md:text-3xl">{talent.initials}</span>
                    )}
                </div>

                {/* Overlay on hover */}
                <div className="talent-overlay">
                    <p className="text-xs tracking-[0.1em] uppercase opacity-70 mb-1">
                        {talent.category} — {talent.age} ans
                    </p>
                    <p className="text-sm leading-snug">
                        {talent.skills.slice(0, 3).join(" · ")}
                    </p>
                </div>
            </div>

            {/* Name below */}
            <div className="mt-4 px-1">
                <h3 className="text-lg text-foreground font-serif">
                    {talent.firstName} {talent.lastName}
                </h3>
                <p className="text-xs text-muted tracking-[0.05em] uppercase mt-1">
                    {talent.category} — {talent.age} ans
                </p>
            </div>
        </Link>
    );
}
