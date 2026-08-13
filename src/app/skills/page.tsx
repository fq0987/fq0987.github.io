import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { site, skillGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: `Skills | ${site.name}`,
  description:
    "Print, textile, letterform and drawing processes, and the languages behind them.",
};

/**
 * Skills as panes of glass rather than a list with bars.
 *
 * No proficiency levels are shown anywhere, because Fatima has not given them
 * and a guessed level is a fabricated claim. If she supplies them later they
 * belong in skills.json, not here.
 */
export default function SkillsPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="skills">
        <header className="skills__head">
          <h1 className="skills__title">Skills</h1>
          <p className="skills__lede">
            Processes I have worked in, grouped by what they are for rather than
            by how often I use them.
          </p>
        </header>

        <div className="skills__grid">
          {skillGroups.map((group) => (
            <section key={group.id} className="pane">
              <h2 className="pane__title">{group.title}</h2>
              {group.note ? <p className="pane__note">{group.note}</p> : null}
              <ul className="pane__list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />

      <style>{`
        .skills {
          padding: clamp(20px, 5vw, 64px) clamp(16px, 4vw, 44px) 0;
          max-width: 1080px;
          margin: 0 auto;
        }
        .skills__title {
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: clamp(2.25rem, 7vw, 3.5rem);
          line-height: 1.04;
          color: var(--ink);
        }
        .skills__lede {
          margin: 18px 0 0;
          max-width: 54ch;
          font-size: 1.0625rem;
          line-height: 1.66;
          color: var(--ink-soft);
        }
        .skills__grid {
          margin: clamp(32px, 5vw, 56px) 0 0;
          display: grid;
          gap: clamp(16px, 2.5vw, 24px);
        }
        @media (min-width: 620px) {
          .skills__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 980px) {
          .skills__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        .pane {
          position: relative;
          padding: clamp(20px, 3vw, 30px);
          border-radius: 18px;
          border: 1px solid var(--glass-edge);
          background: var(--glass-tint);
          backdrop-filter: blur(16px) saturate(1.12);
          box-shadow:
            0 1px 0 var(--glass-spec) inset,
            0 12px 34px rgb(var(--shadow-rgb) / 0.13);
          overflow: hidden;
        }
        /* The specular lip along the top edge that every pane on the site carries. */
        .pane::before {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 42%;
          background: linear-gradient(to bottom, var(--glass-spec), transparent);
          opacity: 0.4;
          pointer-events: none;
        }
        .pane__title {
          position: relative;
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: 1.375rem;
          line-height: 1.15;
          color: var(--pane-ink);
        }
        .pane__note {
          position: relative;
          margin: 10px 0 0;
          font-size: 0.9375rem;
          line-height: 1.55;
          color: var(--pane-ink-soft);
        }
        .pane__list {
          position: relative;
          list-style: none;
          margin: 18px 0 0;
          padding: 0;
          display: grid;
          gap: 9px;
        }
        .pane__list li {
          padding-left: 18px;
          position: relative;
          line-height: 1.45;
          color: var(--pane-ink);
        }
        /* A small refracted mark rather than a bullet. */
        .pane__list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          border: 1px solid var(--glass-edge);
          background: linear-gradient(140deg, var(--blush), var(--sky));
        }
      `}</style>
    </>
  );
}
