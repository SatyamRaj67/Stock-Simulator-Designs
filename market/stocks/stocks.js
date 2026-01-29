document.getElementById("quantity").addEventListener("input", function () {
  const quantity = parseInt(this.value) || 0;
  const pricePerShare = 420.69;
  const totalPrice = quantity * pricePerShare;
  document.getElementById("total_price").value =
    `$${totalPrice.toFixed(2)} USD`;
});

const tbody = document.querySelector("tbody");
const stock = tbody.getAttribute("data-stock");

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

const fragment = document.createDocumentFragment();
transaction_data.forEach((transaction) => {
  if (transaction.stock !== stock) return;
  const tr = document.createElement("tr");
  tr.innerHTML = `
      <td data-label="ID">${transaction.id}</td>
      <td data-label="TYPE"><div class="badge" 
      data-color="${getTypeColor(transaction.type)}">
      ${transaction.type}</div></td>
      <td data-label="STOCK" class="extra">${transaction.stock}</td>
      <td data-label="SHARES">${transaction.shares}</td>
      <td data-label="PRICE" class="extra">${transaction.price}</td>
      <td data-label="TOTAL">${transaction.price * transaction.shares}</td>
      <td data-label="DATE">${transaction.date}</td>
      <td data-label="STATUS" class="extra"><div class="badge"
      data-color="${getStatusColor(transaction.status)}">
      ${transaction.status}
      </div></td>
    `;
  fragment.appendChild(tr);
});

tbody.appendChild(fragment);
