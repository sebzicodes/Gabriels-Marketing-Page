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
   2. HERO SOCIAL ICONS — STICKY SCROLL & SIDEBAR BEHAVIOUR
   Three states driven by the scroll position:
     State 1 — Natural:  icons sit in the hero section at their document position.
     State 2 — Sticky:   icons are fixed at 33vh from the top, centred.
     State 3 — Sidebar:  hero icons fade out; sidebar icons fade in at bottom-right.
   All transitions reverse seamlessly when scrolling back up.
========================================================================== */

/* Cache DOM references — queried once so scroll events stay fast */
const heroSection  = document.getElementById('hero-section');  /* The full-page hero <section> */
const heroIcons    = document.getElementById('hero-icons');    /* Center social icon nav */
const sidebarIcons = document.getElementById('sidebar-icons'); /* Bottom-right social icon nav */

/* These values are computed from layout measurements; updated on resize */
let stickyScrollY  = 0; /* scrollY at which hero icons reach the 33vh sticky line */
let heroGoneScrollY = 0; /* scrollY at which the hero section has fully left the viewport */

/**
 * measureThresholds
 * Computes the two key scroll positions from current layout geometry.
 * Uses arithmetic rather than getBoundingClientRect() so the result is
 * correct regardless of whether heroIcons is currently fixed or in flow.
 */
function measureThresholds() {
    /* heroSection always starts at the very top of the page (offsetTop = 0).
       Its height equals 100vh because it uses the .page class. */
    const heroTop    = heroSection.offsetTop;              /* Document Y of section top */
    const heroHeight = heroSection.offsetHeight;           /* Height in px (= 100vh) */
    const vh         = window.innerHeight;                 /* Viewport height in px */

    /* Icons sit 25vh up from the section bottom (padding-bottom: 25vh in CSS).
       iconDocCenter is the vertical mid-point of the icon cluster in document coords. */
    const iconDocCenter = heroTop + heroHeight - vh * 0.25;

    /* Sticky fires when the icon's viewport position equals 33vh from the top.
       viewport position = iconDocCenter - scrollY  →  solve for scrollY:
       stickyScrollY = iconDocCenter - 0.33 * vh */
    stickyScrollY = iconDocCenter - vh * 0.33;

    /* Hero section is fully gone when its bottom edge passes the top of the viewport.
       That happens when scrollY = heroTop + heroHeight. */
    heroGoneScrollY = heroTop + heroHeight;
}

/**
 * handleHeroIconScroll
 * Reads window.scrollY and applies or removes CSS classes to move between
 * the three icon states.  Called on every scroll and once at page load.
 */
function handleHeroIconScroll() {
    const scrollY = window.scrollY; /* Current vertical scroll offset in pixels */

    if (scrollY >= heroGoneScrollY) {
        /* ── STATE 3: Hero section fully off-screen ──────────────────────
           Remove is-sticky so the icons return to their natural document
           position (~75vh from top of page).  At scrollY ≥ 100vh, that
           position is -25vh in the viewport — off screen above — so they
           disappear instantly at the same moment the sidebar fades in. */
        heroIcons.classList.remove('is-sticky');       /* Return to document flow (now above viewport) */
        heroIcons.classList.remove('is-faded');        /* Reset in case of back-scroll edge cases */
        heroIcons.setAttribute('aria-hidden', 'true'); /* Off screen — hide from screen readers */

        sidebarIcons.classList.add('is-visible');           /* Fade in simultaneously */
        sidebarIcons.removeAttribute('aria-hidden');         /* Expose to screen readers */
        /* Re-enable tab order for sidebar links now that they are visible */
        sidebarIcons.querySelectorAll('a').forEach(function(a) {
            a.removeAttribute('tabindex');
        });

    } else if (scrollY >= stickyScrollY) {
        /* ── STATE 2: Icons have risen to the sticky line ────────────────
           Fix hero icons at top:33vh (centred).  Sidebar stays hidden. */
        heroIcons.classList.add('is-sticky');            /* Pin to viewport */
        heroIcons.classList.remove('is-faded');          /* Fully visible */
        heroIcons.removeAttribute('aria-hidden');        /* Accessible */

        sidebarIcons.classList.remove('is-visible');         /* Keep sidebar hidden */
        sidebarIcons.setAttribute('aria-hidden', 'true');    /* Not accessible yet */
        /* Restore tabindex=-1 on sidebar links so Tab doesn't reach hidden elements */
        sidebarIcons.querySelectorAll('a').forEach(function(a) {
            a.setAttribute('tabindex', '-1');
        });

    } else {
        /* ── STATE 1: Normal flow — icons at their document position ─────
           Return hero icons to flex flow inside the hero section. */
        heroIcons.classList.remove('is-sticky');         /* Back in document flow */
        heroIcons.classList.remove('is-faded');          /* Fully visible */
        heroIcons.removeAttribute('aria-hidden');        /* Accessible */

        sidebarIcons.classList.remove('is-visible');         /* Sidebar hidden */
        sidebarIcons.setAttribute('aria-hidden', 'true');
        sidebarIcons.querySelectorAll('a').forEach(function(a) {
            a.setAttribute('tabindex', '-1');
        });
    }
}

/* Attach scroll listener — passive:true tells the browser we won't call
   preventDefault(), allowing it to optimise scroll performance. */
window.addEventListener('scroll', handleHeroIconScroll, { passive: true });

/* Re-measure when the viewport is resized (vh values change with window height) */
window.addEventListener('resize', function() {
    measureThresholds();       /* Recalculate thresholds for new viewport size */
    handleHeroIconScroll();    /* Apply correct state immediately after resize */
});

/* On initial page load: measure layout then set the correct opening state.
   Using 'load' (not 'DOMContentLoaded') ensures fonts are applied so
   layout measurements are accurate. */
window.addEventListener('load', function() {
    measureThresholds();
    handleHeroIconScroll();
});


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
