// ====================
// === Credentials Storage ===
// ====================
(() => {
  const STORAGE = window.STOCKSIM_STORAGE ?? {
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

    const getDashboardUrl = () => {
      return new URL(
        "../../dashboard/index.html",
        window.location.href
      ).toString();
    };

    document.addEventListener("DOMContentLoaded", () => {
      ensureBlankCreds();

      const form = document.querySelector("form");

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        storeCredsFromForm(form);
        window.location.href = getDashboardUrl();
      });
    });
  })();
})();
