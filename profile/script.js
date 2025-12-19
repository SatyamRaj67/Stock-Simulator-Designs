(() => {
  const CREDS_KEY = "stocksim:creds";
  
  const loadCreds = () => {
    try {
      const raw = localStorage.getItem(CREDS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
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