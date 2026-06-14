# SEO & Search-Engine Registration

This document covers the on-site SEO baked into the site and the **manual steps you
must do** (they need your accounts and DNS — they can't be automated from the repo).

## 1. What's already implemented in the codebase

| Area | Where | Notes |
|------|-------|-------|
| Canonical URLs | `BaseLayout.astro` | Absolute, per-page (`Astro.site` = `https://www.galaxy-digital.ae`). |
| `site` config | `astro.config.mjs` | Required for canonical + sitemap. |
| Sitemap | `@astrojs/sitemap` | Auto-built → `/sitemap-index.xml` (+ `/sitemap-0.xml`). |
| robots.txt | `public/robots.txt` | Allows all search + AI crawlers; points to the sitemap. |
| Open Graph / Twitter | `BaseLayout.astro` | Full set, absolute image, `og:url`, `og:site_name`, `og:locale`. |
| Structured data | `BaseLayout.astro` | `ProfessionalService` JSON-LD (name, logo, contact, area served, `sameAs`). |
| Robots directives | `BaseLayout.astro` | `max-image-preview:large`, etc. Pass `noindex` prop to hide a page. |
| AI/LLM discovery | `public/llms.txt` | LLM-friendly site summary (llmstxt.org convention). |
| IndexNow key | `public/30cb68b9159144228ed5028101362e7c.txt` | Instant-indexing key (Bing/Yandex/Seznam). |

Per-page `<title>` and `<meta description>` are already unique and on-brand across all
14 pages — no changes needed there.

**Deploy the new build before doing anything below** (the verification files and
sitemap must be live at `https://www.galaxy-digital.ae/...`).

## 2. Verification = one DNS TXT record per engine (you control DNS)

Use **domain-level DNS verification** — it covers `www` and the apex, survives every
redeploy, and adds no markup to the site. All records go on the **apex zone
`galaxy-digital.ae`** at OVH (DNS zone) / wherever the authoritative zone lives.

You get each token *after* you add the property in the engine's console, then paste it
into a TXT record. Records to expect:

| Engine | TXT record (host `@` / apex) |
|--------|------------------------------|
| Google | `google-site-verification=<token from Search Console>` |
| Bing   | Bing imports from Google automatically (easiest). Or DNS TXT / `BingSiteAuth` if verifying directly. |
| Yandex | `yandex-verification: <token from Yandex Webmaster>` |

> Tip: multiple TXT records on the apex coexist fine. After adding, allow DNS to
> propagate (usually minutes), then click **Verify** in each console.

## 3. Step-by-step registration

### Google (Search Console) — covers Google
1. https://search.google.com/search-console → **Add property** → **Domain** → `galaxy-digital.ae`.
2. Copy the `google-site-verification=...` value → add as apex TXT at OVH → **Verify**.
3. Left nav → **Sitemaps** → submit `https://www.galaxy-digital.ae/sitemap-index.xml`.
4. **URL Inspection** → enter the homepage → **Request indexing** (optional, speeds first crawl).

### Bing (Webmaster Tools) — covers Bing, Yahoo, partly DuckDuckGo
1. https://www.bing.com/webmasters → **Import from Google Search Console** (one click, reuses the verification above). 
   - If you'd rather verify directly: add the property and use the **DNS (CNAME/TXT)** option.
2. **Sitemaps** → submit `https://www.galaxy-digital.ae/sitemap-index.xml`.

### Yandex (Webmaster)
1. https://webmaster.yandex.com → **Add site** → `https://www.galaxy-digital.ae`.
2. Choose **DNS record** verification → add `yandex-verification: <token>` apex TXT → **Verify**.
3. **Indexing → Sitemap files** → submit `https://www.galaxy-digital.ae/sitemap-index.xml`.

### IndexNow — Bing, Yandex, Seznam (no account)
- Already wired: key file is live at
  `https://www.galaxy-digital.ae/30cb68b9159144228ed5028101362e7c.txt`.
- After each deploy, ping the changed/all URLs (script below). One submission fans out
  to all IndexNow-participating engines.

## 4. After deploy — verify & ping (run these once the build is live)

```bash
# Confirm the artifacts are served
curl -sSf https://www.galaxy-digital.ae/robots.txt | head
curl -sSf https://www.galaxy-digital.ae/sitemap-index.xml | head
curl -sSf https://www.galaxy-digital.ae/30cb68b9159144228ed5028101362e7c.txt

# IndexNow: submit the whole sitemap's URLs (re-run after content changes)
KEY=30cb68b9159144228ed5028101362e7c
for url in \
  https://www.galaxy-digital.ae/ \
  https://www.galaxy-digital.ae/custom-build/ \
  https://www.galaxy-digital.ae/services/ \
  https://www.galaxy-digital.ae/services/platform-engineering/ \
  https://www.galaxy-digital.ae/services/agentic-operations/ \
  https://www.galaxy-digital.ae/services/ai-transformation/ \
  https://www.galaxy-digital.ae/services/security/ \
  https://www.galaxy-digital.ae/platform/ \
  https://www.galaxy-digital.ae/approach/ \
  https://www.galaxy-digital.ae/about/ \
  https://www.galaxy-digital.ae/how-we-automate/ \
  https://www.galaxy-digital.ae/case-studies/ \
  https://www.galaxy-digital.ae/contact/ ; do
  curl -sS "https://api.indexnow.org/indexnow?url=${url}&key=${KEY}" -o /dev/null -w "%{http_code} ${url}\n"
done
```

A `200` or `202` from IndexNow means accepted.

## 5. Validate the markup
- Rich results / JSON-LD: https://search.google.com/test/rich-results (paste the URL).
- Open Graph: https://www.opengraph.xyz/ or LinkedIn Post Inspector.
- Sitemap: should list all 14 pages with `https://www.galaxy-digital.ae/...` URLs.

## 6. Keeping it healthy
- New page → it's auto-added to the sitemap on the next build. Re-run the IndexNow ping.
- Want a page hidden from search → pass `noindex` to `BaseLayout` (it also drops the
  page's robots directive to `noindex, nofollow`). To drop it from the sitemap too, set
  `<meta name="robots" content="noindex">` is respected by Astro's sitemap `filter`.
- Check Search Console **Coverage** / Bing **Site Explorer** a few days after submitting.
