import productList from "./productList.mjs";

productList(".product-list", "tents");

// Adds superscript to backapck icon. In main.js for now because 
// I could not get it to import from another js file correctly.
document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".cart");
  
    let cartCounter = cartIcon.querySelector(".cart-counter");
    if (!cartCounter) {
      cartCounter = document.createElement("div");
      cartCounter.classList.add("cart-counter");
      cartCounter.textContent = "0";
      cartIcon.appendChild(cartCounter);
    }
  
    const addToCartBtn = document.querySelector("#addToCart");
    let cartCount = 0;
  
    function updateCartCounter() {
      cartCounter.textContent = cartCount;
    }
  
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        cartCount++;
        updateCartCounter();
  
        cartCounter.style.transform = "scale(1.4)";
        setTimeout(() => {
          cartCounter.style.transform = "scale(1)";
        }, 150);
      });
    }
  });