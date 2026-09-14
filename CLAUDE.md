# Gabriel Davis — Resume & Portfolio Site

Static single-page site: `index.html`, `styles.css`, `script.js`. No build step, no framework, no package manager — edit the files directly and open `index.html` (or serve statically) to preview.

When making changes, weigh every decision against the three priorities below, in this order: **mobile-first layout → accessibility → SEO**. A change that looks good on desktop but breaks on mobile, or that reads well but isn't reachable by keyboard/screen reader, is not done.

## Mobile-first design

- Write base (unprefixed) CSS rules for small screens first; use `min-width` media queries to layer on desktop enhancements. **Current state is the opposite of this**: `styles.css` uses `max-width` breakpoints (768px, 600px, 480px) that override desktop-first base styles. Don't add more `max-width` overrides to this pattern — when touching a section's responsive behavior, prefer converting that section to `min-width` and treating small-screen styles as the default.
- Design and test at ~375px width before checking 768px/desktop widths.
- Touch targets (nav links, the contact button, connect-section icons) need real tap area — check on an actual phone-width viewport, not just a browser resize.
- Avoid `position: fixed` background tricks (see `.hero-bg`) that cause jank or performance issues on mobile Safari/Chrome; verify scroll performance on a real device or throttled emulation when editing hero/canvas sections.
- The Mandelbrot canvas (`#resume-fractal-canvas`, computed in `script.js`) must stay cheap enough to recompute on mobile resize/orientation-change without jank.

## Accessibility

- Keep the semantic landmarks already in place: `<nav>`, `<main>`, `<footer>`, one `<h1>` in the hero, `<h2>` per section. Don't flatten these for styling convenience.
- Every non-decorative image/icon needs an accurate `aria-label` or `alt`; every purely decorative element (like `.hero-bg`, `.hero-overlay`, the fractal canvas) stays `aria-hidden="true"` or `role="img"` with a real label — never both hidden AND meaningful.
- Preserve `role="list"` / `role="listitem"` wherever `list-style: none` strips native list semantics (nav links, connect-section).
- Maintain visible focus states for all interactive elements (nav links, contact button, connect-section links) — don't remove `:focus` outlines without a replacement that meets contrast requirements.
- Color contrast: text over the hero overlay, dark-red about section, and connect-section must meet WCAG AA (4.5:1 for body text, 3:1 for large text). Check contrast after any color/gradient change.
- Respect `prefers-reduced-motion` for hover/slide animations (e.g. `.connect-icon` translate-on-hover) where feasible.
- Any future form, modal, or interactive widget must be fully keyboard-operable (tab order, Enter/Space activation, Escape to dismiss).

## SEO

- Keep `<title>` and add a `<meta name="description">` that accurately describes Gabriel as a full-stack engineer / content creator — currently missing a meta description.
- Add Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter Card tags when sharing links matters — currently absent.
- One `<h1>` per page (already correct — hero name). Keep heading levels in document order (`h1` → `h2`, no skipped levels) as sections are added or edited.
- Section content should be real, crawlable text — not text baked into images or canvas. The resume and cover-letter sections are currently placeholders/empty; when real content is added, it must be in the HTML, not an embedded image/PDF screenshot.
- `resume.pdf` / `Resume during allied 2.pdf` — if linked from the page, use descriptive link text (not "click here") and consider `rel="noopener"` for any `target="_blank"`.
- Keep image URLs and alt text descriptive; avoid relying on an external GitHub raw URL for the hero background long-term (no cache control, no guaranteed uptime) — consider hosting it in-repo.
- Add a `favicon` and a `robots.txt`/basic sitemap if/when this site is deployed to a real domain — not currently present.

## Browser automation (Claude in Chrome)

- Only use Claude in Chrome automatically (without asking first) to visit or interact with a repository/site that I am actively working on or own — e.g. previewing this site itself, or a localhost/staging URL for it.
- For any other website — anything belonging to someone else, including reference sites, competitor sites, or pages I merely link to — do not open or read it via Claude in Chrome unless I explicitly approve it first.
- When asking for that approval, state the explicit reason the visit is needed (what you're checking or looking for), not just the URL.
