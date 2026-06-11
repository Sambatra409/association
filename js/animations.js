/* ============================================================
   Anjaramahasoa — animations (sobres & performantes)
   - Reveal au scroll (fade + slide) avec stagger
   - Compteurs animés sur les statistiques
   - Parallax doux sur le hero
   - Header qui se densifie au scroll
   Respecte prefers-reduced-motion.
   ============================================================ */

(function () {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- 1. Marquer les éléments à révéler ---------- */
  // Sélecteurs de blocs qu'on veut animer à l'apparition.
  const revealSelectors = [
    ".stat-card",
    ".feature",
    ".card-img",
    ".value-card",
    ".support-card",
    ".comp-card",
    ".info-card",
    ".impact-card",
    ".impact-warm",
    ".impact-primary",
    ".tile",
    ".cta-block",
    ".warm-panel",
    ".bq",
    ".contact-item",
    ".form-card",
    ".section-title",
    ".gallery img",
    "figure",
  ];

  function tagReveals() {
    revealSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (el.classList.contains("reveal")) return;
        el.classList.add("reveal");
      });
    });

    // Stagger : à l'intérieur d'une même grille, on échelonne les délais.
    document
      .querySelectorAll(".grid, .gallery, .hero-actions, .check-list, .cta-list")
      .forEach((grid) => {
        const kids = grid.querySelectorAll(":scope > .reveal, :scope > img.reveal");
        kids.forEach((kid, i) => {
          const d = Math.min(i + 1, 5);
          kid.classList.add("d" + d);
        });
      });
  }

  /* ---------- 2. IntersectionObserver pour révéler ---------- */
  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (reduceMotion) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------- 3. Compteurs animés ---------- */
  // Anime le texte numérique d'un .stat-value (gère %, km, etc.)
  function animateCount(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^([^\d]*)(\d[\d\s.,]*)(.*)$/);
    if (!match) return;
    const prefix = match[1];
    const numStr = match[2].replace(/\s/g, "").replace(",", ".");
    const suffix = match[3];
    const target = parseFloat(numStr);
    if (isNaN(target)) return;
    const decimals = (numStr.split(".")[1] || "").length;
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent =
        prefix + val.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(frame);
  }

  function setupCounters() {
    const stats = document.querySelectorAll(".stat-value, .impact-warm .big");
    if (!stats.length) return;
    if (reduceMotion) return; // on garde la valeur finale telle quelle
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    stats.forEach((el) => io.observe(el));
  }

  /* ---------- 4. Parallax doux sur le hero ---------- */
  function setupParallax() {
    if (reduceMotion) return;
    const heroImg = document.querySelector(".hero > img");
    if (!heroImg) return;
    let ticking = false;
    function update() {
      const y = window.scrollY;
      // déplacement léger, plafonné
      const offset = Math.min(y * 0.18, 80);
      heroImg.style.setProperty("--py", offset + "px");
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---------- 5. Header densifié au scroll ---------- */
  function setupHeaderScroll() {
    function onScroll() {
      const header = document.querySelector(".site-header");
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- INIT ---------- */
  // Le header/footer sont injectés par main.js sur DOMContentLoaded.
  // On attend un tick pour que le DOM injecté soit présent.
  function init() {
    tagReveals();
    setupReveal();
    setupCounters();
    setupParallax();
    setupHeaderScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      // léger délai pour laisser main.js injecter header/footer
      setTimeout(init, 30);
    });
  } else {
    setTimeout(init, 30);
  }
})();
