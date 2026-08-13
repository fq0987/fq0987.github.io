/**
 * Static export requires route handlers to declare themselves static, or the
 * build refuses to collect them. With this, sitemap.xml is emitted as a real
 * file into out/ at build time.
 */
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { SITE } from "@/lib/site";

/**
 * Emits a static sitemap.xml at build time. Under static export this becomes a
 * real file in out/, which is verified as part of the release checklist rather
 * than assumed.
 *
 * Project routes are generated from the content file, so a project cannot be
 * added to the site and forgotten here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Only routes that actually exist. Listing /work before the work index is
  // built would put a 404 in the sitemap, which is worse than omitting it.
  const paths = [
    "",
    "/about",
    "/skills",
    "/interests",
    ...(projects.length > 0 ? ["/work"] : []),
  ];

  const staticRoutes = paths.map((path) => ({
    url: `${SITE.url}${path}/`,
    lastModified: now,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${SITE.url}/work/${project.slug}/`,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes];
}
