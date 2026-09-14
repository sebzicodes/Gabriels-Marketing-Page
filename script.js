const mainNav = document.getElementById("main-nav");

const heroSection = document.getElementById("hero-section");

function handleNavScroll() {
  if (window.scrollY > 10) {
    mainNav.classList.add("scrolled");
  } else {
    mainNav.classList.remove("scrolled");
  }
}

let scrollTicking = false;

window.addEventListener(
  "scroll",
  function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        handleNavScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  },
  { passive: true },
);

handleNavScroll();

const jumpSectionIds = [
  "hero-section",
  "resume-section",
  "coverletter-section",
  "connect-section",
];

const navArrowUp = document.querySelector(".nav-arrow-up");
const navArrowDown = document.querySelector(".nav-arrow-down");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function currentSectionIndex(offsets, scrollY) {
  let index = 0;
  for (let i = 0; i < offsets.length; i++) {
    if (scrollY >= offsets[i] - 2) index = i;
  }
  return index;
}

function jumpToSection(step) {
  const offsets = jumpSectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean)
    .map(function (el) {
      return el.offsetTop;
    });

  if (!offsets.length) return;

  const targetIndex = Math.min(
    Math.max(currentSectionIndex(offsets, window.scrollY) + step, 0),
    offsets.length - 1,
  );

  window.scrollTo({
    top: offsets[targetIndex],
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

if (navArrowUp) {
  navArrowUp.addEventListener("click", function () {
    jumpToSection(-1);
  });
}
if (navArrowDown) {
  navArrowDown.addEventListener("click", function () {
    jumpToSection(1);
  });
}

const footerYearSpan = document.getElementById("footer-year");

footerYearSpan.textContent = new Date().getFullYear();

const heroCarousel = document.querySelector(".hero-carousel");

if (heroCarousel) {
  const heroSlides = Array.from(
    heroCarousel.querySelectorAll(".hero-carousel-slide"),
  );
  const heroDots = Array.from(
    heroCarousel.querySelectorAll(".hero-carousel-dot"),
  );
  const heroPrevBtn = heroCarousel.querySelector(".hero-carousel-prev");
  const heroNextBtn = heroCarousel.querySelector(".hero-carousel-next");

  let heroActiveIndex = 0;

  function showHeroSlide(index) {
    heroSlides.forEach(function (slide, i) {
      slide.hidden = i !== index;
    });

    heroDots.forEach(function (dot, i) {
      const isActive = i === index;
      dot.classList.toggle("is-active", isActive);

      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });

    heroActiveIndex = index;
  }

  function showNextHeroSlide() {
    showHeroSlide((heroActiveIndex + 1) % heroSlides.length);
  }

  function showPrevHeroSlide() {
    showHeroSlide(
      (heroActiveIndex - 1 + heroSlides.length) % heroSlides.length,
    );
  }

  heroPrevBtn.addEventListener("click", showPrevHeroSlide);
  heroNextBtn.addEventListener("click", showNextHeroSlide);

  heroDots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      showHeroSlide(Number(dot.dataset.slideIndex));
    });
  });
}

const resumeCanvas = document.getElementById("resume-fractal-canvas");

function renderResumeFractal() {
  if (!resumeCanvas) return;

  const ctx = resumeCanvas.getContext("2d");

  const rect = resumeCanvas.getBoundingClientRect();

  const scale = 0.5;
  const W = Math.max(Math.floor(rect.width * scale), 1);
  const H = Math.max(Math.floor(rect.height * scale), 1);

  resumeCanvas.width = W;
  resumeCanvas.height = H;

  const centerX = -0.743643887037151;
  const centerY = 0.13182590420533;
  const viewWidth = 0.45;
  const maxIter = 80;

  const viewHeight = viewWidth * (H / W);

  const imageData = ctx.createImageData(W, H);
  const buf = imageData.data;

  for (let py = 0; py < H; py++) {
    const c_imag = centerY + (py / H - 0.5) * viewHeight;

    for (let px = 0; px < W; px++) {
      const c_real = centerX + (px / W - 0.5) * viewWidth;

      let zr = 0,
        zi = 0,
        n = 0;
      while (n < maxIter && zr * zr + zi * zi <= 4) {
        const tmp = zr * zr - zi * zi + c_real;
        zi = 2 * zr * zi + c_imag;
        zr = tmp;
        n++;
      }

      let t = 0;
      if (n < maxIter) {
        const log2z = Math.log(zr * zr + zi * zi) / 2;
        const nu = Math.log(log2z / Math.log(2)) / Math.log(2);
        const smooth = n + 1 - nu;

        t = Math.pow(smooth / maxIter, 0.45);
      }

      const idx = (py * W + px) * 4;
      buf[idx] = Math.round(4 + t * 26);
      buf[idx + 1] = Math.round(12 + t * 99);
      buf[idx + 2] = Math.round(26 + t * 134);
      buf[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "rgba(5,15,40,0.78)");
  grad.addColorStop(1, "rgba(15,45,80,0.72)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(renderResumeFractal, { timeout: 2000 });
} else {
  setTimeout(renderResumeFractal, 0);
}

let fractalResizeTimer = null;
window.addEventListener("resize", function () {
  clearTimeout(fractalResizeTimer);

  fractalResizeTimer = setTimeout(renderResumeFractal, 250);
});

const coverletterSection = document.getElementById("coverletter-section");

function fitBioColumnWidth() {
  if (!coverletterSection) return;

  const columns = coverletterSection.querySelector(".coverletter-columns");
  const heading = coverletterSection.querySelector("h2");
  const inner = coverletterSection.querySelector(".section-inner");
  if (!columns || !heading || !inner) return;

  if (window.innerWidth < 1024) {
    columns.style.width = "";
    return;
  }

  const innerStyles = getComputedStyle(inner);
  const paddingTop = parseFloat(innerStyles.paddingTop) || 0;
  const paddingBottom = parseFloat(innerStyles.paddingBottom) || 0;
  const headingStyles = getComputedStyle(heading);
  const headingSpace =
    heading.getBoundingClientRect().height +
    (parseFloat(headingStyles.marginBottom) || 0);

  const availableHeight =
    coverletterSection.getBoundingClientRect().height -
    paddingTop -
    paddingBottom -
    headingSpace;

  const minWidth = 480;
  const maxWidth = window.innerWidth * 0.96;

  columns.style.width = maxWidth + "px";
  if (columns.scrollHeight > availableHeight) {
    return;
  }

  let lo = minWidth;
  let hi = maxWidth;
  for (let i = 0; i < 14; i++) {
    const mid = (lo + hi) / 2;
    columns.style.width = mid + "px";
    if (columns.scrollHeight > availableHeight) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  columns.style.width = hi + "px";
}

fitBioColumnWidth();

let bioFitResizeTimer = null;
window.addEventListener("resize", function () {
  clearTimeout(bioFitResizeTimer);
  bioFitResizeTimer = setTimeout(fitBioColumnWidth, 150);
});
