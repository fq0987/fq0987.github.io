import { site } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="foot">
      <p className="foot__line">
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <style>{`
        .foot {
          margin-top: auto;
          padding: 56px clamp(16px, 4vw, 44px) 40px;
          border-top: 1px solid var(--line);
        }
        .foot__line {
          margin: 0;
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 12px;
        }
        .foot__line a {
          color: var(--azure-deep);
          text-decoration: none;
          border-bottom: 1px solid var(--glass-edge);
        }
        .foot__line a:hover { color: var(--rose-deep); }
      `}</style>
    </footer>
  );
}
