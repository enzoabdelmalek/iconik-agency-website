import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Politique de Confidentialité",
    description: "Politique de confidentialité et protection des données personnelles d'Iconik Agency.",
    alternates: { canonical: "https://www.iconikagency.fr/politique-confidentialite" },
    robots: { index: false },
};

export default function PolitiqueConfidentialitePage() {
    return (
        <>
            <section className="page-header">
                <div className="max-w-[800px] mx-auto px-8 md:px-12">
                    <h1 className="text-4xl md:text-5xl mb-6">Politique de confidentialité</h1>
                    <div className="section-divider" />
                </div>
            </section>

            <section className="pb-20 md:pb-28">
                <div className="max-w-[800px] mx-auto px-8 md:px-12">
                    <div className="flex flex-col gap-12 text-muted leading-relaxed">

                        <div>
                            <h2 className="text-xl text-foreground mb-4">1. Responsable du traitement</h2>
                            <p>
                                Le responsable du traitement des données collectées sur le site <strong>iconikagency.fr</strong> est :
                            </p>
                            <p className="mt-2">
                                <strong>Iconik Agency</strong><br />
                                Directrice : Aïssata Diaw<br />
                                Contact : <a href="mailto:hello@iconikagency.com" className="text-foreground underline underline-offset-4">hello@iconikagency.com</a>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl text-foreground mb-4">2. Données collectées</h2>
                            <p>Nous collectons les données suivantes uniquement lorsque vous nous contactez via le formulaire :</p>
                            <ul className="mt-3 flex flex-col gap-2">
                                {["Nom et prénom", "Adresse email", "Numéro de téléphone (optionnel)", "Objet et contenu de votre message"].map(item => (
                                    <li key={item} className="flex gap-3 items-start">
                                        <span className="w-1 h-1 rounded-full bg-foreground mt-2.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl text-foreground mb-4">3. Finalité du traitement</h2>
                            <p>Les données collectées sont utilisées exclusivement pour :</p>
                            <ul className="mt-3 flex flex-col gap-2">
                                {[
                                    "Répondre à vos demandes de contact",
                                    "Traiter les candidatures à l'Iconik Tour",
                                    "Améliorer la qualité de nos services",
                                ].map(item => (
                                    <li key={item} className="flex gap-3 items-start">
                                        <span className="w-1 h-1 rounded-full bg-foreground mt-2.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4">
                                Elles ne sont ni vendues, ni cédées, ni louées à des tiers.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl text-foreground mb-4">4. Base légale</h2>
                            <p>
                                Le traitement de vos données repose sur votre consentement explicite, exprimé lors de l&apos;envoi du formulaire de contact, conformément à l&apos;article 6(1)(a) du RGPD.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl text-foreground mb-4">5. Durée de conservation</h2>
                            <p>
                                Vos données sont conservées pendant une durée maximale de <strong>3 ans</strong> à compter de notre dernier échange, puis supprimées ou anonymisées.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl text-foreground mb-4">6. Sous-traitants</h2>
                            <p>Nous faisons appel aux prestataires suivants pour traiter vos données :</p>
                            <ul className="mt-3 flex flex-col gap-2">
                                {[
                                    "Supabase (stockage des données) — hébergé en Europe",
                                    "Resend (envoi d'emails transactionnels)",
                                    "Vercel (hébergement du site) — USA, sous Privacy Shield",
                                ].map(item => (
                                    <li key={item} className="flex gap-3 items-start">
                                        <span className="w-1 h-1 rounded-full bg-foreground mt-2.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl text-foreground mb-4">7. Vos droits</h2>
                            <p>
                                Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
                            </p>
                            <ul className="mt-3 flex flex-col gap-2">
                                {[
                                    "Droit d'accès à vos données",
                                    "Droit de rectification",
                                    "Droit à l'effacement (« droit à l'oubli »)",
                                    "Droit à la limitation du traitement",
                                    "Droit à la portabilité",
                                    "Droit d'opposition",
                                ].map(item => (
                                    <li key={item} className="flex gap-3 items-start">
                                        <span className="w-1 h-1 rounded-full bg-foreground mt-2.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4">
                                Pour exercer ces droits, contactez-nous à :{" "}
                                <a href="mailto:hello@iconikagency.com" className="text-foreground underline underline-offset-4">hello@iconikagency.com</a>
                            </p>
                            <p className="mt-2">
                                Vous avez également le droit d&apos;introduire une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertés) à l&apos;adresse{" "}
                                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">www.cnil.fr</a>.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl text-foreground mb-4">8. Cookies</h2>
                            <p>
                                Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement technique. Aucun cookie publicitaire ou de pistage tiers n&apos;est déposé sans votre consentement.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl text-foreground mb-4">9. Mise à jour</h2>
                            <p>
                                Cette politique peut être mise à jour à tout moment. La version en vigueur est celle publiée sur cette page. Dernière mise à jour : mai 2026.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
