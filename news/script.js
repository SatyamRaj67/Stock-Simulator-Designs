const news_data = [
  {
    id: "semiconductor-trade-restrictions",
    startDate: "2024-06-15",
    endDate: "2024-06-20",
    title: "Semiconductor Trade Restrictions",
    description:
      "New restrictions on advanced semiconductor exports may impact supply chains and lead times across multiple industries.",
    influence: "high",
    influencedSectors: [
      { sector: "Healthcare", change_percent: "+0.85%" },
      { sector: "Technology", change_percent: "-1.20%" },
      { sector: "Energy", change_percent: "+0.45%" },
      { sector: "Financials", change_percent: "+0.30%" },
      { sector: "Consumer", change_percent: "-0.65%" },
    ],
    influencedStocks: ["NVDA", "AAPL", "ASML", "TSM", "AMD"],
    insights: {
      Technology:
        "Tighter chip supply can slow product launches and lift component costs.",
      Manufacturing:
        "Industrial firms dependent on electronics may see cost pressure and delivery delays.",
    },
    createdAt: "2024-06-14T10:00:00Z",
    createdBy: "admin",
  },
  {
    id: "oil-supply-shock",
    startDate: "2024-07-02",
    endDate: "2024-07-06",
    title: "Oil Supply Shock Rumors",
    description:
      "Reports of temporary supply disruptions push crude prices higher, increasing inflation expectations.",
    influence: "medium",
    influencedSectors: [
      { sector: "Energy", change_percent: "+2.10%" },
      { sector: "Industrials", change_percent: "-0.55%" },
      { sector: "Consumer", change_percent: "-0.80%" },
      { sector: "Technology", change_percent: "-0.25%" },
      { sector: "Utilities", change_percent: "+0.35%" },
    ],
    influencedStocks: ["XOM", "CVX", "OXY", "DAL", "UPS"],
    insights: {
      Energy:
        "Higher realized prices may lift near-term cash flows for producers.",
      Consumer:
        "Fuel-sensitive spending categories may soften if prices stay elevated.",
    },
    createdAt: "2024-07-01T09:10:00Z",
    createdBy: "admin",
  },
  {
    id: "rate-cut-speculation",
    startDate: "2024-08-10",
    endDate: "2024-08-15",
    title: "Rate-Cut Speculation Builds",
    description:
      "Traders increase bets on a near-term rate cut after softer inflation prints and cooling labor indicators.",
    influence: "high",
    influencedSectors: [
      { sector: "Financials", change_percent: "-1.10%" },
      { sector: "Real Estate", change_percent: "+1.35%" },
      { sector: "Technology", change_percent: "+0.70%" },
      { sector: "Consumer", change_percent: "+0.40%" },
      { sector: "Utilities", change_percent: "+0.55%" },
    ],
    influencedStocks: ["JPM", "BAC", "VNQ", "MSFT", "AMZN"],
    insights: {
      Financials:
        "Net interest margin expectations can compress if cuts arrive sooner.",
      "Real Estate":
        "Lower discount rates can improve affordability and cap-rate expectations.",
    },
    createdAt: "2024-08-09T16:30:00Z",
    createdBy: "admin",
  },
  {
    id: "biotech-breakthrough",
    startDate: "2024-09-03",
    endDate: "2024-09-05",
    title: "Biotech Trial Breakthrough",
    description:
      "A late-stage trial posts strong efficacy, shifting sentiment toward healthcare innovators and suppliers.",
    influence: "medium",
    influencedSectors: [
      { sector: "Healthcare", change_percent: "+1.65%" },
      { sector: "Technology", change_percent: "+0.15%" },
      { sector: "Financials", change_percent: "+0.10%" },
      { sector: "Consumer", change_percent: "-0.05%" },
      { sector: "Industrials", change_percent: "+0.20%" },
    ],
    influencedStocks: ["PFE", "MRNA", "REGN", "TMO", "ILMN"],
    insights: {
      Healthcare:
        "Improved success odds can lift risk appetite across biotech and adjacent tooling vendors.",
    },
    createdAt: "2024-09-02T12:00:00Z",
    createdBy: "admin",
  },
];

// Make data available to chart.js (it reads window.news_data)
window.news_data = news_data;

// Cache DOM once
const newsListContainer = document.getElementById("news");
const infoListContainer = document.getElementById("info");
const dataTitleEl = document.getElementById("data-title");

