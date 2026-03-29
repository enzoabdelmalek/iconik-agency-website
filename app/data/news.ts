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
        slug: "ines-garcia-nomination-cesar",
        title: "Inès Garcia nommée aux César du Meilleur Espoir Féminin",
        date: "15 février 2025",
        category: "Presse",
        excerpt:
            "Notre talentueuse Inès Garcia a été nommée dans la catégorie Meilleur Espoir Féminin pour son rôle dans « Après la Pluie » de François Ozon.",
        content:
            "C'est avec une immense fierté que nous annonçons la nomination d'Inès Garcia aux César 2025 dans la catégorie Meilleur Espoir Féminin. Sa performance dans le film « Après la Pluie » de François Ozon a été saluée unanimement par la critique. À seulement 19 ans, Inès confirme qu'elle est l'une des actrices les plus prometteuses de sa génération.",
    },
    {
        slug: "iconik-festival-cannes-2024",
        title: "Iconik Agency au Festival de Cannes 2024",
        date: "20 mai 2024",
        category: "Festival",
        excerpt:
            "L'agence était présente au 77ème Festival de Cannes avec trois talents représentés dans la sélection officielle et Un Certain Regard.",
        content:
            "Le Festival de Cannes 2024 a été une édition exceptionnelle pour Iconik Agency. Trois de nos talents étaient présents dans des films de la sélection officielle. L'occasion pour eux de fouler le tapis rouge et de rencontrer les plus grands noms du cinéma mondial. Un moment inoubliable qui marque une étape importante dans le développement de notre agence.",
    },
    {
        slug: "partenariat-cours-florent",
        title: "Nouveau partenariat avec le Cours Florent Junior",
        date: "10 septembre 2024",
        category: "Agence",
        excerpt:
            "Iconik Agency et le Cours Florent Junior s'associent pour offrir des bourses de formation à de jeunes talents prometteurs issus de milieux défavorisés.",
        content:
            "Nous sommes ravis d'annoncer notre partenariat avec le Cours Florent Junior. Cette collaboration nous permet d'offrir chaque année trois bourses complètes à de jeunes comédiens talentueux qui n'auraient pas eu les moyens de suivre cette formation d'excellence. Parce que le talent ne connaît pas de frontière sociale.",
    },
    {
        slug: "raphael-moreau-festival-international",
        title: "Raphaël Moreau sélectionné pour le Festival International du Film de Jeunesse",
        date: "3 novembre 2024",
        category: "Festival",
        excerpt:
            "Raphaël Moreau représentera la France au prochain Festival International du Film de Jeunesse à Berlin.",
        content:
            "Raphaël Moreau, 15 ans, a été sélectionné pour représenter la France au prestigieux Festival International du Film de Jeunesse de Berlin. Une reconnaissance internationale pour ce jeune comédien formé au Conservatoire, dont le talent et la maturité ne cessent d'impressionner les professionnels du cinéma.",
    },
    {
        slug: "tournage-etoiles-du-matin",
        title: "Clap de fin pour « Les Étoiles du Matin »",
        date: "28 juillet 2024",
        category: "Projet",
        excerpt:
            "Le tournage du film « Les Étoiles du Matin » de Marie-Claire Rousseau s'est achevé après huit semaines en Provence.",
        content:
            "Après huit semaines de tournage intensif dans les paysages lumineux de Provence, le film « Les Étoiles du Matin » de Marie-Claire Rousseau a bouclé sa production. Quatre de nos talents — Léa Martin, Jade Petit, Adam Rousseau et Théo Fontaine — ont livré des performances époustouflantes. Sortie prévue au printemps 2025.",
    },
    {
        slug: "ouverture-inscriptions-2025",
        title: "Ouverture des inscriptions saison 2025-2026",
        date: "1er janvier 2025",
        category: "Agence",
        excerpt:
            "Iconik Agency ouvre ses portes aux nouveaux talents pour la saison 2025-2026. Envoyez vos candidatures !",
        content:
            "La saison 2025-2026 approche et nous recherchons de nouveaux visages ! Si votre enfant ou adolescent rêve de cinéma, de télévision ou de théâtre, n'hésitez pas à nous envoyer sa candidature via notre formulaire de contact. Nous étudions chaque dossier avec attention et organisons des auditions tout au long de l'année.",
    },
];
