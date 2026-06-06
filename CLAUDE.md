# CLAUDE.md

- every change thats made, Claude will update this `CLAUDE.md` doc.

## Lovelys Resume Website

A resume website created using vanilla javascript, CSS, and HTML for personal marketing.

- Every line of code should have detailed notes explaining the code.

## a11y

## Accessibility (a11y) Rules

- Semantic HTML: Use native elements (`<button>`, `<main>`, `<nav>` , `<aside>`, `<section>`) instead of generic `<div>` wrappers.
- Aria Attributes: Always provide `aria-label` or `aria-describedby` on interactive components lacking visible text.
- Keyboard Support: Every interactive element must be fully focusable and navigable using the `Tab` and `Enter` keys.
- Images: All `<img>` tags must include descriptive `alt` text, or `alt=""` if purely decorative.

## HTML

## CSS
- whenever possible keep in mind screen heights and widths. i want my site universally accessable. rewrite this message.  
- Each (class="page")-section is equal to 100% of screen height and width except `Socials/Contacts` section which will be 1/3rd of a page.

## Javascript

-

## Nav

- theres a nav button that jumps to each section at the top of the page on desktop
- on mobile, no nav buttons are shown — the `.nav-mobile-contact` button is hidden (`display: none`)
- Nav bar is transparant until you scroll down, then it becomes sticky with a solid background.
- Nav link text is black when the background is transparent; turns white once `.scrolled` is added (solid dark background).
- No name/logo in the nav — identity is handled by the `.hero-intro` h1 in the hero section instead.
- `#main-nav` uses `justify-content: flex-end` so the nav links sit on the right side.
- Nav link order: Home → Resume → About → Contact (matches page section order).

## Hero-section

- Hero image is **framed/boxed**: `.hero-bg` is `position: absolute` (scrolls with the page) inset to `top: 12.5vh; bottom: 12.5vh; left: 3rem; right: 3rem` — fills the frame opening and moves with the hero section on scroll. `background-size: cover` so the photo fills the frame div edge-to-edge with no gaps — the black border frame sits exactly at the photo edges.
- **Top and bottom bars** are each 1/8 of the viewport height (12.5vh); they show a solid off-white (`#f5f1ec`) via `#hero-section::before` with a CSS `mask`.
- **Side strips** (3rem on each side) show the same grey gradient.
- `#hero-section::after` draws a `2px solid #000` frame at the inner edge of the grey bars (visible on both desktop and mobile).
- **Mobile (`max-width: 768px`)**: `.hero-bg`, `#hero-section::before` mask, and `#hero-section::after` all have `left: 0; right: 0` — the image extends edge-to-edge horizontally while the top and bottom 12.5vh bars remain fully visible.
- No social icons in the hero section — removed. Social links live in `#connect-section` above the footer.
- **`.hero-intro` div** (`position: absolute; top: 6.25vh; transform: translate(-50%, -50%)`) contains the `h1.hero-name` ("Gabriel.S.Davis") and `p.hero-tagline-text` ("Full-Stack-Engineer | Content-Creator"). Vertically and horizontally centered within the 12.5vh top grey bar.
- **`.hero-contact-btn`** (`position: absolute; bottom: 2rem`) is a Contact button pinned to the bottom light blue bar. Links to `#contact-section`.
- **`.hero-overlay` div** (absolute, `inset:0`, `z-index:0`):
  - **`::before`**: `display: none` — no overlay; hero photo shows through.
  - **`::after`**: `display: none` — removed; the bottom bar is now the section background color.
  - `pointer-events: none` so it never blocks icon clicks.

## Coverletter-section (About)

## Coverletters-section

- is a viewable version of a linked resume doc.
- background is solid, z-index=0, deep navy blue (`--color-dark-red: #0d2a4a`) matching the hero blue palette.
- 3px solid black border-top and border-bottom accent edges.

## Resume-section

- background uses CSS multiple backgrounds: the hero portrait (`url(...)`) is the bottom layer; a blue-tinted gradient (`rgba(5,15,40,0.78)` → `rgba(15,45,80,0.72)`) sits on top at reduced opacity so the image shows through while the inner content scrolls over it.
- 3px solid black border-top and border-bottom accent edges.
- **Desktop**: `.section-inner` is left-aligned and scrollable (`overflow-y: auto`) to fit all content within 100vh.
- **Mobile (`max-width: 768px`)**: section height is `auto` and `overflow: visible`; `.section-inner` also has `height: auto` and `overflow-y: visible` — no inner scroll box, the section expands to full resume height and the page scrolls normally. `content-visibility` and `contain-intrinsic-size` are both reset to avoid layout jumps. Background image overrides to `background-size: cover` and `background-attachment: fixed` so the photo is full-screen and fixed behind the semi-transparent gradient overlay on mobile; desktop keeps the existing `75% no-repeat` behaviour.
- Includes a "Download Resume (PDF)" button linking to `resume.pdf`.
- Resume data source: `Resume during allied 2.pdf`.

### Resume sub-sections (all use `.resume-block` + `.resume-block-title`)

**Work Experience Summary** — 7 condensed job cards in a 2-col grid (`.work-summary-grid`). Each `.work-card` shows: company name, role (accent colour), location + date range (italic/dimmed), and a one-sentence description. No bullet lists — full detail is in the PDF.

**Skills** — grouped into 5 categories (Service & Communication, Bar & Beverage, Kitchen & Food, Operations & Tools, Sales) using `.skills-categories` → `.skill-category` → `.skills-list` → `.skill-tag` pills. Accent-tinted pill style with 999px border-radius.

**References** — 3-col grid (`.references-grid`) of `.reference-card` blocks. Each shows name, role·company, and a `tel:` link where a number is available. Phone numbers are tap-to-call on mobile.

**Quotes from References** — `.quotes-list` of `<blockquote class="ref-quote">` blocks with an accent-coloured left border bar. Placeholder text — replace with real quotes when collected.

**Certifications & Licensing** — `.certs-list` of `.cert-item` rows (name + issuer/year). Currently placeholder — replace with actual certifications (e.g. RBS, BSIS Guard Card).

## Socials/Contacts-section

- Background is deep navy (`--color-contact-bg: #050d1a`).
- 3px solid black border-top and border-bottom accent edges.

## Connect-section

- Sits directly above the footer; replaces the old `#about-icons` fixed sidebar.
- Background: `--color-contact-bg` deep navy, 3px solid black border-top and border-bottom.
- Three platform rows (LinkedIn, GitHub, Email) stacked vertically, centred with `max-width: 640px`.
- Each row is a single `<a>` wrapping `.connect-icon` (5rem icon) + `.connect-label` (text).
- **Hover animation**: icon slides left via `transform: translateX(-2rem)` and tints to `--color-accent`; label slides in from the right (`translateX(2rem) → 0`) with `opacity: 0 → 1`. Transitions use `cubic-bezier(0.25, 0.46, 0.45, 0.94)` with a 0.05s delay on the label so the icon moves first.
- Mobile (`max-width: 600px`): icon shrinks to 3.5rem, label font-size reduces, slide distance halves to `-1rem` so the icon stays on-screen.

## Footer
