document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('detail-canvas');
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = parseInt(urlParams.get('id'));

  const product = products.find(p => p.id === targetId);

  if (!product) {
    container.innerHTML = `
      <div class="text-center py-5">
        <h3 class="text-danger">Product Not Found</h3>
        <a href="shop.html" class="btn btn-dark mt-3">Return to Shop Catalog</a>
      </div>`;
    return;
  }

  container.innerHTML = `
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="shop.html" class="text-decoration-none text-muted">Shop</a></li>
        <li class="breadcrumb-item active text-capitalize" aria-current="page">${product.category}</li>
      </ol>
    </nav>
    <div class="row g-5">
      <div class="col-md-6">
        <img src="${product.image}" class="img-fluid rounded shadow-sm w-100 object-fit-cover" style="max-height: 450px;" alt="${product.name}">
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <span class="badge bg-dark align-self-start text-uppercase mb-2">${product.category}</span>
        <h1 class="display-5 fw-bold text-dark mb-2">${product.name}</h1>
        <h3 class="text-primary fw-bold mb-4">$${product.price.toFixed(2)}</h3>
        <p class="text-secondary mb-4 leading-relaxed">${product.description}</p>
        
        <div class="row g-2 align-items-center mb-4">
          <div class="col-auto">
            <label for="qty-input" class="col-form-label small fw-semibold">Quantity:</label>
          </div>
          <div class="col-3">
            <input type="number" id="qty-input" class="form-control" value="1" min="1" max="10">
          </div>
          <div class="col-auto">
            <button id="add-to-cart-btn" class="btn btn-dark px-4">Add to Cart 🛒</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const qty = document.getElementById('qty-input').value;
    addToCart(product.id, qty);
  });
});