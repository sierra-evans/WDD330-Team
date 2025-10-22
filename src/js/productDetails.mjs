import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  setLocalStorage("so-cart", product);
}
function renderProductDetails() {
  const addBtn = document.querySelector("#addToCart");
  const productSection = document.querySelector(".product-detail");

  // Handle product not found
  if (!product) {
    console.error("Product not found for ID:", product);
    
    // Show user-friendly error message
    productSection.innerHTML = `<p class="product-error">Sorry, this product was not found.</p>`;
    
    // Hide Add to Cart button
    if (addBtn) addBtn.style.display = "none";
    return;
  }
  
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
  // update discount badge after populating price/retail values
  showDiscountBadge();
}

// compute and show discount badge on detail page
function showDiscountBadge() {
  const final = Number(product.FinalPrice) || 0;
  const original =
    Number(product.SuggestedRetailPrice) || Number(product.ListPrice) || 0;

  const badgeEl = document.getElementById("productDiscount");

  if (!badgeEl) return; // nothing to update

  if (original > final && final > 0) {
    const amountOff = original - final;
    const percent = Math.round((amountOff / original) * 100);
    // show both dollar amount and percent
    badgeEl.innerText = `Save $${amountOff.toFixed(2)} (${percent}% off)`;
    badgeEl.style.display = "inline-block";
  } else {
    badgeEl.style.display = "none";
  }
}

// call badge update after rendering details
// (no reassignment needed; badge is updated at end of renderProductDetails)
