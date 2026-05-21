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
   2. FOOTER YEAR — AUTOMATIC COPYRIGHT YEAR
   Updates the copyright year in the footer automatically so it never
   needs to be manually updated each January.
========================================================================== */

/* getElementById: targets the <span id="footer-year"> inside the footer */
const footerYearSpan = document.getElementById('footer-year');

/* new Date(): creates a Date object for the current moment in time.
   .getFullYear(): extracts the four-digit year (e.g. 2026).
   .textContent: sets the span's text to that year value. */
footerYearSpan.textContent = new Date().getFullYear();
