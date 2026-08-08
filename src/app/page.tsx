import LightPicker from "@/components/LightPicker";

/**
 * Phase 1 home page.
 *
 * Deliberately near empty. Its only job right now is to prove the GitHub Pages
 * deploy works end to end at the live URL, and to let the four light
 * conditions be checked against real type before any layout depends on them.
 *
 * It contains no claim about Fatemeh, because none has been supplied yet.
 * The real home page is built from src/content once it has.
 */
export default function Home() {
  return (
    <main id="main" className="shell">
      <div className="shell__dial">
        <LightPicker />
      </div>

      <div className="pane">
        <p className="pane__label">Soft Glass</p>
        <h1 className="pane__title">
          Light through
          <span className="pane__title-em"> tinted glass</span>
        </h1>
        <p className="pane__body">
          This site is being built. Change the light using the dial above and
          the whole page changes with it.
        </p>
      </div>

      <style>{`
        .shell {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
          padding: 32px 20px 64px;
          position: relative;
          isolation: isolate;
        }
        /* The caustic pooling under the glass, positioned by the shared light.
           Decorative only, so it is hidden from assistive technology. */
        .shell::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(
              60vmax 45vmax at var(--light-x) var(--light-y),
              var(--caustic-1) 0%,
              transparent 62%
            ),
            radial-gradient(
              48vmax 40vmax at calc(100% - var(--light-x)) calc(var(--light-y) + 34%),
              var(--caustic-2) 0%,
              transparent 66%
            );
          transition: background-position 400ms ease;
          pointer-events: none;
        }
        .shell__dial { display: flex; justify-content: center; }

        .pane {
          width: 100%;
          max-width: 640px;
          padding: clamp(28px, 6vw, 52px);
          border-radius: 20px;
          border: 1px solid var(--glass-edge);
          background: var(--glass-tint);
          backdrop-filter: blur(20px) saturate(1.2);
          box-shadow:
            0 1px 0 var(--glass-spec) inset,
            0 18px 50px rgb(var(--shadow-rgb) / 0.16);
          text-align: center;
        }
        .pane__label {
          margin: 0 0 18px;
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--azure-deep);
        }
        .pane__title {
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: clamp(2.25rem, 8vw, 4rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          color: var(--pane-ink);
          text-wrap: balance;
        }
        /* The dichroic edge: rose shifting to azure across the letterforms. */
        .pane__title-em {
          background: linear-gradient(
            96deg,
            var(--rose-deep) 0%,
            var(--lilac-deep) 52%,
            var(--azure-deep) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .pane__body {
          margin: 22px auto 0;
          max-width: 46ch;
          font-size: 1.0625rem;
          line-height: 1.65;
          color: var(--pane-ink-soft);
        }
      `}</style>
    </main>
  );
}
