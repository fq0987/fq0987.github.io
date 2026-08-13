import type { Metadata } from "next";
import GlassImage from "@/components/GlassImage";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { getProject, projects, site } from "@/lib/content";
import { SITE } from "@/lib/site";

/**
 * Every dynamic route needs generateStaticParams under static export, or the
 * build refuses to prerender it.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${site.name}`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      url: `${SITE.url}/work/${project.slug}/`,
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  // Cannot happen: generateStaticParams only emits slugs that exist. Throwing
  // rather than rendering an empty page means a content mistake fails loudly.
  if (!project) throw new Error(`No project with slug "${slug}"`);

  return (
    <>
      <SiteNav />

      <main id="main" className="proj" data-accent={project.accent}>
        <header className="proj__head">
          <p className="proj__meta">
            {project.dateText} &middot; {project.role} &middot; {project.locationText}
          </p>
          <h1 className="proj__title">{project.title}</h1>
          <ul className="proj__tags">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </header>

        <div className="proj__hero">
          <GlassImage
            src={project.heroImage}
            sizes="(max-width: 900px) 92vw, 720px"
            priority
          />
        </div>

        <div
          className="proj__body"
          dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
        />

        <ul className="proj__gallery">
          {project.gallery.map((src) => (
            <li key={src}>
              <GlassImage src={src} sizes="(max-width: 780px) 92vw, 420px" />
            </li>
          ))}
        </ul>

        {/* CreativeWork structured data, emitted into the static HTML. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: project.title,
              description: project.shortDescription,
              dateCreated: project.dateText,
              locationCreated: project.locationText,
              image: `${SITE.url}${project.heroImage}`,
              url: `${SITE.url}/work/${project.slug}/`,
              creator: { "@type": "Person", name: site.name },
            }),
          }}
        />
      </main>

      <SiteFooter />

      <style>{`
        .proj {
          padding: clamp(16px, 4vw, 48px) clamp(16px, 4vw, 44px) 0;
          max-width: 1080px;
          margin: 0 auto;
        }
        .proj__meta {
          margin: 0 0 14px;
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }
        .proj__title {
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 400;
          font-size: clamp(2.25rem, 7vw, 3.75rem);
          line-height: 1.03;
          letter-spacing: -0.022em;
          color: var(--ink);
          text-wrap: balance;
        }
        .proj__tags {
          list-style: none;
          margin: 22px 0 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .proj__tags li {
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid var(--glass-edge);
          background: var(--glass-tint);
          font-family: var(--font-meta), ui-monospace, monospace;
          font-size: 11px;
          color: var(--ink-soft);
        }
        .proj__hero {
          margin: clamp(28px, 5vw, 52px) auto 0;
          max-width: 720px;
        }
        .proj__body {
          margin: clamp(32px, 5vw, 56px) auto 0;
          max-width: 62ch;
        }
        .proj__body p {
          margin: 0 0 1.25em;
          font-size: 1.0625rem;
          line-height: 1.72;
          color: var(--ink);
        }
        .proj__body p:last-child { margin-bottom: 0; }
        .proj__gallery {
          list-style: none;
          margin: clamp(40px, 6vw, 72px) 0 0;
          padding: 0;
          display: grid;
          gap: clamp(18px, 3vw, 32px);
        }
        @media (min-width: 780px) {
          .proj__gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>
    </>
  );
}
