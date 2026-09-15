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

const navHamburger = document.querySelector(".nav-hamburger");
const navLinks = document.getElementById("nav-links");

if (navHamburger && navLinks) {
  navHamburger.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("is-open");
    navHamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("is-open");
      navHamburger.setAttribute("aria-expanded", "false");
    });
  });
}

const footerYearSpan = document.getElementById("footer-year");

footerYearSpan.textContent = new Date().getFullYear();

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
