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
const mainNav  = document.getElementById('main-nav');

/* Cache the hero section — used for tracking scroll context if needed */
const heroSection = document.getElementById('hero-section');

/**
 * handleNavScroll
 * Checks the vertical scroll position and toggles:
 *   .scrolled on #main-nav — solid background when scrolled past the top.
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

/* Throttle flag — ensures both scroll handlers run at most once per
   animation frame instead of dozens of times per frame. */
let scrollTicking = false;

/* Combined, throttled scroll dispatcher.
   passive:true lets the browser commit the scroll to the GPU compositor
   thread immediately without waiting for this handler to return — the
   single biggest driver of jank on desktop for scroll listeners that
   don't call preventDefault(). */
window.addEventListener('scroll', function () {
    if (!scrollTicking) {
        requestAnimationFrame(function () {
            handleNavScroll();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });

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


/* ==========================================================================
   3. RESUME SECTION — FRACTAL BACKGROUND
   Renders a Mandelbrot set in monochromatic dark navy blue onto the canvas
   element (#resume-fractal-canvas) inside #resume-section.  The gradient
   overlay (matching the site's blue palette) is composited directly onto
   the canvas so no extra DOM element or CSS pseudo-element is required.

   Design decisions:
   - Renders at 0.5× physical pixels then lets the GPU upscale to fill the
     canvas element — keeps pixel count ~4× lower than native resolution so
     the computation finishes in well under a second on any modern device.
   - maxIter of 80 gives visible fractal detail without excessive loop cost.
   - Smooth colouring (fractional escape count) eliminates the hard banding
     that the basic integer iteration count would produce.
   - Deferred via requestIdleCallback / setTimeout so the main thread is free
     for layout and user interaction while the fractal computes.
   - A debounced resize listener re-renders when the viewport changes size
     (e.g. orientation flip on mobile) so the canvas always fills correctly.
========================================================================== */

/* Cache the canvas element once — queried here instead of inside the render
   function so the DOM lookup only happens once rather than on every resize. */
const resumeCanvas = document.getElementById('resume-fractal-canvas');

/**
 * renderResumeFractal
 * Sizes the canvas to match its current CSS bounding rect at 0.5× density,
 * then draws a Mandelbrot set (Seahorse Valley region) in a monochromatic
 * navy blue palette and composites a semi-transparent gradient overlay.
 */
function renderResumeFractal() {
    /* Guard: exit silently if the canvas element is not in the DOM */
    if (!resumeCanvas) return;

    /* getContext('2d'): obtain the 2-D drawing context.  willReadFrequently
       is not set because we only write pixels once per render call. */
    const ctx = resumeCanvas.getContext('2d');

    /* getBoundingClientRect: read the CSS layout size of the canvas element.
       This is the pixel count the browser is using to display it, not the
       internal bitmap resolution — we set width/height below. */
    const rect  = resumeCanvas.getBoundingClientRect();

    /* 0.5× scale: render at half the layout dimensions, let the GPU upscale.
       Halving both axes reduces pixel count by 75 % while the browser scales
       the bitmap up to fill the element with CSS width/height:100 %. */
    const scale = 0.5;
    const W     = Math.max(Math.floor(rect.width  * scale), 1);
    const H     = Math.max(Math.floor(rect.height * scale), 1);

    /* Setting canvas.width/height also clears any previous bitmap content */
    resumeCanvas.width  = W;
    resumeCanvas.height = H;

    /* Mandelbrot viewport parameters — Seahorse Valley: a region dense with
       self-similar spirals that gives a rich, non-trivial visual background. */
    const centerX   = -0.743643887037151; /* Real-axis centre of the view */
    const centerY   =  0.131825904205330; /* Imaginary-axis centre */
    const viewWidth =  0.45;              /* Smaller = deeper zoom */
    const maxIter   =  80;               /* Max iterations before declaring interior */

    /* Imaginary height of the viewport, scaled to canvas aspect ratio */
    const viewHeight = viewWidth * (H / W);

    /* createImageData: allocates a W×H buffer of RGBA bytes (4 bytes/pixel).
       Writing directly to the Uint8ClampedArray is the fastest way to set
       per-pixel colours — faster than fillRect or putImageData in a loop. */
    const imageData = ctx.createImageData(W, H);
    const buf       = imageData.data; /* Uint8ClampedArray: R,G,B,A,R,G,B,A,... */

    for (let py = 0; py < H; py++) {
        /* Map pixel row to imaginary component of c */
        const c_imag = centerY + (py / H - 0.5) * viewHeight;

        for (let px = 0; px < W; px++) {
            /* Map pixel column to real component of c */
            const c_real = centerX + (px / W - 0.5) * viewWidth;

            /* Standard escape-time loop: z_(n+1) = z_n² + c
               Terminate when |z|² > 4 (guaranteed escape) or maxIter is hit */
            let zr = 0, zi = 0, n = 0;
            while (n < maxIter && zr * zr + zi * zi <= 4) {
                const tmp = zr * zr - zi * zi + c_real; /* Real part of z² + c */
                zi = 2 * zr * zi + c_imag;              /* Imaginary part of z² + c */
                zr = tmp;
                n++;
            }

            /* Smooth colouring (Hubbard-Douady potential approximation):
               The fractional escape count removes the hard banding produced by
               integer iteration counts by using the final |z| magnitude to
               interpolate between iteration levels.
               Only applied to escaped pixels; interior points stay at t=0. */
            let t = 0;
            if (n < maxIter) {
                /* log2(log2(|z|)) converts the escape magnitude to a fractional
                   count that sits in the same range as n, then we normalise.
                   Math.log(4)/2 = log2(2) — dividing by Math.log(2) converts
                   the natural log to log base-2. */
                const log2z  = Math.log(zr * zr + zi * zi) / 2;
                const nu     = Math.log(log2z / Math.log(2)) / Math.log(2);
                const smooth = n + 1 - nu; /* Fractional iteration count */
                /* γ=0.45 power curve brightens the mid-range so the fractal
                   boundary detail is visible against the dark background */
                t = Math.pow(smooth / maxIter, 0.45);
            }

            /* Monochromatic navy blue palette:
               t=0 (interior / deep set) → #040c1a  (r:4,  g:12,  b:26)
               t=1 (fast escape)         → #1e6fa0  (r:30, g:111, b:160) */
            const idx = (py * W + px) * 4;
            buf[idx    ] = Math.round(  4 + t *  26); /* R: 4  → 30  */
            buf[idx + 1] = Math.round( 12 + t *  99); /* G: 12 → 111 */
            buf[idx + 2] = Math.round( 26 + t * 134); /* B: 26 → 160 */
            buf[idx + 3] = 255;                        /* A: fully opaque */
        }
    }

    /* putImageData: writes the completed pixel buffer to the canvas bitmap */
    ctx.putImageData(imageData, 0, 0);

    /* Gradient overlay — drawn on top of the fractal using the same colour
       values as the former CSS background gradient so the transition between
       the old design and the new is visually seamless.
       fillStyle must be set before globalCompositeOperation so the gradient
       blends over the fractal rather than replacing it. */
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, 'rgba(5,15,40,0.78)');   /* Dark navy — top-left */
    grad.addColorStop(1, 'rgba(15,45,80,0.72)');  /* Slightly lighter — bottom-right */
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H); /* Fill the entire canvas with the gradient */
}

/* Defer first render: requestIdleCallback waits for the browser's next idle
   slot so fractal computation doesn't delay the initial paint.  The 2000 ms
   timeout forces execution even if the browser never reaches a true idle state
   (e.g. continuous animation on the page).  setTimeout(,0) is the fallback
   for browsers that do not implement requestIdleCallback (Edge < 79, Safari). */
if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(renderResumeFractal, { timeout: 2000 });
} else {
    setTimeout(renderResumeFractal, 0);
}

/* Debounced resize listener — re-renders the fractal after the viewport
   settles following a resize or orientation change.  clearTimeout cancels
   any pending re-render so only the last event in a rapid burst triggers
   a full redraw, preventing multiple overlapping renders during a drag-resize. */
let fractalResizeTimer = null;
window.addEventListener('resize', function () {
    clearTimeout(fractalResizeTimer);
    /* 250 ms debounce — long enough for the viewport to finish resizing,
       short enough that the canvas looks correct before the user can scroll
       back to the resume section after an orientation flip. */
    fractalResizeTimer = setTimeout(renderResumeFractal, 250);
});
