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

## Hero-section

- Full page IMG with a z-index so its behind everything and stationary.
- Has `social-icon-links` at the bottom of the section (in-flow, no sticky behavior).
- `icon-links` will have respective icons updated by its linked site reference.
- Icons are pinned to the bottom of the section using `align-items: flex-end` and `padding-bottom: 2rem` on `#hero-section`.
- Icons do NOT move or become sticky — they scroll away naturally with the page.

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

- background is a gradiant blur layerd above the photo from `Hero` section.

## Media-section

- is a grid CSS layout.
- background of section is a gradiant blur layered above the photo from `Hero` section.
- Each grid item will have a small black border around it.
- background for grid items will be a mohogony.
-

## Socials/Contacts-section

-

## Footer
