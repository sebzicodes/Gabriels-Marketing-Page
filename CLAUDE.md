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
- No name/logo in the nav — identity is handled by the `.hero-intro` h1 in the hero section instead.
- `#main-nav` uses `justify-content: flex-end` so the nav links sit on the right side.

## Hero-section

- Hero image is **framed/boxed**: `.hero-bg` is `position: fixed` but inset — `top: 12.5vh; bottom: 12.5vh; left: 3rem; right: 3rem` — so the image does not bleed to the viewport edges.
- **Top and bottom bars** are each 1/8 of the viewport height (12.5vh); they show the `#hero-section` background color (`rgb(173,216,230)` light blue) through the inset gap.
- **Side strips** (3rem on each side) show the same light blue background.
- `.hero-bg` has `border: 2px solid #000` — black border frames the image as a visible box.
- No social icons in the hero section — they were removed; side icons cover the whole page instead.
- **`.hero-intro` div** (`position: absolute; top: 2rem`) contains the `h1.hero-name` ("Gabriel.S.Davis") and `p.hero-tagline-text` ("Coding Engineer · Content Creator"). Sits inside the **top** light blue bar.
- **`.hero-contact-btn`** (`position: absolute; bottom: 2rem`) is a Contact button pinned to the bottom light blue bar. Links to `#contact-section`.
- **`.hero-overlay` div** (absolute, `inset:0`, `z-index:0`):
  - **`::before`**: `display: none` — no overlay; hero photo shows through.
  - **`::after`**: `display: none` — removed; the bottom bar is now the section background color.
  - `pointer-events: none` so it never blocks icon clicks.

## Coverletter-section (About)

- `#about-icons` is fixed at the bottom-right of the viewport, stacked vertically (column).
- Always visible for the entire page — no scroll toggle; `.is-visible` is set directly in the HTML.
- Implemented: `position: fixed; right: 2rem; bottom: 2rem; flex-direction: column` in CSS.

## Coverletters-section

- is a viewable version of a linked resume doc.
- background is solid, z-index=0, deep navy blue (`--color-dark-red: #0d2a4a`) matching the hero blue palette.
- 3px solid black border-top and border-bottom accent edges.

## Resume-section

- background is a blue-tinted dark gradient layered above the hero photo (`rgba(5,15,40,0.95)` → `rgba(15,45,80,0.90)`) — matches the hero blue palette.
- 3px solid black border-top and border-bottom accent edges.
- Contains full work history from `resume.pdf` (copied into project root).
- **Desktop**: `.section-inner` is left-aligned and scrollable (`overflow-y: auto`) to fit all content within 100vh.
- **Mobile (`max-width: 768px`)**: section height is `auto` and `overflow: visible`; `.section-inner` also has `height: auto` and `overflow-y: visible` — no inner scroll box, the section expands to full resume height and the page scrolls normally. `content-visibility` and `contain-intrinsic-size` are both reset to avoid layout jumps.
- Includes a "Download Resume (PDF)" button linking to `resume.pdf`.
- Manager phone numbers are wrapped in `tel:` links for mobile tap-to-call.
- Resume data source: `Resume during allied 2.pdf` (added May 2026).

## Media-section

- is a grid CSS layout.
- background of section is a blue-tinted gradient (`rgba(5,10,30,0.95)` → `rgba(10,30,65,0.90)`) layered above the hero photo — matches hero blue palette.
- 3px solid black border-top and border-bottom accent edges.
- Each grid item has a 1px black border.
- Grid card background is deep navy (`--color-mahogany: #071a2e`).

## Socials/Contacts-section

- Background is deep navy (`--color-contact-bg: #050d1a`).
- 3px solid black border-top and border-bottom accent edges.

## Footer
