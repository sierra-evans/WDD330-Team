import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }
  // then add the current product to the list
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);
  alertMessage(`${product.NameWithoutBrand} added to cart!`);
}
function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  
  // Display final price
  document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice}`;
  
  // Calculate and display discount information
  const suggestedPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;
  
  if (suggestedPrice && finalPrice < suggestedPrice) {
    // There's a discount to display
    const discountAmount = suggestedPrice - finalPrice;
    const discountPercentage = Math.round((discountAmount / suggestedPrice) * 100);
    
    // Show discount badge
    const discountBadge = document.querySelector("#discountBadge");
    const discountPercentageEl = document.querySelector("#discountPercentage");
    discountBadge.style.display = "block";
    discountPercentageEl.innerText = `${discountPercentage}% OFF`;
    
    // Show original price with strikethrough
    const originalPriceEl = document.querySelector("#productOriginalPrice");
    originalPriceEl.style.display = "block";
    originalPriceEl.innerText = `$${suggestedPrice.toFixed(2)}`;
    
    // Show savings amount
    const savingsEl = document.querySelector("#productSavings");
    savingsEl.style.display = "block";
    savingsEl.innerText = `You save $${discountAmount.toFixed(2)}`;
  }
  
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}