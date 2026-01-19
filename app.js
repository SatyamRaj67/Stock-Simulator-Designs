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