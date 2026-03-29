export interface Project {
    slug: string;
    title: string;
    type: "Film" | "Série TV" | "Publicité" | "Court-métrage" | "Théâtre";
    year: number;
    director: string;
    description: string;
    talents: string[];
    initials: string;
}

export const projects: Project[] = [
    {
        slug: "les-etoiles-du-matin",
        title: "Les Étoiles du Matin",
        type: "Film",
        year: 2024,
        director: "Marie-Claire Rousseau",
        description:
            "Un drame familial poignant qui suit le parcours de trois enfants confrontés au divorce de leurs parents. Tourné en lumière naturelle dans le sud de la France, ce film révèle le talent brut de nos jeunes comédiens dans des scènes d'une intensité remarquable.",
        talents: ["Léa Martin", "Jade Petit", "Adam Rousseau", "Théo Fontaine"],
        initials: "EM",
    },
    {
        slug: "demain-nous-appartient",
        title: "Demain nous appartient",
        type: "Série TV",
        year: 2024,
        director: "Production TF1",
        description:
            "Plusieurs de nos talents ont rejoint le casting récurrent de cette série quotidienne emblématique. Une expérience formatrice qui leur permet de perfectionner leur jeu dans un rythme de tournage soutenu et professionnel.",
        talents: ["Noah Dubois", "Chloé Lefebvre", "Théo Fontaine"],
        initials: "DA",
    },
    {
        slug: "campagne-orange",
        title: "Campagne Orange — Noël",
        type: "Publicité",
        year: 2023,
        director: "Agence BETC",
        description:
            "Une campagne publicitaire nationale pour Orange, diffusée pendant les fêtes de fin d'année. Nos talents ont incarné avec naturel et émotion les valeurs de partage et de connexion familiale chères à la marque.",
        talents: ["Léa Martin", "Chloé Lefebvre", "Gabriel Dupont"],
        initials: "CO",
    },
    {
        slug: "le-dernier-ete",
        title: "Le Dernier Été",
        type: "Court-métrage",
        year: 2024,
        director: "Antoine Berger",
        description:
            "Court-métrage sélectionné au Festival de Clermont-Ferrand. L'histoire d'une amitié adolescente confrontée à la séparation. Un film délicat et lumineux qui a ému le jury et le public, récompensé du Prix Spécial du Jury.",
        talents: ["Emma Laurent", "Jade Petit", "Inès Garcia", "Manon Girard"],
        initials: "DE",
    },
    {
        slug: "le-petit-prince",
        title: "Le Petit Prince",
        type: "Théâtre",
        year: 2023,
        director: "Isabelle Nanty",
        description:
            "Adaptation théâtrale du chef-d'œuvre de Saint-Exupéry au Théâtre du Châtelet. Nos jeunes comédiens ont donné vie à cette œuvre intemporelle avec une fraîcheur et une poésie saluées unanimement par la critique.",
        talents: ["Lucas Bernard", "Raphaël Moreau", "Manon Girard"],
        initials: "PP",
    },
    {
        slug: "apres-la-pluie",
        title: "Après la Pluie",
        type: "Film",
        year: 2025,
        director: "François Ozon",
        description:
            "Le prochain long-métrage de François Ozon, actuellement en post-production. Un récit d'apprentissage contemporain qui explore les thèmes de l'identité et de la résilience à travers le regard de la jeunesse.",
        talents: ["Noah Dubois", "Raphaël Moreau", "Inès Garcia", "Gabriel Dupont"],
        initials: "AP",
    },
];
