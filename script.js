// ====================
// ===   Candlestick Chart    ===
// ====================
(() => {
  const canvas = document.getElementById("chart");
  const hasChartLib = typeof window.Chart !== "undefined";
  const data = window.home_chart_data;

  if (canvas && hasChartLib && Array.isArray(data)) {
    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
      type: "candlestick",
      data: { datasets: [{ label: "MAPL", data }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { type: "timeseries" },
          y: { type: "linear" },
        },
      },
    });
  }
})();

// ====================
// === Local Storage Setup  ===
// ====================
const STORAGE = {
  theme: "stocksim:theme", // "dark" | "light"
  sidebar: "stocksim:sidebar", // "open" | "close"
  creds: "stocksim:creds", // JSON string
};

// ====================
// ===      Theme Toggle      ===
// ====================
(() => {
  const media = window.matchMedia?.("(prefers-color-scheme: dark)");
  const themeToggleBtn = document.getElementById("theme_toggle");

  const getStoredTheme = () => localStorage.getItem(STORAGE.theme); // "dark"|"light"|null
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

  const state = localStorage.getItem(STORAGE.sidebar); // "open" | "close" | null
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
    toggleButton.classList.toggle("rotate", sidebar.classList.contains("close"));
  }

  // Force reflow so the browser commits the no-transition state
  void sidebar.offsetHeight;

  // Restore transitions
  sidebar.style.transition = prevSidebarTransition;
  if (nav) nav.style.transition = prevNavTransition;
}

// Apply ASAP (defer scripts run after HTML parse, before first paint in most cases)
if (!__sidebarInitialApplied) {
  applySidebarStateFromStorage();
  __sidebarInitialApplied = true;
}

// Keep as a fallback for pages where script load timing differs
document.addEventListener("DOMContentLoaded", () => {
  if (!__sidebarInitialApplied) {
    applySidebarStateFromStorage();
    __sidebarInitialApplied = true;
  }
});

function closeAllSubMenus() {
  const sidebar = getSidebar();
  if (!sidebar) return;

  Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
    ul.classList.remove("show");
    ul.previousElementSibling?.classList.remove("rotate");
  });
}

function toggleSidebar() {
  const sidebar = getSidebar();
  const toggleButton = getToggleButton();
  if (!sidebar) return;

  sidebar.classList.toggle("close");
  if (toggleButton) toggleButton.classList.toggle("rotate");

  closeAllSubMenus();
  persistSidebarState();
}

function toggleSubMenu(button) {
  const sidebar = getSidebar();
  const toggleButton = getToggleButton();
  if (!sidebar || !button) return;

  const subMenu = button.nextElementSibling;
  if (!subMenu) return;

  if (!subMenu.classList.contains("show")) {
    closeAllSubMenus();
  }

  subMenu.classList.toggle("show");
  button.classList.toggle("rotate");

  if (sidebar.classList.contains("close")) {
    sidebar.classList.remove("close");
    if (toggleButton) toggleButton.classList.remove("rotate");
    persistSidebarState();
  }
}

window.toggleSidebar = toggleSidebar;
window.toggleSubMenu = toggleSubMenu;
