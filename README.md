# Galaxy-Digital Website

Static marketing site for **www.galaxy-digital.ae** — a UAE-based IT consultancy / MSP specialising in cloud-native, DevOps, security, OpenShift and AI.

Built with **Astro 5** + **Tailwind CSS v4**. Zero JS by default; the only client-side behaviour is the mobile menu (`<details>`) and the CSS-animated hero terminal. Output is plain static files, ready to serve from nginx on OpenShift (this replaces the previous WordPress deployment).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # outputs the static site to dist/
npm run preview  # serve the production build locally
```

## Project layout

```
src/
  styles/global.css   Tailwind v4 design tokens (@theme), base styles, utilities
  data/               site, pillars, team, regions, metrics (typed content)
  layouts/            BaseLayout.astro (head, SEO/OG, nav, footer)
  components/         design system; components/home/ holds homepage sections
  pages/              index + services/ + platform, approach, about, contact, legal
public/               logo, favicon, OG image, team headshots
assets/               source brand assets (logo, headshots)
docs/superpowers/     design spec + implementation plan
```

## Design system

- **Palette:** deep-space navy (`#04060E`) with a luminous azure accent (`#1EA3E8`), matched to the brand logo. Tokens live in `src/styles/global.css` under `@theme`.
- **Type:** Space Grotesk (display) · Inter (body) · JetBrains Mono (code/telemetry), self-hosted via `@fontsource`.
- **Tailwind v4 note:** gradients use `bg-linear-to-*` (not the v3 `bg-gradient-to-*`).

## Deploy

`npm run build` produces a static `dist/`. Serve it with any static web server (e.g. nginx). The OpenShift container image + manifests are a separate follow-up to the WordPress removal.
