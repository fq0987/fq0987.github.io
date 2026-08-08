"use client";

/**
 * Route changes are a light change, not a fade.
 *
 * A template remounts on every navigation, which is what lets the transition
 * run. The effect is a brief sweep of the specular across the page, the way
 * light moves when you turn a pane of glass, rather than the page dimming to
 * nothing and coming back.
 *
 * Resting state is fully visible: the animation starts at opacity 1, so if it
 * is interrupted, never starts, or reduced motion is on, the page simply is
 * there. Initial visibility is never gated on an animation.
 */
export default function Template({ children }: LayoutProps<"/">) {
  return (
    <div className="route">
      {children}
      <style>{`
        .route { animation: route-light 520ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes route-light {
          from {
            opacity: 1;
            filter: saturate(1.25) brightness(1.04);
            transform: translate3d(0, 6px, 0);
          }
          to {
            opacity: 1;
            filter: none;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .route { animation: none; }
        }
      `}</style>
    </div>
  );
}
