import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { about, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: about.intro,
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="about">
        <h1 className="about__title">{about.intro}</h1>

        <div className="about__body">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </main>
      <SiteFooter />

      <style>{`
        .about {
          padding: clamp(20px, 5vw, 64px) clamp(16px, 4vw, 44px) 0;
          max-width: 900px;
          margin: 0 auto;
        }
        .about__title {
          margin: 0;
          max-width: 22ch;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: clamp(1.9rem, 5.5vw, 3.25rem);
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: var(--ink);
          text-wrap: balance;
        }
        .about__body {
          margin: clamp(28px, 5vw, 48px) 0 0;
          max-width: 64ch;
        }
        .about__body p {
          margin: 0 0 1.3em;
          font-size: 1.0625rem;
          line-height: 1.74;
          color: var(--ink);
        }
        /* The opening paragraph carries a little more weight, the way a lead
           paragraph does in print. */
        .about__body p:first-child {
          font-size: 1.1875rem;
          line-height: 1.66;
        }
        .about__body p:last-child { margin-bottom: 0; }
      `}</style>
    </>
  );
}
