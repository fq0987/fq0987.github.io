/**
 * Static export requires route handlers to declare themselves static, or the
 * build refuses to collect them. With this, robots.txt is emitted as a real
 * file into out/ at build time.
 */
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
