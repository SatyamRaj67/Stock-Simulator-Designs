document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector("#social-sidebar");
  if (!sidebar) return;

  const input = sidebar.querySelector("#nameSearch");
  const list = sidebar.querySelector("ul");
  if (!input || !list) return;

  const items = Array.from(list.querySelectorAll(":scope > li"));

  const normalize = (s) =>
    (s ?? "")
      .toString()
      .trim()
      .toLowerCase();

  const applyFilter = () => {
    const query = normalize(input.value);

    for (const li of items) {
      const nameSpan = li.querySelector("a > span");
      const name = normalize(nameSpan?.textContent);

      li.hidden = query.length > 0 ? !name.includes(query) : false;
    }
  };

  input.addEventListener("input", applyFilter);
  applyFilter(); 
});