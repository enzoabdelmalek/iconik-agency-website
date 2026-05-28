export interface NewsItem {
    slug: string;
    title: string;
    date: string;
    category: "Presse" | "Festival" | "Projet" | "Agence";
    excerpt: string;
    content: string;
}

export const news: NewsItem[] = [
    {
        slug: "demba-juste-une-illusion-2026",
        title: "Demba obtient le rôle d'Ousman dans « Juste une illusion »",
        date: "Avril 2026",
        category: "Projet",
        excerpt:
            "Demba a décroché le rôle d'Ousman dans le long métrage « Juste une illusion » réalisé par Olivier Nakache et Éric Toledano.",
        content:
            "Nous sommes immensément fiers d'annoncer que Demba a obtenu le rôle d'Ousman dans le long métrage « Juste une illusion » réalisé par le duo Olivier Nakache et Éric Toledano, à qui l'on doit notamment Intouchables et Le sens de la fête. Une reconnaissance exceptionnelle pour ce jeune talent qui confirme l'étendue de son potentiel.",
    },
    {
        slug: "coumba-le-reve-americain-2026",
        title: "Coumba à l'affiche de « Le rêve américain »",
        date: "Février 2026",
        category: "Projet",
        excerpt:
            "Coumba a fait une apparition dans « Le rêve américain » réalisé par Anthony Marciano.",
        content:
            "Coumba continue de faire parler d'elle. Après ses succès récents, elle a décroché une apparition dans « Le rêve américain » réalisé par Anthony Marciano. Une belle nouvelle étape dans un parcours qui ne cesse de progresser.",
    },
    {
        slug: "hiver-2011-avant-premiere-2026",
        title: "Avant-première de la série « Hiver 2011 » avec quatre de nos talents",
        date: "Février 2026",
        category: "Projet",
        excerpt:
            "Quatre de nos talents ont obtenu un rôle dans la série « Hiver 2011 » réalisée par Laurène Lubanza et Brian Houart.",
        content:
            "La série « Hiver 2011 » réalisée par Laurène Lubanza et Brian Houart a tenu son avant-première, et nous ne pouvions pas en être plus fiers : pas moins de quatre de nos talents ont obtenu un rôle dans cette production. Une soirée mémorable qui témoigne du travail accompli et de la confiance que les réalisateurs placent dans les talents d'Iconik Agency.",
    },
    {
        slug: "jonah-le-diplome-tf1-2026",
        title: "Jonah à l'écran dans « Le Diplôme » sur TF1",
        date: "Janvier 2026",
        category: "Projet",
        excerpt:
            "Jonah a été à l'écran dans la série « Le Diplôme » réalisée par Fanny Riedberger et diffusée sur TF1.",
        content:
            "Jonah a fait ses premiers pas sur TF1 dans la série « Le Diplôme » réalisée par Fanny Riedberger. Une diffusion nationale pour ce jeune talent qui gagne en visibilité et confirme son potentiel devant les caméras les plus importantes du paysage audiovisuel français.",
    },
    {
        slug: "souad-coumba-zenith-paris-2025",
        title: "Souad et Coumba au Zénith de Paris pour « Independent Queen »",
        date: "Décembre 2025",
        category: "Projet",
        excerpt:
            "Souad et Coumba ont participé à la comédie musicale « Independent Queen » au Zénith de Paris.",
        content:
            "Quelle fin d'année pour Souad et Coumba ! Les deux talents ont participé à la comédie musicale « Independent Queen » sur la scène mythique du Zénith de Paris. Une expérience hors du commun qui les a confrontées à un public immense et à l'exigence des grandes productions scéniques.",
    },
    {
        slug: "aissatou-happy-meal-2025",
        title: "Aïssatou dans « Happy Meal » de Johanna Makabi",
        date: "Septembre 2025",
        category: "Festival",
        excerpt:
            "Aïssatou a participé au magnifique projet « Happy Meal » de la réalisatrice Johanna Makabi, récompensé dans de nombreux festivals.",
        content:
            "Aïssatou a eu la chance de participer à « Happy Meal », un projet fort et sensible signé par la réalisatrice Johanna Makabi. Le film a été récompensé dans de nombreux festivals, une reconnaissance bien méritée pour une œuvre qui touche profondément. Nous sommes très fiers de la performance d'Aïssatou dans ce projet d'exception.",
    },
];
