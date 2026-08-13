import Link from "next/link";
import type { Metadata } from "next";
import GlassImage from "@/components/GlassImage";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { projects, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `${site.name}`,
  description:
    "Textile and mixed media work from Doha. Relief printing, hand embroidery and Arabic calligraphy, built around symbolism and meaning.",
};

/**
 * Home.
 *
 * Resting state is the finished design. Nothing here is revealed by an
 * animation, so the page is complete before any JavaScript runs and stays
 * complete if none ever does.
 */
export default function Home() {
  const featured = projects[0];

  return (
    <>
      <SiteNav />

      <main id="main" className="home">
        <section className="hero">
          <p className="hero__label">Textile and mixed media</p>
          <h1 className="hero__title">
            Meaning carried
            <span className="hero__title-em"> without speech</span>
          </h1>
          <p className="hero__body">
            I work in cloth, print and Arabic letterforms, drawn to the quieter
            ways things communicate: pattern, repetition, and the meanings a
            symbol carries before anyone explains it.
          </p>
        </section>

        {featured ? (
          <section className="feature">
            <Link href={`/work/${featured.slug}`} className="feature__media">
              <GlassImage
                src={featured.heroImage}
                sizes="(max-width: 780px) 92vw, 560px"
                priority
              />
            </Link>

            <div className="feature__text">
              <p className="feature__meta">
                {featured.dateText} &middot; {featured.role}
              </p>
              <h2 className="feature__title">
                <Link href={`/work/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p className="feature__desc">{featured.shortDescription}</p>
              <Link href={`/work/${featured.slug}`} className="feature__link">
                See the piece
              </Link>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />

      <style>{`
        .home { padding: clamp(24px, 6vw, 72px) clamp(16px, 4vw, 44px) 0; }

        .hero { max-width: 40ch; }
        .hero__label {
          margin: 0 0 16px;
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--azure-deep);
        }
        .hero__title {
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: clamp(2.5rem, 9vw, 5rem);
          line-height: 1.02;
          letter-spacing: -0.025em;
          color: var(--ink);
          text-wrap: balance;
        }
        /* The dichroic edge: rose shifting to azure across the letterforms. */
        .hero__title-em {
          background: linear-gradient(
            96deg,
            var(--rose-deep) 0%,
            var(--lilac-deep) 54%,
            var(--azure-deep) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero__body {
          margin: 26px 0 0;
          max-width: 62ch;
          font-size: 1.0625rem;
          line-height: 1.68;
          color: var(--ink-soft);
        }

        .feature {
          margin: clamp(56px, 10vw, 110px) 0 0;
          display: grid;
          gap: clamp(24px, 4vw, 48px);
          align-items: center;
        }
        @media (min-width: 860px) {
          .feature { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
        }
        .feature__media { display: block; text-decoration: none; }
        .feature__meta {
          margin: 0 0 12px;
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }
        .feature__title {
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          line-height: 1.1;
        }
        .feature__title a { color: var(--ink); text-decoration: none; }
        .feature__title a:hover { color: var(--rose-deep); }
        .feature__desc {
          margin: 16px 0 0;
          max-width: 52ch;
          line-height: 1.66;
          color: var(--ink-soft);
        }
        .feature__link {
          display: inline-block;
          margin-top: 22px;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid var(--glass-edge);
          background: var(--glass-tint);
          color: var(--azure-deep);
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 12px;
          text-decoration: none;
        }
        .feature__link:hover { background: var(--pane); }
      `}</style>
    </>
  );
}
