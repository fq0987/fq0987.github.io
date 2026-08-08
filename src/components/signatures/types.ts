import type { Accent } from "@/lib/content";

/**
 * The only props a signature receives. A signature never reaches for content
 * itself: everything it needs to say is passed to SignatureFrame by the page.
 */
export type SignatureProps = {
  accent: Accent;
};
