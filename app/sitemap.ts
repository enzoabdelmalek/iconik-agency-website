import { MetadataRoute } from "next";
import { supabase, BUSINESS_ID } from "@/lib/supabase";

const base = "https://www.iconikagency.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const [{ data: talents }, { data: projects }, { data: posts }] = await Promise.all([
        supabase.from("people").select("id, slug, updated_at").eq("business_id", BUSINESS_ID).eq("active", true),
        supabase.from("projects").select("id, updated_at").eq("business_id", BUSINESS_ID).eq("active", true),
        supabase.from("blog" as any).select("slug, created_at").eq("business_id", BUSINESS_ID).eq("active", true),
    ]);

    const talentRoutes: MetadataRoute.Sitemap = (talents || []).map((t: any) => ({
        url: `${base}/talents/${t.slug || t.id}`,
        lastModified: t.updated_at ? new Date(t.updated_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const projectRoutes: MetadataRoute.Sitemap = (projects || []).map((p: any) => ({
        url: `${base}/projets/${p.id}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const newsRoutes: MetadataRoute.Sitemap = (posts || []).map((p: any) => ({
        url: `${base}/actualites/${p.slug}`,
        lastModified: p.created_at ? new Date(p.created_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [
        { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${base}/talents`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${base}/projets`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${base}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${base}/actualites`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${base}/avis`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
        { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
        ...talentRoutes,
        ...projectRoutes,
        ...newsRoutes,
    ];
}
