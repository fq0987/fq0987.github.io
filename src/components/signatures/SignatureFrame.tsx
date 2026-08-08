"use client";

import type { ReactNode } from "react";
import type { Accent } from "@/lib/content";

type Props = {
  accent: Accent;
  /** Two to four words naming the moment. */
  title: string;
  /** One or two plain sentences. Real facts only, no decoration. */
  meaning: string;
  /** Imperative, six words or fewer. */
  hint: string;
  /** Dims the hint once the visitor has succeeded at the interaction. */
  done?: boolean;
  children: ReactNode;
};

/**
 * The shared frame every project signature sits inside.
 *
 * The frame is what keeps the site coherent while the interaction inside it is
 * completely tailored to the project. The accent is the project's own colour,
 * so each page reads as the same site seen under a different light.
 */
export default function SignatureFrame({
  accent,
  title,
  meaning,
  hint,
  done = false,
  children,
}: Props) {
  return (
    <figure className="sigframe" data-accent={accent}>
      <div className="sigframe__stage">{children}</div>

      <figcaption className="sigframe__caption">
        <h2 className="sigframe__title">{title}</h2>
        <p className="sigframe__meaning">{meaning}</p>
        <p className="sigframe__hint" data-done={done}>
          {hint}
        </p>
      </figcaption>

      <style>{`
        .sigframe {
          margin: 0;
          display: grid;
          gap: 20px;
        }
        .sigframe__stage {
          position: relative;
          border-radius: 18px;
          border: 1px solid var(--glass-edge);
          background: var(--glass-tint);
          backdrop-filter: blur(18px) saturate(1.15);
          box-shadow:
            0 1px 0 var(--glass-spec) inset,
            0 16px 44px rgb(var(--shadow-rgb) / 0.15);
          overflow: hidden;
          /* Vertical page scroll is never trapped by a signature. Any handle
             that needs full control sets touch-action: none on itself only. */
          touch-action: pan-y;
        }
        .sigframe__caption { display: grid; gap: 8px; }
        .sigframe__title {
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: 1.5rem;
          line-height: 1.15;
          color: var(--ink);
        }
        .sigframe__meaning {
          margin: 0;
          max-width: 62ch;
          line-height: 1.6;
          color: var(--ink-soft);
        }
        .sigframe__hint {
          margin: 0;
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: opacity 400ms ease;
        }
        .sigframe__hint[data-done="false"] { opacity: 1; }
        .sigframe__hint[data-done="true"] { opacity: 0.4; }

        /* The project's own colour, applied through the accent tokens rather
           than any hardcoded value. */
        .sigframe[data-accent="rose"] .sigframe__hint { color: var(--rose-deep); }
        .sigframe[data-accent="azure"] .sigframe__hint { color: var(--azure-deep); }
        .sigframe[data-accent="lilac"] .sigframe__hint { color: var(--lilac-deep); }
        .sigframe[data-accent="blush"] .sigframe__hint { color: var(--rose-deep); }
        .sigframe[data-accent="sky"] .sigframe__hint { color: var(--azure-deep); }
      `}</style>
    </figure>
  );
}
