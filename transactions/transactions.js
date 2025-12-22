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
