import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { interests, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Interests | ${site.name}`,
  description: "Reading, crafts, cooking, travel, music and dance.",
};

/**
 * Each interest gets its own composition rather than a row of identical cards.
 * The mark beside each one is drawn inline as SVG, per interest, using that
 * interest's accent token: no icon pack, no hardcoded colour.
 *
 * Deliberately no descriptive prose. Fatima gave the list but not her reasons,
 * and inventing a reason on her behalf would be a fabricated claim. The layout
 * is built so the titles carry the page on their own until she adds more.
 */

function Mark({ id }: { id: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="mark">
      {id === "reading" ? (
        <>
          <path d="M24 12c-4-3-9-3.5-14-3v25c5-.5 10 0 14 3 4-3 9-3.5 14-3V9c-5-.5-10 0-14 3Z" {...common} />
          <path d="M24 12v25" {...common} />
        </>
      ) : null}
      {id === "crafts" ? (
        <>
          <circle cx="18" cy="18" r="7" {...common} />
          <path d="M23 23 38 38M33 38h5v-5" {...common} />
          <path d="M14 14c3 2 5 4 7 8" {...common} />
        </>
      ) : null}
      {id === "cooking" ? (
        <>
          <path d="M10 22h28c0 8-6 14-14 14s-14-6-14-14Z" {...common} />
          <path d="M8 22h32M20 14c0-3 3-3 3-6M27 14c0-3 3-3 3-6" {...common} />
        </>
      ) : null}
      {id === "travel" ? (
        <>
          <circle cx="24" cy="24" r="15" {...common} />
          <path d="M9 24h30M24 9c4 5 4 25 0 30M24 9c-4 5-4 25 0 30" {...common} />
        </>
      ) : null}
      {id === "music" ? (
        <>
          <path d="M19 32V13l16-3v19" {...common} />
          <circle cx="15" cy="32" r="4" {...common} />
          <circle cx="31" cy="29" r="4" {...common} />
        </>
      ) : null}
      {id === "dance" ? (
        <>
          <circle cx="27" cy="11" r="4" {...common} />
          <path d="M27 15c-2 5-6 7-11 7M27 15c3 3 4 7 3 11M30 26c3 3 4 7 3 11M30 26c-4 2-7 5-9 10" {...common} />
        </>
      ) : null}
    </svg>
  );
}

export default function InterestsPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="ints">
        <header className="ints__head">
          <h1 className="ints__title">Interests</h1>
          <p className="ints__lede">
            The things I spend time on when I am not making work.
          </p>
        </header>

        <ul className="ints__list">
          {interests.map((interest, index) => (
            <li
              key={interest.id}
              className="int"
              data-accent={interest.accent}
              data-side={index % 2 === 0 ? "left" : "right"}
            >
              <span className="int__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="int__mark">
                <Mark id={interest.id} />
              </span>
              <h2 className="int__title">{interest.title}</h2>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />

      <style>{`
        .ints {
          padding: clamp(20px, 5vw, 64px) clamp(16px, 4vw, 44px) 0;
          max-width: 1000px;
          margin: 0 auto;
        }
        .ints__title {
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: clamp(2.25rem, 7vw, 3.5rem);
          line-height: 1.04;
          color: var(--ink);
        }
        .ints__lede {
          margin: 18px 0 0;
          max-width: 50ch;
          font-size: 1.0625rem;
          line-height: 1.66;
          color: var(--ink-soft);
        }
        .ints__list {
          list-style: none;
          margin: clamp(28px, 5vw, 52px) 0 0;
          padding: 0;
        }

        .int {
          position: relative;
          display: flex;
          align-items: center;
          gap: clamp(14px, 3vw, 28px);
          padding: clamp(22px, 4vw, 34px) clamp(18px, 3vw, 32px);
          border-top: 1px solid var(--line);
        }
        .int:last-child { border-bottom: 1px solid var(--line); }
        /* Alternating alignment so the page has a rhythm rather than a stack. */
        .int[data-side="right"] { flex-direction: row-reverse; text-align: right; }

        .int__index {
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--ink-soft);
          opacity: 0.7;
        }
        .int__mark {
          display: grid;
          place-items: center;
          width: clamp(52px, 9vw, 74px);
          height: clamp(52px, 9vw, 74px);
          flex: none;
          border-radius: 16px;
          border: 1px solid var(--glass-edge);
          background: var(--glass-tint);
          box-shadow:
            0 1px 0 var(--glass-spec) inset,
            0 8px 22px rgb(var(--shadow-rgb) / 0.12);
          transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .int__mark .mark { width: 60%; height: 60%; }
        .int:hover .int__mark { transform: rotate(-5deg) scale(1.04); }
        @media (prefers-reduced-motion: reduce) {
          .int:hover .int__mark { transform: none; }
        }

        .int__title {
          margin: 0;
          margin-right: auto;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: clamp(1.5rem, 4.5vw, 2.25rem);
          line-height: 1.12;
          color: var(--ink);
          text-wrap: balance;
        }
        .int[data-side="right"] .int__title { margin-right: 0; margin-left: auto; }

        /* Each interest carries its own colour, from the accent tokens only. */
        .int[data-accent="rose"] .int__mark { color: var(--rose-deep); }
        .int[data-accent="azure"] .int__mark { color: var(--azure-deep); }
        .int[data-accent="lilac"] .int__mark { color: var(--lilac-deep); }
        .int[data-accent="blush"] .int__mark { color: var(--rose-deep); }
        .int[data-accent="sky"] .int__mark { color: var(--azure-deep); }
      `}</style>
    </>
  );
}
