const stock_data = [
  { ticker: "AAPL", name: "Apple Inc.", price: 175.4, change: "+1.2%" },
  { ticker: "MSFT", name: "Microsoft Corp.", price: 410.25, change: "-0.4%" },
  { ticker: "GOOGL", name: "Alphabet Inc.", price: 158.9, change: "+0.8%" },
  { ticker: "AMZN", name: "Amazon.com Inc.", price: 172.15, change: "+0.3%" },
  { ticker: "TSLA", name: "Tesla Inc.", price: 248.6, change: "-1.1%" },
  { ticker: "NVDA", name: "NVIDIA Corp.", price: 132.75, change: "+2.5%" },
  {
    ticker: "META",
    name: "Meta Platforms Inc.",
    price: 606.4,
    change: "+0.6%",
  },
  { ticker: "NFLX", name: "Netflix Inc.", price: 892.1, change: "-0.7%" },
  {
    ticker: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 241.35,
    change: "+0.2%",
  },
  { ticker: "V", name: "Visa Inc.", price: 316.8, change: "+0.9%" },
  { ticker: "DIS", name: "Walt Disney Co.", price: 112.55, change: "-0.2%" },
];

const watchlist = document.getElementById("watchlist");

stock_data.forEach((stock) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="symbol">
        <h2>${stock.ticker}</h2>
        <p>${stock.name}</p>
      </div>
      <div class="prices">
        <h2>$${stock.price.toFixed(2)}</h2>
        <p class="${stock.change.startsWith('+') ? 'up' : 'down'}">${stock.change}</p>
      </div>
    `;
    watchlist.appendChild(li);
})
