# Hard Will website

Landing page, guides and downloads for **Hard Will**, the MapleStory progression tracker.

| Piece | Choice |
| --- | --- |
| Framework | Nuxt 4 (Vue 3), fully pre-rendered with `nuxt generate` |
| UI | [shadcn-vue](https://www.shadcn-vue.com) on Tailwind CSS 4, monochrome theme, dark by default with a light toggle |
| State | Pinia (`app/stores/release.ts`) |
| Motion | GSAP 3 with ScrollTrigger and SplitText (`app/composables/useGsap.ts`) |
| Guides | Markdown in `content/guides/` via Nuxt Content |
| SEO / AEO | Nuxt SEO: sitemap, robots, schema.org, OG images; `public/llms.txt` |
| Hosting | Vercel (static) |

## Run it

Needs Node 22.12 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
npm run generate     # static site in .output/public
npx serve .output/public
npm run typecheck
```

## Layout

```
app/pages/              /, /download, /guides, /guides/[slug]
app/components/landing/ landing page sections (hero, features, how it works, FAQ, CTA)
app/components/site/    header, footer, logo, theme toggle, download buttons
app/components/ui/      shadcn-vue components (add more: npx shadcn-vue@latest add <name>)
app/components/OgImage/ the social preview image template
app/data/release.json   fallback version and download links (the build reads the newest from the API)
app/data/site.ts        nav, FAQ (also FAQPage structured data) and the Patreon link
app/data/characters.ts  placeholder characters for the app mocks (avatars in public/characters)
content/guides/         guides; front matter `steps` becomes HowTo structured data
public/llms.txt         summary for AI answer engines
```

## Downloads

The Download buttons and version come from the Hard Will API's
`GET /releases/latest` at build time (`server/api/release.get.ts`), with
`app/data/release.json` as the fallback when the API is unreachable.
Publishing a release (the desktop repo's `tools/release.ps1 -Publish`)
registers it in the API and calls the Vercel deploy hook, so the site
rebuilds with the new installer.

## Supporters

`/supporters` and the home page's thank-you strip read `GET /supporters` from the
Hard Will API at build time (`server/api/supporters.get.ts`), so the names are in
the static HTML and the site still builds if the API is down (the list is just
empty). Set `NUXT_API_URL` in Vercel to the API's URL. The API calls a Vercel
deploy hook whenever a pledge changes, so the list updates within a minute.

## Copy rules

No em dashes, en dashes or `--` in any visible text. Use commas, periods or `·`,
and "to" for ranges.

## Images

Ship images as WebP with explicit `width`/`height` and `decoding="async"`
(`loading="lazy"` below the fold). Avoid `backdrop-filter` and animated `blur()`:
they repaint on every scroll frame and make scrolling stutter on Windows.

## Animations

Wrap GSAP code in `useGsap(rootRef, ({ gsap, reduced }) => { ... })`: it scopes to the
component, reverts on unmount and honours `prefers-reduced-motion`. Add `data-reveal`
to an element and call `useReveal(rootRef)` for a fade-up on scroll. Content is in the
pre-rendered HTML either way; `data-reveal` only hides it once JavaScript has loaded.

Animate a wrapper rather than a shadcn component directly: their `transition-*`
classes fight GSAP. Avoid `[data-slot]` selectors; shadcn uses that attribute.

## SEO, AEO and Google Search Console

- Every route is static HTML with title, description, canonical, Open Graph/Twitter tags and an OG image.
- Structured data: Organization, WebSite, SoftwareApplication, FAQPage (home), HowTo + TechArticle (guides), BreadcrumbList.
- `/robots.txt` and `/sitemap.xml` are generated; AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …) are explicitly allowed.
- Vercel preview deployments are marked `noindex`; only production is indexable.

Search Console setup, once the domain is live:

1. Set `NUXT_PUBLIC_SITE_URL` in Vercel to the production domain.
2. In Search Console add a **Domain** property and verify it with the DNS TXT record (preferred),
   or add a URL-prefix property and put the HTML-tag value in `NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Submit `https://<domain>/sitemap.xml` under Sitemaps.
