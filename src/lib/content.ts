import aboutData from "@/content/about.json";
import interestsData from "@/content/interests.json";
import projectsData from "@/content/projects.json";
import skillsData from "@/content/skills.json";
import siteData from "@/content/site.json";
import imagesData from "@/content/images.json";

/**
 * The only route between content and components.
 *
 * Components import from here. They never import a JSON file directly and they
 * never contain a sentence of copy themselves. If a component needs a string,
 * it comes from src/content.
 *
 * Nothing in src/content may be invented. Every fact traces back to something
 * Fatemeh supplied.
 */

/** The project's own colour, drawn from the accent family in globals.css. */
export type Accent = "rose" | "azure" | "lilac" | "blush" | "sky";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  role: string;
  dateText: string;
  locationText: string;
  tags: string[];
  shortDescription: string;
  bodyHtml: string;
  heroImage: string;
  gallery: string[];
  links: ProjectLink[];
  /** Drives this page's glass tint and its signature interaction. */
  accent: Accent;
};

export type SiteLink = {
  label: string;
  href: string;
};

export type Site = {
  name: string;
  /** False until she has confirmed the spelling. Guards against publishing a guess. */
  nameConfirmed: boolean;
  tagline: string;
  location: string;
  email: string;
  links: SiteLink[];
  navLabels: Record<string, string>;
};

export type ImageMeta = {
  width: number;
  height: number;
  alt: string;
};

export const site = siteData as Site;

export const projects = (projectsData as { projects: Project[] }).projects;

const images = (imagesData as { images: Record<string, ImageMeta> }).images;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Fails loudly rather than falling back to a guessed size. A missing entry
 * here would mean an image that shifts the layout when it loads, which is a
 * bug worth stopping the build for.
 */
export function getImage(src: string): ImageMeta {
  const meta = images[src];
  if (!meta) {
    throw new Error(
      `No dimensions recorded for "${src}". Add it to src/content/images.json before using it.`,
    );
  }
  return meta;
}

/** True once there is enough real content to render a given section. */
export const hasProjects = projects.length > 0;
export const hasIdentity = site.nameConfirmed && site.name.length > 0;

/* ---------------------------------------------------------------------------
   About, skills and interests
   --------------------------------------------------------------------------- */

export type About = {
  intro: string;
  paragraphs: string[];
  note: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  /** Optional aside. Empty string means no note, not a missing one. */
  note: string;
  items: string[];
};

export type Interest = {
  id: string;
  title: string;
  accent: Accent;
};

export const about = aboutData as About;

export const skillGroups = (skillsData as { groups: SkillGroup[] }).groups;

export const interests = (interestsData as { interests: Interest[] }).interests;
