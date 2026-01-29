const market_data = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 157.96,
    change: +1.24,
    change_percent: +0.79,
    market_cap: "2.5T",
    volume: "75M",
    href: "AAPL/index.html",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 412.38,
    change: -2.17,
    change_percent: -0.52,
    market_cap: "1.9T",
    volume: "30M",
    href: "MSFT/index.html",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 173.44,
    change: +1.06,
    change_percent: +0.61,
    market_cap: "1.4T",
    volume: "20M",
    href: "GOOGL/index.html",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 188.27,
    change: +3.84,
    change_percent: +2.08,
    market_cap: "1.6T",
    volume: "25M",
    href: "AMZN/index.html",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 135.62,
    change: +2.49,
    change_percent: +1.87,
    market_cap: "1.0T",
    volume: "50M",
    href: "NVDA/index.html",
  },
];

(() => {
  const tableBody = document.querySelector("table tbody");
  const fragment = document.createDocumentFragment();

  market_data.forEach((stock) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td data-label="Stock">${stock.symbol}</td>
      <td data-label="Price">${stock.price}</td>
      <td data-label="24H Change" style="color: ${
        stock.change >= 0
          ? "oklch(72.276% 0.19199 149.6)"
          : "oklch(63.681% 0.20784 25.315)"
      };">${stock.change >= 0 ? "+▲" : "-▼"}${Math.abs(
        stock.change,
      )} (${Math.abs(stock.change_percent)}%)</td>
      <td data-label="Market Cap">${stock.market_cap}</td>
      <td data-label="Volume">${stock.volume}</td>
      <td data-label="Trade"><a href="${stock.href}">Trade</a></td>
    `;

    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);
})();
