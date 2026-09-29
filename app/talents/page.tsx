import { supabase, BUSINESS_ID } from "@/lib/supabase";
import ListeTalents, { type Person } from "./ListeTalents";

/**
 * La page des talents.
 *
 * Composant SERVEUR : c'est lui qui interroge Supabase, et la clé ne quitte
 * donc jamais le serveur. Le filtrage et le tri vivent dans `ListeTalents`,
 * qui ne reçoit que des données déjà publiques.
 */
export const revalidate = 300;

export default async function TalentsPage() {
    const { data } = await supabase
        .from("people")
        .select("*")
        .eq("business_id", BUSINESS_ID)
        .neq("active", false)
        .order("display_order", { ascending: true })
        .order("last_name", { ascending: true });

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

            <ListeTalents talents={(data as Person[]) ?? []} />
        </>
    );
}
