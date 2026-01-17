const market_data = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 157.96,
    change: +1.24,
    change_percent: +0.79,
    market_cap: "2.5T",
    volume: "75M",
    href: "https://www.example.com/stocks/AAPL",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 412.38,
    change: -2.17,
    change_percent: -0.52,
    market_cap: "1.9T",
    volume: "30M",
    href: "https://www.example.com/stocks/MSFT",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 173.44,
    change: +1.06,
    change_percent: +0.61,
    market_cap: "1.4T",
    volume: "20M",
    href: "https://www.example.com/stocks/GOOGL",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 188.27,
    change: +3.84,
    change_percent: +2.08,
    market_cap: "1.6T",
    volume: "25M",
    href: "https://www.example.com/stocks/AMZN",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 242.91,
    change: -5.33,
    change_percent: -2.15,
    market_cap: "800B",
    volume: "40M",
    href: "https://www.example.com/stocks/TSLA",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 135.62,
    change: +2.49,
    change_percent: +1.87,
    market_cap: "1.0T",
    volume: "50M",
    href: "https://www.example.com/stocks/NVDA",
  },
];

function renderMarketTable() {
  const tableBody = document.querySelector("table tbody");
  if (!tableBody) return;

  const rows = market_data
    .map((stock) => {
      return `
        <tr>
          <td data-label="Stock">${stock.symbol}</td>
          <td data-label="Price">${stock.price}</td>
          <td data-label="24H Change" style="color: ${
            stock.change >= 0
              ? "oklch(72.276% 0.19199 149.6)"
              : "oklch(63.681% 0.20784 25.315)"
          };">${stock.change >= 0 ? "+▲" : "-▼"}${Math.abs(
        stock.change
      )} (${Math.abs(stock.change_percent)}%)</td>
          <td data-label="Market Cap">${stock.market_cap}</td>
          <td data-label="Volume">${stock.volume}</td>
          <td data-label="Trade"><a href="${stock.href}">Trade</a></td>
        </tr>
      `;
    })
    .join("");

  tableBody.innerHTML = rows;
}

renderMarketTable();
