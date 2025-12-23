const market_data = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 157.96,
    change: +1.24,
    change_percent: +0.79,
    href: "https://www.example.com/stocks/AAPL",
  },
];

function getChangeColour(change) {
  return change >= 0 ? "green" : "red";
}

function renderMarketTable() {
  const tableBody = document.querySelector("table tbody");
  if (!tableBody) return;

  const rows = market_data
    .map((stock) => {
      return `
        <tr>
          <td data-label="Stock">${stock.symbol}</td>
          <td data-label="Price">${stock.price}</td>
          <td data-label="24H Change" style="color: ${getChangeColour(stock.change)};">${stock.change} (${stock.change_percent}%)</td>
          <td data-label="Market Cap">-</td>
          <td data-label="Volume">-</td>
          <td data-label="Trade">Trade</td>
        </tr>
      `;
    })
    .join("");

  tableBody.innerHTML = rows;
}

renderMarketTable();
