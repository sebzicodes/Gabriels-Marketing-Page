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
- on mobile, the only nav button that will be accessible at the top right corner is `Socials/Contact`
- Nav bar is transparant until you scroll down, then it becomes sticky with a solid background.
- Nav link text is black when the background is transparent; turns white once `.scrolled` is added (solid dark background).
- `#nav-name` anchor sits at the top-left of the nav bar. At the page top it displays the full name "Gabriel Davis"; once the user scrolls and `.scrolled` is applied to `#main-nav`, a CSS `max-width` + `opacity` transition collapses the full name and cross-fades in the initials "G.D." No extra JS needed — driven entirely by the existing `.scrolled` class toggle.
- `#main-nav` uses `justify-content: space-between` so the name is on the left and nav links are on the right.

## Hero-section

- Full page IMG with a z-index so its behind everything and stationary.
- Has `social-icon-links` at the bottom of the section (in-flow, no sticky behavior).
- `icon-links` will have respective icons updated by its linked site reference.
- Icons are pinned to the bottom of the section using `align-items: flex-end` and `padding-bottom: 2rem` on `#hero-section`.
- Icons do NOT move or become sticky — they scroll away naturally with the page.
- A gradient blur backdrop sits behind the hero social icons when the user is at the very top of the page. It fades from fully transparent at top to semi-dark at bottom, and fades out (opacity: 0) as soon as the user scrolls down (scrollY > 10px).
  - **Desktop**: `#hero-icons::before` — `position: absolute` relative to the icon row. Spans `100vw` (centred via `left: 50%; transform: translateX(-50%)`). `top: calc(-20vh + 5rem)` to `bottom: -2rem` covers the bottom 20vh of the section.
  - **Mobile** (`max-width: 768px`): `#hero-section::after` — `position: absolute; bottom: 0; height: 25svh`. Anchored to the section itself so the bottom edge is always flush with the hero section bottom, regardless of device safe-area / svh rounding. The `#hero-icons::before` pseudo-element is disabled (`display: none`) on mobile. `#hero-icons` gets `z-index: 1` to stay above the `::after` (z-index: 0).
  - JS adds/removes `.icons-scrolled` on **both** `#hero-icons` AND `#hero-section` inside `handleNavScroll()` so each pseudo-element fades correctly on its target element.

## Coverletter-section (About)

- A second, identical set of social icons (`#about-icons`) is fixed at the bottom-right of the viewport, stacked vertically (column).
- Hidden while in the hero section; fades in once the about section enters the viewport.
- Stays fixed/visible for all sections below the about section.
- Fades out and unsticks when the user scrolls back up into the hero section.
- Implemented: `position: fixed; right: 2rem; bottom: 2rem; flex-direction: column` in CSS; JS adds/removes `.is-visible` when `scrollY >= coverletter-section.offsetTop`.

## Coverletters-section

- is a viewable version of a linked resume doc.
- background is solid, z-index=0, a dark red color.
-

## Resume-section

- background is a neutral dark grey gradient blur layered above the photo from `Hero` section — no color cast (`rgba(10,10,10,0.85)` → `rgba(40,40,40,0.70)`).
- Contains full work history from `resume.pdf` (copied into project root).
- **Desktop**: `.section-inner` is left-aligned and scrollable (`overflow-y: auto`) to fit all content within 100vh.
- **Mobile (`max-width: 768px`)**: section height is `auto` and `overflow: visible`; `.section-inner` also has `height: auto` and `overflow-y: visible` — no inner scroll box, the section expands to full resume height and the page scrolls normally. `content-visibility` and `contain-intrinsic-size` are both reset to avoid layout jumps.
- Includes a "Download Resume (PDF)" button linking to `resume.pdf`.
- Manager phone numbers are wrapped in `tel:` links for mobile tap-to-call.
- Resume data source: `Resume during allied 2.pdf` (added May 2026).

## Media-section

- is a grid CSS layout.
- background of section is a gradiant blur layered above the photo from `Hero` section.
- Each grid item will have a small black border around it.
- background for grid items will be a mohogony.
-

## Socials/Contacts-section

-

## Footer
