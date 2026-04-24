export interface Talent {
    slug: string;
    firstName: string;
    lastName: string;
    age: number;
    dateOfBirth: string;
    gender: "Féminin" | "Masculin";
    height: string;
    eyeColor: string;
    hairColor: string;
    languages: string[];
    skills: string[];
    bio: string;
    category: string;
    initials: string;
    projects: string[];
    photoUrl?: string | null;
}

interface PersonRow {
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
    languages: string[] | null;
    skills: string[] | null;
    projects: string[] | null;
    photo_url: string | null;
    slug?: string | null;
}

export function mapPersonToTalent(t: PersonRow): Talent {
    const firstName = t.first_name || t.name.split(" ")[0];
    const lastName = t.last_name || t.name.split(" ").slice(1).join(" ");
    return {
        slug: t.slug || t.id,
        firstName,
        lastName,
        age: t.age || 0,
        dateOfBirth: t.date_of_birth || "",
        gender: (t.gender as "Féminin" | "Masculin") || "Féminin",
        height: t.height || "",
        eyeColor: t.eye_color || "",
        hairColor: t.hair_color || "",
        languages: t.languages || [],
        skills: t.skills || [],
        bio: t.description || "",
        category: t.specialty || "Enfant",
        initials: `${firstName[0]}${lastName?.[0] || ""}`.toUpperCase(),
        projects: t.projects || [],
        photoUrl: t.photo_url,
    };
}
