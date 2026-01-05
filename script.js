// ====================
// === Local Storage Setup  ===
// ====================
const STORAGE = {
  theme: "stocksim:theme", // "dark" | "light"
  sidebar: "stocksim:sidebar", // "open" | "close"
  creds: "stocksim:creds", // JSON string
};

window.STORAGE = STORAGE;

// ====================
// ===      Theme Toggle      ===
// ====================
(() => {
  const media = window.matchMedia?.("(prefers-color-scheme: dark)");
  const themeToggleBtn = document.getElementById("theme_toggle");

  const getStoredTheme = () => {
    const stored = localStorage.getItem(STORAGE.theme);
    return stored === "dark" || stored === "light" ? stored : null;
  };

  const setStoredTheme = (value) => localStorage.setItem(STORAGE.theme, value);

  const setTheme = (isDark, source = "user") => {
    document.body.classList.toggle("dark", !!isDark);
    document.documentElement.dataset.themeSource = source;
    setStoredTheme(isDark ? "dark" : "light");
    syncThemeIcon();
  };

  const syncThemeIcon = () => {
    if (!themeToggleBtn) return;
    const svgs = themeToggleBtn.querySelectorAll("svg");
    if (svgs.length < 2) return;

    const [sunSvg, moonSvg] = svgs;
    const isDark = document.body.classList.contains("dark");
    sunSvg.style.display = isDark ? "none" : "block";
    moonSvg.style.display = isDark ? "block" : "none";
  };

  const stored = getStoredTheme();
  if (stored === "dark" || stored === "light") {
    document.body.classList.toggle("dark", stored === "dark");
    document.documentElement.dataset.themeSource = "stored";
  } else if (media) {
    document.body.classList.toggle("dark", media.matches);
    document.documentElement.dataset.themeSource = "system";
  }

  syncThemeIcon();

  new MutationObserver(syncThemeIcon).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  if (media?.addEventListener) {
    media.addEventListener("change", (e) => {
      const storedNow = getStoredTheme();
      if (storedNow !== "dark" && storedNow !== "light") {
        document.body.classList.toggle("dark", e.matches);
        document.documentElement.dataset.themeSource = "system";
      }
    });
  }

  // Click toggle (persist)
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      setTheme(!isDark, "user");
    });
  }
})();

// ====================
// ===           Sidebar            ===
// ====================
function getSidebar() {
  return document.getElementById("sidebar");
}

function getToggleButton() {
  return document.getElementById("toggle-btn");
}

function persistSidebarState() {
  const sidebar = getSidebar();
  if (!sidebar) return;
  localStorage.setItem(
    STORAGE.sidebar,
    sidebar.classList.contains("close") ? "close" : "open"
  );
}

let __sidebarInitialApplied = false;

function applySidebarStateFromStorage() {
  const sidebar = getSidebar();
  const toggleButton = getToggleButton();
  if (!sidebar) return;

  const state = localStorage.getItem(STORAGE.sidebar);
  const shouldBeOpen = state === "open";

  // Disable transitions just for initial state application (prevents open/close animation on load)
  const nav = document.querySelector("nav");
  const prevSidebarTransition = sidebar.style.transition;
  const prevNavTransition = nav?.style.transition;

  sidebar.style.transition = "none";
  if (nav) nav.style.transition = "none";

  if (shouldBeOpen) sidebar.classList.remove("close");
  else sidebar.classList.add("close");

  if (toggleButton) {
    toggleButton.classList.toggle(
      "rotate",
      sidebar.classList.contains("close")
    );
  }

  // Force reflow so the browser commits the no-transition state
  void sidebar.offsetHeight;

  // Restore transitions
  sidebar.style.transition = prevSidebarTransition;
  if (nav && typeof prevNavTransition === "string")
    nav.style.transition = prevNavTransition;
}

if (!__sidebarInitialApplied) {
  applySidebarStateFromStorage();
  __sidebarInitialApplied = true;
}

document.addEventListener("DOMContentLoaded", () => {
  if (!__sidebarInitialApplied) {
    applySidebarStateFromStorage();
    __sidebarInitialApplied = true;
  }
});

function toggleSidebar() {
  const sidebar = getSidebar();
  const toggleButton = getToggleButton();
  if (!sidebar) return;

  sidebar.classList.toggle("close");
  if (toggleButton) toggleButton.classList.toggle("rotate");

  persistSidebarState();
}

window.toggleSidebar = toggleSidebar;
