/* ============================================================
   Anjaramahasoa — script partagé
   Injecte le header + footer sur chaque page, gère le menu mobile
   et l'état "actif" de la navigation.
   ============================================================ */

const NAV = [
  { href: "index.html", label: "Accueil" },
  { href: "qui-sommes-nous.html", label: "Qui sommes-nous" },
  { href: "projet.html", label: "Projet prioritaire" },
  { href: "impact.html", label: "Impact" },
  { href: "soutenir.html", label: "Nous soutenir" },
  { href: "contact.html", label: "Contact" },
];

/* Page courante (ex: "index.html") */
function currentPage() {
  let p = window.location.pathname.split("/").pop();
  if (!p || p === "") p = "index.html";
  return p;
}

/* ---------- Icônes (extraites de lucide, MIT) ---------- */
const ICONS = {
  menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  mapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  phone: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
};

function svgIcon(name, cls = "icon") {
  return `<svg class="${cls}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
}

/* ---------- HEADER ---------- */
function buildHeader() {
  const page = currentPage();
  const links = NAV.map(
    (n) =>
      `<a class="nav-link${n.href === page ? " active" : ""}" href="${n.href}">${n.label}</a>`
  ).join("");

  const mobileLinks = NAV.map(
    (n) =>
      `<a class="${n.href === page ? "active" : ""}" href="${n.href}">${n.label}</a>`
  ).join("");

  return `
  <header class="site-header">
    <div class="container-page header-inner">
      <a class="brand" href="index.html">
        <img src="assets/logo.png" alt="Logo Anjaramahasoa" width="56" height="56" />
        <div>
          <div class="brand-name">Anjaramahasoa</div>
          <div class="brand-tag">Part du Bien Commun</div>
        </div>
      </a>

      <nav class="nav-desktop">
        ${links}
        <a class="btn-primary nav-cta" href="soutenir.html">Soutenir</a>
      </nav>

      <button class="menu-toggle" aria-label="Menu" id="menuToggle">
        ${svgIcon("menu")}
      </button>
    </div>

    <div class="nav-mobile" id="navMobile">
      <nav class="container-page">${mobileLinks}</nav>
    </div>
  </header>`;
}

/* ---------- FOOTER ---------- */
function buildFooter() {
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="container-page footer-grid">
      <div class="footer-brand">
        <div class="row">
          <img src="assets/logo.png" alt="" width="56" height="56" />
          <div>
            <div class="name">Anjaramahasoa</div>
            <div class="tag">Part du Bien Commun</div>
          </div>
        </div>
        <p class="desc">
          L'Association Anjaramahasoa est une organisation malgache engagée
          dans le développement communautaire rural à Madagascar.
        </p>
      </div>

      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="qui-sommes-nous.html">Qui sommes-nous</a></li>
          <li><a href="projet.html">Projet prioritaire</a></li>
          <li><a href="impact.html">Impact</a></li>
          <li><a href="soutenir.html">Nous soutenir</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <ul class="footer-contact">
          <li>${svgIcon("mapPin")} II L 2 LRV Ambatokaranana Antananarivo 101, Madagascar</li>
          <li>${svgIcon("mail")} contact@anjaramahasoa.org</li>
          <li>${svgIcon("phone")} +261 38 53 171 90</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container-page row">
        <p>© ${year} Association Anjaramahasoa</p>
        <p class="ital">« Part du Bien Commun »</p>
      </div>
    </div>
  </footer>`;
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const headerMount = document.getElementById("header");
  const footerMount = document.getElementById("footer");
  if (headerMount) headerMount.innerHTML = buildHeader();
  if (footerMount) footerMount.innerHTML = buildFooter();

  // menu mobile
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navMobile");
  if (toggle && nav) {
    let open = false;
    toggle.addEventListener("click", () => {
      open = !open;
      nav.classList.toggle("open", open);
      toggle.innerHTML = open ? svgIcon("x") : svgIcon("menu");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        open = false;
        nav.classList.remove("open");
        toggle.innerHTML = svgIcon("menu");
      })
    );
  }
});
