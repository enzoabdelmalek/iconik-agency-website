import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions Légales",
    description: "Mentions légales du site Iconik Agency.",
};

export default function MentionsLegalesPage() {
    return (
        <>
            <section className="page-header">
                <div className="max-w-[800px] mx-auto px-8 md:px-12">
                    <h1 className="text-4xl md:text-5xl mb-6">Mentions légales</h1>
                    <div className="section-divider" />
                </div>
            </section>

            <section className="pb-20 md:pb-28">
                <div className="max-w-[800px] mx-auto px-8 md:px-12">
                    <div className="flex flex-col gap-12 text-muted leading-relaxed">
                        {/* Éditeur */}
                        <div>
                            <h2 className="text-xl text-foreground mb-4">
                                1. Éditeur du site
                            </h2>
                            <p>
                                Le site <strong>iconik-agency.com</strong> est édité par :
                            </p>
                            <p className="mt-2">
                                <strong>Iconik Agency</strong>
                                <br />
                                SARL au capital de 10 000 €<br />
                                Siège social : 12 Rue du Faubourg Saint-Honoré, 75008 Paris
                                <br />
                                RCS Paris B 000 000 000
                                <br />
                                Numéro de TVA intracommunautaire : FR 00 000000000
                                <br />
                                Directrice de la publication : Sophie Marchand
                                <br />
                                Contact : contact@iconik-agency.com
                            </p>
                        </div>

                        {/* Hébergement */}
                        <div>
                            <h2 className="text-xl text-foreground mb-4">2. Hébergement</h2>
                            <p>
                                Le site est hébergé par :
                                <br />
                                Vercel Inc.
                                <br />
                                440 N Barranca Ave #4133, Covina, CA 91723, USA
                            </p>
                        </div>

                        {/* Propriété intellectuelle */}
                        <div>
                            <h2 className="text-xl text-foreground mb-4">
                                3. Propriété intellectuelle
                            </h2>
                            <p>
                                L&apos;ensemble du contenu de ce site (textes, images,
                                vidéos, logos, éléments graphiques) est protégé par le droit
                                d&apos;auteur et reste la propriété exclusive d&apos;Iconik
                                Agency ou de ses ayants droit. Toute reproduction,
                                représentation, modification, ou adaptation, totale ou
                                partielle, est interdite sans autorisation préalable écrite.
                            </p>
                        </div>

                        {/* Données personnelles */}
                        <div>
                            <h2 className="text-xl text-foreground mb-4">
                                4. Protection des données personnelles
                            </h2>
                            <p>
                                Conformément au Règlement Général sur la Protection des
                                Données (RGPD) et à la loi Informatique et Libertés, vous
                                disposez d&apos;un droit d&apos;accès, de rectification, de
                                suppression et d&apos;opposition aux données personnelles vous
                                concernant.
                            </p>
                            <p className="mt-2">
                                Les données collectées via le formulaire de contact sont
                                utilisées uniquement dans le cadre du traitement de votre
                                demande. Elles ne sont ni cédées ni vendues à des tiers.
                            </p>
                            <p className="mt-2">
                                Pour exercer vos droits, contactez-nous à :{" "}
                                <strong>contact@iconik-agency.com</strong>
                            </p>
                        </div>

                        {/* Cookies */}
                        <div>
                            <h2 className="text-xl text-foreground mb-4">5. Cookies</h2>
                            <p>
                                Ce site utilise des cookies strictement nécessaires à son
                                fonctionnement. Aucun cookie publicitaire ou de tracking
                                n&apos;est utilisé sans votre consentement explicite.
                            </p>
                        </div>

                        {/* Responsabilité */}
                        <div>
                            <h2 className="text-xl text-foreground mb-4">
                                6. Limitation de responsabilité
                            </h2>
                            <p>
                                Iconik Agency s&apos;efforce d&apos;assurer l&apos;exactitude
                                des informations diffusées sur ce site. Toutefois, elle ne
                                saurait être tenue responsable des omissions, des
                                inexactitudes ou des conséquences de l&apos;utilisation des
                                informations contenues sur ce site.
                            </p>
                        </div>

                        {/* Droit applicable */}
                        <div>
                            <h2 className="text-xl text-foreground mb-4">
                                7. Droit applicable
                            </h2>
                            <p>
                                Les présentes mentions légales sont soumises au droit
                                français. En cas de litige, les tribunaux de Paris seront
                                seuls compétents.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
