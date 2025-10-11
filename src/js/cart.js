import { getLocalStorage } from "./utils.mjs";



function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  // Fixes the error that pops up with no items in cart by just making the innerHTML of product list to say "No itmes in cart". It then returns, so the foreach loop later does not run, and does not cause the error.
  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "<li>No items in cart</li>";
    if (cartFooter) cartFooter.classList.add("hide");
    return;
  }

  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  productList.innerHTML = "";
  cartItems.forEach((item) => {
    productList.innerHTML += cartItemTemplate(item);
  });

  if (cartFooter && totalElement) {
    cartFooter.classList.remove("hide");

    const total = cartItems.reduce((sum, item) => sum + (item.FinalPrice || 0), 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }
}

document.querySelectorAll(".remove-item").forEach((button) => {
  button.addEventListener("click", removeFromCart);
});

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class ="remove-item" data-id ="${item.Id}">❌</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeFromCart(event) {
  const idToRemove = event.target.dataset.id;

  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.filter((item) => item.Id != idToRemove);

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

renderCartContents();