"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_LIGHT,
  LIGHT_CONDITIONS,
  STORAGE_KEY,
  isLightId,
  themeColorFor,
  type LightId,
} from "@/lib/light";

/**
 * The light dial.
 *
 * Four glass chips, not four coloured dots. Real buttons, so Tab reaches them
 * and Enter or Space operates them, with a visible focus ring inherited from
 * globals.css.
 *
 * The chosen condition is written to sessionStorage first, so a visitor can
 * open several tabs side by side under different lights, and to localStorage
 * as well, so the choice survives a return visit. The pre-paint script in the
 * root layout reads them back in that order.
 */
/**
 * The current light is owned by the DOM, not by React.
 *
 * The pre-paint script sets data-light on <html> before React exists, and the
 * picker writes straight back to that attribute. Mirroring it into React state
 * inside an effect would mean rendering once with the wrong value and then
 * correcting it, which is a cascading render and a flash of the wrong chip.
 *
 * useSyncExternalStore subscribes to the attribute itself, so the component
 * reads the real current value on the very first client render. The server
 * snapshot is Morning, which is what the static HTML is generated with.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-light"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): LightId {
  const current = document.documentElement.getAttribute("data-light");
  return isLightId(current) ? current : DEFAULT_LIGHT;
}

function getServerSnapshot(): LightId {
  return DEFAULT_LIGHT;
}

export default function LightPicker() {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const choose = useCallback((id: LightId) => {
    // Writing the attribute is what actually changes the light. The observer
    // above then tells React, so there is exactly one source of truth.
    document.documentElement.setAttribute("data-light", id);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", themeColorFor(id));

    try {
      sessionStorage.setItem(STORAGE_KEY, id);
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Private browsing with storage blocked. The light still changes for
      // this page view, it simply will not be remembered. Nothing to recover.
    }
  }, []);

  return (
    <div
      className="lightpicker"
      role="group"
      aria-label="Choose the light falling on this site"
    >
      {LIGHT_CONDITIONS.map((condition) => (
        <button
          key={condition.id}
          type="button"
          className="lightpicker__chip"
          data-active={condition.id === active}
          aria-pressed={condition.id === active}
          aria-label={`${condition.name} light. ${condition.description}.`}
          onClick={() => choose(condition.id)}
        >
          <span className="lightpicker__pane" aria-hidden="true" />
          <span className="lightpicker__name">{condition.name}</span>
        </button>
      ))}

      <style>{`
        .lightpicker {
          display: flex;
          gap: 6px;
          padding: 6px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: var(--glass-tint);
          backdrop-filter: blur(14px) saturate(1.15);
          box-shadow:
            0 1px 0 var(--glass-spec) inset,
            0 6px 20px rgb(var(--shadow-rgb) / 0.14);
        }
        .lightpicker__chip {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px 5px 6px;
          border: 1px solid transparent;
          border-radius: 999px;
          background: transparent;
          color: var(--ink-soft);
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 200ms ease, background-color 200ms ease,
            border-color 200ms ease;
        }
        .lightpicker__chip[data-active="true"] {
          color: var(--ink);
          border-color: var(--glass-edge);
          background: var(--pane);
        }
        .lightpicker__chip:hover .lightpicker__pane {
          transform: rotate(8deg);
        }
        /* Each chip is a tiny pane of the glass, lit from the shared light. */
        .lightpicker__pane {
          width: 14px;
          height: 14px;
          border-radius: 4px;
          border: 1px solid var(--glass-edge);
          background: linear-gradient(
            140deg,
            var(--glass-spec) 0%,
            var(--blush) 45%,
            var(--sky) 100%
          );
          box-shadow: 0 1px 2px rgb(var(--shadow-rgb) / 0.22);
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .lightpicker__chip:hover .lightpicker__pane { transform: none; }
        }
        /* The names are the first thing to go at 375px. The aria-label on each
           button still carries the full description, so nothing is lost. */
        @media (max-width: 560px) {
          .lightpicker__name { display: none; }
          .lightpicker__chip { padding: 6px; }
        }
      `}</style>
    </div>
  );
}
