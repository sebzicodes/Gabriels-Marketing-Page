/* ==========================================================================
   SCRIPT.JS — Lovelys Resume Website
   Vanilla JavaScript, no frameworks. Every line is commented per
   project convention to explain what it does and why.
========================================================================== */


/* ==========================================================================
   1. NAVIGATION SCROLL BEHAVIOUR
   The nav bar starts transparent over the hero image.  When the user
   scrolls more than 10px, the "scrolled" CSS class is added which
   triggers the solid background + blur transition defined in styles.css.
========================================================================== */

/* getElementById: retrieves the <nav id="main-nav"> element from the DOM.
   Stored in a variable so we don't query the DOM on every scroll event. */
const mainNav = document.getElementById('main-nav');

/**
 * handleNavScroll
 * Checks the vertical scroll position and toggles the .scrolled class.
 * Called on every "scroll" event and once on page load.
 */
function handleNavScroll() {
    /* window.scrollY: the number of pixels the document has scrolled
       vertically from the top.  We use 10 as the threshold so a tiny
       accidental scroll doesn't immediately trigger the solid nav. */
    if (window.scrollY > 10) {
        /* classList.add: appends "scrolled" to the nav's class list.
           CSS then transitions background-color and backdrop-filter. */
        mainNav.classList.add('scrolled');
    } else {
        /* classList.remove: removes "scrolled" when back near the top,
           returning the nav to its transparent state. */
        mainNav.classList.remove('scrolled');
    }
}

/* addEventListener('scroll', ...): fires handleNavScroll every time the
   user scrolls the page in any direction. */
window.addEventListener('scroll', handleNavScroll);

/* Run the handler immediately on page load.
   Without this, landing on the page via a #hash URL (e.g. #resume-section)
   could leave the nav in the wrong visual state until the user scrolls. */
handleNavScroll();


/* ==========================================================================
   2. ABOUT SECTION SOCIAL ICONS — STICKY BOTTOM-RIGHT COLUMN
   The about section icons live in the DOM inside #coverletter-section but use
   position:fixed in CSS so they always anchor to the viewport corner.
   They are shown once the user scrolls into the about section and hidden again
   when the user scrolls back up above it.
========================================================================== */

/* Cache references — queried once to keep scroll handlers fast */
const aboutSection = document.getElementById('coverletter-section'); /* About <section> */
const aboutIcons   = document.getElementById('about-icons');         /* Bottom-right icon nav */

/**
 * handleAboutIconScroll
 * Shows or hides the about-section social icons based on whether the about
 * section's top edge has reached or passed the top of the viewport.
 *
 * Uses getBoundingClientRect().top instead of offsetTop because offsetTop
 * can return 0 on mobile Safari before the initial layout paint completes,
 * which would make scrollY >= 0 always true and keep icons permanently shown.
 * getBoundingClientRect() is computed from live layout every time it is called,
 * so it is always accurate regardless of when the browser finishes laying out.
 */
function handleAboutIconScroll() {
    /* getBoundingClientRect().top: distance in px from the viewport's top edge
       to the element's top edge.  Negative values mean the top has scrolled
       above the viewport; zero means it is exactly at the top; positive means
       the section has not yet scrolled into view from below. */
    const aboutTop = aboutSection.getBoundingClientRect().top;

    if (aboutTop <= 0) {
        /* ── VISIBLE: about section top is at or above the viewport top ──
           The user has entered or scrolled fully past the about section.
           Show icons and make them focusable / interactive. */
        aboutIcons.classList.add('is-visible');        /* Fade in via CSS opacity */
        aboutIcons.removeAttribute('aria-hidden');      /* Expose to screen readers */
        /* Allow Tab key to reach these links now that they are visible */
        aboutIcons.querySelectorAll('a').forEach(function (a) {
            a.removeAttribute('tabindex');
        });

    } else {
        /* ── HIDDEN: about section is still below or at the viewport top ──
           User is in the hero section; hide and remove from Tab/a11y flow. */
        aboutIcons.classList.remove('is-visible');         /* Fade out */
        aboutIcons.setAttribute('aria-hidden', 'true');    /* Hide from screen readers */
        /* tabindex=-1 prevents Tab from reaching invisible, non-interactive links */
        aboutIcons.querySelectorAll('a').forEach(function (a) {
            a.setAttribute('tabindex', '-1');
        });
    }
}

/* Fire on every scroll; passive:true lets the browser optimise scroll paint */
window.addEventListener('scroll', handleAboutIconScroll, { passive: true });

/* Re-run when the viewport is resized because offsetTop can change with reflow */
window.addEventListener('resize', handleAboutIconScroll);

/* Run once on page load to set the correct initial state (e.g. deep-link arrivals) */
window.addEventListener('load', handleAboutIconScroll);


/* ==========================================================================
   3. FOOTER YEAR — AUTOMATIC COPYRIGHT YEAR
   Updates the copyright year in the footer automatically so it never
   needs to be manually updated each January.
========================================================================== */

/* getElementById: targets the <span id="footer-year"> inside the footer */
const footerYearSpan = document.getElementById('footer-year');

/* new Date(): creates a Date object for the current moment in time.
   .getFullYear(): extracts the four-digit year (e.g. 2026).
   .textContent: sets the span's text to that year value. */
footerYearSpan.textContent = new Date().getFullYear();
