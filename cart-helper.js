// Retrieve cart array or initialize empty
function getCart() {
  return JSON.parse(localStorage.getItem('ecommerce_cart')) || [];
}

// Save cart state
function saveCart(cart) {
  localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
  updateCartBadge();
}

// Add item to cart or bump quantity
function addToCart(productId, quantity = 1) {
  let cart = getCart();
  const existingItem = cart.find(item => item.id === parseInt(productId));
  
  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    cart.push({ id: parseInt(productId), quantity: parseInt(quantity) });
  }
  
  saveCart(cart);
  alert("Product added to your cart!");
}

// Update the navbar badge element counter
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalCount;
  }
}

// Run update on script run
document.addEventListener('DOMContentLoaded', updateCartBadge);