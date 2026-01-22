// ===================
// ===   Theme Setup  ===
// ===================
const THEME_KEY = "STOCKSIM:THEME";
const themeToggleBtn = document.getElementById("theme_toggle");

const [sun, moon] = themeToggleBtn.querySelectorAll("svg");

const isDark = () => document.documentElement.classList.contains("dark");

const syncIcon = () => {
  if (sun) sun.style.display = isDark() ? "none" : "block";
  if (moon) moon.style.display = isDark() ? "block" : "none";
};

syncIcon();

themeToggleBtn.addEventListener("click", () => {
  const nowDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem(THEME_KEY, nowDark ? "dark" : "light");
  syncIcon();
});

// ===================
// ===   Sidebar Setup       ===
// ===================

function toggleSidebar() {
  const SIDEBAR_KEY = "STOCKSIM:SIDEBAR_STATE";

  const root = document.documentElement;
  const nowClosed = root.classList.toggle("sidebar-closed");

  localStorage.setItem(SIDEBAR_KEY, nowClosed ? "close" : "open");
}

// =====================
// ===       Aside Setup           ===
// =====================

const sidebar = document.getElementsByTagName("aside")[0];

function toggleSubMenu(button) {
  if (!button.nextElementSibling.classList.contains("show")) {
    closeAllSubMenus();
  }

  button.nextElementSibling.classList.toggle("show");
  button.classList.toggle("rotate");
}

function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
    ul.classList.remove("show");
    ul.previousElementSibling.classList.remove("rotate");
  });
}

// =====================
// ===      Page Transitions      ===
// =====================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#") || href === window.location.pathname) {
        return;
      }

      event.preventDefault();

      animateTransition().then(() => {
        window.location.href = href;
      });
    });
  });
});

function animateTransition() {
  return new Promise((resolve) => {
    const pageTransition = document.getElementById("page-transition");
    pageTransition.classList.add("block");

    const lastOverlay = pageTransition.querySelector(
      ".overlay[style*='--i: 2']",
    );
    lastOverlay.addEventListener(
      "transitionend",
      () => {
        resolve();
      },
      { once: true },
    );
  });
}

window.addEventListener("pageshow", (event) => {
  const pageTransition = document.getElementById("page-transition");
  pageTransition.classList.remove("block");
});
