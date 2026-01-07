(() => {
  const container = document.getElementById("chart-container");
  if (!container) return;
  
  if (!window.LightweightCharts) {
    console.error(
      "LightweightCharts not found. Make sure the CDN script is loaded before chart.js."
    );
    return;
  }
  
  const hasColorJs = typeof window.Color === "function";
  if (!hasColorJs) {
    console.warn(
      "Color.js not found; OKLCH -> RGB conversion may fail in Lightweight Charts."
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

  const chart = window.LightweightCharts.createChart(container, {
    width: container.clientWidth || 600,
    height: container.clientHeight || 320,
  });

  const candles = chart.addSeries(window.LightweightCharts.CandlestickSeries);

  const data = Array.isArray(window.chartData) ? window.chartData : [];
  candles.setData(data);
  chart.timeScale().fitContent();

  const applyTheme = () => {
    chart.applyOptions({
      layout: {
        background: {
          type: "solid",
          color: toRgbCss(readCssVar("--sidebar"), "#111"),
        },
        textColor: toRgbCss(readCssVar("--foreground"), "#fff"),
      },
      grid: {
        vertLines: {
          color: toRgbCss(readCssVar("--border"), "rgba(0,0,0,0.15)"),
        },
        horzLines: {
          color: toRgbCss(readCssVar("--border"), "rgba(0,0,0,0.15)"),
        },
      },
      rightPriceScale: {
        borderColor: toRgbCss(readCssVar("--border"), "rgba(0,0,0,0.15)"),
      },
      timeScale: {
        borderColor: toRgbCss(readCssVar("--border"), "rgba(0,0,0,0.15)"),
      },
    });
  };

  const resize = () => {
    chart.applyOptions({
      width: container.clientWidth || 600,
      height: container.clientHeight || 320,
    });
  };

  const ro = new ResizeObserver(() => resize());
  ro.observe(container);

  const mo = new MutationObserver(() => applyTheme());
  mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });

  window.addEventListener("resize", resize, { passive: true });

  applyTheme();
})();