if (!newsListContainer || !infoListContainer || !dataTitleEl) {
  throw new Error("Missing required elements: #news, #info, or #data-title");
}

// ----- utils -----
function parsePercent(percentStr) {
  const n = Number.parseFloat(String(percentStr).replace("%", ""));
  return Number.isFinite(n) ? n : 0;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// ----- UI builders -----
function buildBatteryEl(changePercentStr) {
  const totalSegments = 49;
  const centerIndex = Math.floor(totalSegments / 2); // 24
  const maxAbsPercent = 5;

  const value = parsePercent(changePercentStr);
  const abs = Math.min(Math.abs(value), maxAbsPercent);
  const activeCount = Math.round((abs / maxAbsPercent) * centerIndex);

  const battery = document.createElement("div");
  battery.className = "battery";
  battery.dataset.percent = changePercentStr;

  const isPositive = value >= 0;
  battery.style.setProperty(
    "--color",
    isPositive
      ? "oklch(72.276% 0.19199 149.6)"
      : "oklch(63.681% 0.20784 25.315)"
  );

  for (let idx = 0; idx < totalSegments; idx++) {
    const seg = document.createElement("div");
    seg.classList.add("segment");

    if (idx === centerIndex) {
      seg.classList.add(isPositive ? "active-positive" : "active-negative");
      battery.appendChild(seg);
      continue;
    }

    if (idx < centerIndex) {
      const fromCenter = centerIndex - idx;
      const active = !isPositive && fromCenter <= activeCount;
      seg.classList.add(active ? "active-negative" : "inactive-negative");
    } else {
      const fromCenter = idx - centerIndex;
      const active = isPositive && fromCenter <= activeCount;
      seg.classList.add(active ? "active-positive" : "inactive-positive");
    }

    battery.appendChild(seg);
  }

  return battery;
}

// ----- renderers -----
function renderNewsList(items) {
  newsListContainer.innerHTML = "";

  const frag = document.createDocumentFragment();

  items.forEach((news, index) => {
    const li = document.createElement("li");
    li.dataset.index = String(index);

    li.innerHTML = `
      <div class="head">
        <div class="date">${news.startDate} - ${news.endDate}</div>
      </div>
      <h2>${news.title}</h2>
      <p>${news.description}</p>
    `;

    frag.appendChild(li);
  });

  newsListContainer.appendChild(frag);
}

function setSelectedNewsItem(index) {
  const items = newsListContainer.querySelectorAll("li");
  items.forEach((item) => {
    item.classList.remove("active");
    item.removeAttribute("aria-current");
  });

  const selected = newsListContainer.querySelector(`li[data-index="${index}"]`);
  if (selected) {
    selected.classList.add("active");
    selected.setAttribute("aria-current", "true");
  }
}

function renderInfoForNews(index) {
  const news = news_data[index];
  if (!news) return;

  dataTitleEl.textContent = news.title;
  infoListContainer.innerHTML = "";

  // Chart may not be ready on first run because chart.js loads after script.js.
  // This is still safe: chart.js will initialize itself with news_data[0] anyway.
  if (typeof window.updateNewsChart === "function") {
    window.updateNewsChart(news);
  }

  const frag = document.createDocumentFragment();

  news.influencedSectors.forEach((sector) => {
    const row = document.createElement("li");

    const val = parsePercent(sector.change_percent);
    const isPositive = val >= 0;

    // same idea as your other version: bigger percent => more "fill"
    const deg = clamp(Math.abs(val) * 10, 0, 100);

    row.innerHTML = `
      <div class="sector">
        <span style="
          --deg: ${deg}%;
          --color: ${
            isPositive
              ? "oklch(72.276% 0.19199 149.6)"
              : "oklch(63.681% 0.20784 25.315)"
          };
          --transform: ${isPositive ? "1" : "-1"};
        ">
          <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="2"></circle>
          </svg>
        </span>
        ${sector.sector}
      </div>
    `;

    row.appendChild(buildBatteryEl(sector.change_percent));
    frag.appendChild(row);
  });

  infoListContainer.appendChild(frag);
}

// ----- events -----
newsListContainer.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li || !newsListContainer.contains(li)) return;

  const index = Number(li.dataset.index);
  if (!Number.isInteger(index)) return;

  setSelectedNewsItem(index);
  renderInfoForNews(index);
});

// ----- init -----
renderNewsList(news_data);

if (news_data.length > 0) {
  setSelectedNewsItem(0);
  renderInfoForNews(0);
}
