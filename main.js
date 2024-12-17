
const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];

async function fetchDataUsingAsyncAwait() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    cryptoData = data;
    renderTable(cryptoData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderTable(data) {
  const tableBody = document.querySelector("#cryptotable tbody");
  tableBody.innerHTML = "";

  data.forEach(coin => {
    const row = `
      <tr>
        <th><img src="${coin.image}" alt="${coin.name}"></th>
        <th>${coin.name}</th>
        <th>${coin.symbol.toUpperCase()}</th>
        <th>$${coin.current_price.toLocaleString()}</th>
        <th>${coin.total_volume.toLocaleString()}</th>
        <th>$${coin.market_cap.toLocaleString()}</th>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function searchCrypto() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const filteredData = cryptoData.filter(
    coin =>
      coin.name.toLowerCase().includes(searchInput) ||
      coin.symbol.toLowerCase().includes(searchInput)
  );
  renderTable(filteredData);
}

function sortByMarketCap() {
  const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
}

function sortByPercentageChange() {
  const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sortedData);
}

document.getElementById("search").addEventListener("input", searchCrypto);
document.getElementById("mtk").addEventListener("click", sortByMarketCap);
document.getElementById("percent").addEventListener("click", sortByPercentageChange);

fetchDataUsingAsyncAwait();