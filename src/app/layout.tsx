import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import ConsoleSignature from "@/components/ConsoleSignature";
import DelightLayer from "@/components/DelightLayer";
import LightController from "@/components/LightController";
import { DEFAULT_LIGHT, LIGHT_PREPAINT_SCRIPT, themeColorFor } from "@/lib/light";
import { SITE } from "@/lib/site";
import "./globals.css";

/**
 * Three faces, no more.
 *
 * Display: Fraunces, a variable serif with a real optical size axis.
 * Body: Source Sans 3, humanist, holds up at small sizes.
 * Meta: IBM Plex Mono, used only for dates, labels and captions.
 *
 * DELIBERATE DEVIATION FROM THE BRIEF, do not "fix" this back.
 * The brief asks for next/font/google. These are loaded with next/font/local
 * from woff2 files committed in src/fonts instead. Two reasons:
 *
 *   1. next/font/google fetches from fonts.googleapis.com at build time. That
 *      made the build unreproducible in the environment this site was built
 *      in, and it means a Google outage can fail a deploy.
 *   2. The brief also says every asset lives in this repository and nothing is
 *      fetched from somewhere else. Committing the font files satisfies that
 *      more literally than a build time download does.
 *
 * The files came from the @fontsource packages, kept in devDependencies purely
 * so their provenance and licence are traceable. Nothing imports them at
 * runtime. Both families are SIL Open Font Licence 1.1.
 *
 * Subset to latin only, which is why the display sizes are small. If Arabic
 * type is ever needed on this site, add a separate family rather than
 * widening these, because the Arabic subsets are large.
 */
const fraunces = localFont({
  src: "../fonts/fraunces-latin-full-normal.woff2",
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
  style: "normal",
});

const sourceSans = localFont({
  src: "../fonts/source-sans-3-latin-wght-normal.woff2",
  variable: "--font-source-sans",
  display: "swap",
  weight: "200 900",
  style: "normal",
});

const plexMono = localFont({
  src: [
    { path: "../fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
};

export const viewport: Viewport = {
  // Overwritten before first paint by the script below when a different light
  // condition is stored. This value is the Morning ground.
  themeColor: themeColorFor(DEFAULT_LIGHT),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-light={DEFAULT_LIGHT}
      className={`${fraunces.variable} ${sourceSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Applies the stored light condition before the browser paints, so a
          visitor who chose Dusk never sees a frame of Morning first. This has
          to be inline and blocking, in <head>, ahead of any stylesheet work.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: LIGHT_PREPAINT_SCRIPT }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LightController />
        <DelightLayer />
        <ConsoleSignature />
        {children}
        <style>{`
          .skip-link {
            position: absolute;
            left: 12px;
            top: -64px;
            z-index: 100;
            padding: 10px 16px;
            border-radius: 999px;
            background: var(--pane);
            color: var(--pane-ink);
            border: 1px solid var(--line);
            box-shadow: 0 6px 20px rgb(var(--shadow-rgb) / 0.18);
            font-family: var(--font-meta), ui-monospace, monospace;
            font-size: 13px;
            transition: top 180ms ease;
          }
          .skip-link:focus-visible { top: 12px; }
        `}</style>
      </body>
    </html>
  );
}
