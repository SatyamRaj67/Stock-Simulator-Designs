(() => {
  const container = document.getElementById("chart-container");
  if (!container) return;

  const holdingsContainer = document.getElementById("holdings_chart");
  if (!holdingsContainer) return;

  if (!window.LightweightCharts) {
    console.error(
      "LightweightCharts not found. Make sure the CDN script is loaded before chart.js.",
    );
    return;
  }

  const hasColorJs = typeof window.Color === "function";
  if (!hasColorJs) {
    console.warn(
      "Color.js not found; OKLCH -> RGB conversion may fail in Lightweight Charts.",
    );
  }

  const readCssVar = (name, fallback) => {
    const raw = getComputedStyle(document.body).getPropertyValue(name).trim();
    return raw || fallback;
  };

  const toRgbCss = (cssColor, fallback) => {
    if (!cssColor) return fallback;
    if (!hasColorJs) return fallback;
    try {
      const colorObj = new window.Color(cssColor);
      const srgbColor = colorObj.to("srgb");
      const [r, g, b] = srgbColor.coords;
      const alpha = srgbColor.alpha ?? 1;

      const r255 = Math.round(r * 255);
      const g255 = Math.round(g * 255);
      const b255 = Math.round(b * 255);

      return `rgba(${r255}, ${g255}, ${b255}, ${alpha})`;
    } catch {
      return fallback;
    }
  };

  // --- Main candlestick chart ---
  const chart = LightweightCharts.createChart(container, {
    width: container.clientWidth || 600,
    height: container.clientHeight || 320,
  });

  const candles = chart.addSeries(LightweightCharts.CandlestickSeries);

  const candleData = Array.isArray(chartData) ? chartData : [];
  candles.setData(candleData);
  chart.timeScale().fitContent();

  // --- Holdings area chart ---
  const holdingsChart = LightweightCharts.createChart(holdingsContainer, {
    width: holdingsContainer.clientWidth || 600,
    height: holdingsContainer.clientHeight || 220,
  });

  const holdingsSeries = holdingsChart.addSeries(LightweightCharts.AreaSeries, {
    lineWidth: 2,
  });

  const holdingsData = Array.isArray(holdings_data) ? holdings_data : [];
  holdingsSeries.setData(holdingsData);
  holdingsChart.timeScale().fitContent();

  const applyTheme = () => {
    const bg = toRgbCss(readCssVar("--card"), "#111");
    const text = toRgbCss(readCssVar("--foreground"), "#fff");
    const grid = toRgbCss(readCssVar("--border"), "rgba(0,0,0,0.15)");

    // pick a “positive” accent for the holdings curve
    const green = toRgbCss(readCssVar("--green"), "rgba(46, 204, 113, 1)");
    const topFill = toRgbCss(readCssVar("--green"), "rgba(46, 204, 113, 0.35)");
    const bottomFill = "rgba(0, 0, 0, 0)";

    chart.applyOptions({
      layout: { background: { type: "solid", color: bg }, textColor: text },
      grid: { vertLines: { color: grid }, horzLines: { color: grid } },
      rightPriceScale: { borderColor: grid },
      timeScale: { borderColor: grid },
    });

    holdingsChart.applyOptions({
      layout: { background: { type: "solid", color: bg }, textColor: text },
      grid: { vertLines: { color: grid }, horzLines: { color: grid } },
      rightPriceScale: { borderColor: grid },
      timeScale: { borderColor: grid },
    });

    holdingsSeries.applyOptions({
      lineColor: green,
      topColor: topFill,
      bottomColor: bottomFill,
    });
  };

  const resize = () => {
    chart.applyOptions({
      width: container.clientWidth || 600,
      height: container.clientHeight || 320,
    });

    holdingsChart.applyOptions({
      width: holdingsContainer.clientWidth || 600,
      height: holdingsContainer.clientHeight || 220,
    });
  };

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  ro.observe(holdingsContainer);

  const mo = new MutationObserver(applyTheme);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  window.addEventListener("resize", resize, { passive: true });

  applyTheme();
  resize();
})();
