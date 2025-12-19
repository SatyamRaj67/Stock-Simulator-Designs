(() => {
  "use strict";

  const data = Array.isArray(window.transactions_data)
    ? window.transactions_data.slice()
    : [];

  const el = {
    search: document.getElementById("tx-search"),
    filterType: document.getElementById("tx-filter-type"),
    filterStatus: document.getElementById("tx-filter-status"),
    pageSize: document.getElementById("tx-page-size"),
    reset: document.getElementById("tx-reset"),
    tbody: document.getElementById("tx-tbody"),
    empty: document.getElementById("tx-empty"),
    meta: document.getElementById("tx-meta"),
    pagination: document.getElementById("tx-pagination"),
    sortButtons: Array.from(document.querySelectorAll(".tx-th[data-sort]")),
  };

  if (!el.tbody) return;

  const money = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const state = {
    q: "",
    type: "",
    status: "",
    sortKey: "date",
    sortDir: "desc", // "asc" | "desc"
    page: 1,
    pageSize: Number(el.pageSize?.value || 10),
  };

  function normalize(v) {
    return String(v ?? "")
      .trim()
      .toLowerCase();
  }

  function parseDateValue(d) {
    // supports "YYYY-MM-DD" in your constants
    const t = Date.parse(d);
    return Number.isFinite(t) ? t : 0;
  }

  function getSortValue(row, key) {
    switch (key) {
      case "total":
        return Number(row.shares) * Number(row.price);
      case "date":
        return parseDateValue(row.date);
      default:
        return row[key];
    }
  }

  function compare(a, b, key, dir) {
    const av = getSortValue(a, key);
    const bv = getSortValue(b, key);

    // numbers / dates
    if (typeof av === "number" && typeof bv === "number") {
      return dir === "asc" ? av - bv : bv - av;
    }

    // fallback string compare
    const as = normalize(av);
    const bs = normalize(bv);
    if (as < bs) return dir === "asc" ? -1 : 1;
    if (as > bs) return dir === "asc" ? 1 : -1;
    return 0;
  }

  function applyFilters(rows) {
    const q = normalize(state.q);
    const type = normalize(state.type);
    const status = normalize(state.status);

    return rows.filter((r) => {
      if (type && normalize(r.type) !== type) return false;
      if (status && normalize(r.status) !== status) return false;

      if (!q) return true;

      const haystack = [
        r.id,
        r.type,
        r.stock,
        r.shares,
        r.price,
        r.date,
        r.status,
      ]
        .map(normalize)
        .join(" ");

      return haystack.includes(q);
    });
  }

  function paginate(rows) {
    const pageSize = Math.max(1, state.pageSize);
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const page = Math.min(Math.max(1, state.page), totalPages);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      page,
      pageSize,
      totalPages,
      totalRows: rows.length,
      pageRows: rows.slice(start, end),
    };
  }

  function formatDate(dateStr) {
    // Keep it simple + stable; can be replaced with locale formatting later
    return String(dateStr ?? "");
  }

  function pillClass(kind, value) {
    const v = normalize(value);
    if (kind === "type") {
      if (v === "buy") return "tx-pill tx-pill--buy";
      if (v === "sell") return "tx-pill tx-pill--sell";
    }
    if (kind === "status") {
      if (v === "completed") return "tx-pill tx-pill--ok";
      if (v === "pending") return "tx-pill tx-pill--pending";
    }
    return "tx-pill";
  }

  function renderRows(rows) {
    el.tbody.innerHTML = rows
      .map((r) => {
        const total = Number(r.shares) * Number(r.price);
        return `
          <tr>
            <td class="tx-mono">${r.id ?? ""}</td>
            <td><span class="${pillClass("type", r.type)}">${
          r.type ?? ""
        }</span></td>
            <td class="tx-mono">${r.stock ?? ""}</td>
            <td class="tx-num tx-mono">${r.shares ?? ""}</td>
            <td class="tx-num tx-mono">${
              Number.isFinite(Number(r.price))
                ? money.format(Number(r.price))
                : ""
            }</td>
            <td class="tx-num tx-mono">${
              Number.isFinite(total) ? money.format(total) : ""
            }</td>
            <td class="tx-mono">${formatDate(r.date)}</td>
            <td><span class="${pillClass("status", r.status)}">${
          r.status ?? ""
        }</span></td>
          </tr>
        `;
      })
      .join("");
  }

  function renderMeta(totalRows, page, totalPages) {
    el.meta.textContent = `${totalRows} result${
      totalRows === 1 ? "" : "s"
    } • Page ${page} of ${totalPages}`;
  }

  function renderPagination(page, totalPages) {
    const prevDisabled = page <= 1;
    const nextDisabled = page >= totalPages;

    el.pagination.innerHTML = `
      <button class="tx-btn" type="button" data-page="prev" ${
        prevDisabled ? "disabled" : ""
      }>Prev</button>
      <span class="tx-page">${page}</span>
      <button class="tx-btn" type="button" data-page="next" ${
        nextDisabled ? "disabled" : ""
      }>Next</button>
    `;

    el.pagination.querySelectorAll("button[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const which = btn.getAttribute("data-page");
        state.page = which === "prev" ? page - 1 : page + 1;
        update();
      });
    });
  }

  function renderSortIndicators() {
    el.sortButtons.forEach((btn) => {
      const key = btn.getAttribute("data-sort");
      const active = key === state.sortKey;
      btn.setAttribute(
        "aria-sort",
        active ? (state.sortDir === "asc" ? "ascending" : "descending") : "none"
      );
      btn.classList.toggle("is-active", active);
    });
  }

  function update() {
    // filter
    let rows = applyFilters(data);

    // sort
    rows = rows
      .slice()
      .sort((a, b) => compare(a, b, state.sortKey, state.sortDir));

    // paginate
    const p = paginate(rows);
    state.page = p.page;

    // render
    el.empty.hidden = p.totalRows !== 0;
    renderRows(p.pageRows);
    renderMeta(p.totalRows, p.page, p.totalPages);
    renderPagination(p.page, p.totalPages);
    renderSortIndicators();
  }

  // events
  el.search?.addEventListener("input", (e) => {
    state.q = e.target.value;
    state.page = 1;
    update();
  });

  el.filterType?.addEventListener("change", (e) => {
    state.type = e.target.value;
    state.page = 1;
    update();
  });

  el.filterStatus?.addEventListener("change", (e) => {
    state.status = e.target.value;
    state.page = 1;
    update();
  });

  el.pageSize?.addEventListener("change", (e) => {
    state.pageSize = Number(e.target.value || 10);
    state.page = 1;
    update();
  });

  el.reset?.addEventListener("click", () => {
    state.q = "";
    state.type = "";
    state.status = "";
    state.page = 1;
    state.pageSize = Number(el.pageSize?.value || 10);
    state.sortKey = "date";
    state.sortDir = "desc";

    if (el.search) el.search.value = "";
    if (el.filterType) el.filterType.value = "";
    if (el.filterStatus) el.filterStatus.value = "";

    update();
  });

  el.sortButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-sort");
      if (!key) return;

      if (state.sortKey === key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDir = "asc";
      }
      state.page = 1;
      update();
    });
  });

  // initial
  update();
})();
