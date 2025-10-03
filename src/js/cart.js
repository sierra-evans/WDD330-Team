import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");
  // Fixes the error that pops up with no items in cart by just making the innerHTML of product list to say "No itmes in cart". It then returns, so the foreach loop later does not run, and does not cause the error.
  if (!cartItems) {
    document.querySelector(".product-list").innerHTML =
      "<li>No items in cart</li>";
    return;
  }
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";
  cartItems.forEach((item) => {
    productList.innerHTML += cartItemTemplate(item);
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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

renderCartContents();
