import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://www.iconikagency.fr";
    const now = new Date();

    return [
        { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${base}/talents`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${base}/projets`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${base}/avis`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${base}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${base}/equipe`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${base}/actualites`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
        { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ];
}
