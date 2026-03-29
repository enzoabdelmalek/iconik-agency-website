export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    initials: string;
}

export const team: TeamMember[] = [
    {
        name: "Sophie Marchand",
        role: "Directrice & Fondatrice",
        bio: "Ancienne directrice de casting avec plus de 15 ans d'expérience dans l'industrie du cinéma et de la télévision, Sophie a fondé Iconik Agency avec la conviction que le talent n'attend pas le nombre des années. Sa vision : accompagner chaque jeune comédien avec exigence et bienveillance.",
        initials: "SM",
    },
    {
        name: "Antoine Leroy",
        role: "Agent Principal",
        bio: "Antoine accompagne nos talents au quotidien, de la préparation des castings à la négociation des contrats. Fort de son réseau dans le milieu audiovisuel français et international, il ouvre des portes et crée des opportunités uniques pour chacun de nos comédiens.",
        initials: "AL",
    },
    {
        name: "Camille Beaumont",
        role: "Responsable Casting",
        bio: "Camille est le lien essentiel entre nos talents et les productions. Avec son œil aiguisé et sa connaissance intime du marché, elle identifie les rôles parfaits pour chaque profil et prépare nos comédiens à donner le meilleur d'eux-mêmes lors des auditions.",
        initials: "CB",
    },
    {
        name: "Thomas Rivière",
        role: "Communication & Relations Presse",
        bio: "Thomas gère l'image de l'agence et de ses talents avec créativité et stratégie. Des réseaux sociaux aux festivals, en passant par les relations presse, il assure une visibilité optimale tout en préservant l'authenticité qui fait la force d'Iconik.",
        initials: "TR",
    },
];
