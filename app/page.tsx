import Link from "next/link";
import { talents } from "./data/talents";
import { projects } from "./data/projects";
import TalentCard from "./components/TalentCard";
import AnimateOnScroll from "./components/AnimateOnScroll";

const featuredTalents = talents.slice(0, 4);
const featuredProjects = projects.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background subtle pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.02)_0%,transparent_60%)]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 text-center">
          {/* Eyebrow */}
          <p className="hero-subtitle text-xs md:text-sm tracking-[0.3em] uppercase text-muted mb-8">
            Agence de Jeunes Comédiens — Paris
          </p>

          {/* Main title */}
          <h1 className="hero-title text-[clamp(3rem,10vw,9rem)] leading-[0.95] tracking-[-0.03em] mb-8">
            ICONIK
          </h1>

          {/* Line */}
          <div className="hero-line h-[1px] bg-foreground mx-auto mb-8" />

          {/* Description */}
          <p className="hero-description text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed font-light mb-12">
            Nous révélons et accompagnons les talents de demain.
            <br className="hidden md:block" />
            Cinéma, télévision, théâtre & publicité.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/talents" className="btn-primary">
              <span>Découvrir nos talents</span>
            </Link>
            <Link href="/contact" className="btn-outline">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image placeholder */}
            <AnimateOnScroll>
              <div className="photo-placeholder-dark photo-placeholder aspect-[4/5] w-full max-w-lg mx-auto lg:mx-0">
                <span className="relative z-10 text-4xl">Template</span>
              </div>
            </AnimateOnScroll>

            {/* Text */}
            <div>
              <AnimateOnScroll delay={1}>
                <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                  Notre Engagement
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={2}>
                <h2 className="text-4xl md:text-5xl mb-6">
                  Le talent n&apos;attend pas
                  <br />
                  le nombre des années
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll delay={3}>
                <div className="section-divider" />
              </AnimateOnScroll>
              <AnimateOnScroll delay={3}>
                <p className="text-muted leading-relaxed mb-6">
                  Fondée à Paris, Iconik Agency est née d&apos;une conviction :
                  chaque jeune possède une lumière unique qui mérite d&apos;être
                  révélée. Nous accompagnons nos comédiens avec exigence et
                  bienveillance, du premier casting aux plus grands plateaux.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={4}>
                <p className="text-muted leading-relaxed mb-8">
                  Notre approche allie formation, accompagnement personnalisé et
                  un réseau privilégié dans l&apos;industrie du cinéma, de la
                  télévision et du spectacle vivant.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={5}>
                <Link href="/a-propos" className="btn-outline">
                  En savoir plus
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <section className="py-6 border-y border-border overflow-hidden">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {["Cinéma", "Télévision", "Théâtre", "Publicité", "Doublage", "Comédie Musicale"].map((item) => (
                <span
                  key={`${i}-${item}`}
                  className="font-serif text-2xl md:text-3xl text-foreground/10 whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED TALENTS ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <AnimateOnScroll>
                <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                  Nos Talents
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={1}>
                <h2 className="text-4xl md:text-5xl">
                  Visages d&apos;aujourd&apos;hui,
                  <br />
                  étoiles de demain
                </h2>
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll delay={2}>
              <Link
                href="/talents"
                className="mt-6 md:mt-0 text-sm tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors no-underline border-b border-muted hover:border-foreground pb-1"
              >
                Voir tous les talents →
              </Link>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredTalents.map((talent, index) => (
              <AnimateOnScroll key={talent.slug} delay={(index + 1) as 1 | 2 | 3 | 4}>
                <TalentCard talent={talent} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 bg-surface">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: "12", label: "Talents" },
              { number: "30+", label: "Projets réalisés" },
              { number: "8", label: "Années d'expérience" },
              { number: "100%", label: "Passion" },
            ].map((stat, index) => (
              <AnimateOnScroll key={stat.label} delay={(index + 1) as 1 | 2 | 3 | 4}>
                <div className="text-center">
                  <p className="font-serif text-4xl md:text-5xl mb-2">
                    {stat.number}
                  </p>
                  <p className="text-xs tracking-[0.15em] uppercase text-muted">
                    {stat.label}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <AnimateOnScroll>
                <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                  Projets
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={1}>
                <h2 className="text-4xl md:text-5xl">
                  Nos dernières
                  <br />
                  collaborations
                </h2>
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll delay={2}>
              <Link
                href="/projets"
                className="mt-6 md:mt-0 text-sm tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors no-underline border-b border-muted hover:border-foreground pb-1"
              >
                Tous les projets →
              </Link>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <AnimateOnScroll key={project.slug} delay={(index + 1) as 1 | 2 | 3}>
                <div className="project-card group">
                  <div className="photo-placeholder-dark photo-placeholder project-image aspect-[16/10] w-full mb-6">
                    <span className="relative z-10 text-3xl">{project.initials}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs tracking-[0.1em] uppercase text-muted">
                      {project.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted" />
                    <span className="text-xs tracking-[0.1em] uppercase text-muted">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl group-hover:opacity-70 transition-opacity">
                    {project.title}
                  </h3>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-[800px] mx-auto px-8 md:px-12 text-center">
          <AnimateOnScroll>
            <p className="text-xs tracking-[0.2em] uppercase text-background/40 mb-6">
              Rejoignez-nous
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={1}>
            <h2 className="text-4xl md:text-5xl text-background mb-6">
              Votre enfant a du talent ?
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={2}>
            <p className="text-background/60 leading-relaxed mb-10 text-lg">
              Nous recherchons en permanence de nouveaux visages et de nouvelles
              personnalités. Contactez-nous pour une audition.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={3}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground text-[0.8125rem] font-medium tracking-[0.12em] uppercase no-underline hover:bg-background/90 transition-colors duration-300"
            >
              Prendre contact
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
