const data = [
  {
    id: 1,
    type: "Buy",
    stock: "AAPL",
    shares: 10,
    price: 150,
    date: "2024-01-05",
    status: "COMPLETED",
  },
  {
    id: 2,
    type: "Buy",
    stock: "MSFT",
    shares: 5,
    price: 372,
    date: "2024-01-08",
    status: "CANCELLED",
  },
  {
    id: 3,
    type: "Sell",
    stock: "AAPL",
    shares: 4,
    price: 158,
    date: "2024-01-10",
    status: "COMPLETED",
  },
  {
    id: 4,
    type: "Buy",
    stock: "TSLA",
    shares: 3,
    price: 242,
    date: "2024-01-12",
    status: "COMPLETED",
  },
  {
    id: 5,
    type: "Buy",
    stock: "NVDA",
    shares: 2,
    price: 560,
    date: "2024-01-16",
    status: "COMPLETED",
  },
  {
    id: 6,
    type: "Sell",
    stock: "TSLA",
    shares: 1,
    price: 255,
    date: "2024-01-18",
    status: "COMPLETED",
  },
  {
    id: 7,
    type: "Buy",
    stock: "AMZN",
    shares: 6,
    price: 162,
    date: "2024-01-22",
    status: "COMPLETED",
  },
  {
    id: 8,
    type: "Sell",
    stock: "MSFT",
    shares: 2,
    price: 381,
    date: "2024-01-26",
    status: "PENDING",
  },
{
  id: 9,
  type: "Buy",
  stock: "GOOGL",
  shares: 3,
  price: 142,
  date: "2024-02-01",
  status: "COMPLETED",
},
{
  id: 10,
  type: "Sell",
  stock: "NVDA",
  shares: 1,
  price: 585,
  date: "2024-02-03",
  status: "COMPLETED",
},
{
  id: 11,
  type: "Buy",
  stock: "META",
  shares: 4,
  price: 465,
  date: "2024-02-06",
  status: "COMPLETED",
},
{
  id: 12,
  type: "Buy",
  stock: "NFLX",
  shares: 2,
  price: 610,
  date: "2024-02-08",
  status: "PENDING",
},
{
  id: 13,
  type: "Sell",
  stock: "AAPL",
  shares: 3,
  price: 161,
  date: "2024-02-12",
  status: "COMPLETED",
},
{
  id: 14,
  type: "Buy",
  stock: "AMD",
  shares: 7,
  price: 168,
  date: "2024-02-14",
  status: "COMPLETED",
},
{
  id: 15,
  type: "Buy",
  stock: "INTC",
  shares: 12,
  price: 45,
  date: "2024-02-16",
  status: "CANCELLED",
},
{
  id: 16,
  type: "Sell",
  stock: "AMZN",
  shares: 2,
  price: 170,
  date: "2024-02-20",
  status: "COMPLETED",
},
{
  id: 17,
  type: "Buy",
  stock: "TSLA",
  shares: 2,
  price: 233,
  date: "2024-02-22",
  status: "PENDING",
},
{
  id: 18,
  type: "Buy",
  stock: "SPY",
  shares: 5,
  price: 492,
  date: "2024-02-26",
  status: "COMPLETED",
},
{
  id: 19,
  type: "Sell",
  stock: "MSFT",
  shares: 1,
  price: 395,
  date: "2024-02-28",
  status: "COMPLETED",
},
{
  id: 20,
  type: "Buy",
  stock: "QQQ",
  shares: 3,
  price: 430,
  date: "2024-03-01",
  status: "COMPLETED",
},
{
  id: 21,
  type: "Buy",
  stock: "JPM",
  shares: 6,
  price: 172,
  date: "2024-03-04",
  status: "COMPLETED",
},
{
  id: 22,
  type: "Sell",
  stock: "GOOGL",
  shares: 1,
  price: 148,
  date: "2024-03-06",
  status: "CANCELLED",
},
{
  id: 23,
  type: "Buy",
  stock: "DIS",
  shares: 8,
  price: 98,
  date: "2024-03-08",
  status: "COMPLETED",
},
{
  id: 24,
  type: "Sell",
  stock: "META",
  shares: 2,
  price: 478,
  date: "2024-03-12",
  status: "PENDING",
}
];

function renderTransactions() {
  const tbody = document.querySelector("tbody");

  function getTypeColor(type) {
    switch (type.toUpperCase()) {
      case "BUY":
        return "green";
      case "SELL":
        return "red";
      default:
        return "gray";
    }
  }

  function getStatusColor(status) {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return "green";
      case "PENDING":
        return "yellow";
      case "CANCELLED":
        return "red";
      default:
        return "gray";
    }
  }

  tbody.innerHTML = data
    .map(
      (transaction) => `
        <tr>
          <td data-label="ID">${transaction.id}</td>
          <td data-label="TYPE"><div class="badge" 
          data-color="${getTypeColor(transaction.type)}">
          ${transaction.type}</div></td>
          <td data-label="STOCK">${transaction.stock}</td>
          <td data-label="SHARES">${transaction.shares}</td>
          <td data-label="PRICE">${transaction.price}</td>
          <td data-label="TOTAL">${transaction.price * transaction.shares}</td>
          <td data-label="DATE">${transaction.date}</td>
          <td data-label="STATUS"><div class="badge"
          data-color="${getStatusColor(transaction.status)}">
          ${transaction.status}
          </div></td>
        </tr>
      `
    )
    .join("");
}

renderTransactions();
