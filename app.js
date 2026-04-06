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

// ====================
// === AI GENERATED CONTENT BELOW ===
// ====================

// ===================
// ===   Custom Theme  ===
// ===================

document.addEventListener("DOMContentLoaded", () => {
  const themeApi = window.StockSimTheme;
  if (!themeApi) return;

  const inputToCssVar = {
    background: "--background",
    foreground: "--foreground",
    sidebar_background: "--sidebar",
    sidebar_foreground: "--sidebar-foreground",
    sidebar_primary_background: "--sidebar-primary",
    sidebar_primary_foreground: "--sidebar-primary-foreground",
    sidebar_accent_background: "--sidebar-accent",
    sidebar_accent_foreground: "--sidebar-accent-foreground",
    sidebar_border: "--sidebar-border",
    cards_background: "--card",
    cards_foreground: "--card-foreground",
  };

  const overrides = themeApi.loadCustomThemeOverrides();
  const computed = getComputedStyle(document.documentElement);

  for (const [inputId, cssVar] of Object.entries(inputToCssVar)) {
    const input = document.getElementById(inputId);
    if (!input) continue;

    input.value =
      typeof overrides[cssVar] === "string"
        ? overrides[cssVar]
        : computed.getPropertyValue(cssVar).trim();

    input.addEventListener("input", () => {
      const value = input.value.trim();

      if (value) {
        overrides[cssVar] = value;
      } else {
        delete overrides[cssVar];
      }

      const safe = themeApi.saveCustomThemeOverrides(overrides);
      themeApi.applyCustomThemeOverrides(safe);
    });
  }
});

const CUSTOM_THEME_KEY = "STOCKSIM:CUSTOM_THEME";

const CUSTOM_THEME_ALLOWED_VARS = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--sidebar",
  "--sidebar-foreground",
  "--sidebar-primary",
  "--sidebar-primary-foreground",
  "--sidebar-accent",
  "--sidebar-accent-foreground",
  "--sidebar-border",
];

const CUSTOM_THEME_ALLOWED_SET = new Set(CUSTOM_THEME_ALLOWED_VARS);

function parseThemeObject(raw) {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function sanitizeThemeObject(obj) {
  const safe = {};
  for (const [cssVar, value] of Object.entries(obj || {})) {
    if (!CUSTOM_THEME_ALLOWED_SET.has(cssVar)) continue;
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (!trimmed) continue;
    safe[cssVar] = trimmed;
  }
  return safe;
}

function loadCustomThemeOverrides() {
  try {
    const raw = localStorage.getItem(CUSTOM_THEME_KEY);
    return sanitizeThemeObject(parseThemeObject(raw));
  } catch {
    return {};
  }
}

function saveCustomThemeOverrides(overrides) {
  const safe = sanitizeThemeObject(overrides);
  try {
    localStorage.setItem(CUSTOM_THEME_KEY, JSON.stringify(safe));
  } catch { }
  return safe;
}

function applyCustomThemeOverrides(overrides) {
  const safe = sanitizeThemeObject(overrides);
  const rootStyle = document.documentElement.style;

  // Clear previously applied inline overrides first
  for (const cssVar of CUSTOM_THEME_ALLOWED_VARS) {
    rootStyle.removeProperty(cssVar);
  }

  for (const [cssVar, value] of Object.entries(safe)) {
    rootStyle.setProperty(cssVar, value);
  }

  return safe;
}

applyCustomThemeOverrides(loadCustomThemeOverrides());

window.StockSimTheme = Object.freeze({
  loadCustomThemeOverrides,
  saveCustomThemeOverrides,
  applyCustomThemeOverrides,
  clearCustomThemeOverrides() {
    try {
      localStorage.removeItem(CUSTOM_THEME_KEY);
    } catch { }
    applyCustomThemeOverrides({});
  },
});
