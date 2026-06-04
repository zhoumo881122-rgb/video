const nav = document.querySelector(".nav");
const toggle = document.querySelector(".menu-toggle");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
