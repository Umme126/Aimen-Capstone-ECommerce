document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');

  form.addEventListener('submit', (e) => {
    // If the form passes validation checks
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault(); // Stop actual page reload
      
      alert("Order Processed Successfully! Thank you for purchasing from Aimen's Store.");
      
      // Clear out the basket state upon success
      localStorage.removeItem('ecommerce_cart');
      
      // Send user back to index landing view
      window.location.href = 'index.html';
    }

    form.classList.add('was-validated');
  }, false);
});