"use client";

import { useEffect } from "react";

/**
 * The shared light.
 *
 * One controller tracks a single light position and publishes it on the root
 * element as --light-x, --light-y and --light-strength. Every pane, specular
 * highlight and caustic on the site reads those three values. This is the
 * detail that makes the whole site feel like one physical space rather than a
 * stack of unrelated sections.
 *
 * Rules it follows:
 *   - One listener for the whole page, throttled to one rAF, never one per element.
 *   - Nothing runs while idle. The frame is only scheduled when the pointer moves.
 *   - Fine pointers only. On touch the light stays at its resting position,
 *     which is already correct in CSS, so nothing is stranded.
 *   - Disabled entirely under prefers-reduced-motion.
 */
export default function LightController() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      root.style.setProperty("--light-x", `${x.toFixed(2)}%`);
      root.style.setProperty("--light-y", `${y.toFixed(2)}%`);
    };

    const onMove = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth) * 100;
      y = (event.clientY / window.innerHeight) * 100;
      // Coalesce to one write per frame. If a frame is already queued, the
      // newer position simply replaces the older one.
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      // Return to the resting values declared in globals.css rather than
      // freezing wherever the cursor happened to exit.
      root.style.removeProperty("--light-x");
      root.style.removeProperty("--light-y");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);

  return null;
}
