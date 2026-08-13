import Link from "next/link";
import LightPicker from "./LightPicker";
import { site } from "@/lib/content";

/**
 * Nav items are structural labels, not claims, so they live in site.json
 * alongside everything else rather than being written into this component.
 * Only routes that exist are linked.
 */
export default function SiteNav() {
  return (
    <header className="nav">
      <Link href="/" className="nav__name">
        {site.name}
      </Link>
      <nav className="nav__links" aria-label="Main">
        <Link href="/work">{site.navLabels.work}</Link>
        <Link href="/about">{site.navLabels.about}</Link>
        <Link href="/skills">{site.navLabels.skills}</Link>
        <Link href="/interests">{site.navLabels.interests}</Link>
      </nav>
      <div className="nav__dial">
        <LightPicker />
      </div>

      <style>{`
        .nav {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          padding: 20px clamp(16px, 4vw, 44px);
        }
        .nav__name {
          font-family: var(--font-display), Georgia, serif;
          font-size: 1.125rem;
          letter-spacing: -0.01em;
          color: var(--ink);
          text-decoration: none;
        }
        .nav__links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-right: auto;
        }
        .nav__links a {
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-soft);
          text-decoration: none;
        }
        .nav__links a:hover { color: var(--azure-deep); }
        /* At 375px the dial drops to its own line rather than squeezing the name. */
        @media (max-width: 560px) {
          .nav { gap: 12px; }
          .nav__dial { width: 100%; display: flex; }
        }
      `}</style>
    </header>
  );
}
