import Link from "next/link";

/**
 * Stays inside the world. Static export writes this to 404.html and GitHub
 * Pages serves it automatically for any unmatched path.
 */
export default function NotFound() {
  return (
    <main id="main" className="nf">
      <p className="nf__label">404</p>
      <h1 className="nf__title">The light does not reach here</h1>
      <p className="nf__body">There is no page at this address.</p>
      <Link href="/" className="nf__link">
        Back to the beginning
      </Link>

      <style>{`
        .nf {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 32px 20px;
          text-align: center;
        }
        .nf__label {
          margin: 0;
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: var(--rose-deep);
        }
        .nf__title {
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: clamp(1.75rem, 6vw, 3rem);
          line-height: 1.1;
          color: var(--ink);
          text-wrap: balance;
        }
        .nf__body { margin: 0; color: var(--ink-soft); }
        .nf__link {
          margin-top: 10px;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid var(--glass-edge);
          background: var(--glass-tint);
          color: var(--azure-deep);
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 13px;
          text-decoration: none;
        }
        .nf__link:hover { background: var(--pane); }
      `}</style>
    </main>
  );
}
