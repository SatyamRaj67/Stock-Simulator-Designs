(() => {
  const CREDS_KEY = "stocksim:creds";

  const resolveFromConstantsScript = (relativePath) => {
    const constantsScript = Array.from(document.scripts).find((s) =>
      (s.src || "").includes("/constants.js")
    );

    // Fallback: resolve from current page URL
    if (!constantsScript?.src) return new URL(relativePath, window.location.href).href;

    // Resolve relative to constants.js location (project root)
    return new URL(relativePath, constantsScript.src).href;
  };

  const loadCreds = () => {
    try {
      const raw = localStorage.getItem(CREDS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    // Set profile image
    const imgEl = document.getElementById("profile_img");
    if (imgEl && typeof window.profile_img === "string" && window.profile_img.trim()) {
      imgEl.src = resolveFromConstantsScript(window.profile_img);
    }

    // Fill disabled fields from localStorage (saved during register/login demo)
    const creds = loadCreds() || {};
    const u = document.getElementById("username");
    const e = document.getElementById("email");
    const p = document.getElementById("password");

    if (u) u.value = creds.username || "********";
    if (e) e.value = creds.email || "*********@gmail.com";
    if (p) p.value = creds.password || "********";
  });
})();