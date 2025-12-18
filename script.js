const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

/* Footer year */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Scroll progress bar */
const progressBar = $("#progressBar");
if (progressBar){
  window.addEventListener("scroll", () => {
    const doc = document.documentElement;
    const height = doc.scrollHeight - doc.clientHeight;
    const progress = height > 0 ? (doc.scrollTop / height) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}

/* Mobile drawer */
const menuBtn = $("#menuBtn");
const drawer = $("#drawer");
const closeDrawer = $("#closeDrawer");
const drawerBackdrop = $("#drawerBackdrop");

function openDrawer(){
  if (!drawer) return;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}
function closeDrawerFn(){
  if (!drawer) return;
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}
if (menuBtn) menuBtn.addEventListener("click", openDrawer);
if (closeDrawer) closeDrawer.addEventListener("click", closeDrawerFn);
if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawerFn);
$$(".drawer__link").forEach(a => a.addEventListener("click", closeDrawerFn));

/* Active nav highlight */
const current = document.body.getAttribute("data-page");
$$(".nav__link").forEach(a => {
  if (a.getAttribute("data-link") === current) a.classList.add("active");
});

/* Reveal on scroll */
const revealEls = $$(".reveal");
if (revealEls.length){
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));
}

/* Projects search */
const searchInput = $("#projectSearch");
const projectsList = $("#projectsList");
if (searchInput && projectsList){
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    $$(".project", projectsList).forEach(card => {
      const text = card.textContent.toLowerCase();
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const match = text.includes(q) || tags.includes(q);
      card.style.display = match ? "" : "none";
    });
  });
}

/* Lightbox (Awards page uses .lightbox buttons) */
const lightboxWrap = $("#lightbox");
const lightboxImg = $("#lightboxImg");
const lightboxCap = $("#lightboxCap");
const lightboxClose = $("#lightboxClose");
const lightboxBackdrop = $("#lightboxBackdrop");

function openLightbox(src, cap){
  if (!lightboxWrap || !lightboxImg) return;
  lightboxWrap.classList.add("open");
  lightboxWrap.setAttribute("aria-hidden", "false");
  lightboxImg.src = src;
  lightboxImg.alt = cap || "image";
  if (lightboxCap) lightboxCap.textContent = cap || "";
}
function closeLightbox(){
  if (!lightboxWrap) return;
  lightboxWrap.classList.remove("open");
  lightboxWrap.setAttribute("aria-hidden", "true");
  if (lightboxImg) lightboxImg.src = "";
}

$$(".lightbox").forEach(btn => {
  btn.addEventListener("click", () => {
    const src = btn.getAttribute("data-img");
    const cap = btn.getAttribute("data-caption");
    if (src) openLightbox(src, cap);
  });
});

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
