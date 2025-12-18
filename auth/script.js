// ====================
// === Credentials Storage ===
// ====================
const STORAGE = {
  theme: "stocksim:theme", // "dark" | "light"
  sidebar: "stocksim:sidebar", // "open" | "close"
  creds: "stocksim:creds", // JSON string
};

(() => {
  const ensureBlankCreds = () => {
    if (localStorage.getItem(STORAGE.creds) != null) return;
    localStorage.setItem(
      STORAGE.creds,
      JSON.stringify({
        username: null,
        email: null,
        password: null,
        updatedAt: null,
        sourcePath: null,
      })
    );
  };

  const storeCredsFromForm = (form) => {
    const username = form.querySelector("#username")?.value?.trim() || null;
    const email = form.querySelector("#email")?.value?.trim() || null;
    const password = form.querySelector("#password")?.value ?? null;

    const payload = {
      username,
      email,
      password,
      updatedAt: new Date().toISOString(),
      sourcePath: window.location.pathname,
    };

    localStorage.setItem(STORAGE.creds, JSON.stringify(payload));
    return payload;
  };

  document.addEventListener("DOMContentLoaded", () => {
    ensureBlankCreds();

    const form = document.querySelector("form.auth-container");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const saved = storeCredsFromForm(form);

      window.location.assign("/dashboard/index.html");
    });
  });
})();
