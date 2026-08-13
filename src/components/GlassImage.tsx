import Image from "next/image";
import { getImage } from "@/lib/content";

type Props = {
  src: string;
  /** Passed straight to next/image. Required, because optimization is off. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * An image seen through a frosted pane.
 *
 * Width and height always come from src/content/images.json rather than being
 * guessed, so the space is reserved before the file loads and nothing shifts.
 * getImage throws if an entry is missing, which is deliberate: a silent
 * fallback would ship a layout shift instead of failing in development.
 */
export default function GlassImage({ src, sizes, priority = false, className }: Props) {
  const meta = getImage(src);
  return (
    <span className={`glassimg ${className ?? ""}`.trim()}>
      <Image
        src={src}
        alt={meta.alt}
        width={meta.width}
        height={meta.height}
        sizes={sizes}
        priority={priority}
      />
      <style>{`
        .glassimg {
          display: block;
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid var(--glass-edge);
          background: var(--ground-2);
          box-shadow:
            0 1px 0 var(--glass-spec) inset,
            0 14px 40px rgb(var(--shadow-rgb) / 0.16);
        }
        .glassimg img {
          display: block;
          width: 100%;
          height: auto;
        }
        /* The specular lip along the top edge, the same one the panes carry. */
        .glassimg::after {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 34%;
          background: linear-gradient(
            to bottom,
            var(--glass-spec) 0%,
            transparent 100%
          );
          opacity: 0.28;
          pointer-events: none;
        }
      `}</style>
    </span>
  );
}
