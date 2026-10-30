# ItzRealFisher — portfolio

A dark, responsive developer and gaming portfolio for Luke Fisher, based in North Queensland, Australia. Built with React, Vite, TypeScript, Tailwind CSS, Motion for React and Lucide. No backend, secrets, paid API or client-side token is required.

## Development

Use Node.js 24 LTS (or a Vite-compatible newer version) and npm.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. For a production preview:

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

`dist/` is the deployable output. `npm run build` runs TypeScript checks first. TypeScript 6.0 is selected because the current typescript-eslint release supports versions below 6.1; the lockfile records the compatible installed versions.

## Content and configuration

- `src/data/profile.ts`: name, biography, general location, Discord username, optional public email, and `githubShowcase` toggle. Email is deliberately empty. The About section contains additional personal copy; update the age there when appropriate. No full birthday is published.
- `src/data/projects.ts`: typed project records, technologies, optional image, repository, website and documentation links, scope notes, featured flags, previous public work and historical archives. Add a record to the projects array and use one of the existing categories for filtering. Cards use abstract icon artwork, not claimed screenshots. The optional image field is available for real screenshots.
- `src/data/socials.ts`: all 11 platforms, usernames, active URLs, candidate URLs, icon names, categories, enabled flags and verification status. Only `url` becomes a link. An absent URL becomes a working copy-username button. Review a `candidateUrl` before moving it into `url`. Configure a confirmed Discord profile or invite here if desired. Support links are clearly labelled voluntary.
- `src/data/skills.ts`: categorized experience and a separate exploring/learning group. No invented proficiency percentages.
- `src/data/hardware.ts`: editable device specifications. No private device identifiers.
- `src/styles/index.css`: colors, layout, responsive behavior, focus indicators and reduced-motion rules.
- `src/components/`: layout, reusable UI and independent sections.

The original `assets/` and `style.css` remain available as historical material. Assets used by the new build are copied into `public/assets/`. The original source is also retained in Git history. The page no longer renders the old email addresses or stale live Discord presence.

## Optional GitHub integration

Set `githubShowcase: false` in `profile.ts` to disable fetching. When enabled, the site requests public repositories from the official GitHub API without a token. It validates responses, caches results locally for one hour, aborts slow requests after eight seconds, and uses saved data or selected static projects on rate limits, invalid responses, network errors or unavailable browser storage. Stars are shown only from actual API data. No private repository data is accessed.

## Deployment — no automatic deployment

The existing checkout was a plain HTML/CSS site with an origin pointing to `itz-me-fisherYT/itz-me-fisherYT.github.io`, a root CNAME of `www.itzfisher.org`, and no existing Actions workflow or Cloudflare configuration. Repository files indicate GitHub Pages intent; the active hosting provider and remote Pages settings were not changed or independently confirmed.

### GitHub Pages

1. Review and commit the source and lockfile when ready. Push the reviewed changes to the repository before running the deployment workflow.
2. In the repository Pages settings, select GitHub Actions as the source if needed. This is a production setting to change only when ready to deploy.
3. Run the **Build and deploy portfolio** workflow manually. It checks types and lint, builds `dist`, and deploys the Pages artifact.

The workflow is `workflow_dispatch` only; it has no push trigger. Both the root `CNAME` and build output `CNAME` preserve the existing value `www.itzfisher.org`. Canonical metadata uses `https://itzfisher.org/` as requested. Check the existing apex/www redirect arrangement before publishing; no DNS changes are needed or performed by the code. Vite uses `/` for this custom domain and root user site. For a future project subpath deployment, adjust `base` and root-relative public asset paths.

### Cloudflare Pages

Use `npm run build` with output directory `dist` and Node.js 24. This is a single-page portfolio with hash section navigation, so no React Router or SPA path rewrite is required. `public/_headers` supplies basic security/privacy response headers for Cloudflare. Preserve the current custom domain and DNS; provider migration and live domain settings require a separate deliberate action. No Cloudflare project or DNS record has been changed.

## SEO and media

`index.html` contains canonical, description, Open Graph/Twitter metadata and ProfilePage/Person structured data. `public/` includes favicon, robots.txt, sitemap.xml and a locally generated 1200×630 social preview PNG. Regenerate the preview with `node scripts/create-social-preview.mjs` after installing Playwright Chromium. External profiles open with `noopener noreferrer`. No third-party font or icon CDN is required.

## Tests

```sh
npx playwright install chromium
npm test
```

The browser suite runs desktop Chrome and a mobile Chromium viewport. It checks section navigation, mobile menu keyboard dismissal, project filters, modal dismissal/focus restoration, archives, social count, external link attributes, horizontal overflow, static GitHub fallback, image loading, metadata, screenshots and axe accessibility checks. The suite deliberately simulates GitHub rate limits so fallback behavior is deterministic. Screenshots and traces are ignored generated files under `test-results/`.

## Information still requiring verification

- Confirm readiness and current status of BlockBoss features; listed scope is owner supplied, not a production guarantee.
- Confirm availability of CannaNetwork and ZenithSMP. No online indicator or invented completion date is displayed.
- Supply verified repositories/screenshots for the new project records when public. Historical projects remain labelled as references.
- The official GitHub API confirmed `itz-me-fisherYT` with display name `ItzRealFisher`; `/users/ItzRealFisher` returned 404. The original account is retained.
- The official Roblox API confirmed ID `8942431123` is `ItzOnlyFisher`.
- YouTube’s supplied URL returned HTTP 404 during the 30 October 2026 check. Ko-fi and Slat.cc returned 403; Guns.lol could not be fetched. These URLs are retained as configurable candidates, while the public cards copy usernames until verified. Other supplied social URLs returned HTTP 200, but an HTTP result alone does not establish ownership. Discord uses the owner-supplied profile ID `1319567972335091773` and username `ItzOnlyFisher`; contact buttons still copy the username.
- Optional email and a community Discord invite remain configurable.
- Review the age in About after the next birthday; the full date is not present in public data.
- Verify the live hosting provider, Pages source and apex/www redirects before deploying. No Lighthouse score is claimed without measurement.

## Validation completed — 30 October 2026

- `npm run typecheck`, `npm run lint` and `npm run build`: passed.
- `npm test`: 10 tests passed across desktop and mobile Chromium, including axe checks on the page and project dialog, clipboard behavior, GitHub cache and failure recovery.
- Desktop (1440 px), mobile (390 px) and tablet (768 px) rendered layouts inspected; no horizontal overflow at those widths.
- `npm audit --omit=dev`: zero reported vulnerabilities. Installation also audited the full dependency tree with zero reported vulnerabilities.
- Production CNAME matches the original `www.itzfisher.org`; social preview, favicon, robots.txt and sitemap.xml are present in `dist`.
- Credential/private-network pattern scan of new public source found no matches. No Lighthouse score or exhaustive manual accessibility audit is claimed.
- Validation did not deploy the site or change DNS or production settings. Publishing requires running the manual deployment workflow.
