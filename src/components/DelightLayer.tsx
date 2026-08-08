"use client";

import { useEffect } from "react";

/**
 * The delight layer.
 *
 * Mounted once in the root layout. Three separate behaviours share a single
 * rAF loop and a single set of listeners, because one loop servicing many
 * elements is the rule, never one loop per element.
 *
 * Every part of this is disabled entirely under prefers-reduced-motion, and
 * the cursor driven parts are fine pointer only. Nothing here carries
 * information: if it never runs, the site is unchanged in meaning.
 */

const IDLE_DELAY_MS = 8000;
const IDLE_REPEAT_MIN_MS = 8000;
const IDLE_REPEAT_MAX_MS = 12000;
const PROXIMITY_RADIUS_PX = 80;

export default function DelightLayer() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // ---------------------------------------------------------- proximity
    // Decorative elements opt in with data-proximity. One listener services
    // every one of them, throttled to a single frame, and they rest at their
    // natural CSS values when the cursor is far away or the loop stops.
    let frame = 0;
    let pointerX = -9999;
    let pointerY = -9999;

    const settle = () => {
      frame = 0;
      const targets = document.querySelectorAll<HTMLElement>("[data-proximity]");
      for (const element of targets) {
        const box = element.getBoundingClientRect();
        const dx = pointerX - (box.left + box.width / 2);
        const dy = pointerY - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy);

        if (distance > PROXIMITY_RADIUS_PX) {
          // Back to the resting value declared in CSS, not a hardcoded zero.
          element.style.removeProperty("--proximity");
          element.style.removeProperty("--proximity-x");
          element.style.removeProperty("--proximity-y");
          continue;
        }

        const strength = 1 - distance / PROXIMITY_RADIUS_PX;
        // Eased so the response feels sprung rather than linear.
        const eased = strength * strength * (3 - 2 * strength);
        element.style.setProperty("--proximity", eased.toFixed(3));
        element.style.setProperty("--proximity-x", `${(dx / PROXIMITY_RADIUS_PX).toFixed(3)}`);
        element.style.setProperty("--proximity-y", `${(dy / PROXIMITY_RADIUS_PX).toFixed(3)}`);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(settle);
    };

    // ------------------------------------------------------------- idle
    // After a stretch of no activity, one visible decoration is nudged. The
    // nudge is dispatched as an event on window so bespoke components can hook
    // this same timer instead of each starting their own.
    let idleTimer: number | undefined;

    const nudge = () => {
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nudge]"),
      ).filter((element) => {
        const box = element.getBoundingClientRect();
        return box.bottom > 0 && box.top < window.innerHeight;
      });

      if (candidates.length > 0) {
        const chosen = candidates[Math.floor(Math.random() * candidates.length)];
        chosen.setAttribute("data-nudging", "true");
        window.setTimeout(() => chosen.removeAttribute("data-nudging"), 900);
      }

      window.dispatchEvent(new CustomEvent("softglass:idlenudge"));

      const next =
        IDLE_REPEAT_MIN_MS + Math.random() * (IDLE_REPEAT_MAX_MS - IDLE_REPEAT_MIN_MS);
      idleTimer = window.setTimeout(nudge, next);
    };

    const resetIdle = () => {
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(nudge, IDLE_DELAY_MS);
    };

    // --------------------------------------------------------- listeners
    const activity: Array<keyof WindowEventMap> = ["scroll", "keydown", "pointerdown"];
    for (const type of activity) {
      window.addEventListener(type, resetIdle, { passive: true });
    }
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointermove", resetIdle, { passive: true });
    }
    resetIdle();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (idleTimer) window.clearTimeout(idleTimer);
      for (const type of activity) window.removeEventListener(type, resetIdle);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointermove", resetIdle);
    };
  }, []);

  return null;
}
