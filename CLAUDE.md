# fq0987.github.io

Personal portfolio site for Fatemeh Qudsi.

- Repository: https://github.com/fq0987/fq0987.github.io
- Live site: https://fq0987.github.io

## Stack

Next.js 16 App Router, TypeScript, Tailwind CSS v4, `motion` for animation,
`lenis` for smooth scroll. npm for everything. No component kits, no icon
packs, no other UI or animation libraries. The few icons on the site are inline
SVG.

```
npm run dev        # local development
npm run build      # static export into out/
npm run lint       # eslint
npm run typecheck  # next typegen, then tsc --noEmit
```

Read `AGENTS.md` before writing any code. This version of Next.js differs from
what most models were trained on, and the differences are load bearing.

## How it publishes

**GitHub only. There is no second host.** Pages is built by
`.github/workflows/deploy.yml` on every push to `main`. There is no manual
deploy and no upload step. If the live site is wrong, the fix is a commit.

Do not add Vercel, Netlify, Cloudflare Pages, an external image host or a CDN,
not even for a preview. If a task appears to need another service, stop and say
so rather than reaching for one.

Repository Settings, Pages, Source is set to **GitHub Actions**, not a branch.

### Static export constraints

`output: 'export'` in `next.config.ts`. That means:

- No API routes, no server actions, no middleware, no ISR, no dynamic
  rendering, no runtime redirects. Every dynamic route needs
  `generateStaticParams`.
- Route handlers such as `sitemap.ts` and `robots.ts` must export
  `const dynamic = "force-static"` or the build fails while collecting them.
  This is not optional and is not a workaround.
- `images: { unoptimized: true }`. Every image ships exactly as committed, so
  resize and compress each one by hand before committing it, at its largest
  display size at 2x. Record its dimensions in `src/content/images.json` and
  pass them explicitly to `next/image` so nothing shifts on load. A 6MB phone
  photo in the repository is a bug, not an asset.
- `trailingSlash: true` so Pages resolves `/work/slug/` to the right
  `index.html`.

### basePath

The repository is named `fq0987.github.io`, so it serves from the domain root
and **no `basePath` or `assetPrefix` is needed**. If this site is ever moved to
a repository with a different name, both must be set to `/<repo>` or every
stylesheet, image, font and internal link breaks in production while continuing
to work perfectly in dev.

## The design language: Soft Glass

The site is a study in light passing through tinted glass. Frosted rose and
pale azure panes, layered translucency, refracted edges, caustics pooling on
the surface below. Content sits behind and inside glass. Photographs read as if
seen through a frosted pane, headings catch a dichroic edge that shifts rose to
azure across the letterforms, cards are panels with real depth and a bright
specular lip along the top edge.

The pink and the blue are not decoration. Dichroic glass physically splits
light into rose and azure, so every gradient, shadow and highlight has a
reason. Depth comes from tinted light, never from darkness. Shadows are azure
tinted at low opacity, never grey and never black.

Do not drift off this. Do not blend in another concept. Two alternates,
Tidepool and Porcelain, were pitched and rejected in favour of this one, so do
not rebuild them.

## Hard rules

1. **No invented facts.** No number, date, award, title, metric or claim
   appears on this site unless Fatemeh supplied it. Decorative metaphor is
   free. Fabricated specifics are a hard failure. If a layout wants a statistic
   and there is none, change the layout.
2. **No exam grades anywhere.** Her explicit instruction.
3. **No photograph she has not personally approved.** Also her explicit
   instruction. No stock photography, no illustration libraries, no generic
   silhouette placeholders. If an image is missing, design the empty state as
   though it were intentional and ask her for the photo.
4. **The light picker is permanent.** Four conditions, Morning, Overcast,
   Golden and Dusk, each a hand tuned palette. It is not a theme toggle to be
   simplified away later.
5. **No em dashes or en dashes**, in site copy, code comments, commit messages
   or anything written for her. Commas, periods, colons, and "to" for ranges.
6. **No dark mode and no dark hero.** Even Dusk stays luminous.
7. **No hardcoded hex values in components.** Everything flows from the tokens
   in `globals.css`. The single exception is a physically coloured object
   inside a scene, which must carry a comment explaining why it is fixed.
8. **No cookie banner, no analytics, no third party scripts.** No contact form
   unless she asks for one.
9. **Copy is rewritten, not quoted.** She asked directly for her words to be
   rephrased rather than shipped verbatim. Keep her meaning exactly, improve
   the prose.

## Gotchas, things that look like bugs and are not

- **Fonts are `next/font/local`, not `next/font/google`.** The brief asked for
  Google Fonts. They are self hosted from `src/fonts` instead, because the
  build environment could not reach fonts.googleapis.com, and because the same
  brief requires every asset to live in this repository. The `@fontsource`
  packages in devDependencies exist only so the files' provenance and licence
  are traceable. Nothing imports them at runtime. Do not "fix" this back.
- **`LightPicker` holds no React state.** The current condition lives on the
  `data-light` attribute of `<html>`, set by a pre-paint script before React
  exists. The component subscribes to that attribute with
  `useSyncExternalStore`. Mirroring it into state inside an effect would render
  the wrong chip and then correct it, which is a visible flash.
- **The pre-paint script in `layout.tsx` is inline and blocking on purpose.**
  Moving it, deferring it or bundling it reintroduces a flash of the wrong
  light on every load.
- **`getImage` throws instead of falling back.** A missing dimension entry
  means an image that shifts the layout when it loads, so it fails loudly in
  development rather than quietly shipping.
- **`next-env.d.ts` is gitignored.** Next.js generates it. Do not commit or
  edit it.
- **A bare `tsc --noEmit` fails on a fresh checkout.** `PageProps` and
  `LayoutProps` are generated. Run `next typegen` first, which is what
  `npm run typecheck` and the CI workflow both do.

## Content architecture

Every string, project and date lives in `src/content/*.json`. Components import
from `src/lib/content.ts` and never contain copy.

`site.json` carries a `nameConfirmed` flag. Her name is spelled **Fatemeh
Qudsi** on her university offer and A level portfolio, but **Fatima Qudsi** in
her email address. Until she confirms which spelling is public, the flag stays
false and nothing renders her name.
