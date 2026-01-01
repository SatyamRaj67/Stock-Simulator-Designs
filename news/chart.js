(function () {
  function parsePercent(str) {
    const n = Number.parseFloat(String(str).replace("%", ""));
    return Number.isFinite(n) ? n : 0;
  }

  function getThemeColors() {
    const cs = getComputedStyle(document.body);
    const grid = cs.getPropertyValue("--border").trim() || "rgba(255,255,255,0.12)";
    const text = cs.getPropertyValue("--muted-foreground").trim() || "#b7b7b7";
    const line = cs.getPropertyValue("--border").trim() || "#ffffff";
    const pos = "rgba(46, 204, 113, 0.25)";
    const neg = "rgba(231, 76, 60, 0.25)";
    return { grid, text, line, pos, neg };
  }

  const canvas = document.getElementById("newsChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const colors = getThemeColors();

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Sector impact (%)",
          data: [],
          borderColor: colors.line,
          backgroundColor: colors.pos,
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: colors.text },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed.y;
              const sign = v > 0 ? "+" : "";
              return ` ${ctx.dataset.label}: ${sign}${v.toFixed(2)}%`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: { color: colors.text },
          grid: { color: colors.grid },
        },
        y: {
          ticks: {
            color: colors.text,
            callback: (v) => `${v}%`,
          },
          grid: { color: colors.grid },
          suggestedMin: -3,
          suggestedMax: 3,
          beginAtZero: true,
        },
      },
    },
  });

  // Expose updater for script.js to call
  window.updateNewsChart = function updateNewsChart(news) {
    if (!news || !Array.isArray(news.influencedSectors)) return;

    const labels = news.influencedSectors.map((s) => s.sector);
    const values = news.influencedSectors.map((s) => parsePercent(s.change_percent));

    // Color fill based on overall direction
    const total = values.reduce((a, b) => a + b, 0);
    chart.data.datasets[0].backgroundColor = total >= 0 ? colors.pos : colors.neg;

    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.update();
  };

  // Initialize with first item if available
  if (Array.isArray(window.news_data) && window.news_data.length > 0) {
    window.updateNewsChart(window.news_data[0]);
  }
})();