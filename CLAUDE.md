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

- Each (class="page")-section is equal to 100% of screen height and width except `Socials/Contacts` section which will be 1/3rd of a page.

## Javascript

-

## Nav

- theres a nav button that jumps to each section at the top of the page on desktop
- on mobile, the only nav button that will be accessible at the top right corner is `Socials/Contact`
- Nav bar is transparant until you scroll down, then it becomes sticky with a solid background.

## Hero-section

- Full page IMG with a z-index so its behind everything and stationary.
- Has `social-icon-links` ..
- `icon-links` will have respective icons updated by its linked site reference.
- Center located and aligned 25% from the bottom of the page
- As the page scrolls down, the top set of middle icons should move up.
- Once those icons reach 1/3 (33vh) from the top of the viewport, they must become sticky and stay fixed in that position for the remainder of the page.
- When the original middle icons disappear from view on scroll down, trigger a new set of identical social icon links to appear.
- This new set must fade into view and remain fixed at the bottom-right corner of the screen as the user continues down.
- When the user scrolls back UP, all elements must reverse seamlessly.
- Specifically, once the scroll position reaches the initial, original location of that bottom-right social link navigation, the icons must "unstick" and release from their fixed position.
- As you scroll past that point going up, those icons should stay locked to their starting place on the page layout and not travel any higher up the screen.

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
