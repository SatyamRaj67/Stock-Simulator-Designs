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

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

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
// ===     Sidebar Toggle      ===
// ====================
(() => {
  const applySidebarState = () => {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    const state = localStorage.getItem(STORAGE.sidebar); // "open" | "close" | null
    if (state === "close") sidebar.classList.add("close");
    if (state === "open") sidebar.classList.remove("close");
  };

  const sidebarState = () => {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return null;
    localStorage.setItem(
      STORAGE.sidebar,
      sidebar.classList.contains("close") ? "close" : "open"
    );
  };

  document.addEventListener("DOMContentLoaded", applySidebarState);
  document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("sidebar")) return;

    const original = window.toggleSidebar;
    if (typeof original === "function") {
      window.toggleSidebar = function (...args) {
        const result = original.apply(this, args);
        sidebarState();
        return result;
      };
    } else {
      window.toggleSidebar = function () {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;
        sidebar.classList.toggle("close");
        sidebarState();
      };
    }
  });
})()