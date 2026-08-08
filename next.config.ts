import type { NextConfig } from "next";

/**
 * Soft Glass portfolio, fatimaqudsi.
 *
 * This site is hosted on GitHub Pages and nowhere else. Pages serves static
 * files only, so the whole app is exported to `out/` at build time.
 *
 * The repository is named `fq0987.github.io`, which serves from the domain
 * root at https://fq0987.github.io. That is the ONLY reason `basePath` and
 * `assetPrefix` are absent here. If this site is ever moved to a repository
 * with a different name, both must be set to `/<repo>` or every stylesheet,
 * image, font and internal link breaks in production while still working in
 * dev. Do not remove this comment.
 */
const nextConfig: NextConfig = {
  // GitHub Pages cannot run a Next.js server. Everything is prerendered.
  output: "export",

  // Pages has no image optimization endpoint. Every image ships from the repo
  // exactly as committed, so each one is resized and compressed by hand before
  // it lands in `public/`.
  images: { unoptimized: true },

  // Pages resolves `/work/slug/` to `/work/slug/index.html`. Without this the
  // exported flat `.html` files 404 on every route except the home page.
  trailingSlash: true,
};

export default nextConfig;
