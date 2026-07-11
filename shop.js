document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('products-grid');
  const searchInput = document.getElementById('search-bar');
  const catFilter = document.getElementById('category-filter');
  const sortSelect = document.getElementById('sort-select');

  // Check URL parameters for category navigation from the homepage
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) catFilter.value = catParam;

  function processDisplay() {
    let dataset = [...products];

    // Filter Logic
    const searchVal = searchInput.value.toLowerCase().trim();
    if (searchVal) {
      dataset = dataset.filter(p => p.name.toLowerCase().includes(searchVal) || p.description.toLowerCase().includes(searchVal));
    }

    const catVal = catFilter.value;
    if (catVal !== 'all') {
      dataset = dataset.filter(p => p.category === catVal);
    }

    // Sorting Logic
    const sortVal = sortSelect.value;
    if (sortVal === 'low-high') {
      dataset.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'high-low') {
      dataset.sort((a, b) => b.price - a.price);
    }

    renderGrid(dataset);
  }

  function renderGrid(items) {
    if (items.length === 0) {
      grid.innerHTML = `<div class="col-12 text-center my-5 text-muted"><p>No items match your selected filters.</p></div>`;
      return;
    }

    grid.innerHTML = items.map(p => `
      <div class="col">
        <div class="card h-100 shadow-sm border-0">
          <img src="${p.image}" class="card-img-top object-fit-cover" style="height: 200px;" alt="${p.name}">
          <div class="card-body d-flex flex-column">
            <span class="badge bg-secondary mb-2 align-self-start text-uppercase small" style="font-size:0.7rem;">${p.category}</span>
            <h6 class="card-title fw-bold mb-1 text-dark">${p.name}</h6>
            <p class="card-text text-muted small flex-grow-1">${p.description.substring(0, 65)}...</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="fw-bold text-primary">$${p.price.toFixed(2)}</span>
              <a href="product-detail.html?id=${p.id}" class="btn btn-outline-dark btn-sm">View Item</a>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Hook operational event listeners
  searchInput.addEventListener('input', processDisplay);
  catFilter.addEventListener('change', processDisplay);
  sortSelect.addEventListener('change', processDisplay);

  processDisplay(); // Core running call
});