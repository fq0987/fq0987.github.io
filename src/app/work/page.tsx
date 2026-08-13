import Link from "next/link";
import type { Metadata } from "next";
import GlassImage from "@/components/GlassImage";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { projects, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Work | ${site.name}`,
  description: "Textile, print and mixed media pieces.",
};

export default function WorkIndex() {
  return (
    <>
      <SiteNav />
      <main id="main" className="index">
        <h1 className="index__title">Work</h1>

        <ul className="index__list">
          {projects.map((project) => (
            <li key={project.slug} className="card">
              <Link href={`/work/${project.slug}`} className="card__media">
                <GlassImage
                  src={project.heroImage}
                  sizes="(max-width: 780px) 92vw, 420px"
                />
              </Link>
              <p className="card__meta">
                {project.dateText} &middot; {project.locationText}
              </p>
              <h2 className="card__title">
                <Link href={`/work/${project.slug}`}>{project.title}</Link>
              </h2>
              <p className="card__desc">{project.shortDescription}</p>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />

      <style>{`
        .index { padding: clamp(16px, 4vw, 48px) clamp(16px, 4vw, 44px) 0; }
        .index__title {
          margin: 0 0 clamp(28px, 5vw, 52px);
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: clamp(2.25rem, 7vw, 3.5rem);
          line-height: 1.04;
          color: var(--ink);
        }
        .index__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: clamp(32px, 5vw, 56px);
        }
        @media (min-width: 780px) {
          .index__list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .card__media { display: block; text-decoration: none; }
        .card__meta {
          margin: 18px 0 8px;
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }
        .card__title {
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: 1.6rem;
          line-height: 1.12;
        }
        .card__title a { color: var(--ink); text-decoration: none; }
        .card__title a:hover { color: var(--rose-deep); }
        .card__desc {
          margin: 10px 0 0;
          max-width: 52ch;
          line-height: 1.62;
          color: var(--ink-soft);
        }
      `}</style>
    </>
  );
}
